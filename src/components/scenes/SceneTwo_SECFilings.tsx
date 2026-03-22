/**
 * Scene 2, Frame 1 — SEC Filing Analysis
 *
 * 2×2 grid of document scan panels connected to a minimal center "SEC EDGAR" label.
 * Each panel: real SEC filing text with magnifier highlight + extracted insight cards.
 * Light canvas — no dark backgrounds. Each panel is a full replica of the scan concept.
 */

import { useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

interface DocumentScanPanelHandle {
  playInner: () => Promise<void>;
}

const introText = `Alright pulling SEC filings now. I want to see who's been quietly building positions before this blew up. Insider buys, institutional accumulation, production capacity, new contracts`;

export default function SceneTwo_SECFilings() {
  const words = introText.split(' ');
  const [visibleWords, setVisibleWords] = useState(words.length);
  const [isPlaying, setIsPlaying] = useState(false);

  const hubRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const branch1Ref = useRef<HTMLDivElement>(null);
  const branch2Ref = useRef<HTMLDivElement>(null);
  const branch3Ref = useRef<HTMLDivElement>(null);
  const branch4Ref = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const panel4Ref = useRef<HTMLDivElement>(null);
  const scan1Ref = useRef<DocumentScanPanelHandle>(null);
  const scan2Ref = useRef<DocumentScanPanelHandle>(null);
  const scan3Ref = useRef<DocumentScanPanelHandle>(null);
  const scan4Ref = useRef<DocumentScanPanelHandle>(null);

  const playAnimation = useCallback(async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setVisibleWords(0);

    const branches = [branch1Ref, branch2Ref, branch3Ref, branch4Ref];
    const panels = [panel1Ref, panel2Ref, panel3Ref, panel4Ref];
    const scans = [scan1Ref, scan2Ref, scan3Ref, scan4Ref];

    // Reset everything to hidden
    gsap.set(hubRef.current, { opacity: 0, scale: 0.5 });
    gsap.set(spineRef.current, { height: 0 });
    branches.forEach((ref) => gsap.set(ref.current, { scaleX: 0 }));
    panels.forEach((ref) => gsap.set(ref.current, { opacity: 0, y: 24 }));

    // Phase 1: Stream text word-by-word
    for (let i = 1; i <= words.length; i++) {
      await new Promise((r) => setTimeout(r, 60));
      setVisibleWords(i);
    }

    // Phase 2: Hub appears with spring (starts immediately after text)
    await gsap.to(hubRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' });

    // Phase 3: Spine fills like water through canals — each checkpoint spawns a filing
    const stages = [22, 44, 66, 88];
    for (let i = 0; i < 4; i++) {
      // Spine grows to next branch level
      await gsap.to(spineRef.current, { height: `${stages[i]}%`, duration: 0.3, ease: 'power2.inOut' });
      // Branch + panel appear together (no waiting between them)
      gsap.to(branches[i].current, { scaleX: 1, duration: 0.2, ease: 'power2.out' });
      await gsap.to(panels[i].current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      // Fire inner scan animation (runs in parallel with next spine segment)
      scans[i].current?.playInner();
    }
    // Spine completes to full length
    await gsap.to(spineRef.current, { height: '100%', duration: 0.2, ease: 'power2.out' });

    setIsPlaying(false);
  }, [isPlaying, words.length]);

  return (
    <div className="flex flex-col items-start gap-10">
      {/* Frame label */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Frame 1
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:30 – 0:42
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
          SEC Filing Web — EDGAR Deep Scan
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
          Central spine descends from EDGAR. Filing scans alternate sides,
          each extracting a live insight.
        </p>
      </div>

      {/* Xynth AI streamed text */}
      <div className="w-[620px]">
        <p className="text-[17px] leading-relaxed font-light">
          {words.map((word, i) => {
            let color: string;
            if (i < 27) color = '#1a1a2e';
            else if (i < 33) color = 'rgba(26,26,46,0.55)';
            else color = 'rgba(26,26,46,0.25)';
            return (
              <span
                key={i}
                style={{ color, opacity: i < visibleWords ? 1 : 0, transition: 'opacity 0.25s ease-out', display: 'inline' }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>

      {/* ===== VERTICAL SPINE LAYOUT ===== */}
      <div className="relative" style={{ width: 1000 }}>
        {/* Central spine line */}
        <div
          ref={spineRef}
          className="absolute top-0 pointer-events-none"
          style={{ left: '50%', width: 2, height: '100%', background: 'rgba(113,113,122,0.25)', transform: 'translateX(-50%)' }}
        />

        {/* SEC EDGAR hub — centered at top */}
        <div className="flex justify-center mb-6 relative" style={{ zIndex: 6 }}>
          <div
            ref={hubRef}
            className="rounded-full px-5 py-2.5"
            style={{
              background: 'rgba(40,40,46,0.82)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-2.5 h-2.5">
                <div className="absolute inset-0 rounded-full bg-indigo-500" />
                <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                  SEC EDGAR
                </span>
                <span className="text-[8px] font-mono tracking-wider uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Analyzing filings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filing rows — alternating sides along the spine */}
        <div className="flex flex-col -space-y-44">

          {/* Row 1: 10-K — RIGHT side of spine, insight on RIGHT (outer) */}
          <div className="relative flex items-start">
            <div className="w-1/2" />
            {/* Horizontal branch connector */}
            <div ref={branch1Ref} className="absolute top-[120px]" style={{ left: '50%', width: 32, height: 2, background: 'rgba(113,113,122,0.25)', transformOrigin: 'left center' }} />
            <div ref={panel1Ref} className="w-1/2 pl-10" style={{ transform: 'scale(0.78)', transformOrigin: 'top left' }}>
              <DocumentScanPanel
                ref={scan1Ref}
                insightSide="right"
                filingType="10-K"
                filingColor="#6366f1"
                company="Occidental Petroleum (OXY)"
                documentText={[
                  'PART I — BUSINESS',
                  'Item 1. The Company operates through three segments:',
                  'Oil and Gas, Chemical, and Midstream and Marketing.',
                  'Total proved reserves increased to 3.8 billion BOE.',
                  'Permian Basin production averaged 582,000 BOE/d,',
                  'representing a 12% year-over-year increase driven',
                  'by enhanced recovery techniques and new well completions.',
                  'Item 1A. RISK FACTORS',
                  'Geopolitical disruptions to crude oil supply chains...',
                  'Regional bottlenecks could alter export realization.',
                ]}
                highlightLine={4}
                highlightColor="rgba(99,102,241,0.16)"
                insightLabel="Production Signal"
                insightValue="Permian +12% YoY"
                insightNote="10-K operating disclosure / upstream growth acceleration"
                insightChip="3.8B BOE reserves"
              />
            </div>
          </div>

          {/* Row 2: Form 4 — LEFT side of spine, insight on LEFT (outer) */}
          <div className="relative flex items-start">
            <div className="w-1/2 flex justify-end">
              <div ref={panel2Ref} className="pr-10" style={{ transform: 'scale(0.78)', transformOrigin: 'top right' }}>
              <DocumentScanPanel
                ref={scan2Ref}
                insightSide="left"
                filingType="Form 4"
                filingColor="#f59e0b"
                company="ConocoPhillips (COP)"
                documentText={[
                  'STATEMENT OF CHANGES IN BENEFICIAL OWNERSHIP',
                  'Name: Ryan M. Lance, Chairman & CEO',
                  'Date of Transaction: 2024-03-11',
                  'Transaction Code: P (Purchase)',
                  'Shares Acquired: 52,000 at $118.40',
                  'Total Holdings After Transaction: 1,245,680',
                  'Nature of Ownership: Direct',
                  'Footnote: Open market purchase pursuant to',
                  '10b5-1 trading plan adopted 2024-01-15.',
                  'No concurrent offsetting disposition was reported.',
                ]}
                highlightLine={4}
                highlightColor="rgba(245,158,11,0.16)"
                insightLabel="Insider Signal"
                insightValue="CEO buying +52K"
                insightNote="Form 4 cluster / executive open-market accumulation"
                insightChip="$6.2M purchase"
              />
              </div>
            </div>
            {/* Horizontal branch connector */}
            <div ref={branch2Ref} className="absolute top-[120px]" style={{ right: '50%', width: 32, height: 2, background: 'rgba(113,113,122,0.25)', transformOrigin: 'right center' }} />
            <div className="w-1/2" />
          </div>

          {/* Row 3: 13-F — RIGHT side of spine, insight on RIGHT (outer) */}
          <div className="relative flex items-start">
            <div className="w-1/2" />
            {/* Horizontal branch connector */}
            <div ref={branch3Ref} className="absolute top-[120px]" style={{ left: '50%', width: 32, height: 2, background: 'rgba(113,113,122,0.25)', transformOrigin: 'left center' }} />
            <div ref={panel3Ref} className="w-1/2 pl-10" style={{ transform: 'scale(0.78)', transformOrigin: 'top left' }}>
              <DocumentScanPanel
                ref={scan3Ref}
                insightSide="right"
                filingType="13-F"
                filingColor="#10b981"
                company="Berkshire Hathaway Inc."
                documentText={[
                  'FORM 13F INFORMATION TABLE',
                  'Report for Quarter Ended: 2024-03-31',
                  'Manager: Berkshire Hathaway Inc.',
                  'Occidental Petroleum Corp (OXY)',
                  'Shares: 248,023,456 — Value: $14,881,407 (×1000)',
                  'Change: +12,000,000 shares from prior quarter',
                  'Investment Discretion: SOLE',
                  'Voting Authority: 248,023,456 SOLE',
                  'Filing Accession No: 0001067983-24-000089',
                  'No put offset reported in the table section.',
                ]}
                highlightLine={5}
                highlightColor="rgba(16,185,129,0.16)"
                insightLabel="Institutional Flow"
                insightValue="Berkshire +12M"
                insightNote="13-F quarter-over-quarter increase / position still expanding"
                insightChip="$14.9B total stake"
              />
            </div>
          </div>

          {/* Row 4: 8-K — LEFT side of spine, insight on LEFT (outer) */}
          <div className="relative flex items-start">
            <div className="w-1/2 flex justify-end">
              <div ref={panel4Ref} className="pr-10" style={{ transform: 'scale(0.78)', transformOrigin: 'top right' }}>
              <DocumentScanPanel
                ref={scan4Ref}
                insightSide="left"
                filingType="8-K"
                filingColor="#ef4444"
                company="Cheniere Energy Inc (LNG)"
                documentText={[
                  'CURRENT REPORT — FORM 8-K',
                  'Item 1.01 Entry into Material Contract',
                  'On March 10, 2024, Cheniere Energy Inc.',
                  'entered into a 20-year LNG supply agreement',
                  'with European Energy AG valued at $8.6 billion',
                  'for 2.0 MTPA from Sabine Pass Liquefaction.',
                  'First deliveries expected Q1 2026.',
                  'Item 9.01 Financial Statements and Exhibits',
                  'Exhibit 10.1 — LNG Sale and Purchase Agreement',
                  'Pricing indexed to TTF + Henry Hub blend.',
                ]}
                highlightLine={4}
                highlightColor="rgba(239,68,68,0.16)"
                insightLabel="Event Alert"
                insightValue="$8.6B LNG deal"
                insightNote="8-K material contract / 20-year European energy supply lock-in"
                insightChip="2.0 MTPA capacity"
              />
              </div>
            </div>
            {/* Horizontal branch connector */}
            <div ref={branch4Ref} className="absolute top-[120px]" style={{ right: '50%', width: 32, height: 2, background: 'rgba(113,113,122,0.25)', transformOrigin: 'right center' }} />
            <div className="w-1/2" />
          </div>

        </div>
      </div>

      {/* VFX + VO notes */}
      <div className="space-y-2 mt-4" style={{ width: 700 }}>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> Central spine descends from EDGAR hub.
            Each filing panel drops in alternating sides — right, left, right, left.
            Pulse travels down the spine. Each lens locks onto a highlighted phrase, then the
            insight card slides out on the inner side (between panel and spine).
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth:
            "Scanning SEC filings — 10-K production data, Form 4 insider transactions,
            13-F institutional holdings, and 8-K material events. Cross-referencing to
            see who's been positioning ahead of this."
          </p>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   DocumentScanPanel — reusable document scan replica
   Each one: filing badge, scrolling text, magnifier highlight,
   insight extraction cards with dashed connectors.
   ═══════════════════════════════════════════════════════════ */

const DocumentScanPanel = forwardRef<DocumentScanPanelHandle, {
  filingType: string;
  filingColor: string;
  company: string;
  documentText: string[];
  highlightLine: number;
  highlightColor: string;
  insightLabel: string;
  insightValue: string;
  insightNote: string;
  insightChip: string;
  insightSide?: 'left' | 'right';
}>(function DocumentScanPanel({
  filingType,
  filingColor,
  company,
  documentText,
  highlightLine,
  highlightColor,
  insightLabel,
  insightValue,
  insightNote,
  insightChip,
  insightSide = 'right',
}, ref) {
  const lensSize = 148;
  const lensLeft = 114;
  const lensTop = 42;
  const panelWidth = 372;
  const panelShift = insightSide === 'left' ? 198 : 0;
  const cardLeft = insightSide === 'left' ? 10 : 390;
  const cardTop = 92;
  const lensAbsX = panelShift + lensLeft;
  const anchorX = insightSide === 'left' ? lensAbsX + 10 : lensAbsX + lensSize - 10;
  const anchorY = lensTop + lensSize / 2;
  const connectorMidX = insightSide === 'left' ? anchorX - 28 : anchorX + 28;
  const connectorTurnY = cardTop + 32;
  const connectorEntryX = insightSide === 'left' ? cardLeft + 180 + 18 : cardLeft - 18;
  const focusLines = documentText.slice(
    Math.max(0, highlightLine - 1),
    Math.min(documentText.length, highlightLine + 2),
  );
  const connectorEndX = insightSide === 'left' ? cardLeft + 180 : cardLeft;
  const connectorPath = `M${anchorX} ${anchorY} L${connectorMidX} ${anchorY} L${connectorMidX} ${connectorTurnY} L${connectorEntryX} ${connectorTurnY} L${connectorEndX} ${connectorTurnY}`;

  const scanLineRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const highlightBandRef = useRef<HTMLDivElement>(null);
  const highlightUnderlineRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const insightCardRef = useRef<HTMLDivElement>(null);
  const connectorPathRef = useRef<SVGPathElement>(null);
  const pulseCircleRef = useRef<SVGCircleElement>(null);

  // Hide inner elements on mount via GSAP (not JSX style) so React re-renders don't overwrite
  useEffect(() => {
    gsap.set(highlightBandRef.current, { opacity: 0 });
    gsap.set(highlightUnderlineRef.current, { opacity: 0 });
    gsap.set(scanLineRef.current, { opacity: 0 });
    gsap.set(insightCardRef.current, { opacity: 0 });
    gsap.set(connectorPathRef.current, { strokeDashoffset: 250 });
    gsap.set(pulseCircleRef.current, { opacity: 0 });
  }, []);

  useImperativeHandle(ref, () => ({
    playInner: async () => {
      const highlightBaseY = 16 + highlightLine * 16;
      const magnifierCenterY = lensTop + lensSize / 2;

      // Text starts offset down, scrolls up past magnifier
      const startY = 70;
      const endY = -10;
      const scrollDistance = startY - endY;
      const scrollDuration = 2.2;

      // When does the highlight line pass through the magnifier center?
      const highlightVisualStart = highlightBaseY + startY;
      const distanceToLock = highlightVisualStart - magnifierCenterY;
      const lockFraction = Math.max(0, Math.min(1, distanceToLock / scrollDistance));
      const lockTime = lockFraction * scrollDuration;

      // Reset inner elements
      gsap.set(textBlockRef.current, { y: startY });
      gsap.set(highlightBandRef.current, { opacity: 0, y: startY });
      gsap.set(highlightUnderlineRef.current, { opacity: 0, y: startY });
      gsap.set(scanLineRef.current, { opacity: 0 });
      gsap.set(lensRef.current, { opacity: 1, scale: 1 }); // magnifier always visible
      gsap.set(insightCardRef.current, { opacity: 0, x: insightSide === 'left' ? -30 : 30, scale: 0.85 });
      gsap.set(connectorPathRef.current, { strokeDashoffset: 250 });
      gsap.set(pulseCircleRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      tl
        // Text scrolls up through the panel (magnifier stays in place)
        .to(textBlockRef.current, { y: endY, duration: scrollDuration, ease: 'power1.inOut' })
        .to(highlightBandRef.current, { y: endY, duration: scrollDuration, ease: 'power1.inOut' }, 0)
        .to(highlightUnderlineRef.current, { y: endY, duration: scrollDuration, ease: 'power1.inOut' }, 0)
        // Highlight flashes when text passes the magnifier
        .to(highlightBandRef.current, { opacity: 1, duration: 0.25 }, lockTime)
        .to(highlightUnderlineRef.current, { opacity: 1, duration: 0.25 }, lockTime + 0.1)
        // Breathing room — then connector draws
        .to(connectorPathRef.current, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, lockTime + 0.9)
        // Pulse dot starts
        .to(pulseCircleRef.current, { opacity: 0.82, duration: 0.15 }, lockTime + 1.3)
        // Insight card slides in
        .to(insightCardRef.current,
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'back.out(1.3)' },
          lockTime + 1.1
        );

      await tl;
    }
  }));

  return (
    <div className="relative w-[570px] h-[310px]">
      <div
        className="absolute rounded-[30px]"
        style={{
          left: 16 + panelShift,
          top: 22,
          width: panelWidth,
          height: 250,
          background: 'linear-gradient(180deg, rgba(58,58,66,0.64) 0%, rgba(32,32,38,0.78) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 14px 36px rgba(0,0,0,0.18)',
          transform: 'scale(0.985)',
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 570 310" style={{ zIndex: 0 }}>
        <path ref={connectorPathRef} d={connectorPath} stroke="rgba(113,113,122,0.66)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="250" strokeDashoffset="250" />
        <circle ref={pulseCircleRef} r="3" fill="#a1a1aa" opacity="0">
          <animateMotion dur="2.2s" repeatCount="indefinite" path={connectorPath} />
        </circle>
      </svg>

      <div className="absolute top-0 w-[372px]" style={{ left: panelShift, zIndex: 2 }}>
        <div
          className="relative mt-[18px] rounded-[28px] border overflow-hidden"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(56,56,64,0.72) 0%, rgba(34,34,40,0.84) 62%, rgba(24,28,38,0.86) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between gap-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-[8px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded shrink-0"
                style={{
                  color: filingColor,
                  background: 'rgba(36,36,42,0.82)',
                  border: `1px solid ${filingColor}55`,
                }}
              >
                {filingType}
              </span>
              <span className="text-[9px] font-mono truncate" style={{ color: 'rgba(255,255,255,0.84)' }}>
                {company}
              </span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: filingColor }} />
          </div>

          <div
            className="relative h-[196px] px-4 py-3"
            style={{ overflow: 'hidden' }}
          >
            <div
              ref={highlightBandRef}
              className="absolute left-4 right-4 h-7 rounded-md pointer-events-none"
              style={{
                top: `${16 + highlightLine * 16}px`,
                background: `linear-gradient(90deg, transparent 0%, ${filingColor}10 16%, ${filingColor}18 50%, ${filingColor}10 84%, transparent 100%)`,
                zIndex: 1,
              }}
            />

            <div
              ref={highlightUnderlineRef}
              className="absolute left-4 right-4 h-px pointer-events-none"
              style={{
                top: `${25 + highlightLine * 16}px`,
                background: `linear-gradient(90deg, transparent 0%, ${filingColor}44 20%, ${filingColor} 50%, ${filingColor}44 80%, transparent 100%)`,
                boxShadow: `0 0 12px ${filingColor}33`,
                zIndex: 2,
              }}
            />

            {/* Scan line — sweeps through text during animation */}
            <div
              ref={scanLineRef}
              className="absolute left-2 right-2 h-[2px] pointer-events-none"
              style={{
                top: 12,
                background: `linear-gradient(90deg, transparent 0%, ${filingColor}66 15%, ${filingColor} 50%, ${filingColor}66 85%, transparent 100%)`,
                boxShadow: `0 0 8px ${filingColor}44, 0 0 3px ${filingColor}`,
                zIndex: 6,
              }}
            />

            <div ref={textBlockRef} className="relative z-[1] space-y-0.5">
              {documentText.map((line, i) => {
                const isHighlighted = i === highlightLine;
                const isHeader = i === 0;

                return (
                  <p
                    key={i}
                    className="font-mono leading-[16px]"
                    style={{
                      fontSize: isHeader ? '9px' : '8.25px',
                      fontWeight: isHeader ? 700 : 400,
                      color: isHighlighted
                        ? '#ffffff'
                        : isHeader
                          ? '#ffffff'
                          : 'rgba(255,255,255,0.82)',
                      background: isHighlighted ? highlightColor : 'transparent',
                      borderRadius: isHighlighted ? '4px' : undefined,
                      padding: isHighlighted ? '1px 4px' : undefined,
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            <div
              ref={lensRef}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: lensLeft,
                top: lensTop,
                width: lensSize,
                height: lensSize,
                background: 'radial-gradient(circle at 34% 28%, rgba(108,108,120,0.82) 0%, rgba(58,58,68,0.82) 46%, rgba(34,34,40,0.86) 100%)',
                border: `1.5px solid ${filingColor}5e`,
                boxShadow: `0 14px 30px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 0 22px ${filingColor}26`,
                zIndex: 4,
              }}
            >
              <div
                className="absolute inset-[18px] rounded-full overflow-hidden"
                style={{ background: 'rgba(34,34,40,0.42)' }}
              >
                <div className="absolute inset-x-4 top-[34px] h-5 rounded-full" style={{ background: highlightColor }} />
                <div className="absolute inset-x-5 top-6 flex flex-col gap-1">
                  {focusLines.map((line, i) => (
                    <p
                      key={i}
                      className="font-mono leading-[12px]"
                      style={{
                        fontSize: i === 1 ? '10px' : '9px',
                        fontWeight: i === 1 ? 700 : 500,
                        color: i === 1 ? '#ffffff' : 'rgba(255,255,255,0.84)',
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex justify-center py-1.5 border-t"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-[7px] font-mono tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.36)' }}>
              ↕ text scrolls during animation
            </span>
          </div>
        </div>
      </div>

      <div ref={insightCardRef} className="absolute w-[180px]" style={{ left: cardLeft, top: cardTop, zIndex: 3 }}>
        <div
          className="absolute -inset-2 rounded-[26px]"
          style={{
            background: `${filingColor}14`,
            filter: 'blur(14px)',
            opacity: 0.8,
          }}
        />

        <div
          className="relative rounded-[22px] px-4 py-4"
          style={{
            background: 'linear-gradient(180deg, rgba(60,60,68,0.72) 0%, rgba(36,36,42,0.82) 100%)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 14px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[8px] font-mono font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.52)' }}>
              {insightLabel}
            </span>
            <div className="w-2 h-2 rounded-full" style={{ background: filingColor }} />
          </div>

          <p className="text-[18px] font-semibold leading-tight text-white tracking-tight">
            {insightValue}
          </p>

          <p className="text-[9px] font-mono leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {insightNote}
          </p>

          <div
            className="inline-flex mt-3 rounded-full px-2.5 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${filingColor}44`,
            }}
          >
            <span className="text-[8px] font-mono font-semibold tracking-wide text-white">
              {insightChip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
