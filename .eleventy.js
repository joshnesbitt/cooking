const md = require('markdown-it');

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("assets/**/*.jpg");
  eleventyConfig.addPassthroughCopy("assets/**/*.png");
  eleventyConfig.setLibrary("md", md({
    html: true,
    breaks: true,
    linkify: false
  }));

  return {
    htmlTemplateEngine: "liquid"
  };
};
