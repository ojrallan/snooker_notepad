export const initialBalls = Array.from(
  { length: 15 },
  (_, index) => ({
    ballValue: index + 1,
    disabled: false,
  }),
);