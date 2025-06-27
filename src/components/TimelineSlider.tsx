import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Signal } from "../hooks/useSignals";

export default function TimelineSlider({ signals, value, onChange }: {
  signals: Signal[];
  value: string;
  onChange: (month: string) => void;
}) {
  // Liste des mois disponibles (YYYY-MM)
  const months = useMemo(() => {
    const set = new Set(signals.map(s => s.date.slice(0, 7)));
    return Array.from(set).sort();
  }, [signals]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2 mb-6"
    >
      <div className="flex items-center gap-3 w-full">
        <span className="text-xs text-gray-500">Début</span>
        <input
          type="range"
          min={0}
          max={months.length - 1}
          value={months.indexOf(value)}
          onChange={e => onChange(months[parseInt(e.target.value)])}
          className="flex-1 accent-primary"
        />
        <span className="text-xs text-gray-500">Fin</span>
      </div>
      <div className="text-sm font-semibold text-primary">
        {value ? value : 'Toutes les périodes'}
      </div>
    </motion.div>
  );
} 