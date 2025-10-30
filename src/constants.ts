export const CONVERSIONS: { [category: string]: { [unit: string]: number } } = {
    volume_conversion: {
      fl_oz: 1,
      gal: 128,
      ml: 0.0338140227,
      l: 33.8140227,
      qt: 32,
      tbsp: 0.5,
    },
    weight_conversion: {
      g: 1,
      kg: 1000,
      mg: 0.001,
      oz: 28.3495,
      lb: 453.592,
    },
    distance_conversion: {
      m: 1,
      km: 1000,
      mm: 0.001,
      cm: 0.01,
      mi: 1609.344,
      yard: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    }
}