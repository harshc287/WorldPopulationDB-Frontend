import React, { useEffect, useState } from "react";
import { getPopulationByContinent, getCountriesByContinent } from "../../api/services";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Skeleton } from "../ui/skeleton";

const COLORS = ["#6366f1", "#06b6d4", "#34d399", "#f97316", "#ef4444", "#f59e0b"];

export default function PopulationPieChart({ continent }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = continent
          ? await getCountriesByContinent(continent)
          : await getPopulationByContinent();
        const rows = res.data?.data ?? [];

        // Aggregate totals by continent
        const chartData = rows.reduce((acc, curr) => {
          const name = curr.Continent || continent;
          const value = Number(curr.Population || curr.totalPopulation || 0);
          const existing = acc.find((x) => x.name === name);
          if (existing) existing.value += value;
          else acc.push({ name, value });
          return acc;
        }, []);

        setData(chartData);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [continent]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Population by Continent {continent ? `for ${continent}` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : !data || data.length === 0 ? (
          <div>No data</div>
        ) : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => v.toLocaleString()} />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
