import SceneOne_TwitterNotification from './components/scenes/SceneOne_TwitterNotification'
import SceneTwo_VoiceInput from './components/scenes/SceneTwo_VoiceInput'
import SceneThree_NewsSweep from './components/scenes/SceneThree_NewsSweep'

function App() {
  return (
    <div className="min-h-dvh overflow-x-auto">
      {/* Horizontal canvas — infinitely wide paper */}
      <div className="flex items-start gap-0 px-20 py-16 min-w-max">

        {/* Scene 1 */}
        <section className="shrink-0 flex flex-col items-center">
          <SceneOne_TwitterNotification />
        </section>

        {/* Spacer + connector */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center px-16">
          <div className="w-32 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[10px] font-mono mt-2 tracking-wider">
            swipes to Xynth →
          </span>
        </div>

        {/* Scene 2 */}
        <section className="shrink-0 flex flex-col items-center">
          <SceneTwo_VoiceInput />
        </section>

        {/* Spacer */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center px-16">
          <div className="w-32 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[10px] font-mono mt-2 tracking-wider">
            Xynth starts working →
          </span>
        </div>

        {/* Scene 3 */}
        <section className="shrink-0 flex flex-col items-center">
          <SceneThree_NewsSweep />
        </section>

      </div>
    </div>
  )
}

export default App
