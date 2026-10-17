import React from "react";
import { CapabilityItem } from "@/data/skills";

interface SkillCardProps {
  item: CapabilityItem;
}

export const SkillCard: React.FC<SkillCardProps> = ({ item }) => {
  return (
    <div className="bg-[#171D25] border border-[#29323D] rounded-xl p-6">
      <div className="font-mono text-[10px] text-[#64C7D8]">{item.code}</div>
      <h3 className="font-heading text-lg font-bold text-[#E8EDF2] mt-1">{item.domain}</h3>
      <p className="text-xs text-[#94A0AD] mt-1">{item.focus}</p>
    </div>
  );
};
