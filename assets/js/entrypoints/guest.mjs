import {
    ClassToggle,
    ComputedElement,
    CurrentPage,
    Link,
    Navigation,
    Page,
    PageFetchTransport,
    RouteDisplay,
    Visible
} from "patron-components";
import {
    Factory,
    GuestAware,
    GuestMiddle,
    Patron,
    Source,
    give,
} from "patron-oop";
import { HistoryNewPage, HistoryPoppedPage } from "patron-web-api";

const main = () => {
  console.log("guest");

  const pageLoading = new Source(false);
  pageLoading.value(new Patron(new Visible(".guest-loader")));

  const currentPage = new CurrentPage();
  currentPage.value(new Patron(new HistoryNewPage()));

  const historyPoppedPage = new HistoryPoppedPage(currentPage);
  historyPoppedPage.watchPop();

  const [basePath] = location.href.replace(location.origin, "").split("#");
  const basePathSource = new Source(
    `${basePath}#`.replace("index.html", "").replace("//", "/")
  );

  const navigation = new Navigation(
    pageLoading,
    basePathSource,
    currentPage,
    new RouteDisplay(".guest-page-area"),
    new Factory(PageFetchTransport)
  );
  navigation.routes([
    {
      url: "/",
      template: "pages/guest/index.html",
      page: new Page("Гость"),
      default: true,
    },
    {
      url: "/guest/guest-aware",
      template: "pages/guest/guest-aware.html",
      page: new Page("GuestAware"),
    },
    {
      url: "/guest/guest-cast",
      template: "pages/guest/guest-cast.html",
      page: new Page("GuestCast"),
    },
    {
      url: "/guest/guest-chain",
      template: "pages/guest/guest-chain.html",
      page: new Page("GuestChain"),
    },
    {
      url: "/guest/guest-middle",
      template: "pages/guest/guest-middle.html",
      page: new Page("GuestMiddle"),
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
  ]);

  const link = new Link(currentPage, basePathSource);
  link.watchClick(".guest-menu");

  const url = new GuestAware((guest) => {
    basePathSource.value(
      new GuestMiddle(guest, (basePath) => {
        currentPage.value(
          new GuestMiddle(guest, (page) => {
            give(page.replace(basePath, ""), guest);
          })
        );
      })
    );
  });

  const activeLink = new ComputedElement(
    [{ source: url, placeholder: "{url}" }],
    '.guest-menu a[href="{url}"]'
  );
  activeLink.element(new Patron(new ClassToggle("active", ".guest-menu a")));
};

export { main };
