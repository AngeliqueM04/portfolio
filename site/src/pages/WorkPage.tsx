import type { ReactNode } from "react"
import {
  caseStudies,
  type CasePhase,
  type CaseStudy,
  type FloatedVisual,
} from "@/data/content"
import { DataTable } from "@/components/ui/data-table"
import { StatPanel } from "@/components/ui/stat-panel"

function FloatedFigures({ visuals }: { visuals: FloatedVisual[] }) {
  if (visuals.length === 0) return null
  /**
   * Exactly two fixed widths for case-study charts:
   * standard 22rem (single-panel), wide 36rem (multi-panel / side-by-side).
   * Native PNG resolution does not change rendered width.
   */
  const columnWide = visuals.some((visual) => visual.size === "wide")
  return (
    <div
      className={
        columnWide
          ? "flex w-full flex-col gap-4 lg:w-[36rem] lg:shrink-0"
          : "flex w-full flex-col gap-4 lg:w-[22rem] lg:shrink-0"
      }
    >
      {visuals.map((visual) => {
        const wide = visual.size === "wide"
        return (
          <figure
            key={visual.src}
            className={
              wide
                ? "w-full max-w-full overflow-hidden rounded-sm border border-line bg-bg-elevated lg:w-[36rem]"
                : "w-full max-w-full overflow-hidden rounded-sm border border-line bg-bg-elevated lg:w-[22rem] lg:self-end"
            }
          >
            <img
              src={visual.src}
              alt={visual.alt}
              loading="lazy"
              className="block h-auto w-full object-contain"
            />
          </figure>
        )
      })}
    </div>
  )
}

function NarrativeBlock({
  label,
  text,
  visuals,
  extra,
}: {
  label: string
  text: string
  visuals?: FloatedVisual[]
  extra?: ReactNode
}) {
  const hasVisuals = Boolean(visuals && visuals.length > 0)
  const paragraphs = text.split(/\n\n+/).filter(Boolean)

  return (
    <div className="mt-10">
      <p className="eyebrow">{label}</p>
      <div
        className={
          hasVisuals
            ? "mt-3 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8"
            : "mt-3"
        }
      >
        <div className="min-w-0 flex-1">
          {paragraphs.map((p) => (
            <p
              key={p.slice(0, 48)}
              className="font-serif text-[1.05rem] leading-relaxed text-fg-muted [&:not(:first-child)]:mt-4"
            >
              {p}
            </p>
          ))}
          {extra}
        </div>
        {hasVisuals ? <FloatedFigures visuals={visuals!} /> : null}
      </div>
    </div>
  )
}

function PhaseBody({ phase }: { phase: CasePhase }) {
  const bySection = (key: FloatedVisual["beside"]) =>
    phase.visuals.filter((v) => v.beside === key)

  return (
    <div className="mt-10">
      <h3 className="font-serif text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        {phase.title}
      </h3>

      {phase.stats.length > 0 ? (
        <div className="mt-6 rounded-sm border border-line bg-bg-elevated/70 px-5 py-6 sm:px-6">
          <StatPanel stats={phase.stats} />
        </div>
      ) : null}

      <NarrativeBlock
        label="Problem"
        text={phase.problem}
        visuals={bySection("problem")}
      />

      <NarrativeBlock
        label="Approach"
        text={phase.approach}
        visuals={bySection("approach")}
      />

      {phase.tables.length > 0 ? (
        <div className="mt-8 space-y-4">
          {phase.tables.map((table) => (
            <DataTable key={table.caption} table={table} />
          ))}
        </div>
      ) : null}

      <NarrativeBlock
        label="Result"
        text={phase.result}
        visuals={bySection("result")}
      />
    </div>
  )
}

function SinglePhaseBody({ study }: { study: CaseStudy }) {
  const bySection = (key: FloatedVisual["beside"]) =>
    study.visuals.filter((v) => v.beside === key)

  return (
    <>
      {study.stats.length > 0 ? (
        <div className="mt-8 rounded-sm border border-line bg-bg-elevated/70 px-5 py-6 sm:px-6">
          <StatPanel stats={study.stats} />
        </div>
      ) : null}

      <NarrativeBlock
        label="Problem"
        text={study.problem}
        visuals={bySection("problem")}
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
        visuals={bySection("approach")}
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
        visuals={bySection("result")}
      />
    </>
  )
}

function CaseArticle({
  study,
  index,
}: {
  study: CaseStudy
  index: number
}) {
  const phases = study.phases

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

      {phases && phases.length > 0 ? (
        <div className="mt-4 space-y-16">
          {phases.map((phase) => (
            <PhaseBody key={phase.id} phase={phase} />
          ))}
        </div>
      ) : (
        <SinglePhaseBody study={study} />
      )}

      {study.closing ? (
        <p className="mt-12 border-l-2 border-accent pl-5 font-serif text-[1.08rem] italic leading-relaxed text-fg">
          {study.closing}
        </p>
      ) : null}

      {study.scopeNote ? (
        <aside
          className="mt-8 rounded-sm border border-line bg-bg-soft/60 px-5 py-4"
          aria-label="Scope note"
        >
          <p className="eyebrow text-fg-faint">Scope note</p>
          <p className="mt-2 font-serif text-[0.98rem] leading-relaxed text-fg-muted">
            {study.scopeNote}
          </p>
        </aside>
      ) : null}
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
