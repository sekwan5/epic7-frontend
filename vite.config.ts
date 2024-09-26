import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import RemixRouter from "vite-plugin-remix-router";
import VitePluginSitemap from "vite-plugin-sitemap";
import path from "path";
import fs from "fs";

// 라우트 파일 찾기 함수
function findRouteFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findRouteFiles(file));
    } else {
      if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
        results.push(file);
      }
    }
  });

  return results;
}

// 라우트 경로 생성 함수
function generateRoutes(): string[] {
  const routeFiles = findRouteFiles(path.join(__dirname, "src/routes"));
  return routeFiles.map((file) => {
    let route = file.replace(path.join(__dirname, "src/routes"), "");
    route = route.replace(/\.(tsx|jsx)$/, "");
    route = route.replace(/\/index$/, "");
    return route || "/";
  });
}

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/epic7-frontend/",
  base: "/",
  define: {
    global: {},
  },
  plugins: [
    react(),
    // RemixRouter({
    //   // configuration options
    // }),
    VitePluginSitemap({
      hostname: "https://epic7gg.com", // 여기에 실제 웹사이트 주소를 입력하세요
      exclude: ["/admin"], // 제외할 경로가 있다면 여기에 추가하세요
      dynamicRoutes: generateRoutes(), // 함수 자체를 전달
    }),
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
