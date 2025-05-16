
"use client";

import { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import PlayerComparisonContainer from "@/components/PlayerComparison/PlayerComparisonContainer";

export default function PlayerComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/player-comparison">Player Comparison</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Player Comparison</h1>
        <PlayerComparisonContainer />
      </div>
    </div>
  );
}
