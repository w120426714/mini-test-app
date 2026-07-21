# Assessment Selection Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Guarantee jointly feasible domain balance and difficulty diversity, decouple catalog policy metadata, bound large-bank search, and restore a clean TypeScript quality gate.

**Architecture:** Replace representative-first selection with a bounded search over compressed `(templateId, difficulty, domain)` candidates and complete selections using explicit domain quotas. Prefer the strongest feasible constraint target and deterministically degrade when no complete solution exists. Store semantic-template policy directly on `TestDefinition`, while resolving TypeScript errors at their source through narrowing and correct project/dependency configuration.

**Tech Stack:** TypeScript, Vitest, Taro 4, npm.

---

### Task 1: Joint selection constraints and bounded search

**Files:**
- Modify: `src/lib/questionPicker.ts`
- Test: `src/lib/questionPicker.test.ts`

- [x] Add a 500-question regression fixture with a valid balanced three-difficulty solution and assert a full unique 1/1/2 domain result.
- [x] Run `npm test -- src/lib/questionPicker.test.ts` and confirm the new assertion fails with the current 2/0/2 result.
- [x] Add an observable pure candidate-compression helper test proving repeated `(templateId, difficulty, domain)` signatures collapse before search.
- [x] Implement compressed candidates, balanced domain quotas, bounded feasibility search, and graceful fallback without catalog-specific branches.
- [x] Re-run the focused test and confirm all picker cases pass.

### Task 2: Explicit semantic-template policy

**Files:**
- Modify: `src/types/test.ts`
- Modify: `src/data/assessments/expandedFactory.ts`
- Modify: `src/data/catalogValidation.ts`
- Test: `src/data/catalogValidation.test.ts`
- Test: `src/lib/questionPicker.test.ts`

- [x] Change tests to select expanded assessments by `minimumSemanticTemplates` and validate that six published assessments declare `40`; confirm RED.
- [x] Add `minimumSemanticTemplates?: number`, publish `40` from the expanded factory, and make validation depend only on that field.
- [x] Run catalog and picker tests and confirm GREEN while scoring continues to use `normalizeDimensionScores` unchanged.

### Task 3: TypeScript quality gate

**Files:**
- Modify: `config/index.ts`
- Modify: `src/pages/quiz/index.tsx`
- Modify: `tsconfig.json`
- Modify: `package.json` and `package-lock.json` only if official peer development dependencies are required
- Create/modify: `types/*.d.ts` only for narrow upstream declaration compatibility when dependency configuration cannot provide the type

- [x] Run `npm run typecheck`, group every diagnostic by project source versus upstream declaration root cause, and inspect installed peer dependency metadata.
- [x] Remove unused config callback destructuring and narrow the quiz test/question state at the source without casts, `any`, or ignores.
- [x] Correct the TypeScript program/dependency setup minimally; do not use `skipLibCheck`, broad excludes, `any`, or `@ts-ignore`.
- [x] Run `npm run typecheck` until it exits 0, checking each hypothesis independently.

### Task 4: Final verification and commit

**Files:**
- Review all modified files from Tasks 1-3.

- [x] Run focused picker/catalog tests, `npm test`, `npm run typecheck`, and `npm run build:weapp`.
- [x] Run `git diff --check` and inspect the complete diff for unrelated changes.
- [x] Commit as `fix: balance assessment selection constraints` and report RED/GREEN evidence plus every modified file.
