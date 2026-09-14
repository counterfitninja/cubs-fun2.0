"use client";

import type { RandomiserCriteria } from "@/src/domain/types";
import { GameFilters } from "./GameFilters";

export function RandomiserControls({ criteria, activityTypes, onChange }: { criteria: RandomiserCriteria; activityTypes: string[]; onChange: (criteria: RandomiserCriteria) => void }) {
  return <GameFilters filters={criteria} activityTypes={activityTypes} onChange={onChange} />;
}