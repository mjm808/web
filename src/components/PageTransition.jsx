// components/PageTransition.jsx
import { motion } from 'framer-motion';

function PageTransition({ children }) {
  return (
    <div style={{ overflow: 'hidden', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ 
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PageTransition;