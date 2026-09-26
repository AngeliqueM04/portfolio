import { About } from "@/components/About"
import { ExperiencePreview } from "@/components/ExperiencePreview"
import { Hero } from "@/components/Hero"
import { HomepageHighlights } from "@/components/HomepageHighlights"

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <HomepageHighlights />
      <ExperiencePreview />
    </>
  )
}
