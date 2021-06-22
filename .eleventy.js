const MarkdownIt = require("markdown-it")
const execSync = require("child_process").execSync

const md = new MarkdownIt({
  html: false,
  breaks: false,
  typographer: true,
}).use(require("markdown-it-deflist"))

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./site/assets/")
  eleventyConfig.addWatchTarget("./site/assets/**/*")

  eleventyConfig.setLibrary("md", md)

  eleventyConfig.addCollection("commits", function (collectionApi) {
    const json = JSON.parse(execSync("./scripts/commits"))

    return json.map(({ date, body, ...rest }) => {
      date = new Date(date)
      if (body) body = md.render(body)
      return { date, body, ...rest }
    })
  })

  eleventyConfig.addCollection("links", function (collectionApi) {
    const json = JSON.parse(execSync("./scripts/links"))

    return json.map(({ date, commentary, ...rest }) => {
      date = new Date(date)
      if (commentary) commentary = md.render(commentary)
      return { date, commentary, ...rest }
    })
  })

  eleventyConfig.addPairedShortcode("markdown", function (content) {
    return md.render(content)
  })

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "site",
    },
  }
}
