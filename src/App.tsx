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
    <div className="flex flex-col min-h-screen bg-[#0B101E] text-slate-100 font-sans overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <header className="relative flex items-center justify-between px-8 py-5 border-b border-sky-900/30 bg-[#0B101E]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] flex items-center justify-center font-bold text-xl text-white shrink-0">
            AI
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-white tracking-wide">Nexus Readiness Platform</h1>
            <p className="text-[10px] text-sky-400 font-mono tracking-widest uppercase mt-0.5">Enterprise Evaluation • v2.4.0</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full gap-6 relative z-10">
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
