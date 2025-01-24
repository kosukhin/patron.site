import { Page } from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const main = () => {
  const routing = new EntryPointRouting(
    ".guest-loader",
    ".guest-page-area",
    ".guest-menu"
  );

  routing.routes([
    {
      url: "/guest",
      template: "pages/guest/index.html",
      page: new Page("Класс Guest"),
    },
    {
      url: "/guest/guest-aware",
      template: "pages/guest/guest-aware.html",
      page: new Page("GuestAware"),
    },
    {
      url: "/guest/guest-aware-active",
      template: "pages/guest/guest-aware-active.html",
      page: new Page("GuestAwareActive"),
    },
    {
      url: "/guest/guest-aware-map",
      template: "pages/guest/guest-aware-map.html",
      page: new Page("GuestAwareMap"),
    },
    {
      url: "/guest/guest-cast",
      template: "pages/guest/guest-cast.html",
      page: new Page("GuestCast"),
    },
    {
      url: "/guest/guest-aware-all",
      template: "pages/guest/guest-aware-all.html",
      page: new Page("GuestAwareAll"),
    },
    {
      url: "/guest/guest-aware-race",
      template: "pages/guest/guest-aware-race.html",
      page: new Page("GuestAwareRace"),
    },
    {
      url: "/guest/guest-aware-sequence",
      template: "pages/guest/guest-aware-sequence.html",
      page: new Page("GuestAwareSequence"),
    },
    {
      url: "/guest/guest-object",
      template: "pages/guest/guest-object.html",
      page: new Page("GuestObject"),
    },
    {
      url: "/guest/guest-pool",
      template: "pages/guest/guest-pool.html",
      page: new Page("GuestPool"),
    },
    {
      url: "/guest/guest-sync",
      template: "pages/guest/guest-sync.html",
      page: new Page("GuestSync"),
    },
    {
      url: "/guest/guest-disposable",
      template: "pages/guest/guest-disposable.html",
      page: new Page("GuestDisposable"),
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
