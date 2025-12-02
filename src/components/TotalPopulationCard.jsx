import { useQuery } from "@tanstack/react-query";
import { getTotPopulation } from "../api/services";

export default function TotalPopulationCard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalPopulation"],
    queryFn: getTotPopulation,
  });

  if (error) return <div className="text-red-500">Error loading total population</div>;

  const population = data?.data?.data?.totalPopulation ?? 0;

  return (
    <div className="p-4 rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Total Population</h2>
      <p className="text-2xl font-bold">
        {isLoading ? "Loading..." : Number(population).toLocaleString()}
      </p>
    </div>
  );
}
