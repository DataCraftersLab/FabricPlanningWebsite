#!/usr/bin/env node
/**
 * Generates llms.txt, llms-full.txt, and the /md/ directory for fabricplanning.io.
 *
 * Outputs:
 *   public/llms.txt        — curated index per https://llmstxt.org/
 *   public/llms-full.txt   — concatenated full content of every page
 *   public/md/             — browsable markdown copies (one file per page)
 *   public/md/index.md     — table of contents for /md/
 *
 * Run locally:  node scripts/generate-llms-txt.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const MD_DIR = path.join(PUBLIC_DIR, "md");

const SITE_URL = "https://fabricplanning.io";
const SITE_TITLE = "Fabric Planning";
const SITE_TAGLINE =
  "The knowledge hub for Microsoft Fabric Planning -- budgeting, forecasting, and financial planning powered by Microsoft Fabric.";
const SITE_INTRO =
  "Fabric Planning is an emerging capability within Microsoft Fabric that brings planning, budgeting, and forecasting natively into the Microsoft data stack. This site provides educational content, FAQs, knowledge base articles, and community resources for finance and data professionals exploring Fabric Planning.";

/**
 * Sources of markdown content.
 *
 * Each source maps a directory of .md/.mdx files to:
 *   - section: H2 heading used in llms.txt
 *   - mdSubdir: subdirectory name under public/md/
 *   - listingUrl: site URL where the collection is rendered
 *   - itemUrl: optional per-item URL builder (if items have their own pages).
 *              If undefined, the listingUrl is used for every item.
 */
/**
 * Hand-curated entries for `.astro` pages whose content is authored as JSX
 * rather than markdown. The script auto-discovers `.md`/`.mdx` files in
 * `SOURCES`, but these pages need targeted extractors because their copy
 * lives inside the JSX.
 *
 * Add a new entry here whenever an .astro page should be exposed in
 * llms.txt and the /md/ directory.
 */
const EXTRA_PAGES = [
  {
    file: "src/pages/index.astro",
    title: "Home",
    description:
      "Overview of Fabric Planning and what this knowledge hub offers",
    mdRelPath: "home.md",
    url: `${SITE_URL}/`,
    extractor: "jsx",
  },
  {
    file: "src/pages/faq.astro",
    title: "FAQ",
    description: "Common questions about Microsoft Fabric Planning",
    mdRelPath: "faq.md",
    url: `${SITE_URL}/faq/`,
    extractor: "faqArray",
  },
  {
    file: "src/pages/about.astro",
    title: "About",
    description:
      "About Khaled Chowdhury and Data Crafters, the team behind the Fabric Planning knowledge hub",
    mdRelPath: "about.md",
    url: `${SITE_URL}/about/`,
    extractor: "jsx",
  },
];

const SOURCES = [
  {
    dir: "content/faq",
    section: "FAQ",
    mdSubdir: "faq",
    listingUrl: `${SITE_URL}/faq/`,
  },
  {
    dir: "content/knowledge-base",
    section: "Knowledge Base",
    mdSubdir: "kb",
    listingUrl: `${SITE_URL}/kb/`,
    itemUrl: (slug) => `${SITE_URL}/kb/${slug}/`,
  },
  {
    dir: "content/blog",
    section: "Blog",
    mdSubdir: "blog",
    listingUrl: `${SITE_URL}/resources/blog/`,
    itemUrl: (slug) => `${SITE_URL}/resources/blog/${slug}/`,
  },
  {
    dir: "content/events",
    section: "Events",
    mdSubdir: "events",
    listingUrl: `${SITE_URL}/resources/events/`,
    optional: true,
  },
  {
    dir: "content/social-media",
    section: "Social Media",
    mdSubdir: "social-media",
    listingUrl: `${SITE_URL}/resources/social-media/`,
    optional: true,
  },
];

// ---------- helpers ----------

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

/** Strip Astro/JSX/HTML components from a markdown body, keeping plain markdown. */
function stripComponents(md) {
  return md
    // Remove import statements (Astro/MDX)
    .replace(/^import\s+.*?from\s+["'].*?["'];?\s*$/gm, "")
    // Remove JSX/Astro component tags like <Foo ... /> or <Foo>...</Foo>
    .replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, "")
    .replace(/<[A-Z][A-Za-z0-9]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g, "")
    // Remove standalone HTML tags (inline ones like <br>, <hr>)
    .replace(/<\/?(?:br|hr|img|div|span|section|p)[^>]*>/gi, "")
    // Collapse 3+ blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Shift markdown heading levels by `n` (e.g. n=2 turns `#` into `###`). */
function shiftHeadings(md, n) {
  return md.replace(/^(#{1,6})\s+/gm, (_match, hashes) => {
    const newLevel = Math.min(hashes.length + n, 6);
    return "#".repeat(newLevel) + " ";
  });
}

/** Decode the small set of HTML entities used by the .astro pages. */
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)));
}

/**
 * Convert a small subset of inline HTML to markdown:
 *   <a href="X">Y</a>  -> [Y](X)
 *   <strong>X</strong> -> **X**
 *   <em>X</em>         -> *X*
 *   <code>X</code>     -> `X`
 *   <br>               -> newline
 * Then strips any leftover tags and decodes entities.
 */
function htmlToInlineMarkdown(html) {
  let s = html;
  s = s.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_m, href, text) => `[${text.trim()}](${href})`,
  );
  s = s.replace(/<strong>([\s\S]*?)<\/strong>/gi, (_m, t) => `**${t.trim()}**`);
  s = s.replace(/<b>([\s\S]*?)<\/b>/gi, (_m, t) => `**${t.trim()}**`);
  s = s.replace(/<em>([\s\S]*?)<\/em>/gi, (_m, t) => `*${t.trim()}*`);
  s = s.replace(/<i>([\s\S]*?)<\/i>/gi, (_m, t) => `*${t.trim()}*`);
  s = s.replace(/<code>([\s\S]*?)<\/code>/gi, (_m, t) => `\`${t.trim()}\``);
  s = s.replace(/<br\s*\/?>/gi, "\n");
  // Strip any remaining tags
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

/**
 * Generic extractor for hand-written JSX/Astro pages: walks the source in
 * document order and converts h1/h2/h3/p tags to markdown. Components,
 * JSX comments, and layout-only divs are ignored.
 */
function extractJsxToMarkdown(source) {
  // Strip the frontmatter block (Astro --- ... ---) so we don't pick up imports.
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---\n/, "");

  const out = [];
  // Match lowercase HTML tags only (skip JSX components which start with uppercase).
  const tagRe = /<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = tagRe.exec(withoutFrontmatter)) !== null) {
    const tag = m[1].toLowerCase();
    const inner = htmlToInlineMarkdown(m[2]);
    if (!inner) continue;
    if (tag === "p") {
      out.push(inner);
    } else {
      const level = parseInt(tag.slice(1), 10);
      out.push(`${"#".repeat(level)} ${inner}`);
    }
  }
  return out.join("\n\n");
}

/**
 * Extractor for `src/pages/faq.astro`: parses the `const faqs = [...]` array
 * and emits one H2 per question followed by the answer's HTML converted to
 * markdown paragraphs.
 */
function extractFaqArrayToMarkdown(source) {
  // Pull each { question: "...", answer: `...` } block.
  const itemRe =
    /\{\s*question:\s*(?:"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)\s*,\s*answer:\s*`([\s\S]*?)`\s*,?\s*\}/g;
  const out = [];
  let m;
  while ((m = itemRe.exec(source)) !== null) {
    const question = (m[1] ?? m[2] ?? "").replace(/\s+/g, " ").trim();
    const answerHtml = m[3];

    out.push(`## ${decodeEntities(question)}`);
    // Split answer by paragraph tags, convert each to markdown
    const paraRe = /<p\b[^>]*>([\s\S]*?)<\/p>/g;
    let p;
    while ((p = paraRe.exec(answerHtml)) !== null) {
      const text = htmlToInlineMarkdown(p[1]);
      if (text) out.push(text);
    }
    out.push(""); // blank line between Q&As
  }
  return out.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Best-effort title fallback from filename. */
function titleFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Build a one-line description from frontmatter or body. */
function deriveDescription(data, body) {
  const fields = ["description", "excerpt", "summary", "subtitle"];
  for (const f of fields) {
    if (typeof data[f] === "string" && data[f].trim()) return data[f].trim();
  }
  // Fall back to first non-heading paragraph of the body
  const firstPara = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#"));
  if (!firstPara) return "";
  const oneLine = firstPara.replace(/\s+/g, " ").trim();
  return oneLine.length > 200 ? oneLine.slice(0, 197) + "..." : oneLine;
}

// ---------- core ----------

/** Load and extract content from the EXTRA_PAGES (.astro) configuration. */
function loadExtraPages() {
  const items = [];
  for (const page of EXTRA_PAGES) {
    const abs = path.join(ROOT, page.file);
    if (!fs.existsSync(abs)) {
      console.warn(`  WARN: ${page.file} not found, skipping`);
      continue;
    }
    const source = fs.readFileSync(abs, "utf8");
    let body = "";
    if (page.extractor === "faqArray") {
      body = extractFaqArrayToMarkdown(source);
    } else {
      body = extractJsxToMarkdown(source);
    }
    items.push({
      source: { section: "Main Pages", mdSubdir: "" },
      slug: path.basename(page.mdRelPath, ".md"),
      title: page.title,
      description: page.description,
      body,
      url: page.url,
      mdRelPath: page.mdRelPath,
      isMainPage: true,
    });
  }
  return items;
}

async function loadSource(source) {
  const absDir = path.join(ROOT, source.dir);
  if (!fs.existsSync(absDir)) return [];

  const files = await fg(["**/*.md", "**/*.mdx"], { cwd: absDir });
  const items = [];

  for (const rel of files) {
    const abs = path.join(absDir, rel);
    const raw = fs.readFileSync(abs, "utf8");
    const { data, content } = matter(raw);

    // Skip drafts
    if (data.draft === true) continue;
    if (typeof data.status === "string" && data.status === "draft") continue;

    const slug = rel.replace(/\.(md|mdx)$/i, "").replace(/\\/g, "/");
    const title =
      (typeof data.title === "string" && data.title.trim()) ||
      (typeof data.author === "string" && data.author.trim()) ||
      titleFromSlug(path.basename(slug));

    const cleanBody = stripComponents(content);
    const description = deriveDescription(data, cleanBody);

    const url = source.itemUrl ? source.itemUrl(slug) : source.listingUrl;

    items.push({
      source,
      slug,
      title,
      description,
      body: cleanBody,
      url,
      mdRelPath: `${source.mdSubdir}/${slug}.md`,
    });
  }

  // Sort by title alphabetically for stable output
  items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}

function buildLlmsTxt(grouped) {
  const lines = [];
  lines.push(`# ${SITE_TITLE}`);
  lines.push(`> ${SITE_TAGLINE}`);
  lines.push("");
  lines.push(SITE_INTRO);
  lines.push("");

  // Required sections come first; Optional sections last (per llms.txt spec).
  // Main Pages always renders first when present.
  const required = grouped.filter((g) => !g.source.optional && g.items.length);
  required.sort((a, b) => {
    if (a.source.section === "Main Pages") return -1;
    if (b.source.section === "Main Pages") return 1;
    return 0;
  });
  const optional = grouped.filter((g) => g.source.optional && g.items.length);

  for (const g of required) {
    lines.push(`## ${g.source.section}`);
    for (const item of g.items) {
      const mdUrl = `${SITE_URL}/md/${item.mdRelPath}`;
      const desc = item.description || item.title;
      lines.push(
        `- [${item.title}](${item.url}): ${desc} ([markdown](${mdUrl}))`,
      );
    }
    lines.push("");
  }

  if (optional.length) {
    lines.push(`## Optional`);
    for (const g of optional) {
      for (const item of g.items) {
        const mdUrl = `${SITE_URL}/md/${item.mdRelPath}`;
        const desc = item.description || item.title;
        lines.push(
          `- [${item.title}](${item.url}): ${desc} ([markdown](${mdUrl}))`,
        );
      }
    }
    lines.push("");
  }

  return lines.join("\n").replace(/\n+$/, "\n");
}

function buildLlmsFullTxt(grouped) {
  const lines = [];
  lines.push(`# ${SITE_TITLE}`);
  lines.push(`> ${SITE_TAGLINE}`);
  lines.push("");

  // Render Main Pages first (without collection prefix), then everything else.
  const ordered = [...grouped].sort((a, b) => {
    if (a.source.section === "Main Pages") return -1;
    if (b.source.section === "Main Pages") return 1;
    return 0;
  });

  for (const g of ordered) {
    if (!g.items.length) continue;
    for (const item of g.items) {
      lines.push("---");
      lines.push("");
      // Main pages: just the title. Collection items: "Section: Title".
      const heading = item.isMainPage
        ? `## ${item.title}`
        : `## ${g.source.section}: ${item.title}`;
      lines.push(heading);
      lines.push("");
      // Shift headings down 2 levels so item H1 -> H3 within full doc
      const shifted = shiftHeadings(item.body, 2);
      lines.push(shifted || "_(no body content)_");
      lines.push("");
    }
  }

  lines.push("---");
  return lines.join("\n").replace(/\n+$/, "\n");
}

function buildIndividualMd(item) {
  const footer = `---\n*Source: [${item.title}](${item.url}) | Generated from [FabricPlanning.io](${SITE_URL}/) | [Full site markdown](${SITE_URL}/llms-full.txt)*`;
  const body = item.body || "_(no body content)_";
  return `# ${item.title}\n\n${body}\n\n${footer}\n`;
}

function buildMdIndex(grouped) {
  const lines = [];
  lines.push(`# ${SITE_TITLE} — Markdown Library`);
  lines.push("");
  lines.push(
    `Browsable markdown copies of every page on [${SITE_URL.replace("https://", "")}](${SITE_URL}/). For the curated index, see [/llms.txt](${SITE_URL}/llms.txt). For everything in one file, see [/llms-full.txt](${SITE_URL}/llms-full.txt).`,
  );
  lines.push("");
  const ordered = [...grouped].sort((a, b) => {
    if (a.source.section === "Main Pages") return -1;
    if (b.source.section === "Main Pages") return 1;
    return 0;
  });
  for (const g of ordered) {
    if (!g.items.length) continue;
    lines.push(`## ${g.source.section}`);
    for (const item of g.items) {
      const mdUrl = `${SITE_URL}/md/${item.mdRelPath}`;
      lines.push(`- [${item.title}](${mdUrl})`);
    }
    lines.push("");
  }
  return lines.join("\n").replace(/\n+$/, "\n");
}

async function main() {
  console.log("Generating llms.txt files...");

  // 1. Load all sources, plus the curated EXTRA_PAGES (.astro extractors).
  const grouped = [];

  const mainItems = loadExtraPages();
  grouped.push({
    source: { section: "Main Pages", mdSubdir: "" },
    items: mainItems,
  });
  console.log(`  EXTRA_PAGES (.astro): ${mainItems.length} items`);

  for (const source of SOURCES) {
    const items = await loadSource(source);
    grouped.push({ source, items });
    console.log(`  ${source.dir}: ${items.length} items`);
  }

  // 2. Reset public/md/
  rimraf(MD_DIR);
  ensureDir(MD_DIR);

  // 3. Write per-item markdown files
  let mdCount = 0;
  for (const g of grouped) {
    for (const item of g.items) {
      const outPath = path.join(MD_DIR, item.mdRelPath);
      ensureDir(path.dirname(outPath));
      fs.writeFileSync(outPath, buildIndividualMd(item), "utf8");
      mdCount++;
    }
  }

  // 4. Write index.md
  fs.writeFileSync(path.join(MD_DIR, "index.md"), buildMdIndex(grouped), "utf8");

  // 5. Write llms.txt and llms-full.txt
  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "llms.txt"),
    buildLlmsTxt(grouped),
    "utf8",
  );
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "llms-full.txt"),
    buildLlmsFullTxt(grouped),
    "utf8",
  );

  console.log(
    `\nDone. Wrote llms.txt, llms-full.txt, and ${mdCount} files under public/md/.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
