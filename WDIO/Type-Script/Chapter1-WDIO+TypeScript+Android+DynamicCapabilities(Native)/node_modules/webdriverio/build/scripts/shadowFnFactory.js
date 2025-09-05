// src/scripts/shadowFnFactory.ts
var shadowFnFactory = function(elementSelector, qsAll = false) {
  const strFn = (
    /*js*/
    `
    (function() {
      // element has a shadowRoot property
      if (this.shadowRoot) {
        return this.shadowRoot.querySelector${qsAll ? "All" : ""}('${elementSelector}')
      }
      // fall back to querying the element directly if not
      return this.querySelector${qsAll ? "All" : ""}('${elementSelector}')
    })`
  );
  return (0, eval)(strFn);
};
export {
  shadowFnFactory
};
