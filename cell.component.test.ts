import { describe, expect, test, beforeAll } from "@jest/globals";
import { CellComponent } from "./cell.component";
import { bootstrap } from "@gsilber/webez";

describe("CellComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<CellComponent>(CellComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(CellComponent);
        });
    });
});
