import { Page } from "patron-components";
import { EntryPointRouting } from "../routing.mjs";

const main = () => {
    const routing = new EntryPointRouting(
        ".examples-loader",
        ".examples-page-area",
        ".examples-menu"
    );

    routing.routes([
        {
            url: "/examples",
            template: "pages/examples/index.html",
            page: new Page("Примеры"),
        },
    ]);
};

export { main };