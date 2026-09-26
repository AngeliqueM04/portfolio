# Homepage Highlights

Three tabs, shown on the landing page above the fold. MortgageIQ is active by default on page load. Each tab: project name, italic category tag underneath (smaller, matching the site's existing pull-quote italic treatment), then Problem / Approach / Result / Why it matters, then one graph. This is the SHORT version of each project, not the full `/work` case study text, a "Read full analysis" or "See all work" link sits below the tabs pointing to `/work`.

---

## Tab 1: MortgageIQ
*Credit Risk*

**Problem:** Small mortgage lenders don't have access to the kind of risk-scoring tools big banks use, and any model built to fill that gap has to hold up to fair-lending law, not just look accurate.

**Approach:** Built three models in sequence (Phase 1, Agent 1, Agent 2), comparing model types, stress-testing against a real historical crisis (the 2008 downturn), and testing fairness across gender and race.

**Result:** The first version looked nearly perfect, a 99.6% accuracy score, until she caught it cheating, using information a real application wouldn't have. The honest rebuild scored 83%, closed a fairness gap for gender entirely, and left a smaller race-based gap disclosed as unresolved rather than hidden.

**Why it matters:** In lending, a model that looks accurate isn't the same as a model that's trustworthy. This project shows the discipline to catch your own mistake, fix it, and be upfront about what's still unsolved, exactly what a regulated lending or fintech risk team actually needs.

**Graph:** `gender_vs_race_resolution.png`

---

## Tab 2: Fraud Detection
*Machine Learning*

**Problem:** Detect fraudulent online transactions in a large, imbalanced dataset without flooding legitimate customers with false alerts.

**Approach:** Built a Python fraud detection pipeline on 590,000+ transactions and 499 features, comparing multiple model types to find the strongest performer.

**Result:** The selected model (XGBoost) scored 0.53 on the metric that matters most for rare-event detection (PR-AUC), catching about half of all fraud while wrongly flagging fewer than 2 in 100 legitimate transactions.

**Why it matters:** Every fraud system trades off catching bad actors against not punishing good customers. This shows she can tune a model to that real tradeoff deliberately, not just chase the highest score on paper.

**Graph:** `chart_model_comparison_pr.png`, chosen because it directly shows the three-model comparison the Result text states (Decision Tree, Random Forest, XGBoost), so the graph and the copy make the same point together.

---

## Tab 3: iOme Retirement Challenge
*Retirement Policy*

**Problem:** America's retirement system, Social Security, 401(k)s, and personal savings, is failing at once, and the failure lands hardest on the people least able to absorb it.

**Approach:** Built a simulation modeling 10,000 possible financial futures for workers at three income levels, then designed and individually priced three policy fixes.

**Result:** A typical worker's odds of retiring securely are close to a coin flip today, and get worse once Social Security's funding shortfall hits in 2033. The strongest fix alone freed up $71.57 trillion in public support, but even all three reforms combined still left nearly half of middle-income workers short.

**Why it matters:** This is policy research with real stakes, not a classroom exercise, and it ranked in the top 3 nationally. It also shows the same honesty pattern as MortgageIQ, a solution that helps, stated plainly as not being a full fix.

**Graph:** `08-iome-model-output-trajectory.png`

---

Apple and Lululemon are not featured in the homepage tabs, they remain fully built on `/work`, reachable through the "See all work" link below the tabs.
