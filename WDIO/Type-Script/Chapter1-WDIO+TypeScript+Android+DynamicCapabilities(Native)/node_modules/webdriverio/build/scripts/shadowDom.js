// src/scripts/shadowDom.ts
function findIframeInShadowDOM(fragment) {
  function findIframe(root) {
    const allElements = Array.from(root.querySelectorAll("iframe"));
    for (const el of allElements) {
      if (el instanceof HTMLIFrameElement && el.src.includes(fragment)) {
        return el;
      }
    }
    const shadowHosts = Array.from(root.querySelectorAll("*"));
    for (const host of shadowHosts) {
      const maybeShadowRoot = host.shadowRoot;
      if (maybeShadowRoot) {
        const result = findIframe(maybeShadowRoot);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
  return findIframe(document);
}
export {
  findIframeInShadowDOM as default
};
