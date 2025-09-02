export const scrollWindowToSelector = (selector, offset = 0) => {
  if (!selector) {
    throw new Error(`Expected a selector but got ${selector}`)
  }

  const el = document.querySelector(selector)
  if (!el) {
    return false
  }

  const elementRectTop = el.getBoundingClientRect()?.top
  const offsetPosition = elementRectTop + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}
