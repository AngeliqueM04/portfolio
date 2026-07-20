import { NavLink } from "react-router-dom"
import { site } from "@/data/content"
import { cn } from "@/lib/utils"

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work", end: false },
  { to: "/experience", label: "Experience", end: false },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
        aria-label="Primary"
      >
        <NavLink
          to="/"
          className="font-serif text-[1.05rem] font-semibold tracking-tight text-fg"
        >
          {site.name}
        </NavLink>
        <ul className="flex items-center gap-1 font-sans sm:gap-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-sm px-2.5 py-1.5 text-[0.82rem] font-medium transition-colors",
                    isActive ? "text-accent" : "text-fg-muted hover:text-fg",
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="#connect"
              onClick={(event) => {
                event.preventDefault()
                document
                  .getElementById("connect")
                  ?.scrollIntoView({ behavior: "smooth" })
              }}
              className="rounded-sm px-2.5 py-1.5 text-[0.82rem] font-medium text-fg-muted transition-colors hover:text-fg"
            >
              Connect
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
