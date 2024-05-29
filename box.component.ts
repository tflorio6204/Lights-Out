import { EzComponent, EzDialog, EventSubject } from "@gsilber/webez";
import { CellComponent } from "../cell/cell.component";
import { BindStyleToNumberAppendPx } from "@gsilber/webez";
import html from "./box.component.html";
import css from "./box.component.css";

/**
 * A class that represents the grid object
 * @class BoxComponent
 * @extends EzComponent
 * @description A class that represents the game board.
 * @method checkState A method that checks for victory if a cell is clicked. Fires a victory event which resets the game if the user plays again.
 * @method checkStart A method that verifies that the intiial state of the game MUST have one cell on
 * @method addCells A method that adds cell for game initialization and resizing. Subscribes to a clickEvent if a cell is clicked using subscribeToClick().
 * @method handleClick A method that tracks the # of clicks per cell and fires an event that changes a cell and its neighbors depending on the game mode.
 * @method subscribeToClick A method that subscribes to the click event if a cell is clicked, updating the number of clicks, and checking for victory.
 */

export class BoxComponent extends EzComponent {
    victoryEvent: EventSubject<void> = new EventSubject<void>(); // victory achieved
    diagnolEvent: EventSubject<void> = new EventSubject<void>(); // diagnol game mode
    rowColEvent: EventSubject<void> = new EventSubject<void>(); // row game mode
    cardinalEvent: EventSubject<void> = new EventSubject<void>(); // cardinal neighbors mode
    private cellArray: CellComponent[][] = [];
    private rowPos: number = 0;
    private colPos: number = 0;
    private clickCount: number;
    @BindStyleToNumberAppendPx("gameBoard", "height") // sets dimensions of board
    public height: number;
    @BindStyleToNumberAppendPx("gameBoard", "width")
    public width: number;
    constructor(height: number, width: number) {
        super(html, css);
        this.clickCount = 0; // keeps track of the # of times cells are clicked
        this.height = height * 64; // set board height to fit cell dimensions
        this.width = width * 64;
        this.addCells(height, width); // initialize board
    }

    /**
     * @method checkNeighbors A series of helper functions that check each direction of the clicked cell's neighbors.
     * @param row takes in the row coordinate of the cell clicked
     * @param col takes in the column coordinate of the cell clicked
     * @sideEffects changes the state (on/off) of a clicked cell's neighbor and the clicked cell
     * @returns void
     */

    checkCurrentClicked(row: number, col: number) {
        this.cellArray[row][col].toggle();
    }
    checkTop(row: number, col: number) {
        this.cellArray[row - 1][col].toggle();
    }
    checkBottom(row: number, col: number) {
        this.cellArray[row + 1][col].toggle();
    }
    checkRight(row: number, col: number) {
        this.cellArray[row][col + 1].toggle();
    }
    checkLeft(row: number, col: number) {
        this.cellArray[row][col - 1].toggle();
    }
    checkTopRight(row: number, col: number) {
        this.cellArray[row - 1][col + 1].toggle();
    }
    checkTopLeft(row: number, col: number) {
        this.cellArray[row - 1][col - 1].toggle();
    }
    checkBottomRight(row: number, col: number) {
        this.cellArray[row + 1][col + 1].toggle();
    }
    checkBottomLeft(row: number, col: number) {
        this.cellArray[row + 1][col - 1].toggle();
    }
    checkState() {
        let offCount: number = this.getCurrentOff();
        if (offCount === this.getCellArrayLength()) {
            // all cells are off
            EzDialog.popup(
                // victory event
                this,
                "You won in " + this.getClickCount() + " clicks!",
                "Victory!",
                ["Play Again?"],
            ).subscribe((result: string) => {
                if (result === "Play Again?") {
                    this.victoryEvent.next(); // reset the game
                }
            });
        }
    }
    checkStart() {
        if (this.getCurrentOff() === this.getCellArrayLength()) {
            this.cellArray[1][1].toggle(); // one cell must be on
        }
    }
    addCells(sliderHeight: number, sliderWidth: number) {
        for (let i = 0; i < sliderHeight; i++) {
            let row: CellComponent[] = []; // holds cells
            for (let j = 0; j < sliderWidth; j++) {
                const newCell: CellComponent = new CellComponent();
                newCell.setInitialState(); // cell initialization
                row.push(newCell); // create a row
                this.addComponent(newCell, "gameBoard");
            }
            this.cellArray.push(row); // pushes cells column by column
        }
        this.subscribeToClick(); // once the 2D array has been created, checks which coordinate has been clicked
        this.checkStart();
    }
    setRowPos(row: number) {
        this.rowPos = row; // hold height coordinate of cell clicked
    }
    setColPos(col: number) {
        this.colPos = col; // hold width coordinate of cell clicked
    }
    handleClick(row: number, col: number) {
        this.clickCount++; // how many clicks to win
        this.setRowPos(row);
        this.setColPos(col);
        this.cardinalEvent.next(); // fire the game type if the drop down has that mode subscribed (selected)
        this.diagnolEvent.next();
        this.rowColEvent.next();
    }
    subscribeToClick() {
        for (let i = 0; i < this.cellArray.length; i++) {
            for (let j = 0; j < this.cellArray[i].length; j++) {
                this.cellArray[i][j].clickEvent.subscribe(() => {
                    this.handleClick(i, j); // increments count and changes neighbors
                    this.checkState(); // checks for victory
                });
            }
        }
    }
    getCurrentOff(): number {
        // counts how many cells are currently off on the grid
        let initialOff: number = 0;
        for (let i = 0; i < this.cellArray.length; i++) {
            for (let j = 0; j < this.cellArray[i].length; j++) {
                if (this.cellArray[i][j].getState()) {
                    initialOff++;
                }
            }
        }
        return initialOff;
    }
    getCellArrayCopy() {
        return this.cellArray; // deep copy of cell array
    }
    getCellArrayLength(): number {
        let count: number = 0;
        for (let i = 0; i < this.cellArray.length; i++) {
            for (let j = 0; j < this.cellArray[i].length; j++) {
                count++;
            }
        }
        return count; // returns length of 2D array (# of cells)
    }
    getClickCount(): number {
        return this.clickCount; // returns the total number of clicks needed to obtain victory
    }
    getRowPos(): number {
        return this.rowPos; // returns row coordinate of clicked cell
    }
    getColPos(): number {
        return this.colPos; // returns col coordinate of clicked cell
    }
}
