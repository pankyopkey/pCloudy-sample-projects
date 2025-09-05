// src/scripts/isElementStable.ts
function isElementStable(elem, done) {
  if (document.visibilityState === "hidden") {
    throw Error("You are checking for animations on an inactive tab, animations do not run for inactive tabs");
  }
  try {
    const previousPosition = elem.getBoundingClientRect();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const currentPosition = elem.getBoundingClientRect();
        for (const prop in previousPosition) {
          if (previousPosition[prop] !== currentPosition[prop]) {
            done(false);
          }
        }
        done(true);
      });
    });
  } catch {
    done(false);
  }
}
export {
  isElementStable as default
};
