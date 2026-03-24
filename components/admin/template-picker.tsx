"use client";

import { TemplateType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { TickIcon, LinkSquareIcon } from "@hugeicons/core-free-icons";

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: "starter", name: "Starter", description: "Clean minimal design with whitespace and soft tones" },
  { id: "bold", name: "Bold", description: "Vibrant gradients, strong typography, geometric accents" },
  { id: "classic", name: "Classic", description: "Traditional professional layout with structured grid" },
];

export function TemplatePicker({ selected, onSelect }: { selected: TemplateType; onSelect: (t: TemplateType) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {templates.map((t) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              "relative p-4 rounded-2xl border-2 text-left transition-all duration-200",
              isSelected
                ? "border-violet-500 ring-2 ring-violet-500/20 bg-violet-50/50 shadow-sm"
                : "border-border hover:border-violet-300 hover:shadow-sm"
            )}
          >
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                <HugeiconsIcon icon={TickIcon} size={14} color="white" strokeWidth={2.5} />
              </div>
            )}
            <div className={cn(
              "h-28 rounded-xl mb-3 flex items-center justify-center text-2xl font-bold font-heading",
              t.id === "starter" && "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-400",
              t.id === "bold" && "bg-gradient-to-br from-violet-500 to-pink-500 text-white",
              t.id === "classic" && "bg-gradient-to-br from-slate-700 to-slate-900 text-amber-200"
            )}>
              {t.name[0]}
            </div>
            <h3 className="font-bold font-heading text-[13px] mb-1">{t.name}</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{t.description}</p>
            <a
              href={`/preview/${t.id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-[11px] text-violet-500 hover:text-violet-700 font-medium inline-flex items-center gap-1"
            >
              <HugeiconsIcon icon={LinkSquareIcon} size={12} color="currentColor" />
              Preview Template
            </a>
          </button>
        );
      })}
    </div>
  );
}
