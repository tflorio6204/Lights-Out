import { describe, expect, test, beforeAll } from "@jest/globals";
import { CardinalGameComponent } from "./cardinalGame.component";
import { bootstrap } from "@gsilber/webez";

describe("CardinalGameComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<CardinalGameComponent>(CardinalGameComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(CardinalGameComponent);
        });
    });
});
