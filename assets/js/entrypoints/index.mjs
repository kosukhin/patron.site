import {
  EntryPointPage,
  CurrentPage,
  Page,
  Link
} from "patron-components";
import { EntryPointRouting } from "../routing.mjs";
import {
  Source,
} from "patron-oop";

const routing = new EntryPointRouting(
  ".loader",
  ".page-area",
  ".menu"
);

const [basePath] = location.href.replace(location.origin, "").split("#");
const [fullPath] = location.href.split("#");
const currentPage = new CurrentPage();
const basePathSource = new Source(
  `${basePath}#`.replace("index.html", "").replace("//", "/")
);

const link = new Link(currentPage, basePathSource);
link.watchClick('.global-body', '.dynamic-navigation > a');

routing.routes([
  {
    url: "/",
    template: "pages/index.html",
    aliases: [basePath, `${basePath}index.html`, ""],
    page: new Page("Patron OOP"),
  },
  {
    url: "/guest*",
    template: "pages/guest.html",
    page: new EntryPointPage(
      "Класс Guest",
      `${fullPath}assets/js/entrypoints/guest.mjs`
    ),
  },
  {
    url: "/patron*",
    template: "pages/patron.html",
    page: new EntryPointPage(
      "Патрон",
      `${fullPath}assets/js/entrypoints/patron.mjs`
    ),
  },
  {
    url: "/source*",
    template: "pages/source.html",
    page: new EntryPointPage(
      "Источник",
      `${fullPath}assets/js/entrypoints/source.mjs`
    ),
  },
  {
    url: "/compatibility*",
    template: "pages/compatibility/layout.html",
    page: new EntryPointPage(
      "",
      `${fullPath}assets/js/entrypoints/compatibility.mjs`
    ),
  },
  {
    url: "/integrations*",
    template: "pages/integrations/layout.html",
    page: new EntryPointPage(
      "",
      `${fullPath}assets/js/entrypoints/integrations.mjs`
    ),
  },
  {
    url: "/utils*",
    template: "pages/utils.html",
    page: new EntryPointPage(
      "",
      `${fullPath}assets/js/entrypoints/utils.mjs`
    ),
  },
  {
    url: "/terminology*",
    template: "pages/terminology.html",
    page: new EntryPointPage(
      "",
      `${fullPath}assets/js/entrypoints/terminology.mjs`
    ),
  },
  {
    url: "/philosofy",
    template: "pages/philosofy.html",
    page: new Page("Философия"),
  },
  {
    url: "",
    template: "pages/404.html",
    page: new Page("Страница не найдена"),
    default: true,
  },
], currentPage, basePathSource);
