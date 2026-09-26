import { connectIntro, site } from "@/data/content"

export function Connect() {
  return (
    <section id="connect" className="bg-bg" aria-labelledby="connect-heading">
      <div className="section-pad">
        <p className="eyebrow">Connect</p>
        <h2
          id="connect-heading"
          className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg"
        >
          Get in touch
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-[1.05rem] italic leading-relaxed text-fg-muted">
          {connectIntro}
        </p>
        <ul className="mt-8 space-y-3 font-sans">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="eyebrow text-fg-faint">Email</span>
              <span className="font-serif text-lg text-fg transition-colors group-hover:text-accent">
                {site.email}
              </span>
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="eyebrow text-fg-faint">LinkedIn</span>
              <span className="font-serif text-lg text-fg transition-colors group-hover:text-accent">
                linkedin.com/in/angeliquemuteba
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
