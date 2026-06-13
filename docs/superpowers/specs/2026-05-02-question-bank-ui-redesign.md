# Question Bank and UI Redesign Spec

## Goal

Upgrade the mini test app from a small demo bank into a scalable assessment product foundation:

- Each assessment should expose about 500 candidate questions.
- Every quiz run should randomly select a balanced subset by domain and difficulty.
- IQ-style tests should use original/public-domain-inspired cognitive item formats, not proprietary Mensa, WAIS, Raven, or other protected items.
- Scores should be presented as provisional and entertainment/self-reflection oriented until calibrated with real norm samples.
- The UI should feel closer to polished mainstream mini programs: clean hero, clear category chips, stronger cards, calmer quiz flow, and a shareable report feel.

## Source Policy

- Use ICAR as the public-domain/open cognitive-assessment reference direction.
- Use IPIP as the public-domain personality item-pool reference direction.
- Do not copy official copyrighted tests or answer keys.
- For this version, use deterministic original generators and scenario templates so the app can ship without license risk.

## Architecture

- Extend `TestQuestion` with optional metadata: domain, difficulty, kind, correct answer, discrimination, explanation, and source.
- Add a question-bank generator module that expands curated seed questions into stable 500-question banks per test.
- Add stratified selection so each run includes multiple domains and difficulties when metadata exists.
- Add standard scoring helpers for IQ-like tests that map weighted correctness to a mean-100, SD-15 style score.
- Keep existing local history and result pages compatible.

## UX

- Redesign global visual language with a warm, modern app-store style.
- Highlight bank size, random selection, and estimated time on cards and detail pages.
- Make the quiz page calmer and more focused with stronger progress and answer affordances.
- Make the report page read like a saved insight card, with clear score context and non-clinical disclaimer.

## Verification

- Unit tests cover generated bank size, stratified random selection, and IQ-like scoring.
- Existing storage and scoring tests must keep passing.
- `npm run build:weapp` must regenerate WeChat output.

