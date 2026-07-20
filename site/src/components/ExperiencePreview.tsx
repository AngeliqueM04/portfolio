import { Link } from "react-router-dom"
import { professionalExperience } from "@/data/content"

export function ExperiencePreview() {
  const top = professionalExperience.slice(0, 2)

  return (
    <section
      className="bg-bg"
      aria-labelledby="experience-preview-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Experience</p>
            <h2
              id="experience-preview-heading"
              className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg"
            >
              Recent roles
            </h2>
          </div>
          <Link
            to="/experience"
            className="font-sans text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Full timeline
          </Link>
        </div>
        <ul className="mt-10 space-y-6">
          {top.map((item) => (
            <li
              key={`${item.org}-${item.role}`}
              className="border-t border-line pt-6 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-lg text-fg">
                  {item.role}
                  <span className="italic text-fg-muted"> · {item.org}</span>
                </h3>
                <p className="font-serif text-sm italic text-fg-faint">
                  {item.dates}
                </p>
              </div>
              <p className="mt-2 max-w-3xl font-serif text-sm leading-relaxed text-fg-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
