const MarkdownIt = require("markdown-it")

const md = new MarkdownIt({
  html: true,
  breaks: false,
  typographer: true,
}).use(require("markdown-it-deflist"))

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./site/site.css")
  eleventyConfig.addWatchTarget("./site/site.css")

  eleventyConfig.setLibrary("md", md)

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "site",
    },
  }
}
