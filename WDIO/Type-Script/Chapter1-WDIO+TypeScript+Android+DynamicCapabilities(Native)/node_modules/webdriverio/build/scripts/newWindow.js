// src/scripts/newWindow.ts
function newWindow(url, windowName, windowFeatures) {
  window.open(url, windowName || "", windowFeatures || "");
}
export {
  newWindow as default
};
