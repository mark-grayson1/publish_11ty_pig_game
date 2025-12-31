module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/index.html");
  eleventyConfig.addPassthroughCopy("src/*.png");

  return {
    dir: {
      input: "src",
      output: "docs"
    }
  }
}