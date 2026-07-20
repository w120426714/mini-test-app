# Mini Test App Experience and Content Expansion Design

## Goal

Upgrade the existing Taro mini program into a convenient, content-rich, one-stop assessment product. The primary success criterion is user experience: users should quickly find a suitable assessment, complete it without losing progress, understand the result, and manage reports from one place.

The first release remains frontend-only and stores user data locally. It must continue to build for WeChat, H5, and Alipay without requiring an account or backend service.

## Current State

The application currently provides six assessment categories:

- IQ
- EQ
- Personality
- Romance
- Wealth
- Workplace

Each category contains one assessment with a generated 500-question candidate bank, for 3,000 candidate questions in total. The app already supports stratified question selection, scoring, result ranges, local report history, and multi-platform Taro builds.

The main constraints are limited assessment variety, no search or favorites, no resumable quiz session, basic history management, and a visual system that is not consistently applied across pages.

## Product Scope

### Assessment catalog

- Expand from 6 to 12 assessments while retaining the six existing categories.
- Keep 500 candidate questions per assessment, resulting in 6,000 candidate questions.
- Give every assessment explicit domains, difficulty distribution, question count, estimated duration, source policy, scoring model, and result ranges.
- Add catalog validation for unique IDs, valid option references, continuous result ranges, domain coverage, difficulty balance, and minimum title diversity.
- Treat generated variants as candidate questions, not claims of 6,000 independently authored clinical items.

### Home

- Apply the approved A 2.0 visual direction: warm, calm, editorial, and restrained.
- Provide three persistent skins: Almond Warm, Morning Mist, and Dusk Blue.
- Surface a primary recommendation, search, four quick category goals, resume entry, and popular assessments.
- Keep the first screen focused on starting or resuming an assessment.

### Assessment library

- Search by assessment title, subtitle, category label, and dimension label.
- Filter by category and estimated duration.
- Support favorites and recently completed assessments.
- Show question count, candidate-bank size, duration, popularity label, and saved progress where relevant.

### Quiz flow

- Save the active question set, current index, answers, and update time after each answer.
- Resume an unfinished session after app restart.
- Support previous-question navigation and answer changes.
- Check for unanswered items before final submission.
- Clear the active session only after a report has been generated successfully.

### Report

- Present the result title, score context, dimension breakdown, interpretation, and actionable suggestions.
- Show explanations for objective cognitive questions when available.
- Include clear entertainment and non-clinical wording.
- Keep sharing as a platform entry point and preserve the report locally.

### Profile

- Manage report history, favorites, unfinished sessions, and theme settings in one place.
- Open a saved report from history.
- Require confirmation before clearing history or all local data.

## Visual Design

The approved direction combines three patterns found in successful lightweight products:

- Content-first restraint and generous whitespace rather than dense card grids.
- Contextual skins and greeting language without decorative elements competing with the primary action.
- Search and quick-entry tools near the top for users with a clear goal.

Typography uses a display face only for selected hero and report headings, with system sans-serif text everywhere else for cross-platform readability:

- Display: `Noto Serif SC`, `Songti SC`, serif fallback.
- Body: `PingFang SC`, `Microsoft YaHei`, sans-serif fallback.
- Platforms that cannot load the preferred display font use the fallback without blocking rendering.

All pages share design tokens for colors, typography, spacing, radii, shadows, and motion. Skin changes update tokens rather than page-specific selectors. The layout avoids nested cards, keeps one primary action per section, and preserves comfortable touch targets.

Reference direction:

- WeChat-oriented design guidance: emphasize the primary task and remove unrelated distractions.
- Alipay Mini Program UX guidance: consistency, simplicity, clarity, and feedback.
- WeChat Reading pattern: visually restrained, content-first navigation.
- XiaoShuimian pattern: contextual themes and a dominant daily action.
- Mint Health pattern: search plus compact quick-service entry points.

## Architecture

### Data layer

Split the large assessment definition file into focused modules:

- A catalog index owns discovery metadata and cross-assessment queries.
- Category or assessment modules own seed questions, dimensions, scoring configuration, and result ranges.
- Question-bank builders own deterministic variant generation.
- Catalog validators verify integrity without depending on UI code.

### Business layer

Introduce small modules with explicit interfaces:

- Catalog search and filtering.
- Favorite management.
- Active quiz session persistence.
- Theme preference persistence.
- Report history persistence and compatibility migration.
- Question-bank validation.

Pages consume these modules and do not access storage keys or traverse the full catalog directly.

### UI layer

Reuse focused components for:

- Search field.
- Category shortcuts and filters.
- Assessment list items.
- Resume prompt.
- Theme picker.
- Quiz option and progress navigation.
- Report dimension rows.
- Empty, error, and recovery states.

Components receive data and callbacks through props. They do not own catalog lookup, scoring, or persistence.

## Data Flow

1. The user searches, filters, or selects a recommended assessment.
2. The detail page validates the assessment and starts or resumes a session.
3. The question picker creates a balanced run and persists the exact selected question IDs.
4. Each answer updates the persisted session.
5. Submission calculates the score and matches a result range.
6. The app persists the report, then removes the completed active session.
7. The profile page reads reports, favorites, unfinished sessions, and theme preference through their respective modules.

## Error Handling

- Missing or invalid assessment data blocks quiz start and offers a return to the library.
- A corrupt saved session is discarded only after the user chooses to restart.
- A storage write failure keeps the in-memory result visible and reports that local saving failed.
- Unknown report IDs show a recovery state rather than a blank page.
- Clearing history or all local data requires explicit confirmation.
- Storage readers accept the existing history format and migrate added optional fields safely.
- External fonts are optional; failure falls back to system fonts.

## Content and Safety Policy

- Do not copy proprietary Mensa, WAIS, Raven, or other protected test items or answer keys.
- Cognitive content may use original and public-domain-inspired formats.
- Personality content may use original situations informed by public-domain directions such as IPIP.
- Medical or clinical claims are out of scope.
- Assessment reports must state that results are for entertainment and self-reflection unless a validated instrument and calibrated norm sample are introduced later.

## Testing and Acceptance

### Automated tests

- Catalog has exactly 12 assessments across all six categories.
- Every assessment exposes 500 candidate questions.
- Question, option, assessment, and result IDs are unique in their required scopes.
- Objective answers reference valid options.
- Result ranges are continuous and cover every possible score.
- Domains and difficulty levels meet the configured coverage rules.
- Search, category filter, duration filter, favorites, and recent assessment ordering work as specified.
- Theme, favorites, quiz sessions, and reports persist and recover correctly.
- Existing scoring, question picking, and storage tests remain green.
- Legacy history entries remain readable.

### User-flow acceptance

- A user can start a target assessment from Home in no more than two actions.
- A user can exit and resume the same randomized run without losing answers.
- A user can revise a previous answer and complete the report successfully.
- Saved reports reopen from Profile.
- All three skins persist after app restart.
- Empty, missing, corrupt, and storage-failure states provide a recovery action.

### Build verification

- `npm test`
- TypeScript type checking without emission.
- WeChat production build.
- H5 production build.
- Alipay production build.
- Manual smoke checks at narrow and standard mobile widths for Home, Library, Detail, Quiz, Report, and Profile.

## Delivery

- Commit this design document before implementation.
- Create a detailed implementation plan after design review.
- Implement with tests driving new business behavior.
- Run the full verification suite before claiming completion.
- Commit the verified implementation and push the current `dev` branch to the configured GitHub remote.

## Out of Scope

- User accounts, cloud synchronization, or a backend administration system.
- Payments, subscriptions, consultations, or clinical diagnosis.
- Remote analytics and push notifications.
- Claiming that generated questions are independently standardized clinical items.
