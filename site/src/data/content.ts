const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

export const site = {
  name: "Angelique Muteba",
  focus:
    "MS Finance, Johns Hopkins Carey. Valuation, risk modeling, and underwriting with numbers you can verify.",
  email: "angelique.muteba0@gmail.com",
  linkedin: "https://www.linkedin.com/in/angeliquemuteba/",
  headshot: asset("headshot/headshot.jpg"),
}

export const bio = `I'm finishing my MS in Finance at Johns Hopkins Carey Business School this December, working toward a CFA charter. I recently interned at True Bearing Diagnostics, where the work was genuinely a little bit of everything: investor outreach through HubSpot and IQ500, backend site infrastructure through Cloudflare, and financial reporting in Excel and QuickBooks.

It's given me a clear look at how closely a company's financial story, its systems, and its daily operations depend on each other. I'm looking for roles where that kind of scrutiny isn't a nice to have, it's the actual job, whether that's risk, quant work, or the corporate finance side of the business.`

export const mission = `I build financial models that turn complexity into decisions people can stand behind. Rigorous forecasting, real risk analysis, numbers that hold up under pressure, not gut calls dressed up in a spreadsheet. I want people to trust the number, understand why it works, and feel confident acting on it.`

export const connectIntro = `I'm always glad to talk models, markets, or anything on this site. If something here resonated, or you just want to say hello, reach out.`

export type Stat = {
  label: string
  value: string
  note?: string
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
  beside: "problem" | "approach" | "result"
  /** Wide = multi-panel / side-by-side sub-charts only. Omit for single-panel (22rem). */
  size?: "default" | "wide"
}

export type ThesisBlock = {
  title: string
  reasons: string[]
}

export type CasePhase = {
  id: string
  title: string
  stats: Stat[]
  problem: string
  approach: string
  result: string
  tables: DataTable[]
  visuals: FloatedVisual[]
}

export type CaseStudy = {
  id: string
  title: string
  byline: string
  preview: string
  category?: string
  /** Single-phase studies use these top-level fields. */
  stats: Stat[]
  problem: string
  approach: string
  result: string
  limitations?: string
  thesis?: ThesisBlock[]
  tables: DataTable[]
  visuals: FloatedVisual[]
  /** MortgageIQ and any multi-part study. When set, Work page renders each phase. */
  phases?: CasePhase[]
  closing?: string
  scopeNote?: string
}

export type HomepageHighlight = {
  id: string
  title: string
  category: string
  problem: string
  approach: string
  result: string
  whyItMatters: string
  graph: { src: string; alt: string }
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mortgageiq",
    title: "MortgageIQ: an ML Risk Model for Mortgage Underwriting",
    byline:
      "Capstone project, Machine Learning for Finance, Prof. Sudip Gupta, Johns Hopkins Carey Business School",
    preview:
      "Three models that got progressively more rigorous: Phase 1's leak-aware MVP, Agent 1's crisis-era prior, and Agent 2's leakage-free test of the fairness hypothesis.",
    stats: [],
    problem: "",
    approach: "",
    result: "",
    tables: [],
    visuals: [],
    closing:
      "Phase 1's headline number turned out to be measuring a leak, not a model. Agent 1 traded accuracy for a testable hypothesis about why its own fairness gap existed. Agent 2 confirmed that hypothesis for gender, and found a harder, still open one for race. The honest version of this project is three models that got progressively more rigorous, not one number that looked good and stopped there.",
    scopeNote:
      "This case study covers the modeling and fairness work behind MortgageIQ's risk engine in full, data, methodology, results, and open findings included. What's intentionally left out is everything about MortgageIQ as a standalone product: the surrounding document pipeline, production architecture, and business or pricing model, since that side of it is still active, independent development.",
    phases: [
      {
        id: "phase-1",
        title: "Phase 1, Single Model MVP",
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
        problem:
          "Small independent mortgage brokers process applications manually, with no affordable path to the ML-driven risk tools large lenders use. Building a defensible model for this space takes more than accuracy. It needs explainability that holds up under ECOA and fair-lending scrutiny.",
        approach:
          "Trained and compared Decision Tree, Random Forest, and XGBoost classifiers on 933,769 cleaned HMDA Loan/Application Register records (2018 to 2024), using an 80/20 stratified split and class-weight balancing to handle a 79/21 class imbalance. Selected Random Forest for its combination of predictive performance, zero overfit gap, and SHAP-based per-applicant explainability. Ran a three-part fairness evaluation, demographic parity, disparate impact, and equalized odds, validated with 1,000-iteration bootstrap resampling.",
        result:
          "Random Forest achieved 0.996 AUC with zero overfit gap. SHAP analysis surfaced interest rate as the dominant feature by a wide margin, a pattern consistent with target leakage in HMDA origination data, since the offered rate is entangled with the underwriting decision itself. That finding shaped the model refinement work that followed. All three fairness metrics passed threshold too: a gender demographic parity gap of +3.0 percentage points, a disparate impact ratio of 0.961, and an equalized odds gap of -0.3 percentage points, all confirmed stable under bootstrap validation.",
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
            src: asset("visuals/10-mortgageiq-model-comparison.png"),
            alt: "Decision Tree vs Random Forest vs XGBoost accuracy and AUC",
            beside: "approach",
            size: "wide",
          },
          {
            src: asset("visuals/11-mortgageiq-shap-summary.png"),
            alt: "SHAP feature impact beeswarm plot",
            beside: "result",
            size: "wide",
          },
        ],
      },
      {
        id: "agent-1",
        title: "Agent 1, Crisis-Era Prior",
        stats: [
          {
            label: "Val AUC (monotonic)",
            value: "0.6815",
            note: "Ceiling for a four-feature, pre-2018 model, a 0.0061 cost for guaranteeing monotonicity",
            emphasis: "lead",
          },
          {
            label: "Gender demographic parity",
            value: "+8.4 pp",
            note: "Fails the 5pp threshold, root caused and documented as a limitation",
            emphasis: "secondary",
          },
          {
            label: "Monotonicity (shock test)",
            value: "0.0%",
            note: "Wrong-direction predictions after the fix",
            emphasis: "secondary",
          },
        ],
        problem:
          "Phase 1's 0.996 AUC came with a warning sign its own SHAP output had already surfaced. Interest rate dominated feature importance by a wide margin, a pattern consistent with target leakage, since HMDA only records a loan's rate once it originates, and a denied application has no rate to report. Before trusting that number, the model needed a version built on data structurally incapable of that leak, and a real test of whether risk scoring held up across a full economic cycle, including the 2008 crisis that the 2018 to 2024 data never touches.",
        approach:
          "Built a second model, Agent 1, on 2007 to 2017 HMDA data, the pre-2018 schema, which caps the available fields at four: loan amount, income, loan type, and loan purpose. No interest rate, no DTI, no LTV. Selected XGBoost through a walk-forward split, training on 2007 to 2013, validating on 2014 to 2015, testing on 2016 to 2017, strictly chronological, never random, so validation never sees data from before what it's tested against. A stress test, with shock magnitudes grounded in actual 2007 to 2011 Census and EPI income-decline data and Case-Shiller home-price data, not arbitrary round numbers, found a real bug. The unconstrained model let increasing loan amount at fixed income raise predicted approval probability for 31% of applicants. Fixed with monotonic constraints, verified to 0% wrong-direction, and logged at a fully quantified cost.",
        result:
          "Root caused the fairness gap rather than just measuring it. Quintile-bin matching on income and loan amount collapsed the +8.4 percentage point gap to +0.3 percentage points, meaning roughly 96% of it traces back to the model being forced to use two raw magnitude features as a weak proxy for leverage, since debt-to-income ratio doesn't exist in pre-2018 HMDA data at all. That produced a specific, testable hypothesis for the next model: give it a real leverage ratio, and the gap should close. Not a hope, a prediction, made and logged before the next model existed to confirm or deny it.",
        tables: [
          {
            caption: "Agent 1 metrics",
            headers: ["Metric", "Result", "Threshold check"],
            rows: [
              ["Val AUC (monotonic)", "0.6815", "Ceiling for available features"],
              ["Demographic parity gap (gender)", "+8.4pp", "Fails <5pp"],
              ["Disparate impact ratio", "0.858", "Passes >0.80"],
              ["Equalized odds gap", "+7.4pp", "Fails <5pp"],
              ["Monotonicity (4 shock scenarios)", "0.0% wrong-direction", "Passes"],
            ],
          },
        ],
        visuals: [
          {
            src: asset("visuals/shap_global_importance_agent1.png"),
            alt: "Agent 1 SHAP global feature importance, loan purpose dominant under the four-feature ceiling",
            beside: "approach",
          },
          {
            src: asset("visuals/agent1_risk_signal_distribution.png"),
            alt: "Agent 1 risk signal spread across the 2016 to 2017 test set",
            beside: "result",
            size: "wide",
          },
        ],
      },
      {
        id: "agent-2",
        title: "Agent 2, Testing the Hypothesis",
        stats: [
          {
            label: "Test AUC (leakage-free)",
            value: "0.83",
            note: "The real predictive number. Phase 1's 0.996 traced back to the interest-rate leak",
            emphasis: "lead",
          },
          {
            label: "Gender gap (matched)",
            value: "+0.6 pp",
            note: "Resolved, hypothesis confirmed. DTI and LTV explain the gap Agent 1 flagged",
            emphasis: "secondary",
          },
          {
            label: "Race gap (residual)",
            value: "2.6 to 4.9 pp",
            note: "Across four of five groups after matching on every legitimate risk factor. Open finding",
            emphasis: "secondary",
          },
        ],
        problem:
          "Two things to test. First, Agent 1's hypothesis: does a model with real DTI and LTV actually close the fairness gap that a four-feature model couldn't? Second, and unplanned, confirm or rule out the interest-rate leak suspected in Phase 1. A null-rate check settled it decisively, 98.5% missing for denied applications, 0.36% missing for approved ones. Phase 1's headline number was never a clean measurement of predictive power. This model needed to be honest from the start, not accurate by accident.",
        approach:
          "Trained XGBoost on 2018 to 2024 HMDA data, 10 features including real debt-to-income and loan-to-value ratios, with interest rate explicitly excluded. Monotonic constraints were applied from the first training run this time, not retrofitted after a bug the way Agent 1's were. Tested whether feeding Agent 1's own output back in as a feature helped at all, it didn't, the AUC change was negligible to negative, so it was dropped. Ran the full fairness audit twice, once for gender, and for the first time in this project, once for race, closing a gap that Agent 1's schema made impossible to even measure. The gender result matched a single confounder check, but the race result didn't, so the analysis went further: full-feature propensity-score matching across every risk factor in the model, not just two variables.",
        result:
          "The gender hypothesis held exactly as predicted. Matching applicants on DTI and LTV collapsed the gap to +0.6 percentage points, fully explained by legitimate risk factors, confirmation that Agent 1's root-cause diagnosis was right, not just plausible.\n\nRace didn't resolve the same way. Even after matching on every feature in the model, income, loan amount, DTI, LTV, property value, loan term, loan type, and loan purpose, a 2.6 to 4.9 percentage point gap survives for four of five groups. SHAP shows why it's not a dead end. DTI's contribution to the prediction diverges by roughly three times more between these groups and the reference group than any other feature, pointing at an interaction effect a single-direction monotonic constraint can't reach, not a data quality problem. Logged, disclosed, and left open rather than smoothed over, because that's the honest state of the finding.\n\nThe clearest proof point is Robert Dawson, the applicant Phase 1 approved at 125% debt-to-income, the original motivating failure for this whole two-model build. Agent 2 denies him with 96.4% confidence. A DTI sweep across his exact profile shows the decision hinges on a single, sharp threshold, right at the point his DTI crosses into HMDA's own reporting boundary. Two further profiles confirm the model generalizes rather than memorized his case. A high-LTV, otherwise healthy applicant lands in a genuine near miss, 51%, not a clean pass or fail, and a strong control profile clears comfortably at 87%, ruling out the possibility the model simply denies everyone.",
        tables: [
          {
            caption: "Agent 2 metrics",
            headers: ["Metric", "Result", "Threshold check"],
            rows: [
              [
                "Test AUC (leakage-free)",
                "0.83",
                "Honest baseline, not comparable to Phase 1's 0.996",
              ],
              [
                "Monotonicity (4 shock scenarios, grounded in 2007-2011 data)",
                "0.0% wrong-direction",
                "Passes",
              ],
              [
                "Gender demographic parity (matched on DTI/LTV)",
                "+0.6pp",
                "Passes, hypothesis confirmed",
              ],
              [
                "Race demographic parity (matched on full feature set)",
                "+2.6pp to +4.9pp (4 of 5 groups)",
                "Fails, open finding",
              ],
              [
                "Robert Dawson profile (Phase 1's original failure case)",
                "P(approve) = 0.036",
                "Correctly denied",
              ],
            ],
          },
        ],
        visuals: [
          {
            src: asset("visuals/shap_global_importance_agent2.png"),
            alt: "Agent 2 SHAP global importance, DTI and loan purpose nearly tied",
            beside: "approach",
          },
          {
            src: asset("visuals/shap_dti_dependence_agent2.png"),
            alt: "Agent 2 DTI dependence plot showing where the risk penalty concentrates",
            beside: "approach",
          },
          {
            src: asset("visuals/case_study_comparison.png"),
            alt: "DTI versus LTV threshold shapes and four-case outcome comparison including Phase 1",
            beside: "result",
            size: "wide",
          },
          {
            src: asset("visuals/blk015_race_gap_comparison.png"),
            alt: "Unmatched versus full-feature-matched race gap by group",
            beside: "result",
          },
          {
            src: asset("visuals/gender_vs_race_resolution.png"),
            alt: "Gender fully explained versus race residual, side by side",
            beside: "result",
          },
        ],
      },
    ],
  },

  {
    id: "fraud-detection",
    title: "Fraud Detection Model on Real E-Commerce Transactions",
    byline: "Independent project, IEEE-CIS Fraud Detection dataset (Kaggle)",
    category: "Machine Learning",
    preview:
      "XGBoost at 0.53 PR-AUC on a 3.5% fraud base rate, catching about half of fraud while wrongly declining 1.82% of legitimate transactions.",
    stats: [
      {
        label: "XGBoost PR-AUC",
        value: "0.53",
        note: "Best of three models on the locked test set",
        emphasis: "lead",
      },
      {
        label: "False decline rate",
        value: "1.82%",
        note: "At ~50% fraud recall",
        emphasis: "secondary",
      },
      {
        label: "Fraud base rate",
        value: "3.5%",
        note: "590,540 transactions",
        emphasis: "secondary",
      },
    ],
    problem:
      "E-commerce platforms lose real money to fraud, but a model tuned only to catch fraud aggressively ends up blocking legitimate customers, which costs a business just as much in a different way. Making the problem harder, only 3.5% of transactions in a typical dataset are actually fraudulent, so a naive accuracy score can look excellent while catching almost nothing real. This project treats that tradeoff as the actual problem to solve, not an afterthought once a headline metric looks good.",
    approach:
      "Built a fraud detection pipeline on 590,540 real e-commerce transactions (a 3.5% fraud rate) spanning roughly 182 days, merging two source files on transaction ID and expanding to 499 features after cleaning. Verified data integrity first, no duplicate keys, no row count drift after the merge. Rather than dropping fields that were 90%+ empty, tested whether the absence of data was itself predictive, it was, so missingness got encoded as a feature instead of thrown away.\n\nSplit the data chronologically (60/20/20 by transaction time, never randomly shuffled), since a real fraud system only ever predicts the future from the past, across a window where the daily fraud rate itself swung from 1.1% to 7.0%.\n\nCompared three model types (Decision Tree, Random Forest, XGBoost) and ran a leakage audit checking every feature's standalone predictive power before trusting any result.\n\nA methods finding worth stating on its own: tuning XGBoost with standard random cross-validation and with time-respecting cross-validation gave different answers, random CV kept rewarding more model complexity all the way up, while time-respecting CV correctly flagged that the most complex setting actually performed worse on genuinely future data. Tested both candidates on the real held-out test set to settle it: the time-respecting choice won by a real margin. This is the same category of catch as MortgageIQ's target leakage bug, a standard validation approach that looked fine and wasn't, caught before it shipped.",
    result:
      "XGBoost was the strongest of the three models tested (Decision Tree 0.36, Random Forest 0.45, XGBoost 0.53 on PR-AUC, the right metric here since accuracy alone is misleading when only 3.5% of transactions are fraud).\n\nAt an operating point catching about half of all fraud, the model wrongly declined 1.82% of legitimate transactions, 2,073 false declines against 2,032 real fraud cases caught, a deliberate tradeoff point, not an accident. The leakage audit came back clean, the single strongest individual feature only reached 0.68 AUC on its own, a real signal, not a sign the model was secretly seeing the answer.\n\nExplainability was checked two independent ways rather than resting the claim on one method.\n\nA segment robustness check turned up something not obvious going in: false-positive rates were highest at both very small and very large transaction amounts, a U-shape, not the \"only small transactions get flagged\" pattern that's often assumed.",
    limitations:
      "Most of the model's top features are anonymized fields the data provider never explained, a real ceiling on how far an \"explainable to a compliance team\" claim can honestly go here. There's also still a real gap between training and test performance, suggesting more room to simplify the model further. This is a batch, retrospective model, not a real-time system, no streaming inference or deployment infrastructure, that's out of scope by design, the same boundary MortgageIQ draws between research findings and an actual shippable product.",
    tables: [],
    visuals: [
      {
        src: asset("visuals/chart_missingness.png"),
        alt: "Distribution of missingness across all columns, the basis for each drop-or-keep-as-signal decision",
        beside: "approach",
      },
      {
        src: asset("visuals/chart_daily_volume_fraud_rate.png"),
        alt: "Daily transaction volume and daily fraud rate across the full 182-day window",
        beside: "approach",
        size: "wide",
      },
      {
        src: asset("visuals/chart_model_comparison_pr.png"),
        alt: "Precision-recall curves for Decision Tree, Random Forest, and XGBoost on the locked test set",
        beside: "result",
      },
      {
        src: asset("visuals/chart_shap_summary.png"),
        alt: "Top 15 features driving fraud predictions and which direction each one pushes the model",
        beside: "result",
      },
      {
        src: asset("visuals/chart_pdp_transactionamt.png"),
        alt: "Partial dependence of transaction amount on predicted fraud probability",
        beside: "result",
      },
      {
        src: asset("visuals/chart_segment_fpr_quintile.png"),
        alt: "False-positive rate by transaction amount quintile, showing a U-shape",
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
        src: asset("visuals/07-iome-three-pillar-thesis.png"),
        alt: "Current three-pillar retirement system overview",
        beside: "problem",
      },
      {
        src: asset("visuals/08-iome-model-output-trajectory.png"),
        alt: "Retirement security by age and income bracket",
        beside: "approach",
      },
      {
        src: asset("visuals/09-iome-saving-gap-70x.png"),
        alt: "Saving gap chart with 70x inequality annotation",
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
        src: asset("visuals/05-apple-valuation-rigor.jpg"),
        alt: "DCF sensitivity analysis grid across WACC and terminal growth",
        beside: "approach",
      },
      {
        src: asset("visuals/06-apple-outcome.jpg"),
        alt: "Why HOLD despite overvaluation",
        beside: "result",
      },
    ],
  },
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
        src: asset("visuals/02-lulu-valuation-rigor-cropped.jpg"),
        alt: "Deal structure pie chart and comparable company analysis",
        beside: "approach",
      },
      {
        src: asset("visuals/03-lulu-outcome.jpg"),
        alt: "Proforma EPS and margin expansion outcome charts",
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


export const homepageHighlights: HomepageHighlight[] = [
  {
    id: "mortgageiq",
    title: "MortgageIQ",
    category: "Credit Risk",
    problem:
      "Small mortgage lenders don't have access to the kind of risk-scoring tools big banks use, and any model built to fill that gap has to hold up to fair-lending law, not just look accurate.",
    approach:
      "Built three models in sequence (Phase 1, Agent 1, Agent 2), comparing model types, stress-testing against a real historical crisis (the 2008 downturn), and testing fairness across gender and race.",
    result:
      "The first version looked nearly perfect, a 99.6% accuracy score, until she caught it cheating, using information a real application wouldn't have. The honest rebuild scored 83%, closed a fairness gap for gender entirely, and left a smaller race-based gap disclosed as unresolved rather than hidden.",
    whyItMatters:
      "In lending, a model that looks accurate isn't the same as a model that's trustworthy. This project shows the discipline to catch your own mistake, fix it, and be upfront about what's still unsolved, exactly what a regulated lending or fintech risk team actually needs.",
    graph: {
      src: asset("visuals/gender_vs_race_resolution.png"),
      alt: "Gender fully explained versus race residual after matching",
    },
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection",
    category: "Machine Learning",
    problem:
      "Detect fraudulent online transactions in a large, imbalanced dataset without flooding legitimate customers with false alerts.",
    approach:
      "Built a Python fraud detection pipeline on 590,000+ transactions and 499 features, comparing multiple model types to find the strongest performer.",
    result:
      "The selected model (XGBoost) scored 0.53 on the metric that matters most for rare-event detection (PR-AUC), catching about half of all fraud while wrongly flagging fewer than 2 in 100 legitimate transactions.",
    whyItMatters:
      "Every fraud system trades off catching bad actors against not punishing good customers. This shows she can tune a model to that real tradeoff deliberately, not just chase the highest score on paper.",
    graph: {
      src: asset("visuals/chart_model_comparison_pr.png"),
      alt: "Precision-recall curves comparing Decision Tree, Random Forest, and XGBoost",
    },
  },
  {
    id: "iome",
    title: "iOme Retirement Challenge",
    category: "Retirement Policy",
    problem:
      "America's retirement system, Social Security, 401(k)s, and personal savings, is failing at once, and the failure lands hardest on the people least able to absorb it.",
    approach:
      "Built a simulation modeling 10,000 possible financial futures for workers at three income levels, then designed and individually priced three policy fixes.",
    result:
      "A typical worker's odds of retiring securely are close to a coin flip today, and get worse once Social Security's funding shortfall hits in 2033. The strongest fix alone freed up $71.57 trillion in public support, but even all three reforms combined still left nearly half of middle-income workers short.",
    whyItMatters:
      "This is policy research with real stakes, not a classroom exercise, and it ranked in the top 3 nationally. It also shows the same honesty pattern as MortgageIQ, a solution that helps, stated plainly as not being a full fix.",
    graph: {
      src: asset("visuals/08-iome-model-output-trajectory.png"),
      alt: "Retirement security by age and income bracket across policy scenarios",
    },
  },
]

export const professionalExperience: ExperienceItem[] = [
  {
    org: "True Bearing Diagnostics",
    role: "Strategic Operations and Capital Markets Intern",
    dates: "June to August 2026",
    body: "Supported the CEO directly on an active Series A raise for a pre revenue biotech company advancing toward FDA 510(k) clearance. The work covered investor pipeline management and data room prep, market sizing and competitive research, and the operational side, including CRM systems, site infrastructure, and financial reporting.",
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
