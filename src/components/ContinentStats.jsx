import { useQuery } from "@tanstack/react-query";
import { getPopulationByContinent, getCountriesByContinent } from "../api/services";

export default function ContinentStats({ continent }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["continentStats", continent],
    queryFn: () =>
      continent ? getCountriesByContinent(continent) : getPopulationByContinent(),
  });

  // Extract raw data from API response
  const rawData = data?.data?.data ?? [];

  // Aggregate totals by continent to avoid duplicate keys
  const stats = rawData.reduce((acc, curr) => {
    const contName = curr.Continent || continent;
    const pop = Number(curr.Population || curr.totalPopulation || 0);
    const existing = acc.find((x) => x.Continent === contName);
    if (existing) {
      existing.totalPopulation += pop;
    } else {
      acc.push({ Continent: contName, totalPopulation: pop });
    }
    return acc;
  }, []);

  if (error) return <p className="text-red-500">Error loading continent stats</p>;

  return (
    <div className="p-4 rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">
        Continent Stats {continent ? `for ${continent}` : ""}
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : stats.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul className="space-y-2">
          {stats.map((c) => (
            <li
              key={c.Continent} // now unique after aggregation
              className="flex justify-between border-b pb-2 text-gray-700"
            >
              <span>{c.Continent}</span>
              <span className="font-bold">{c.totalPopulation.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
