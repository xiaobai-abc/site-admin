import { defineConfig } from "vite";
// import react from '@vitejs/plugin-react'
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import browserslist from "browserslist";

// 浏览器版本配置
const browserslistConfig = browserslist.loadConfig({ path: "." });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: browserslistConfig, //需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true,
      polyfills: [
        "es.symbol",
        "es.array.filter",
        "es.promise",
        "es.promise.finally",
        "es/map",
        "es/set",
        "es.array.for-each",
        "es.object.define-properties",
        "es.object.define-property",
        "es.object.get-own-property-descriptor",
        "es.object.get-own-property-descriptors",
        "es.object.keys",
        "es.object.to-string",
        "web.dom-collections.for-each",
        "esnext.global-this",
        "esnext.string.match-all",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  envPrefix: ["VITE_", "APP_"],
  css: {
    modules: {},
    postcss: {
      plugins: [postcssPresetEnv(), tailwindcss, autoprefixer],
    },
    preprocessorOptions: {
      less: {
        globalVars: {
          //全局变量
        },
        devSourcemap: true, //开启css 文件索引 可以查看代码
        charset: false,
        additionalData: `@import "${resolve(
          __dirname,
          "src/style/variable.less"
        )}";`,
      },
    },
  },
  build: {
    //分包策略
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-chunk-[hash].js",
        assetFileNames: "css/[name]-[hash][extname]",
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
      plugins: [],
    },
  },
  // base: "./",
  server: {
    // ← ← ← ← ← ←
    host: "0.0.0.0", // ← 新增内容 ←
    // https : true,
    open: false,
    port: 5180,
    proxy: {
      // 这里的ccc可乱写, 是拼接在url后面的地址 如果接口中没有统一的后缀可自定义
      // 如果有统一后缀, 如api, 直接写api即可, 也不用rewrite了
      // "^/api": {
      //   target: "http://wavelen.meseeagro.com/", // 真实接口地址, 后端给的基地址
      //   changeOrigin: true, // 允许跨域
      //   secure: false, //关键参数，不懂的自己去查
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
});
