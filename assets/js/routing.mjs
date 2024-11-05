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
  Factory,
  GuestAware,
  GuestChain,
  GuestMiddle,
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

  routes(routes) {
    const pageLoading = new Source(false);
    pageLoading.value(new Patron(new Visible(this.loaderSelector)));

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
      new RouteDisplay(this.navigationResultSelector),
      new Factory(PageFetchTransport)
    );
    navigation.routes(routes);

    const link = new Link(currentPage, basePathSource);
    link.watchClick(this.menuSelector);

    const urlChain = new GuestChain();
    basePathSource.value(new Patron(urlChain.receiveKey("basePath")));
    currentPage.value(new Patron(urlChain.receiveKey("page")));
    const url = new GuestAware((guest) => {
      urlChain.result(
        new GuestMiddle(guest, ({ basePath, page }) => {
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

    url.value(new Patron(() => {
      setTimeout(() => {
        hljs.highlightAll();
        hljs.initLineNumbersOnLoad();

        const divDestination = document.querySelector(this.navigationResultSelector);
        // Оживляем script тэги
        divDestination
          .querySelectorAll("script")
          .forEach(x => {
            console.log('script', x);

            var sc = document.createElement("script");
            sc.setAttribute('type', 'module');
            sc.appendChild(document.createTextNode(x.innerText));
            divDestination.appendChild(sc)
          })
      }, 100);
    }));
  }
}