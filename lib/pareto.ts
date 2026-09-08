/** Minimize cost, maximize accuracy; equal observations do not dominate each other. */
export function paretoIndices(
  points: readonly (readonly [number, number])[],
): number[] {
  return points
    .map(([accuracy, cost], index) => ({ accuracy, cost, index }))
    .filter(
      (point, _, all) =>
        !all.some(
          (other) =>
            other.cost <= point.cost &&
            other.accuracy >= point.accuracy &&
            (other.cost < point.cost || other.accuracy > point.accuracy),
        ),
    )
    .sort((a, b) => a.cost - b.cost || a.index - b.index)
    .map(({ index }) => index);
}
