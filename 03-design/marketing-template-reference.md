# How marketing templates look, and how finance sites actually differ

This is reference material for the design brainstorm, not a spec. Read it, then make deliberate choices against the brief, don't default to either extreme described below.

## What a generic marketing template looks like

Most off-the-shelf marketing and portfolio templates (the kind found on component marketplaces and portfolio builders) lean on a familiar pattern: a large animated hero statement, a horizontally scrolling logo or skills strip, glassy cards with hover-lift effects, heavy use of gradient accents or a single bold brand color, and a testimonials carousel near the bottom. This pattern is built to sell a personal brand fast, lots of visual energy, low information density per section, optimized for a general audience scrolling quickly. It's the right choice for a designer, a photographer, or a creative freelancer whose work is inherently visual.

It is not the right shape for this site. A recruiter evaluating a quant or risk candidate is not being sold a vibe, they're checking whether the work holds up.

## How finance-specific sites actually differ

Finance and fintech sites in 2026 have been moving away from the cold, purely institutional look, but not toward marketing-template energy either. The direction is closer to restrained credibility: direct figures instead of vague claims, clear charts instead of decorative graphics, simplified tables, and a level of transparency where the numbers are shown, not just asserted. Trust is built through specificity and legibility, not through visual flourish. Financial analyst portfolio guidance points the same direction for individuals: clear navigation, a straightforward About section, and project samples that show the actual work and its impact, not a stylized summary of it.

Existing quant-specific portfolios (the kind built by candidates targeting quant research or trading roles) tend to go further toward plainness than even mainstream fintech sites, often close to a structured project index: what was built, what data or method was used, what the result was. The risk with these is going too far in the other direction, ending up as a bare list that reads more like a GitHub README than a considered personal site.

## What this means for this build

The right target sits between those two extremes, closer to the finance-site end than the marketing-template end, but not as bare as a pure project index. Concretely:

- Lead with specific, real numbers on every case study (already true of the locked copy), don't summarize them into vaguer marketing language.
- Motion and component richness should support legibility (a chart animating into view once, a smooth transition between sections) rather than compete for attention with the content. Skip anything closer to a hover-lift card grid or a gradient-heavy hero, that reads as generic template energy, not finance credibility.
- A restrained, deliberate color and type system (decided fresh per the frontend-design skill process) will do more to signal seriousness than any single flashy interaction would.
- One well-executed distinctive element, tied to the site's actual differentiator (verifiable, sourced numbers) beats several small decorative ones. Consider a visible "source" or "methodology" tag pattern across case studies as that one distinctive element, since it's structurally honest to what this candidate's work actually is, rather than a generic hero animation borrowed from a template.
