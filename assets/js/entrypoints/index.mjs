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
} from 'patron-components';
import {
    Factory,
    GuestAware,
    GuestMiddle,
    Patron,
    Source,
    SourceEmpty,
    give
} from 'patron-oop';
import {
    HistoryNewPage,
    HistoryPoppedPage
} from 'patron-web-api';

const pageLoading = new Source(false);
pageLoading.value(new Patron(new Visible('.loader')));

const pageSource = new SourceEmpty();
const currentPage = new CurrentPage();
currentPage.value(new Patron(pageSource));
pageSource.value(new Patron(new HistoryNewPage()));

const historyPoppedPage = new HistoryPoppedPage(pageSource);
historyPoppedPage.watchPop();


const [basePath] = location.href.replace(location.origin, "").split('#');
const basePathSource = new Source(`${basePath}#`);

const navigation = new Navigation(
    pageLoading,
    basePathSource,
    pageSource,
    new RouteDisplay('.page-area'),
    new Factory(PageFetchTransport)
);
navigation.routes(
    [
        {
            url: '/',
            template: 'pages/index.html',
            page: new Page('Главная страница'),
            default: true,
        },
        {
            url: '/guest',
            template: 'pages/guest.html',
            page: new Page('Гость'),
        },
        {
            url: '/patron',
            template: 'pages/patron.html',
            page: new Page('Патрон'),
        },
        {
            url: '/source',
            template: 'pages/source.html',
            page: new Page('Источник'),
        },
    ],
);

const link = new Link(currentPage, basePathSource);
link.watchClick('.menu');

const url = new GuestAware((guest) => {
    basePathSource.value(new GuestMiddle(guest, (basePath) => {
        pageSource.value(new GuestMiddle(guest, (page) => {
            const url = page.url ?? ''
            give(url.replace(basePath, ''), guest);
        }));
    }));
});

const activeLink = new ComputedElement(
    [{ source: url, placeholder: '{url}' }],
    '.menu a[href="{url}"]'
);
activeLink.element(new Patron(new ClassToggle('active', '.menu a')));
