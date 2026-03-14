/**
 * Scene 2 — Voice Input + Real-Time Transcription
 * 
 * Siri-style orb + transcription text. Nothing else.
 * No mic button, no timer, no "Listening" label, no controls.
 * Colors match Xynth frontend (dark blues/greys).
 */

export default function SceneTwo_VoiceInput() {
  const transcriptionText = `Iran just closed the Strait of Hormuz. Can you analyze my portfolio and tell me if I should enter any new positions?`;

  const words = transcriptionText.split(' ');

  return (
    <div className="flex flex-col items-start gap-6">
      {/* Scene label */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Scene 2
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:15 – 0:25
          </span>
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          Voice Input — Talking to Xynth
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
          Speaks casually while cracking eggs. Siri-like orb pulses. Words appear live.
        </p>
      </div>

      {/* ===== MAIN PANEL — no background, floating elements ===== */}
      <div className="w-[520px]">
        {/* Transcription text — dark text on light canvas */}
        <div className="px-2 pt-4 pb-4">
          <p className="text-[17px] leading-relaxed font-light text-center">
            {words.map((word, i) => {
              let color: string;
              if (i < 10) {
                color = '#1a1a2e';
              } else if (i < 16) {
                color = 'rgba(26,26,46,0.6)';
              } else {
                color = 'rgba(26,26,46,0.25)';
              }
              return (
                <span key={i} style={{ color }}>
                  {word}{' '}
                </span>
              );
            })}
          </p>
        </div>

        {/* Siri-style orb — grey, animated */}
        <div className="flex items-center justify-center pb-4 pt-2">
          <div className="relative w-20 h-20">
            {/* Outer glow ring — pulsing */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(161,161,170,0.12) 0%, transparent 70%)',
                transform: 'scale(1.8)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            {/* Middle ring — breathing */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(161,161,170,0.2) 0%, rgba(113,113,122,0.06) 50%, transparent 70%)',
                transform: 'scale(1.3)',
                animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s',
              }}
            />
            {/* Core orb */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(212,212,216,0.9) 0%, rgba(161,161,170,0.7) 40%, rgba(113,113,122,0.5) 70%, rgba(82,82,91,0.2) 100%)',
                boxShadow: '0 0 25px rgba(161,161,170,0.2), 0 0 50px rgba(113,113,122,0.08)',
                animation: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s',
              }}
            />
            {/* Inner highlight */}
            <div
              className="absolute rounded-full"
              style={{
                top: '15%',
                left: '20%',
                width: '35%',
                height: '35%',
                background: 'radial-gradient(circle, rgba(244,244,245,0.5) 0%, transparent 70%)',
                filter: 'blur(4px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* VFX notes */}
      <div className="w-[520px] space-y-2 mt-2">
        <div className="border border-dashed border-zinc-300 rounded-lg p-3">
          <p className="text-zinc-500 text-[11px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> Orb pulses and morphs 
            with speech — expands on loud syllables, contracts on pauses. Think Siri orb 
            but bluer. Words appear one at a time synced to audio. Newest words bright 
            white, older words fade progressively.
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-3">
          <p className="text-zinc-500 text-[11px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Chill Guy speaking 
            casually: "Iran just closed the Strait of Hormuz. Can you analyze my portfolio 
            and tell me if I should enter any new positions?" Unhurried, talking to Xynth 
            like a friend. Pan sizzling faintly in background.
          </p>
        </div>
      </div>
    </div>
  );
}
