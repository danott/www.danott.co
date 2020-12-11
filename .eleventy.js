module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./site/site.css")
  eleventyConfig.addWatchTarget("./site/site.css")

  return {
    dir: {
      input: "site",
    },
  }
}
