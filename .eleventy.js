module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./site.css")
  eleventyConfig.addWatchTarget("./site.css")

  return {}
}
