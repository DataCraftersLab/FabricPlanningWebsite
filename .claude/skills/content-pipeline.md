---
name: content-pipeline
description: Content collection schemas, multi-contributor author model, image handling, and freshness rules for fabricplanning.io
---

# Content pipeline

Content for **Fabric Planning** is authored as Markdown files under `content/` and managed via **Tina CMS** (TinaCloud). All content types live in their own subdirectory and follow the schemas below.

## Content collections

### FAQ — `content/faq/`

```yaml
---
title: string         # the question
order: number         # sort order
lastReviewed: date    # YYYY-MM-DD
---
```

Body: the answer in Markdown.

### Events — `content/events/`

```yaml
---
title: string
date: date
time: string
location: string
type: virtual | in-person | webinar
description: string
registrationUrl: string
isPast: boolean
---
```

Body: optional extended description.

### Blog — `content/blog/`

```yaml
---
title: string
date: date
author:
  name: string
  bio: string
  avatarUrl: string       # https://media.fabricplanning.io/...
  linkedinUrl: string
description: string
tags: [string]
featuredImage: string     # full R2 URL
status: draft | review | published
---
```

Body: the article in Markdown.

> **Only `status: published` posts appear on the live site.**

### Knowledge Base — `content/knowledge-base/`

```yaml
---
title: string
category: string
description: string
lastReviewed: date
author:
  name: string
  bio: string
  avatarUrl: string
  linkedinUrl: string
status: draft | review | published
order: number
---
```

Body: the article in Markdown.

## Multi-contributor support

Every content type with an `author` field uses the **same `author` object structure**:

```yaml
author:
  name: string
  bio: string
  avatarUrl: string     # full R2 URL
  linkedinUrl: string
```

This lets multiple people publish across blog and knowledge base without forking the schema.

## Image handling

- All images upload to the **Cloudflare R2** bucket
- Reference them by **full URL**: `https://media.fabricplanning.io/path/to/image.png`
- **Never commit images to the Git repository**
- Every image needs alt text (see `site-platform.md` accessibility rules)

## Content freshness

- Knowledge base articles carry a `lastReviewed` date
- Articles **older than 6 months** without a review should be flagged for re-review
