import { Page } from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const main = () => {
  const routing = new EntryPointRouting(
    ".terminology-loader",
    ".terminology-page-area",
    ".terminology-menu"
  );

  routing.routes([
    {
      url: "/terminology/",
      template: "pages/terminology/index.html",
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
