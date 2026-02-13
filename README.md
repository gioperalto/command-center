# Command Center

A retro office sim RPG-style visual hub for monitoring AI agents. Watch 8 pixel-art characters work at their desks, wander to the kitchen, and hang out in the conference room — all rendered in real-time on an HTML5 Canvas with no external images.

## Architecture

```
command-center/
├── api/          Express + TypeScript backend (port 3001)
│   └── src/
│       ├── agents/       Agent definitions & simulator
│       ├── datadog/      dd-trace init & LLM Observability spans
│       ├── routes/       REST endpoints
│       ├── store/        In-memory event store
│       └── server.ts     Entry point
├── frontend/     Vite + React + TypeScript (port 3000)
│   └── src/
│       ├── game/         Canvas rendering engine
│       │   ├── engine.ts       Game loop & entity management
│       │   ├── renderer.ts     Master draw orchestrator
│       │   ├── characters.ts   Pixel-art sprite system (4 poses)
│       │   ├── agents.ts       Movement & animation state
│       │   ├── rooms.ts        Conference, Boss Office, Kitchen
│       │   ├── cubicles.ts     4x2 desk grid with monitors
│       │   ├── desk-items.ts   8 unique items (globe, books, etc.)
│       │   ├── floor.ts        Checkered dark navy tiles
│       │   ├── pathfinding.ts  Waypoint-based wandering
│       │   └── constants.ts    Layout dimensions & colors
│       ├── components/   React UI (OfficeCanvas, EventStream, StatusBar)
│       ├── datadog/      Browser logging placeholder
│       ├── hooks/        Polling hooks (useAgentStatus, useEvents)
│       └── api/          Fetch wrappers
└── package.json  Root monorepo scripts
```

## Prerequisites

- **Node.js v23+** (Vite 5 requires a modern Node version)
- **npm**

If using nvm:

```bash
nvm use v23.9.0
```

## Getting Started

```bash
# Install dependencies
npm install
npm run install:all

# Start both servers (API + frontend)
npm run dev
```

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/employee-status` | Returns all 8 agents with current working/idle status |
| `GET /api/events?since=<timestamp>` | Returns event log entries (optional `since` filter for incremental polling) |

## Agents

| Name | Role | Color | Desk Item |
|------|------|-------|-----------|
| Ada | Researcher | Blue | Globe |
| Byron | Writer | Purple | Books |
| Cleo | Developer | Green | Coffee |
| Dex | Designer | Red | Palette |
| Echo | Video | Orange | Camera |
| Flux | Motion | Teal | Waveform |
| Guard | QA | Light Blue | Shield |
| Hex | Scout | Dark Orange | Fire |

## How It Works

- The **backend simulator** randomly transitions agents between "working" and "idle" every 8–33 seconds, logging each transition as an event
- The **frontend** polls `/api/employee-status` every 5s and `/api/events` every 3s
- When an agent's status changes to **working**, their character walks to their assigned cubicle and sits down (typing animation)
- When **idle**, they stand up and wander the office — visiting the kitchen, conference room, or corridors
- The **Event Log** panel on the right shows a scrolling feed of agent activity
- The **Status Bar** at the bottom shows all agents with live working/idle indicators

## Datadog Integration

The API is instrumented with [dd-trace](https://github.com/DataDog/dd-trace-js) for APM and LLM Observability. Each agent status transition creates a simulated `llm.call` span with tags for agent name, action, model, prompt, and response.

To enable, copy `.env.example` to `.env` and set your `DD_API_KEY`:

```bash
cp .env.example .env
# Edit .env and add your Datadog API key
```

Environment variables:

| Variable | Description |
|---|---|
| `DD_API_KEY` | Your Datadog API key |
| `DD_ENV` | Environment tag (default: `development`) |
| `DD_SERVICE` | Service name (default: `command-center`) |
| `DD_LLMOBS_ENABLED` | Enable LLM Observability (`1` to enable) |
| `DD_LLMOBS_ML_APP` | LLM Observability app name |
| `DD_LLMOBS_AGENTLESS_ENABLED` | Agentless mode for LLM Observability |

Browser-side Datadog logging (`frontend/src/datadog/browser.ts`) is stubbed out — install `@datadog/browser-logs` and set a client token to enable.

## Visual Details

- CRT-style **monitor scanlines** and random **screen flicker** on cubicle monitors
- Animated **coffee steam** particles rising from the kitchen coffee machine
- Working **wall clock** in the Boss Office showing real time
- **Water cooler** in the corridor
- Smooth **status transitions** — agents pause briefly before walking to their desk
- Y-sorted character rendering for proper depth ordering

## Tech Stack

- **Frontend**: Vite, React 18, TypeScript, HTML5 Canvas (all art via `fillRect`)
- **Backend**: Express, TypeScript, tsx (dev runner)
- **Observability**: dd-trace (APM + LLM Observability)
- **Monorepo**: concurrently for parallel dev servers, Vite proxy for API
