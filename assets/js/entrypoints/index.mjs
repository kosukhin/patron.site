import {
    EntryPointPage,
    Page
} from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const routing = new EntryPointRouting(
    ".loader",
    ".page-area",
    ".menu"
);

const [basePath] = location.href.replace(location.origin, "").split("#");
const [fullPath] = location.href.split("#");
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
      "Гость",
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
    url: "/factory",
    template: "pages/factory.html",
    page: new Page("Фабрика"),
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
]);
