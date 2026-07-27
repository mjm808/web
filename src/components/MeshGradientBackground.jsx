/**
 * MeshGradientBackground Component
 * 
 * WebGL shader-based animated mesh gradient background.
 * 
 * Original shader by kishimisu
 * Source: https://www.shadertoy.com/view/DdcfzH
 * Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 3.0
 * https://creativecommons.org/licenses/by-nc-sa/3.0/
 * 
 * Adapted for React/WebGL by mat
 * Modified to use custom color palette
 */
import React, { useEffect, useRef } from 'react';

const MeshGradientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader - defines the shape (full screen quad)
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader - advanced mesh gradient with film grain and color cycling
    const fragmentShaderSource = `
// Original shader by kishimisu
// https://www.shadertoy.com/view/DdcfzH
// Licensed under CC BY-NC-SA 3.0
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      
      #define filmGrainIntensity 0.1
      
      mat2 Rot(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
      }
      
      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
        return fract(sin(p) * 43758.5453);
      }
      
      float noise(in vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        float n = mix(
          mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(-1.0 + 2.0 * hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(-1.0 + 2.0 * hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(-1.0 + 2.0 * hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), 
          u.y
        );
        return 0.5 + 0.5 * n;
      }
      
      float filmGrainNoise(in vec2 uv) {
        return length(hash(vec2(uv.x, uv.y)));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float aspectRatio = uResolution.x / uResolution.y;
        
        // Transformed uv
        vec2 tuv = uv - 0.5;
        
        // Rotate with noise
        float degree = noise(vec2(uTime * 0.05, tuv.x * tuv.y));
        
        tuv.y *= 1.0 / aspectRatio;
        tuv *= Rot(radians((degree - 0.5) * 720.0 + 180.0));
        tuv.y *= aspectRatio;
        
        // Wave warp with sine
        float frequency = 5.0;
        float amplitude = 30.0;
        float speed = uTime * 2.0;
        tuv.x += sin(tuv.y * frequency + speed) / amplitude;
        tuv.y += sin(tuv.x * frequency * 1.5 + speed) / (amplitude * 0.5);
           
        // Dark gradient colors
        vec3 darkestTeal = vec3(7, 8, 21) / vec3(255.0);         
        vec3 darkNavy = vec3(18, 20, 31) / vec3(255.0);          
        vec3 darkTealGreen = vec3(26, 58, 53) / vec3(255.0);     
        vec3 midDarkBlue = vec3(29, 35, 51) / vec3(255.0);       
        
        // Slightly lighter
        vec3 mediumDarkTeal = vec3(40, 48, 62) / vec3(255.0);  
        vec3 tealAccent = vec3(22, 56, 48) / vec3(255.0);      
        vec3 slateBlue = vec3(50, 61, 74) / vec3(255.0);       
        vec3 deepTeal = vec3(30, 50, 55) / vec3(255.0);        
        
        // Very subtle cycling between variations
        float cycle = sin(uTime * 0.3);
        float t = (sign(cycle) * pow(abs(cycle), 0.8) + 1.0) / 2.0;
        vec3 color1 = mix(darkestTeal, mediumDarkTeal, t * 0.5);
        vec3 color2 = mix(darkNavy, tealAccent, t * 0.5);
        vec3 color3 = mix(darkTealGreen, slateBlue, t * 0.5);
        vec3 color4 = mix(midDarkBlue, deepTeal, t * 0.5);
        
        // Blend the gradient colors and apply transformations
        vec3 layer1 = mix(color3, color2, smoothstep(-0.3, 0.2, (tuv * Rot(radians(-5.0))).x));
        vec3 layer2 = mix(color4, color1, smoothstep(-0.3, 0.2, (tuv * Rot(radians(-5.0))).x));
        
        vec3 color = mix(layer1, layer2, smoothstep(0.5, -0.3, tuv.y));

        // Apply film grain
        color = color - filmGrainNoise(uv) * filmGrainIntensity;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shaders
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create full-screen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');

    // Handle resize
    function resize() {
      // Cap at 2x so very high-DPI phones (3x/4x) don't shade far more pixels
      // than the eye can tell apart on a soft gradient like this.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    let startTime = Date.now();
    let animationFrameId;
    function animate() {
      if (!document.hidden) {
        const currentTime = (Date.now() - startTime) * 0.001; // Convert to seconds
        gl.uniform1f(uTimeLocation, currentTime);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
      }}
    />
  );
};

export default MeshGradientBackground;
