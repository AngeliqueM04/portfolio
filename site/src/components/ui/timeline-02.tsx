import { motion, useReducedMotion } from "framer-motion"
import type { ExperienceItem } from "@/data/content"

type TimelineItem = {
  date: string
  title: string
  content: string
  note?: string
}

type Props = {
  heading: string
  items: TimelineItem[]
  secondary?: boolean
}

function toItems(source: ExperienceItem[]): TimelineItem[] {
  return source.map((item) => ({
    date: item.dates,
    title: `${item.role}, ${item.org}`,
    content: item.body,
    note: item.note,
  }))
}

export function experienceToTimeline(source: ExperienceItem[]) {
  return toItems(source)
}

/**
 * Adapted from Timeline-02 (21st.dev/@ruixen.ui/components/timeline-02).
 * Vertical milestone timeline with restrained motion.
 */
export function Timeline02({ heading, items, secondary = false }: Props) {
  const reduce = useReducedMotion()

  return (
    <section className={secondary ? "mt-8 sm:mt-10" : undefined}>
      <h2
        className={`font-serif tracking-tight text-fg ${
          secondary
            ? "mb-10 text-2xl font-medium text-fg-muted"
            : "mb-12 text-3xl font-semibold sm:text-4xl"
        }`}
      >
        {heading}
      </h2>
      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute top-2 bottom-2 left-[11px] w-px bg-line"
          aria-hidden="true"
        />
        {items.map((item, index) => {
          const body = (
            <div className="relative mb-10 pl-12 last:mb-0">
              <div
                className={`absolute left-1.5 top-5 h-3 w-3 rounded-full ring-4 ring-bg ${
                  secondary ? "bg-fg-faint" : "bg-accent"
                }`}
              />
              <h3 className="font-serif text-lg font-medium text-fg">
                {item.title}
              </h3>
              <p className="mb-2 font-serif text-sm italic text-fg-muted">
                {item.date}
              </p>
              <div className="rounded-sm border border-line bg-bg-elevated px-5 py-4">
                <p className="font-serif leading-relaxed text-fg-muted">
                  {item.content}
                </p>
                {item.note ? (
                  <p className="mt-2 font-serif text-[0.75rem] italic text-fg-faint">
                    {item.note}
                  </p>
                ) : null}
              </div>
            </div>
          )

          if (reduce) {
            return <div key={`${item.title}-${item.date}`}>{body}</div>
          }

          return (
            <motion.div
              key={`${item.title}-${item.date}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              {body}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
