import { EzComponent } from "@gsilber/webez";
import { BoxComponent } from "../box/box.component";
import html from "./rowColsGame.component.html";
import css from "./rowColsGame.component.css";
import { CellComponent } from "../cell/cell.component";

/**
 * A class that represents the row column neighbors game variant
 * @class RowColsGameComponent
 * @extends EzComponent
 * @description A class that represents the row column neighbor game mode.
 * @method changeRowColNeighbors A method that changes a clicked cell and its corresponding row and column neighbors.
 * @param board takes in a boxComponent object to access its 2D cellArray elements.
 * @sideEffects makes a copy of a 2D cellArray and changes its surrounding neighbors
 * @returns void
 */

export class RowColsGameComponent extends EzComponent {
    constructor() {
        super(html, css);
    }
    changeRowColNeighbors(board: BoxComponent) {
        let rowColCellArray: CellComponent[][] = board.getCellArrayCopy();
        let row: number = board.getRowPos();
        let col: number = board.getColPos();
        for (
            // changes cells along a row of cell clicked
            let i = 0;
            i < rowColCellArray[row].length;
            i++ // rows
        ) {
            rowColCellArray[row][i].toggle();
        }
        for (
            // changes cells along a column of cell clicked
            let i = 0;
            i < rowColCellArray.length;
            i++ // columns
        ) {
            rowColCellArray[i][col].toggle();
        }
        rowColCellArray[row][col].toggle(); // going each direction will pass twice over cell clicked, must set again
    }
}
