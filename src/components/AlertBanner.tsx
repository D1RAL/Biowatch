import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function AlertBanner({ show, region }: { show: boolean, region: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-base"
        >
          <ExclamationTriangleIcon className="w-6 h-6 text-white animate-pulse" />
          Invasion critique détectée dans la région {region} !
        </motion.div>
      )}
    </AnimatePresence>
  );
} 