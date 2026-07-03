export interface Viewport {
  width: number;
  height: number;
  // padding in px applied to the SVG viewBox
  paddingX: number;
  paddingY: number;
}

/**
 * Maps a geographic bounding box to SVG screen coordinates.
 * Used to project lat/lng coordinate pairs onto an 800×600 viewBox.
 */
export function projectToScreen(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  viewport: Viewport,
): { x: number; y: number } {
  const { width, height, paddingX, paddingY } = viewport;
  const { minLat, maxLat, minLng, maxLng } = bounds;

  // Simple linear projection (Mercator-ish for small areas)
  const x = paddingX + ((lng - minLng) / (maxLng - minLng)) * (width - 2 * paddingX);
  const y = height - (paddingY + ((lat - minLat) / (maxLat - minLat)) * (height - 2 * paddingY));

  return { x, y };
}

/**
 * Returns the Estedama tier for a given sustainability score.
 */
export type EstedamaTier = 'high' | 'medium' | 'blank';

export function getEstedamaTier(score: number): EstedamaTier {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'blank';
}
