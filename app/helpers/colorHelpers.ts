import { Color } from 'deck.gl'

export function valueToRgba(
  value: number,
  minValue: number,
  maxValue: number
): Color {
  // Ensure value is within the range
  value = Math.max(minValue, Math.min(maxValue, value))

  // Calculate the ratio of the value between the min and max
  const ratio = (value - minValue) / (maxValue - minValue)

  let red, green, blue
  if (ratio < 0.5) {
    // Interpolate between green (0, 255, 0) and yellow (255, 255, 0)
    const greenToYellowRatio = ratio * 2
    red = Math.round(255 * greenToYellowRatio)
    green = 255
    blue = 0
  } else {
    // Interpolate between yellow (255, 255, 0) and red (255, 0, 0)
    const yellowToRedRatio = (ratio - 0.5) * 2
    red = 255
    green = Math.round(255 * (1 - yellowToRedRatio))
    blue = 0
  }

  return [red, green, blue]
}
