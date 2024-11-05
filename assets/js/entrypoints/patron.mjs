import { Page } from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const main = () => {
  const routing = new EntryPointRouting(
    ".patron-loader",
    ".patron-page-area",
    ".patron-menu"
  );

  routing.routes([
    {
      url: "/patron",
      template: "pages/patron/index.html",
      page: new Page("Патрон"),
    },
    {
      url: "/patron/patron-once",
      template: "pages/patron/patron-once.html",
      page: new Page("Patron Once"),
    },
    {
      url: "/patron/patron-pool",
      template: "pages/patron/patron-pool.html",
      page: new Page("PatronPool"),
    },
    {
      url: "",
      template: "pages/404.html",
      page: new Page("Страница не найдена"),
      default: true,
    },
  ]);
};

export { main };