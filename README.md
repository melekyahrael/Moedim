# Mo’edim (מועדים)

**364-Day Covenant Calendar Application**

Mo’edim is a mobile application that restores the biblical 364-day solar calendar described in the Dead Sea Scrolls and Book of Jubilees. It provides a fixed weekly Sabbath cycle, appointed feast times, creation-day themes, and Torah-aligned daily guidance.

## Core Principles
- 364-day solar calendar (52 perfect weeks)
- Weekly Sabbath cycle never breaks
- 12 months + 4 marker days
- Spring Equinox anchor (Day 4 – Lights)
- Privacy-first, offline-first
- No astrology, divination, or fate scripting

## Tech Stack
- **Frontend:** Expo (React Native), TypeScript, Expo Router
- **State:** AsyncStorage (offline-first)
- **Backend:** Supabase (PostgreSQL, Auth, RLS, Edge Functions)
- **Astronomy:** astronomy-engine
- **Deploy:** Expo EAS (iOS/Android), Vercel (web)

## Project Structure
/src
/app # Expo Router screens
/logic # Calendar, feasts, jubilee, chronology
/components # UI components
/services # Storage, location, supabase client
/hooks
/tests # Critical calendar tests
/docs # Specifications and diagrams
