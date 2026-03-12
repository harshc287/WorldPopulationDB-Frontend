import { useQuery } from "@tanstack/react-query";
import { getTopCountries, getCountriesByContinent } from "../../api/services";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopCountriesBar({ continent }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topCountries", continent],
    queryFn: () =>
      continent ? getCountriesByContinent(continent) : getTopCountries(10),
  });

  // Extract countries
  let countries = data?.data?.data ?? [];

  // If continent is selected, sort and slice top 10
  if (continent) {
    countries = countries
      .sort((a, b) => Number(b.Population) - Number(a.Population))
      .slice(0, 10);
  }

  if (error) return <p className="text-red-500">Error loading top countries</p>;

  return (
    <div className="p-5  rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-3">
        Top Countries {continent ? `in ${continent}` : ""}
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : countries.length === 0 ? (
        <p>No data</p>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={countries}>
              <XAxis dataKey="Name" />
              <YAxis
                width={100}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Bar dataKey="Population" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
