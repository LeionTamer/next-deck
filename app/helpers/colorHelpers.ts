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

/**
 * Interpolates the RGBA color based on the input value.
 * @param value - The input value.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param rgbaArray - The array of RGBA values.
 * @returns The interpolated RGBA color.
 */
export function getColorFromValue(
  value: number,
  min: number,
  max: number,
  rgbaArray: [number, number, number, number?][]
): [number, number, number, number?] {
  const ratio = (value - min) / (max - min)
  const index = Math.min(
    Math.floor(ratio * (rgbaArray.length - 1)),
    rgbaArray.length - 1
  )
  return rgbaArray[index]
}

export const colorSpectral = [
  [103, 0, 31],
  [178, 24, 43],
  [214, 96, 77],
  [244, 165, 130],
  [253, 219, 199],
  [247, 247, 247],
  [209, 229, 240],
  [146, 197, 222],
  [67, 147, 195],
  [33, 102, 172],
  [5, 48, 97],
  // [50, 136, 189],
  // [153, 213, 148],
  // [230, 245, 152],
  // [213, 62, 79],
  // [254, 224, 139],
  // [252, 141, 89],
].reverse() as [number, number, number, number?][]
