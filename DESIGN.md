# Vibecoding Project Tracker — Design

**Status:** Hackathon starter design doc · fill in the **`<TODO>`** sections before you tag `design-done`.

**Why this file exists.** This tracker is your tool. It should look like *your* tool — not a generic Kanban with default Tailwind blue. Twenty minutes of design decisions here will be visible on every screen for the next six weeks of Module 5.

**Who owns this.** Person B, during the same window the rest of the team is reviewing the PRD. By the time the team converges to start M4 (`data-model`), this file should be filled in and the colors should already be in `tailwind.config.js`.

---

## 1. Mood / vibe

One sentence that captures the feeling the tracker should leave you with.

`A clean, calm and professional workspace that gives developers a sense of clarity, control and progress while managing AI-assisted coding projects.`

Two or three references that capture the vibe (links to dribbble shots, screenshots of apps you admire, Pinterest boards — anything visual):

- `Linear — Minimalist project management interface, restrained colour palette and clear visual hierarchy.`
- `Notion — Spacious layouts, simple typography and distraction-free task organisation.`
- `Trello — Intuitive Kanban boards with clearly separated task columns and cards.`

Anti-references — what we are explicitly **not** trying to look like:

- `Overly colourful dashboards with competing bright colours.`
- `Heavy gradients, excessive shadows and unnecessary animations.`
- `Cluttered interfaces with too many controls or decorative elements.`
- `Dark backgrounds with neon accents that reduce readability.`
- `Interfaces that rely entirely on colour to communicate task information.`

## 2. Color palette

These are the colors the build milestones will reference. Once chosen, paste the hex values into `tailwind.config.js` so the rest of the team can use Tailwind utility classes (e.g. `bg-brand-primary`, `border-due-warning`).

### Brand

| Token | Hex | Where it shows up |
|---|---|---|
| `brand-primary` | `#2563EB` | Header accents, primary buttons, focus indicators |
| `brand-accent` | `#60A5FA` | Secondary highlights and hover states |
| `surface-page` | `#F8FAFC` | Main background |
| `surface-card` | `#FFFFFF` | Task cards and modals |
| `text-primary` | `#0F172A` | Main headings and body text |
| `text-muted` | `#64748B` | Dates, descriptions and supporting information |

### Task type (M6 `tag-style`)

| Token | Hex | When used |
|---|---|---|
| `type-feature` | `#0D9488` | Cards tagged `Feature task indicators` (accent stripe + icon) |
| `type-bug` | `#DC2626` | Cards tagged `Bug task indicators` (accent stripe + icon) |

### Due-date states (M8 `due-tint`)

| Token | Hex | When used |
|---|---|---|
| `due-safe` | `#16A34A` | More than 2 days out |
| `due-warning` | `#D97706` | Less than 24 hours |
| `due-overdue` | `#DC2626` | Past due |
| `due-neutral` | `#64748B` | Done (overrides date) |

## 3. Typography

| Role | Font | Why |
|---|---|---|
| Heading | `Inter` | `Modern, clean letterforms establish clear hierarchy.` |
| Body | `Inter` | `Consistent and readable at smaller interface sizes.` |
| Monospace (tags, badges, code) | `JetBrains Mono` | `Distinguishes AI prompts, technical tags and code snippets.` |

Suggested sizes (override only if the design demands it):

- Page title: 24 px / semibold
- Section header: 16 px / semibold uppercase
- Card title: 14 px / medium
- Body: 14 px / regular
- Caption: 12 px / regular muted

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

- **Cards:** `White surfaces with subtle 1px borders, 8px rounded corners and generous internal spacing. Shadows should appear only on hover to maintain a lightweight appearance.`
- **Buttons:** `Solid blue primary buttons with white text, rounded corners and consistent padding. Secondary actions use neutral backgrounds or outlined borders to maintain visual hierarchy`
- **Modal:** `Centred on screen with a maximum width of 480px, a white background and a semi-transparent dark overlay to direct attention towards the active task.`
- **Empty states:** `Subtle dashed borders, muted text and short encouraging messages that explain what users can do next.`
- **Drag affordance (if used):** `Task cards may be moved between Kanban columns using drag-and-drop. A status dropdown will provide an alternative method of updating tasks for keyboard accessibility.`
- **Spacing:** `Use a consistent 8px spacing system to establish predictable relationships between interface elements.`
- **Interaction feedback:** `Interactive components should provide clear hover, focus and selected states. Actions such as creating, moving or deleting tasks should display immediate confirmation.`
- **Accessibility:** `Maintain sufficient text contrast, visible keyboard focus indicators and descriptive labels. Colour should reinforce information rather than being its only indicator.`

## 5. Voice / microcopy

Three lines of microcopy that capture the tone of the product. Keep it short — these are the words a stressed user reads at 11pm.

| Where | Text |
|---|---|
| "+" button label | `+ Task` |
| Empty column placeholder | `No tasks here yet.` |
| Toast after "Copy as Prompt Context" | `Prompt context copied to clipboard`  |
| Confirm-delete message | `Delete this task? This action cannot be undone.` |
| Handoff toast (M7 `task-owner`) | `Task assigned to {name}.` |

## 6. Logo / wordmark

The tracker probably doesn't need a logo, but it does need a name and a wordmark style.

- **Product name:** `VibeTrack ` (match PRD §11 team identity)
- **Wordmark style:** `Minimalist text-based wordmark using Inter Semibold, with the primary brand blue (#2563EB). No additional logo or icon is required. The simple typography maintains a professional appearance and provides consistency with the application's overall design.` (e.g. "Just the name in the heading font, brand-primary color, no icon.")

## 7. Out of scope (this hackathon)

To keep design tight, the following are explicitly not part of `design-done`:

- A dark mode toggle. Pick one mode and ship it.
- Multiple themes. One brand, applied consistently.
- Animations beyond a 200 ms fade on toast notifications.
- A custom icon set. Use [Lucide icons](https://lucide.dev) via Tailwind classes if you need any.

---

*DESIGN.md version: hackathon-starter v1*
