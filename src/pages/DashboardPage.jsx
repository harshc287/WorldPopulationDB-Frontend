import { useState } from "react";
import TotalPopulationCard from "../components/TotalPopulationCard";
import TopCountriesBar from "../components/charts/TopCountriesBar";
import ContinentStats from "../components/ContinentStats";
import AllContinent from "../components/AllContinent";

export default function DashboardPage() {
  const [selectedContinent, setSelectedContinent] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">World Population Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TotalPopulationCard />
        <AllContinent onChange={(continent) => setSelectedContinent(continent)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCountriesBar continent={selectedContinent} />
        <ContinentStats continent={selectedContinent} />
      </div>
    </div>
  );
}
