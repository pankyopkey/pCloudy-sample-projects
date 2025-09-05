// src/scripts/customElement.ts
function customElementWrapper() {
  const origFn = customElements.define.bind(customElements);
  customElements.define = function(name, Constructor, options) {
    const origConnectedCallback = Constructor.prototype.connectedCallback;
    Constructor.prototype.connectedCallback = function() {
      let parentNode = this;
      while (parentNode.parentNode) {
        parentNode = parentNode.parentNode;
      }
      console.debug("[WDIO]", "newShadowRoot", this, parentNode, parentNode === document, document.documentElement);
      return origConnectedCallback?.call(this);
    };
    const origDisconnectedCallback = Constructor.prototype.disconnectedCallback;
    Constructor.prototype.disconnectedCallback = function() {
      console.debug("[WDIO]", "removeShadowRoot", this);
      return origDisconnectedCallback?.call(this);
    };
    return origFn(name, Constructor, options);
  };
  const origAttachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function(init) {
    const shadowRoot = origAttachShadow.call(this, init);
    let parentNode = this;
    while (parentNode.parentNode) {
      parentNode = parentNode.parentNode;
    }
    console.debug("[WDIO]", "newShadowRoot", this, parentNode, parentNode === document, document.documentElement);
    return shadowRoot;
  };
}
export {
  customElementWrapper as default
};
