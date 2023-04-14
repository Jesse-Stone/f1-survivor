import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';


const Transition = ({children}) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ position: 'absolute', width: '100%', height: '100%'}}
      unmountOnExit
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: '100%', height: '100%'}}
      />
      {children}
    </motion.div>
  );
}

export default Transition