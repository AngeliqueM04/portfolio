import { bio, mission } from "@/data/content"

function paragraphs(text: string) {
  return text.trim().split(/\n\n+/)
}

export function BioMission() {
  return (
    <section className="bg-bg" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">About</p>
          <h2
            id="about-heading"
            className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg"
          >
            Bio
          </h2>
          <div className="mt-6 space-y-4 font-serif text-[1.05rem] leading-relaxed text-fg-muted">
            {paragraphs(bio).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Mission</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold italic tracking-tight text-fg">
            Mission
          </h2>
          <div className="mt-6 space-y-4 font-serif text-[1.05rem] leading-relaxed text-fg-muted">
            {paragraphs(mission).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
