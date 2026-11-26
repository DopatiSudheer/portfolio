"use client";
import { SKILL_GROUPS } from "@/lib/data";
import PeriodicTable, { Tile } from "@/components/PeriodicTable";

export default function Skills() {
  // Flatten SKILL_GROUPS into Tile array
  const tiles: Tile[] = [];
  SKILL_GROUPS.forEach((group) => {
    group.items.forEach((item) => {
      tiles.push({
        symbol: item.symbol,
        name: item.name,
        family: group.family,
        usedIn: item.usedIn || [],
        logo: "logo" in item ? (item.logo as string | undefined) : undefined,
      });
    });
  });

  return (
    <section id="skills" aria-label="Skills" style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0 }} aria-hidden />
      <PeriodicTable tiles={tiles} />
    </section>
  );
}
