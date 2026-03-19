type Candle = {
  open: number
  high: number
  low: number
  close: number
}

type Level = {
  name: string
  price: number
  stroke: string
  tone: string
}

type FlowRow = {
  time: string
  ticker: string
  contract: string
  premium: string
  size: string
  route: 'ASK' | 'BID' | 'MID'
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  type: string
  emphasis: number
}

type Setup = {
  ticker: string
  accent: string
  accentSoft: string
  label: string
  score: string
  headline: string
  thesis: string
  metrics: Array<{ label: string; value: string }>
  curve: number[]
}

const candles: Candle[] = [
  { open: 122.8, high: 123.4, low: 122.4, close: 123.1 },
  { open: 123.1, high: 123.8, low: 122.9, close: 123.6 },
  { open: 123.6, high: 123.9, low: 123.0, close: 123.2 },
  { open: 123.2, high: 123.7, low: 122.8, close: 123.5 },
  { open: 123.5, high: 124.0, low: 123.1, close: 123.9 },
  { open: 123.9, high: 124.2, low: 123.2, close: 123.4 },
  { open: 123.4, high: 124.1, low: 123.0, close: 123.8 },
  { open: 123.8, high: 124.6, low: 123.6, close: 124.4 },
  { open: 124.4, high: 124.9, low: 124.0, close: 124.1 },
  { open: 124.1, high: 124.7, low: 123.9, close: 124.5 },
  { open: 124.5, high: 125.0, low: 124.2, close: 124.9 },
  { open: 124.9, high: 125.2, low: 124.3, close: 124.6 },
  { open: 124.6, high: 125.1, low: 124.2, close: 124.8 },
  { open: 124.8, high: 125.4, low: 124.6, close: 125.2 },
  { open: 125.2, high: 125.8, low: 124.8, close: 125.6 },
  { open: 125.6, high: 125.9, low: 125.1, close: 125.3 },
  { open: 125.3, high: 125.9, low: 125.0, close: 125.7 },
  { open: 125.7, high: 126.3, low: 125.4, close: 126.0 },
  { open: 126.0, high: 126.5, low: 125.8, close: 126.3 },
  { open: 126.3, high: 126.9, low: 126.0, close: 126.7 },
  { open: 126.7, high: 127.6, low: 126.5, close: 127.3 },
  { open: 127.3, high: 127.9, low: 127.0, close: 127.7 },
  { open: 127.7, high: 128.2, low: 127.2, close: 127.5 },
  { open: 127.5, high: 128.0, low: 127.1, close: 127.8 },
  { open: 127.8, high: 128.4, low: 127.5, close: 128.1 },
  { open: 128.1, high: 128.3, low: 127.6, close: 127.9 },
]

const levels: Level[] = [
  {
    name: 'Call Wall 128',
    price: 128,
    stroke: 'rgba(99,102,241,0.72)',
    tone: 'rgba(99,102,241,0.08)',
  },
  {
    name: 'Ask Cluster 126',
    price: 126.2,
    stroke: 'rgba(16,185,129,0.58)',
    tone: 'rgba(16,185,129,0.08)',
  },
  {
    name: 'Zero Gamma',
    price: 125,
    stroke: 'rgba(245,158,11,0.66)',
    tone: 'rgba(245,158,11,0.08)',
  },
  {
    name: 'Put Floor 124',
    price: 124,
    stroke: 'rgba(251,113,133,0.62)',
    tone: 'rgba(251,113,133,0.07)',
  },
]

const profileRows = [
  { strike: '130', calls: 56, puts: 10, tag: '' },
  { strike: '129', calls: 68, puts: 14, tag: '' },
  { strike: '128', calls: 92, puts: 18, tag: 'call wall' },
  { strike: '127', calls: 72, puts: 22, tag: '' },
  { strike: '126', calls: 81, puts: 24, tag: 'ask lift' },
  { strike: '125', calls: 34, puts: 28, tag: 'flip' },
  { strike: '124', calls: 18, puts: 74, tag: 'put floor' },
  { strike: '123', calls: 10, puts: 62, tag: '' },
  { strike: '122', calls: 6, puts: 48, tag: '' },
]

const flowRows: FlowRow[] = [
  {
    time: '15:56:12',
    ticker: 'RTX',
    contract: '03/29 128C',
    premium: '$2.4M',
    size: '1.8K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 92,
  },
  {
    time: '15:55:48',
    ticker: 'RTX',
    contract: '03/29 130C',
    premium: '$1.7M',
    size: '1.2K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'BLOCK',
    emphasis: 78,
  },
  {
    time: '15:55:19',
    ticker: 'OXY',
    contract: '04/05 72C',
    premium: '$1.1M',
    size: '2.1K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 72,
  },
  {
    time: '15:54:51',
    ticker: 'LMT',
    contract: '04/19 520C',
    premium: '$640K',
    size: '620',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'BLOCK',
    emphasis: 54,
  },
  {
    time: '15:54:14',
    ticker: 'RTX',
    contract: '03/29 124P',
    premium: '$540K',
    size: '900',
    route: 'BID',
    bias: 'BEARISH',
    type: 'HEDGE',
    emphasis: 41,
  },
  {
    time: '15:53:37',
    ticker: 'OXY',
    contract: '03/29 70P',
    premium: '$430K',
    size: '1.4K',
    route: 'MID',
    bias: 'NEUTRAL',
    type: 'ROLL',
    emphasis: 34,
  },
  {
    time: '15:53:06',
    ticker: 'RTX',
    contract: '04/19 132C',
    premium: '$820K',
    size: '510',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 58,
  },
]

const setups: Setup[] = [
  {
    ticker: 'RTX',
    accent: '#6366f1',
    accentSoft: 'rgba(99,102,241,0.18)',
    label: 'cleanest setup',
    score: '8.8 / 10',
    headline: 'Calls keep lifting into 128',
    thesis: 'Best structure in the group. Ask-side flow is concentrated around 128 and dealer positioning turns more supportive above 126.',
    metrics: [
      { label: 'gamma wall', value: '128 call wall' },
      { label: 'flow', value: '$4.9M ask-side' },
      { label: 'dark pool', value: '+22% WoW' },
    ],
    curve: [18, 24, 30, 46, 82, 94, 68, 34, 20],
  },
  {
    ticker: 'OXY',
    accent: '#10b981',
    accentSoft: 'rgba(16,185,129,0.18)',
    label: 'flow confirmation',
    score: '8.1 / 10',
    headline: 'Institutional story now has tape support',
    thesis: 'Berkshire accumulation is now backed by clean upside call buying. Better swing setup than panic chase.',
    metrics: [
      { label: 'strike cluster', value: '72C / 74C' },
      { label: 'premium', value: '$2.1M calls' },
      { label: 'dark pool', value: '+17% WoW' },
    ],
    curve: [16, 20, 28, 42, 54, 66, 63, 48, 30],
  },
  {
    ticker: 'LMT',
    accent: '#f59e0b',
    accentSoft: 'rgba(245,158,11,0.18)',
    label: 'secondary exposure',
    score: '7.4 / 10',
    headline: 'Slower tape, stacked open interest',
    thesis: 'Less explosive than RTX, but the structure is orderly. Open interest around 520 gives it a cleaner secondary role.',
    metrics: [
      { label: 'open interest', value: '520 strike' },
      { label: 'flow', value: '$640K block' },
      { label: 'dark pool', value: 'stable bid' },
    ],
    curve: [12, 18, 22, 30, 44, 56, 52, 40, 28],
  },
]

export default function SceneThree_QuantAnalysis() {
  return (
    <div className="flex flex-col items-start gap-10">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Scene 3
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:50 – 1:00
          </span>
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          Positioning & Options Flow
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
          Filing intelligence collapses into price structure, gamma bands, and live options flow,
          then compresses into three clean trade setups.
        </p>
      </div>

      <div className="flex items-start gap-12">
        <div className="flex flex-col items-start gap-5 shrink-0">
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300">
            Frame 1 — Gamma Map
          </span>

          <div
            className="w-[780px] rounded-[30px] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(39,39,42,0.82) 0%, rgba(24,24,27,0.88) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 18px 48px rgba(0,0,0,0.22)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2">
                {[
                  { ticker: 'RTX', change: '+6.8%', active: true },
                  { ticker: 'OXY', change: '+4.1%', active: false },
                  { ticker: 'LMT', change: '+3.2%', active: false },
                ].map((tab) => (
                  <div
                    key={tab.ticker}
                    className="rounded-full px-3 py-1.5 flex items-center gap-2"
                    style={{
                      background: tab.active ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.04)',
                      border: tab.active ? '1px solid rgba(99,102,241,0.28)' : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span className="text-[11px] font-mono font-semibold tracking-wide text-white">
                      {tab.ticker}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: tab.active ? '#c7d2fe' : 'rgba(255,255,255,0.45)' }}>
                      {tab.change}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <MetricPill label="call wall" value="128" accent="rgba(99,102,241,0.18)" text="#c7d2fe" />
                <MetricPill label="put floor" value="124" accent="rgba(251,113,133,0.16)" text="#fecdd3" />
                <MetricPill label="exp move" value="±4.1%" accent="rgba(255,255,255,0.05)" text="rgba(255,255,255,0.76)" />
              </div>
            </div>

            <div className="flex items-stretch">
              <div className="w-[540px] px-4 py-4" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <QuantPriceChart candles={candles} levels={levels} />
              </div>

              <div className="flex-1 px-5 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">
                      Strike Positioning
                    </p>
                    <p className="text-[13px] text-white/70 mt-1">
                      Calls dominating above spot, puts stacked below zero gamma.
                    </p>
                  </div>
                  <div className="rounded-full px-2.5 py-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-[9px] font-mono tracking-widest text-white/55 uppercase">
                      live
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {profileRows.map((row) => (
                    <div key={row.strike} className="grid grid-cols-[38px_1fr_62px] items-center gap-3">
                      <span className="text-[11px] font-mono text-white/52">{row.strike}</span>
                      <div className="relative h-5">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
                        <div
                          className="absolute right-1/2 top-1/2 -translate-y-1/2 h-2 rounded-l-full"
                          style={{
                            width: `${row.puts}px`,
                            background: 'linear-gradient(90deg, rgba(251,113,133,0.18), rgba(251,113,133,0.72))',
                          }}
                        />
                        <div
                          className="absolute left-1/2 top-1/2 -translate-y-1/2 h-2 rounded-r-full"
                          style={{
                            width: `${row.calls}px`,
                            background: 'linear-gradient(90deg, rgba(16,185,129,0.72), rgba(16,185,129,0.18))',
                          }}
                        />
                      </div>
                      <div className="flex justify-end">
                        {row.tag ? (
                          <span
                            className="rounded-full px-2 py-1 text-[8px] font-mono uppercase tracking-widest"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              color: 'rgba(255,255,255,0.58)',
                            }}
                          >
                            {row.tag}
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono text-transparent">.</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-5">
                  <div className="rounded-[18px] px-3 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/35">bias</p>
                    <p className="text-[18px] font-semibold text-white mt-1">Calls &gt; puts</p>
                    <p className="text-[11px] text-white/55 mt-1">Dealer pressure flips supportive above 126.</p>
                  </div>
                  <div className="rounded-[18px] px-3 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/35">read</p>
                    <p className="text-[18px] font-semibold text-white mt-1">Breakout path</p>
                    <p className="text-[11px] text-white/55 mt-1">128 is the magnet. 124 is the main downside shelf.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center justify-center self-center">
          <div className="w-20 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[9px] font-mono mt-1.5 text-center leading-tight">
            flow confirms<br />levels →
          </span>
        </div>

        <div className="flex flex-col items-start gap-5 shrink-0">
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300">
            Frame 2 — Options Flow
          </span>

          <div
            className="w-[660px] rounded-[30px] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(39,39,42,0.82) 0%, rgba(24,24,27,0.88) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 18px 48px rgba(0,0,0,0.22)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">
                  Live Tape
                </p>
                <p className="text-[14px] text-white mt-1">
                  Ask-side calls still leading the tape.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MetricPill label="ask-side" value="68%" accent="rgba(16,185,129,0.16)" text="#bbf7d0" />
                <MetricPill label="largest" value="RTX 128C" accent="rgba(99,102,241,0.16)" text="#c7d2fe" />
              </div>
            </div>

            <div className="flex items-stretch">
              <div className="flex-1 px-4 py-4 space-y-2.5" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                {flowRows.map((row) => (
                  <FlowRowCard key={`${row.time}-${row.ticker}-${row.contract}`} row={row} />
                ))}
              </div>

              <div className="w-[184px] px-4 py-4 flex flex-col gap-3">
                <SummaryCard title="cluster" value="RTX 128C" note="Repeated sweeps keep printing near the same strike." />
                <SummaryCard title="energy" value="OXY follow-through" note="Call buying confirms the filing and institutional story." />
                <SummaryCard title="noise" value="0DTE contained" note="Speculative flow is present, but not overwhelming the read." />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center justify-center self-center">
          <div className="w-20 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[9px] font-mono mt-1.5 text-center leading-tight">
            compresses into<br />setups →
          </span>
        </div>

        <div className="flex flex-col items-start gap-5 shrink-0">
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300">
            Frame 3 — Quant Compression
          </span>

          <div className="w-[560px] space-y-3">
            {setups.map((setup) => (
              <SetupCard key={setup.ticker} setup={setup} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2" style={{ width: 760 }}>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> Filing intelligence collapses into ticker tabs, chart grid lines rise in,
            gamma bands bloom across the price panel, then unusual flow prints slide onto the tape and pulse back into their key strikes.
            Final setup cards condense the whole read into three tradeable names.
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "Alright, now I'm looking at positioning.
            RTX has the cleanest setup — calls keep lifting up the ask near 128. OXY's getting real size too.
            LMT is slower, but the open interest is stacked."
          </p>
        </div>
      </div>
    </div>
  )
}

function QuantPriceChart({ candles, levels }: { candles: Candle[]; levels: Level[] }) {
  const width = 508
  const height = 300
  const paddingX = 18
  const paddingY = 20
  const innerWidth = width - paddingX * 2
  const innerHeight = height - paddingY * 2
  const values = [...candles.flatMap((c) => [c.high, c.low]), ...levels.map((l) => l.price)]
  const max = Math.max(...values) + 0.3
  const min = Math.min(...values) - 0.3
  const priceToY = (price: number) => paddingY + ((max - price) / (max - min)) * innerHeight
  const stepX = innerWidth / candles.length
  const currentPrice = candles[candles.length - 1].close

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[300px] rounded-[24px]" style={{ background: 'rgba(255,255,255,0.025)' }}>
      {Array.from({ length: 6 }).map((_, i) => {
        const y = paddingY + (innerHeight / 5) * i
        return (
          <line
            key={i}
            x1={paddingX}
            x2={width - paddingX}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        )
      })}

      {levels.map((level) => {
        const y = priceToY(level.price)
        return (
          <g key={level.name}>
            <rect x={paddingX} y={y - 10} width={innerWidth} height={20} rx={10} fill={level.tone} />
            <line
              x1={paddingX}
              x2={width - paddingX}
              y1={y}
              y2={y}
              stroke={level.stroke}
              strokeWidth="1.4"
              strokeDasharray="5 6"
            />
            <rect
              x={width - 126}
              y={y - 11}
              width={102}
              height={22}
              rx={11}
              fill="rgba(24,24,27,0.82)"
              stroke="rgba(255,255,255,0.08)"
            />
            <text
              x={width - 75}
              y={y + 4}
              textAnchor="middle"
              fill="rgba(255,255,255,0.78)"
              fontSize="9"
              style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              {level.name}
            </text>
          </g>
        )
      })}

      {candles.map((candle, index) => {
        const x = paddingX + stepX * index + stepX / 2
        const wickTop = priceToY(candle.high)
        const wickBottom = priceToY(candle.low)
        const bodyTop = priceToY(Math.max(candle.open, candle.close))
        const bodyBottom = priceToY(Math.min(candle.open, candle.close))
        const bodyHeight = Math.max(3, bodyBottom - bodyTop)
        const up = candle.close >= candle.open
        const color = up ? 'rgba(52,211,153,0.88)' : 'rgba(251,113,133,0.86)'

        return (
          <g key={index}>
            <line x1={x} x2={x} y1={wickTop} y2={wickBottom} stroke={color} strokeWidth="1.4" />
            <rect x={x - 4.6} y={bodyTop} width={9.2} height={bodyHeight} rx={2.4} fill={color} />
          </g>
        )
      })}

      <line
        x1={paddingX}
        x2={width - paddingX}
        y1={priceToY(currentPrice)}
        y2={priceToY(currentPrice)}
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <rect
        x={width - 84}
        y={priceToY(currentPrice) - 11}
        width={60}
        height={22}
        rx={11}
        fill="rgba(24,24,27,0.88)"
        stroke="rgba(255,255,255,0.08)"
      />
      <text
        x={width - 54}
        y={priceToY(currentPrice) + 4}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        style={{ letterSpacing: '0.12em' }}
      >
        127.9
      </text>

      {['09:30', '11:00', '13:00', '15:30'].map((label, index) => (
        <text
          key={label}
          x={paddingX + (innerWidth / 3) * index}
          y={height - 10}
          fill="rgba(255,255,255,0.32)"
          fontSize="9"
          style={{ letterSpacing: '0.12em' }}
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

function FlowRowCard({ row }: { row: FlowRow }) {
  const routeTone =
    row.route === 'ASK'
      ? { bg: 'rgba(16,185,129,0.16)', text: '#bbf7d0' }
      : row.route === 'BID'
        ? { bg: 'rgba(251,113,133,0.16)', text: '#fecdd3' }
        : { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.72)' }

  const biasTone =
    row.bias === 'BULLISH'
      ? { bg: 'rgba(16,185,129,0.16)', text: '#bbf7d0' }
      : row.bias === 'BEARISH'
        ? { bg: 'rgba(251,113,133,0.16)', text: '#fecdd3' }
        : { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.72)' }

  const barColor =
    row.bias === 'BULLISH'
      ? 'linear-gradient(90deg, rgba(16,185,129,0.22), rgba(16,185,129,0.84))'
      : row.bias === 'BEARISH'
        ? 'linear-gradient(90deg, rgba(251,113,133,0.22), rgba(251,113,133,0.84))'
        : 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.38))'

  return (
    <div
      className="rounded-[20px] px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="w-[58px] text-[10px] font-mono text-white/36 shrink-0">{row.time}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-semibold text-white">{row.ticker}</span>
            <span className="text-[12px] text-white/78">{row.contract}</span>
            <Tag label={row.route} bg={routeTone.bg} color={routeTone.text} />
            <Tag label={row.bias} bg={biasTone.bg} color={biasTone.text} />
            <Tag label={row.type} bg="rgba(99,102,241,0.14)" color="#c7d2fe" />
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-white/42">
            <span>premium {row.premium}</span>
            <span>size {row.size}</span>
          </div>
        </div>

        <div className="w-[92px] shrink-0">
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${row.emphasis}%`, background: barColor }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SetupCard({ setup }: { setup: Setup }) {
  return (
    <div
      className="rounded-[28px] px-5 py-5"
      style={{
        background: 'linear-gradient(180deg, rgba(39,39,42,0.82) 0%, rgba(24,24,27,0.88) 100%)',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 16px 42px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[9px] font-mono uppercase tracking-[0.24em] px-2.5 py-1 rounded-full"
              style={{ background: setup.accentSoft, color: setup.accent }}
            >
              {setup.label}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.24em] text-white/32">
              {setup.ticker}
            </span>
          </div>
          <h3 className="text-[20px] font-semibold tracking-tight text-white leading-tight max-w-[340px]">
            {setup.headline}
          </h3>
        </div>

        <div
          className="rounded-full px-3 py-1.5"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="text-[11px] font-mono text-white/74">{setup.score}</span>
        </div>
      </div>

      <div className="flex items-start gap-4 mt-4">
        <div
          className="w-[170px] rounded-[22px] px-3 py-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-[8px] font-mono uppercase tracking-[0.24em] text-white/35 mb-2">setup curve</p>
          <MiniCurve points={setup.curve} color={setup.accent} fill={setup.accentSoft} />
        </div>

        <div className="flex-1 grid grid-cols-3 gap-2">
          {setup.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[18px] px-3 py-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-[8px] font-mono uppercase tracking-[0.22em] text-white/35">{metric.label}</p>
              <p className="text-[12px] text-white mt-1.5 leading-snug">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[12px] leading-relaxed text-white/58 mt-4 max-w-[470px]">
        {setup.thesis}
      </p>
    </div>
  )
}

function MiniCurve({ points, color, fill }: { points: number[]; color: string; fill: string }) {
  const width = 146
  const height = 72
  const max = Math.max(...points)
  const min = Math.min(...points)
  const step = width / (points.length - 1)
  const linePoints = points
    .map((point, index) => {
      const x = index * step
      const y = height - ((point - min) / (max - min || 1)) * (height - 8) - 4
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[72px]">
      <polyline
        points={`${linePoints} ${width},${height} 0,${height}`}
        fill={fill}
        stroke="none"
      />
      <polyline
        points={linePoints}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1={step * 5} x2={step * 5} y1={6} y2={height - 4} stroke="rgba(255,255,255,0.16)" strokeDasharray="3 4" />
    </svg>
  )
}

function MetricPill({
  label,
  value,
  accent,
  text,
}: {
  label: string
  value: string
  accent: string
  text: string
}) {
  return (
    <div className="rounded-full px-3 py-1.5 flex items-center gap-2" style={{ background: accent, border: '1px solid rgba(255,255,255,0.05)' }}>
      <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.42)' }}>
        {label}
      </span>
      <span className="text-[10px] font-mono font-semibold" style={{ color: text }}>
        {value}
      </span>
    </div>
  )
}

function Tag({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      className="rounded-full px-2 py-1 text-[8px] font-mono uppercase tracking-widest"
      style={{ background: bg, color }}
    >
      {label}
    </span>
  )
}

function SummaryCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div
      className="rounded-[20px] px-3 py-3"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <p className="text-[8px] font-mono uppercase tracking-[0.22em] text-white/35">{title}</p>
      <p className="text-[14px] leading-tight text-white mt-1.5">{value}</p>
      <p className="text-[11px] leading-relaxed text-white/52 mt-2">{note}</p>
    </div>
  )
}
