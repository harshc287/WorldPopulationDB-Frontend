import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip as LTooltip } from "react-leaflet";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { getRegionPopulationChange } from "../../api/services";
import { Skeleton } from "../ui/skeleton";
import "leaflet/dist/leaflet.css";

// Function to get color based on population change
function getColor(val) {
  if (val == null) return "#ddd";       // No data
  if (val > 1000000) return "#023047"; // Large increase
  if (val > 100000) return "#0ea5a4";  // Medium increase
  if (val > 0) return "#7dd3fc";       // Small increase
  if (val === 0) return "#f1f5f9";     // No change
  return "#fecaca";                     // Negative / decrease
}

export default function WorldChoropleth({ year1 = 2018, year2 = 2019 }) {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geojson, setGeojson] = useState(null);

  // Fetch population change data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getRegionPopulationChange(year1, year2);
        setChanges(res.data?.data ?? res.data ?? []);
      } catch (err) {
        console.error("Error fetching population change:", err);
        setChanges([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [year1, year2]);

  // Load GeoJSON for countries
  useEffect(() => {
    fetch("/data/world_countries.geojson")
      .then(r => {
        if (!r.ok) throw new Error("GeoJSON not found");
        return r.json();
      })
      .then(json => setGeojson(json))
      .catch(err => {
        console.error(err);
        setGeojson(null);
      });
  }, []);

  // Function to style each feature
  const onEachFeature = (feature, layer) => {
    const propName = feature.properties?.ADMIN || feature.properties?.name || feature.properties?.NAME;
    const match = changes.find(c => (c.region || c.Continent || c.country) === propName);
    const val = match ? Number(match.population_change ?? match.change ?? match.population ?? 0) : null;

    layer.setStyle({
      fillColor: getColor(val),
      fillOpacity: 0.8,
      color: "#444",
      weight: 0.3,
    });

    layer.bindTooltip(`${propName}: ${val != null ? val.toLocaleString() : "N/A"}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Population Change ({year1} → {year2})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-72 w-full" />
        ) : (
          <div className="w-full h-72">
            <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {geojson && changes.length > 0 ? (
                <GeoJSON data={geojson} onEachFeature={onEachFeature} />
              ) : (
                // Fallback markers if GeoJSON fails
                changes.map((c, i) => 
                  c.lat && c.lng ? (
                    <Marker key={i} position={[c.lat, c.lng]}>
                      <LTooltip>
                        {`${c.region || c.country || "Unknown"}: ${Number(c.population_change ?? c.change ?? c.population ?? 0).toLocaleString()}`}
                      </LTooltip>
                    </Marker>
                  ) : null
                )
              )}
            </MapContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
