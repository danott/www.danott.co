module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./site/site.css")
  eleventyConfig.addWatchTarget("./site/site.css")

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "site",
    },
  }
}
