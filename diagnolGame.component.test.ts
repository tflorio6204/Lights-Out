import { describe, expect, test, beforeAll } from "@jest/globals";
import { DiagnolGameComponent } from "./diagnolGame.component";
import { bootstrap } from "@gsilber/webez";

describe("DiagnolGameComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<DiagnolGameComponent>(DiagnolGameComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(DiagnolGameComponent);
        });
    });
});
