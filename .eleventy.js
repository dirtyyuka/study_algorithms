module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("json", function (value) {
    return JSON.stringify(value);
  });
  eleventyConfig.addPassthroughCopy("./src/styles.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
