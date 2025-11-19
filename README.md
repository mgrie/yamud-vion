# Vion - The Yamud PIM Suite

**Vion** is a modern, type-safe ecosystem for Personal Information Management (PIM) data handling.
It provides a complete stack from low-level parsing to high-level automation integrations.

> **Status:** Active Development 🚧

## 📦 Packages

This repository is a monorepo managed via NPM Workspaces containing the following packages:

| Package | Description | Status |
| :--- | :--- | :--- |
| **[`@yamud/vobject`](./packages/vobject)** | **The Core Engine.** A robust TypeScript parser & builder for **vCard** (RFC 6350), **vList** (SOGo) and **iCalendar** (RFC 5545). | 🟢 Alpha |
| **[`@yamud/carddav`](./packages/carddav)** | **The Protocol Client.** Handles **CardDAV** & **CalDAV** communication, built on top of the Vion engine. | 🟡 Planned |
| **[`@yamud/n8n-nodes-vion`](./packages/n8n-nodes-vion)** | **The Integration Layer.** Advanced nodes for [n8n](https://n8n.io), bringing the power of Vion to your workflows. | 🟡 Planned |

## 🚀 Vision

Current solutions for handling PIM data in the JavaScript ecosystem are often outdated, untyped, or lack round-trip capabilities. Vion aims to solve this by providing:

* **Strict Typing:** Built with TypeScript first.
* **Round-Trip Safety:** Parse -> Modify -> Build without data loss.
* **Modern Stack:** Optimized for Node.js 20+.
* **Automation Ready:** Designed specifically to power n8n workflows.

## 🛠 Development

### Prerequisites
* **Node.js**: >= 20.0.0
* **NPM**: >= 10.0.0

### Setup

```bash
# Install dependencies for all packages (Root & Workspaces)
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

Copyright (c) 2025 Marco Grießhammer (Yamud).
