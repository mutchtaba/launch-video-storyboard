import SceneOne_TwitterNotification from './components/scenes/SceneOne_TwitterNotification'
import SceneTwo_VoiceInput from './components/scenes/SceneTwo_VoiceInput'
import SceneThree_NewsSweep from './components/scenes/SceneThree_NewsSweep'
import SceneTwo_SECFilings from './components/scenes/SceneTwo_SECFilings'
import SceneThree_QuantAnalysis from './components/scenes/SceneThree_QuantAnalysis'

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
            {/* Frame 2 (stock analysis cards) will go here */}
          </div>
        </div>

        <div>
          <section className="shrink-0 flex flex-col items-center">
            <SceneThree_QuantAnalysis />
          </section>
        </div>

      </div>
    </div>
  )
}

export default App
