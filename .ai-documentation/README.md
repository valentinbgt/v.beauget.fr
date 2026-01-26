# v.beauget.fr - AI Documentation

> Personal portfolio website for Valentin BEAUGET, a fullstack developer.

## Quick Reference

| Property    | Value                    |
|-------------|--------------------------|
| Domain      | `v.beauget.fr`           |
| Framework   | Nuxt 4.2.2 (Vue 3)       |
| Styling     | Tailwind CSS 3.x          |
| Language    | French/English (i18n)     |
| Deployment  | Docker + Reverse Proxy    |
| Hosting     | Self-hosted server        |

## Project Purpose

This is a personal portfolio website showcasing:

- Professional identity and bio
- Project portfolio with modal details
- Contact form with Discord notifications
- Links to social profiles and CV

## Documentation Index

| Document          | Description                                      |
|-------------------|--------------------------------------------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, data flow, external services |
| [COMPONENTS.md](./COMPONENTS.md) | Vue components documentation                      |
| [SERVER.md](./SERVER.md) | Server routes, API endpoints, environment variables |
| [STYLING.md](./STYLING.md) | Design system, Tailwind config, animations        |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Docker setup, deployment guide                   |
| [DATA.md](./DATA.md) | Data structures and schemas                       |

## File Structure

```text
v.beauget.fr/
├── app.vue                    # Main application (single-page)
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies
│
├── assets/
│   ├── css/main.css           # Global styles + font imports
│   └── data/projects.json     # Projects data
│
├── components/
│   ├── ProjectModal.vue       # Project detail modal with gallery
│   └── SkillsFloating.vue     # Interactive floating skills visualization
│
├── server/
│   └── routes/
│       ├── cv.get.ts          # CV PDF proxy (Nextcloud)
│       ├── github.get.ts      # GitHub redirect
│       ├── linkedin.get.ts    # LinkedIn redirect
│       └── mmi.get.ts         # MMI project redirect
│
├── public/
│   ├── favicon.svg            # Site favicon
│   ├── icons/                 # Social icons (SVG)
│   └── images/                # Project images
│
└── .ci-cd/
    └── Dockerfile             # Multi-stage Docker build
```

## Key Technologies

- **Nuxt 4.2.2**: Vue 3 meta-framework with SSR capabilities
- **Tailwind CSS 3.x**: Utility-first CSS with custom theme
- **TypeScript**: Server-side code
- **n8n**: Workflow automation for contact form (Discord notifications)
- **Nextcloud**: CV file hosting with auto-update
- **Docker**: Containerized deployment

## External Services

| Service    | Purpose              | URL Pattern                                    |
|------------|----------------------|------------------------------------------------|
| n8n        | Contact form webhook | `https://n8n.beauget.fr/webhook/*`            |
| Nextcloud  | CV hosting           | `https://drive.beauget.fr/s/cv/download`      |
| GitHub     | Profile link         | `https://github.com/valentinbgt`              |
| LinkedIn   | Profile link         | `https://linkedin.com/in/valentin-beauget/`   |

## Environment Variables

| Variable   | Required | Description                              |
|------------|----------|------------------------------------------|
| `FORM_URL` | Yes      | n8n webhook URL for contact form submissions |

## Current Features

- **Internationalization**: French/English language support (implemented)
- **Project Gallery**: Multiple images per project with lightbox (implemented)
- **Real-time Terminal**: Network request visualization in hero section
- **Dark Mode**: Theme toggle with system preference detection
