# Case studies, v1 (4 total)

Fama-French is deferred entirely, own future session, not part of this build. Testimonials are deferred to a future version.

Image references point to files in `../01-experience/visuals/`. See `visuals/00-manifest.md` for the full mapping. MortgageIQ's Agent 1 and Agent 2 images are referenced below by their original filenames, drop them into the visuals folder as-is, no renaming needed, and add the corresponding entries to the manifest once they're in place.

---

## 1. MortgageIQ

**MortgageIQ: an ML Risk Model for Mortgage Underwriting**
Capstone project, Machine Learning for Finance, Prof. Sudip Gupta, Johns Hopkins Carey Business School

### Phase 1, Single Model MVP

**The problem:** Small independent mortgage brokers process applications manually, with no affordable path to the ML-driven risk tools large lenders use. Building a defensible model for this space takes more than accuracy. It needs explainability that holds up under ECOA and fair-lending scrutiny.

**Approach:** Trained and compared Decision Tree, Random Forest, and XGBoost classifiers on 933,769 cleaned HMDA Loan/Application Register records (2018 to 2024), using an 80/20 stratified split and class-weight balancing to handle a 79/21 class imbalance. Selected Random Forest for its combination of predictive performance, zero overfit gap, and SHAP-based per-applicant explainability. Ran a three-part fairness evaluation, demographic parity, disparate impact, and equalized odds, validated with 1,000-iteration bootstrap resampling.

**Result:** Random Forest achieved 0.996 AUC with zero overfit gap. SHAP analysis surfaced interest rate as the dominant feature by a wide margin, a pattern consistent with target leakage in HMDA origination data, since the offered rate is entangled with the underwriting decision itself. That finding shaped the model refinement work that followed. All three fairness metrics passed threshold too: a gender demographic parity gap of +3.0 percentage points, a disparate impact ratio of 0.961, and an equalized odds gap of -0.3 percentage points, all confirmed stable under bootstrap validation.

Images: `10-mortgageiq-model-comparison.png`, `11-mortgageiq-shap-summary.png`, optionally `12-mortgageiq-feature-importance.png`

### Agent 1, Crisis-Era Prior

**Val AUC (monotonic): 0.6815.** The ceiling for a four-feature, pre-2018 model, a 0.0061 cost for guaranteeing monotonicity.
**Gender demographic parity: +8.4 percentage points.** Fails the 5pp threshold, root caused and documented as a limitation.
**Monotonicity (shock test): 0.0% wrong-direction predictions**, after the fix.

**The problem:** Phase 1's 0.996 AUC came with a warning sign its own SHAP output had already surfaced. Interest rate dominated feature importance by a wide margin, a pattern consistent with target leakage, since HMDA only records a loan's rate once it originates, and a denied application has no rate to report. Before trusting that number, the model needed a version built on data structurally incapable of that leak, and a real test of whether risk scoring held up across a full economic cycle, including the 2008 crisis that the 2018 to 2024 data never touches.

**Approach:** Built a second model, Agent 1, on 2007 to 2017 HMDA data, the pre-2018 schema, which caps the available fields at four: loan amount, income, loan type, and loan purpose. No interest rate, no DTI, no LTV. Selected XGBoost through a walk-forward split, training on 2007 to 2013, validating on 2014 to 2015, testing on 2016 to 2017, strictly chronological, never random, so validation never sees data from before what it's tested against. A stress test, with shock magnitudes grounded in actual 2007 to 2011 Census and EPI income-decline data and Case-Shiller home-price data, not arbitrary round numbers, found a real bug. The unconstrained model let increasing loan amount at fixed income raise predicted approval probability for 31% of applicants. Fixed with monotonic constraints, verified to 0% wrong-direction, and logged at a fully quantified cost.

Image: `shap_global_importance_agent1.png`, feature importance, showing loan purpose as the dominant driver given the four-feature ceiling.

| Metric | Result | Threshold check |
|---|---|---|
| Val AUC (monotonic) | 0.6815 | Ceiling for available features |
| Demographic parity gap (gender) | +8.4pp | Fails <5pp |
| Disparate impact ratio | 0.858 | Passes >0.80 |
| Equalized odds gap | +7.4pp | Fails <5pp |
| Monotonicity (4 shock scenarios) | 0.0% wrong-direction | Passes |

**Result:** Root caused the fairness gap rather than just measuring it. Quintile-bin matching on income and loan amount collapsed the +8.4 percentage point gap to +0.3 percentage points, meaning roughly 96% of it traces back to the model being forced to use two raw magnitude features as a weak proxy for leverage, since debt-to-income ratio doesn't exist in pre-2018 HMDA data at all. That produced a specific, testable hypothesis for the next model: give it a real leverage ratio, and the gap should close. Not a hope, a prediction, made and logged before the next model existed to confirm or deny it.

Image: `agent1_risk_signal_distribution.png`, risk signal spread across the 2016 to 2017 test set.

### Agent 2, Testing the Hypothesis

**Test AUC (leakage-free): 0.83.** The real predictive number. Phase 1's 0.996 traced back to the same interest-rate leak Agent 1 was built to avoid.
**Gender gap (matched): +0.6 percentage points.** Resolved, the hypothesis confirmed. DTI and LTV explain the gap Agent 1 flagged.
**Race gap (residual): 2.6 to 4.9 percentage points**, across four of five groups, after matching on every legitimate risk factor in the model. An open finding, not yet resolved.

**The problem:** Two things to test. First, Agent 1's hypothesis: does a model with real DTI and LTV actually close the fairness gap that a four-feature model couldn't? Second, and unplanned, confirm or rule out the interest-rate leak suspected in Phase 1. A null-rate check settled it decisively, 98.5% missing for denied applications, 0.36% missing for approved ones. Phase 1's headline number was never a clean measurement of predictive power. This model needed to be honest from the start, not accurate by accident.

**Approach:** Trained XGBoost on 2018 to 2024 HMDA data, 10 features including real debt-to-income and loan-to-value ratios, with interest rate explicitly excluded. Monotonic constraints were applied from the first training run this time, not retrofitted after a bug the way Agent 1's were. Tested whether feeding Agent 1's own output back in as a feature helped at all, it didn't, the AUC change was negligible to negative, so it was dropped. Ran the full fairness audit twice, once for gender, and for the first time in this project, once for race, closing a gap that Agent 1's schema made impossible to even measure. The gender result matched a single confounder check, but the race result didn't, so the analysis went further: full-feature propensity-score matching across every risk factor in the model, not just two variables.

Images: `shap_global_importance_agent2.png`, DTI and loan purpose dominate, nearly tied, loan amount and income barely register once DTI and LTV are available. `shap_dti_dependence_agent2.png`, DTI's contribution by value, showing where the model's risk penalty concentrates.

| Metric | Result | Threshold check |
|---|---|---|
| Test AUC (leakage-free) | 0.83 | Honest baseline, not comparable to Phase 1's 0.996 |
| Monotonicity (4 shock scenarios, grounded in 2007-2011 data) | 0.0% wrong-direction | Passes |
| Gender demographic parity (matched on DTI/LTV) | +0.6pp | Passes, hypothesis confirmed |
| Race demographic parity (matched on full feature set) | +2.6pp to +4.9pp (4 of 5 groups) | Fails, open finding |
| Robert Dawson profile (Phase 1's original failure case) | P(approve) = 0.036 | Correctly denied |

**Result:** The gender hypothesis held exactly as predicted. Matching applicants on DTI and LTV collapsed the gap to +0.6 percentage points, fully explained by legitimate risk factors, confirmation that Agent 1's root-cause diagnosis was right, not just plausible.

Race didn't resolve the same way. Even after matching on every feature in the model, income, loan amount, DTI, LTV, property value, loan term, loan type, and loan purpose, a 2.6 to 4.9 percentage point gap survives for four of five groups. SHAP shows why it's not a dead end. DTI's contribution to the prediction diverges by roughly three times more between these groups and the reference group than any other feature, pointing at an interaction effect a single-direction monotonic constraint can't reach, not a data quality problem. Logged, disclosed, and left open rather than smoothed over, because that's the honest state of the finding.

The clearest proof point is Robert Dawson, the applicant Phase 1 approved at 125% debt-to-income, the original motivating failure for this whole two-model build. Agent 2 denies him with 96.4% confidence. A DTI sweep across his exact profile shows the decision hinges on a single, sharp threshold, right at the point his DTI crosses into HMDA's own reporting boundary. Two further profiles confirm the model generalizes rather than memorized his case. A high-LTV, otherwise healthy applicant lands in a genuine near miss, 51%, not a clean pass or fail, and a strong control profile clears comfortably at 87%, ruling out the possibility the model simply denies everyone.

Images: `case_study_comparison.png`, DTI versus LTV threshold shapes, plus the four-case outcome comparison including Phase 1's original approval. `blk015_race_gap_comparison.png`, unmatched versus full-feature-matched race gap, by group. `gender_vs_race_resolution.png`, gender fully explained, race not, side by side.

**Closing line:** Phase 1's headline number turned out to be measuring a leak, not a model. Agent 1 traded accuracy for a testable hypothesis about why its own fairness gap existed. Agent 2 confirmed that hypothesis for gender, and found a harder, still open one for race. The honest version of this project is three models that got progressively more rigorous, not one number that looked good and stopped there.

**Scope note:** this case study covers the modeling and fairness work behind MortgageIQ's risk engine in full, data, methodology, results, and open findings included. What's intentionally left out is everything about MortgageIQ as a standalone product: the surrounding document pipeline, production architecture, and business or pricing model, since that side of it is still active, independent development.

---

## 2. Fraud Detection
*Machine Learning*

**Fraud Detection Model on Real E-Commerce Transactions**
Independent project, IEEE-CIS Fraud Detection dataset (Kaggle)

**The problem:** E-commerce platforms lose real money to fraud, but a model tuned only to catch fraud aggressively ends up blocking legitimate customers, which costs a business just as much in a different way. Making the problem harder, only 3.5% of transactions in a typical dataset are actually fraudulent, so a naive accuracy score can look excellent while catching almost nothing real. This project treats that tradeoff as the actual problem to solve, not an afterthought once a headline metric looks good.

**Approach:** Built a fraud detection pipeline on 590,540 real e-commerce transactions (a 3.5% fraud rate) spanning roughly 182 days, merging two source files on transaction ID and expanding to 499 features after cleaning. Verified data integrity first, no duplicate keys, no row count drift after the merge. Rather than dropping fields that were 90%+ empty, tested whether the absence of data was itself predictive, it was, so missingness got encoded as a feature instead of thrown away.

Image: `chart_missingness.png`, distribution of missingness across all columns, the basis for each drop-or-keep-as-signal decision.

Split the data chronologically (60/20/20 by transaction time, never randomly shuffled), since a real fraud system only ever predicts the future from the past, across a window where the daily fraud rate itself swung from 1.1% to 7.0%.

Image: `chart_daily_volume_fraud_rate.png`, daily transaction volume and daily fraud rate across the full 182-day window, showing how volatile the fraud rate actually is day to day.

Compared three model types (Decision Tree, Random Forest, XGBoost) and ran a leakage audit checking every feature's standalone predictive power before trusting any result.

**A methods finding worth stating on its own:** tuning XGBoost with standard random cross-validation and with time-respecting cross-validation gave different answers, random CV kept rewarding more model complexity all the way up, while time-respecting CV correctly flagged that the most complex setting actually performed worse on genuinely future data. Tested both candidates on the real held-out test set to settle it: the time-respecting choice won by a real margin. This is the same category of catch as MortgageIQ's target leakage bug, a standard validation approach that looked fine and wasn't, caught before it shipped.

**Result:** XGBoost was the strongest of the three models tested (Decision Tree 0.36, Random Forest 0.45, XGBoost 0.53 on PR-AUC, the right metric here since accuracy alone is misleading when only 3.5% of transactions are fraud).

Image: `chart_model_comparison_pr.png`, precision-recall curves for all three models on the locked test set, side by side.

At an operating point catching about half of all fraud, the model wrongly declined 1.82% of legitimate transactions, 2,073 false declines against 2,032 real fraud cases caught, a deliberate tradeoff point, not an accident. The leakage audit came back clean, the single strongest individual feature only reached 0.68 AUC on its own, a real signal, not a sign the model was secretly seeing the answer.

Explainability was checked two independent ways rather than resting the claim on one method.

Image: `chart_shap_summary.png`, the top 15 features driving fraud predictions, and which direction each one pushes the model.

Image: `chart_pdp_transactionamt.png`, the isolated shape of transaction amount's effect on predicted fraud probability.

A segment robustness check turned up something not obvious going in: false-positive rates were highest at both very small and very large transaction amounts, a U-shape, not the "only small transactions get flagged" pattern that's often assumed.

Image: `chart_segment_fpr_quintile.png`, false-positive rate by transaction amount quintile, showing the U-shape directly.

**Limitations, stated plainly:** most of the model's top features are anonymized fields the data provider never explained, a real ceiling on how far an "explainable to a compliance team" claim can honestly go here. There's also still a real gap between training and test performance, suggesting more room to simplify the model further. This is a batch, retrospective model, not a real-time system, no streaming inference or deployment infrastructure, that's out of scope by design, the same boundary MortgageIQ draws between research findings and an actual shippable product.

---

## 3. iOme Retirement Challenge

**Can Ashley Retire Securely? iOme Research Challenge 2026**
Group project with Ananya Shrivastava, Mpho Olatotse, Jianzhuo Chang, and Yuer Lan. Faculty Advisor: Phillip Phan, Ph.D. Johns Hopkins Carey Business School. Top 3 finalist, national competition.

**The problem:** America's three-pillar retirement system, Social Security, employer 401(k)s, and personal savings, is failing all at once, and the failure falls hardest on the workers least equipped to absorb it. A median-income Gen Z worker doing everything the system asks has only a 53.9% chance of retiring securely under current policy. Once the 2033 Social Security trust fund depletion is priced in, that drops to 45.1%. Under a moderate benefit cut, a low-income worker needs 26.2 additional percentage points of gross income saved just to stay on track, a high-income worker needs only 0.4. That gap is a 70x inequality multiplier, and it's built into the system's design, not into anyone's behavior.

**Approach:** Built a lifecycle Monte Carlo simulation, 10,000 paths per scenario with market crisis shocks embedded, calibrated to SSA, IRS, BLS, and EBRI data. Modeled three income brackets ($35K, $65K, $120K) from workforce entry in 2025 through retirement in 2068 across five Social Security benefit scenarios, then proposed three structural reforms, a Sovereign Wealth Fund, a Retirement Preservation Account, and a Retirement Health Account, each costed independently and stress tested across 2,500 additional simulations.

**Result:** Even with all three reforms combined, only 50.5% of mid-income and 23.8% of low-income Gen Z workers reach retirement security. The reforms narrow the gap, but they can't close it without Social Security's benefit floor staying intact. The Sovereign Wealth Fund alone cuts net public support needed from $368.93T to $297.36T against the PAYGO baseline, while still protecting 100% of scheduled benefits through the transition.

Images: `07-iome-three-pillar-thesis.png`, `08-iome-model-output-trajectory.png`, `09-iome-saving-gap-70x.png`

---

## 4. Apple Equity Valuation

**Apple Inc. Equity Research: HOLD**
Group project with Gulara Huseynli, Johns Hopkins Carey Business School

**The problem:** Initiate coverage on Apple Inc. with a rated recommendation grounded in a blended valuation.

**Approach:** A three-method blended valuation: DCF (30% weight, WACC 8.93%, 2% terminal growth), forward P/E comps (35%, peer set Microsoft, Alphabet, Meta), and EV/EBITDA comps (35%). Bear, base, and bull scenario modeling, plus full sensitivity analysis across WACC and terminal growth, and beta and ERP.

**Result:** HOLD at a blended fair value of $171.30 per share (bear $162.15, bull $175.95) against a $276.92 market price, about 38% implied downside. All three methods independently converged on overvaluation (DCF $101.70, P/E-implied $184.95, EV/EBITDA-implied $217.31), and the thesis holds that Apple's quality premium is earned despite the gap.

Images: `04-apple-thesis-cropped.png`, `05-apple-valuation-rigor.jpg`, `06-apple-outcome.jpg`

---

## 5. Lululemon x Columbia M&A Advisory Case

**Lululemon x Columbia: M&A Advisory Case**
Group project with Linh Duong and Oleksandra Bilichenko

**The problem:** Evaluate whether Lululemon should acquire Columbia Sportswear to address slowing North American growth, heavy reliance on women's apparel, and a maturing core market.

**Approach:** DCF (Gordon Growth terminal value, WACC 10.89%) and comparable company analysis (P/E, EV/EBITDA, EV/EBIT, EV/Revenue) across an 11-company peer set. Modeled financing structure using Lululemon's historical max leverage (0.4x D/E) split across debt, existing cash, and new share issuance.

**Result:** Recommended acquisition at $5.37B ($102.60 per share), a 30% control premium and about 36% upside over Columbia's roughly $67 trading price at the time. Modeled EBITDA margin expansion of about 5.5% for Columbia and about 3% for Lululemon post-synergy, financed via 52.4% stock, 30% debt, and 19.5% existing cash.

Images: `01-lulu-thesis.jpg`, `02-lulu-valuation-rigor-cropped.jpg`, `03-lulu-outcome.jpg`
