import { useState } from "react"
import { Link } from "react-router-dom"
import { homepageHighlights } from "@/data/content"

export function HomepageHighlights() {
  const [activeId, setActiveId] = useState(homepageHighlights[0]?.id ?? "")
  const active =
    homepageHighlights.find((tab) => tab.id === activeId) ??
    homepageHighlights[0]

  if (!active) return null

  return (
    <section className="bg-bg" aria-labelledby="highlights-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h2
            id="highlights-heading"
            className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg"
          >
            Highlights
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Project highlights"
          className="mt-10 flex flex-wrap gap-2 border-b border-line"
        >
          {homepageHighlights.map((tab) => {
            const selected = tab.id === active.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`highlight-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`highlight-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                className={
                  selected
                    ? "-mb-px border-b-2 border-accent px-3 pb-3 pt-1 font-serif text-base font-medium text-fg"
                    : "-mb-px border-b-2 border-transparent px-3 pb-3 pt-1 font-serif text-base text-fg-muted transition-colors hover:text-fg"
                }
              >
                {tab.title}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`highlight-panel-${active.id}`}
          aria-labelledby={`highlight-tab-${active.id}`}
          className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-12"
        >
          <div className="min-w-0">
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-fg">
              {active.title}
            </h3>
            <p className="mt-2 font-serif text-base italic text-fg-muted">
              {active.category}
            </p>

            <div className="mt-8 space-y-6">
              {(
                [
                  ["Problem", active.problem],
                  ["Approach", active.approach],
                  ["Result", active.result],
                  ["Why it matters", active.whyItMatters],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <p className="eyebrow">{label}</p>
                  <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-fg-muted">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <figure className="overflow-hidden rounded-sm border border-line bg-bg-elevated lg:w-[22rem] lg:shrink-0">
            <img
              src={active.graph.src}
              alt={active.graph.alt}
              loading="lazy"
              className="block h-auto w-full object-contain"
            />
          </figure>
        </div>

        <div className="mt-10">
          <Link
            to="/work"
            className="font-sans text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            See all work
          </Link>
        </div>
      </div>
    </section>
  )
}
