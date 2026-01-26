# Server-Side Documentation

## Overview

The Nuxt server provides route handlers for redirects and file proxying. The contact form now submits directly to n8n webhooks (no server-side API endpoint required).

```text
server/
└── routes/
│   ├── cv.get.ts          # PDF proxy
│   ├── github.get.ts      # Redirect
│   ├── linkedin.get.ts    # Redirect
│   └── mmi.get.ts         # Redirect
└── tsconfig.json
```

---

## Active Routes

### GET /cv

**File**: `server/routes/cv.get.ts`

Proxies the CV PDF from Nextcloud, allowing auto-updates when a new CV is uploaded.

```typescript
export default defineEventHandler(async (event) => {
  const response = await fetch("https://drive.beauget.fr/s/cv/download");

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: "Failed to fetch CV, please try again later.",
    });
  }

  setResponseHeaders(event, {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="cv.pdf"',
  });

  return response.body;
});
```

**Behavior**:

- Fetches PDF from Nextcloud share link
- Streams response body to client
- Sets headers for inline PDF viewing
- Returns error if Nextcloud is unavailable

**Source URL**: `https://drive.beauget.fr/s/cv/download`

---

### GET /github

**File**: `server/routes/github.get.ts`

Redirects to GitHub profile.

```typescript
export default defineEventHandler((event) => {
  return sendRedirect(event, "https://github.com/valentinbgt", 302);
});
```

**Destination**: `https://github.com/valentinbgt`

---

### GET /linkedin

**File**: `server/routes/linkedin.get.ts`

Redirects to LinkedIn profile.

```typescript
export default defineEventHandler((event) => {
  return sendRedirect(
    event,
    "https://www.linkedin.com/in/valentin-beauget/",
    302
  );
});
```

**Destination**: `https://www.linkedin.com/in/valentin-beauget/`

---

### GET /mmi

**File**: `server/routes/mmi.get.ts`

Redirects to MMI school project website.

```typescript
export default defineEventHandler((event) => {
  return sendRedirect(event, "https://mmi23a02.mmi-troyes.fr/", 302);
});
```

**Destination**: `https://mmi23a02.mmi-troyes.fr/`

---

## Removed API

### POST /api/contact

**Status**: REMOVED (file deleted)

**Previous File**: `server/api/contact.post.ts` (no longer exists)

**Reason**: Replaced by direct n8n webhook integration. The contact form now submits directly to the n8n webhook URL configured via `FORM_URL` environment variable.

**Previous Implementation** (for reference):

- Accepted contact form submissions
- Added timestamp and UUID
- Saved to `server/data/messages.json` on disk

**Current Implementation**:

- Contact form submits directly to n8n webhook
- No server-side API endpoint required
- n8n handles Discord notifications

---

## Environment Variables

### FORM_URL

**Required**: Yes (for contact form functionality)

**Format**: `https://n8n.beauget.fr/webhook/WEBHOOK_TOKEN`

**Usage in Nuxt Config**:

```typescript
// nuxt.config.ts
runtimeConfig: {
  public: {
    formUrl: "",  // Set via NUXT_PUBLIC_FORM_URL or FORM_URL
  },
},
```

**Usage in Application**:

```typescript
// app.vue
const config = useRuntimeConfig();

const handleSubmit = async () => {
  const response = await fetch(config.public.formUrl, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
```

---

## Route Summary Table

| Route      | Method | Type     | Destination                        | Status |
|------------|--------|----------|-------------------------------------|--------|
| `/cv`      | GET    | Proxy    | Nextcloud PDF                       | Active |
| `/github`  | GET    | Redirect | github.com/valentinbgt              | Active |
| `/linkedin` | GET  | Redirect | linkedin.com/in/valentin-beauget    | Active |
| `/mmi`     | GET    | Redirect | mmi23a02.mmi-troyes.fr              | Active |

---

## n8n Webhook Integration

The contact form now submits directly to an n8n webhook instead of the local API.

### Flow

```text
User submits form
       │
       ▼
POST to FORM_URL (n8n webhook)
       │
       ▼
n8n receives JSON payload:
{
  "firstName": "...",
  "lastName": "...",
  "email": "...",
  "message": "..."
}
       │
       ▼
n8n workflow triggers
       │
       ▼
Discord notification sent
```

### n8n Workflow Purpose

- Receive form data via HTTP webhook
- Format notification message
- Send to Discord channel
- No local storage required

---

## TypeScript Configuration

**File**: `server/tsconfig.json`

```json
{
  "extends": "../.nuxt/tsconfig.server.json"
}
```

Inherits TypeScript configuration from Nuxt's generated server config.
