import { BioMission } from "@/components/BioMission"
import { ExperiencePreview } from "@/components/ExperiencePreview"
import { Hero } from "@/components/Hero"
import { HomepageHighlights } from "@/components/HomepageHighlights"

export function HomePage() {
  return (
    <>
      <Hero />
      <HomepageHighlights />
      <BioMission />
      <ExperiencePreview />
    </>
  )
}
