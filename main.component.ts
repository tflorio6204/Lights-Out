import html from "./main.component.html";
import css from "./main.component.css";
import { BoxComponent } from "./box/box.component";
import {
    EzComponent,
    ValueEvent,
    BindValue,
    Change,
    Click,
} from "@gsilber/webez";
import { DiagnolGameComponent } from "./diagnolGame/diagnolGame.component";
import { RowColsGameComponent } from "./rowColsGame/rowColsGame.component";
import { CardinalGameComponent } from "./cardinalGame/cardinalGame.component";

/**
 * @class MainComponent
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 * @method selectMode A method that sets the game variant the user wishes to play.
 * @param event A value event that corresponds to the game mode.
 * @method resetBoard A method that resets the board when a user clicks "New Game" and for resizing.
 * @sideEffects Removes the board and readds its cells according to the new size.
 * @sideEffects Subscribes and fires a game variant only if "selectMode" is equal to the variant value.
 * @sideEffects Resets the board after a victory event if the user selects "Play Again".
 *
 */

export class MainComponent extends EzComponent {
    private diagnolPattern: DiagnolGameComponent = new DiagnolGameComponent();
    private rowColPattern: RowColsGameComponent = new RowColsGameComponent();
    private cardinalPattern: CardinalGameComponent =
        new CardinalGameComponent();
    private myBox: BoxComponent = new BoxComponent(7, 7); // initial 7 x 7 board
    @BindValue("value")
    private value: string = "7";
    @BindValue("wvalue")
    private wvalue: string = "7";
    @BindValue("gameSelect")
    private gameSelect = "Cardinal Neighbors"; // intiial game mode
    constructor() {
        super(html, css);
        this.addComponent(this.myBox, "box");
        this.myBox.victoryEvent.subscribe(() => {
            // resets for initial 7 x 7 if user plays again
            this.resetBoard();
        });
        this.myBox.cardinalEvent.subscribe(() => {
            this.cardinalPattern.changeCardinalNeighbors(this.myBox); // initial game if user does not select
        });
    }
    @Change("slider-h")
    incrementHValue(evt: ValueEvent) {
        this.value = evt.value; // set slider height to value (string)
    }
    @Change("slider-w")
    incrementWValue(evt: ValueEvent) {
        this.wvalue = evt.value; // set slider width to value (string)
    }
    @Change("gameSelect")
    selectMode(event: ValueEvent) {
        this.gameSelect = event.value; // set game mode
        if (this.gameSelect === "Cardinal Neighbors") {
            this.gameSelect = "Cardinal Neighbors";
        } else if (this.gameSelect === "Rows and Columns") {
            this.gameSelect = "Rows and Columns";
        } else {
            this.gameSelect = "Diagnols";
        }
    }
    getHeight(): number {
        return parseInt(this.value); // return board height
    }
    getWidth(): number {
        return parseInt(this.wvalue); // return board width
    }
    @Click("restart")
    resetBoard() {
        this.removeComponent(this.myBox); // remove board and resize
        this.myBox = new BoxComponent(this.getHeight(), this.getWidth());
        this.addComponent(this.myBox, "box");
        if (this.gameSelect === "Cardinal Neighbors") {
            this.myBox.cardinalEvent.subscribe(() => {
                this.cardinalPattern.changeCardinalNeighbors(this.myBox); // subscribes and fires next ONLY if corresponded to game mode
            });
        } else if (this.gameSelect === "Rows and Columns") {
            this.myBox.rowColEvent.subscribe(() => {
                this.rowColPattern.changeRowColNeighbors(this.myBox);
            });
        } else {
            this.myBox.diagnolEvent.subscribe(() => {
                this.diagnolPattern.changeDiagnolNeighbors(this.myBox);
            });
        }
        this.myBox.victoryEvent.subscribe(() => {
            this.resetBoard(); // play again
        });
    }
}
