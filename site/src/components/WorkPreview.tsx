import { Link } from "react-router-dom"
import { caseStudies } from "@/data/content"

export function WorkPreview() {
  return (
    <section className="bg-bg" aria-labelledby="work-preview-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2
              id="work-preview-heading"
              className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg"
            >
              Case studies
            </h2>
          </div>
          <Link
            to="/work"
            className="font-sans text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Full writeups
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <li key={study.id}>
              <Link
                to={`/work#${study.id}`}
                className="block rounded-sm border border-line bg-bg-elevated p-5 transition-colors hover:border-accent/60"
              >
                <h3 className="font-serif text-lg font-medium text-fg">
                  {study.title}
                </h3>
                <p className="mt-3 font-serif text-sm italic leading-relaxed text-fg-muted">
                  {study.preview}
                </p>
                <p className="mt-4 font-sans text-[0.75rem] text-accent">
                  Read more
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
