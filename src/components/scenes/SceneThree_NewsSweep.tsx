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

import bloombergLogo from '../../assets/bloomberg.png';
import cnnLogo from '../../assets/cnn.png';

export default function SceneThree_NewsSweep() {
  return (
    <div className="flex flex-col items-start gap-10">
      {/* Scene label */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Scene 3
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:25 – 0:45
          </span>
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
              <span className="text-zinc-900">This is a live crisis with massive capital flows underway.</span>{' '}
              <span style={{ color: 'rgba(26,26,46,0.55)' }}>Let me scan the latest news across all sources and </span>
              <span style={{ color: 'rgba(26,26,46,0.25)' }}>break down what it means for your portfolio...</span>
            </p>
          </div>

          {/* Source scanner */}
          <div className="w-[480px] space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[14px] font-semibold text-zinc-700">Scanning Live Sources</span>
              <span className="text-[11px] font-mono text-zinc-400">0/4</span>
            </div>

            <div className="space-y-2">
              {/* Bloomberg */}
              <div className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl" style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src={bloombergLogo} alt="Bloomberg" className="w-7 h-7 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white truncate">
                    <span>Reading news about</span>{' '}
                    <span>U.S.-Iran military escalation</span>
                  </p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-white animate-spin shrink-0" />
              </div>

              {/* Reddit */}
              <div className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl" style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: '#FF4500' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white truncate">
                    <span>Scanning threads about</span>{' '}
                    <span>oil futures, defense stocks, sanctions</span>
                  </p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-white animate-spin shrink-0" />
              </div>

              {/* X */}
              <div className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl" style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-7 h-7 rounded-md bg-black flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white truncate">
                    <span>Scanning tweets about</span>{' '}
                    <span>Strait of Hormuz, crude oil, Pentagon</span>
                  </p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-white animate-spin shrink-0" />
              </div>

              {/* CNN */}
              <div className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl" style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src={cnnLogo} alt="CNN" className="w-7 h-7 rounded-md object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white truncate">
                    <span>Extracting insights on</span>{' '}
                    <span>geopolitical risk, supply chain disruption</span>
                  </p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-white animate-spin shrink-0" />
              </div>
            </div>
          </div>

          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[480px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VFX:</span> Text streams in on top, then 
              scanner rows appear one by one. Status text rotates topics every ~2s. Spinners animate.
            </p>
          </div>
          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[480px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth (calm, confident): 
              "This is a live crisis with massive capital flows underway. Let me scan the latest 
              news across all sources and break down what it means for your portfolio."
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

        {/* ——— FRAME 2: Findings text on top + dashboard below ——— */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-300">
            Frame 2 — Findings
          </span>

          {/* Signal detected dashboard */}
          <div
            className="w-[520px] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10,10,15,0.72)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(16,185,129,0.08), 0 8px 32px rgba(0,0,0,0.2)',
              border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            {/* Header — dominant */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-[16px] font-semibold tracking-tight">News & Social</span>
              </div>
              <span className="text-emerald-400 text-[12px] font-mono">complete</span>
            </div>

            {/* Sentiment visual — bar chart + big number */}
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-end gap-5">
                {/* Sentiment bar chart — mini visualization */}
                <div className="flex items-end gap-[3px] h-16">
                  {[38, 28, 45, 52, 34, 60, 48, 72, 56, 80, 64, 55, 70, 82, 75, 68, 78, 85, 62, 74].map((h, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: 6,
                        height: `${h}%`,
                        background: h > 50
                          ? `rgba(16,185,129,${0.3 + (h / 100) * 0.7})`
                          : `rgba(239,68,68,${0.3 + ((100 - h) / 100) * 0.5})`,
                      }}
                    />
                  ))}
                </div>

                {/* Big stat */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[44px] font-light text-emerald-400 leading-none">82%</span>
                    <span className="text-emerald-400/60 text-[14px]">bullish</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-[11px] text-white/40 font-mono">
                    <span>312 tweets</span>
                    <span>289 threads</span>
                    <span>246 articles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Source sentiment breakdown — horizontal stacked bar */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-2 items-center mb-2">
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">Sentiment by Source</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-[11px] w-12 shrink-0">Reddit</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden flex">
                    <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '80%' }} />
                    <div className="h-full bg-red-500/60 rounded-r-full" style={{ width: '20%' }} />
                  </div>
                  <span className="text-emerald-400 text-[11px] font-mono w-10 text-right">80%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-[11px] w-12 shrink-0">X</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden flex">
                    <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '74%' }} />
                    <div className="h-full bg-red-500/60 rounded-r-full" style={{ width: '26%' }} />
                  </div>
                  <span className="text-emerald-400 text-[11px] font-mono w-10 text-right">74%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-[11px] w-12 shrink-0">News</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden flex">
                    <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '88%' }} />
                    <div className="h-full bg-red-500/60 rounded-r-full" style={{ width: '12%' }} />
                  </div>
                  <span className="text-emerald-400 text-[11px] font-mono w-10 text-right">88%</span>
                </div>
              </div>
            </div>

            {/* Top movers — 3 columns with mini spark lines */}
            <div className="px-6 py-5">
              <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-3">Top Sectors in Play</p>
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-emerald-400 text-[11px] font-medium mb-1">Energy</p>
                  <p className="text-white text-[18px] font-semibold">OXY</p>
                  <p className="text-white/50 text-[12px]">XOM · CVX</p>
                  {/* Mini spark line */}
                  <svg className="mt-2" width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <polyline
                      points="0,18 10,16 20,14 30,15 40,12 50,10 60,8 70,6 80,4 90,3 100,2"
                      fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <linearGradient id="sparkGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <polygon
                      points="0,18 10,16 20,14 30,15 40,12 50,10 60,8 70,6 80,4 90,3 100,2 100,20 0,20"
                      fill="url(#sparkGreen)"
                    />
                  </svg>
                </div>
                <div className="flex-1 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-emerald-400 text-[11px] font-medium mb-1">Defense</p>
                  <p className="text-white text-[18px] font-semibold">RTX</p>
                  <p className="text-white/50 text-[12px]">LMT · NOC</p>
                  <svg className="mt-2" width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <polyline
                      points="0,16 10,15 20,12 30,14 40,10 50,8 60,9 70,5 80,4 90,3 100,2"
                      fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <polygon
                      points="0,16 10,15 20,12 30,14 40,10 50,8 60,9 70,5 80,4 90,3 100,2 100,20 0,20"
                      fill="url(#sparkGreen)"
                    />
                  </svg>
                </div>
                <div className="flex-1 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-emerald-400 text-[11px] font-medium mb-1">Safe Haven</p>
                  <p className="text-white text-[18px] font-semibold">GLD</p>
                  <p className="text-white/50 text-[12px]">SLV</p>
                  <svg className="mt-2" width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <polyline
                      points="0,14 10,13 20,15 30,11 40,10 50,12 60,8 70,7 80,5 90,4 100,3"
                      fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <polygon
                      points="0,14 10,13 20,15 30,11 40,10 50,12 60,8 70,7 80,5 90,4 100,3 100,20 0,20"
                      fill="url(#sparkGreen)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Streamed AI findings text — after dashboard */}
          <div className="w-[480px] mt-2">
            <p className="text-[17px] leading-relaxed font-light">
              <span className="text-zinc-800">
                News sweep complete. Sentiment is running hot — 82% of discussion across Reddit and X 
                is bullish on energy and defense.
              </span>{' '}
              <span style={{ color: 'rgba(26,26,46,0.6)' }}>
                Top tickers: OXY, XOM, CVX in energy. RTX, LMT, NOC in defense. On X, most analysts 
                are flagging crude longs but a few are warning about a diplomatic
              </span>{' '}
              <span style={{ color: 'rgba(26,26,46,0.35)' }}>
                de-escalation play within 48 hours...
              </span>
            </p>
          </div>

          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[520px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VFX:</span> Scanner rows transform into 
              dashboard cards. Sentiment bars fill, sparklines draw, sector columns slide in.
            </p>
          </div>
          <div className="border border-dashed border-zinc-300 rounded-lg p-2.5 w-[520px]">
            <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
              <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "News sweep complete. 
              Sentiment is running hot — 82% bullish across Reddit and X on energy and defense. 
              Top tickers: OXY, XOM, CVX in energy. RTX, LMT, NOC in defense. A few warning about 
              a diplomatic de-escalation play within 48 hours."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
