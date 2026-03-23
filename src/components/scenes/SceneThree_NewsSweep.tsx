/**
 * Scene 3 — News Sweep
 * 
 * Multiple frames:
 * Frame 1: Streamed AI text — "Let me analyze the news for you..."
 * Frame 2: Source scanner component (Bloomberg, Reddit, X, CNN) with rotating status text
 * Frame 3: Scanner transforms into mini dashboard + streamed AI findings text
 * 
 * No black card backgrounds — elements float on the canvas.
 * Inner row cards get a subtle transparent dark bg only.
 * This entire section has voiceover.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import bloombergLogo from '../../assets/bloomberg.png';
import cnnLogo from '../../assets/cnn.png';
import StraitOfHormuzMap from './StraitOfHormuzMap';

const sourceTexts: string[][] = [
  ['Reading about U.S.-Iran military escalation', 'Parsing oil supply chain disruption', 'Analyzing sanctions timeline'],
  ['Scanning oil futures, defense stocks, sanctions', 'Reading r/wallstreetbets sentiment', 'Parsing geopolitical risk threads'],
  ['Scanning Strait of Hormuz, crude oil, Pentagon', 'Reading defense sector tweets', 'Parsing energy analyst takes'],
  ['Extracting geopolitical risk signals', 'Parsing breaking news coverage', 'Analyzing global market reaction'],
];

// different rotation speeds per row (ms)
const rotationSpeeds = [1600, 2000, 1800, 2200];

const findingsSegments = [
  {
    text: "Okay, this is a major escalation in the conflict. Closing the Strait means 20% of the world's oil supply disintegrated overnight.",
    color: '#1a1a2e',
  },
  {
    text: "We should probably look towards energy and defense as possible sectors to invest in.",
    color: 'rgba(26,26,46,0.6)',
  },
  {
    text: "Let me analyze the SEC filings to get a better picture on this.",
    color: 'rgba(26,26,46,0.35)',
  },
];

const findingsWords = findingsSegments.flatMap(seg =>
  seg.text.split(' ').map(word => ({ word, color: seg.color }))
);

const introText = `Wow, that's huge. Let me search the latest news and figure out what's going on.`;

function SourceIcon({ idx }: { idx: number }) {
  if (idx === 0) return <img src={bloombergLogo} alt="Bloomberg" className="w-7 h-7 rounded-md object-cover shrink-0" />;
  if (idx === 1) return (
    <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: '#FF4500' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    </div>
  );
  if (idx === 2) return (
    <div className="w-7 h-7 rounded-md bg-black flex items-center justify-center shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
  );
  return <img src={cnnLogo} alt="CNN" className="w-7 h-7 rounded-md object-cover shrink-0" />;
}

export default function SceneThree_NewsSweep() {
  const words = introText.split(' ');
  const [visibleWords, setVisibleWords] = useState(words.length);
  const [rowsVisible, setRowsVisible] = useState(true);
  const [completedRows, setCompletedRows] = useState(4);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [f1TransitionMsg, setF1TransitionMsg] = useState(false);
  const [statusIndices, setStatusIndices] = useState([0, 0, 0, 0]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  // — Frame 2 animation state —
  const [f2Playing, setF2Playing] = useState(false);
  const [f2Instant, setF2Instant] = useState(false);
  const [f2Show, setF2Show] = useState({
    header: true, keySignals: true,
    map: true, cards: [true, true, true], tickers: true,
  });
  const [f2StreamedWords, setF2StreamedWords] = useState(findingsWords.length);
  const barGreenRef = useRef<HTMLDivElement>(null);
  const barAmberRef = useRef<HTMLDivElement>(null);
  const barRedRef = useRef<HTMLDivElement>(null);

  // — Frame 2 micro-animation state —
  const [f2ShowBadges, setF2ShowBadges] = useState({ critical: true, closed: true });
  const [f2ShowPills, setF2ShowPills] = useState([true, true, true]);
  const [f2TickerGroups, setF2TickerGroups] = useState([true, true, true]);
  const countBullishRef = useRef<HTMLSpanElement>(null);
  const countCautiousRef = useRef<HTMLSpanElement>(null);
  const countBearishRef = useRef<HTMLSpanElement>(null);
  const countSourcesRef = useRef<HTMLSpanElement>(null);

  const clearAllIntervals = useCallback(() => {
    intervals.current.forEach(clearInterval);
    intervals.current = [];
  }, []);

  const playAnimation = useCallback(async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setVisibleWords(0);
    setRowsVisible(false);
    setCompletedRows(0);
    setHeaderVisible(false);
    setStatusIndices([0, 0, 0, 0]);
    clearAllIntervals();

    // stream words
    for (let i = 1; i <= words.length; i++) {
      await new Promise((r) => setTimeout(r, 100));
      setVisibleWords(i);
    }

    await new Promise((r) => setTimeout(r, 400));

    // show header + all 4 rows at once
    setHeaderVisible(true);
    await new Promise((r) => setTimeout(r, 200));
    setRowsVisible(true);

    // start rotating each row's text at different speeds
    for (let idx = 0; idx < 4; idx++) {
      const id = setInterval(() => {
        setStatusIndices((prev) => {
          const next = [...prev];
          next[idx] = (next[idx] + 1) % 3;
          return next;
        });
      }, rotationSpeeds[idx]);
      intervals.current.push(id);
    }

    // let them all rotate for ~5s
    await new Promise((r) => setTimeout(r, 5000));

    // stop all rotations
    clearAllIntervals();

    // checkmarks appear sequentially top-down
    for (let i = 1; i <= 4; i++) {
      await new Promise((r) => setTimeout(r, 350));
      setCompletedRows(i);
    }

    // rows disappear, brief transition message, then restore
    await new Promise((r) => setTimeout(r, 600));
    setRowsVisible(false);
    setHeaderVisible(false);
    await new Promise((r) => setTimeout(r, 300));
    setF1TransitionMsg(true);
    await new Promise((r) => setTimeout(r, 1000));
    setF1TransitionMsg(false);
    setHeaderVisible(true);
    setRowsVisible(true);
    setCompletedRows(4);

    setIsPlaying(false);
  }, [isPlaying, words.length, clearAllIntervals]);

  useEffect(() => {
    return () => clearAllIntervals();
  }, [clearAllIntervals]);

  const playFrame2 = useCallback(async () => {
    if (f2Playing) return;
    setF2Playing(true);

    // Instant hide — no exit animation
    setF2Instant(true);
    setF2Show({
      header: false, keySignals: false,
      map: false, cards: [false, false, false], tickers: false,
    });
    setF2StreamedWords(0);
    setF2ShowBadges({ critical: false, closed: false });
    setF2ShowPills([false, false, false]);
    setF2TickerGroups([false, false, false]);

    // Reset bar widths + counter text
    if (barGreenRef.current) barGreenRef.current.style.width = '0%';
    if (barAmberRef.current) barAmberRef.current.style.width = '0%';
    if (barRedRef.current) barRedRef.current.style.width = '0%';
    if (countBullishRef.current) countBullishRef.current.textContent = '0%';
    if (countCautiousRef.current) countCautiousRef.current.textContent = '0%';
    if (countBearishRef.current) countBearishRef.current.textContent = '0%';
    if (countSourcesRef.current) countSourcesRef.current.textContent = '0';

    // Wait one frame so Framer applies instant hide, then re-enable transitions
    await new Promise(r => setTimeout(r, 50));
    setF2Instant(false);
    await new Promise(r => setTimeout(r, 350));

    // Phase 1: Header fades in (bars at 0, no badge yet)
    setF2Show(prev => ({ ...prev, header: true }));
    await new Promise(r => setTimeout(r, 300));

    // Phase 1.5: CRITICAL badge scales in
    setF2ShowBadges(prev => ({ ...prev, critical: true }));
    await new Promise(r => setTimeout(r, 300));

    // Phase 2: Bars fill + numbers count up simultaneously
    const counter = { b: 0, c: 0, r: 0, s: 0 };
    gsap.to(barGreenRef.current, { width: '65%', duration: 0.8, ease: 'power2.out' });
    gsap.to(barAmberRef.current, { width: '20%', duration: 0.8, ease: 'power2.out', delay: 0.15 });
    gsap.to(barRedRef.current, { width: '15%', duration: 0.8, ease: 'power2.out', delay: 0.3 });
    gsap.to(counter, {
      b: 65, c: 20, r: 15, s: 1240,
      duration: 1.2, ease: 'power2.out',
      onUpdate: () => {
        if (countBullishRef.current) countBullishRef.current.textContent = `${Math.round(counter.b)}%`;
        if (countCautiousRef.current) countCautiousRef.current.textContent = `${Math.round(counter.c)}%`;
        if (countBearishRef.current) countBearishRef.current.textContent = `${Math.round(counter.r)}%`;
        if (countSourcesRef.current) countSourcesRef.current.textContent = Math.round(counter.s).toLocaleString();
      },
    });
    await new Promise(r => setTimeout(r, 1400));

    // Phase 3: Key signals fade in
    setF2Show(prev => ({ ...prev, keySignals: true }));
    await new Promise(r => setTimeout(r, 400));

    // Phase 4: Map slides in from left + CLOSED badge
    setF2Show(prev => ({ ...prev, map: true }));
    await new Promise(r => setTimeout(r, 300));
    setF2ShowBadges(prev => ({ ...prev, closed: true }));
    await new Promise(r => setTimeout(r, 200));

    // Phase 5: Source cards slide in + sentiment pills pop in
    for (let i = 0; i < 3; i++) {
      await new Promise(r => setTimeout(r, 150));
      setF2Show(prev => {
        const cards = [...prev.cards];
        cards[i] = true;
        return { ...prev, cards };
      });
      // Pill pops in 250ms after its card
      setTimeout(() => {
        setF2ShowPills(prev => {
          const next = [...prev] as boolean[];
          next[i] = true;
          return next;
        });
      }, 250);
    }
    await new Promise(r => setTimeout(r, 500));

    // Phase 6: Tickers container slides up, then groups appear staggered
    setF2Show(prev => ({ ...prev, tickers: true }));
    await new Promise(r => setTimeout(r, 200));
    for (let i = 0; i < 3; i++) {
      await new Promise(r => setTimeout(r, 200));
      setF2TickerGroups(prev => {
        const next = [...prev] as boolean[];
        next[i] = true;
        return next;
      });
    }
    await new Promise(r => setTimeout(r, 400));

    // Phase 7: Stream findings text word-by-word
    for (let i = 1; i <= findingsWords.length; i++) {
      await new Promise(r => setTimeout(r, 55));
      setF2StreamedWords(i);
    }

    setF2Playing(false);
  }, [f2Playing]);

  // Helper: when f2Instant is true, all Frame 2 transitions are instant (no exit animation)
  const f2t = (normal: Record<string, unknown>) => f2Instant ? { duration: 0 } : normal;

  return (
    <div className="flex flex-col items-start gap-10">
      {/* Scene label */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Frame 3
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:30 – 0:40
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
          News Sweep — Xynth Analyzes
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
          Xynth speaks + streams text, scans sources, builds a findings dashboard. 
          Multiple frames — left to right.
        </p>
      </div>

      {/* ===== FRAMES — horizontal flow ===== */}
      <div className="flex items-start gap-12">

        {/* ——— FRAME 1: AI text on top + source scanner below ——— */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300">
            Frame 1 — Scanning
          </span>

          {/* Streamed AI intro text */}
          <div className="w-[480px]">
            <p className="text-[20px] leading-relaxed font-light text-zinc-800">
              {words.map((word, i) => {
                let color: string;
                if (i < 7) color = '#1a1a2e';
                else if (i < 13) color = 'rgba(26,26,46,0.55)';
                else color = 'rgba(26,26,46,0.25)';
                return (
                  <motion.span
                    key={i}
                    animate={{ opacity: i < visibleWords ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ color, display: 'inline' }}
                  >
                    {word}{' '}
                  </motion.span>
                );
              })}
            </p>
          </div>

          {/* Source scanner */}
          {f1TransitionMsg ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-[480px] flex items-center justify-center py-14"
            >
              <span className="text-zinc-400 text-[13px] font-mono tracking-wide animate-pulse">
                → Dashboard animation builds in...
              </span>
            </motion.div>
          ) : (
          <div className="w-[480px] space-y-3">
            <motion.div
              className="flex items-center justify-between px-1"
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <span className="text-[14px] font-semibold text-zinc-700">Scanning Live Sources</span>
              <span className="text-[11px] font-mono text-zinc-400">{completedRows}/4</span>
            </motion.div>

            <div className="space-y-2">
              {[0, 1, 2, 3].map((idx) => {
                const isDone = idx < completedRows;
                return (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl"
                    style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
                    animate={{ opacity: rowsVisible ? 1 : 0, x: rowsVisible ? 0 : -60 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 180, delay: rowsVisible ? idx * 0.08 : 0 }}
                  >
                    <SourceIcon idx={idx} />
                    <div className="flex-1 min-w-0 overflow-hidden" style={{ height: 20 }}>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={statusIndices[idx]}
                          className="text-[13px] text-white truncate"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          {sourceTexts[idx][statusIndices[idx]]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    {rowsVisible && (
                      isDone ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                          className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-white animate-spin shrink-0" />
                      )
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
          )}

          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[480px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VFX:</span> Text streams in word-by-word on top. As each source name lands 
              ("Bloomberg", "X", "Reddit", "CNN"), the matching scanner row slides in from the left with a soft fade. 
              Spinner starts on each row the moment it appears. 
            </p>
          </div>
          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[480px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth (calm, confident): 
              "Wow, that's huge. Let me search the latest news and figure out what's going on."
            </p>
          </div>
        </div>

        {/* ——— Connector ——— */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center">
          <div className="w-20 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[9px] font-mono mt-1.5 text-center leading-tight">
            replaces the<br />scanner rows →
          </span>
        </div>

        {/* ——— FRAME 2: Findings — map left, source cards right, tickers below ——— */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300">
              Frame 2 — Findings
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

          {/* ── Header: News & Social Sentiment + consensus bar ── */}
          <motion.div
            animate={{ opacity: f2Show.header ? 1 : 0, y: f2Show.header ? 0 : -10 }}
            transition={f2t({ duration: 0.4, ease: 'easeOut' })}
            className="w-[740px] rounded-xl px-5 py-4"
            style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-[14px] font-semibold tracking-tight">News & Social Sentiment</span>
              </div>
              <motion.span
                animate={{ opacity: f2ShowBadges.critical ? 1 : 0, scale: f2ShowBadges.critical ? 1 : 0.5 }}
                transition={f2t({ type: 'spring', damping: 15, stiffness: 300 })}
                className="text-red-400 text-[11px] font-mono font-semibold"
              >CRITICAL</motion.span>
            </div>
            {/* Consensus bar — GSAP animated */}
            <div className="flex h-3 rounded-full overflow-hidden mb-2.5">
              <div ref={barGreenRef} className="h-full bg-emerald-500" style={{ width: '65%' }} />
              <div ref={barAmberRef} className="h-full bg-amber-400" style={{ width: '20%' }} />
              <div ref={barRedRef} className="h-full bg-red-500" style={{ width: '15%' }} />
            </div>
            <div className="flex items-center gap-5 text-[10px] font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-white/50"><span ref={countBullishRef}>65%</span> Bullish</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-white/50"><span ref={countCautiousRef}>20%</span> Cautious</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-white/50"><span ref={countBearishRef}>15%</span> Bearish</span>
              </div>
              <span className="text-white/25 ml-auto text-[9px]"><span ref={countSourcesRef}>1,240</span> sources analyzed</span>
            </div>
            {/* Key signals */}
            <motion.div
              animate={{ opacity: f2Show.keySignals ? 1 : 0 }}
              transition={f2t({ duration: 0.3 })}
              className="flex gap-4 mt-3 pt-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-white/40 text-[10px] leading-relaxed">
                <span className="text-red-400 font-semibold">Key:</span>{' '}
                Strait of Hormuz closed · Oil surging +12% · Ship traffic near zero · Defense and energy rallying hard
              </p>
            </motion.div>
          </motion.div>

          {/* ── Two columns: map LEFT, source cards RIGHT (same height) ── */}
          <div className="flex items-stretch gap-4">

            {/* LEFT — Strait of Hormuz map */}
            <motion.div
              animate={{ opacity: f2Show.map ? 1 : 0, x: f2Show.map ? 0 : -30 }}
              transition={f2t({ duration: 0.5, ease: 'easeOut' })}
              className="w-[380px] rounded-xl overflow-hidden flex flex-col"
              style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Chokepoint Analysis</span>
                <motion.div
                  animate={{ opacity: f2ShowBadges.closed ? 1 : 0, scale: f2ShowBadges.closed ? 1 : 0.5 }}
                  transition={f2t({ type: 'spring', damping: 15, stiffness: 300 })}
                  className="flex items-center gap-1.5"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-[10px] font-mono font-semibold">CLOSED</span>
                </motion.div>
              </div>
              <div className="px-3 pt-3 pb-2 flex-1">
                <StraitOfHormuzMap />
              </div>
              <div className="px-4 pb-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-[3px] rounded-full" style={{ background: 'rgba(245,158,11,0.5)' }} />
                  <span className="text-white/30 text-[9px] font-mono">Shipping lanes</span>
                </div>
                <span className="text-white/20 text-[9px]">·</span>
                <span className="text-red-400/60 text-[10px] font-mono">20% of global oil · transit halted</span>
              </div>
            </motion.div>

            {/* RIGHT — Source insight cards */}
            <div className="flex flex-col gap-3 w-[350px]">

              {/* News (Bloomberg + CNN merged) */}
              <motion.div
                animate={{ opacity: f2Show.cards[0] ? 1 : 0, x: f2Show.cards[0] ? 0 : 30 }}
                transition={f2t({ duration: 0.4, ease: 'easeOut' })}
                className="flex-1 rounded-xl px-5 py-4"
                style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <SourceIcon idx={0} />
                    <SourceIcon idx={3} />
                  </div>
                  <span className="text-white text-[13px] font-semibold">News</span>
                  <motion.span
                    animate={{ opacity: f2ShowPills[0] ? 1 : 0, scale: f2ShowPills[0] ? 1 : 0 }}
                    transition={f2t({ type: 'spring', damping: 12, stiffness: 300 })}
                    className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 ml-auto"
                  >Bullish</motion.span>
                </div>
                <p className="text-white/50 text-[12px] leading-relaxed">
                  Oil surged +12% to $75. Brent heading to $84. Maersk halted all Hormuz transit. Aramco refinery hit.
                </p>
              </motion.div>

              {/* Reddit */}
              <motion.div
                animate={{ opacity: f2Show.cards[1] ? 1 : 0, x: f2Show.cards[1] ? 0 : 30 }}
                transition={f2t({ duration: 0.4, ease: 'easeOut' })}
                className="flex-1 rounded-xl px-5 py-4"
                style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <SourceIcon idx={1} />
                  <span className="text-white text-[13px] font-semibold">Reddit</span>
                  <motion.span
                    animate={{ opacity: f2ShowPills[1] ? 1 : 0, scale: f2ShowPills[1] ? 1 : 0 }}
                    transition={f2t({ type: 'spring', damping: 12, stiffness: 300 })}
                    className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 ml-auto"
                  >Bullish</motion.span>
                </div>
                <p className="text-white/50 text-[12px] leading-relaxed">
                  r/oil calling it the worst energy crisis in history. Loading energy and defense plays.
                </p>
              </motion.div>

              {/* X */}
              <motion.div
                animate={{ opacity: f2Show.cards[2] ? 1 : 0, x: f2Show.cards[2] ? 0 : 30 }}
                transition={f2t({ duration: 0.4, ease: 'easeOut' })}
                className="flex-1 rounded-xl px-5 py-4"
                style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <SourceIcon idx={2} />
                  <span className="text-white text-[13px] font-semibold">X</span>
                  <motion.span
                    animate={{ opacity: f2ShowPills[2] ? 1 : 0, scale: f2ShowPills[2] ? 1 : 0 }}
                    transition={f2t({ type: 'spring', damping: 12, stiffness: 300 })}
                    className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 ml-auto"
                  >Bullish</motion.span>
                </div>
                <p className="text-white/50 text-[12px] leading-relaxed">
                  Brent $115, oil up 25% today trending. Ship traffic through Hormuz collapsing to near zero.
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Tickers identified — full width below both columns ── */}
          <motion.div
            animate={{ opacity: f2Show.tickers ? 1 : 0, y: f2Show.tickers ? 0 : 20 }}
            transition={f2t({ duration: 0.4, ease: 'easeOut' })}
            className="w-[740px] flex items-stretch gap-6 px-6 py-4 rounded-xl"
            style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center w-[80px] shrink-0">
              <p className="text-white/30 text-[11px] font-mono uppercase tracking-[0.2em]">Tickers</p>
            </div>
            <div className="w-px bg-white/5 my-1" />
            <div className="flex-1 grid grid-cols-3 gap-6">
              <motion.div
                animate={{ opacity: f2TickerGroups[0] ? 1 : 0, y: f2TickerGroups[0] ? 0 : 10 }}
                transition={f2t({ duration: 0.3, ease: 'easeOut' })}
                className="flex flex-col justify-center"
              >
                <p className="text-emerald-400/60 text-[9px] font-mono uppercase tracking-widest mb-1">Energy</p>
                <p className="text-white text-[16px] font-semibold tracking-tight">OXY <span className="text-white/40 text-[12px] font-normal ml-1.5">XOM · CVX</span></p>
              </motion.div>
              <motion.div
                animate={{ opacity: f2TickerGroups[1] ? 1 : 0, y: f2TickerGroups[1] ? 0 : 10 }}
                transition={f2t({ duration: 0.3, ease: 'easeOut' })}
                className="flex flex-col justify-center relative"
              >
                <div className="absolute -left-3 top-2 bottom-2 w-px bg-white/5" />
                <p className="text-emerald-400/60 text-[9px] font-mono uppercase tracking-widest mb-1">Defense</p>
                <p className="text-white text-[16px] font-semibold tracking-tight">RTX <span className="text-white/40 text-[12px] font-normal ml-1.5">LMT · NOC</span></p>
              </motion.div>
              <motion.div
                animate={{ opacity: f2TickerGroups[2] ? 1 : 0, y: f2TickerGroups[2] ? 0 : 10 }}
                transition={f2t({ duration: 0.3, ease: 'easeOut' })}
                className="flex flex-col justify-center relative"
              >
                <div className="absolute -left-3 top-2 bottom-2 w-px bg-white/5" />
                <p className="text-emerald-400/60 text-[9px] font-mono uppercase tracking-widest mb-1">Safe Haven</p>
                <p className="text-white text-[16px] font-semibold tracking-tight">GLD <span className="text-white/40 text-[12px] font-normal ml-1.5">SLV</span></p>
              </motion.div>
            </div>
          </motion.div>

          {/* Streamed AI findings text — word-by-word */}
          <div className="w-[740px] mt-1">
            <p className="text-[17px] leading-relaxed font-light">
              {findingsWords.map((item, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < f2StreamedWords ? 1 : 0 }}
                  transition={f2t({ duration: 0.2, ease: 'easeOut' })}
                  style={{ color: item.color, display: 'inline' }}
                >
                  {item.word}{' '}
                </motion.span>
              ))}
            </p>
          </div>

          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[740px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VFX:</span> Header fades in → consensus bars fill
              left-to-right with GSAP (green → amber → red). Map slides in from left. Source cards slide in
              from right, staggered. Tickers slide up. AI text streams word-by-word.
            </p>
          </div>
          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[740px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: 
              "Okay, this is a major escalation in the conflict. Closing the Strait means 20% of the world's oil supply disintegrated overnight.
              We should probably look towards energy and defense as possible sectors to invest in.
              Let me analyze the SEC filings to get a better picture on this."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
