import { EzComponent } from "@gsilber/webez";
import html from "./cardinalGame.component.html";
import css from "./cardinalGame.component.css";
import { BoxComponent } from "../box/box.component";
import { CellComponent } from "../cell/cell.component";

/**
 * A class that represents the cardinal neighbors game variant
 * @class CardinalGameComponent
 * @extends EzComponent
 * @description A class that represents the cardinal neighbor game mode.
 * @method changeCardinalNeighbors A method that changes a clicked cell and its adjacent neighbors.
 * @param board takes in a boxComponent object to access its 2D cellArray elements.
 * @sideEffects makes a copy of a 2D cellArray and changes its surrounding neighbors
 * @returns void
 */

export class CardinalGameComponent extends EzComponent {
    constructor() {
        super(html, css);
    }
    changeCardinalNeighbors(board: BoxComponent) {
        let cardCellArray: CellComponent[][] = board.getCellArrayCopy();
        let row: number = board.getRowPos(); // get coordinates of cell clicked
        let col: number = board.getColPos();
        let rowCount: number = cardCellArray.length;
        let colCount: number = cardCellArray[0].length;
        if (row > 0) {
            // can check top if not on top most edge
            board.checkTop(row, col);
        }
        if (row < rowCount - 1) {
            // can check bottom if not on bottom most edge
            board.checkBottom(row, col);
        }
        if (col > 0) {
            // can check left if not on left most edge
            board.checkLeft(row, col);
        }
        if (col < colCount - 1) {
            // can check left if not on right most edge
            board.checkRight(row, col);
        }
        board.checkCurrentClicked(row, col); // change current cell after changing neighbors
    }
}
