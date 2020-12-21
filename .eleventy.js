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

  eleventyConfig.addLiquidFilter("post_meta_image_or_default", function(collection) {
    if(!collection || collection.length === 0)
      return '/assets/background.jpg';

    return collection[collection.length - 1].path;
  });

  return {
    htmlTemplateEngine: "liquid"
  };
};
