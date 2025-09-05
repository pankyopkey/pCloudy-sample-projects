/**
 * Enforce entity characters for textarea content.
 * To also minifiy, pass `minify` as `true`.
 * 
 * @param {string} html The HTML string to evaluate.
 * @param {boolean} [minify] Fully minifies the content of textarea elements. 
 * Defaults to `false`. We recommend a value of `true` if you're running `entify()` 
 * as a standalone function.
 * @returns {string}
 * @example <textarea>3 > 2</textarea> => <textarea>3 &gt; 2</textarea>
 */
export const entify = (html, minify = false) => {
  /** 
   * Use entities inside textarea content.
   */
  html = html.replace(/<textarea[^>]*>((.|\n)*?)<\/textarea>/g, (match, capture) => {
    return match.replace(capture, (match) => {
      return match
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
        .replace(/\n/g, '&#10;')
        .replace(/\r/g, '&#13;')
        .replace(/\s/g, '&nbsp;')
    })
  })

  /* Typical minification, but only for textareas. */
  if (minify) {
    html = html.replace(/<textarea[^>]*>((.|\n)*?)<\/textarea>/g, (match, capture) => {
      /* Replace things inside the textarea content. */
      match = match.replace(capture, (match) => {
        return match
          .replace(/\n|\t/g, '')
          .replace(/[a-z]+="\s*"/ig, '')
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
      })

      /* Replace things in the entire element */
      match = match
        .replace(/\s+/g, ' ')
        .replace(/\s>/g, '>')
        .replace(/>\s/g, '>')
        .replace(/\s</g, '<')
        .replace(/class=["']\s/g, (match) => match.replace(/\s/g, ''))
        .replace(/(class=.*)\s(["'])/g, '$1'+'$2')
      return match
    })
  }

  return html
}
