// Generates public/sitemap.xml from the real routes so crawlers (and AdSense)
// can discover every visualizer, guide, and page. Runs on prebuild.
// Visualizer slugs replicate the kebab logic in src/App.tsx exactly.
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://eduvisualsph.tech";

const kebab = (pascal) =>
	pascal
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();

const staticPaths = [
	"/",
	"/blog",
	"/units",
	"/crayon",
	"/about",
	"/help",
	"/contact",
	"/changelog",
	"/accessibility",
	"/privacy",
	"/terms",
];

const visDir = join(root, "src/pages/visualizers");
const visualizerPaths = existsSync(visDir)
	? readdirSync(visDir)
			.filter((f) => f.endsWith("Visualizer.tsx"))
			.map((f) => `/visualizer/${kebab(f.replace("Visualizer.tsx", ""))}`)
	: [];

const blogDir = join(root, "src/content/blog");
const blogPaths = existsSync(blogDir)
	? readdirSync(blogDir)
			.filter((f) => f.endsWith(".mdx"))
			.map((f) => `/blog/${f.replace(".mdx", "")}`)
	: [];

const all = [...staticPaths, ...visualizerPaths.sort(), ...blogPaths.sort()];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
	.map(
		(p) =>
			`  <url><loc>${ORIGIN}${p}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
	)
	.join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${all.length} URLs`);
