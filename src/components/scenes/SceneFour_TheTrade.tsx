import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const panelStyle = {
  background: 'linear-gradient(180deg, rgba(39,39,42,0.84) 0%, rgba(24,24,27,0.92) 100%)',
  backdropFilter: 'blur(22px)',
  boxShadow: '0 20px 56px rgba(0,0,0,0.26)',
  border: '1px solid rgba(255,255,255,0.06)',
} as const;

const introText = "Alright now I need to find the actual trade. Let me pull up OXY's options chain and find the right strike";
const introWords = introText.split(' ');

const transitionText = "The 60 call for April 5th seems like the best option. The strike and expiration align with what we saw earlier from our analysis. Let me build this trade for you.";
const transitionWords = transitionText.split(' ');

type ChainRow = {
  strike: number
  bid: string
  ask: string
  last: string
  vol: string
  oi: string
  iv: string
  highlight?: 'sell' | 'buy'
}

const callChain: ChainRow[] = [
  { strike: 55, bid: '8.10', ask: '8.30', last: '8.20', vol: '180', oi: '920', iv: '42.5%' },
  { strike: 56, bid: '7.20', ask: '7.40', last: '7.30', vol: '240', oi: '1.1K', iv: '41.2%' },
  { strike: 57, bid: '6.30', ask: '6.50', last: '6.40', vol: '320', oi: '1.4K', iv: '40.1%' },
  { strike: 58, bid: '5.40', ask: '5.60', last: '5.50', vol: '480', oi: '1.9K', iv: '39.3%' },
  { strike: 59, bid: '4.55', ask: '4.70', last: '4.62', vol: '620', oi: '2.6K', iv: '38.6%' },
  { strike: 60, bid: '3.20', ask: '3.35', last: '3.28', vol: '4.1K', oi: '9.2K', iv: '38.2%', highlight: 'buy' },
  { strike: 61, bid: '2.50', ask: '2.65', last: '2.58', vol: '680', oi: '2.4K', iv: '36.8%' },
  { strike: 62, bid: '1.85', ask: '1.98', last: '1.90', vol: '1.1K', oi: '3.6K', iv: '35.4%' },
  { strike: 63, bid: '1.30', ask: '1.42', last: '1.35', vol: '1.4K', oi: '4.2K', iv: '34.1%' },
  { strike: 64, bid: '0.88', ask: '0.98', last: '0.92', vol: '1.8K', oi: '5.1K', iv: '33.0%' },
  { strike: 65, bid: '0.55', ask: '0.65', last: '0.60', vol: '3.2K', oi: '8.6K', iv: '32.1%' },
]

const expiries = ['Mar 29', 'Apr 5', 'Apr 19', 'May 17', 'Jun 21']

const conclusionText = "Your trade is good to go! Ready to make some money?";
const conclusionWords = conclusionText.split(' ');


export default function SceneFour_TheTrade() {
  // Frame 1 animation state
  const [f1Playing, setF1Playing] = useState(false);
  const [visibleWords, setVisibleWords] = useState(introWords.length);
  const [chainVisible, setChainVisible] = useState(true);
  const [visibleRows, setVisibleRows] = useState(callChain.length);
  const [scannerRow, setScannerRow] = useState(-1);
  const [selectedRow, setSelectedRow] = useState(5); // index of 60C (middle)
  const [bottomVisible, setBottomVisible] = useState(true);
  const [transitionVisible, setTransitionVisible] = useState(true);
  const [streamedWords, setStreamedWords] = useState(transitionWords.length);

  const playFrame1 = useCallback(async () => {
    if (f1Playing) return;
    setF1Playing(true);

    // Reset
    setVisibleWords(0);
    setChainVisible(false);
    setVisibleRows(0);
    setScannerRow(-1);
    setSelectedRow(-1);
    setBottomVisible(false);
    setTransitionVisible(false);
    setStreamedWords(0);

    await new Promise(r => setTimeout(r, 200));

    // Phase 1: Stream intro text
    for (let i = 1; i <= introWords.length; i++) {
      await new Promise(r => setTimeout(r, 55));
      setVisibleWords(i);
    }
    await new Promise(r => setTimeout(r, 400));

    // Phase 2: Chain panel fades in
    setChainVisible(true);
    await new Promise(r => setTimeout(r, 400));

    // Phase 3: Rows cascade in
    for (let i = 1; i <= callChain.length; i++) {
      setVisibleRows(i);
      await new Promise(r => setTimeout(r, 60));
    }
    await new Promise(r => setTimeout(r, 300));

    // Phase 4: Scanner sweeps down rows
    for (let i = 0; i < callChain.length; i++) {
      setScannerRow(i);
      await new Promise(r => setTimeout(r, 120));
    }
    // Sweep back up to 60C (index 5)
    for (let i = callChain.length - 1; i >= 5; i--) {
      setScannerRow(i);
      await new Promise(r => setTimeout(r, 100));
    }
    await new Promise(r => setTimeout(r, 200));

    // Phase 5: Lock on 60C
    setScannerRow(-1);
    setSelectedRow(5);
    await new Promise(r => setTimeout(r, 300));

    // Phase 6: Bottom summary
    setBottomVisible(true);
    await new Promise(r => setTimeout(r, 500));

    // Phase 7: Transition text streams
    setTransitionVisible(true);
    for (let i = 1; i <= transitionWords.length; i++) {
      await new Promise(r => setTimeout(r, 50));
      setStreamedWords(i);
    }

    setF1Playing(false);
  }, [f1Playing]);

  // Frame 2 animation state
  const [f2Playing, setF2Playing] = useState(false);
  const [f2TradeVisible, setF2TradeVisible] = useState(true);
  const [f2AskPrice, setF2AskPrice] = useState(3.35);
  const [f2NumbersVisible, setF2NumbersVisible] = useState(true);
  const [f2ButtonVisible, setF2ButtonVisible] = useState(true);
  const [f2ButtonPulse, setF2ButtonPulse] = useState(false);
  const [f2ConclusionVisible, setF2ConclusionVisible] = useState(true);
  const [f2ConclusionWords, setF2ConclusionWords] = useState(conclusionWords.length);

  const playFrame2 = useCallback(async () => {
    if (f2Playing) return;
    setF2Playing(true);

    // Reset
    setF2TradeVisible(false);
    setF2AskPrice(0);
    setF2NumbersVisible(false);
    setF2ButtonVisible(false);
    setF2ButtonPulse(false);
    setF2ConclusionVisible(false);
    setF2ConclusionWords(0);

    await new Promise(r => setTimeout(r, 300));

    // Phase 1: Trade card draws in + ask price counts up
    setF2TradeVisible(true);
    await new Promise(r => setTimeout(r, 200));
    await new Promise<void>(resolve => {
      gsap.to({ val: 0 }, {
        val: 3.35,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate() { setF2AskPrice(parseFloat(this.targets()[0].val.toFixed(2))); },
        onComplete: resolve,
      });
    });
    await new Promise(r => setTimeout(r, 300));

    // Phase 2: Key numbers appear
    setF2NumbersVisible(true);
    await new Promise(r => setTimeout(r, 400));

    // Phase 3: Accept button scales in then pulses
    setF2ButtonVisible(true);
    await new Promise(r => setTimeout(r, 300));
    setF2ButtonPulse(true);
    await new Promise(r => setTimeout(r, 600));
    setF2ButtonPulse(false);
    await new Promise(r => setTimeout(r, 300));

    // Phase 4: Conclusion text streams
    setF2ConclusionVisible(true);
    for (let i = 1; i <= conclusionWords.length; i++) {
      await new Promise(r => setTimeout(r, 50));
      setF2ConclusionWords(i);
    }

    setF2Playing(false);
  }, [f2Playing]);

  return (
    <div className="flex flex-col items-start gap-10">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Scene 4
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            1:20 – 1:35
          </span>
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          The Trade
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
          Xynth fetches the OXY options chain, selects the strike, and delivers the final trade.
        </p>
      </div>

      <div className="flex items-start gap-12">

        {/* ═══ FRAME 1 — Options Chain ═══ */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
              Frame 1
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
              1:20 – 1:30
            </span>
            <button
              onClick={playFrame1}
              className="rounded-full px-3 py-1 text-[10px] font-mono tracking-wide uppercase transition-colors hover:opacity-80 cursor-pointer"
              style={{
                background: f1Playing ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.85)',
                color: '#ffffff',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {f1Playing ? '● Playing...' : '▶ Play'}
            </button>
          </div>
          <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
            Options Chain — OXY
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Xynth pulls up the options chain, scans for the right strike, and locks on the 65 call.
          </p>

          {/* Streaming intro text */}
          <div className="w-[720px]">
            <p className="text-[15px] leading-relaxed font-light">
              {introWords.map((word, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < visibleWords ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ color: i < 8 ? '#1a1a2e' : 'rgba(26,26,46,0.5)', display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Options chain panel */}
          <motion.div
            animate={{ opacity: chainVisible ? 1 : 0, y: chainVisible ? 0 : 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-[720px] rounded-[30px] overflow-hidden"
            style={panelStyle}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[22px] font-bold tracking-tight text-white leading-none">OXY</span>
                <span className="text-[14px] text-white/60">Call Options</span>
              </div>
              <div className="flex items-center gap-1.5">
                {expiries.map((exp) => (
                  <div
                    key={exp}
                    className="rounded-full px-2.5 py-1"
                    style={{
                      background: exp === 'Apr 5' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                      border: exp === 'Apr 5' ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span
                      className="text-[9px] font-mono tracking-wide"
                      style={{ color: exp === 'Apr 5' ? '#c7d2fe' : 'rgba(255,255,255,0.4)' }}
                    >
                      {exp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column headers */}
            <div
              className="grid px-6 py-2.5"
              style={{
                gridTemplateColumns: '56px 1fr 1fr 1fr 1fr 1fr 1fr',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {['Strike', 'Bid', 'Ask', 'Last', 'Vol', 'OI', 'IV'].map((h) => (
                <span key={h} className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/25 text-right first:text-left">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="px-2">
              {callChain.map((row, idx) => {
                const isSelected = idx === selectedRow;
                const isScanning = idx === scannerRow;
                const isVisible = idx < visibleRows;

                return (
                  <motion.div
                    key={row.strike}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      y: isVisible ? 0 : 8,
                    }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="grid px-4 py-2 rounded-xl mx-0 my-0.5"
                    style={{
                      gridTemplateColumns: '56px 1fr 1fr 1fr 1fr 1fr 1fr',
                      background: isSelected
                        ? 'rgba(52,211,153,0.08)'
                        : isScanning
                          ? 'rgba(255,255,255,0.04)'
                          : 'transparent',
                      border: isSelected
                        ? '1px solid rgba(52,211,153,0.25)'
                        : '1px solid transparent',
                      boxShadow: isScanning && !isSelected
                        ? '0 0 10px rgba(255,255,255,0.06), inset 0 0 6px rgba(255,255,255,0.03)'
                        : isSelected
                          ? '0 0 16px rgba(52,211,153,0.2), inset 0 0 8px rgba(52,211,153,0.06)'
                          : 'none',
                      transition: 'background 0.1s, border 0.1s, box-shadow 0.15s',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[12px] font-mono font-semibold"
                        style={{ color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
                      >
                        {row.strike}
                      </span>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                          className="text-[7px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}
                        >
                          buy
                        </motion.span>
                      )}
                    </div>
                    {[row.bid, row.ask, row.last, row.vol, row.oi, row.iv].map((val, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-right"
                        style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)' }}
                      >
                        {val}
                      </span>
                    ))}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom summary */}
            <motion.div
              animate={{ opacity: bottomVisible ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="px-6 py-3.5 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-[10px] text-white/40">
                Xynth selects the <span style={{ color: '#34d399' }}>60C</span>
              </span>
              <span className="text-[9px] font-mono text-white/25">Apr 5 expiry · 14 DTE</span>
            </motion.div>
          </motion.div>

          {/* Transition text */}
          <motion.div
            animate={{ opacity: transitionVisible ? 1 : 0, y: transitionVisible ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-[720px] mt-1"
          >
            <p className="text-[15px] leading-relaxed font-light">
              {transitionWords.map((word, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < streamedWords ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ color: i < 6 ? '#1a1a2e' : 'rgba(26,26,46,0.5)', display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </motion.div>

          {/* VFX / Voiceover notes */}
          <div className="space-y-2 mt-2" style={{ width: 720 }}>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VFX:</span> Xynth's assistant text streams in word-by-word
                at top. Dark glassmorphic options chain panel fades up from below. 11 rows (strikes 55–65) cascade
                in top-to-bottom with 60ms stagger. A scanner highlight bar sweeps down all rows, reverses back up
                and locks on the 60C row — row flashes green glow, a "BUY" pill springs in via spring animation.
                Bottom summary bar fades in. Transition text then streams word-by-word below the chain.
              </p>
            </div>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VOICEOVER (before visual):</span> Xynth: "Alright now I need to find the actual trade.
                Let me pull up OXY's options chain and find the right strike."
                <br /><br />
                <span className="font-bold text-zinc-600">VOICEOVER (after visual):</span> Xynth: "The 60 call for April 5th seems like the best option.
                The strike and expiration align with what we saw earlier from our analysis. Let me build this trade for you."
              </p>
            </div>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center">
          <div className="w-20 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[9px] font-mono mt-1.5 text-center leading-tight">
            constructs<br />trade →
          </span>
        </div>

        {/* ═══ FRAME 2 — The Final Dashboard ═══ */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
              Frame 2
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
              1:30 – 1:35
            </span>
            <button
              onClick={playFrame2}
              className="rounded-full px-3 py-1 text-[10px] font-mono tracking-wide uppercase transition-colors hover:opacity-80 cursor-pointer"
              style={{
                background: f2Playing ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.85)',
                color: '#ffffff',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {f2Playing ? '● Playing...' : '▶ Play'}
            </button>
          </div>
          <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
            The Dashboard — OXY
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Xynth compresses everything into the final trade card.
          </p>

          {/* Trade card — dark panel only here */}
          <motion.div
            animate={{ opacity: f2TradeVisible ? 1 : 0, y: f2TradeVisible ? 0 : 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-[560px] rounded-[24px] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(39,39,42,0.75) 0%, rgba(24,24,27,0.85) 100%)',
              backdropFilter: 'blur(22px)',
              boxShadow: '0 0 20px rgba(52,211,153,0.2), 0 0 40px rgba(52,211,153,0.08), 0 20px 56px rgba(0,0,0,0.25)',
              border: '2px solid rgba(52,211,153,0.45)',
            }}
          >
            {/* Trade header */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}
                  >
                    buy call
                  </span>
                  <span className="text-[10px] font-mono text-white/30">Apr 5 · 14 DTE</span>
                </div>
                <span className="text-[26px] font-bold text-white tracking-tight">OXY 60C</span>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/25">Ask</p>
                <p className="text-[32px] font-bold tracking-tight leading-none tabular-nums" style={{ color: '#34d399' }}>${f2AskPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Key numbers */}
            <motion.div
              animate={{ opacity: f2NumbersVisible ? 1 : 0, y: f2NumbersVisible ? 0 : 10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-3 gap-px mx-6 mb-5 rounded-[14px] overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { label: 'Breakeven', value: '$63.35', sub: 'strike + premium' },
                { label: 'Max Risk', value: '$335', sub: 'premium paid per contract' },
                { label: 'Max Profit', value: 'Unlimited', sub: 'above breakeven' },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className="px-4 py-3.5"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/25">{m.label}</p>
                  <p className="text-[17px] font-bold tracking-tight mt-1" style={{ color: m.label === 'Max Risk' ? '#f87171' : m.label === 'Max Profit' ? '#34d399' : '#ffffff' }}>{m.value}</p>
                  <p className="text-[8px] text-white/25 mt-0.5">{m.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Accept Trade button — outside the dark panel */}
          <motion.div
            animate={{ opacity: f2ButtonVisible ? 1 : 0, y: f2ButtonVisible ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-[560px]"
          >
            <motion.div
              animate={f2ButtonPulse ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={f2ButtonPulse ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0.3 }}
              className="w-full rounded-[18px] py-4 flex items-center justify-center gap-3 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
                boxShadow: '0 8px 32px rgba(52,211,153,0.3), 0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-[16px] font-bold text-white tracking-tight">Accept Trade</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
            <p className="text-[9px] text-zinc-400 text-center mt-3">Xynth will route this order to your connected broker</p>
          </motion.div>

          {/* Conclusion text — streams AFTER Frame 2 only */}
          <motion.div
            animate={{ opacity: f2ConclusionVisible ? 1 : 0, y: f2ConclusionVisible ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-[560px] mt-1"
          >
            <p className="text-[15px] leading-relaxed font-light">
              {conclusionWords.map((word, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < f2ConclusionWords ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ color: i < 8 ? '#1a1a2e' : 'rgba(26,26,46,0.5)', display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </motion.div>

          {/* VFX / Voiceover notes for Frame 2 */}
          <div className="space-y-2 mt-2" style={{ width: 560 }}>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VFX:</span> Trade card fades up with soft green-glowing
                border (2px, rgba green). Ask price counts up from $0.00 → $3.35 via gsap tween. Key numbers row
                fades in — breakeven white, max risk red, max profit green. Accept Trade button fades up, does one
                gentle scale pulse (1→1.03→1) then settles. Conclusion text streams word-by-word below the card.
              </p>
            </div>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "Your trade is good to go!
                Ready to make some money?"
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
