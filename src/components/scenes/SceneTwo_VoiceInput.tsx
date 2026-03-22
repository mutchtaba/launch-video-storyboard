/**
 * Scene 2 — Voice Input + Real-Time Transcription
 * 
 * Siri-style orb + transcription text. Nothing else.
 * No mic button, no timer, no "Listening" label, no controls.
 * Colors match Xynth frontend (dark blues/greys).
 */

import { useState, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

export default function SceneTwo_VoiceInput() {
  const transcriptionText = `Hey Xynth, Iran just closed the Strait of Hormuz. Tell me how I should reposition my portfolio.`;

  const words = transcriptionText.split(' ');
  const [visibleCount, setVisibleCount] = useState(words.length);
  const [isStreaming, setIsStreaming] = useState(false);
  const orbControls = useAnimationControls();

  const playAnimation = useCallback(async () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setVisibleCount(0);

    // start orb pulsing harder
    orbControls.start({
      scale: [1, 1.18, 1, 1.12, 1],
      transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
    });

    // reveal words one by one
    for (let i = 1; i <= words.length; i++) {
      await new Promise((r) => setTimeout(r, 120));
      setVisibleCount(i);
    }

    // settle orb
    await orbControls.start({ scale: 1, transition: { duration: 0.5 } });
    setIsStreaming(false);
  }, [isStreaming, words.length, orbControls]);

  return (
    <div className="flex flex-col items-start gap-6">
      {/* Scene label */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Frame 2
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:15 – 0:20
          </span>
          <button
            onClick={playAnimation}
            className="rounded-full px-3 py-1 text-[10px] font-mono tracking-wide uppercase transition-colors hover:opacity-80 cursor-pointer"
            style={{
              background: isStreaming ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.85)',
              color: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {isStreaming ? '● Streaming...' : '▶ Play'}
          </button>
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
              const isVisible = i < visibleCount;
              let color: string;
              if (i < 10) {
                color = '#1a1a2e';
              } else if (i < 16) {
                color = 'rgba(26,26,46,0.6)';
              } else {
                color = 'rgba(26,26,46,0.25)';
              }
              return (
                <motion.span
                  key={i}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ color, display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              );
            })}
          </p>
        </div>

        {/* Siri-style orb — grey, animated */}
        <div className="flex items-center justify-center pb-4 pt-2">
          <motion.div className="relative w-20 h-20" animate={orbControls}>
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
          </motion.div>
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
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Chill Guy (casual, 
            half-asleep): "Hey Xynth, Iran just closed the Strait of Hormuz. Tell me how I should reposition 
            my portfolio." Pan sizzling faintly. Talking like he's asking a roommate.
          </p>
        </div>
      </div>
    </div>
  );
}
