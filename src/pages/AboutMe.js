import Typewriter from 'typewriter-effect'
import {useMode} from '../context/modecontext';
import PageTransition from '../components/PageTransition';
import RetroButton from '../components/retrobutton';
import { useState } from 'react';

function AboutMe() {
  const { isRetroMode } = useMode();
  //  variable to track the paanel and whats open
  const [activePanel, setActivePanel] = useState(null);
  const [done, setDone] = useState(false);
  // styles and stuff
  let bubbleClasses = "bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full transition-all duration-500";
  const buttonClasses = "bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-white font-nec hover:bg-white/20 transition-all";
  const detailPanelClasses = "bg-white/10 backdrop-blur-md p-6 md:p-12 rounded-2xl shadow-2xl border border-white/20 max-w-md w-full overflow-y-auto max-h-[90vh]";
  const closeBtnClasses = "mb-6 text-white/70 hover:text-white font-nec text-lg ext-neutral-200 inline-block px-3 py-3 bg-white/10 backdrop-blur-md border-2 border-t-white/40 border-l-white/40 border-r-gray-400/40 border-b-gray-400/40 hover:bg-white/25 hover:border-t-gray-400/60 hover:border-l-gray-400/60 hover:border-r-white/60 hover:border-b-white/60 active:scale-95 transition-all shadow-lg";

  // if a panel is open, move main bubble left and shrink
  if (activePanel) {
    bubbleClasses += " md:-translate-x-[10%]";
  }

  // opens a panel, or closes it if it's already open
  function togglePanel(panelName) {
    if (activePanel === panelName) {
      setActivePanel(null);   // already open, so close it
    } else {
      setActivePanel(panelName);  // open this instead
    }
  }

  // closes whatever panel is open
  function closePanel() {
    setActivePanel(null);
  }

  if (isRetroMode) {
    return (
      <PageTransition>
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 py-8 overflow-y-auto gap-6">

          {/* ===== MAIN BUBBLE ===== */}
          <div className={bubbleClasses}>
            <RetroButton to="/" className="mb-6"> [←] Back </RetroButton>

            {/* typewriter text */}
            <div className="text-white font-ibmvga text-lg leading-relaxed break-words">
              <Typewriter options={{delay: 7}}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<div class="text-center font-bold text-2xl mb-4 mt-4">About Me</div>')
                    .typeString('<strong>Current Role:</strong> IT Support Engineer at Insmed Incorporated<br/><br/>')
                    .typeString('<strong>Education:</strong> Rutgers University Graduate (Cum Laude, Dean\'s List)<br/>')
                    .typeString('Double Major in Information Technology & Informatics and Criminal Justice<br/><br/>')
                    .typeString('<strong>Who am I (professionally):</strong><br/>IT Support Engineer with hands-on experience in identity and access management, ServiceNow administration, and endpoint security tooling. Skilled in Active Directory, Okta, Intune, and PowerShell automation with a track record of streamlining IT operations. Pursuing growth in IAM engineering, ServiceNow development, or security operations<br/><br/>')
                    .pauseFor(200)
                    .typeString('<div class="text-center font-bold text-2xl mb-4 mt-6">What I Work With</div>')
                    .typeString('<strong>Platforms:</strong> ServiceNow, Active Directory, Okta, Jamf, Intune, Carbon Black, AirWatch, Office 365, DocuSign Admin, DocuSign Part 11<br/><br/>')
                    .typeString('<strong>Systems:</strong> Windows, macOS, Linux (Fedora, Arch, Mint)<br/><br/>')
                    .typeString('<strong>Languages:</strong> PowerShell, Python, JavaScript, HTML<br/><br/>')
                    .typeString('<strong>Familiar with:</strong> SQL, R, Java<br/><br/>')
                    .typeString('<strong>Certifications:</strong> TestOut Security Pro (November 2024)')
                    .callFunction(() => setDone(true))
                    .start();
                }}
              />
            </div>
            
            {/* buttons - show after typing finishes */}
            {done && (
              <div className="flex gap-4 mt-6 justify-center">
                <button onClick={() => togglePanel('music')} className={buttonClasses}>
                  Radio & Music [+]
                </button>
                <button onClick={() => togglePanel('camp')} className={buttonClasses}>
                  Backpacking & Camping [+]
                </button>
              </div>
            )}
          </div>


          {/* ===== DETAIL PANEL ===== */}
          {activePanel && (
            <div className={detailPanelClasses}>
              <button onClick={closePanel} className={closeBtnClasses}>
                [←] Back
              </button>

              {/* music section */}
              {activePanel === 'music' && (
                <div className="text-white font-ibmvga text-lg leading-relaxed break-words">
                  <h2 className="font-bold text-2xl mb-4">Radio & Music</h2>
                  <Typewriter options={{delay: 7}}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString('I play bass guitar, produce music in FL Studio, and used to be a DJ on WVPH 90.3 The Core!')
                        .start();
                    }}
                  />
                  {/* <img src="/images/radio.jpg" alt="Radio station" className="w-full rounded-lg mb-4" /> */}
                </div>
              )}

              {/* camp section */}
              {activePanel === 'camp' && (
                <div className="text-white font-ibmvga text-lg leading-relaxed break-words">
                  <h2 className="font-bold text-2xl mb-4">Backpacking & Camping</h2>
                  <Typewriter options={{delay: 7}}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString('I love the outdoors! I used to be a Trip Leader and Camp Counselor at Frost Valley. Sometimes I can feel the outdoors calling me from the desk.')
                        .start();
                    }}
                    />
                </div>
              )}
            </div>
          )}
          {/* ===== END DETAIL PANEL ===== */}

        </div>
      </PageTransition>
    );
  }

  // non-retro mode
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <p className="text-neutral-500 uppercase tracking-widest text-sm">Coming Soon</p>
      </div>
    </PageTransition>
  );
}

export default AboutMe;