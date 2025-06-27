import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import type { Signal } from "../hooks/useSignals";

const COLORS = ["#3bb2d0", "#7ed957", "#ef4444", "#facc15", "#22c55e", "#6366f1", "#f472b6"];

export default function DashboardStats({ signals }: { signals: Signal[] }) {
  // Statistiques de base
  const total = signals.length;

  // Répartition par espèce
  const bySpecies = useMemo(() => {
    const map: Record<string, number> = {};
    signals.forEach(s => { map[s.species] = (map[s.species] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [signals]);

  // Répartition par région
  const byRegion = useMemo(() => {
    const map: Record<string, number> = {};
    signals.forEach(s => { map[s.region] = (map[s.region] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [signals]);

  // Répartition par urgence
  const byUrgency = useMemo(() => {
    const map: Record<string, number> = {};
    signals.forEach(s => { map[s.urgency] = (map[s.urgency] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [signals]);

  // Évolution mensuelle
  const byMonth = useMemo(() => {
    const map: Record<string, number> = {};
    signals.forEach(s => {
      const month = s.date.slice(0, 7); // YYYY-MM
      map[month] = (map[month] || 0) + 1;
    });
    return Object.entries(map).map(([month, value]) => ({ month, value }));
  }, [signals]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/90 rounded-xl shadow-soft p-6 mb-8 flex flex-col gap-8">
      <div className="flex flex-wrap gap-8 items-center justify-between">
        <div>
          <div className="text-4xl font-bold text-primary">{total}</div>
          <div className="text-sm text-gray-500">Signalements au total</div>
        </div>
        <div>
          <PieChart width={180} height={180}>
            <Pie data={byUrgency} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {byUrgency.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <div className="text-xs text-center mt-1">Répartition par urgence</div>
        </div>
        <div>
          <PieChart width={180} height={180}>
            <Pie data={bySpecies} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {bySpecies.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <div className="text-xs text-center mt-1">Répartition par espèce</div>
        </div>
        <div>
          <PieChart width={180} height={180}>
            <Pie data={byRegion} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {byRegion.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <div className="text-xs text-center mt-1">Répartition par région</div>
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-2">Évolution mensuelle des signalements</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={byMonth}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3bb2d0" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 