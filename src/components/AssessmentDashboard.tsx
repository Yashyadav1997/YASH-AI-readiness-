import { AssessmentResult } from '../types';
import { 
  BarChart, 
  Map as MapIcon, 
  AlertTriangle, 
  Target, 
  Activity, 
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  result: AssessmentResult;
  onReset: () => void;
}

export function AssessmentDashboard({ result, onReset }: Props) {
  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-rose-500';
    if (score < 70) return 'text-amber-500';
    return 'text-sky-500';
  };

  const getScoreBg = (score: number) => {
    if (score < 40) return 'text-rose-500';
    if (score < 70) return 'text-amber-500';
    return 'text-sky-500';
  };

  const scoreColor = getScoreColor(result.readinessScore);
  const scoreBg = getScoreBg(result.readinessScore);

  const levelDescriptions = {
    "Beginner": "Starting your journey. Focus on education and primary data gathering.",
    "Emerging": "Early experimentation. Focus on proof of concepts and capability building.",
    "Developing": "Scaling initial wins. Focus on infrastructure and broader adoption.",
    "Advanced": "Strong foundations. Focus on optimization and advanced use cases.",
    "AI Driven": "Market leaders. Focus on continuous innovation and autonomous systems."
  } as Record<string, string>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 md:space-y-8 max-w-6xl mx-auto w-full"
    >
      <div className="flex justify-between items-center bg-[#111827]/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] no-print">
         <button
          onClick={onReset}
          className="text-sky-400 hover:text-white font-mono uppercase tracking-widest flex items-center gap-2 transition-colors px-4 py-2 text-[10px] font-bold"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          Re-initialize Scan
        </button>
        
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 hover:from-sky-500/40 hover:to-indigo-500/40 text-sky-400 rounded text-xs font-mono font-bold tracking-widest uppercase transition-all border border-sky-500/30 hover:border-sky-400/80 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-sky-900/50 shadow-[0_0_30px_rgba(56,189,248,0.05)] rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 to-transparent"></div>
          <p className="text-[10px] font-bold text-sky-500/70 uppercase tracking-widest font-mono mb-4 relative z-10">Readiness Score</p>
          <div className="relative w-36 h-36 flex items-center justify-center z-10">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
              <motion.circle 
                initial={{ strokeDashoffset: 402 }}
                animate={{ strokeDashoffset: 402 - (402 * result.readinessScore) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" fill="transparent" className={scoreColor} strokeDasharray="402" strokeLinecap="round" />
            </svg>
            <span className="absolute text-5xl font-bold text-white font-mono">{result.readinessScore}</span>
          </div>
          <p className={`text-sm tracking-widest font-bold mt-6 uppercase ${scoreColor} relative z-10 filter drop-shadow-[0_0_8px_currentColor]`}>{result.readinessLevel}</p>
        </div>

        <div className="col-span-1 md:col-span-2 bg-[#111827]/80 backdrop-blur-xl border border-sky-900/30 rounded-xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <h3 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-sky-400" /> System Analysis Summary
          </h3>
          <p className="text-base text-slate-300 leading-relaxed mb-6 font-sans">
            {result.executiveSummary}
          </p>
          <div className="mt-auto flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-sky-900/20 border border-sky-800/50 rounded-sm text-[10px] font-mono text-sky-300 tracking-wider">#STRATEGIC_ALIGNMENT</span>
            <span className="px-3 py-1.5 bg-indigo-900/20 border border-indigo-800/50 rounded-sm text-[10px] font-mono text-indigo-300 tracking-wider">#DATA_MODERNIZATION</span>
            <p className="text-xs text-slate-400 w-full mt-4 border-l-2 border-sky-500/50 pl-3 italic bg-slate-900/30 py-2 rounded-r pr-2 shadow-sm">{levelDescriptions[result.readinessLevel] || "Progressing along the digital maturity curve."}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Key Gaps */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-rose-900/30 rounded-xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-600/50 to-transparent"></div>
          <h3 className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono mb-5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Vulnerabilities Detected
          </h3>
          <ul className="space-y-4">
            {result.keyGaps.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-4 p-3 bg-rose-950/10 rounded-lg border border-rose-900/20 hover:border-rose-800/50 transition-colors">
                <div className="text-[10px] font-mono text-rose-500 shrink-0 mt-0.5">[{String(idx + 1).padStart(2, '0')}]</div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{gap}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Actions */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-emerald-900/30 rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
          <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono mb-5 flex items-center gap-2">
            <Target className="w-4 h-4" /> Recommended Protocols
          </h3>
          <div className="space-y-4">
            {result.priorityActions.map((action, idx) => (
              <div key={idx} className={`p-4 bg-[#0B101E]/50 border-l-2 rounded-r-lg ${idx === 0 ? 'border-emerald-500' : idx === 1 ? 'border-sky-500' : 'border-indigo-500'}`}>
                <p className={`text-[10px] font-bold font-mono tracking-widest ${idx === 0 ? 'text-emerald-400' : idx === 1 ? 'text-sky-400' : 'text-indigo-400'}`}>
                  {idx === 0 ? '> IMMEDIATE_EXECUTION' : idx === 1 ? '> SHORT_TERM_PHASE' : '> MID_TERM_PHASE'}
                </p>
                <p className="text-sm mt-2 text-slate-200">{action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        <div className="col-span-1 md:col-span-2 bg-[#111827]/80 backdrop-blur-xl border border-sky-900/30 rounded-xl p-8 shadow-lg">
          <h3 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest font-mono mb-8 flex items-center gap-2">
             <MapIcon className="w-4 h-4" /> Operational Roadmap (12 Months)
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative mt-6 gap-6 sm:gap-0">
            <div className="hidden sm:block absolute w-full h-[1px] bg-sky-900/50 top-1/2 -translate-y-1/2"></div>
            {result.roadmap12Month.map((step, idx) => (
              <div key={idx} className="relative flex flex-row sm:flex-col items-center gap-4 sm:gap-4 sm:w-1/4 z-10">
                <div className="w-8 h-8 rounded-full bg-[#0B101E] border border-sky-500/50 flex flex-col items-center justify-center shrink-0 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></div>
                </div>
                <div className="sm:text-center">
                  <p className="text-[10px] text-sky-500 font-mono tracking-widest uppercase font-bold">{step.quarter}</p>
                  <p className="text-sm font-medium mt-1 text-slate-200 leading-tight">
                    {step.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-sky-900/30 rounded-xl p-6 shadow-lg">
          <h3 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest font-mono mb-6 flex items-center gap-2">
            <BarChart className="w-4 h-4" /> Telemetry Targets
          </h3>
          <div className="space-y-4">
             {result.suggestedKPIs.map((kpi, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm p-3 bg-sky-950/20 border border-sky-900/30 rounded">
                  <Activity className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-slate-300 font-medium">{kpi}</span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
