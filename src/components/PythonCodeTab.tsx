import React, { useState } from 'react';
import { PYTHON_AUTOMATION_SCRIPT } from '../data/pythonCode';
import { Copy, Check, Download, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

export const PythonCodeTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_AUTOMATION_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([PYTHON_AUTOMATION_SCRIPT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ebay_automation_demo.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Python + Selenium Automation Script</h2>
            <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-200">
              Ready-to-Run Demo Script
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Copy or download this script to test order sheet processing and browser auto-fill locally on your machine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .py</span>
          </button>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Install Dependencies</h3>
          <p className="text-xs text-slate-600 font-mono bg-slate-100 p-2 rounded-lg">
            pip install selenium pandas openpyxl
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Prepare Excel Sheet</h3>
          <p className="text-xs text-slate-600">
            Ensure <code className="bg-slate-100 px-1 py-0.5 rounded">ebay_orders.xlsx</code> is in the same folder with columns: <code className="bg-slate-100 px-1 py-0.5 rounded">OrderID, Customer Name, Address, Supplier Link, Status</code>.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Run Script</h3>
          <p className="text-xs text-slate-600 font-mono bg-slate-100 p-2 rounded-lg">
            python ebay_automation_demo.py
          </p>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-slate-400 text-xs font-mono">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span>ebay_automation_demo.py</span>
          </div>
          <span className="text-slate-500">Python 3.x • Selenium WebDriver</span>
        </div>

        <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto">
          <code>{PYTHON_AUTOMATION_SCRIPT}</code>
        </pre>
      </div>
    </div>
  );
};
