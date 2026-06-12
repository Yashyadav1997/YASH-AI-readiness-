import { useState } from 'react';
import { AssessmentInputs } from '../types';
import { Bot, Loader2, ArrowRight } from 'lucide-react';

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

const LEVELS = [
  "Low", "Basic/Siloed", "Moderate/Developing", "High/Integrated", "Extensive/Optimized"
];

export function AssessmentForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<AssessmentInputs>({
    industry: INDUSTRIES[0],
    companySize: SIZES[0],
    digitalMaturity: LEVELS[0],
    dataAvailability: LEVELS[0],
    leadershipSupport: LEVELS[0],
    employeeSkills: LEVELS[0],
    techInfrastructure: LEVELS[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-[#1E293B] rounded-lg border border-slate-700 overflow-hidden shadow-lg w-full">
      <div className="border-b border-slate-700 px-6 py-6 text-white relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-sky-400 uppercase tracking-wider mb-2">Configure Your Profile</h2>
          <p className="text-sm text-slate-400">
            Provide details about your organization's current state. Our AI consultant will analyze your profile to generate a customized readiness roadmap.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="industry" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Industry</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {INDUSTRIES.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="companySize" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Company Size</label>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {SIZES.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="digitalMaturity" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">General Digital Maturity</label>
            <select
              id="digitalMaturity"
              name="digitalMaturity"
              value={formData.digitalMaturity}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {LEVELS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="dataAvailability" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Data Availability & Quality</label>
            <select
              id="dataAvailability"
              name="dataAvailability"
              value={formData.dataAvailability}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {LEVELS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="leadershipSupport" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Leadership Support for AI</label>
            <select
              id="leadershipSupport"
              name="leadershipSupport"
              value={formData.leadershipSupport}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {LEVELS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="employeeSkills" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Employee AI/Tech Skills</label>
            <select
              id="employeeSkills"
              name="employeeSkills"
              value={formData.employeeSkills}
              onChange={handleChange}
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {LEVELS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="techInfrastructure" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Cloud & Tech Infrastructure</label>
            <select
              id="techInfrastructure"
              name="techInfrastructure"
              value={formData.techInfrastructure}
              onChange={handleChange}
              className="w-full md:w-1/2 rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
            >
              {LEVELS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-row items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Running Analysis...</span>
              </>
            ) : (
              <>
                <span>Generate Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
