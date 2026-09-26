import { bio, mission } from "@/data/content"

export function About() {
  return (
    <section className="bg-bg" aria-labelledby="about-heading">
      <div className="section-pad">
        <h2
          id="about-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-fg"
        >
          About
        </h2>
        <blockquote className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-fg sm:text-2xl">
          &ldquo;{mission}&rdquo;
        </blockquote>
        <p className="mt-6 max-w-3xl font-serif text-[1.05rem] leading-relaxed text-fg-muted">
          {bio}
        </p>
      </div>
    </section>
  )
}
