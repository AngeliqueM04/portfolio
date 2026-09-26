import { bio, mission } from "@/data/content"

export function About() {
  return (
    <section className="bg-bg" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="eyebrow">About</p>
        <h2
          id="about-heading"
          className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg"
        >
          About
        </h2>
        <blockquote className="mt-8 max-w-3xl border-l-2 border-accent pl-5 font-serif text-xl italic leading-relaxed text-fg sm:text-2xl">
          {mission}
        </blockquote>
        <p className="mt-6 max-w-3xl font-serif text-[1.05rem] leading-relaxed text-fg-muted">
          {bio}
        </p>
      </div>
    </section>
  )
}
