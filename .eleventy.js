const { createHighlighter } = require("shiki");
const markdownIt = require("markdown-it");
const markdownItKatex = require("markdown-it-katex");

let highlighter = null; // ← will be set once and kept forever

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("json", function (value) {
    return JSON.stringify(value);
  });

  eleventyConfig.addPassthroughCopy("./src/styles.css");
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Required so Eleventy knows we'll modify markdown
  eleventyConfig.amendLibrary("md", () => {});

  eleventyConfig.on("eleventy.before", async () => {
    if (!highlighter) {
      highlighter = await createHighlighter({
        themes: ["github-dark", "github-light"],
        langs: ["python", "java" /* add more here for faster first render */],
      });
    }

    eleventyConfig.amendLibrary("md", (mdLib) => {
      mdLib.set({
        highlight: (code, lang) => {
          if (!lang) lang = "text";
          const theme = "github-dark"; // can make dynamic later

          // Now safe: highlighter is already resolved → synchronous call!
          return highlighter.codeToHtml(code, { lang, theme });
        },
      }),
      mdLib.use(markdownItKatex, {
        throwOnError: false,
        errorColor: "#cc0000",
      });
    });
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist/katex.min.css": "katex.css"
  })

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};