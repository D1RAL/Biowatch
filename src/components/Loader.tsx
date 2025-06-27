import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin shadow-soft"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
} 