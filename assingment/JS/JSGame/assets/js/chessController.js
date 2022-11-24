/**
 * Created by suuti on 9/4/17.
 */


var arrMovedWhitePawnList = [];
var arrMovedBlackPawnList = [];

var arrMovedWhiteBishopList = [];
var arrMovedBlackBishopList = [];

var arrMovedWhiteKnightList = [];
var arrMovedBlackKnightList = [];

var arrMovedBlackCastleList = [];
var arrMovedWhiteCastleList = [];

var blackQueen = null;
var whiteQueen = null;

var blackKing = null;
var whiteKing = null;

var selectedPiece = null;
var previousMovedPiece = null;


$(document).on("click", function (event) {
    var x = event.pageX;
    var y = event.pageY;

    var clickedElement = document.elementFromPoint(x, y);
    var id = $(clickedElement).attr('id');

    if (id !== undefined && id.includes("cell")) {
        if (selectedPiece !== null && selectedPiece.id !== id) {
            refreshCells(selectedPiece);
        }
        move(selectedPiece, clickedElement);

    } else if (id !== undefined && id.includes("p")) {
        if (selectedPiece !== null && selectedPiece.id !== id) {
            refreshCells(selectedPiece);
        }
        calculatePos(id);
        killOppositePiece(selectedPiece, clickedElement);

    }
    console.log(clickedElement);
    console.log(id);
});

function calculatePos(pieceId) {
    var cellID = $("#" + pieceId).parent('div').attr('id');

    if (previousMovedPiece !== null && pieceId.includes(previousMovedPiece.type)) {
        return;
    }

    if (pieceId.includes("pawn")) {
        if (pieceId.includes("black")) {
            var pawn = createNewBlackPawn(pieceId, cellID);
            calculatePathAhead(pawn);

        } else if (pieceId.includes("white")) {
            var pawn = createNewWhitePawn(pieceId, cellID);
            calculatePathAhead(pawn);
        }

    } else if (pieceId.includes("castle")) {
        if (pieceId.includes("black")) {
            var castle = createNewBlackCastle(pieceId, cellID);
            calculatePathTop(castle);

        } else if (pieceId.includes("white")) {
            var castle = createNewWhiteCastle(pieceId, cellID);
            calculatePathTop(castle);
        }

    } else if (pieceId.includes("knight")) {
        if (pieceId.includes("black")) {
            var knight = createNewBlackKnight(pieceId, cellID);
            calculatePathTopLeft(knight);

        } else if (pieceId.includes("white")) {
            var knight = createNewWhiteKnight(pieceId, cellID);
            calculatePathTopLeft(knight);
        }

    } else if (pieceId.includes("bishop")) {
        if (pieceId.includes("black")) {
            var bishop = createNewBlackBishop(pieceId, cellID);//Factory Methods
            calculatePathTopLeft(bishop);

        } else if (pieceId.includes("white")) {
            var bishop = createNewWhiteBishop(pieceId, cellID);//Factory Methods
            calculatePathTopLeft(bishop);
        }

    } else if (pieceId.includes("queen")) {
        if (pieceId.includes("black")) {
            var queen = createNewBlackQueen(pieceId, cellID);
            calculatePathTop(queen);
            calculatePathTopLeft(queen);

        } else if (pieceId.includes("white")) {
            var queen = createNewWhiteQueen(pieceId, cellID);
            calculatePathTop(queen);
            calculatePathTopLeft(queen);
        }

    } else if (pieceId.includes("king")) {
        if (pieceId.includes("black")) {
            var king = createNewBlackKing(pieceId, cellID);
            calculatePathTop(king);
            calculatePathTopLeft(king);

        } else if (pieceId.includes("white")) {
            var king = createNewWhiteKing(pieceId, cellID);
            calculatePathTop(king);
            calculatePathTopLeft(king);
        }
    }
}


/**-----------------------Piece Object-----------------------**/
function Piece(id, type, currentPosition) {
    this.id = id;
    this.type = type;
    this.currentPosition = currentPosition;

    this.isFirstMove = true;
    this.positionsToBeMoved = [];
    this.obstaclesCanBeKilled = [];
}

//Pawn
function calculatePathAhead(obj) {
    selectedPiece = obj;
    colorPawnKillCell(obj);
    if (obj.type === "white") {
        var offset = $("#" + obj.currentPosition).offset();
        var x = offset.left;
        var y = offset.top - 65;

        var nextCell = document.elementFromPoint(x, y);
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            if (obj.isFirstMove) {
                y -= 65;
                nextCell = document.elementFromPoint(x, y);
                if (!isObstaclesFound(obj, nextCell)) {
                    colorCells(obj, nextCell);
                }
            }
        }

    } else if (obj.type === "black") {
        var offset = $("#" + obj.currentPosition).offset();
        var x = offset.left;
        var y = offset.top + 65;

        var nextCell = document.elementFromPoint(x, y);


        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            if (obj.isFirstMove) {
                y += 65;
                nextCell = document.elementFromPoint(x, y);
                if (!isObstaclesFound(obj, nextCell)) {
                    colorCells(obj, nextCell);
                }
            }
        }
    }
}

//bishop, queen, king and Knight
function calculatePathTopLeft(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left - 65;
    var y = offset.top - 65;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left - 65;
            y = offset.top - 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        var nextCell1 = document.elementFromPoint(x - 65, y);
        var nextCell2 = document.elementFromPoint(x, y - 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }
    calculatePathTopRight(obj);

}

function calculatePathTopRight(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left + 65;
    var y = offset.top - 65;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left + 65;
            y = offset.top - 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        var nextCell1 = document.elementFromPoint(x + 65, y);
        var nextCell2 = document.elementFromPoint(x, y - 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }
    calculatePathBottomLeft(obj);

}

function calculatePathBottomLeft(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left - 65;
    var y = offset.top + 65;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left - 65;
            y = offset.top + 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        var nextCell1 = document.elementFromPoint(x - 65, y);
        var nextCell2 = document.elementFromPoint(x, y + 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }

    calculatePathBottomRight(obj);
}

function calculatePathBottomRight(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left + 65;
    var y = offset.top + 65;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left + 65;
            y = offset.top + 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        var nextCell1 = document.elementFromPoint(x + 65, y);
        var nextCell2 = document.elementFromPoint(x, y + 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }

}

//for castle queen and king
function calculatePathTop(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left;
    var y = offset.top - 65;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left;
            y = offset.top - 65;
            nextCell = document.elementFromPoint(x, y);
        }
    }
    calculatePathRight(obj);
}

function calculatePathRight(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left + 65;
    var y = offset.top;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left + 65;
            y = offset.top;
            nextCell = document.elementFromPoint(x, y);
        }
    }
    calculatePathLeft(obj);

}

function calculatePathLeft(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left - 65;
    var y = offset.top;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left - 65;
            y = offset.top;
            nextCell = document.elementFromPoint(x, y);
        }
    }
    calculatePathBottom(obj);
}

function calculatePathBottom(obj) {
    selectedPiece = obj;
    var offset = $("#" + obj.currentPosition).offset();
    var x = offset.left;
    var y = offset.top + 65;

    var nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left;
            y = offset.top + 65;
            nextCell = document.elementFromPoint(x, y);
        }
    }
}

/**All pieces**/
function move(obj, cell) {

    for (var i = 0; i < obj.positionsToBeMoved.length; i++) {
        if (obj.positionsToBeMoved[i] === cell) {
            $("#" + obj.id).appendTo(cell);
            refreshCells(obj);
            obj.currentPosition = $(cell).attr('id');
            previousMovedPiece = obj;
            obj.isFirstMove = false;
        }
    }
    obj.positionsToBeMoved = [];
}

function killOppositePiece(obj, clickedPiece) {
    //clickedPiece is opposite side piece can be killed
    //obstaclesCanBeKilled has pieces of opposite side that can be killed by bishop
    var cell = $(clickedPiece).parent('div');
    for (var i = 0; i < obj.obstaclesCanBeKilled.length; i++) {
        if ($(clickedPiece).attr('id') === obj.obstaclesCanBeKilled[i].attr('id')) {
            $(clickedPiece).remove();
            $("#" + obj.id).appendTo(cell);
            refreshCells(obj);
            obj.currentPosition = $(cell).attr('id');
            previousMovedPiece = obj;
        }
    }
}

function colorCells(obj, elem) {
    obj.positionsToBeMoved.push(elem);
    $(elem).addClass("color-path");
    $("html").removeClass("color-path");
}

function colorKillCell(cell) {
    $(cell).addClass("color-path");
}

function colorPawnKillCell(obj) {
    var cell1;
    var cell2;
    var offset = $("#" + obj.currentPosition).offset();

    if (obj.type === "white") {
        cell1 = document.elementFromPoint(offset.left - 65, offset.top - 65);
        cell2 = document.elementFromPoint(offset.left + 65, offset.top - 65);
    } else if (obj.type === "black") {
        cell1 = document.elementFromPoint(offset.left - 65, offset.top + 65);
        cell2 = document.elementFromPoint(offset.left + 65, offset.top + 65);
    }

    var kill1 = $(cell1).children('span').attr('id');
    var kill2 = $(cell2).children('span').attr('id');

    if (kill1 !== undefined && !kill1.includes(obj.type)) {
        obj.obstaclesCanBeKilled.push($(cell1).children('span'));
        colorKillCell(cell1);
    }
    if (kill2 !== undefined && !kill2.includes(obj.type)) {
        obj.obstaclesCanBeKilled.push($(cell2).children('span'));
        colorKillCell(cell2);
    }
}

function refreshCells(obj) {
    for (var i = 0; i < obj.positionsToBeMoved.length; i++) {
        $(obj.positionsToBeMoved[i]).removeClass("color-path");
    }

    for (var i = 0; i < obj.obstaclesCanBeKilled.length; i++) {
        $(obj.obstaclesCanBeKilled[i]).parents('div').removeClass("color-path");
    }
}

function isObstaclesFound(obj, nextCell) {
    var child = $(nextCell).children('span');
    if (obj.id.includes("pawn")) { //if the object is a pawn
        if (child.attr('id') === undefined) {
            return false;
        }
        return true;
    }
    //rest of other objects
    if (child.attr('id') === undefined) {
        var id = $(nextCell).attr('id');
        if (id !== undefined && id.includes("cell")) {
            return false;
        }
    } else {
        if (!child.attr('id').includes(obj.type)) {
            obj.obstaclesCanBeKilled.push(child);
            colorKillCell(nextCell);
        }
    }
    return true;
}
