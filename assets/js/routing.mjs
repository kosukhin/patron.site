import {
  ClassToggle,
  ComputedElement,
  CurrentPage,
  Link,
  Navigation,
  PageFetchTransport,
  RouteDisplay,
  Visible,
} from "patron-components";
import {
  PrivateClass,
  GuestAware,
  GuestAwareAll,
  GuestCast,
  Patron,
  Source,
  give,
} from "patron-oop";
import { HistoryNewPage, HistoryPoppedPage } from "patron-web-api";

export class EntryPointRouting {
  constructor(loaderSelector, navigationResultSelector, menuSelector) {
    this.loaderSelector = loaderSelector;
    this.navigationResultSelector = navigationResultSelector;
    this.menuSelector = menuSelector;
  }

  routes(
    routes,
    currentPage,
    basePathSource
  ) {
    if (!currentPage) {
      currentPage = new CurrentPage();
    }
    currentPage.value(new Patron(new HistoryNewPage()));

    const [basePath] = location.href.replace(location.origin, "").split("#");
    if (!basePathSource) {
      basePathSource = new Source(
        `${basePath}#`.replace("index.html", "").replace("//", "/")
      );
    }

    const pageLoading = new Source(false);
    pageLoading.value(new Patron(new Visible(this.loaderSelector)));

    const historyPoppedPage = new HistoryPoppedPage(currentPage);
    historyPoppedPage.watchPop();

    const navigation = new Navigation(
      pageLoading,
      basePathSource,
      currentPage,
      new RouteDisplay(this.navigationResultSelector),
      new PrivateClass(PageFetchTransport)
    );
    navigation.routes(routes);

    const link = new Link(currentPage, basePathSource);
    link.watchClick(this.menuSelector);

    const urlChain = new GuestAwareAll();
    basePathSource.value(new Patron(urlChain.guestKey("basePath")));
    currentPage.value(new Patron(urlChain.guestKey("page")));
    const url = new GuestAware((guest) => {
      urlChain.value(
        new GuestCast(guest, ({ basePath, page }) => {
          give(page.replace(basePath, ""), guest);
        })
      );
    });

    const activeLink = new ComputedElement(
      [{ source: url, placeholder: "{url}" }],
      `${this.menuSelector} a[href="{url}"]`
    );
    activeLink.element(
      new Patron(new ClassToggle("active", `${this.menuSelector} a`))
    );

    pageLoading.value(new Patron((isInLoading) => {
      if (isInLoading) {
        return;
      }

      hljs.highlightAll();
      hljs.initLineNumbersOnLoad();

      const divDestination = document.querySelector(this.navigationResultSelector);
      if (divDestination) {
        // Оживляем script тэги
        divDestination
          .querySelectorAll("script")
          .forEach(x => {
            var sc = document.createElement("script");
            sc.setAttribute('type', 'module');
            sc.appendChild(document.createTextNode(x.innerText));
            divDestination.appendChild(sc)
          });
      }
    }));
  }
}
