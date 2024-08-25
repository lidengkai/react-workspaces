const targetIsInRange = <T extends HTMLElement, R extends HTMLElement | Window>(
  target: T,
  root: R,
  deviation: number = 300
) => {
  const { top, bottom } = target.getBoundingClientRect();
  if (root instanceof Window) {
    return bottom > 0 - deviation && top < window.innerHeight + deviation;
  }
  const { top: rootTop, bottom: rootBottom } = root.getBoundingClientRect();
  return bottom > rootTop - deviation && top < rootBottom + deviation;
};

export default targetIsInRange;
