/**
 * Scene 2, Frame 1 — SEC Filing Analysis
 *
 * 2×2 grid of document scan panels connected to a minimal center "SEC EDGAR" label.
 * Each panel: real SEC filing text with magnifier highlight + extracted insight cards.
 * Light canvas — no dark backgrounds. Each panel is a full replica of the scan concept.
 */

export default function SceneTwo_SECFilings() {
  const filingChainPath =
    'M560 60 V96 H228 V362 H720 V560 H228 V756 H720 V828';
  const filingPulsePaths = [
    'M560 60 V96 H228 V144',
    'M228 326 V362 H720 V390',
    'M720 522 V560 H228 V588',
    'M228 718 V756 H720 V784',
  ];

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
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          SEC Filing Web — EDGAR Deep Scan
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
          A staggered mosaic of filing scans drops from EDGAR, zig-zagging downward
          as each lens isolates a phrase and extracts a live signal.
        </p>
      </div>

      {/* ===== THE WEB — 2×2 grid with center hub ===== */}
      <div className="relative w-[1120px] h-[1050px]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-[398px] top-[0px] h-[150px] w-[320px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(99,102,241,0.05) 48%, transparent 78%)',
              filter: 'blur(26px)',
            }}
          />
          <div
            className="absolute left-[58px] top-[176px] h-[180px] w-[180px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 72%)',
              filter: 'blur(22px)',
            }}
          />
          <div
            className="absolute right-[84px] top-[366px] h-[180px] w-[180px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 72%)',
              filter: 'blur(22px)',
            }}
          />
          <div
            className="absolute left-[72px] top-[562px] h-[180px] w-[180px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 72%)',
              filter: 'blur(22px)',
            }}
          />
          <div
            className="absolute right-[66px] bottom-[54px] h-[180px] w-[180px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 72%)',
              filter: 'blur(22px)',
            }}
          />
        </div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1120 1050" style={{ zIndex: 0 }}>
          <path
            d={filingChainPath}
            stroke="rgba(113,113,122,0.6)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {filingPulsePaths.map((path, i) => (
            <circle key={i} r="3.2" fill="#a1a1aa" opacity="0.78">
              <animateMotion dur={`${2.3 + i * 0.35}s`} repeatCount="indefinite" path={path} />
            </circle>
          ))}
        </svg>

        <div
          className="absolute left-1/2 top-[12px] -translate-x-1/2"
          style={{ zIndex: 6 }}
        >
          <div
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

        <div className="absolute left-[40px] top-[126px]" style={{ transform: 'scale(0.8)', transformOrigin: 'top left', zIndex: 4 }}>
          <DocumentScanPanel
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

        <div className="absolute left-[608px] top-[322px]" style={{ transform: 'scale(0.8)', transformOrigin: 'top left', zIndex: 3 }}>
          <DocumentScanPanel
            filingType="Form 4"
            filingColor="#f59e0b"
            company="Raytheon Technologies (RTX)"
            documentText={[
              'STATEMENT OF CHANGES IN BENEFICIAL OWNERSHIP',
              'Name: Gregory J. Hayes, Chairman & CEO',
              'Date of Transaction: 2024-03-14',
              'Transaction Code: P (Purchase)',
              'Shares Acquired: 45,000 at $98.12',
              'Total Holdings After Transaction: 892,340',
              'Nature of Ownership: Direct',
              'Footnote: Open market purchase pursuant to',
              '10b5-1 trading plan adopted 2024-01-08.',
              'No concurrent offsetting disposition was reported.',
            ]}
            highlightLine={4}
            highlightColor="rgba(245,158,11,0.16)"
            insightLabel="Insider Signal"
            insightValue="Buy volume +340%"
            insightNote="Form 4 cluster / executive open-market accumulation"
            insightChip="45K shares acquired"
          />
        </div>

        <div className="absolute left-[44px] top-[518px]" style={{ transform: 'scale(0.8)', transformOrigin: 'top left', zIndex: 5 }}>
          <DocumentScanPanel
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

        <div className="absolute left-[614px] top-[714px]" style={{ transform: 'scale(0.8)', transformOrigin: 'top left', zIndex: 4 }}>
          <DocumentScanPanel
            filingType="8-K"
            filingColor="#ef4444"
            company="Lockheed Martin Corp (LMT)"
            documentText={[
              'CURRENT REPORT — FORM 8-K',
              'Item 1.01 Entry into Material Contract',
              'On March 12, 2024, Lockheed Martin Corporation',
              'entered into a definitive agreement with the',
              'U.S. Department of Defense valued at $4.2 billion',
              'for next-generation integrated air defense systems.',
              'Expected delivery: FY2025-FY2028.',
              'Item 9.01 Financial Statements and Exhibits',
              'Exhibit 99.1 — Press Release dated March 12, 2024',
              'Program award classified as mission critical.',
            ]}
            highlightLine={4}
            highlightColor="rgba(239,68,68,0.16)"
            insightLabel="Event Alert"
            insightValue="$4.2B DoD award"
            insightNote="8-K material contract / multi-year defense revenue visibility"
            insightChip="Delivery FY25–FY28"
          />
        </div>
      </div>

      {/* VFX + VO notes */}
      <div className="space-y-2 mt-4" style={{ width: 700 }}>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> EDGAR is the source node, then a single gray elbow-chain routes through the four filing scans in sequence.
            A pulse runs segment-to-segment through that chain, each lens locks onto a live filing phrase, enlarges it,
            then the nearby insight card is pulled out from that exact scan point.
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth:
            "Scanning SEC filings — checking 13F holdings and insider transactions."
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

function DocumentScanPanel({
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
}: {
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
}) {
  const lensSize = 148;
  const lensLeft = 114;
  const lensTop = 42;
  const panelWidth = 372;
  const cardLeft = 390;
  const cardTop = 92;
  const anchorX = lensLeft + lensSize - 10;
  const anchorY = lensTop + lensSize / 2;
  const connectorMidX = anchorX + 28;
  const connectorTurnY = cardTop + 32;
  const connectorEntryX = cardLeft - 18;
  const focusLines = documentText.slice(
    Math.max(0, highlightLine - 1),
    Math.min(documentText.length, highlightLine + 2),
  );
  const connectorPath = `M${anchorX} ${anchorY} L${connectorMidX} ${anchorY} L${connectorMidX} ${connectorTurnY} L${connectorEntryX} ${connectorTurnY} L${cardLeft} ${connectorTurnY}`;

  return (
    <div className="relative w-[570px] h-[310px]">
      <div
        className="absolute rounded-[30px]"
        style={{
          left: 16,
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
        <path d={connectorPath} stroke="rgba(113,113,122,0.66)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="3" fill="#a1a1aa" opacity="0.82">
          <animateMotion dur="2.2s" repeatCount="indefinite" path={connectorPath} />
        </circle>
      </svg>

      <div className="absolute left-0 top-0 w-[372px]" style={{ zIndex: 2 }}>
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
          >
            <div
              className="absolute left-4 right-4 h-7 rounded-md pointer-events-none"
              style={{
                top: `${16 + highlightLine * 16}px`,
                background: `linear-gradient(90deg, transparent 0%, ${filingColor}10 16%, ${filingColor}18 50%, ${filingColor}10 84%, transparent 100%)`,
                zIndex: 1,
              }}
            />

            <div
              className="absolute left-4 right-4 h-px pointer-events-none"
              style={{
                top: `${25 + highlightLine * 16}px`,
                background: `linear-gradient(90deg, transparent 0%, ${filingColor}44 20%, ${filingColor} 50%, ${filingColor}44 80%, transparent 100%)`,
                boxShadow: `0 0 12px ${filingColor}33`,
                zIndex: 2,
              }}
            />

            <div className="relative z-[1] space-y-0.5">
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

      <div className="absolute w-[180px]" style={{ left: cardLeft, top: cardTop, zIndex: 3 }}>
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
}
