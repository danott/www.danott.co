const ORDER = [
  "H",
  "I",
  "J",
  "K",
  "L",
  "DISRUPT",
  "M",
  "N",
  "SUSTAIN",
  "O",
  "P",
  "MOLE",
  "Q",
  "R",
  "VICE",
  "S",
  "S~",
  "T~",
  "EXPLAIN",
  "T",
  "TOLD",
  "U",
  "U~",
  "WORLDSERIES",
  "V",
  "W",
  "X",
  "NOPE",
  "Y",
  "PROS",
]

function permalink(slug) {
  if (slug.length === 0) return "/poetry/five-myths/"
  return `/poetry/five-myths/${slug}`
}

function nextLink(slug) {
  if (slug === "five-myths") return { permalink: permalink("H"), text: "Begin" }
  if (slug === "PROS") return { permalink: permalink("ABOUT"), text: "The End" }

  const nextIndex = ORDER.indexOf(slug) + 1
  const item = nextIndex > 0 && ORDER[nextIndex]

  if (item) {
    return { permalink: permalink(item), text: "Next" }
  } else {
    return null
  }
}

function prevLink(slug) {
  if (slug === "five-myths") return null
  if (slug === "ABOUT") return null

  const prevIndex = ORDER.indexOf(slug) - 1
  const item = ORDER[prevIndex]

  if (item) {
    return { permalink: permalink(item), text: "Previous" }
  } else {
    return null
  }
}

module.exports = {
  layout: "five-myths.njk",
  eleventyComputed: {
    links: (data) => {
      const slug = data.page.fileSlug

      return {
        next: nextLink(slug),
        prev: prevLink(slug),
      }
    },
  },
}
