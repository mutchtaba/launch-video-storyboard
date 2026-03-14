/**
 * Scene 1 — X Notification
 * 
 * Bare minimum. Black translucent card, white text.
 * X icon + name + handle, short tweet. That's it.
 * Matches the Elon Musk notification screenshot aesthetic exactly.
 */

export default function SceneOne_TwitterNotification() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Scene label */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Scene 1
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:10 – 0:15
          </span>
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          The Breaking News
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Notification drops in. Stops him cold.
        </p>
      </div>

      {/* ===== THE NOTIFICATION ===== */}
      <div
        className="w-[420px] rounded-[20px] px-5 py-4"
        style={{
          background: 'rgba(30, 30, 30, 0.85)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Author row: X icon + name + handle */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-[15px] font-semibold leading-tight">CNN Breaking News</p>
            <p className="text-[13px] leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>@caborek</p>
          </div>
        </div>

        {/* Tweet text — short, punchy */}
        <p className="text-white text-[17px] leading-snug font-light">
          BREAKING: U.S. invades Iran. Strait of Hormuz closed to all commercial shipping.
        </p>
      </div>

      {/* VFX notes */}
      <div className="w-[420px] space-y-2 mt-2">
        <div className="border border-dashed border-zinc-300 rounded-lg p-3">
          <p className="text-zinc-500 text-[11px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> Notification slides 
            down from top of frame. Slight bounce on land. 
            Black translucent over whatever is behind.
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-3">
          <p className="text-zinc-500 text-[11px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> No Xynth voice here. 
            Just ambient sound — doomscrolling, faint background noise. The notification 
            sound effect (X ping) is the only audio cue.
          </p>
        </div>
      </div>
    </div>
  );
}
