import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import type { Signal } from "../hooks/useSignals";
import L from "leaflet";

interface MapViewProps {
  signals: Signal[];
  onSelect: (signal: Signal) => void;
  filters: {
    region: string[];
    species: string[];
    urgency: string[];
    search: string;
  };
}

const center: [number, number] = [5.3599517, -4.0082563]; // Abidjan

export default function MapView({ signals, onSelect, filters }: MapViewProps) {
  const filtered = signals.filter((s) =>
    (!filters.region.length || filters.region.includes(s.region)) &&
    (!filters.species.length || filters.species.includes(s.species)) &&
    (!filters.urgency.length || filters.urgency.includes(s.urgency)) &&
    (!filters.search || s.species.toLowerCase().includes(filters.search.toLowerCase()) || s.region.toLowerCase().includes(filters.search.toLowerCase()))
  );

  return (
    <motion.div className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <MapContainer center={center} zoom={7} className="h-full w-full rounded-xl shadow-soft" style={{ minHeight: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map((feature) =>
          feature.type === "point" ? (
            <Marker
              key={feature.id}
              position={[feature.lat, feature.lng]}
              eventHandlers={{
                click: () => onSelect(feature),
              }}
              icon={L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
                iconSize: [36, 36],
                iconAnchor: [18, 36],
                className: "drop-shadow-lg",
              })}
            >
              <Popup>
                <div className="text-sm font-semibold text-primary">
                  {feature.species}
                  <br />
                  <span className="text-xs text-gray-500">{feature.region}</span>
                </div>
              </Popup>
            </Marker>
          ) : (
            <Circle
              key={feature.id}
              center={[feature.lat, feature.lng]}
              radius={feature.radius || 5000}
              pathOptions={{
                color:
                  feature.urgency === "critique"
                    ? "#ef4444"
                    : feature.urgency === "modéré"
                    ? "#facc15"
                    : "#22c55e",
                fillOpacity: 0.25,
              }}
              eventHandlers={{
                click: () => onSelect(feature),
              }}
            />
          )
        )}
      </MapContainer>
    </motion.div>
  );
} 