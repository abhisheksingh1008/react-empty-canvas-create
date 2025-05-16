
"use client";

import { useState } from "react";
import Breadcrumb from "../fantasy-cricket/Breadcrumb";
import PlayerComparisonContainer from "@/components/PlayerComparison/PlayerComparisonContainer";

export default function PlayerComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Player Comparison", href: "/player-comparison" },
        ]}
      />
      <div className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Player Comparison</h1>
        <PlayerComparisonContainer />
      </div>
    </div>
  );
}
