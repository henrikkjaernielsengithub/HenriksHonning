import { HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Responsive billeder: <img> i output-HTML får webp + srcset i flere bredder.
  // Originalfilerne røres ikke — lightbox og og:image peger stadig på dem.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    widths: [480, 900, 1400],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "(max-width: 900px) 100vw, 680px",
      },
    },
  });

  // Læsetid i minutter ud fra ordantal (≈180 ord/min for dansk brødtekst)
  eleventyConfig.addFilter("laesetid", (content) => {
    const tekst = String(content).replace(/<[^>]*>/g, " ");
    const ord = tekst.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(ord / 180));
  });

  // Artikler ældste-først til RSS-feedet
  eleventyConfig.addCollection("artiklerSorteret", (collectionApi) => {
    return collectionApi.getFilteredByTag("artikler").sort((a, b) => a.date - b.date);
  });

  // Nyeste først til forsiden og artiklernes frem/tilbage-navigation.
  // Egen kollektion (kopieret array) — Nunjucks' `reverse`-filter muterer
  // kollektionen og må ikke bruges her.
  eleventyConfig.addCollection("artiklerNyesteFoerst", (collectionApi) => {
    return collectionApi.getFilteredByTag("artikler").sort((a, b) => b.date - a.date);
  });

  // "juli 2026" — dansk måned+år til artikel-metadata
  eleventyConfig.addFilter("maanedAar", (dato) =>
    new Intl.DateTimeFormat("da-DK", { month: "long", year: "numeric" }).format(dato)
  );

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: { name: "artiklerSorteret", limit: 0 },
    metadata: {
      language: "da",
      title: "Henriks Honning",
      subtitle: "Artikler om honningbier, natur og biodiversitet.",
      base: "https://hkjaernielsen.github.io/HenriksHonning/",
      author: { name: "Henrik Kjær Nielsen" },
    },
  });

  // assets ligger under content/ (input-mappen), så eleventy-img kan finde
  // kildefilerne bag absolutte /assets/-stier; output-URL'erne er uændrede.
  eleventyConfig.addPassthroughCopy("content/assets");

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
