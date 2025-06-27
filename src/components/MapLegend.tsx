import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const URGENCY_COLORS = [
  { label: 'Critique', color: '#ef4444', desc: 'Zone à intervention immédiate' },
  { label: 'Modéré', color: '#facc15', desc: 'Zone à surveiller' },
  { label: 'Faible', color: '#22c55e', desc: 'Zone sous contrôle' },
];

const SPECIES_ICONS = [
  { type: 'plante', icon: '🌱', desc: 'Espèce végétale' },
  { type: 'insecte', icon: '🐞', desc: "Espèce d'insecte" },
  { type: 'animal', icon: '🦎', desc: 'Espèce animale' },
];

export default function MapLegend() {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 left-8 z-[999] bg-white/90 backdrop-blur rounded-xl shadow-soft p-5 flex flex-col gap-4 border border-gray-100 w-72"
    >
      <div className="flex items-center gap-2 mb-2">
        <InformationCircleIcon className="w-5 h-5 text-primary" />
        <span className="font-semibold text-primary">Légende de la carte</span>
      </div>
      <div>
        <div className="font-semibold text-xs mb-1">Niveau d'urgence</div>
        <ul className="flex gap-3">
          {URGENCY_COLORS.map(u => (
            <li key={u.label} className="flex items-center gap-1 group relative">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: u.color }} />
              <span className="text-xs text-gray-700">{u.label}</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-7 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">{u.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-semibold text-xs mb-1">Type d'espèce</div>
        <ul className="flex gap-3">
          {SPECIES_ICONS.map(s => (
            <li key={s.type} className="flex items-center gap-1 group relative">
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs text-gray-700">{s.type.charAt(0).toUpperCase() + s.type.slice(1)}</span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-7 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">{s.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
} 