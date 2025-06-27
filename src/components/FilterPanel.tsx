import React from "react";
import { motion } from "framer-motion";
import type { Signal } from "../hooks/useSignals";

interface FilterPanelProps {
  signals: Signal[];
  filters: {
    region: string[];
    species: string[];
    urgency: string[];
    search: string;
  };
  setFilters: (f: any) => void;
}

export default function FilterPanel({ signals, filters, setFilters }: FilterPanelProps) {
  const regions = Array.from(new Set(signals.map(s => s.region)));
  const species = Array.from(new Set(signals.map(s => s.species)));
  const urgencies = ["faible", "modéré", "critique"];

  function handleMultiSelect(key: "region" | "species" | "urgency", value: string) {
    setFilters((prev: any) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v: string) => v !== value) : [...arr, value]
      };
    });
  }

  // Badge rouge si urgence critique dans la région
  function hasCritical(region: string) {
    return signals.some(s => s.region === region && s.urgency === "critique");
  }

  return (
    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className="rounded-xl shadow-soft bg-white/90 backdrop-blur p-5 flex flex-col gap-4 border border-gray-100 max-w-xs w-full">
      <div>
        <label className="block text-xs font-semibold text-primary mb-1">Région</label>
        <div className="flex flex-wrap gap-2">
          {regions.map(r => (
            <button key={r}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors shadow-sm relative ${filters.region.includes(r) ? 'bg-primary text-white border-primary' : 'bg-background text-primary border-primary/30'}`}
              onClick={() => handleMultiSelect("region", r)}
              type="button"
            >
              {r}
              {hasCritical(r) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-pulse border-2 border-white"></span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-primary mb-1">Espèce</label>
        <div className="flex flex-wrap gap-2">
          {species.map(s => (
            <button key={s}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors shadow-sm ${filters.species.includes(s) ? 'bg-secondary text-white border-secondary' : 'bg-background text-primary border-secondary/30'}`}
              onClick={() => handleMultiSelect("species", s)}
              type="button"
            >{s}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-primary mb-1">Niveau d'urgence</label>
        <div className="flex gap-2 flex-wrap">
          {urgencies.map(u => (
            <button key={u}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors shadow-sm ${filters.urgency.includes(u) ? 'bg-red-400 text-white border-red-400' : 'bg-background text-primary border-red-400/30'}`}
              onClick={() => handleMultiSelect("urgency", u)}
              type="button"
            >{u.charAt(0).toUpperCase() + u.slice(1)}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 