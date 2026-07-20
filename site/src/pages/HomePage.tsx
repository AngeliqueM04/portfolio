import { BioMission } from "@/components/BioMission"
import { ExperiencePreview } from "@/components/ExperiencePreview"
import { Hero } from "@/components/Hero"
import { WorkPreview } from "@/components/WorkPreview"

export function HomePage() {
  return (
    <>
      <Hero />
      <BioMission />
      <WorkPreview />
      <ExperiencePreview />
    </>
  )
}
