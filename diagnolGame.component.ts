import { EzComponent } from "@gsilber/webez";
import { BoxComponent } from "../box/box.component";
import html from "./diagnolGame.component.html";
import css from "./diagnolGame.component.css";
import { CellComponent } from "../cell/cell.component";

/**
 * A class that represents the diagnol neighbors game variant
 * @class DiagnolGameComponent
 * @extends EzComponent
 * @description A class that represents the diagnol neighbor game mode.
 * @method changeDiagnolNeighbors A method that changes a clicked cell and its diagnol neighbors.
 * @param board takes in a boxComponent object to access its 2D cellArray elements.
 * @sideEffects makes a copy of a 2D cellArray and changes its diagnol neighbors
 * @returns void
 */

export class DiagnolGameComponent extends EzComponent {
    constructor() {
        super(html, css);
    }
    changeDiagnolNeighbors(board: BoxComponent) {
        let diagnolCellArray: CellComponent[][] = board.getCellArrayCopy(); // due to diagnol complexity, checks each case manually with helper functions
        let row: number = board.getRowPos();
        let col: number = board.getColPos();
        let rowCount: number = diagnolCellArray.length;
        let colCount: number = diagnolCellArray[0].length;
        if (row > 0 && col > 0) {
            // ensures top left neighbor can be checked by excluding access to top/left most edges
            board.checkTopLeft(row, col);
        }
        if (row > 0 && col < colCount - 1) {
            // ensures top right neighbor can be checked by exluding access to top/right most edges
            board.checkTopRight(row, col);
        }
        if (row < rowCount - 1 && col > 0) {
            // ensures bottom left neighbor can be checked by excluding access to bottom/left most edges
            board.checkBottomLeft(row, col);
        }
        if (row < rowCount - 1 && col < colCount - 1) {
            board.checkBottomRight(row, col);
            // ensures bottom right neighbor can be checked by excluding access to bottom/right most edges
        }
        board.checkCurrentClicked(row, col); // check current cell after changing neighbors
    }
}
