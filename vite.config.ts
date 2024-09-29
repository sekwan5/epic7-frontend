import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "fs";
import path from "path";
import heroIds from "./src/modules/data/heroIds.json";

// 사이트맵을 생성하는 함수
function generateSitemap(routes: string[], filename: string) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>https://epic7gg.com${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`;

  writeFileSync(path.resolve(__dirname, "dist", filename), sitemap);
}

// 사이트맵 인덱스를 생성하는 함수
function generateSitemapIndex(sitemapFiles: string[]) {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapFiles
    .map(
      (file) => `
  <sitemap>
    <loc>https://epic7gg.com/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  `,
    )
    .join("")}
</sitemapindex>`;

  writeFileSync(
    path.resolve(__dirname, "dist", "sitemap-index.xml"),
    sitemapIndex,
  );
}

const baseRoutes = [
  "/",
  "/hero",
  "/gear/owner",
  "/camping",
  "/gear/enhance",
  "/favicon.ico",
];

const heroRoutes = heroIds.map((id) => `/hero/${id}`);

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  define: {
    global: {},
  },
  plugins: [
    react(),
    {
      name: "generate-sitemap",
      closeBundle() {
        generateSitemap(baseRoutes, "sitemap-base.xml");

        const heroChunks = [];
        for (let i = 0; i < heroRoutes.length; i += 100) {
          const chunk = heroRoutes.slice(i, i + 100);
          const filename = `sitemap-heroes-${Math.floor(i / 100) + 1}.xml`;
          generateSitemap(chunk, filename);
          heroChunks.push(filename);
        }

        generateSitemapIndex(["sitemap-base.xml", ...heroChunks]);
      },
    },
  ],
  server: {
    port: 3000,
    hmr: true,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
