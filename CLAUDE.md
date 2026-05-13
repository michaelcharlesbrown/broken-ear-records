# Broken Ear Records — Claude Code Project Brief

**Site:** Broken Ear Records
**Owner:** Michael Charles Brown
**Stack:** Next.js App Router

> Global rules in ~/.claude/CLAUDE.md apply to this project.
> This file adds project-specific context only.

---

## Workflow

Always work directly on the `main` branch. Edit files in the project root
(`/Users/mcb/Documents/Projects/broken-ear-records/`). Do not use git
worktrees — the dev server watches the project root, not worktrees, so edits
made in a worktree will not appear on localhost.

If Claude Code opens a worktree session, make all edits to the corresponding
files in the project root instead.

---

## Dev Server

Port: 3001 — already running. Do not touch it.

---

## Critical Infrastructure — Do Not Touch

- Meta Pixel — do not modify any pixel or event tracking code
- Google Analytics — do not alter any GA tags or IDs
- Ad funnel pages — do not restructure, rename, or delete campaign pages
- Link pages — do not modify URL slugs or page structure
- Any Script tags in layout or head — treat as untouchable

If a task requires touching any of the above, stop and ask first.

---

## Stack

- Next.js App Router
- No database, no auth, no e-commerce

---

## What Not To Do

- Do not touch tracking scripts, pixel code, or analytics without explicit instruction
- Do not rename, move, or delete files without explicit instruction
- Do not add dependencies without asking
