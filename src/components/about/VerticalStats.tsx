"use client";

import { motion } from "motion/react";
import { StatCard } from "@/components/ui/StatCard";
import { fadeUpVariants } from "@/lib/motion";
import type { CompanyStat } from "@/data/company";

/** 数字を縦に並べ、1カードずつスクロールに合わせて個別に表示する。 */
export function VerticalStats({ stats }: { stats: CompanyStat[] }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariants}
        >
          <StatCard stat={stat} />
        </motion.div>
      ))}
    </div>
  );
}
