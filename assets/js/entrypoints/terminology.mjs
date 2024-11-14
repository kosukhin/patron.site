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
      url: "/terminology",
      template: "pages/terminology/index.html",
      page: new Page("Терминология"),
    },
    {
      url: "/terminology/guest",
      template: "pages/terminology/guest.html",
      page: new Page("Гость"),
    },
    {
      url: "/terminology/patron",
      template: "pages/terminology/patron.html",
      page: new Page("Патрон"),
    },
    {
      url: "/terminology/introduction",
      template: "pages/terminology/introduction.html",
      page: new Page("Представление"),
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