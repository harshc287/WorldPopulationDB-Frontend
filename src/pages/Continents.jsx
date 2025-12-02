import { useQuery } from "@tanstack/react-query";
import { getUniqueContinents, getPopulationByContinent } from "../api/services";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function Continents() {
  const { data: continentsData, isLoading: continentsLoading, error: continentsError } = useQuery({
    queryKey: ["uniqueContinents"],
    queryFn: getUniqueContinents,
  });

  const { data: popData, isLoading: popLoading, error: popError } = useQuery({
    queryKey: ["populationByContinent"],
    queryFn: getPopulationByContinent,
  });

  const continents = continentsData?.data?.data ?? [];
  const population = popData?.data?.data ?? []; // FIXED

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Continents Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popLoading && <p>Loading population data...</p>}
        {popError && <p className="text-red-500">Error loading population data</p>}
        {!popLoading &&
          !popError &&
          population.map((row) => (
            <Card key={row.Continent}>
              <CardHeader>
                <CardTitle>{row.Continent}</CardTitle>
              </CardHeader>
              <CardContent>
                Total Population: {Number(row.totalPopulation).toLocaleString()}
              </CardContent>
            </Card>
          ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">All Continents</h2>
        {continentsLoading && <p>Loading continents...</p>}
        {continentsError && <p className="text-red-500">Error loading continents</p>}
        <ul className="list-disc ml-6">
          {continents.map((c) => (
            <li key={c.Continent}>{c.Continent}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
