import esbuild from "esbuild";
import { argv } from "process";

const watch = argv.includes("--watch");

const ctx = await esbuild.context({
  entryPoints: ["src/js/main.js"],
  bundle: true,
  outfile: "dist/js/main.js",
  minify: !watch,
  sourcemap: watch ? 'inline' : false,
  target: ["es2020"],
  format: "iife",
  logLevel: "info",
});

if (watch) {
  await ctx.watch();
  console.log("Watching JS...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
