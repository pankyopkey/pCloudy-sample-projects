// src/scripts/getHTML.ts
function getHTML(element, includeSelectorTag) {
  return element[includeSelectorTag ? "outerHTML" : "innerHTML"];
}
export {
  getHTML as default
};
