// src/scripts/resq.ts
var waitToLoadReact = function waitToLoadReact2() {
  window.resq.waitToLoadReact();
};
var react$ = function react$2(selector, props, state, reactElement) {
  props = props || {};
  state = state || {};
  let element = window.resq.resq$(selector, reactElement);
  if (Object.keys(props).length) {
    element = element.byProps(props);
  }
  if (Object.keys(state).length) {
    element = element.byState(state);
  }
  if (!element.name) {
    return { message: `React element with selector "${selector}" wasn't found` };
  }
  return element.isFragment && element.node ? element.node[0] : element.node;
};
var react$$ = function react$$2(selector, props, state, reactElement) {
  let elements = window.resq.resq$$(selector, reactElement);
  if (Object.keys(props).length) {
    elements = elements.byProps(props);
  }
  if (Object.keys(state).length) {
    elements = elements.byState(state);
  }
  if (!elements.length) {
    return [];
  }
  let nodes = [];
  elements.forEach(function(element) {
    if (element.isFragment) {
      nodes = nodes.concat(element.node || []);
    } else if (element.node) {
      nodes.push(element.node);
    }
  });
  return [...nodes];
};
export {
  react$,
  react$$,
  waitToLoadReact
};
