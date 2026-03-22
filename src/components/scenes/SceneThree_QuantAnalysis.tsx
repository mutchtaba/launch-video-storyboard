import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const introText = `Now let me run the technicals on OXY. I want to see the price action, where the options flow is clustering, and how market makers are positioned. The filings told us the story, this tells us when to move`;

const f1TransitionText = "Technicals look strong. Price bounced clean off support, pushed through the liquidity zone, and is sitting just under resistance. Let me check the options flow next and see where the smart money is positioning";
const f1TransitionWords = f1TransitionText.split(' ');

const f2TransitionText = "Okay so the call side is clearly winning here. Most of the big sweeps are hitting the 65 strike over and over. The biggest one is 3.1 million dollars which is way too large to be a regular person trading. This looks like institutions loading up. Let me pull everything together into the final summary";
const f2TransitionWords = f2TransitionText.split(' ');

const f3ConclusionText = "Alright so the technicals are clean and the flow is completely one sided. The chart held support, pushed through the consolidation zone, and now institutions are aggressively buying calls at the same strike. Dark pool volume is up 40 percent this week which means someone has been quietly loading up shares off exchange before any of this flow went public. That does not happen by accident. Everything is lining up. I think we should be in this.";
const f3ConclusionWords = f3ConclusionText.split(' ');

type Candle = {
  open: number
  high: number
  low: number
  close: number
}

type TALevel = {
  name: string
  price: number
  stroke: string
  dash?: string
}

type FlowRow = {
  time: string
  ticker: string
  contract: string
  premium: string
  size: string
  route: 'ASK' | 'BID' | 'MID'
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  type: string
  emphasis: number
}


// Realistic uptrend: starts low, gradual climb with mixed red/green, consolidation, breakout, pullback
const candles: Candle[] = [
  // Early accumulation — choppy near lows (0–5)
  { open: 54.2, high: 54.6, low: 53.8, close: 54.5 },
  { open: 54.5, high: 54.9, low: 54.0, close: 54.1 },  // red
  { open: 54.1, high: 54.7, low: 53.6, close: 54.4 },
  { open: 54.4, high: 54.5, low: 53.9, close: 54.0 },  // red
  { open: 54.0, high: 54.8, low: 53.7, close: 54.6 },
  { open: 54.6, high: 55.2, low: 54.3, close: 55.0 },
  // → SUPPORT appears at 53.5 after candle 5

  // Climb with natural pullbacks (6–12)
  { open: 55.0, high: 55.6, low: 54.8, close: 55.4 },
  { open: 55.4, high: 56.0, low: 55.1, close: 55.2 },  // red
  { open: 55.2, high: 55.9, low: 55.0, close: 55.7 },
  { open: 55.7, high: 56.4, low: 55.5, close: 56.2 },
  { open: 56.2, high: 56.8, low: 55.9, close: 56.0 },  // red
  { open: 56.0, high: 56.6, low: 55.8, close: 56.5 },
  { open: 56.5, high: 57.2, low: 56.3, close: 57.0 },

  // Consolidation / chop zone (13–19) — price oscillates ~57–59
  { open: 57.0, high: 57.8, low: 56.8, close: 57.6 },
  { open: 57.6, high: 58.2, low: 57.3, close: 57.4 },  // red
  { open: 57.4, high: 58.0, low: 57.1, close: 57.8 },
  { open: 57.8, high: 58.4, low: 57.6, close: 58.2 },
  { open: 58.2, high: 58.6, low: 57.7, close: 57.9 },  // red
  { open: 57.9, high: 58.5, low: 57.6, close: 58.3 },
  { open: 58.3, high: 58.8, low: 57.9, close: 58.0 },  // red
  // → LIQUIDITY ZONE appears (57.0–58.8) spanning candles 13–19

  // Breakout above consolidation (20–25)
  { open: 58.0, high: 58.9, low: 57.8, close: 58.7 },
  { open: 58.7, high: 59.6, low: 58.5, close: 59.4 },
  { open: 59.4, high: 60.2, low: 59.1, close: 59.2 },  // red
  { open: 59.2, high: 60.0, low: 59.0, close: 59.8 },
  { open: 59.8, high: 60.6, low: 59.5, close: 60.4 },
  { open: 60.4, high: 61.2, low: 60.1, close: 61.0 },

  // Final push + pullback near resistance (26–31)
  { open: 61.0, high: 61.8, low: 60.8, close: 61.6 },
  { open: 61.6, high: 62.3, low: 61.3, close: 62.0 },
  { open: 62.0, high: 62.6, low: 61.7, close: 62.4 },
  { open: 62.4, high: 62.9, low: 62.0, close: 62.1 },  // red
  { open: 62.1, high: 62.5, low: 61.4, close: 61.6 },  // red
  { open: 61.6, high: 62.2, low: 61.2, close: 61.9 },
  // → RESISTANCE appears at 63.0 after candle 31
]

const taLevels: TALevel[] = [
  { name: 'Support', price: 55.5, stroke: 'rgba(52,211,153,0.6)', dash: '6 4' },
  { name: 'Resistance', price: 63.0, stroke: 'rgba(251,113,133,0.6)', dash: '6 4' },
]

// Liquidity zone: contained box spanning only the consolidation candles
const liquidityZone = { top: 58.8, bottom: 57.0, startIndex: 13, endIndex: 19 };

// Candle indices at which each event triggers
const SUPPORT_AFTER = 12;     // after climb phase — before consolidation
const LIQ_ZONE_AFTER = 19;    // after consolidation zone ends
const RESISTANCE_AFTER = 31;   // after last candle

const taIndicators = [
  { label: 'RSI (14)', value: '68.7', note: 'Approaching overbought', color: '#60a5fa' },
  { label: 'MACD', value: 'Bullish cross', note: 'Signal crossed above 5 bars ago', color: '#34d399' },
  { label: 'Volume', value: '3.4x avg', note: 'Institutional accumulation range', color: '#f59e0b' },
  { label: 'Trend', value: 'Uptrend', note: 'Bounced off support, higher highs', color: '#a78bfa' },
]

const flowRows: FlowRow[] = [
  {
    time: '15:56:12',
    ticker: 'OXY',
    contract: '03/29 65C',
    premium: '$3.1M',
    size: '2.4K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 94,
  },
  {
    time: '15:55:48',
    ticker: 'OXY',
    contract: '03/29 67C',
    premium: '$1.9M',
    size: '1.6K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'BLOCK',
    emphasis: 82,
  },
  {
    time: '15:55:19',
    ticker: 'OXY',
    contract: '04/05 70C',
    premium: '$1.4M',
    size: '2.1K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 72,
  },
  {
    time: '15:54:51',
    ticker: 'OXY',
    contract: '04/19 68C',
    premium: '$840K',
    size: '920',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'BLOCK',
    emphasis: 58,
  },
  {
    time: '15:54:14',
    ticker: 'OXY',
    contract: '04/05 66C',
    premium: '$620K',
    size: '1.1K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 41,
  },
  {
    time: '15:53:37',
    ticker: 'OXY',
    contract: '04/19 64C',
    premium: '$480K',
    size: '1.4K',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'BLOCK',
    emphasis: 34,
  },
  {
    time: '15:53:06',
    ticker: 'OXY',
    contract: '04/19 72C',
    premium: '$720K',
    size: '680',
    route: 'ASK',
    bias: 'BULLISH',
    type: 'SWEEP',
    emphasis: 52,
  },
]

// Dummy flow rows for the rolling tape scanner effect
const dummyFlowPool: FlowRow[] = [
  { time: '15:57:02', ticker: 'OXY', contract: '04/05 63C', premium: '$410K', size: '520', route: 'ASK', bias: 'BULLISH', type: 'SWEEP', emphasis: 45 },
  { time: '15:56:55', ticker: 'OXY', contract: '03/29 62P', premium: '$290K', size: '380', route: 'BID', bias: 'BEARISH', type: 'BLOCK', emphasis: 32 },
  { time: '15:56:48', ticker: 'OXY', contract: '04/19 66C', premium: '$1.2M', size: '1.1K', route: 'ASK', bias: 'BULLISH', type: 'SWEEP', emphasis: 68 },
  { time: '15:56:41', ticker: 'OXY', contract: '03/29 64C', premium: '$560K', size: '720', route: 'MID', bias: 'NEUTRAL', type: 'ROLL', emphasis: 28 },
  { time: '15:56:35', ticker: 'OXY', contract: '04/05 61P', premium: '$180K', size: '290', route: 'BID', bias: 'BEARISH', type: 'HEDGE', emphasis: 22 },
  { time: '15:56:28', ticker: 'OXY', contract: '04/19 69C', premium: '$880K', size: '640', route: 'ASK', bias: 'BULLISH', type: 'BLOCK', emphasis: 55 },
  { time: '15:56:21', ticker: 'OXY', contract: '03/29 66C', premium: '$1.5M', size: '1.8K', route: 'ASK', bias: 'BULLISH', type: 'SWEEP', emphasis: 76 },
  { time: '15:56:14', ticker: 'OXY', contract: '04/05 59P', premium: '$340K', size: '460', route: 'BID', bias: 'BEARISH', type: 'HEDGE', emphasis: 38 },
  { time: '15:56:08', ticker: 'OXY', contract: '04/19 71C', premium: '$950K', size: '780', route: 'ASK', bias: 'BULLISH', type: 'SWEEP', emphasis: 62 },
  { time: '15:56:01', ticker: 'OXY', contract: '03/29 70C', premium: '$2.1M', size: '1.4K', route: 'ASK', bias: 'BULLISH', type: 'BLOCK', emphasis: 85 },
  { time: '15:55:54', ticker: 'OXY', contract: '04/05 60P', premium: '$220K', size: '310', route: 'MID', bias: 'NEUTRAL', type: 'ROLL', emphasis: 25 },
  { time: '15:55:47', ticker: 'OXY', contract: '04/19 67C', premium: '$680K', size: '550', route: 'ASK', bias: 'BULLISH', type: 'SWEEP', emphasis: 48 },
  { time: '15:55:41', ticker: 'OXY', contract: '03/29 68C', premium: '$1.8M', size: '2.2K', route: 'ASK', bias: 'BULLISH', type: 'SWEEP', emphasis: 88 },
  { time: '15:55:34', ticker: 'OXY', contract: '04/05 57P', premium: '$150K', size: '210', route: 'BID', bias: 'BEARISH', type: 'HEDGE', emphasis: 18 },
]

const flowBreakdown = [
  { label: 'Ask-side calls', value: 72, color: '#34d399' },
  { label: 'Bid-side puts', value: 18, color: '#fb7185' },
  { label: 'Neutral / rolls', value: 10, color: 'rgba(255,255,255,0.3)' },
]

const mmRows = [
  { strike: '68', calls: 24, puts: 6 },
  { strike: '67', calls: 48, puts: 10 },
  { strike: '66', calls: 64, puts: 14 },
  { strike: '65', calls: 92, puts: 18, tag: 'call wall' },
  { strike: '64', calls: 78, puts: 22 },
  { strike: '63', calls: 56, puts: 30 },
  { strike: '62', calls: 34, puts: 42, tag: 'flip' },
  { strike: '61', calls: 18, puts: 72 },
  { strike: '60', calls: 12, puts: 82, tag: 'put floor' },
  { strike: '59', calls: 6, puts: 48 },
]

const techScores = [
  { label: 'Trend', value: 'Bullish', score: 86, color: '#34d399' },
  { label: 'Momentum', value: 'RSI 69', score: 72, color: '#60a5fa' },
  { label: 'Volume', value: '3.4x avg', score: 92, color: '#f59e0b' },
  { label: 'Flow', value: '72% ask-side', score: 88, color: '#a78bfa' },
]

const panelStyle = {
  background: 'linear-gradient(180deg, rgba(39,39,42,0.72) 0%, rgba(24,24,27,0.84) 100%)',
  backdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
};

const words = introText.split(' ');

export default function SceneThree_QuantAnalysis() {
  // Frame 1 animation state
  const [f1Playing, setF1Playing] = useState(false);
  const [visibleWords, setVisibleWords] = useState(words.length);
  const [f1VisibleCandles, setF1VisibleCandles] = useState(candles.length);
  const [f1LivePrice, setF1LivePrice] = useState(candles[candles.length - 1].close);
  const [f1LivePct, setF1LivePct] = useState(parseFloat(((candles[candles.length - 1].close - candles[0].open) / candles[0].open * 100).toFixed(1)));
  const [f1VisibleLevels, setF1VisibleLevels] = useState(taLevels.length);
  const [f1ShowLiquidityZone, setF1ShowLiquidityZone] = useState(true);
  const [f1PillsVisible, setF1PillsVisible] = useState([true, true, true]);
  const [f1PillSupport, setF1PillSupport] = useState(55.5);
  const [f1PillLiqZone, setF1PillLiqZone] = useState(58.0);
  const [f1PillRSI, setF1PillRSI] = useState(68.7);
  const [f1IndicatorsVisible, setF1IndicatorsVisible] = useState([true, true, true, true]);
  const [f1ChartPanelVisible, setF1ChartPanelVisible] = useState(true);
  const [f1TransitionVisible, setF1TransitionVisible] = useState(true);
  const [f1StreamedWords, setF1StreamedWords] = useState(f1TransitionWords.length);

  // Frame 2 animation state
  const [f2Playing, setF2Playing] = useState(false);
  const [f2HeaderVisible, setF2HeaderVisible] = useState(true);
  const [f2TapeVisible, setF2TapeVisible] = useState(true);
  const [f2DisplayedRows, setF2DisplayedRows] = useState<FlowRow[]>(flowRows);
  const [f2AskPct, setF2AskPct] = useState(72);
  const [f2LargestText, setF2LargestText] = useState('OXY 65C');
  const [f2CardValues, setF2CardValues] = useState(['OXY 65C', '$3.1M', 'Low']);
  const [f2CardFlash, setF2CardFlash] = useState<('green' | 'red' | null)[]>([null, null, null]);
  const [f2CardsVisible, setF2CardsVisible] = useState(true);
  const [f2HighlightedRows, setF2HighlightedRows] = useState<number[]>([]);
  const [f2TransitionVisible, setF2TransitionVisible] = useState(true);
  const [f2StreamedWords, setF2StreamedWords] = useState(f2TransitionWords.length);

  // Frame 3 animation state
  const [f3Playing, setF3Playing] = useState(false);
  const [f3HeaderVisible, setF3HeaderVisible] = useState(true);
  const [f3NetPrem, setF3NetPrem] = useState(7.2);
  const [f3DarkPool, setF3DarkPool] = useState(40);
  const [f3FlowBiasVisible, setF3FlowBiasVisible] = useState(true);
  const [f3FlowWidths, setF3FlowWidths] = useState([72, 18, 10]);
  const [f3MMVisible, setF3MMVisible] = useState(true);
  const [f3MMVisibleRows, setF3MMVisibleRows] = useState(mmRows.length);
  const [f3MMTagsVisible, setF3MMTagsVisible] = useState(true);
  const [f3ScoreVisible, setF3ScoreVisible] = useState(true);
  const [f3ScoreValues, setF3ScoreValues] = useState([86, 72, 92, 88]);
  const [f3Composite, setF3Composite] = useState(85);
  const [f3ConclusionVisible, setF3ConclusionVisible] = useState(true);
  const [f3StreamedWords, setF3StreamedWords] = useState(f3ConclusionWords.length);

  const openPrice = candles[0].open;

  const playFrame1 = useCallback(async () => {
    if (f1Playing) return;
    setF1Playing(true);

    // ── Reset everything hidden ──
    setVisibleWords(0);
    setF1ChartPanelVisible(false);
    setF1VisibleCandles(0);
    setF1VisibleLevels(0);
    setF1ShowLiquidityZone(false);
    setF1LivePrice(openPrice);
    setF1LivePct(0);
    setF1PillsVisible([false, false, false]);
    setF1PillSupport(0);
    setF1PillLiqZone(0);
    setF1PillRSI(0);
    setF1IndicatorsVisible([false, false, false, false]);
    setF1TransitionVisible(false);
    setF1StreamedWords(0);

    await new Promise(r => setTimeout(r, 200));

    // ── Phase 0: Stream intro text word-by-word ──
    for (let i = 1; i <= words.length; i++) {
      await new Promise(r => setTimeout(r, 60));
      setVisibleWords(i);
    }
    await new Promise(r => setTimeout(r, 400));

    // ── Phase 1: Chart panel fades in (empty) ──
    setF1ChartPanelVisible(true);
    await new Promise(r => setTimeout(r, 400));

    // ── Phase 2: Candles draw with interleaved TA events ──
    for (let i = 1; i <= candles.length; i++) {
      setF1VisibleCandles(i);
      const c = candles[i - 1];
      setF1LivePrice(c.close);
      const pct = ((c.close - openPrice) / openPrice) * 100;
      setF1LivePct(parseFloat(pct.toFixed(1)));
      await new Promise(r => setTimeout(r, 100));

      // Support level sweeps in (no pause — draws while candles continue)
      if (i - 1 === SUPPORT_AFTER) {
        setF1VisibleLevels(1); // Support is taLevels[0]
      }

      // After candle 13: Liquidity zone box fades in
      if (i - 1 === LIQ_ZONE_AFTER) {
        setF1ShowLiquidityZone(true);
        await new Promise(r => setTimeout(r, 350));
      }

      // After last candle: Resistance level sweeps in
      if (i - 1 === RESISTANCE_AFTER) {
        setF1VisibleLevels(2); // Resistance is taLevels[1]
        await new Promise(r => setTimeout(r, 350));
      }
    }

    await new Promise(r => setTimeout(r, 400));

    // ── Phase 3: Metric pills pop in below chart with count-up ──
    for (let i = 0; i < 3; i++) {
      setF1PillsVisible(prev => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      if (i === 0) gsap.to({ val: 0 }, { val: 55.5, duration: 0.6, ease: 'power2.out', onUpdate() { setF1PillSupport(parseFloat(this.targets()[0].val.toFixed(1))); } });
      if (i === 1) gsap.to({ val: 0 }, { val: 58.0, duration: 0.6, ease: 'power2.out', onUpdate() { setF1PillLiqZone(parseFloat(this.targets()[0].val.toFixed(1))); } });
      if (i === 2) gsap.to({ val: 0 }, { val: 68.7, duration: 0.6, ease: 'power2.out', onUpdate() { setF1PillRSI(parseFloat(this.targets()[0].val.toFixed(1))); } });
      await new Promise(r => setTimeout(r, 250));
    }

    await new Promise(r => setTimeout(r, 400));

    // ── Phase 4: TA indicator cards cascade in from right ──
    for (let i = 0; i < 4; i++) {
      setF1IndicatorsVisible(prev => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await new Promise(r => setTimeout(r, 300));
    }

    // ── Phase 5: Transition text streams in ──
    await new Promise(r => setTimeout(r, 400));
    setF1TransitionVisible(true);
    for (let i = 1; i <= f1TransitionWords.length; i++) {
      await new Promise(r => setTimeout(r, 50));
      setF1StreamedWords(i);
    }

    setF1Playing(false);
  }, [f1Playing, openPrice]);

  const playFrame2 = useCallback(async () => {
    if (f2Playing) return;
    setF2Playing(true);

    // ── Reset everything hidden ──
    setF2HeaderVisible(false);
    setF2TapeVisible(false);
    setF2DisplayedRows(dummyFlowPool.slice(0, 7));
    setF2AskPct(0);
    setF2LargestText('—');
    setF2CardValues(['—', '—', '—']);
    setF2CardFlash([null, null, null]);
    setF2CardsVisible(false);
    setF2HighlightedRows([]);
    setF2TransitionVisible(false);
    setF2StreamedWords(0);

    await new Promise(r => setTimeout(r, 300));

    // ── Phase 1: Header fades in (metrics at zero) ──
    setF2HeaderVisible(true);
    await new Promise(r => setTimeout(r, 500));

    // ── Phase 2: Tape + cards appear + rolling scan ──
    setF2TapeVisible(true);
    setF2CardsVisible(true);
    await new Promise(r => setTimeout(r, 200));

    const getRandomRows = () => {
      const shuffled = [...dummyFlowPool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 7);
    };

    // Jitter pools for the three cards
    const clusterJitter = ['OXY 63C', 'OXY 66C', 'OXY 69C', 'OXY 71C', 'OXY 62P', 'OXY 68C', 'OXY 59P', 'OXY 67C', 'OXY 65C'];
    const convictionJitter = ['$410K', '$1.2M', '$880K', '$1.5M', '$2.1M', '$950K', '$290K', '$680K', '$1.8M', '$3.1M'];
    const noiseJitter = ['High', 'Medium', 'High', 'Low', 'Medium', 'High', 'Low', 'Medium'];
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    let flashToggle = 0;
    const jitterCards = (rows: FlowRow[]) => {
      flashToggle++;
      const topRow = rows[0];
      // Alternate flashes more aggressively — every 2-3 ticks swap color
      const forceColor: 'green' | 'red' = topRow.bias === 'BEARISH' || flashToggle % 3 === 0 ? 'red' : 'green';
      setF2CardValues([pick(clusterJitter), pick(convictionJitter), pick(noiseJitter)]);
      setF2CardFlash([forceColor, forceColor, forceColor]);
    };

    // Fast phase: 20 swaps at 80ms, ask% counts 0→50
    for (let i = 0; i < 20; i++) {
      const rows = getRandomRows();
      setF2DisplayedRows(rows);
      jitterCards(rows);
      setF2AskPct(Math.min(72, Math.round((i / 20) * 50)));
      await new Promise(r => setTimeout(r, 80));
    }

    // Deceleration phase 1: 8 swaps at 150ms, ask% 50→65
    for (let i = 0; i < 8; i++) {
      const rows = getRandomRows();
      setF2DisplayedRows(rows);
      jitterCards(rows);
      setF2AskPct(Math.min(72, 50 + Math.round((i / 8) * 15)));
      await new Promise(r => setTimeout(r, 150));
    }

    // Deceleration phase 2: 5 swaps at 300ms, ask% 65→70
    for (let i = 0; i < 5; i++) {
      const rows = getRandomRows();
      setF2DisplayedRows(rows);
      jitterCards(rows);
      setF2AskPct(Math.min(72, 65 + Math.round((i / 5) * 5)));
      await new Promise(r => setTimeout(r, 300));
    }

    // Deceleration phase 3: 3 swaps at 500ms (almost stopped)
    for (let i = 0; i < 3; i++) {
      const rows = getRandomRows();
      setF2DisplayedRows(rows);
      jitterCards(rows);
      setF2AskPct(Math.min(72, 70 + i));
      await new Promise(r => setTimeout(r, 500));
    }

    // ── Phase 3: Final settle — real rows lock in ──
    setF2AskPct(72);
    setF2LargestText('OXY 65C');
    setF2DisplayedRows(flowRows);
    setF2CardValues(['OXY 65C', '$3.1M', 'Low']);
    setF2CardFlash([null, null, null]);
    await new Promise(r => setTimeout(r, 300));

    // Flash bullish rows top-to-bottom
    for (let i = 0; i < flowRows.length; i++) {
      setF2HighlightedRows(prev => [...prev, i]);
      await new Promise(r => setTimeout(r, 120));
    }

    // ── Phase 4: Transition text streams ──
    await new Promise(r => setTimeout(r, 400));
    setF2TransitionVisible(true);
    for (let i = 1; i <= f2TransitionWords.length; i++) {
      await new Promise(r => setTimeout(r, 50));
      setF2StreamedWords(i);
    }

    setF2Playing(false);
  }, [f2Playing]);

  const playFrame3 = useCallback(async () => {
    if (f3Playing) return;
    setF3Playing(true);

    // ── Reset everything hidden ──
    setF3HeaderVisible(false);
    setF3NetPrem(0);
    setF3DarkPool(0);
    setF3FlowBiasVisible(false);
    setF3FlowWidths([0, 0, 0]);
    setF3MMVisible(false);
    setF3MMVisibleRows(0);
    setF3MMTagsVisible(false);
    setF3ScoreVisible(false);
    setF3ScoreValues([0, 0, 0, 0]);
    setF3Composite(0);
    setF3ConclusionVisible(false);
    setF3StreamedWords(0);

    await new Promise(r => setTimeout(r, 300));

    // ── Phase 1: Summary header fades in + pills count up ──
    setF3HeaderVisible(true);
    gsap.to({ val: 0 }, { val: 7.2, duration: 1.0, ease: 'power2.out', onUpdate() { setF3NetPrem(parseFloat(this.targets()[0].val.toFixed(1))); } });
    gsap.to({ val: 0 }, { val: 40, duration: 1.0, ease: 'power2.out', onUpdate() { setF3DarkPool(Math.round(this.targets()[0].val)); } });
    await new Promise(r => setTimeout(r, 600));

    // ── Phase 2: Flow bias bar — segments race to fill one at a time ──
    setF3FlowBiasVisible(true);
    await new Promise(r => setTimeout(r, 300));
    // Green shoots first
    await new Promise<void>(resolve => {
      gsap.to({ val: 0 }, { val: 72, duration: 0.9, ease: 'power2.out', onUpdate() { setF3FlowWidths(prev => [Math.round(this.targets()[0].val), prev[1], prev[2]]); }, onComplete: resolve });
    });
    await new Promise(r => setTimeout(r, 200));
    // Red follows
    await new Promise<void>(resolve => {
      gsap.to({ val: 0 }, { val: 18, duration: 0.6, ease: 'power2.out', onUpdate() { setF3FlowWidths(prev => [prev[0], Math.round(this.targets()[0].val), prev[2]]); }, onComplete: resolve });
    });
    await new Promise(r => setTimeout(r, 150));
    // Gray last
    await new Promise<void>(resolve => {
      gsap.to({ val: 0 }, { val: 10, duration: 0.4, ease: 'power2.out', onUpdate() { setF3FlowWidths(prev => [prev[0], prev[1], Math.round(this.targets()[0].val)]); }, onComplete: resolve });
    });
    await new Promise(r => setTimeout(r, 400));

    // ── Phase 3: MM positioning — bars grow outward from center, row by row ──
    setF3MMVisible(true);
    await new Promise(r => setTimeout(r, 200));
    for (let i = 1; i <= mmRows.length; i++) {
      setF3MMVisibleRows(i);
      await new Promise(r => setTimeout(r, 80));
    }
    await new Promise(r => setTimeout(r, 300));
    // Tags pop in after bars fill
    setF3MMTagsVisible(true);
    await new Promise(r => setTimeout(r, 500));

    // ── Phase 4: Donut charts — arcs fill + scores count up ──
    setF3ScoreVisible(true);
    await new Promise(r => setTimeout(r, 200));
    const targets = [86, 72, 92, 88];
    for (let idx = 0; idx < 4; idx++) {
      gsap.to({ val: 0 }, {
        val: targets[idx],
        duration: 0.5,
        ease: 'power2.out',
        onUpdate() {
          setF3ScoreValues(prev => {
            const next = [...prev];
            next[idx] = Math.round(this.targets()[0].val);
            return next;
          });
        },
      });
      await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 400));

    // ── Phase 5: Composite score — flicker then settle on 85 ──
    const flickerValues = [42, 67, 91, 73, 58, 96, 34, 81, 77, 63, 89, 45, 92, 71, 88];
    for (const v of flickerValues) {
      setF3Composite(v);
      await new Promise(r => setTimeout(r, 35));
    }
    setF3Composite(85);
    await new Promise(r => setTimeout(r, 500));

    // ── Phase 6: Conclusion text streams word-by-word ──
    setF3ConclusionVisible(true);
    for (let i = 1; i <= f3ConclusionWords.length; i++) {
      await new Promise(r => setTimeout(r, 45));
      setF3StreamedWords(i);
    }

    setF3Playing(false);
  }, [f3Playing]);

  return (
    <div className="flex flex-col items-start gap-10">
      {/* ===== All 3 frames side-by-side ===== */}
      <div className="flex items-start gap-12">

        {/* FRAME 1 — Technical Analysis */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
            Frame 1
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
            0:50 – 1:00
          </span>
          <button
            onClick={playFrame1}
            className="rounded-full px-3 py-1 text-[10px] font-mono tracking-wide uppercase transition-colors hover:opacity-80 cursor-pointer"
            style={{
              background: f1Playing ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.85)',
              color: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {f1Playing ? '● Playing...' : '▶ Play'}
          </button>
        </div>
        <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
          Technical Analysis — OXY
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
          Price action, moving averages, RSI, and key technical levels on OXY's daily chart.
        </p>
      </div>

          {/* Xynth AI streamed text */}
          <div className="w-[620px]">
            <p className="text-[15px] leading-relaxed font-light">
              {words.map((word, i) => {
                let color: string;
                if (i < 18) color = '#1a1a2e';
                else if (i < 30) color = 'rgba(26,26,46,0.55)';
                else color = 'rgba(26,26,46,0.3)';
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

      <div className="w-[780px] flex flex-col gap-3">

            {/* Chart LEFT + TA indicators RIGHT */}
            <div className="grid grid-cols-[520px_1fr] gap-3">
              {/* Left column: Chart + metric pills below */}
              <div className="flex flex-col gap-3">
                {/* Chart — progressive candle + level reveal */}
                <motion.div
                  animate={{ opacity: f1ChartPanelVisible ? 1 : 0, y: f1ChartPanelVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="rounded-[24px] px-4 py-4"
                  style={panelStyle}
                >
                  <TAPriceChart candles={candles} levels={taLevels} visibleCandles={f1VisibleCandles} visibleLevels={f1VisibleLevels} livePrice={f1LivePrice} livePct={f1LivePct} liqZone={liquidityZone} showLiquidityZone={f1ShowLiquidityZone} />
                </motion.div>

                {/* Metric pills — appear below chart with count-up */}
                <div className="grid grid-cols-3 gap-2">
                  <AnimatePresence>
                    {f1PillsVisible[0] && (
                      <motion.div key="support" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                        className="rounded-[16px] px-3.5 py-2.5" style={panelStyle}>
                        <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">Support</p>
                        <p className="text-[20px] font-semibold tabular-nums tracking-tight" style={{ color: '#34d399' }}>{f1PillSupport.toFixed(1)}</p>
                      </motion.div>
                    )}
                    {f1PillsVisible[1] && (
                      <motion.div key="liqzone" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                        className="rounded-[16px] px-3.5 py-2.5" style={panelStyle}>
                        <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">Liq Zone</p>
                        <p className="text-[20px] font-semibold tabular-nums tracking-tight" style={{ color: '#60a5fa' }}>{f1PillLiqZone.toFixed(1)}</p>
                      </motion.div>
                    )}
                    {f1PillsVisible[2] && (
                      <motion.div key="rsi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                        className="rounded-[16px] px-3.5 py-2.5" style={panelStyle}>
                        <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/35">RSI (14)</p>
                        <p className="text-[20px] font-semibold tabular-nums tracking-tight" style={{ color: 'rgba(255,255,255,0.76)' }}>{f1PillRSI.toFixed(1)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* TA indicators — cascade in from right */}
              <div className="flex flex-col gap-3">
                {taIndicators.map((ind, idx) => (
                  <motion.div
                    key={ind.label}
                    animate={{
                      opacity: f1IndicatorsVisible[idx] ? 1 : 0,
                      x: f1IndicatorsVisible[idx] ? 0 : 40,
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="rounded-[20px] px-4 py-3.5"
                    style={panelStyle}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35">{ind.label}</p>
                      <div className="w-2 h-2 rounded-full" style={{ background: ind.color }} />
                    </div>
                    <p className="text-[16px] font-semibold text-white leading-tight">{ind.value}</p>
                    <p className="text-[10px] text-white/45 mt-1">{ind.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Transition text — streams after TA completes */}
          <motion.div
            animate={{ opacity: f1TransitionVisible ? 1 : 0, y: f1TransitionVisible ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-[780px] mt-1"
          >
            <p className="text-[15px] leading-relaxed font-light">
              {f1TransitionWords.map((word, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < f1StreamedWords ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ color: i < 6 ? '#1a1a2e' : 'rgba(26,26,46,0.5)', display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </motion.div>

      <div className="space-y-2 mt-2" style={{ width: 760 }}>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VFX:</span> Chart draws candles progressively, TA levels sweep in,
            metric pills pop in with count-up, indicator cards cascade from right.
          </p>
        </div>
        <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
            <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "Technicals are strong. Price above both moving averages,
            RSI at 68 with solid momentum. Let me check the options flow."
          </p>
        </div>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center">
          <div className="w-20 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[9px] font-mono mt-1.5 text-center leading-tight">
            flow confirms<br />levels →
          </span>
        </div>

        {/* FRAME 2 — Options Flow */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
                Frame 2
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                1:00 – 1:10
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
            <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
              Options Flow — OXY
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
              Live options tape scanning for sweeps, blocks, and unusual activity on OXY contracts.
            </p>
          </div>

          <div className="w-[660px] flex flex-col gap-3">

            {/* Flow header */}
            <motion.div
              animate={{ opacity: f2HeaderVisible ? 1 : 0, y: f2HeaderVisible ? 0 : 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-[24px] px-5 py-4 flex items-center justify-between"
              style={panelStyle}
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">
                  Live Tape — OXY
                </p>
                <p className="text-[14px] text-white mt-1">
                  Ask-side calls still leading the tape.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MetricPill label="ask-side" value={`${f2AskPct}%`} accent="rgba(16,185,129,0.16)" text="#bbf7d0" />
                <MetricPill label="largest" value={f2LargestText} accent="rgba(99,102,241,0.16)" text="#c7d2fe" />
              </div>
            </motion.div>

            {/* Flow tape + summary sidebar */}
            <div className="grid grid-cols-[1fr_200px] gap-3">
              {/* Tape rows — rolling scanner */}
              <motion.div
                animate={{ opacity: f2TapeVisible ? 1 : 0, y: f2TapeVisible ? 0 : 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="rounded-[24px] px-4 py-4 space-y-2.5"
                style={panelStyle}
              >
                {f2DisplayedRows.map((row, i) => (
                  <div
                    key={`tape-${i}`}
                    style={{
                      boxShadow: f2HighlightedRows.includes(i) && row.bias === 'BULLISH'
                        ? '0 0 12px rgba(52,211,153,0.35), inset 0 0 8px rgba(52,211,153,0.08)'
                        : 'none',
                      borderRadius: 20,
                      transition: 'box-shadow 0.4s ease-out',
                    }}
                  >
                    <FlowRowCard row={row} />
                  </div>
                ))}
              </motion.div>

              {/* Summary cards — appear with tape, values jitter live */}
              <motion.div
                animate={{ opacity: f2CardsVisible ? 1 : 0, y: f2CardsVisible ? 0 : 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col gap-3"
              >
                {[
                  { title: 'Cluster', note: 'Same strike keeps getting hit.', accent: '#34d399' },
                  { title: 'Conviction', note: 'Big money, not retail.', accent: '#60a5fa' },
                  { title: 'Noise', note: 'Speculative flow is contained.', accent: '#f59e0b' },
                ].map((card, idx) => (
                  <SummaryCard
                    key={card.title}
                    title={card.title}
                    value={f2CardValues[idx]}
                    note={card.note}
                    accent={card.accent}
                    flash={f2CardFlash[idx]}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Transition text — streams after flow scan completes */}
          <motion.div
            animate={{ opacity: f2TransitionVisible ? 1 : 0, y: f2TransitionVisible ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-[660px] mt-1"
          >
            <p className="text-[15px] leading-relaxed font-light">
              {f2TransitionWords.map((word, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < f2StreamedWords ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ color: i < 8 ? '#1a1a2e' : 'rgba(26,26,46,0.5)', display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <div className="space-y-2 mt-2" style={{ width: 660 }}>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VFX:</span> Tape rolls fast with dummy rows (slot-machine style),
                header metrics count up live, tape decelerates and locks on real rows, bullish rows flash green,
                summary cards cascade in from right.
              </p>
            </div>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "Ask-side calls leading the tape, 72% on the ask.
                $3.1M lead sweep at 65 strike. This is institutional sizing, not retail."
              </p>
            </div>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center">
          <div className="w-20 h-px bg-zinc-300" />
          <span className="text-zinc-400 text-[9px] font-mono mt-1.5 text-center leading-tight">
            summary →
          </span>
        </div>

        {/* FRAME 3 — Quant Summary */}
        <div className="flex flex-col items-start gap-5 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 bg-zinc-200 px-2.5 py-1 rounded-full">
                Frame 3
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                1:10 – 1:20
              </span>
              <button
                onClick={playFrame3}
                className="rounded-full px-3 py-1 text-[10px] font-mono tracking-wide uppercase transition-colors hover:opacity-80 cursor-pointer"
                style={{
                  background: f3Playing ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.85)',
                  color: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                {f3Playing ? '● Playing...' : '▶ Play'}
              </button>
            </div>
            <h2 className="text-lg font-semibold text-zinc-800 tracking-tight">
              Quantitative Summary — OXY
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
              Xynth compresses the technicals, options flow, and market maker positioning into a single quantitative score.
            </p>
          </div>

          <div className="w-[560px] flex flex-col gap-3">

            {/* Summary header */}
            <motion.div
              animate={{ opacity: f3HeaderVisible ? 1 : 0, y: f3HeaderVisible ? 0 : 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-[24px] px-6 py-4 flex items-center justify-between"
              style={panelStyle}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[24px] font-bold tracking-tight text-white leading-none">OXY</span>
                <span className="text-[11px] text-white/50">Quantitative Summary</span>
              </div>
              <div className="flex items-center gap-2">
                <MetricPill label="net prem" value={`$${f3NetPrem.toFixed(1)}M`} accent="rgba(52,211,153,0.16)" text="#bbf7d0" />
                <MetricPill label="dark pool" value={`+${f3DarkPool}%`} accent="rgba(96,165,250,0.16)" text="#93c5fd" />
              </div>
            </motion.div>

            {/* Flow Bias — segments race to fill */}
            <motion.div
              animate={{ opacity: f3FlowBiasVisible ? 1 : 0, y: f3FlowBiasVisible ? 0 : 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-[24px] px-6 py-4"
              style={panelStyle}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35 mb-3">Options Tape — Flow Bias</p>
              <div className="rounded-full overflow-hidden flex" style={{ height: 18 }}>
                {flowBreakdown.map((seg, idx) => (
                  <div
                    key={seg.label}
                    className="h-full flex items-center justify-center"
                    style={{
                      width: `${f3FlowWidths[idx]}%`,
                      background: seg.color,
                      transition: 'width 0.3s ease-out',
                    }}
                  >
                    {f3FlowWidths[idx] > 5 && (
                      <span className="text-[7px] font-mono font-bold text-black/70">{f3FlowWidths[idx]}%</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-2">
                {flowBreakdown.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: seg.color }} />
                    <span className="text-[8px] text-white/40">{seg.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Market Maker Positioning — bars grow outward, rows stagger */}
            <motion.div
              animate={{ opacity: f3MMVisible ? 1 : 0, y: f3MMVisible ? 0 : 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-[24px] px-6 py-4"
              style={panelStyle}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35 mb-3">Market Maker Positioning</p>
              <div className="space-y-1.5">
                {mmRows.map((row, idx) => {
                  const visible = idx < f3MMVisibleRows;
                  return (
                    <div key={row.strike} className="flex items-center gap-2" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease-out' }}>
                      <span className="text-[10px] font-mono text-white/40 w-7 text-right shrink-0">{row.strike}</span>
                      <div className="flex-1 flex items-center" style={{ height: 14 }}>
                        <div className="flex-1 flex justify-end">
                          <div
                            className="h-3 rounded-l-sm"
                            style={{
                              width: visible ? `${row.puts}%` : '0%',
                              background: 'linear-gradient(270deg, rgba(251,113,133,0.85), rgba(251,113,133,0.3))',
                              transition: 'width 0.4s ease-out',
                            }}
                          />
                        </div>
                        <div className="w-px h-4 bg-white/15 shrink-0" />
                        <div className="flex-1">
                          <div
                            className="h-3 rounded-r-sm"
                            style={{
                              width: visible ? `${row.calls}%` : '0%',
                              background: 'linear-gradient(90deg, rgba(52,211,153,0.85), rgba(52,211,153,0.3))',
                              transition: 'width 0.4s ease-out',
                            }}
                          />
                        </div>
                      </div>
                      {row.tag ? (
                        <motion.span
                          animate={{ opacity: f3MMTagsVisible ? 1 : 0, scale: f3MMTagsVisible ? 1 : 0.6 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                          className="text-[7px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                        >
                          {row.tag}
                        </motion.span>
                      ) : (
                        <span className="w-12 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-5 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2 rounded-sm" style={{ background: 'rgba(251,113,133,0.7)' }} />
                  <span className="text-[8px] text-white/40">Puts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2 rounded-sm" style={{ background: 'rgba(52,211,153,0.7)' }} />
                  <span className="text-[8px] text-white/40">Calls</span>
                </div>
              </div>
            </motion.div>

            {/* Technical Score — Donut Charts with animated values */}
            <motion.div
              animate={{ opacity: f3ScoreVisible ? 1 : 0, y: f3ScoreVisible ? 0 : 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-[24px] px-6 py-4"
              style={panelStyle}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35 mb-3">Technical Score</p>
              <RadarChart scores={techScores.map((s, i) => ({ ...s, score: f3ScoreValues[i] }))} composite={f3Composite} />
            </motion.div>
          </div>

          {/* Conclusion text — streams after all panels complete */}
          <motion.div
            animate={{ opacity: f3ConclusionVisible ? 1 : 0, y: f3ConclusionVisible ? 0 : 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-[560px] mt-1"
          >
            <p className="text-[15px] leading-relaxed font-light">
              {f3ConclusionWords.map((word, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i < f3StreamedWords ? 1 : 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{ color: i < 12 ? '#1a1a2e' : 'rgba(26,26,46,0.5)', display: 'inline' }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <div className="space-y-2 mt-2" style={{ width: 560 }}>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VFX:</span> Panels float in staggered (top to bottom), header pills count up from zero,
                flow bias bar segments race across (green first, red second, gray last), MM bars grow outward from center divider
                with per-row stagger, tags bounce in with spring, donut arcs fill one by one, composite score flickers slot-machine
                style then locks on 85, conclusion text streams word-by-word.
              </p>
            </div>
            <div className="border border-dashed border-zinc-300 rounded-lg p-2.5">
              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                <span className="font-bold text-zinc-600">VOICEOVER:</span> Xynth: "Alright so the technicals are clean and the flow is completely one sided. The chart held support, pushed through the consolidation zone, and now institutions are aggressively buying calls at the same strike. Dark pool volume is up 40 percent this week which means someone has been quietly loading up shares off exchange before any of this flow went public. That does not happen by accident. Everything is lining up. I think we should be in this."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TAPriceChart({
  candles,
  levels,
  visibleCandles = candles.length,
  visibleLevels = levels.length,
  livePrice,
  livePct,
  liqZone,
  showLiquidityZone = false,
}: {
  candles: Candle[]
  levels: TALevel[]
  visibleCandles?: number
  visibleLevels?: number
  livePrice?: number
  livePct?: number
  liqZone?: { top: number; bottom: number; startIndex: number; endIndex: number }
  showLiquidityZone?: boolean
}) {
  const width = 490
  const height = 340
  const paddingX = 18
  const headerH = 44
  const paddingY = 20
  const innerWidth = width - paddingX * 2
  const chartTop = headerH + paddingY
  const chartHeight = height - chartTop - paddingY
  const values = [...candles.flatMap((c) => [c.high, c.low]), ...levels.map((l) => l.price)]
  const max = Math.max(...values) + 0.5
  const min = Math.min(...values) - 0.5
  const priceToY = (price: number) => chartTop + ((max - price) / (max - min)) * chartHeight
  const stepX = innerWidth / candles.length

  // Current price tracks the latest visible candle
  const lastVisibleCandle = visibleCandles > 0 ? candles[visibleCandles - 1] : null
  const currentPrice = lastVisibleCandle ? lastVisibleCandle.close : candles[0].open

  // Display price — use livePrice prop if provided, else currentPrice
  const displayPrice = livePrice ?? currentPrice
  const displayPct = livePct ?? 0

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[340px] rounded-[24px]" style={{ background: 'rgba(255,255,255,0.025)' }}>
      {/* ── Ticker header inside chart ── */}
      <text x={paddingX} y={22} fill="#ffffff" fontSize="18" fontWeight="600" style={{ letterSpacing: '-0.02em' }}>
        OXY
      </text>
      <text x={paddingX + 46} y={22} fill="rgba(255,255,255,0.35)" fontSize="10">
        Occidental Petroleum
      </text>
      <text x={paddingX} y={40} fill="rgba(255,255,255,0.8)" fontSize="14" fontWeight="600" style={{ letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>
        ${displayPrice.toFixed(2)}
      </text>
      <text
        x={paddingX + 68}
        y={40}
        fill={displayPct >= 0 ? '#34d399' : '#fb7185'}
        fontSize="11"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {displayPct >= 0 ? '+' : ''}{displayPct.toFixed(1)}%
      </text>

      {/* Divider line below header */}
      <line x1={paddingX} x2={width - paddingX} y1={headerH} y2={headerH} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Grid lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const y = chartTop + (chartHeight / 5) * i
        return (
          <line
            key={i}
            x1={paddingX}
            x2={width - paddingX}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        )
      })}

      {/* Liquidity zone — contained box spanning only consolidation candles */}
      {liqZone && (() => {
        const zoneX = paddingX + stepX * liqZone.startIndex;
        const zoneW = stepX * (liqZone.endIndex - liqZone.startIndex + 1);
        const zoneY = priceToY(liqZone.top);
        const zoneH = priceToY(liqZone.bottom) - zoneY;
        return (
          <g style={{ opacity: showLiquidityZone ? 1 : 0, transition: 'opacity 0.6s ease-out' }}>
            <rect
              x={zoneX}
              y={zoneY}
              width={zoneW}
              height={zoneH}
              rx={4}
              fill="rgba(96,165,250,0.08)"
              stroke="rgba(96,165,250,0.25)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x={zoneX + 4}
              y={zoneY + 11}
              fill="rgba(96,165,250,0.55)"
              fontSize="7"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' as const }}
            >
              Liq Zone
            </text>
          </g>
        );
      })()}

      {/* TA levels — sweep in with CSS transition on opacity */}
      {levels.map((level, idx) => {
        const y = priceToY(level.price)
        const visible = idx < visibleLevels
        return (
          <g
            key={level.name}
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
            }}
          >
            <line
              x1={paddingX}
              x2={width - paddingX}
              y1={y}
              y2={y}
              stroke={level.stroke}
              strokeWidth={level.dash ? '1.2' : '1.8'}
              strokeDasharray={level.dash || 'none'}
              style={{
                strokeDashoffset: visible ? 0 : (width - paddingX * 2),
                transition: 'stroke-dashoffset 0.6s ease-out',
              }}
            />
            <rect
              x={width - 108}
              y={y - 10}
              width={84}
              height={20}
              rx={10}
              fill="rgba(24,24,27,0.85)"
              stroke="rgba(255,255,255,0.08)"
            />
            <text
              x={width - 66}
              y={y + 3.5}
              textAnchor="middle"
              fill="rgba(255,255,255,0.72)"
              fontSize="8.5"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              {level.name}
            </text>
          </g>
        )
      })}

      {/* Candlesticks — only show up to visibleCandles */}
      {candles.map((candle, index) => {
        if (index >= visibleCandles) return null
        const x = paddingX + stepX * index + stepX / 2
        const wickTop = priceToY(candle.high)
        const wickBottom = priceToY(candle.low)
        const bodyTop = priceToY(Math.max(candle.open, candle.close))
        const bodyBottom = priceToY(Math.min(candle.open, candle.close))
        const bodyHeight = Math.max(3, bodyBottom - bodyTop)
        const up = candle.close >= candle.open
        const color = up ? 'rgba(52,211,153,0.88)' : 'rgba(251,113,133,0.86)'
        const isLatest = index === visibleCandles - 1

        return (
          <g key={index} style={{ opacity: isLatest ? 1 : 0.75 }}>
            <line x1={x} x2={x} y1={wickTop} y2={wickBottom} stroke={color} strokeWidth="1.4" />
            <rect x={x - 4.6} y={bodyTop} width={9.2} height={bodyHeight} rx={2.4} fill={color} />
            {/* Glow pulse on latest candle */}
            {isLatest && (
              <rect
                x={x - 6}
                y={bodyTop - 1.5}
                width={12}
                height={bodyHeight + 3}
                rx={3}
                fill="none"
                stroke={up ? 'rgba(52,211,153,0.4)' : 'rgba(251,113,133,0.4)'}
                strokeWidth="2"
              >
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.8s" repeatCount="indefinite" />
              </rect>
            )}
          </g>
        )
      })}

      {/* Volume bars — only show up to visibleCandles */}
      {candles.map((candle, index) => {
        if (index >= visibleCandles) return null
        const x = paddingX + stepX * index + stepX / 2
        const up = candle.close >= candle.open
        const vol = Math.abs(candle.close - candle.open) * 18 + 6
        return (
          <rect
            key={`vol-${index}`}
            x={x - 3}
            y={height - paddingY - vol}
            width={6}
            height={vol}
            rx={1.5}
            fill={up ? 'rgba(52,211,153,0.2)' : 'rgba(251,113,133,0.2)'}
          />
        )
      })}

      {/* Current price marker — follows latest visible candle */}
      {visibleCandles > 0 && (
        <>
          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={priceToY(currentPrice)}
            y2={priceToY(currentPrice)}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1"
            strokeDasharray="3 5"
            style={{ transition: 'y1 0.1s ease-out, y2 0.1s ease-out' }}
          />
          <rect
            x={width - 84}
            y={priceToY(currentPrice) - 11}
            width={60}
            height={22}
            rx={11}
            fill="rgba(24,24,27,0.88)"
            stroke="rgba(255,255,255,0.08)"
            style={{ transition: 'y 0.1s ease-out' }}
          />
          <text
            x={width - 54}
            y={priceToY(currentPrice) + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            style={{ letterSpacing: '0.12em', transition: 'y 0.1s ease-out' }}
          >
            {currentPrice.toFixed(1)}
          </text>
        </>
      )}

      {/* Time labels */}
      {['09:30', '11:00', '13:00', '15:30'].map((label, index) => (
        <text
          key={label}
          x={paddingX + (innerWidth / 3) * index}
          y={height - 6}
          fill="rgba(255,255,255,0.28)"
          fontSize="8.5"
          style={{ letterSpacing: '0.12em' }}
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

function FlowRowCard({ row }: { row: FlowRow }) {
  const routeTone =
    row.route === 'ASK'
      ? { bg: 'rgba(16,185,129,0.16)', text: '#bbf7d0' }
      : row.route === 'BID'
        ? { bg: 'rgba(251,113,133,0.16)', text: '#fecdd3' }
        : { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.72)' }

  const biasTone =
    row.bias === 'BULLISH'
      ? { bg: 'rgba(16,185,129,0.16)', text: '#bbf7d0' }
      : row.bias === 'BEARISH'
        ? { bg: 'rgba(251,113,133,0.16)', text: '#fecdd3' }
        : { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.72)' }

  const barColor =
    row.bias === 'BULLISH'
      ? 'linear-gradient(90deg, rgba(16,185,129,0.22), rgba(16,185,129,0.84))'
      : row.bias === 'BEARISH'
        ? 'linear-gradient(90deg, rgba(251,113,133,0.22), rgba(251,113,133,0.84))'
        : 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.38))'

  return (
    <div
      className="rounded-[20px] px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="w-[58px] text-[10px] font-mono text-white/36 shrink-0">{row.time}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-semibold text-white">{row.ticker}</span>
            <span className="text-[12px] text-white/78">{row.contract}</span>
            <Tag label={row.route} bg={routeTone.bg} color={routeTone.text} />
            <Tag label={row.bias} bg={biasTone.bg} color={biasTone.text} />
            <Tag label={row.type} bg="rgba(99,102,241,0.14)" color="#c7d2fe" />
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono text-white/42">
            <span>premium {row.premium}</span>
            <span>size {row.size}</span>
          </div>
        </div>

        <div className="w-[92px] shrink-0">
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${row.emphasis}%`, background: barColor }} />
          </div>
        </div>
      </div>
    </div>
  )
}


function MetricPill({
  label,
  value,
  accent,
  text,
}: {
  label: string
  value: string
  accent: string
  text: string
}) {
  return (
    <div className="rounded-full px-3 py-1.5 flex items-center gap-2" style={{ background: accent, border: '1px solid rgba(255,255,255,0.05)' }}>
      <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.42)' }}>
        {label}
      </span>
      <span className="text-[10px] font-mono font-semibold" style={{ color: text }}>
        {value}
      </span>
    </div>
  )
}

function Tag({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      className="rounded-full px-2 py-1 text-[8px] font-mono uppercase tracking-widest"
      style={{ background: bg, color }}
    >
      {label}
    </span>
  )
}

function RadarChart({ scores, composite }: { scores: { label: string; value: string; score: number; color: string }[]; composite: number }) {
  const r = 28;
  const strokeW = 5;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-3">
        {scores.map((s) => {
          const filled = (s.score / 100) * circumference;
          return (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <svg viewBox="0 0 70 70" className="w-[70px] h-[70px]">
                {/* Background ring */}
                <circle cx={35} cy={35} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeW} />
                {/* Filled arc */}
                <circle
                  cx={35} cy={35} r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={strokeW}
                  strokeDasharray={`${filled} ${circumference - filled}`}
                  strokeDashoffset={circumference * 0.25}
                  strokeLinecap="round"
                  style={{ opacity: 0.85 }}
                />
                {/* Score number */}
                <text x={35} y={37} textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="14" fontWeight="600">
                  {s.score}
                </text>
              </svg>
              <p className="text-[7px] font-mono uppercase tracking-widest text-white/35">{s.label}</p>
              <p className="text-[10px] text-white/60 -mt-1">{s.value}</p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <span className="text-[9px] font-mono text-white/30">Composite</span>
        <span className="text-[14px] font-semibold" style={{ color: '#34d399' }}>{composite} / 100</span>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, note, accent = '#ffffff', flash = null }: { title: string; value: string; note: string; accent?: string; flash?: 'green' | 'red' | null }) {
  const flashColor = flash === 'green' ? 'rgba(52,211,153,0.5)' : flash === 'red' ? 'rgba(251,113,133,0.5)' : 'transparent';
  return (
    <div
      className="rounded-[20px] px-4 py-3.5"
      style={{
        ...panelStyle,
        boxShadow: `inset 0 0 20px ${flashColor}`,
        transition: 'box-shadow 0.15s ease-out',
      }}
    >
      <p className="text-[8px] font-mono uppercase tracking-[0.22em] text-white/35">{title}</p>
      <p className="text-[16px] font-semibold leading-tight mt-1.5 tabular-nums" style={{ color: accent }}>{value}</p>
      <p className="text-[10px] leading-relaxed text-white/45 mt-1.5">{note}</p>
    </div>
  )
}
