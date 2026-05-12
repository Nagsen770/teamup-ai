"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "@/lib/data";

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `Rs ${Number(value) / 1000}k`} />
        <Tooltip formatter={(value) => [`Rs ${Number(value).toLocaleString("en-IN")}`, "Revenue"]} />
        <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} fill="url(#revenue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
