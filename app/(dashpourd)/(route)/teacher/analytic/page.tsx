


import { getAnalytics } from "@/actions/getAnalytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import DataCard from "./_componets/DataCard.tsx";
import Chart from "./_componets/Chart.tsx";





const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { data, totalRevanue, totalSales } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total revenue" value={totalRevanue} />
      </div>
 
 <Chart  data={data}/>
    </div>
  );
};

export default AnalyticsPage;
