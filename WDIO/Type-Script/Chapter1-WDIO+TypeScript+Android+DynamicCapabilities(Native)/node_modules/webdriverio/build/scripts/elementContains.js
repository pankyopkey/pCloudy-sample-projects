// src/scripts/elementContains.ts
function elementContains(scope, element) {
  function isInDocument(element2) {
    let currentElement = element2;
    while (currentElement && currentElement.parentNode) {
      if (currentElement.parentNode === scope || currentElement.parentNode.host === scope) {
        return true;
      } else if (currentElement.parentNode instanceof DocumentFragment) {
        currentElement = currentElement.parentNode.host;
      } else {
        currentElement = currentElement.parentNode;
      }
    }
    return false;
  }
  return isInDocument(element);
}
export {
  elementContains as default
};
