/**
 *
 King Factory
 */

function createNewWhiteKing(pieceId, cellID) {
    if (whiteKing === null) {
        whiteKing = new Piece(pieceId, "white", cellID);
    }
    return whiteKing;
}

function createNewBlackKing(pieceId, cellID) {
    if (blackKing === null) {
        blackKing = new Piece(pieceId, "black", cellID);
    }
    return blackKing;
}

/**
 *
 Queen Factory
 */

function createNewWhiteQueen(pieceId, cellID) {
    if (whiteQueen === null) {
        whiteQueen = new Piece(pieceId, "white", cellID);
    }
    return whiteQueen;
}

function createNewBlackQueen(pieceId, cellID) {
    if (blackQueen === null) {
        blackQueen = new Piece(pieceId, "black", cellID);
    }
    return blackQueen;
}

/**
 *
 Castle Factory
 */

function createNewWhiteCastle(pieceId, cellID) {
    for (var i = 0; i < arrMovedWhiteCastleList.length; i++) {
        var castle = arrMovedWhiteCastleList[i];

        if (castle.id === pieceId) {
            return castle;
        }
    }

    castle = new Piece(pieceId, "white", cellID);
    arrMovedWhiteCastleList.push(castle);
    return castle;
}

function createNewBlackCastle(pieceId, cellID) {
    for (var i = 0; i < arrMovedBlackCastleList.length; i++) {
        var castle = arrMovedBlackCastleList[i];

        if (castle.id === pieceId) {
            return castle;
        }
    }

    castle = new Piece(pieceId, "black", cellID);
    arrMovedBlackCastleList.push(castle);
    return castle;
}


/**
 *
 Bishop Factory
 */
function createNewBlackBishop(pieceId, cellID) {

    for (var i = 0; i < arrMovedBlackBishopList.length; i++) {
        var bishop = arrMovedBlackBishopList[i];

        if (bishop.id === pieceId) {
            return bishop;
        }
    }

    bishop = new Piece(pieceId, "black", cellID);
    arrMovedBlackBishopList.push(bishop);
    return bishop;
}

function createNewWhiteBishop(pieceId, cellID) {

    for (var i = 0; i < arrMovedWhiteBishopList.length; i++) {
        var bishop = arrMovedWhiteBishopList[i];

        if (bishop.id === pieceId) {
            return bishop;
        }
    }

    bishop = new Piece(pieceId, "white", cellID);
    arrMovedWhiteBishopList.push(bishop);
    return bishop;
}

/**
 *
 Pawn Factory
 */

function createNewBlackPawn(pieceId, cellID) {
    for (var i = 0; i < arrMovedBlackPawnList.length; i++) {
        var pawn = arrMovedBlackPawnList[i];
        if (pawn.id === pieceId) {
            return pawn;
        }
    }
    pawn = new Piece(pieceId, "black", cellID);
    arrMovedBlackPawnList.push(pawn);
    return pawn;
}

function createNewWhitePawn(pieceId, cellID) {
    for (var i = 0; i < arrMovedWhitePawnList.length; i++) {
        var pawn = arrMovedWhitePawnList[i];
        if (pawn.id === pieceId) {
            return pawn;
        }
    }
    pawn = new Piece(pieceId, "white", cellID);
    arrMovedWhitePawnList.push(pawn);
    return pawn;
}

/**
 *
 Knight Factory
 */

function createNewBlackKnight(pieceId, cellID) {
    for (var i = 0; i < arrMovedBlackKnightList.length; i++) {
        var knight = arrMovedBlackKnightList[i];

        if (knight.id === pieceId) {
            return knight;
        }
    }
    knight = new Piece(pieceId, "black", cellID);
    arrMovedBlackKnightList.push(knight);
    return knight;
}

function createNewWhiteKnight(pieceId, cellID) {
    for (var i = 0; i < arrMovedWhiteKnightList.length; i++) {
        var knight = arrMovedWhiteKnightList[i];
        if (knight.id === pieceId) {
            return knight;
        }
    }
    knight = new Piece(pieceId, "white", cellID);
    arrMovedWhiteKnightList.push(knight);
    return knight;
}