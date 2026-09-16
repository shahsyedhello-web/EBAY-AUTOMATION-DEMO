import React from 'react';
import { ActiveTab } from '../types';
import { FileSpreadsheet, PlayCircle, Code2, Presentation, Layers, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  orderCount: number;
  processedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  orderCount,
  processedCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base sm:text-lg">eBay Fulfillment Automation</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  3-Day Demo
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Python + Selenium + Pandas Prototype Presentation & Testing
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hidden md:flex items-center gap-4 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>Total Orders: <strong className="text-slate-900">{orderCount}</strong></span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Processed: <strong className="text-slate-900">{processedCount}/{orderCount}</strong></span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 sm:space-x-4 border-t border-slate-100 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('sheet')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'sheet'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Order Sheet (Excel / CSV)</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            <span>Live Automation Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python Selenium Script</span>
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'presentation'
                ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Meeting & Scope Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
