export const imgerr = {
  inserted(el, options) {
    el.src = el.src || options.value
    el.onerror = () => {
      el.src = options.value
    }
  },
  componentUpdate(el, options) {
    el.src = el.src || options.value
  }
}
