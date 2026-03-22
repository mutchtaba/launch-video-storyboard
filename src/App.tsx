import SceneOne_TwitterNotification from './components/scenes/SceneOne_TwitterNotification'
import SceneTwo_VoiceInput from './components/scenes/SceneTwo_VoiceInput'
import SceneThree_NewsSweep from './components/scenes/SceneThree_NewsSweep'
import SceneTwo_SECFilings from './components/scenes/SceneTwo_SECFilings'
import SceneTwo_SECFilingsSummary from './components/scenes/SceneTwo_SECFilingsSummary'
import SceneThree_QuantAnalysis from './components/scenes/SceneThree_QuantAnalysis'
import SceneFour_TheTrade from './components/scenes/SceneFour_TheTrade'

function App() {
  return (
    <div className="min-h-dvh overflow-x-auto">
      <div className="flex flex-col gap-24 px-20 py-16 min-w-max">

        {/* ══ SCENE 1 — Chill Guy Discovers & Activates (0:10–0:20) ══ */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
              Scene 1
            </span>
            <h1 className="text-xl font-bold text-zinc-900 mt-3 tracking-tight">
              Chill Guy Discovers & Activates Xynth
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              0:10–0:20 · Kitchen, doomscrolling. Sees news on X. Swipes to Xynth, talks while cracking eggs.
            </p>
          </div>
          <div className="flex items-start gap-0">
            <section className="shrink-0 flex flex-col items-center">
              <SceneOne_TwitterNotification />
            </section>
            <div className="shrink-0 flex flex-col items-center justify-center self-center px-16">
              <div className="w-32 h-px bg-zinc-300" />
              <span className="text-zinc-400 text-[10px] font-mono mt-2 tracking-wider">
                swipes to Xynth →
              </span>
            </div>
            <section className="shrink-0 flex flex-col items-center">
              <SceneTwo_VoiceInput />
            </section>
            <div className="shrink-0 flex flex-col items-center justify-center self-center px-16">
              <div className="w-32 h-px bg-zinc-300" />
              <span className="text-zinc-400 text-[10px] font-mono mt-2 tracking-wider">
                Xynth starts working →
              </span>
            </div>
            <section className="shrink-0 flex flex-col items-center">
              <SceneThree_NewsSweep />
            </section>
          </div>
        </div>

        {/* ══ SCENE 2 — SEC Filing Analysis (0:30–0:50) ══ */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
              Scene 2
            </span>
            <h1 className="text-xl font-bold text-zinc-900 mt-3 tracking-tight">
              SEC Filing Analysis
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              0:30–0:50 · Chill Guy flipping eggs. Xynth scans SEC filings, maps insider activity, extracts intelligence.
            </p>
          </div>
          <div className="flex items-start gap-0">
            <section className="shrink-0 flex flex-col items-center">
              <SceneTwo_SECFilings />
            </section>
            <div className="shrink-0 flex flex-col items-center justify-center self-center px-16">
              <div className="w-32 h-px bg-zinc-300" />
              <span className="text-zinc-400 text-[10px] font-mono mt-2 tracking-wider">
                narrows to one name →
              </span>
            </div>
            <section className="shrink-0 flex flex-col items-center">
              <SceneTwo_SECFilingsSummary />
            </section>
          </div>
        </div>

        {/* ══ SCENE 3 — Quantitative Analysis (0:50–1:05) ══ */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
              Scene 3
            </span>
            <h1 className="text-xl font-bold text-zinc-900 mt-3 tracking-tight">
              Quantitative Analysis
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              0:50–1:05 · Xynth runs the numbers. Options flow, GEX levels, strike profiles — the full quant breakdown.
            </p>
          </div>
          <div className="flex items-start gap-0">
            <section className="shrink-0 flex flex-col items-center">
              <SceneThree_QuantAnalysis />
            </section>
          </div>
        </div>

        {/* ══ SCENE 4 — The Trade (1:05–1:20) ══ */}
        <div>
          <div className="mb-8">
            <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-full">
              Scene 4
            </span>
            <h1 className="text-xl font-bold text-zinc-900 mt-3 tracking-tight">
              The Trade
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              1:05–1:20 · Xynth fetches the options chain, selects the strikes, and delivers the final trade.
            </p>
          </div>
          <div className="flex items-start gap-0">
            <section className="shrink-0 flex flex-col items-center">
              <SceneFour_TheTrade />
            </section>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
