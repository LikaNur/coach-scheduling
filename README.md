### Cloudathlete - Coach Scheduling

A coach scheduling platform for sports organizations built with Next.js 16, React 19, and TypeScript.

### How to Run the Project

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Data**: In-memory store with JSON seed data

### Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── athletes/        # GET athletes
│   │   ├── coaches/         # GET coaches, GET coach by ID
│   │   ├── sessions/        # GET/POST sessions
│   │   └── slots/           # GET slots by coach
│   ├── coaches/             # Coaches list & detail pages
│   ├── sessions/            # Sessions overview page
│   ├── globals.css          # Global styles + texture system
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── coaches/             # CoachCard, CoachProfile, SearchBar
│   ├── icons/               # SVG icon components
│   ├── layout/              # Container, Navbar, Footer
│   ├── sessions/            # SessionCard, SessionForm
│   ├── slots/               # SlotList
│   └── ui/                  # Badge, Button, Card, Input, MultiSelect, PageHeader, DataState
├── lib/
│   ├── store.ts             # In-memory data store (singleton)
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Shared utilities (date formatting, etc.)
└── data/
    └── seed.json            # Initial data (coaches, athletes, slots, sessions)
```

### Key Assumptions & Trade-offs

### Architecture Decisions

| Decision | Rationale | Trade-off |
|----------|-----------|-----------|
| **In-memory store** | Simplicity, no database setup required | Data resets on server restart |
| **Client-side filtering** | Instant search, no API roundtrip | Not suitable for large datasets |
| **Singleton with globalThis** | Survives Next.js hot-reload in dev | Not horizontally scalable |
| **No authentication** | Focus on core scheduling functionality | Would need auth in production |

### Data Model Assumptions

- **Slots are pre-defined**: Coaches have fixed availability slots that can be booked
- **One coach per session**: Sessions are tied to a single coach
- **Multiple athletes per session**: Sessions support group training
- **Slot status is binary**: Slots are either "available" or "booked" (no partial booking)

### UI/UX Trade-offs

- **Optimistic updates not implemented**: Page refreshes after session creation for data consistency
- **No pagination**: All items load at once (acceptable for demo data size)
- **Client-side date formatting**: Uses browser locale, no server-side timezone conversion

### What I'd Improve With More Time

### High Priority

1. **Database persistence** - Replace in-memory store with Prisma + PostgreSQL
2. **Authentication** - Add user roles (admin, coach, athlete) with NextAuth.js
3. **Optimistic UI updates** - Update UI immediately, rollback on error
4. **Session cancellation** - Allow canceling sessions and freeing slots

### Medium Priority

5. **Timezone handling** - Convert times based on coach/user timezone
6. **Conflict detection** - Warn if athletes have overlapping sessions
7. **Pagination & infinite scroll** - For coaches and sessions lists
8. **Athlete search** - Filter athletes in the multi-select dropdown
9. **Calendar view** - Visual calendar for availability instead of list

### Technical Debt

15. **Error boundaries** - Add React error boundaries for graceful failures
16. **Unit tests** - Add Jest tests for utilities and components
17. **E2E tests** - Add Playwright tests for critical flows
18. **API validation** - Add Zod schemas for request/response validation
19. **Rate limiting** - Protect API routes from abuse

### API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/coaches` | GET | List all coaches (supports `?search=`) |
| `/api/coaches/[id]` | GET | Get coach with their slots |
| `/api/athletes` | GET | List all athletes |
| `/api/sessions` | GET | List all sessions with slot data |
| `/api/sessions` | POST | Create new session |
| `/api/slots` | GET | Get slots (requires `?coachId=`) |

### POST /api/sessions

```json
{
  "coachId": "coach_001",
  "slotId": "slot_001",
  "athleteIds": ["ath_001", "ath_002"],
  "notes": "Optional notes"
}
```