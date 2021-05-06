export const imgerr = {
  inserted(el, options) {
    el.onerror = () => {
      el.src = options.value
    }
  }
}
