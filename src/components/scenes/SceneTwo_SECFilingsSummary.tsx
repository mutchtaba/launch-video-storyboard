import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const valuationMetrics = [
  { label: 'P/E', value: '12.1x', numVal: 12.1, suffix: 'x', decimals: 1, accent: '#cbd5e1' },
  { label: 'Fwd P/E', value: '10.5x', numVal: 10.5, suffix: 'x', decimals: 1, accent: '#818cf8' },
  { label: 'EV/EBITDA', value: '5.8x', numVal: 5.8, suffix: 'x', decimals: 1, accent: '#a78bfa' },
  { label: 'FCF Yield', value: '8.2%', numVal: 8.2, suffix: '%', decimals: 1, accent: '#34d399' },
  { label: 'Div Yield', value: '1.6%', numVal: 1.6, suffix: '%', decimals: 1, accent: '#60a5fa' },
  { label: 'Debt/Eq', value: '0.98', numVal: 0.98, suffix: '', decimals: 2, accent: '#f87171' },
];

const signalBars = [
  { label: 'Valuation', score: 84, accent: '#818cf8' },
  { label: 'Institutional Flow', score: 96, accent: '#f59e0b' },
  { label: 'Cash Flow', score: 88, accent: '#34d399' },
];

const insiderDeals = [
  { who: 'Vicki Hollub', role: 'President & CEO', action: 'Buy', shares: '125,000', price: '$59.84' },
  { who: 'Richard A. Jackson', role: 'COO — US Onshore', action: 'Buy', shares: '38,000', price: '$60.12' },
];

const narrativeSegments = [
  {
    text: "Looks like oil producer OXY is the strongest candidate here.",
    color: '#1a1a2e',
  },
  {
    text: "Insiders are buying heavily and the valuation is cheap for what you're getting.",
    color: 'rgba(26,26,46,0.6)',
  },
  {
    text: "Let me run the technicals and options data next.",
    color: 'rgba(26,26,46,0.35)',
  },
];

const narrativeWords = narrativeSegments.flatMap(seg =>
  seg.text.split(' ').map(word => ({ word, color: seg.color }))
);

const panelStyle = {
  background: 'linear-gradient(180deg, rgba(39,39,42,0.72) 0%, rgba(24,24,27,0.84) 100%)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
};

export default function SceneTwo_SECFilingsSummary() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [show, setShow] = useState({
    header: true,
    signals: true,
    metrics: [true, true, true, true, true, true] as boolean[],
    insiders: true,
    insiderRows: [true, true] as boolean[],
  });
  const [streamedWords, setStreamedWords] = useState(narrativeWords.length);

  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [displayedScores, setDisplayedScores] = useState(signalBars.map(s => s.score));
  const [displayedMetrics, setDisplayedMetrics] = useState(valuationMetrics.map(m => m.value));

  // Set initial bar widths via GSAP so React re-renders don't interfere
  useEffect(() => {
    barRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { width: `${signalBars[i].score}%` });
    });
  }, []);

  const playAnimation = useCallback(async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Reset everything hidden
    setShow({
      header: false,
      signals: false,
      metrics: [false, false, false, false, false, false],
      insiders: false,
      insiderRows: [false, false],
    });
    setStreamedWords(0);

    // Reset bar widths, scores, and metric values
    barRefs.current.forEach(el => { if (el) gsap.set(el, { width: '0%' }); });
    setDisplayedScores([0, 0, 0]);
    setDisplayedMetrics(['—', '—', '—', '—', '—', '—']);

    await new Promise(r => setTimeout(r, 400));

    // Phase 1: Header slides down
    setShow(prev => ({ ...prev, header: true }));
    await new Promise(r => setTimeout(r, 500));

    // Phase 2: Signal bars panel slides in from left, bars fill with GSAP
    setShow(prev => ({ ...prev, signals: true }));
    await new Promise(r => setTimeout(r, 300));

    for (let i = 0; i < signalBars.length; i++) {
      const bar = barRefs.current[i];
      if (bar) gsap.to(bar, { width: `${signalBars[i].score}%`, duration: 0.8, ease: 'power2.out' });
      const idx = i;
      gsap.to({ val: 0 }, {
        val: signalBars[idx].score,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate() {
          const v = Math.round(this.targets()[0].val);
          setDisplayedScores(prev => { const next = [...prev]; next[idx] = v; return next; });
        },
      });
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 300));

    // Phase 3: Metric tiles pop in staggered with value count-up
    for (let i = 0; i < valuationMetrics.length; i++) {
      await new Promise(r => setTimeout(r, 120));
      setShow(prev => {
        const metrics = [...prev.metrics];
        metrics[i] = true;
        return { ...prev, metrics };
      });
      const m = valuationMetrics[i];
      const idx = i;
      gsap.to({ val: 0 }, {
        val: m.numVal,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate() {
          const v = this.targets()[0].val.toFixed(m.decimals) + m.suffix;
          setDisplayedMetrics(prev => { const next = [...prev]; next[idx] = v; return next; });
        },
      });
    }
    await new Promise(r => setTimeout(r, 400));

    // Phase 4: Insider panel + rows stagger in
    setShow(prev => ({ ...prev, insiders: true }));
    await new Promise(r => setTimeout(r, 300));
    for (let i = 0; i < insiderDeals.length; i++) {
      await new Promise(r => setTimeout(r, 200));
      setShow(prev => {
        const insiderRows = [...prev.insiderRows];
        insiderRows[i] = true;
        return { ...prev, insiderRows };
      });
    }
    await new Promise(r => setTimeout(r, 500));

    // Phase 5: Stream AI text word-by-word
    for (let i = 1; i <= narrativeWords.length; i++) {
      await new Promise(r => setTimeout(r, 50));
      setStreamedWords(i);
    }

    setIsPlaying(false);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-start gap-5">
      {/* Frame label */}
      <div className="space-y-1 max-w-[620px]">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Frame 2
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:42 – 0:50
          </span>
          <button
            onClick={playAnimation}
            className="rounded-full px-3 py-1 text-[10px] font-mono tracking-wide uppercase transition-colors hover:opacity-80 cursor-pointer"
            style={{
              background: isPlaying ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.85)',
              color: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {isPlaying ? '● Playing...' : '▶ Play'}
          </button>
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          Deep Dive — OXY
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-[560px]">
          Filing scan converges on Occidental Petroleum. Cheap valuation, Permian cash flow, Berkshire accumulating.
        </p>
      </div>

      {/* ===== FLOATING PANELS — each section animates independently ===== */}
      <div className="w-[860px] flex flex-col gap-3">

        {/* Panel 1: Header — ticker + company + filing badges */}
        <motion.div
          animate={{ opacity: show.header ? 1 : 0, y: show.header ? 0 : -16, scale: show.header ? 1 : 0.97 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="rounded-[24px] px-6 py-5 flex items-center justify-between gap-4"
          style={panelStyle}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-[38px] font-semibold tracking-tight text-white leading-none">
              OXY
            </h3>
            <div>
              <p className="text-[14px] text-white/80 tracking-tight">Occidental Petroleum</p>
              <p className="text-[11px] text-white/35 mt-0.5">NYSE · Oil & Gas · Permian Basin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em]"
              style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
              10-K
            </span>
            <span className="rounded-full px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em]"
              style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>
              13-F
            </span>
            <span className="rounded-full px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em]"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
              Form 4
            </span>
          </div>
        </motion.div>

        {/* Panel 2 + 3: Signal bars LEFT + Metric tiles RIGHT */}
        <div className="grid grid-cols-[240px_1fr] gap-3">
          {/* Signal strength bars */}
          <motion.div
            animate={{ opacity: show.signals ? 1 : 0, x: show.signals ? 0 : -24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-[24px] px-5 py-5"
            style={panelStyle}
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 mb-5">
              Signal Strength
            </p>
            <div className="space-y-4">
              {signalBars.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white/50">{s.label}</span>
                    <span className="text-[10px] font-mono" style={{ color: s.accent }}>
                      {displayedScores[i]}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      ref={el => { barRefs.current[i] = el; }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${s.accent}55, ${s.accent})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metric tiles — each pops in independently */}
          <div className="grid grid-cols-3 gap-3">
            {valuationMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                animate={{
                  opacity: show.metrics[i] ? 1 : 0,
                  scale: show.metrics[i] ? 1 : 0.85,
                  y: show.metrics[i] ? 0 : 12,
                }}
                transition={{ type: 'spring', damping: 16, stiffness: 300 }}
                className="rounded-[20px] px-4 py-4"
                style={panelStyle}
              >
                <p className="text-[8px] font-mono uppercase tracking-[0.22em] text-white/34">
                  {m.label}
                </p>
                <p className="text-[26px] font-semibold tracking-tight mt-2" style={{ color: m.accent }}>
                  {displayedMetrics[i]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Panel 4: Insider activity */}
        <motion.div
          animate={{ opacity: show.insiders ? 1 : 0, y: show.insiders ? 0 : 16 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[24px] px-5 py-5"
          style={panelStyle}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: '#f59e0b' }}>
              Recent Insider Purchases
            </p>
            <span className="rounded-full px-2.5 py-1 text-[8px] font-mono uppercase tracking-[0.18em]"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}>
              EDGAR Form 4
            </span>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-3 pb-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['Name', 'Role', 'Action', 'Shares', 'Price'].map(h => (
              <p key={h} className="text-[8px] font-mono uppercase tracking-[0.18em] text-white/28">{h}</p>
            ))}
          </div>

          {/* Transaction rows — staggered */}
          {insiderDeals.map((deal, i) => (
            <motion.div
              key={i}
              animate={{ opacity: show.insiderRows[i] ? 1 : 0, x: show.insiderRows[i] ? 0 : 20 }}
              transition={{ type: 'spring', damping: 18, stiffness: 300 }}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-3 py-3 items-center"
              style={{ borderBottom: i < insiderDeals.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
            >
              <div>
                <p className="text-[12px] text-white leading-snug">{deal.who}</p>
              </div>
              <p className="text-[11px] text-white/50">{deal.role}</p>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(52,211,153,0.14)', color: '#34d399' }}>
                {deal.action}
              </span>
              <p className="text-[12px] text-white font-mono">{deal.shares}</p>
              <p className="text-[12px] text-white/60 font-mono">{deal.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Streamed AI text — word-by-word */}
      <div className="w-[860px] mt-1">
        <p className="text-[16px] leading-relaxed font-light">
          {narrativeWords.map((item, i) => (
            <motion.span
              key={i}
              animate={{ opacity: i < streamedWords ? 1 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ color: item.color, display: 'inline' }}
            >
              {item.word}{' '}
            </motion.span>
          ))}
        </p>
      </div>

      {/* VFX + VO notes */}
      <div className="space-y-2" style={{ width: 860 }}>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> No outer card — floating panels 
            assemble independently. Header slides down, signal bars fill left-to-right with GSAP 
            count-up, metric tiles pop in staggered, insider rows slide in. AI text streams word-by-word.
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "Looks like oil producer OXY is the strongest candidate here.
            Insiders are buying heavily and the valuation is cheap for what you're getting.
            Let me run the technicals and options data next."
          </p>
        </div>
      </div>
    </div>
  );
}
