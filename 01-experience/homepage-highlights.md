# Homepage Highlights

Three tabs, shown on the landing page above the fold. MortgageIQ is active by default on page load. Each tab: project name, italic category tag underneath (smaller, matching the site's existing pull-quote italic treatment), then Problem / Approach / Result / Why it matters, then one graph. This is the SHORT version of each project, not the full /work case study text. A "See detailed work" link sits below the tabs pointing to /work.

Style note: no contractions, no comma splices, no contrastive "not X" or "rather than X" constructions anywhere, every claim stated as a direct positive statement. No first- or third-person pronoun voice, passive and subject-explicit construction throughout, matching the register used on /work.

---

## Tab 1: MortgageIQ
*Credit Risk*

**Problem:** Small mortgage lenders lack access to the kind of risk-scoring tools large banks use, and any model built to fill that gap has to satisfy fair-lending law as well as raw predictive accuracy.

**Approach:** Three models were built in sequence, Phase 1, Agent 1, and Agent 2, comparing model types, stress-testing against a real historical crisis (the 2008 downturn), and testing fairness across gender and race.

**Result:** The first version looked nearly perfect, a 99.6% accuracy score, until further testing revealed it was relying on information a real application would never have. The honest rebuild scored 83%, closed the fairness gap for gender entirely, and disclosed a smaller, unresolved gap for race. The applicant profile that first exposed the flaw, approved at 125% debt-to-income by the original version, is correctly denied by the final model with 96.4% confidence.

**Why it matters:** In lending, accuracy and trustworthiness are separate qualities, and a model needs both. This project demonstrates the discipline to catch a mistake, fix it, and disclose what remains unsolved, exactly what a regulated lending or fintech risk team needs.

**Graph:** `gender_vs_race_resolution.png`

---

## Tab 2: Fraud Detection
*Machine Learning*

**Problem:** The goal was to detect fraudulent online transactions in a large, imbalanced dataset while keeping false alerts on legitimate customers to a minimum.

**Approach:** A fraud detection pipeline was built on 590,000+ transactions and 499 features, comparing multiple model types to identify the strongest performer.

**Result:** The selected model, XGBoost, scored 0.53 on the metric that matters most for rare-event detection (PR-AUC), catching about half of all fraud while incorrectly flagging fewer than 2 in 100 legitimate transactions. A cross-validation comparison further confirmed that a standard random-sampling approach would have selected a weaker configuration than the time-aware method used here, a distinction verified directly on the held-out test set.

**Why it matters:** Every fraud system trades off catching bad actors against penalizing good customers. This demonstrates the ability to tune a model deliberately to that real tradeoff, weighing the true cost of a false positive alongside the raw score.

**Graph:** `chart_model_comparison_pr.png`, chosen because it directly shows the three-model comparison the Result text states (Decision Tree, Random Forest, XGBoost), so the graph and the copy make the same point together.

---

## Tab 3: iOme Retirement Challenge
*Retirement Policy*
Top 3 National Finalist, iOme Research Challenge

**Problem:** America's retirement system, Social Security, 401(k)s, and personal savings, is failing at once, and the failure lands hardest on the people least able to absorb it.

**Approach:** A simulation modeling 10,000 possible financial futures was built for workers at three income levels, and three policy reforms were then designed and individually priced.

**Result:** A typical worker's odds of retiring securely are close to a coin flip today, and worsen once Social Security's funding shortfall hits in 2033: a low-income worker needs roughly 70 times the additional savings a high-income worker needs just to stay on track. The strongest fix alone freed up $71.57 trillion in public support, but even all three reforms combined still left nearly half of middle-income workers short of a secure retirement.

**Why it matters:** Most retirement policy proposals are presented as solutions. This project tested that framing directly, pricing three reforms individually and reporting the actual result, including where it fell short: nearly half of middle-income workers remained insecure even with every reform applied. Quantifying a policy's real limits alongside its intended benefit distinguishes rigorous policy analysis from advocacy. That approach earned this project recognition as a top 3 national finalist.

**Graph:** `08-iome-model-output-trajectory.png`

---

Apple and Lululemon are not featured in the homepage tabs, they remain fully built on /work, reachable through the "See detailed work" link below the tabs.
