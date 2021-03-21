type func =
  | ((obj: { screenWidth: number; screenHeight: number }) => number)
  | undefined;

export const initalFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const calcWidth: func = ({ screenWidth, screenHeight }) => {
  const w = Number((screenWidth * 0.8).toFixed(0));
  const h = Number((screenHeight * 0.6).toFixed(0));
  const size = h > w ? w : h;
  return size;
};
