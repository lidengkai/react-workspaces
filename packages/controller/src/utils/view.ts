export const px = (value: number) => {
  if ($APP_IS_H5) {
    return `${value / 100}rem`
  } else {
    return `${value}px`
  }
}
