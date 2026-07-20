import { Link } from "react-router-dom"
import { site } from "@/data/content"
import { Spotlight } from "@/components/ui/spotlight"

/**
 * Hero pick: Spotlight over ruixen-ui-hero.
 * Previewed both. ruixen-ui-hero is a light SaaS split layout with two CTAs
 * and a feature checklist card, not Susquehanna-style presence.
 * Spotlight on a photographic dark field, bold headline, one CTA.
 * Bottom fades into the site cream so the hero introduces the palette.
 */
export function Hero() {
  return (
    <section
      className="relative isolate min-h-[88svh] overflow-hidden bg-hero text-hero-fg"
      aria-labelledby="hero-name"
    >
      <img
        src={site.headshot}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_22%] opacity-45"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-hero via-hero/88 to-hero/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-hero/45"
        aria-hidden="true"
      />
      <Spotlight
        className="-top-32 left-0 md:-top-16 md:left-40"
        fill="#6E7F68"
      />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-5 pb-28 pt-28 sm:px-8 sm:pb-32 lg:justify-center lg:pb-36">
        <div className="max-w-2xl">
          <h1
            id="hero-name"
            className="font-serif text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-hero-fg sm:text-5xl lg:text-[3.6rem]"
          >
            {site.name}
          </h1>
          <p className="mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-hero-muted sm:text-xl">
            {site.focus}
          </p>
          <div className="mt-10">
            <Link
              to="/work"
              className="inline-flex items-center rounded-sm bg-hero-fg px-6 py-3 text-sm font-medium text-hero transition-opacity hover:opacity-90"
            >
              View case studies
            </Link>
          </div>
        </div>
      </div>

      {/* Navy → cream blend into the landing page below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-b from-transparent via-bg/55 to-bg sm:h-44"
        aria-hidden="true"
      />
    </section>
  )
}
