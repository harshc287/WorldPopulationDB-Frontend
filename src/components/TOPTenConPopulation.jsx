import React, { useEffect, useState } from "react";
import { getTopTenPopulationCountry } from "../api/services";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function TOPTenConPopulation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopTenPopulationCountry()
      .then(res => {
        const rows = res.data?.data ?? res.data ?? [];
        setData(rows);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardHeader><CardTitle>Top 10 Most Populated Countries</CardTitle></CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-8 w-full" /> : (
          <ul className="space-y-2">
            {data.map((r, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>{r.Name ?? r.name ?? r.country}</span>
                <span className="font-semibold">{Number(r.Population ?? r.population ?? 0).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
