import { bio, mission } from "@/data/content"

export function About() {
  return (
    <section className="bg-bg" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-8 sm:pt-20 sm:pb-10">
        <h2
          id="about-heading"
          className="font-serif text-3xl font-semibold tracking-tight text-fg"
        >
          About
        </h2>
        <blockquote className="mt-8 max-w-3xl border-l-2 border-accent pl-5 font-serif text-xl italic leading-relaxed text-fg sm:text-2xl">
          &ldquo;{mission}&rdquo;
        </blockquote>
        <p className="mt-6 max-w-3xl font-serif text-[1.05rem] leading-relaxed text-fg-muted">
          {bio}
        </p>
      </div>
    </section>
  )
}
