import { Page } from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const main = () => {
  const routing = new EntryPointRouting(
    ".source-loader",
    ".source-page-area",
    ".source-menu"
  );

  routing.routes([
    {
      url: "/source",
      template: "pages/source/index.html",
      page: new Page("Источник"),
    },
    {
      url: "/source/source-empty",
      template: "pages/source/source-empty.html",
      page: new Page("Source Empty"),
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
