import { minify } from "html-minifier-terser";

export default function (eleventyConfig) {
  // Convert URL path to title-cased page name, e.g. /accessibility-services/ → "Accessibility Services"
  eleventyConfig.addFilter("pathToTitle", function (url) {
    if (!url || url === "/") return "";
    const minor = new Set(["a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is"]);
    const segment = url.replace(/^\/|\/$/g, "").split("/").pop();
    return segment.split("-").map((w, i) =>
      (i === 0 || !minor.has(w)) ? w.charAt(0).toUpperCase() + w.slice(1) : w
    ).join(" ");
  });

  // Convert image path to WebP equivalent, e.g. /img/logo.jpg → /img/logo.webp
  eleventyConfig.addFilter("toWebP", function (src) {
    if (!src) return src;
    return src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  });

  // Format a date as YYYY-MM-DD for sitemaps
  eleventyConfig.addFilter("toISODate", function (date) {
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addTransform("htmlmin", async function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return await minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy({ "src/admin/config.yml": "admin/config.yml" });
  eleventyConfig.addPassthroughCopy({ "src/admin/custom.css": "admin/custom.css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/decap-cms/dist/decap-cms.js": "admin/decap-cms.js" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy({ "manifest.webmanifest": "manifest.webmanifest" });

  eleventyConfig.addGlobalData("env", {
    isNetlify: !!process.env.NETLIFY,
  });

  eleventyConfig.addGlobalData("site", {
    name: "LC Education Consulting",
    url: "https://www.lceducationconsulting.com",
    description: "Accessibility reviews, training, and digital accessibility support rooted in 16 years of special education experience.",
  });

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
