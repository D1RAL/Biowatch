import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}
      className="relative w-full sm:w-72">
      <MagnifyingGlassIcon className="w-5 h-5 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Rechercher une espèce, une région..."
        className="pl-10 pr-3 py-2 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-primary shadow-sm"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </motion.div>
  );
} 