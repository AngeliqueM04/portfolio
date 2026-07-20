import type { ReactNode } from "react"
import { caseStudies, type CaseStudy, type FloatedVisual } from "@/data/content"
import { DataTable } from "@/components/ui/data-table"
import { StatPanel } from "@/components/ui/stat-panel"

function FloatedFigure({ visual }: { visual: FloatedVisual }) {
  return (
    <figure className="my-4 overflow-hidden rounded-sm border border-line bg-bg-elevated lg:my-0 lg:max-w-[min(100%,22rem)] lg:shrink-0 xl:max-w-[24rem]">
      <img
        src={visual.src}
        alt={visual.alt}
        loading="lazy"
        className="w-full object-contain"
      />
    </figure>
  )
}

function NarrativeBlock({
  label,
  text,
  visual,
  extra,
}: {
  label: string
  text: string
  visual?: FloatedVisual
  extra?: ReactNode
}) {
  return (
    <div className="mt-10">
      <p className="eyebrow">{label}</p>
      <div
        className={
          visual
            ? "mt-3 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8"
            : "mt-3"
        }
      >
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[1.05rem] leading-relaxed text-fg-muted">
            {text}
          </p>
          {extra}
        </div>
        {visual ? <FloatedFigure visual={visual} /> : null}
      </div>
    </div>
  )
}

function CaseArticle({
  study,
  index,
}: {
  study: CaseStudy
  index: number
}) {
  const bySection = (key: FloatedVisual["beside"]) =>
    study.visuals.find((v) => v.beside === key)

  return (
    <article
      id={study.id}
      className="scroll-mt-24 border-t border-line pt-14 first:border-t-0 first:pt-0"
    >
      <p className="eyebrow">Case {String(index + 1).padStart(2, "0")}</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold leading-snug tracking-tight text-fg sm:text-3xl">
        {study.title}
      </h2>
      <p className="mt-2 font-serif text-base italic leading-relaxed text-fg-muted">
        {study.byline}
      </p>

      {study.stats.length > 0 ? (
        <div className="mt-8 rounded-sm border border-line bg-bg-elevated/70 px-5 py-6 sm:px-6">
          <StatPanel stats={study.stats} />
        </div>
      ) : null}

      <NarrativeBlock
        label="Problem"
        text={study.problem}
        visual={bySection("problem")}
        extra={
          study.thesis ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {study.thesis.map((block) => (
                <div key={block.title}>
                  <h3 className="font-serif text-base font-semibold italic text-fg">
                    {block.title}
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 font-serif text-[0.98rem] leading-relaxed text-fg-muted">
                    {block.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null
        }
      />

      <NarrativeBlock
        label="Approach"
        text={study.approach}
        visual={bySection("approach")}
        extra={
          study.tables.length > 0 ? (
            <div className="mt-6 space-y-4">
              {study.tables.map((table) => (
                <DataTable key={table.caption} table={table} />
              ))}
            </div>
          ) : null
        }
      />

      <NarrativeBlock
        label="Result"
        text={study.result}
        visual={bySection("result")}
      />
    </article>
  )
}

export function WorkPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="max-w-2xl">
          <p className="eyebrow">Work</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-4 font-serif italic text-fg-muted">
            Full Problem, Approach, and Result writeups with figures sourced
            from the case notes and charts floated beside the narrative they
            support.
          </p>
        </header>

        <div className="mt-16 space-y-24">
          {caseStudies.map((study, index) => (
            <CaseArticle key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
