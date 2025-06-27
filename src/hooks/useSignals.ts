import { useEffect, useState } from "react";

export interface Signal {
  id: number;
  type: "point" | "zone";
  lat: number;
  lng: number;
  region: string;
  species: string;
  urgency: "faible" | "modéré" | "critique";
  impact: string;
  date: string;
  photo: string;
  radius?: number;
}

export function useSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/src/data/signals.json")
      .then((res) => res.json())
      .then((data) => {
        setSignals(data);
        setLoading(false);
      });
  }, []);

  return { signals, loading };
} 