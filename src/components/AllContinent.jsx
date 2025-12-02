import { useQuery } from "@tanstack/react-query";
import { getUniqueContinents } from "../api/services";

export default function AllContinent({ onChange }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["uniqueContinents"],
    queryFn: getUniqueContinents,
  });

  const continents = data?.data?.data ?? [];

  if (error) return <p className="text-red-500">Error loading continents</p>;

  return (
    <select
      className="p-3 border rounded-lg w-full"
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value="">Select Continent</option>
      {isLoading ? (
        <option>Loading...</option>
      ) : (
        continents.map((c) => (
          <option key={c.Continent} value={c.Continent}>
            {c.Continent}
          </option>
        ))
      )}
    </select>
  );
}
