const getScrollTarget = (target: HTMLElement) => {
  const parent = target.parentElement;
  if (!parent) {
    return window;
  }
  const style = getComputedStyle(parent);
  if (['scroll', 'auto', 'overlay'].includes(style.overflowY)) {
    return parent;
  }
  return getScrollTarget(parent);
};

export default getScrollTarget;
