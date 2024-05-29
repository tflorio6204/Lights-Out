import { describe, expect, test, beforeAll } from "@jest/globals";
import { BoxComponent } from "./box.component";
import { bootstrap } from "@gsilber/webez";

describe("BoxComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<BoxComponent>(BoxComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(BoxComponent);
        });
    });
});
