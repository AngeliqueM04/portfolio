import {
  campusExperience,
  professionalExperience,
} from "@/data/content"
import {
  experienceToTimeline,
  Timeline02,
} from "@/components/ui/timeline-02"

export function ExperiencePage() {
  return (
    <div className="bg-bg">
      <div className="section-pad">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="eyebrow">Experience</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Professional and campus roles
          </h1>
          <p className="mt-4 font-serif italic text-fg-muted">
            Professional roles first. Campus and teaching roles follow as a
            secondary group, not mixed chronologically into the main list.
          </p>
        </header>

        <Timeline02
          heading="Professional"
          items={experienceToTimeline(professionalExperience)}
        />
        <Timeline02
          heading="Campus and teaching"
          items={experienceToTimeline(campusExperience)}
          secondary
        />
      </div>
    </div>
  )
}
