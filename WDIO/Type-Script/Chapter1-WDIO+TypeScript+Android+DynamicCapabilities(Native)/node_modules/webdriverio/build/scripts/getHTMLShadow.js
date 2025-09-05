// src/scripts/getHTMLShadow.ts
function getHTMLShadow(element, includeSelectorTag, shadowElementIds = []) {
  shadowElementIds.map(([id, elem]) => {
    if (typeof elem.setAttribute !== "function") {
      return;
    }
    elem.setAttribute("data-wdio-shadow-id", id);
  });
  const shadowElementHTML = shadowElementIds.map(([id, elem, shadow]) => {
    if (!shadow) {
      const html2 = elem[includeSelectorTag ? "outerHTML" : "innerHTML"];
      return { id, html: html2 };
    }
    const styles = Array.from(shadow.adoptedStyleSheets || []).map(({ cssRules }) => Array.from(cssRules)).flat().map(({ cssText }) => cssText);
    const html = shadow.innerHTML;
    return { id, html, styles };
  });
  return {
    html: element[includeSelectorTag ? "outerHTML" : "innerHTML"],
    shadowElementHTML
  };
}
export {
  getHTMLShadow as default
};
