import emoji from "node-emoji";
import frontmatter from "front-matter";
import hljs from "highlight.js";
import { marked } from "marked";
import sanitize from "sanitize-html";

type ParsedMarkdown<Attributes = unknown> = {
  attributes: Attributes;
  html: string;
};

function emojiReplacer(match: string) {
  return emoji.emojify(match);
}

export function parseMarkdown<Attributes = unknown>(
  markdown: string
): ParsedMarkdown<Attributes> {
  let { body, attributes } = frontmatter<Attributes>(markdown);

  body = body.replace(/(:.*:)/g, emojiReplacer);

  let html = marked(body, {
    highlight: (code, language) => {
      if (language && hljs.getLanguage(language)) {
        try {
          return hljs.highlight(code, { language }).value;
        } catch (__) {}
      }
      return code;
    },
    langPrefix: "hljs language-",
    gfm: true,
    headerIds: true,
    smartLists: true,
  });
  html = sanitize(html, {
    allowedTags: [
      "address",
      "article",
      "aside",
      "footer",
      "header",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hgroup",
      "main",
      "nav",
      "section",
      "blockquote",
      "img",
      "dd",
      "div",
      "dl",
      "dt",
      "figcaption",
      "figure",
      "hr",
      "li",
      "main",
      "ol",
      "p",
      "pre",
      "ul",
      "a",
      "abbr",
      "b",
      "bdi",
      "bdo",
      "br",
      "cite",
      "code",
      "data",
      "dfn",
      "em",
      "i",
      "kbd",
      "mark",
      "q",
      "rb",
      "rp",
      "rt",
      "rtc",
      "ruby",
      "s",
      "samp",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "time",
      "u",
      "var",
      "wbr",
      "caption",
      "col",
      "colgroup",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",
    ],
    disallowedTagsMode: "discard",
    allowedAttributes: {
      "*": ["class", "id", "style"],
      a: ["href", "name", "target"],
      // We don't currently allow img itself by default, but
      // these attributes would make sense if we did.
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: [
      "img",
      "br",
      "hr",
      "area",
      "base",
      "basefont",
      "input",
      "link",
      "meta",
    ],
    // URL schemes we permit
    allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
    enforceHtmlBoundary: true,
  });

  return { attributes, html };
}
