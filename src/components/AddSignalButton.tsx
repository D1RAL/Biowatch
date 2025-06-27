import { motion } from "framer-motion";

export default function AddSignalButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.12, rotate: 10 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl font-bold border-4 border-white hover:bg-secondary transition-colors"
      aria-label="Ajouter un signalement"
    >
      +
    </motion.button>
  );
} 