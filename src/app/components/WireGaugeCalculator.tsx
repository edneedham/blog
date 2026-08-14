'use client'

import { useMemo, useState, type ReactNode } from 'react'
import {
  AWG_SIZES,
  METRIC_MM2,
  SWG_SIZES,
  formatAreaMm2,
  formatDeltaMm,
  formatDiameterMm,
  formatOhms,
  lengthToMetres,
  propertiesFromSize,
  recommendForBudget,
  resistanceOhms,
  type LengthUnit,
  type SizeUnit,
  type WireProperties,
} from '@/app/lib/wire-gauge-data'

type Mode = 'have' | 'need'

const inputClass =
  'w-full min-w-0 border-b border-border bg-transparent py-1.5 font-mono tabular-nums text-foreground outline-none focus:border-foreground'
const selectClass =
  'shrink-0 cursor-pointer bg-transparent py-1.5 text-sm text-foreground-subtle outline-none'

export default function WireGaugeCalculator() {
  const [mode, setMode] = useState<Mode>('have')
  const [sizeUnit, setSizeUnit] = useState<SizeUnit>('awg')
  const [sizeValue, setSizeValue] = useState('14')
  const [lengthValue, setLengthValue] = useState('10')
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('m')
  const [maxOhms, setMaxOhms] = useState('0.5')

  const lengthM = useMemo(() => {
    const amount = Number(lengthValue)
    if (!Number.isFinite(amount) || amount <= 0) return null
    return lengthToMetres(amount, lengthUnit)
  }, [lengthValue, lengthUnit])

  const knownWire = useMemo(
    () => propertiesFromSize(sizeUnit, sizeValue),
    [sizeUnit, sizeValue]
  )

  const recommendation = useMemo(() => {
    const limit = Number(maxOhms)
    if (lengthM === null || !Number.isFinite(limit) || limit <= 0) return null
    return recommendForBudget(lengthM, limit)
  }, [lengthM, maxOhms])

  function changeSizeUnit(next: SizeUnit) {
    const current = propertiesFromSize(sizeUnit, sizeValue)
    setSizeUnit(next)
    if (!current) {
      if (next === 'awg') setSizeValue('14')
      else if (next === 'swg') setSizeValue('16')
      else setSizeValue('')
      return
    }
    if (next === 'awg') setSizeValue(current.awg.size.label)
    else if (next === 'swg') setSizeValue(current.swg.size.label)
    else if (next === 'mm') setSizeValue(formatDiameterMm(current.diameterMm))
    else setSizeValue(formatAreaMm2(current.areaMm2))
  }

  return (
    <div className="my-8">
      <div
        role="tablist"
        aria-label="Wire calculator mode"
        className="mb-6 flex gap-6"
      >
        <ModeTab selected={mode === 'have'} onClick={() => setMode('have')}>
          I have a wire
        </ModeTab>
        <ModeTab selected={mode === 'need'} onClick={() => setMode('need')}>
          I need a wire
        </ModeTab>
      </div>

      {mode === 'have' ? (
        <div className="space-y-4">
          <Field label="Size" htmlFor="wire-size">
            <SizeValueInput
              id="wire-size"
              unit={sizeUnit}
              value={sizeValue}
              onChange={setSizeValue}
            />
            <select
              aria-label="Size unit"
              className={selectClass}
              value={sizeUnit}
              onChange={(event) =>
                changeSizeUnit(event.target.value as SizeUnit)
              }
            >
              <option value="awg">AWG</option>
              <option value="swg">SWG</option>
              <option value="mm">mm</option>
              <option value="mm2">mm²</option>
            </select>
          </Field>
          <Field label="Length" htmlFor="wire-length" optional>
            <input
              id="wire-length"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="optional"
              className={inputClass}
              value={lengthValue}
              onChange={(event) => setLengthValue(event.target.value)}
            />
            <LengthUnitSelect value={lengthUnit} onChange={setLengthUnit} />
          </Field>
        </div>
      ) : (
        <div className="space-y-4">
          <Field label="Length" htmlFor="need-length">
            <input
              id="need-length"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="10"
              className={inputClass}
              value={lengthValue}
              onChange={(event) => setLengthValue(event.target.value)}
            />
            <LengthUnitSelect value={lengthUnit} onChange={setLengthUnit} />
          </Field>
          <Field label="Stay under" htmlFor="need-ohms">
            <input
              id="need-ohms"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="0.5"
              className={inputClass}
              value={maxOhms}
              onChange={(event) => setMaxOhms(event.target.value)}
            />
            <span className="shrink-0 py-1.5 text-sm text-foreground-subtle">
              Ω
            </span>
          </Field>
        </div>
      )}

      <div aria-live="polite">
        {mode === 'have' && knownWire && (
          <HaveResult wire={knownWire} lengthM={lengthM} unit={sizeUnit} />
        )}
        {mode === 'need' && recommendation && (
          <NeedResult
            recommendation={recommendation}
            maxOhms={Number(maxOhms)}
          />
        )}
        {mode === 'need' && !recommendation && (
          <p className="mt-6 text-sm text-foreground-subtle">
            Enter a length and a resistance budget to see the thinnest gauge
            that stays under it.
          </p>
        )}
      </div>

      <p className="mt-6 text-sm text-foreground-subtle">
        Annealed copper at 20 °C, DC.
        {mode === 'need'
          ? ' Any thicker gauge also meets the budget.'
          : null}
      </p>
    </div>
  )
}

function ModeTab({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`cursor-pointer border-b pb-1 text-sm transition-opacity ${
        selected
          ? 'border-foreground text-foreground'
          : 'border-transparent text-foreground-subtle hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3">
      <label htmlFor={htmlFor} className="text-sm text-foreground-subtle">
        {label}
        {optional ? <span className="sr-only"> (optional)</span> : null}
      </label>
      {children}
    </div>
  )
}

function LengthUnitSelect({
  value,
  onChange,
}: {
  value: LengthUnit
  onChange: (unit: LengthUnit) => void
}) {
  return (
    <select
      aria-label="Length unit"
      className={selectClass}
      value={value}
      onChange={(event) => onChange(event.target.value as LengthUnit)}
    >
      <option value="m">m</option>
      <option value="ft">ft</option>
    </select>
  )
}

function SizeValueInput({
  id,
  unit,
  value,
  onChange,
}: {
  id: string
  unit: SizeUnit
  value: string
  onChange: (value: string) => void
}) {
  if (unit === 'awg' || unit === 'swg') {
    const sizes = unit === 'awg' ? AWG_SIZES : SWG_SIZES
    return (
      <select
        id={id}
        className={inputClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {sizes.map((size) => (
          <option key={size.label} value={size.label}>
            {size.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      id={id}
      type="number"
      min="0"
      step="any"
      inputMode="decimal"
      className={inputClass}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

function HaveResult({
  wire,
  lengthM,
  unit,
}: {
  wire: WireProperties
  lengthM: number | null
  unit: SizeUnit
}) {
  const awgNote = unit === 'awg' ? null : formatDeltaMm(wire.awg.deltaMm)
  const swgNote = unit === 'swg' ? null : formatDeltaMm(wire.swg.deltaMm)

  return (
    <dl className="mt-8 space-y-2 text-sm">
      <ResultRow
        label="Diameter"
        value={`${formatDiameterMm(wire.diameterMm)} mm`}
      />
      <ResultRow label="Area" value={`${formatAreaMm2(wire.areaMm2)} mm²`} />
      <ResultRow label="AWG" value={wire.awg.size.label} note={awgNote} />
      <ResultRow label="SWG" value={wire.swg.size.label} note={swgNote} />
      <ResultRow
        label="Resistance"
        value={`${formatOhms(wire.ohmsPerKm)} Ω/km`}
      />
      {lengthM !== null && (
        <ResultRow
          label="This run"
          value={`${formatOhms(resistanceOhms(wire.diameterMm, lengthM))} Ω`}
        />
      )}
    </dl>
  )
}

function NeedResult({
  recommendation,
  maxOhms,
}: {
  recommendation: NonNullable<ReturnType<typeof recommendForBudget>>
  maxOhms: number
}) {
  const largestMetric = METRIC_MM2[METRIC_MM2.length - 1]

  return (
    <div className="mt-8">
      <p className="mb-4 text-sm text-foreground-muted">
        Need at least {formatAreaMm2(recommendation.minAreaMm2)} mm² (Ø{' '}
        {formatDiameterMm(recommendation.minDiameterMm)} mm) to stay under{' '}
        {formatOhms(maxOhms)} Ω.
      </p>
      <dl className="space-y-2 text-sm">
        <ResultRow
          label="AWG"
          value={
            recommendation.awg
              ? `${recommendation.awg.label} AWG`
              : `Even ${recommendation.thickestAwg.label} AWG is too thin`
          }
          note={
            recommendation.awgOhms !== null
              ? `${formatOhms(recommendation.awgOhms)} Ω over this run`
              : `${formatOhms(recommendation.thickestAwgOhms)} Ω over this run`
          }
        />
        <ResultRow
          label="SWG"
          value={
            recommendation.swg
              ? `${recommendation.swg.label} SWG`
              : `Even ${recommendation.thickestSwg.label} SWG is too thin`
          }
          note={
            recommendation.swgOhms !== null
              ? `${formatOhms(recommendation.swgOhms)} Ω over this run`
              : `${formatOhms(recommendation.thickestSwgOhms)} Ω over this run`
          }
        />
        <ResultRow
          label="Metric"
          value={
            recommendation.metricMm2 !== null
              ? `${formatAreaMm2(recommendation.metricMm2)} mm²`
              : `Larger than ${formatAreaMm2(largestMetric)} mm²`
          }
          note={
            recommendation.metricOhms !== null
              ? `${formatOhms(recommendation.metricOhms)} Ω over this run`
              : undefined
          }
        />
      </dl>
      {recommendation.awg && (
        <p className="mt-4 text-sm text-foreground-subtle">
          {recommendation.awg.label} AWG or thicker. Same idea for SWG and mm² —
          pick any size at least this large.
        </p>
      )}
    </div>
  )
}

function ResultRow({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note?: string | null
}) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-x-3">
      <dt className="text-foreground-subtle">{label}</dt>
      <dd className="font-mono tabular-nums text-foreground">
        {value}
        {note ? (
          <span className="ml-2 font-sans text-foreground-subtle">{note}</span>
        ) : null}
      </dd>
    </div>
  )
}
