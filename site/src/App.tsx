import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Connect } from "@/components/Connect"
import { Nav } from "@/components/Nav"
import { ExperiencePage } from "@/pages/ExperiencePage"
import { HomePage } from "@/pages/HomePage"
import { WorkPage } from "@/pages/WorkPage"

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function Shell() {
  return (
    <>
      <ScrollToHash />
      <a
        href="#connect"
        onClick={(event) => {
          event.preventDefault()
          document
            .getElementById("connect")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-bg-elevated focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to connect
      </a>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
      </main>
      <Connect />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
