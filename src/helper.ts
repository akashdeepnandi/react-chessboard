type func =
  | ((obj: { screenWidth: number; screenHeight: number }) => number)
  | undefined;

export const initalFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const calcWidth: func = ({ screenWidth, screenHeight }) => {
  return Number((screenWidth * 0.8).toFixed(0));
};
