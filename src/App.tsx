import React, { useState } from "react";
import { useSignals } from "./hooks/useSignals";
import MapView from "./components/MapView";
import FilterPanel from "./components/FilterPanel";
import InfoSidebar from "./components/InfoSidebar";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import DashboardStats from "./components/DashboardStats";
import AddSignalButton from "./components/AddSignalButton";
import AddSignalModal from "./components/AddSignalModal";
import MapLegend from "./components/MapLegend";
import AlertBanner from "./components/AlertBanner";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const { signals: initialSignals, loading } = useSignals();
  const [signals, setSignals] = useState(initialSignals);
  const [filters, setFilters] = useState({
    region: [],
    species: [],
    urgency: [],
    search: ""
  });
  const [selected, setSelected] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Met à jour les signaux si le hook change (chargement initial)
  React.useEffect(() => { setSignals(initialSignals); }, [initialSignals]);

  // Pour le formulaire : listes uniques d'espèces et régions
  const speciesList = Array.from(new Set(signals.map(s => s.species)));
  const regionList = Array.from(new Set(signals.map(s => s.region)));

  function handleAddSignal(newSignal) {
    // Gère l'upload photo localement (base64)
    let photo = newSignal.photo;
    if (newSignal.photoFile && newSignal.photoFile instanceof File) {
      // On suppose que le FileReader a déjà mis à jour l'aperçu, donc on peut utiliser l'aperçu comme photo
      photo = newSignal.photoFile.preview || newSignal.photo;
    }
    setSignals(signals => [
      ...signals,
      {
        ...newSignal,
        id: Date.now(),
        photo: photo || '',
      },
    ]);
  }

  // Détection d'invasion critique dans la région sélectionnée
  const criticalRegion = filters.region.find(r => signals.some(s => s.region === r && s.urgency === "critique"));

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur shadow-soft z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <img src="/logo.png" alt="Biowatch" className="h-10 w-auto" />
          <SearchBar value={filters.search} onChange={v => setFilters(f => ({ ...f, search: v }))} />
        </div>
      </header>
      <main className="pt-20 relative min-h-screen flex flex-col items-center justify-start">
        <AlertBanner show={!!criticalRegion} region={criticalRegion || ''} />
        <DashboardStats signals={signals} />
        <button
          className={`mt-8 mb-4 px-6 py-3 rounded-xl font-semibold shadow-soft transition-all duration-300 text-white ${showMap ? 'bg-primary' : 'bg-secondary'} hover:scale-105`}
          onClick={() => setShowMap((v) => !v)}
        >
          {showMap ? 'Masquer la carte' : 'Afficher la carte'}
        </button>
        <AnimatePresence>
          {showMap && (
            <motion.div
              key="map-section"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
              className="w-full flex-1 flex flex-col md:flex-row relative max-w-6xl mx-auto"
            >
              <div className="absolute top-8 left-8 z-20">
                <FilterPanel signals={signals} filters={filters} setFilters={setFilters} />
              </div>
              <motion.div
                className="flex-1"
                animate={selected ? { marginRight: 340 } : { marginRight: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                <MapView signals={signals} filters={filters} onSelect={setSelected} />
              </motion.div>
              <InfoSidebar signal={selected} onClose={() => setSelected(null)} />
              {loading && <Loader />}
              <MapLegend />
            </motion.div>
          )}
        </AnimatePresence>
        <AddSignalButton onClick={() => setShowAdd(true)} />
        <AddSignalModal
          open={showAdd}
          onClose={() => setShowAdd(false)}
          onAdd={handleAddSignal}
          speciesList={speciesList}
          regionList={regionList}
        />
      </main>
    </div>
  );
} 