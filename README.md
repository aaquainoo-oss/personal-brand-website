# Ayeshia Quainoo-Tefera — Personal Brand Website

An executive-style personal brand website for **Ayeshia Quainoo-Tefera, MSN, RN** —
Healthcare Executive, Global Leadership Strategist, Entrepreneur, Philanthropist,
Speaker, Author, and Faith Leader.

> **Building Leaders. Transforming Healthcare. Creating Legacy.**

## What's here

A fast, responsive, dependency-free static website. Everything runs in the browser —
no build step, no framework — so it's easy to host anywhere and easy to learn from.

```
personal-brand-website/
├── index.html          # All page content and structure
├── css/
│   └── styles.css       # Deep navy + gold executive theme
├── js/
│   └── main.js          # Nav, animated stats, scroll reveals, contact form
├── images/
│   └── ayeshia-portrait.jpg   # ← add your professional portrait here
└── README.md
```

## Sections

| Section | Purpose |
|---|---|
| **Hero** | Headline, brand promise, and calls to action |
| **Stats** | Animated impact numbers (counts up on scroll) |
| **About** | Story, Mission, Vision, and Core Values |
| **Organizations** | The Ultimate Care LLC · Synergy Konsulting · Amy Butler Foundation · TIME Ministry |
| **Framework** | The signature **Discover · Develop · Deploy™** framework |
| **Journey** | Timeline from the bedside to the boardroom |
| **Speaking** | Topics + a prominent "Book Ayeshia to Speak" call to action |
| **Testimonials** | Featured quotes (placeholders — swap in real ones) |
| **Impact** | Stylized world map with pulsing impact markers |
| **Resources** | Publications, frameworks, and courses |
| **Media** | Videos, podcasts, and interviews |
| **Contact** | Inquiry form (speaking / consulting / partnerships) |

## Add your portrait

Save the professional headshot as:

```
images/ayeshia-portrait.jpg
```

The hero shows a graceful placeholder until the file exists, so the site never
looks broken. Recommended size: **~880 × 1170px (3:4 portrait)**.

## Run it locally

No tools required — just open `index.html` in a browser. For a local server
(so relative paths and the contact form behave like production):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Because it's a static site, hosting is simple. Options:

- **GitHub Pages** — enable Pages on this repo (branch → `/root`). Free.
- **Netlify / Vercel** — drag-and-drop the folder or connect the repo.
- **Any web host** — upload the files via FTP.

Then point your custom domain at the host.

## Contact form

The form currently works **front-end only**: it validates input and opens the
visitor's email app pre-filled to `aaquainoo@theultimatecarellc.com`. To capture
submissions server-side without running your own backend, swap it for a hosted
form service:

- **Netlify Forms** — add `netlify` to the `<form>` tag when hosting on Netlify.
- **Formspree** — point the form `action` at your Formspree endpoint.
- **Custom API** — post the fields to your own server (see "Going further").

## Going further (the tech behind the brand)

The strategy outlined a plan to also *understand* the technology. Here's the map:

- **Frontend** (`index.html` + `styles.css` + `main.js`) — the visual experience:
  structure (HTML), styling (CSS), and interactivity (JavaScript).
- **Backend** — a server that would power contact forms, online booking,
  donations, a client portal, and course registration.
- **APIs** — connectors to services like **Stripe** (payments), **Calendly**
  (booking), **Mailchimp** (email), and a **CRM**.
- **Databases** — where user and client information is securely stored.
- **Hosting + domain** — the host serves the files; the domain name points people to it.

---

© Ayeshia Quainoo-Tefera. All rights reserved.
