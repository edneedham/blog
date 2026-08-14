export interface GaugeSize {
  label: string
  diameterMm: number
}

/** Nominal solid-wire diameters per ASTM B258. */
export const AWG_SIZES: GaugeSize[] = [
  { label: '4/0', diameterMm: 11.684 },
  { label: '3/0', diameterMm: 10.404 },
  { label: '2/0', diameterMm: 9.266 },
  { label: '1/0', diameterMm: 8.251 },
  { label: '1', diameterMm: 7.348 },
  { label: '2', diameterMm: 6.544 },
  { label: '3', diameterMm: 5.827 },
  { label: '4', diameterMm: 5.189 },
  { label: '5', diameterMm: 4.621 },
  { label: '6', diameterMm: 4.115 },
  { label: '7', diameterMm: 3.665 },
  { label: '8', diameterMm: 3.264 },
  { label: '9', diameterMm: 2.906 },
  { label: '10', diameterMm: 2.588 },
  { label: '11', diameterMm: 2.305 },
  { label: '12', diameterMm: 2.053 },
  { label: '13', diameterMm: 1.828 },
  { label: '14', diameterMm: 1.628 },
  { label: '15', diameterMm: 1.45 },
  { label: '16', diameterMm: 1.291 },
  { label: '17', diameterMm: 1.15 },
  { label: '18', diameterMm: 1.024 },
  { label: '19', diameterMm: 0.912 },
  { label: '20', diameterMm: 0.812 },
  { label: '21', diameterMm: 0.723 },
  { label: '22', diameterMm: 0.644 },
  { label: '23', diameterMm: 0.573 },
  { label: '24', diameterMm: 0.511 },
  { label: '25', diameterMm: 0.455 },
  { label: '26', diameterMm: 0.405 },
  { label: '27', diameterMm: 0.361 },
  { label: '28', diameterMm: 0.321 },
  { label: '29', diameterMm: 0.286 },
  { label: '30', diameterMm: 0.255 },
  { label: '31', diameterMm: 0.227 },
  { label: '32', diameterMm: 0.202 },
  { label: '33', diameterMm: 0.18 },
  { label: '34', diameterMm: 0.16 },
  { label: '35', diameterMm: 0.143 },
  { label: '36', diameterMm: 0.127 },
  { label: '37', diameterMm: 0.113 },
  { label: '38', diameterMm: 0.101 },
  { label: '39', diameterMm: 0.09 },
  { label: '40', diameterMm: 0.08 },
]

/** BS 3737 diameters, from the published inch values. */
const SWG_INCHES: [string, number][] = [
  ['7/0', 0.5],
  ['6/0', 0.464],
  ['5/0', 0.432],
  ['4/0', 0.4],
  ['3/0', 0.372],
  ['2/0', 0.348],
  ['1/0', 0.324],
  ['1', 0.3],
  ['2', 0.276],
  ['3', 0.252],
  ['4', 0.232],
  ['5', 0.212],
  ['6', 0.192],
  ['7', 0.176],
  ['8', 0.16],
  ['9', 0.144],
  ['10', 0.128],
  ['11', 0.116],
  ['12', 0.104],
  ['13', 0.092],
  ['14', 0.08],
  ['15', 0.072],
  ['16', 0.064],
  ['17', 0.056],
  ['18', 0.048],
  ['19', 0.04],
  ['20', 0.036],
  ['21', 0.032],
  ['22', 0.028],
  ['23', 0.024],
  ['24', 0.022],
  ['25', 0.02],
  ['26', 0.018],
  ['27', 0.0164],
  ['28', 0.0148],
  ['29', 0.0136],
  ['30', 0.0124],
  ['31', 0.0116],
  ['32', 0.0108],
  ['33', 0.01],
  ['34', 0.0092],
  ['35', 0.0084],
  ['36', 0.0076],
  ['37', 0.0068],
  ['38', 0.006],
  ['39', 0.0052],
  ['40', 0.0048],
  ['41', 0.0044],
  ['42', 0.004],
  ['43', 0.0036],
  ['44', 0.0032],
  ['45', 0.0028],
  ['46', 0.0024],
  ['47', 0.002],
  ['48', 0.0016],
  ['49', 0.0012],
  ['50', 0.001],
]

export const SWG_SIZES: GaugeSize[] = SWG_INCHES.map(([label, inches]) => ({
  label,
  diameterMm: inches * 25.4,
}))

/** Common conductor cross-sections, smallest first. */
export const METRIC_MM2 = [
  0.13, 0.2, 0.35, 0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50,
]

/** Annealed copper resistivity at 20 °C (IEC 60028). */
export const COPPER_RESISTIVITY_OHM_MM2_M = 0.017241

export type SizeUnit = 'awg' | 'swg' | 'mm' | 'mm2'
export type LengthUnit = 'm' | 'ft'

export interface NearestGauge {
  size: GaugeSize
  deltaMm: number
}

export interface WireProperties {
  diameterMm: number
  areaMm2: number
  ohmsPerKm: number
  awg: NearestGauge
  swg: NearestGauge
}

export interface SizeRecommendation {
  minAreaMm2: number
  minDiameterMm: number
  awg: GaugeSize | null
  swg: GaugeSize | null
  metricMm2: number | null
  awgOhms: number | null
  swgOhms: number | null
  metricOhms: number | null
  thickestAwg: GaugeSize
  thickestSwg: GaugeSize
  thickestAwgOhms: number
  thickestSwgOhms: number
}

export function crossSectionMm2(diameterMm: number): number {
  return Math.PI * (diameterMm / 2) ** 2
}

export function diameterFromAreaMm2(areaMm2: number): number {
  return 2 * Math.sqrt(areaMm2 / Math.PI)
}

export function resistanceOhmsFromArea(
  areaMm2: number,
  lengthM: number
): number {
  return (COPPER_RESISTIVITY_OHM_MM2_M * lengthM) / areaMm2
}

export function resistanceOhmsPerKm(diameterMm: number): number {
  return resistanceOhmsFromArea(crossSectionMm2(diameterMm), 1000)
}

export function resistanceOhms(diameterMm: number, lengthM: number): number {
  return resistanceOhmsFromArea(crossSectionMm2(diameterMm), lengthM)
}

export function lengthToMetres(value: number, unit: LengthUnit): number {
  return unit === 'ft' ? value * 0.3048 : value
}

export function nearestGauge(
  sizes: GaugeSize[],
  diameterMm: number
): NearestGauge {
  return sizes.reduce<NearestGauge>(
    (best, size) => {
      const deltaMm = size.diameterMm - diameterMm
      const abs = Math.abs(deltaMm)
      const bestAbs = Math.abs(best.deltaMm)
      if (abs < bestAbs) return { size, deltaMm }
      if (abs === bestAbs && size.diameterMm > best.size.diameterMm) {
        return { size, deltaMm }
      }
      return best
    },
    { size: sizes[0], deltaMm: sizes[0].diameterMm - diameterMm }
  )
}

export function thinnestMeetingBudget(
  sizes: GaugeSize[],
  lengthM: number,
  maxOhms: number
): GaugeSize | null {
  const meeting = sizes.filter(
    (size) => resistanceOhms(size.diameterMm, lengthM) <= maxOhms
  )
  if (meeting.length === 0) return null
  return meeting.reduce((thinnest, size) =>
    size.diameterMm < thinnest.diameterMm ? size : thinnest
  )
}

export function thinnestMetricMm2(minAreaMm2: number): number | null {
  return METRIC_MM2.find((area) => area >= minAreaMm2) ?? null
}

export function propertiesFromDiameter(diameterMm: number): WireProperties {
  return {
    diameterMm,
    areaMm2: crossSectionMm2(diameterMm),
    ohmsPerKm: resistanceOhmsPerKm(diameterMm),
    awg: nearestGauge(AWG_SIZES, diameterMm),
    swg: nearestGauge(SWG_SIZES, diameterMm),
  }
}

export function propertiesFromSize(
  unit: SizeUnit,
  value: string
): WireProperties | null {
  if (unit === 'awg') {
    const size = AWG_SIZES.find((entry) => entry.label === value)
    return size ? propertiesFromDiameter(size.diameterMm) : null
  }
  if (unit === 'swg') {
    const size = SWG_SIZES.find((entry) => entry.label === value)
    return size ? propertiesFromDiameter(size.diameterMm) : null
  }

  const amount = Number(value)
  if (!Number.isFinite(amount) || amount <= 0) return null

  if (unit === 'mm') return propertiesFromDiameter(amount)
  return propertiesFromDiameter(diameterFromAreaMm2(amount))
}

export function recommendForBudget(
  lengthM: number,
  maxOhms: number
): SizeRecommendation | null {
  if (!(lengthM > 0) || !(maxOhms > 0)) return null

  const minAreaMm2 = (COPPER_RESISTIVITY_OHM_MM2_M * lengthM) / maxOhms
  const minDiameterMm = diameterFromAreaMm2(minAreaMm2)
  const awg = thinnestMeetingBudget(AWG_SIZES, lengthM, maxOhms)
  const swg = thinnestMeetingBudget(SWG_SIZES, lengthM, maxOhms)
  const metricMm2 = thinnestMetricMm2(minAreaMm2)
  const thickestAwg = AWG_SIZES[0]
  const thickestSwg = SWG_SIZES[0]

  return {
    minAreaMm2,
    minDiameterMm,
    awg,
    swg,
    metricMm2,
    awgOhms: awg ? resistanceOhms(awg.diameterMm, lengthM) : null,
    swgOhms: swg ? resistanceOhms(swg.diameterMm, lengthM) : null,
    metricOhms: metricMm2 ? resistanceOhmsFromArea(metricMm2, lengthM) : null,
    thickestAwg,
    thickestSwg,
    thickestAwgOhms: resistanceOhms(thickestAwg.diameterMm, lengthM),
    thickestSwgOhms: resistanceOhms(thickestSwg.diameterMm, lengthM),
  }
}

export function formatDiameterMm(value: number): string {
  if (value >= 10) return value.toFixed(2)
  return value.toFixed(3)
}

export function formatAreaMm2(value: number): string {
  const digits = value >= 10 ? 1 : value >= 1 ? 2 : 3
  return value.toFixed(digits).replace(/\.?0+$/, '')
}

export function formatOhms(value: number): string {
  const digits = value >= 100 ? 1 : value >= 1 ? 2 : 3
  return value.toFixed(digits).replace(/\.?0+$/, '')
}

export function formatDeltaMm(deltaMm: number): string | null {
  const abs = Math.abs(deltaMm)
  if (abs < 0.005) return null
  const adj = deltaMm > 0 ? 'thicker' : 'thinner'
  return `${formatDiameterMm(abs)} mm ${adj}`
}
