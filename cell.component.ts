import { EzComponent, Click, BindCSSClass, EventSubject } from "@gsilber/webez";
import html from "./cell.component.html";
import css from "./cell.component.css";

/**
 * A class that represents a cell object
 * @class CellComponent
 * @extends EzComponent
 * @description A class that represents a cell on the game board.
 * @method SwitchState A method fires a clickEvent if a cell is clicked on the game board.
 * @method toggle A method that switches the state of an existing cell. @sideEffects updates the boolean isOff representing if a cell is off.
 * @method setInitialState A method that uses a random number generator to randomly initialize the initial state of a cell object (on/off).
 */

export class CellComponent extends EzComponent {
    clickEvent: EventSubject<void> = new EventSubject<void>();
    private light: number; // determines if a cell is on or off based on a random number
    private isOff: boolean;
    constructor() {
        super(html, css);
        this.light = 0;
        this.isOff = false; // keeps track of the whether a cell is on or off
    }
    @BindCSSClass("cellState")
    public cssClass: string = "cellOff";
    @Click("cellState")
    SwitchState() {
        this.clickEvent.next();
    }
    toggle() {
        if (this.cssClass === "cellOn") {
            // changes the state of a cell
            this.cssClass = "cellOff";
            this.isOff = true;
        } else {
            this.cssClass = "cellOn";
            this.isOff = false;
        }
    }
    setInitialState() {
        this.light = Math.floor(Math.random() * 2); // randomly sets cells
        if (this.light === 0) {
            this.cssClass = "cellOn";
            this.isOff = false;
        } else {
            this.cssClass = "cellOff";
            this.isOff = true;
        }
    }
    getState() {
        return this.isOff; // if a cell is off returns true
    }
}
