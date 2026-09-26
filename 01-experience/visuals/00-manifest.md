# Visuals manifest

Filenames are numbered in the order they appear per case study, in `case-studies.md`.

## Lululemon x Columbia
- `01-lulu-thesis.jpg`, thesis slide, the "Recommend Lululemon to acquire Columbia" summary
- `02-lulu-valuation-rigor-cropped.jpg`, deal structure and comps, already cropped to remove the mislabeled Discounted Cashflow sensitivity table, do not use any other version of this slide
- `03-lulu-outcome.jpg`, final recommendation slide, the proforma EPS chart has been rebuilt from the model's actual "Acquire Target" sheet data (rows 100-101) and composited back into the slide, this is now clean

## Apple
- `04-apple-thesis-cropped.png`, the 3-stat version (Current Price, Base Case Fair Value, Implied Return), the Valuation Range row has been deliberately removed since it didn't match the underlying model, do not use the original uncropped slide
- `05-apple-valuation-rigor.jpg`, sensitivity analysis grid
- `06-apple-outcome.jpg`, why HOLD despite overvaluation

## iOme Retirement Challenge
- `07-iome-three-pillar-thesis.png`, Current Three-Pillar System slide (2034 / 15X / 3.6%)
- `08-iome-model-output-trajectory.png`, retirement security by age and income bracket, 53.9% / 45.1% / 73.7% / 29.1%
- `09-iome-saving-gap-70x.png`, Model 2, the Saving Gap chart with the 70x inequality annotation

Do not add the Policies Impact Model chart, it carries the team's own disclosure that it is a deterministic approximation pending full stochastic validation.

## MortgageIQ
- `10-mortgageiq-model-comparison.png`, Decision Tree vs Random Forest vs XGBoost, accuracy and AUC
- `11-mortgageiq-shap-summary.png`, SHAP feature impact beeswarm
- `12-mortgageiq-feature-importance.png`, feature importance bar chart, optional, only use paired with the leakage note in the case study copy

## MortgageIQ Agent 1 and Agent 2 (original filenames)
- `shap_global_importance_agent1.png`, Agent 1 feature importance, loan purpose dominant under the four-feature ceiling
- `agent1_risk_signal_distribution.png`, Agent 1 risk signal spread on the 2016 to 2017 test set
- `shap_global_importance_agent2.png`, Agent 2 feature importance, DTI and loan purpose nearly tied
- `shap_dti_dependence_agent2.png`, Agent 2 DTI dependence by value
- `case_study_comparison.png`, DTI versus LTV threshold shapes and four-case outcome comparison
- `blk015_race_gap_comparison.png`, unmatched versus full-feature-matched race gap by group
- `gender_vs_race_resolution.png`, gender fully explained versus race residual

## Fraud Detection (original filenames)
- `chart_missingness.png`, missingness distribution across columns, drop-or-keep-as-signal
- `chart_daily_volume_fraud_rate.png`, daily transaction volume and daily fraud rate over 182 days
- `chart_model_comparison_pr.png`, precision-recall curves for Decision Tree, Random Forest, XGBoost
- `chart_shap_summary.png`, top 15 SHAP features for fraud predictions
- `chart_pdp_transactionamt.png`, partial dependence of transaction amount on fraud probability
- `chart_segment_fpr_quintile.png`, false-positive rate by transaction amount quintile (U-shape)
