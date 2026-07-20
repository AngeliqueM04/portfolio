# Case studies, v1 (4 total)

Fama-French is deferred entirely, own future session, not part of this build. Testimonials are deferred to a future version.

Image references point to files in `../01-experience/visuals/`. See `visuals/00-manifest.md` for the full mapping.

---

## 1. Lululemon x Columbia M&A Advisory Case

**Lululemon x Columbia: M&A Advisory Case**
Group project with Linh Duong and Oleksandra Bilichenko

**The problem:** Evaluate whether Lululemon should acquire Columbia Sportswear to address slowing North American growth, heavy reliance on women's apparel, and a maturing core market.

**Approach:** DCF (Gordon Growth terminal value, WACC 10.89%) and comparable company analysis (P/E, EV/EBITDA, EV/EBIT, EV/Revenue) across an 11-company peer set. Modeled financing structure using Lululemon's historical max leverage (0.4x D/E) split across debt, existing cash, and new share issuance.

**Result:** Recommended acquisition at $5.37B ($102.60 per share), a 30% control premium and about 36% upside over Columbia's roughly $67 trading price at the time. Modeled EBITDA margin expansion of about 5.5% for Columbia and about 3% for Lululemon post-synergy, financed via 52.4% stock, 30% debt, and 19.5% existing cash.

Images: `01-lulu-thesis.jpg`, `02-lulu-valuation-rigor-cropped.jpg`, `03-lulu-outcome.jpg`

---

## 2. Apple Equity Valuation

**Apple Inc. Equity Research: HOLD**
Group project with Gulara Huseynli, Johns Hopkins Carey Business School

**The problem:** Initiate coverage on Apple Inc. with a rated recommendation grounded in a blended valuation.

**Approach:** A three-method blended valuation: DCF (30% weight, WACC 8.93%, 2% terminal growth), forward P/E comps (35%, peer set Microsoft, Alphabet, Meta), and EV/EBITDA comps (35%). Bear, base, and bull scenario modeling, plus full sensitivity analysis across WACC and terminal growth, and beta and ERP.

**Result:** HOLD at a blended fair value of $171.30 per share (bear $162.15, bull $175.95) against a $276.92 market price, about 38% implied downside. All three methods independently converged on overvaluation (DCF $101.70, P/E-implied $184.95, EV/EBITDA-implied $217.31), and the thesis holds that Apple's quality premium is earned despite the gap.

Images: `04-apple-thesis-cropped.png`, `05-apple-valuation-rigor.jpg`, `06-apple-outcome.jpg`

---

## 3. iOme Retirement Challenge

**Can Ashley Retire Securely? iOme Research Challenge 2026**
Group project with Ananya Shrivastava, Mpho Olatotse, Jianzhuo Chang, and Yuer Lan. Faculty Advisor: Phillip Phan, Ph.D. Johns Hopkins Carey Business School. Top 3 finalist, national competition.

**The problem:** America's three-pillar retirement system, Social Security, employer 401(k)s, and personal savings, is failing all at once, and the failure falls hardest on the workers least equipped to absorb it. A median-income Gen Z worker doing everything the system asks has only a 53.9% chance of retiring securely under current policy. Once the 2033 Social Security trust fund depletion is priced in, that drops to 45.1%. Under a moderate benefit cut, a low-income worker needs 26.2 additional percentage points of gross income saved just to stay on track, a high-income worker needs only 0.4. That gap is a 70x inequality multiplier, and it's built into the system's design, not into anyone's behavior.

**Approach:** Built a lifecycle Monte Carlo simulation, 10,000 paths per scenario with market crisis shocks embedded, calibrated to SSA, IRS, BLS, and EBRI data. Modeled three income brackets ($35K, $65K, $120K) from workforce entry in 2025 through retirement in 2068 across five Social Security benefit scenarios, then proposed three structural reforms, a Sovereign Wealth Fund, a Retirement Preservation Account, and a Retirement Health Account, each costed independently and stress tested across 2,500 additional simulations.

**Result:** Even with all three reforms combined, only 50.5% of mid-income and 23.8% of low-income Gen Z workers reach retirement security. The reforms narrow the gap, but they can't close it without Social Security's benefit floor staying intact. The Sovereign Wealth Fund alone cuts net public support needed from $368.93T to $297.36T against the PAYGO baseline, while still protecting 100% of scheduled benefits through the transition.

Images: `07-iome-three-pillar-thesis.png`, `08-iome-model-output-trajectory.png`, `09-iome-saving-gap-70x.png`

---

## 4. MortgageIQ

**MortgageIQ: an ML Risk Model for Mortgage Underwriting**
Capstone project, Machine Learning for Finance, Prof. Sudip Gupta, Johns Hopkins Carey Business School

**The problem:** Small independent mortgage brokers process applications manually, with no affordable path to the ML-driven risk tools large lenders use. Building a defensible model for this space takes more than accuracy. It needs explainability that holds up under ECOA and fair-lending scrutiny.

**Approach:** Trained and compared Decision Tree, Random Forest, and XGBoost classifiers on 933,769 cleaned HMDA Loan/Application Register records (2018 to 2024), using an 80/20 stratified split and class-weight balancing to handle a 79/21 class imbalance. Selected Random Forest for its combination of predictive performance, zero overfit gap, and SHAP-based per-applicant explainability. Ran a three-part fairness evaluation, demographic parity, disparate impact, and equalized odds, validated with 1,000-iteration bootstrap resampling.

**Result:** Random Forest achieved 0.996 AUC with zero overfit gap. SHAP analysis surfaced interest rate as the dominant feature by a wide margin, a pattern consistent with target leakage in HMDA origination data, since the offered rate is entangled with the underwriting decision itself. That finding shaped the model refinement work that followed. All three fairness metrics passed threshold too: a gender demographic parity gap of +3.0 percentage points, a disparate impact ratio of 0.961, and an equalized odds gap of -0.3 percentage points, all confirmed stable under bootstrap validation.

Images: `10-mortgageiq-model-comparison.png`, `11-mortgageiq-shap-summary.png`, optionally `12-mortgageiq-feature-importance.png`

**Confidentiality, do not violate:** the two-agent architecture and MortgageIQ's business and pricing model are deliberately excluded. This is a business idea still in active development.
