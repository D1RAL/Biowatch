import { motion, AnimatePresence } from "framer-motion";
import type { Signal } from "../hooks/useSignals";

interface InfoSidebarProps {
  signal: Signal | null;
  onClose: () => void;
}

export default function InfoSidebar({ signal, onClose }: InfoSidebarProps) {
  return (
    <AnimatePresence>
      {signal && (
        <motion.aside
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-40 flex flex-col p-8 gap-4 border-l border-gray-100"
        >
          <button onClick={onClose} className="self-end text-primary hover:underline text-sm font-semibold">Fermer ✕</button>
          <img src={signal.photo} alt={signal.species} className="w-full h-48 object-cover rounded-xl mb-2 shadow-soft" />
          <h2 className="text-2xl font-bold text-primary mb-1">{signal.species}</h2>
          <div className="flex gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">{signal.region}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${signal.urgency === 'critique' ? 'bg-red-100 text-red-700' : signal.urgency === 'modéré' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{signal.urgency}</span>
          </div>
          <div className="text-sm mb-2 text-gray-700">Impact : {signal.impact}</div>
          <div className="text-xs text-gray-500 mb-2">Signalé le {signal.date} <br /> GPS : {signal.lat}, {signal.lng}</div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
} 