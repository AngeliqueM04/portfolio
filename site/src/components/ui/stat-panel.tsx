import type { Stat } from "@/data/content"
import { cn } from "@/lib/utils"

type Props = {
  stats: Stat[]
}

/** Non-uniform live stats. Avoids identical six-tile dashboard grids. */
export function StatPanel({ stats }: Props) {
  const lead = stats.find((s) => s.emphasis === "lead") ?? stats[0]
  const secondary = stats.filter((s) => s !== lead)

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
      <div className="min-w-0 flex-1 border-l-2 border-accent pl-4 sm:pl-5">
        <p className="eyebrow text-accent">{lead.label}</p>
        <p className="mt-2 font-serif text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {lead.value}
        </p>
        {lead.note ? (
          <p className="mt-2 font-serif text-sm italic text-fg-muted">
            {lead.note}
          </p>
        ) : null}
      </div>
      <dl
        className={cn(
          "grid flex-[1.1] gap-x-8 gap-y-5",
          secondary.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-2",
        )}
      >
        {secondary.map((stat) => (
          <div key={stat.label}>
            <dt className="eyebrow text-fg-faint">{stat.label}</dt>
            <dd className="mt-1 font-serif text-2xl font-medium tracking-tight text-fg">
              {stat.value}
            </dd>
            {stat.note ? (
              <p className="mt-1 font-serif text-[0.8rem] italic text-fg-muted">
                {stat.note}
              </p>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  )
}
