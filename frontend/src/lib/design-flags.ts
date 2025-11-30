// Central place to toggle decorative / experimental design layers without editing many components.
// If something visually "psuje" layout, flip the flag to false and rebuild.
export const designFlags = {
  hero: {
    whiteGradient: true,
    vignette: true,
    gridOverlay: true,
    minHeights: true,
  },
  services: {
    fineGrid: true,
    coarseGrid: true,
  },
  process: {
    dottedBg: true,
    hammerImage: true,
  },
  whyUs: {
    dottedGridTexture: true,
    drillImage: true,
    sheen: true,
  }
} as const;
