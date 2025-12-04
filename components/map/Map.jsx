"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);

  const { theme } = useTheme();

  // Initialize map ONCE
  useEffect(() => {
    async function init() {
      const L = (await import("leaflet")).default;

      if (!mapRef.current || mapInstanceRef.current) return;

      // create map instance
      const map = L.map(mapRef.current).setView([51.505, -0.09], 11);
      mapInstanceRef.current = map;

      // add initial tile layer (light or dark)
      const initialLayer = L.tileLayer(
        theme === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: ["a", "b", "c", "d"],
          maxZoom: 19,
        }
      );

      tileLayerRef.current = initialLayer;
      initialLayer.addTo(map);
    }

    init();
  }, []); // runs once

  // REACT to theme changes
  useEffect(() => {
    async function updateTileLayer() {
      if (!mapInstanceRef.current || !tileLayerRef.current) return;

      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;

      // remove old layer
      map.removeLayer(tileLayerRef.current);

      // choose new URL
      const newUrl =
        theme === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      // add new tile layer
      const newLayer = L.tileLayer(newUrl, {
        subdomains: ["a", "b", "c", "d"],
        maxZoom: 19,
      });

      tileLayerRef.current = newLayer;
      newLayer.addTo(map);
    }

    updateTileLayer();
  }, [theme]); // runs when theme changes

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
