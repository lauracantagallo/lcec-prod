import { minify } from "html-minifier-terser";

export default function (eleventyConfig) {
  // Convert URL path to title-cased page name, e.g. /accessibility-services/ → "Accessibility Services"
  eleventyConfig.addFilter("pathToTitle", function (url) {
    if (!url || url === "/") return "";
    const segment = url.replace(/^\/|\/$/g, "").split("/").pop();
    return segment.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
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
      });
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy({ "manifest.webmanifest": "manifest.webmanifest" });

  eleventyConfig.addGlobalData("site", {
    name: "LC Education Consulting",
    url: "https://lceducationconsulting.com",
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
