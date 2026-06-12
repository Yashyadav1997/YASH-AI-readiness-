import { useState } from 'react';
import { AssessmentInputs } from '../types';
import { Loader2, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onSubmit: (data: AssessmentInputs) => void;
  isLoading: boolean;
}

const INDUSTRIES = [
  "Technology & Software", "Healthcare & Life Sciences", "Financial Services",
  "Manufacturing & Logistics", "Retail & Consumer Goods", "Professional Services",
  "Education", "Energy & Utilities", "Other"
];
const SIZES = [
  "1-50 (Startup/Small)", "51-200 (Medium)", "201-1000 (Mid-Market)",
  "1001-5000 (Enterprise)", "5000+ (Large Enterprise)"
];
const CORE_SYSTEMS = [
  "Manual / Spreadsheets Heavy",
  "Disjointed SaaS Point Solutions",
  "Standardized CRM/ERP (Siloed Data)",
  "Unified Data Platform (Integrated CRM/ERP)"
];
const DATA_AVAIL = [
  "Poorly defined & unstructured",
  "Basic reporting, mostly structured",
  "Centralized data warehouse/lake",
  "High-quality real-time streaming"
];
const LLM_ADOPTION = [
  "Strictly Prohibited/Blocked by IT",
  "Shadow IT (Employees use personal accounts)",
  "Approved Public Subscriptions (e.g. ChatGPT Plus)",
  "Secured Enterprise Environment (e.g. Copilot)",
  "Custom/Fine-tuned Proprietary Models"
];
const HARDWARE = [
  "Standard Office Computers Only",
  "Basic Cloud CPU Instances",
  "On-demand Cloud GPUs (AWS/GCP)",
  "Dedicated On-prem/Cloud GPU Clusters"
];
const AI_BUDGET = [
  "Zero Dedicated Budget",
  "Scavenged from IT/Software ($)",
  "Dedicated PoC Fund ($$)",
  "Significant Enterprise Initiative ($$$)",
  "Core Strategic R&D Investment ($$$$)"
];
const LEADERSHIP = [
  "Skeptical / View as a fad",
  "Curious but passive",
  "Supportive of small pilots",
  "Top strategic mandate"
];
const CULTURE = [
  "High fear of job replacement / Resistance",
  "General apathy or lack of interest",
  "Pockets of enthusiasm (Neutral overall)",
  "Eager adoption and excitement across teams"
];
const RISK = [
  "Highly Regulated / Zero-risk appetite",
  "Cautious (Need proven ROI first)",
  "Moderate (Willing to test safely)",
  "High (Embrace fail-fast mentality)"
];
const SKILLS = [
  "No formal training",
  "Basic prompt awareness",
  "Citizen developers / Low-code power users",
  "Dedicated ML/Data Science team"
];

export function AssessmentForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<AssessmentInputs>({
    industry: INDUSTRIES[0],
    companySize: SIZES[0],
    coreSystems: CORE_SYSTEMS[0],
    dataAvailability: DATA_AVAIL[0],
    llmAdoption: LLM_ADOPTION[0],
    hardwareInfrastructure: HARDWARE[0],
    aiBudget: AI_BUDGET[0],
    leadershipSupport: LEADERSHIP[0],
    culturalResistance: CULTURE[0],
    riskTolerance: RISK[0],
    employeeSkills: SKILLS[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#111827]/80 backdrop-blur-xl rounded-xl border border-sky-900/50 shadow-[0_0_40px_rgba(56,189,248,0.05)] overflow-hidden w-full relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"></div>
      <div className="border-b border-sky-900/40 px-8 py-8 text-white relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/20 via-[#111827]/0 to-transparent">
        <div className="absolute right-8 top-8 opacity-20">
          <Zap size={64} className="text-sky-400" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 uppercase tracking-widest mb-3">System Initialization</h2>
          <p className="text-sm text-slate-400 font-mono">
            Provide details about your organization's technical foundation, culture, and readiness.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
        
        {/* Section 1: Business & Tech Infrastructure */}
        <div>
           <h3 className="text-slate-300 font-semibold mb-4 text-sm border-b border-slate-700 pb-2">1. Business & Technical Infrastructure</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="industry" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Industry</label>
              <div className="relative group">
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {INDUSTRIES.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="companySize" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Company Size</label>
              <div className="relative group">
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {SIZES.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="coreSystems" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Core Business Systems (CRM/ERP)</label>
              <div className="relative group">
                <select
                  id="coreSystems"
                  name="coreSystems"
                  value={formData.coreSystems}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {CORE_SYSTEMS.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="dataAvailability" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Data Availability & Quality</label>
              <div className="relative group">
                <select
                  id="dataAvailability"
                  name="dataAvailability"
                  value={formData.dataAvailability}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {DATA_AVAIL.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

             <div className="space-y-1">
              <label htmlFor="hardwareInfrastructure" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Hardware & Compute Resources</label>
              <div className="relative group">
                <select
                  id="hardwareInfrastructure"
                  name="hardwareInfrastructure"
                  value={formData.hardwareInfrastructure}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {HARDWARE.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: AI Adoption & Culture */}
        <div>
           <h3 className="text-slate-300 font-semibold mb-4 text-sm border-b border-slate-700 pb-2">2. AI Adoption, Budget & Culture</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-1">
              <label htmlFor="llmAdoption" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Current LLM Adoption Level</label>
              <div className="relative group">
                <select
                  id="llmAdoption"
                  name="llmAdoption"
                  value={formData.llmAdoption}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {LLM_ADOPTION.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="aiBudget" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">AI Tools Budget & Funding</label>
              <div className="relative group">
                <select
                  id="aiBudget"
                  name="aiBudget"
                  value={formData.aiBudget}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {AI_BUDGET.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="leadershipSupport" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Leadership & Management Attitude</label>
              <div className="relative group">
                <select
                  id="leadershipSupport"
                  name="leadershipSupport"
                  value={formData.leadershipSupport}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {LEADERSHIP.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="culturalResistance" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Employee Cultural Response</label>
              <div className="relative group">
                <select
                  id="culturalResistance"
                  name="culturalResistance"
                  value={formData.culturalResistance}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {CULTURE.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="riskTolerance" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Risk & Compliance Tolerance</label>
              <div className="relative group">
                <select
                  id="riskTolerance"
                  name="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {RISK.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="employeeSkills" className="block text-[10px] uppercase font-bold text-sky-500/70 tracking-widest font-mono">Employee AI/Tech Skills</label>
              <div className="relative group">
                <select
                  id="employeeSkills"
                  name="employeeSkills"
                  value={formData.employeeSkills}
                  onChange={handleChange}
                  className="w-full rounded bg-[#0B101E] border border-slate-700/80 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all hover:border-sky-500/50 appearance-none cursor-pointer"
                >
                  {SKILLS.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-500">▼</div>
              </div>
            </div>

          </div>
        </div>

        <div className="pt-8 border-t border-sky-900/40 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 rounded-sm text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-row items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Run Diagnostic</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
