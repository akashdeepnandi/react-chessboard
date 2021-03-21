import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, Chess, Square, Move } from "chess.js";
import { darkSquareStyle, lightSquareStyle } from "./App.style";
import { calcWidth, initalFen } from "./helper";
import ImgSrc from "./strategy.png";

export const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(new Chess(initalFen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [highlightedSquares, setHighLightedSquares] = useState<Square[]>([]);

  const [fen, setFen] = useState(chess.fen());
  const getSquareStyles = useMemo(() => {
    let styles: any = {};
    highlightedSquares.forEach((square) => {
      styles[square] = {
        backgroundColor: "#7a66ff",
        borderRadius: "50%",
      };
    });
    return styles;
  }, [highlightedSquares]);

  const onSquareClick = (square: Square) => {
    const possibleMoves = chess.moves({ square, verbose: true });
    let isValidMove = false;
    let squaresToHight: Square[] = [];
    if (possibleMoves.length) {
      squaresToHight = [
        ...possibleMoves.map((move) => move.to),
        square,
      ] as Square[];
    } else {
      if (!selectedSquare) return;
      // @ts-ignore
      const move: Move = {
        from: selectedSquare,
        to: square,
        promotion: "q",
      };
      if (chess.move(move)) {
        setFen(chess.fen());
        isValidMove = true;
      }
    }
    setHighLightedSquares(
      isValidMove ? [] : squaresToHight.length ? squaresToHight : [square]
    );
    setSelectedSquare(isValidMove ? null : square);
  };

  return (
    <div className="container">
      <div className="header">
        <img src={ImgSrc} alt="Chess Icon" />
        <h1>Two Player Chess Game</h1>
      </div>
      <Chessboard
        position={fen}
        {...{
          darkSquareStyle,
          lightSquareStyle,
          calcWidth,
          onSquareClick,
        }}
        // @ts-ignore
        squareStyles={getSquareStyles}
        draggable={false}
      />
      {!chess.game_over() && (
        <h2>
          {chess.turn() === "w" ? "Player 1's turn" : "Player 2's turn"}{" "}
          {chess.in_check() && ": Check"}
        </h2>
      )}
      {chess.game_over() && (
        <h1 style={{ color: "#7a66ff" }}>Game over 🥵 🎊</h1>
      )}
    </div>
  );
};
