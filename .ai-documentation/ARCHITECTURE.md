# Architecture

## System Overview

```mermaid
graph TB
    subgraph client [Client Browser]
        AppVue[app.vue]
        Components[Components]
    end
    
    subgraph nuxt [Nuxt Server]
        SSR[SSR Engine]
        Routes[Server Routes]
        API[API Endpoints]
    end
    
    subgraph external [External Services]
        n8n[n8n Webhook]
        Nextcloud[Nextcloud Drive]
        Discord[Discord]
    end
    
    AppVue --> Components
    AppVue -->|Contact Form| n8n
    n8n -->|Notification| Discord
    
    Routes -->|/cv| Nextcloud
    Routes -->|/github| GitHub
    Routes -->|/linkedin| LinkedIn
    
    client --> nuxt
    nuxt --> external
```

## Application Flow

### Page Load Sequence

```mermaid
sequenceDiagram
    participant Browser
    participant Nuxt
    participant AppVue
    
    Browser->>Nuxt: Request /
    Nuxt->>AppVue: Render app.vue
    AppVue->>AppVue: Load projects.json
    AppVue->>AppVue: Initialize theme (localStorage/system)
    AppVue->>AppVue: Start network capture
    Nuxt-->>Browser: HTML + Hydration
    Browser->>Browser: Vue hydration
    Browser->>Browser: Initialize terminal logs
```

### Contact Form Flow

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant n8n
    participant Discord
    
    User->>Form: Fill form fields
    User->>Form: Click "Envoyer"
    Form->>Form: Client-side validation
    Form->>n8n: POST JSON payload
    n8n->>Discord: Send notification
    n8n-->>Form: 200 OK
    Form->>User: Show success notification
```

## Component Architecture

```mermaid
graph TD
    AppVue[app.vue]
    
    AppVue --> Nav[Navigation Bar]
    AppVue --> Hero[Hero Section]
    AppVue --> Projects[Projects Section]
    AppVue --> Skills[Skills Section]
    AppVue --> Contact[Contact Section]
    AppVue --> Footer[Footer]
    
    Hero --> Terminal[Terminal Visualization]
    
    Projects --> ProjectCards[Project Cards Grid]
    Projects --> ProjectModal[ProjectModal]
    
    Skills --> SkillsFloating[SkillsFloating]
```

## Data Flow

### Projects Data

```text
assets/data/projects.json
         │
         ▼
    app.vue (import)
         │
         ▼
    ref(projectsData)
         │
         ▼
    visibleProjects (computed)
    └── Filters: !project.hidden
         │
         ▼
    v-for rendering
         │
         ├── Project Cards (grid)
         │
         └── ProjectModal (on click)
```

### Form Data

```text
formData (reactive)
├── firstName: string
├── lastName: string
├── email: string
└── message: string
         │
         ▼
    handleSubmit()
         │
         ▼
    fetch(config.public.formUrl)
         │
         ▼
    n8n webhook
         │
         ▼
    Discord notification
```

## Server Architecture

### Route Handlers

| Route     | Method | Handler        | Purpose                          |
|-----------|--------|----------------|----------------------------------|
| `/cv`     | GET    | `cv.get.ts`    | Proxy PDF from Nextcloud         |
| `/github` | GET    | `github.get.ts` | 302 redirect to GitHub           |
| `/linkedin` | GET  | `linkedin.get.ts` | 302 redirect to LinkedIn       |
| `/mmi`    | GET    | `mmi.get.ts`   | 302 redirect to MMI project       |

### Removed Endpoints

| Route          | Method | Handler            | Status                                          |
|----------------|--------|--------------------|-------------------------------------------------|
| `/api/contact` | POST   | `contact.post.ts`  | REMOVED - replaced by direct n8n webhook integration |

## External Service Integration

### n8n Webhook

- **Purpose**: Receive contact form submissions
- **Trigger**: HTTP POST request
- **Action**: Send Discord notification
- **Configuration**: `FORM_URL` environment variable

```text
Client Form
    │
    ▼
POST https://n8n.beauget.fr/webhook/{token}
    │
    ▼
n8n Workflow
    │
    ▼
Discord Webhook → Channel Notification
```

### Nextcloud CV Proxy

- **Purpose**: Serve CV PDF without exposing Nextcloud URL
- **Source**: `https://drive.beauget.fr/s/cv/download`
- **Benefit**: Auto-updates when new CV is uploaded to Nextcloud

```text
Client Request: /cv
    │
    ▼
Nuxt Server Route
    │
    ▼
Fetch from Nextcloud
    │
    ▼
Stream PDF to client
Headers: Content-Type: application/pdf
         Content-Disposition: inline; filename="cv.pdf"
```

## State Management

The application uses Vue 3 Composition API with local component state:

| State                | Type       | Purpose                                                      |
|----------------------|------------|--------------------------------------------------------------|
| `projects`           | `ref`      | Projects array from JSON                                     |
| `visibleProjects`    | `computed` | Filtered projects (!hidden)                                  |
| `selectedProjectIndex` | `ref`    | Index of selected project for modal                          |
| `isModalOpen`        | `computed` | `selectedProjectIndex !== null`                              |
| `formData`           | `reactive` | Contact form fields (firstName, lastName, email, message)    |
| `isSubmitting`       | `ref`      | Form submission state                                        |
| `notification`       | `ref`      | Toast notification state                                     |
| `locale`             | `ref`      | Current language (fr/en)                                     |
| `isDark`             | `ref`      | Dark mode state                                              |
| `terminalLogs`       | `ref`      | Real-time network request logs                               |
| `currentHost`        | `ref`      | Current hostname for terminal display                        |

## Rendering Strategy

- **Mode**: Universal (SSR + Client Hydration)
- **Single Page**: All content in `app.vue`
- **No Router**: Anchor-based navigation (`#home`, `#projects`, `#skills`, `#contact`)
- **Theme**: Dark mode with system preference detection
- **i18n**: French/English language support via Nuxt i18n module
