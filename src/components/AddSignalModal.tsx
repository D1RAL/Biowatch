import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Signal } from "../hooks/useSignals";

const urgencies = ["faible", "modéré", "critique"];

export default function AddSignalModal({ open, onClose, onAdd, speciesList, regionList }: {
  open: boolean;
  onClose: () => void;
  onAdd: (signal: Partial<Signal> & { photoFile?: File }) => void;
  speciesList: string[];
  regionList: string[];
}) {
  const [form, setForm] = useState<Partial<Signal> & { photoFile?: File }>({
    species: "",
    region: "",
    urgency: "faible",
    lat: undefined,
    lng: undefined,
    impact: "",
    date: new Date().toISOString().slice(0, 10),
    photo: "",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setForm(f => ({ ...f, photoFile: file }));
      const reader = new FileReader();
      reader.onload = ev => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleGeo() {
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setForm(f => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }));
        setGeoLoading(false);
      },
      () => setGeoLoading(false)
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(form);
    setForm({ species: "", region: "", urgency: "faible", lat: undefined, lng: undefined, impact: "", date: new Date().toISOString().slice(0, 10), photo: "" });
    setPhotoPreview(null);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 relative"
          >
            <button type="button" onClick={onClose} className="absolute top-4 right-4 text-primary font-bold text-xl">✕</button>
            <h2 className="text-xl font-bold text-primary mb-2">Ajouter un signalement</h2>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1">Espèce</label>
                <select className="w-full rounded-xl border px-3 py-2" value={form.species} onChange={e => setForm(f => ({ ...f, species: e.target.value }))} required>
                  <option value="">Choisir...</option>
                  {speciesList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1">Région</label>
                <select className="w-full rounded-xl border px-3 py-2" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} required>
                  <option value="">Choisir...</option>
                  {regionList.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1">Niveau d'urgence</label>
                <select className="w-full rounded-xl border px-3 py-2" value={form.urgency} onChange={e => setForm(f => ({ ...f, urgency: e.target.value }))} required>
                  {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-semibold mb-1">Date</label>
                <input type="date" className="rounded-xl border px-3 py-2" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Impact écologique</label>
              <input type="text" className="w-full rounded-xl border px-3 py-2" value={form.impact} onChange={e => setForm(f => ({ ...f, impact: e.target.value }))} required />
            </div>
            <div className="flex gap-2 items-center">
              <button type="button" onClick={handleGeo} className="px-3 py-2 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-secondary transition-colors">
                {geoLoading ? "Localisation..." : "Géolocaliser"}
              </button>
              <input type="number" step="any" placeholder="Latitude" className="rounded-xl border px-3 py-2 w-32" value={form.lat ?? ""} onChange={e => setForm(f => ({ ...f, lat: parseFloat(e.target.value) }))} required />
              <input type="number" step="any" placeholder="Longitude" className="rounded-xl border px-3 py-2 w-32" value={form.lng ?? ""} onChange={e => setForm(f => ({ ...f, lng: parseFloat(e.target.value) }))} required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Photo</label>
              <input type="file" accept="image/*" className="block" onChange={handlePhoto} />
              {photoPreview && <img src={photoPreview} alt="Aperçu" className="mt-2 rounded-xl h-32 object-cover" />}
            </div>
            <button type="submit" className="mt-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-soft hover:bg-secondary transition-colors">Ajouter</button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 