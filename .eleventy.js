const md = require('markdown-it');

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.setLibrary("md", md({
    html: true,
    breaks: true,
    linkify: false
  }));

  return {
    htmlTemplateEngine: "liquid"
  };
};
