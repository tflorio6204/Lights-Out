import { describe, expect, test, beforeAll } from "@jest/globals";
import { RowColsGameComponent } from "./rowColsGame.component";
import { bootstrap } from "@gsilber/webez";

describe("RowColsGameComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<RowColsGameComponent>(RowColsGameComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(RowColsGameComponent);
        });
    });
});
