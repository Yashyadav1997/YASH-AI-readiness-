import { AssessmentResult } from '../types';
import { 
  BarChart, 
  Map as MapIcon, 
  AlertTriangle, 
  Target, 
  Activity, 
  ArrowRight,
  Sparkles,
  ChevronRight
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-5 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Readiness Score</p>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className={scoreBg} strokeDasharray="364" strokeDashoffset={364 - (364 * result.readinessScore) / 100} />
            </svg>
            <span className="absolute text-4xl font-bold text-white">{result.readinessScore}</span>
          </div>
          <p className={`text-sm font-semibold mt-4 uppercase ${scoreColor}`}>{result.readinessLevel}</p>
        </div>

        <div className="col-span-1 md:col-span-2 bg-[#1E293B] border border-slate-700 rounded-lg p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Executive Summary
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {result.executiveSummary}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-slate-700 rounded text-[10px] text-slate-300">#StrategicAlignment</span>
            <span className="px-2 py-1 bg-slate-700 rounded text-[10px] text-slate-300">#DataModernization</span>
            <p className="text-xs text-slate-500 w-full mt-2 italic">{levelDescriptions[result.readinessLevel] || "Progressing along the digital maturity curve."}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Key Gaps */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-5">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Key Strategic Gaps
          </h3>
          <ul className="space-y-3">
            {result.keyGaps.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{gap}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Actions */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-5">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" /> Priority Actions
          </h3>
          <div className="space-y-3">
            {result.priorityActions.map((action, idx) => (
              <div key={idx} className={`p-3 bg-slate-800 border-l-4 rounded ${idx === 0 ? 'border-emerald-500' : idx === 1 ? 'border-sky-500' : 'border-slate-500'}`}>
                <p className={`text-xs font-bold ${idx === 0 ? 'text-emerald-400' : idx === 1 ? 'text-sky-400' : 'text-slate-400'}`}>
                  {idx === 0 ? 'IMMEDIATE' : idx === 1 ? 'SHORT-TERM' : 'MID-TERM'}
                </p>
                <p className="text-sm mt-1 text-slate-200">{action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-[#1E293B] border border-slate-700 rounded-lg p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
             <MapIcon className="w-4 h-4" /> 12-Month Implementation Roadmap
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative mt-6 gap-6 sm:gap-0">
            <div className="hidden sm:block absolute w-full h-0.5 bg-slate-700 top-0"></div>
            {result.roadmap12Month.map((step, idx) => (
              <div key={idx} className="relative sm:pt-4 flex flex-row sm:flex-col items-center gap-3 sm:gap-0 sm:w-1/4">
                <div className="hidden sm:block absolute top-[-4px] w-2 h-2 rounded-full bg-sky-500"></div>
                <div className="sm:hidden w-2 h-2 rounded-full bg-sky-500 shrink-0"></div>
                <div>
                  <p className="text-[10px] text-slate-500 sm:text-center mt-0 sm:mt-0 uppercase font-bold">{step.quarter}</p>
                  <p className="text-[11px] font-bold sm:mt-1 sm:text-center text-slate-200 leading-tight">
                    {step.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart className="w-4 h-4" /> Success KPIs
          </h3>
          <div className="space-y-3">
             {result.suggestedKPIs.map((kpi, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <Activity className="w-3 h-3 mt-0.5 text-sky-400 shrink-0" />
                  <span className="text-slate-300">{kpi}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-white font-medium flex items-center gap-2 transition-colors px-6 py-2 text-sm"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Conduct Another Assessment
        </button>
      </div>

    </motion.div>
  );
}
