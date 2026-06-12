import { useState } from 'react';
import { AssessmentForm } from './components/AssessmentForm';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { AssessmentInputs, AssessmentResult } from './types';
import { BrainCircuit } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssessmentSubmit = async (data: AssessmentInputs) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      
      if (!response.ok) {
        throw new Error(json.error || 'Failed to generate assessment');
      }

      setResult(json);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-slate-100 font-sans overflow-x-hidden">
      <header className="flex items-center justify-between px-8 py-4 border-b border-slate-700 bg-[#1E293B]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-sky-500 rounded flex items-center justify-center font-bold text-xl text-white shrink-0">AI</div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-white">AI Readiness Assessment Platform</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Enterprise Evaluation Platform</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full gap-6">
        {error && (
          <div className="mb-8 p-4 bg-rose-900/20 border border-rose-800 text-rose-400 rounded-lg">
            {error}
          </div>
        )}

        {!result ? (
          <div className="max-w-3xl mx-auto w-full">
            <AssessmentForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <AssessmentDashboard result={result} onReset={handleReset} />
        )}
      </main>
      
      <footer className="px-8 py-4 bg-[#0a101f] border-t border-slate-800 flex justify-center items-center text-[10px] text-slate-500 uppercase tracking-tighter">
        &copy; {new Date().getFullYear()} AI Strategy Group • Proprietary Intelligence Framework
      </footer>
    </div>
  );
}
