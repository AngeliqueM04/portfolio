export const site = {
  name: "Angelique Muteba",
  focus:
    "MS Finance, Johns Hopkins Carey. Valuation, risk modeling, and underwriting with numbers you can verify.",
  email: "angelique.muteba0@gmail.com",
  linkedin: "https://www.linkedin.com/in/angeliquemuteba/",
  headshot: "./headshot/headshot.jpg",
}

export const bio = `I'm finishing my MS in Finance at Johns Hopkins Carey Business School this December, working toward a CFA charter. Right now I'm interning at True Bearing Diagnostics, where the work is genuinely a little bit of everything: investor outreach through HubSpot and IQ500, backend site infrastructure through Cloudflare, and financial reporting in Excel and QuickBooks.

It's given me a clear look at how closely a company's financial story, its systems, and its daily operations depend on each other. I'm looking for roles where that kind of scrutiny isn't a nice to have, it's the actual job, whether that's risk, quant work, or the corporate finance side of the business.`

export const mission = `I build financial models that turn complexity into decisions people can stand behind. Rigorous forecasting, real risk analysis, numbers that hold up under pressure, not gut calls dressed up in a spreadsheet. I want people to trust the number, understand why it works, and feel confident acting on it.`

export const connectIntro = `I'm always glad to talk models, markets, or anything on this site. If something here resonated, or you just want to say hello, reach out.`

export type Stat = {
  label: string
  value: string
  note?: string
  /** Visual weight for non-uniform presentation */
  emphasis?: "lead" | "secondary" | "inline"
}

export type DataTable = {
  caption: string
  headers: string[]
  rows: string[][]
}

export type FloatedVisual = {
  src: string
  alt: string
  /** Which narrative block the figure sits beside */
  beside: "problem" | "approach" | "result"
}

export type ThesisBlock = {
  title: string
  reasons: string[]
}

export type CaseStudy = {
  id: string
  title: string
  byline: string
  problem: string
  approach: string
  result: string
  preview: string
  /** Live stats. Only Apple uses a dedicated 3-stat panel from the old 04 slide. */
  stats: Stat[]
  /** Lulu thesis reasoning as live bullets (from 01-lulu-thesis.jpg content). */
  thesis?: ThesisBlock[]
  tables: DataTable[]
  visuals: FloatedVisual[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "lululemon",
    title: "Lululemon x Columbia: M&A Advisory Case",
    byline: "Group project with Linh Duong and Oleksandra Bilichenko",
    problem:
      "Evaluate whether Lululemon should acquire Columbia Sportswear to address slowing North American growth, heavy reliance on women's apparel, and a maturing core market.",
    approach:
      "DCF (Gordon Growth terminal value, WACC 10.89%) and comparable company analysis (P/E, EV/EBITDA, EV/EBIT, EV/Revenue) across an 11-company peer set. Modeled financing structure using Lululemon's historical max leverage (0.4x D/E) split across debt, existing cash, and new share issuance.",
    result:
      "Recommended acquisition at $5.37B ($102.60 per share), a 30% control premium and about 36% upside over Columbia's roughly $67 trading price at the time. Modeled EBITDA margin expansion of about 5.5% for Columbia and about 3% for Lululemon post-synergy, financed via 52.4% stock, 30% debt, and 19.5% existing cash.",
    preview:
      "Recommended acquisition at $5.37B ($102.60 per share), a 30% control premium over Columbia's then trading price.",
    stats: [
      {
        label: "Equity value",
        value: "$5.37B",
        note: "Up from $3.15B",
        emphasis: "lead",
      },
      {
        label: "Offer price",
        value: "$102.60",
        note: "~36% upside vs ~$67 trading price",
        emphasis: "secondary",
      },
      {
        label: "Control premium",
        value: "30%",
        emphasis: "secondary",
      },
    ],
    thesis: [
      {
        title: "Why Lululemon should expand now",
        reasons: [
          "Heavy reliance on women's apparel creates a call for diversification.",
          "High dependence on a slowing US market creates a call for geographic expansion.",
          "Growth is entering maturity, a moment to slow the pace and anchor a leadership position.",
        ],
      },
      {
        title: "Why acquire Columbia specifically",
        reasons: [
          "Margin pressure from adapting slowly to direct-to-customer channels points to an ecommerce partnership need.",
          "Losing market share and high-end reputation creates a need to strengthen brand.",
          "Weakened top line from declining bulk retailer orders points to other distribution channels.",
        ],
      },
    ],
    tables: [
      {
        caption: "Financing mix at 0.4x D/E historical max leverage",
        headers: ["Source", "Share of financing"],
        rows: [
          ["Stock issuance", "52.4%"],
          ["Debt", "30%"],
          ["Existing cash", "19.5%"],
        ],
      },
    ],
    visuals: [
      {
        src: "./visuals/02-lulu-valuation-rigor-cropped.jpg",
        alt: "Deal structure pie chart and comparable company analysis",
        beside: "approach",
      },
      {
        src: "./visuals/03-lulu-outcome.jpg",
        alt: "Proforma EPS and margin expansion outcome charts",
        beside: "result",
      },
    ],
  },
  {
    id: "apple",
    title: "Apple Inc. Equity Research: HOLD",
    byline:
      "Group project with Gulara Huseynli, Johns Hopkins Carey Business School",
    problem:
      "Initiate coverage on Apple Inc. with a rated recommendation grounded in a blended valuation.",
    approach:
      "A three-method blended valuation: DCF (30% weight, WACC 8.93%, 2% terminal growth), forward P/E comps (35%, peer set Microsoft, Alphabet, Meta), and EV/EBITDA comps (35%). Bear, base, and bull scenario modeling, plus full sensitivity analysis across WACC and terminal growth, and beta and ERP.",
    result:
      "HOLD at a blended fair value of $171.30 per share (bear $162.15, bull $175.95) against a $276.92 market price, about 38% implied downside. All three methods independently converged on overvaluation (DCF $101.70, P/E-implied $184.95, EV/EBITDA-implied $217.31), and the thesis holds that Apple's quality premium is earned despite the gap.",
    preview:
      "HOLD at a blended fair value of $171.30 against a $276.92 market price, about 38% implied downside.",
    stats: [
      { label: "Current price", value: "$276.92", emphasis: "secondary" },
      {
        label: "Base case fair value",
        value: "$171.30",
        emphasis: "lead",
      },
      {
        label: "Implied return",
        value: "~38% downside",
        note: "Base case vs market price",
        emphasis: "secondary",
      },
    ],
    tables: [
      {
        caption: "Blended valuation methods",
        headers: ["Method", "Weight", "Implied value"],
        rows: [
          ["DCF", "30%", "$101.70"],
          ["Forward P/E comps", "35%", "$184.95"],
          ["EV/EBITDA comps", "35%", "$217.31"],
          ["Blended (base)", "100%", "$171.30"],
        ],
      },
    ],
    visuals: [
      {
        src: "./visuals/05-apple-valuation-rigor.jpg",
        alt: "DCF sensitivity analysis grid across WACC and terminal growth",
        beside: "approach",
      },
      {
        src: "./visuals/06-apple-outcome.jpg",
        alt: "Why HOLD despite overvaluation",
        beside: "result",
      },
    ],
  },
  {
    id: "iome",
    title: "Can Ashley Retire Securely? iOme Research Challenge 2026",
    byline:
      "Group project with Ananya Shrivastava, Mpho Olatotse, Jianzhuo Chang, and Yuer Lan. Faculty Advisor: Phillip Phan, Ph.D. Johns Hopkins Carey Business School. Top 3 finalist, national competition.",
    problem:
      "America's three-pillar retirement system, Social Security, employer 401(k)s, and personal savings, is failing all at once, and the failure falls hardest on the workers least equipped to absorb it. A median-income Gen Z worker doing everything the system asks has only a 53.9% chance of retiring securely under current policy. Once the 2033 Social Security trust fund depletion is priced in, that drops to 45.1%. Under a moderate benefit cut, a low-income worker needs 26.2 additional percentage points of gross income saved just to stay on track, a high-income worker needs only 0.4. That gap is a 70x inequality multiplier, and it's built into the system's design, not into anyone's behavior.",
    approach:
      "Built a lifecycle Monte Carlo simulation, 10,000 paths per scenario with market crisis shocks embedded, calibrated to SSA, IRS, BLS, and EBRI data. Modeled three income brackets ($35K, $65K, $120K) from workforce entry in 2025 through retirement in 2068 across five Social Security benefit scenarios, then proposed three structural reforms, a Sovereign Wealth Fund, a Retirement Preservation Account, and a Retirement Health Account, each costed independently and stress tested across 2,500 additional simulations.",
    result:
      "Even with all three reforms combined, only 50.5% of mid-income and 23.8% of low-income Gen Z workers reach retirement security. The reforms narrow the gap, but they can't close it without Social Security's benefit floor staying intact. The Sovereign Wealth Fund alone cuts net public support needed from $368.93T to $297.36T against the PAYGO baseline, while still protecting 100% of scheduled benefits through the transition.",
    preview:
      "A median-income Gen Z worker has a 53.9% chance of retiring securely under current policy, falling to 45.1% once 2033 trust fund depletion is priced in.",
    stats: [
      {
        label: "Current policy security",
        value: "53.9%",
        note: "Median-income Gen Z",
        emphasis: "lead",
      },
      {
        label: "After 2033 depletion",
        value: "45.1%",
        emphasis: "secondary",
      },
      {
        label: "Inequality multiplier",
        value: "70x",
        note: "26.2pp vs 0.4pp under moderate benefit cut",
        emphasis: "secondary",
      },
    ],
    tables: [],
    visuals: [
      {
        src: "./visuals/07-iome-three-pillar-thesis.png",
        alt: "Current three-pillar retirement system overview",
        beside: "problem",
      },
      {
        src: "./visuals/08-iome-model-output-trajectory.png",
        alt: "Retirement security by age and income bracket",
        beside: "approach",
      },
      {
        src: "./visuals/09-iome-saving-gap-70x.png",
        alt: "Saving gap chart with 70x inequality annotation",
        beside: "result",
      },
    ],
  },
  {
    id: "mortgageiq",
    title: "MortgageIQ: an ML Risk Model for Mortgage Underwriting",
    byline:
      "Capstone project, Machine Learning for Finance, Prof. Sudip Gupta, Johns Hopkins Carey Business School",
    problem:
      "Small independent mortgage brokers process applications manually, with no affordable path to the ML-driven risk tools large lenders use. Building a defensible model for this space takes more than accuracy. It needs explainability that holds up under ECOA and fair-lending scrutiny.",
    approach:
      "Trained and compared Decision Tree, Random Forest, and XGBoost classifiers on 933,769 cleaned HMDA Loan/Application Register records (2018 to 2024), using an 80/20 stratified split and class-weight balancing to handle a 79/21 class imbalance. Selected Random Forest for its combination of predictive performance, zero overfit gap, and SHAP-based per-applicant explainability. Ran a three-part fairness evaluation, demographic parity, disparate impact, and equalized odds, validated with 1,000-iteration bootstrap resampling.",
    result:
      "Random Forest achieved 0.996 AUC with zero overfit gap. SHAP analysis surfaced interest rate as the dominant feature by a wide margin, a pattern consistent with target leakage in HMDA origination data, since the offered rate is entangled with the underwriting decision itself. That finding shaped the model refinement work that followed. All three fairness metrics passed threshold too: a gender demographic parity gap of +3.0 percentage points, a disparate impact ratio of 0.961, and an equalized odds gap of -0.3 percentage points, all confirmed stable under bootstrap validation.",
    preview:
      "Random Forest at 0.996 AUC with zero overfit gap, plus fairness metrics that cleared threshold under bootstrap validation.",
    stats: [
      {
        label: "Random Forest AUC",
        value: "0.996",
        note: "Zero overfit gap on 933,769 HMDA records",
        emphasis: "lead",
      },
      {
        label: "Disparate impact",
        value: "0.961",
        emphasis: "secondary",
      },
      {
        label: "Equalized odds gap",
        value: "-0.3 pp",
        emphasis: "secondary",
      },
    ],
    tables: [
      {
        caption: "Fairness evaluation (gender, research only, not product UI)",
        headers: ["Metric", "Result", "Threshold check"],
        rows: [
          ["Demographic parity gap", "+3.0 pp", "Passes"],
          ["Disparate impact ratio", "0.961", "Passes"],
          ["Equalized odds gap", "-0.3 pp", "Passes"],
          ["Bootstrap iterations", "1,000", "Stable"],
        ],
      },
    ],
    visuals: [
      {
        src: "./visuals/10-mortgageiq-model-comparison.png",
        alt: "Decision Tree vs Random Forest vs XGBoost accuracy and AUC",
        beside: "approach",
      },
      {
        src: "./visuals/11-mortgageiq-shap-summary.png",
        alt: "SHAP feature impact beeswarm plot",
        beside: "result",
      },
    ],
  },
]

export type ExperienceItem = {
  org: string
  role: string
  dates: string
  body: string
  note?: string
}

export const professionalExperience: ExperienceItem[] = [
  {
    org: "True Bearing Diagnostics",
    role: "Strategic Operations and Capital Markets Intern",
    dates: "June 2026 to present",
    body: "Supporting the CEO directly on an active Series A raise for a pre revenue biotech company advancing toward FDA 510(k) clearance. The work covers investor pipeline management and data room prep, market sizing and competitive research, and the operational side, including CRM systems, site infrastructure, and financial reporting.",
  },
  {
    org: "Student Managed Investment Fund",
    role: "Investment Analyst",
    dates: "August to December 2024, University of Kentucky",
    body: "Covered three equity positions inside a $5.5 million student managed endowment. Built Excel models evaluating return drivers and risk adjusted performance, wrote investment memos, and presented buy, hold, and sell recommendations to the investment committee.",
  },
  {
    org: "PwC Non-Profit Consulting Externship",
    role: "Finance and Data Analyst",
    dates: "June to July 2024",
    body: "Cleaned and standardized financial data across eight nonprofit organizations pulled from inconsistent legacy systems, producing audit ready reporting and risk flagged summaries for senior leadership.",
  },
  {
    org: "AmplifyMe",
    role: "Markets Training Program",
    dates: "July 2024",
    body: "Built a full DCF and comps merger valuation model for the Microsoft Activision deal, stress tested bear, base, and bull scenarios, and traded in a simulated market to build intuition for how information moves price.",
    note: "Training program, not an employer.",
  },
]

export const campusExperience: ExperienceItem[] = [
  {
    org: "Johns Hopkins Carey Business School",
    role: "Graduate Assistant, Peer Career Advisor",
    dates: "December 2025 to present",
    body: "Advise graduate students on resumes, interview preparation, and job search strategy across finance, consulting, and analytics tracks, and review student materials ahead of recruiting cycles.",
  },
  {
    org: "Johns Hopkins Carey Business School",
    role: "Teaching Assistant, Marketing",
    dates: "August to December 2025",
    body: "Graded assignments across two undergraduate marketing sections and gave written feedback on consumer behavior and brand strategy coursework.",
  },
]
