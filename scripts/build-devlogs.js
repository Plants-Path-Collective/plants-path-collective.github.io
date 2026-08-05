/**
 * ============================================================
 * Devlog build script
 * ============================================================
 * Reads markdown files from ../devlogs (repo root /devlogs),
 * and generates one static HTML page per file into ../devlog
 * (repo root /devlog), using scripts/devlog-template.html.
 *
 * Run with: node scripts/build-devlogs.js
 * ============================================================
 */

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const matter = require("gray-matter");

marked.setOptions({
    gfm: true,           
    breaks: true,        
    pedantic: false,     
});

const REPO_ROOT = path.join(__dirname, "..");
const DEVLOGS_SRC_DIR = path.join(REPO_ROOT, "devlogs");
const DEVLOG_OUT_DIR = path.join(REPO_ROOT, "devlog");
const DEVLOG_INDEX_PATH = path.join(REPO_ROOT, "data", "devlogs.json");
const TEMPLATE_PATH = path.join(__dirname, "devlog-template.html");

function formatDate(dateInput) {
    const date = new Date(dateInput);
    return date
        .toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "2-digit" })
        .toUpperCase();
}

// gray-matter/js-yaml auto-parses unquoted YAML dates (date: 2026-07-28)
// into real Date objects. Normalize everything back to a plain
// "YYYY-MM-DD" string so the front-end's date parsing stays predictable.
function toISODateString(dateInput) {
    return new Date(dateInput).toISOString().slice(0, 10);
}

function slugify(filename) {
    return filename.replace(/\.md$/i, "");
}

function stripMarkdown(text) {
    return text
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/[*_`>#]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

const isSoloImageToken = (token) =>
    token.type === "paragraph" &&
    token.tokens &&
    token.tokens.length === 1 &&
    token.tokens[0].type === "image";

function getExcerpt(frontmatter, content) {
    if (frontmatter.excerpt) return frontmatter.excerpt;

    const tokens = marked.lexer(content.trim()).filter((t) => t.type !== "space");
    const firstParagraph = tokens.find((t) => t.type === "paragraph" && !isSoloImageToken(t));
    if (!firstParagraph) return "";

    const text = stripMarkdown(firstParagraph.text);
    return text.length > 180 ? `${text.slice(0, 177).trimEnd()}…` : text;
}

/**
 * Walks the top-level markdown tokens and groups them into
 * "blocks": either a single image, or a run of other content
 * (paragraphs, lists, etc.) that gets wrapped in one glass panel.
 */
function renderContent(markdownBody) {
    const tokens = marked.lexer(markdownBody.trim()).filter((t) => t.type !== "space");
    const blocks = [];
    let currentGroup = [];

    const flushGroup = () => {
        if (currentGroup.length) {
            blocks.push({ type: "text-group", tokens: currentGroup });
            currentGroup = [];
        }
    };

    tokens.forEach((token) => {
        if (isSoloImageToken(token)) {
            flushGroup();
            blocks.push({ type: "image", image: token.tokens[0] });
        } else {
            currentGroup.push(token);
        }
    });
    flushGroup();

    return blocks
        .map((block) => {
            if (block.type === "image") {
                const { href, title, text } = block.image;
                const captionParts = [text, title].filter(Boolean);
                const caption = captionParts.join(" — ");
                return `
      <figure class="devlog-figure">
        <img src="${href}" alt="${text || ""}" loading="lazy">
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>`;
            }

            const html = marked.parser(block.tokens);
            return `
      <div class="devlog-text-panel glass-panel">
        ${html.trim()}
      </div>`;
        })
        .join("\n");
}

function buildDevlog(filename, template) {
    const filePath = path.join(DEVLOGS_SRC_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(raw);

    const slug = slugify(filename);
    const author = frontmatter.author || {};
    const isoDate = frontmatter.date ? toISODateString(frontmatter.date) : null;

    const html = template
        .replaceAll("{{TITLE}}", frontmatter.title || "Untitled devlog")
        .replaceAll("{{GAME}}", frontmatter.game || "General")
        .replaceAll("{{AUTHOR_AVATAR}}", author.avatar || "")
        .replaceAll("{{AUTHOR_NAME}}", author.name || "Plants Path Collective")
        .replaceAll("{{AUTHOR_ROLE}}", author.role || "")
        .replaceAll("{{DATE_UPLOADED}}", isoDate ? formatDate(isoDate) : "")
        .replaceAll(
            "{{BACKGROUND_IMAGE_CSS}}",
            frontmatter.background ? `url('${frontmatter.background}')` : "none"
        )
        .replaceAll("{{BACK_HREF}}", "../index.html#news")
        .replaceAll("{{CONTENT}}", renderContent(content));

    fs.mkdirSync(DEVLOG_OUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(DEVLOG_OUT_DIR, `${slug}.html`), html, "utf8");

    return {
        slug,
        title: frontmatter.title || "Untitled devlog",
        category: frontmatter.game || "General",
        date: isoDate,
        excerpt: getExcerpt(frontmatter, content),
        link: `devlog/${slug}.html`
    };
}

function buildIndex(entries) {
    const sorted = [...entries]
        .filter((e) => e.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.mkdirSync(path.dirname(DEVLOG_INDEX_PATH), { recursive: true });
    fs.writeFileSync(DEVLOG_INDEX_PATH, JSON.stringify(sorted, null, 2), "utf8");
    return sorted;
}

function main() {
    if (!fs.existsSync(DEVLOGS_SRC_DIR)) {
        console.error(`No devlogs source folder found at ${DEVLOGS_SRC_DIR}`);
        process.exit(1);
    }

    const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
    const files = fs.readdirSync(DEVLOGS_SRC_DIR).filter((f) => f.endsWith(".md"));

    if (!files.length) {
        console.log("No .md files found in /devlogs — nothing to build.");
        return;
    }

    const built = files.map((f) => buildDevlog(f, template));
    const indexed = buildIndex(built);

    built.forEach(({ slug, title }) => {
        console.log(`Built devlog/${slug}.html  ("${title}")`);
    });
    console.log(`Built data/devlogs.json  (${indexed.length} entries, newest first)`);
    console.log(`\nDone — ${built.length} devlog page(s) generated.`);
}

main();