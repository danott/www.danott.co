const MarkdownIt = require("markdown-it")
const execSync = require("child_process").execSync

const md = new MarkdownIt({
  html: true,
  breaks: false,
  typographer: true,
}).use(require("markdown-it-deflist"))

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("./site/site.css")
  eleventyConfig.addWatchTarget("./site/site.css")

  eleventyConfig.setLibrary("md", md)

  eleventyConfig.addCollection("commits", function (collectionApi) {
    const json = JSON.parse(execSync("./scripts/commits"))

    return json.map(({ date, body, ...rest }) => {
      date = new Date(date)
      if (body) body = md.render(body)
      return { date, body, ...rest }
    })
  })

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "site",
    },
  }
}
