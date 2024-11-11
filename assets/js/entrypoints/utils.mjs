import { Page } from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const main = () => {
  const routing = new EntryPointRouting(
    ".utils-loader",
    ".utils-page-area",
    ".utils-menu"
  );

  routing.routes([
    {
      url: "/utils/",
      template: "pages/utils/index.html",
      page: new Page("Elegant Objects"),
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
