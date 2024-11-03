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
    give
} from 'patron-oop';
import {
    HistoryNewPage,
    HistoryPoppedPage
} from 'patron-web-api';

const pageLoading = new Source(false);
pageLoading.value(new Patron(new Visible('.loader')));

const currentPage = new CurrentPage();
currentPage.value(new Patron(new HistoryNewPage()));

const historyPoppedPage = new HistoryPoppedPage(currentPage);
historyPoppedPage.watchPop();

const [basePath] = location.href.replace(location.origin, "").split('#');
const basePathSource = new Source(`${basePath}#`.replace('index.html', '').replace('//', '/'));

const navigation = new Navigation(
    pageLoading,
    basePathSource,
    currentPage,
    new RouteDisplay('.page-area'),
    new Factory(PageFetchTransport)
);
navigation.routes(
    [
        {
            url: '/',
            template: 'pages/index.html',
            aliases: [basePath, `${basePath}index.html`, ''],
            page: new Page('Patron OOP'),
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
        {
            url: '/factory',
            template: 'pages/factory.html',
            page: new Page('Фабрика'),
        },
        {
            url: '/philosofy',
            template: 'pages/philosofy.html',
            page: new Page('Философия'),
        },
        {
            url: '',
            template: 'pages/404.html',
            page: new Page('Страница не найдена'),
            default: true,
        },
    ],
);

const link = new Link(currentPage, basePathSource);
link.watchClick('.menu');

const url = new GuestAware((guest) => {
    basePathSource.value(new GuestMiddle(guest, (basePath) => {
        currentPage.value(new GuestMiddle(guest, (page) => {
            give(page.replace(basePath, ''), guest);
        }));
    }));
});

const activeLink = new ComputedElement(
    [{ source: url, placeholder: '{url}' }],
    '.menu a[href="{url}"]'
);
activeLink.element(new Patron(new ClassToggle('active', '.menu a')));
