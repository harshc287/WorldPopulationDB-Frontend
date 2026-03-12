import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getUniqueContinents,
  getCountriesByContinent,
  getAllCountries,
} from "../api/services";

export default function Countries() {
  const [continent, setContinent] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: continentsData,
    isLoading: continentsLoading,
    error: continentsError,
  } = useQuery({
    queryKey: ["uniqueContinents"],
    queryFn: getUniqueContinents,
  });

  const continents = continentsData?.data?.data ?? [];

  const {
    data: countriesData,
    isLoading: countriesLoading,
    error: countriesError,
  } = useQuery({
    queryKey: ["countries", continent],
    queryFn: () =>
      continent ? getCountriesByContinent(continent) : getAllCountries(),
    enabled: !!continent || continent === "",
  });

  const countries = countriesData?.data?.data ?? [];

  // pagination logic
  const startIndex = (page - 1) * limit;
  const paginatedCountries = countries.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(countries.length / limit);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Countries</h1>

      <label className="block font-medium mb-2">Filter by Continent</label>

      {continentsLoading ? (
        <p>Loading continents...</p>
      ) : continentsError ? (
        <p className="text-red-500">Error loading continents</p>
      ) : (
        <select
          value={continent}
          onChange={(e) => {
            setContinent(e.target.value);
            setPage(1);
          }}
          className="border p-2 mb-4"
        >
          <option value="">All Continents</option>
          {continents.map((c) => (
            <option key={c.Continent} value={c.Continent}>
              {c.Continent}
            </option>
          ))}
        </select>
      )}

      {countriesLoading ? (
        <p>Loading countries...</p>
      ) : countriesError ? (
        <p className="text-red-500">Error loading countries</p>
      ) : (
        <>
          <table className="w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left border-b">
                <th className="p-3">Country</th>
                <th className="p-3">Population</th>
                <th className="p-3">Continent</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCountries.map((row) => (
                <tr key={row.Name} className="border-b hover:bg-gray-50">
                  <td className="p-3">{row.Name}</td>
                  <td className="p-3">
                    {Number(row.Population).toLocaleString()}
                  </td>
                  <td className="p-3">{row.Continent}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {page} of {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setPage((p) => (page < totalPages ? p + 1 : p))
              }
              disabled={page === totalPages || totalPages === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}