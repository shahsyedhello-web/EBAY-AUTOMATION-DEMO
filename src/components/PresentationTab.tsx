import React from 'react';
import { Presentation, CheckCircle2, XCircle, Clock, ShieldCheck, Zap, Layers, ArrowRight } from 'lucide-react';

export const PresentationTab: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
            <Clock className="w-3.5 h-3.5" /> 3-Day Demo / Prototype Presentation
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            eBay-to-Supplier Order Fulfillment Automation
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Prepared within 3 days to demonstrate the overall automation workflow, browser interaction, and order sheet status updates for the client meeting.
          </p>
        </div>
      </div>

      {/* Grid: What is Proved vs Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Included / Proved */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">What This Demo Proves</h3>
              <p className="text-xs text-slate-500">Core functional workflow demonstrated</p>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-slate-700 pt-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span><strong>Sheet Integration:</strong> Successfully reads customer & shipping details from Excel / CSV spreadsheets using pandas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span><strong>Browser Automation:</strong> System launches ChromeDriver, navigates to supplier product pages sequentially.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span><strong>Auto-Fill Capability:</strong> Automatically populates customer name, phone, and shipping address into supplier checkout forms.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span><strong>Status Tracking:</strong> Automatically updates order status to <code className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-emerald-700">Processed</code> and advances to the next order.</span>
            </li>
          </ul>
        </div>

        {/* Excluded in Demo */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Excluded in 3-Day Scope</h3>
              <p className="text-xs text-slate-500">Reserved for full production version</p>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-slate-700 pt-2">
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
              <span><strong>No Payment & Checkout:</strong> "Place Order" button clicks are intentionally bypassed. No actual financial transactions occur.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
              <span><strong>No Login / CAPTCHA:</strong> Supplier login credentials and automated CAPTCHA solvers are not included in this quick prototype.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
              <span><strong>Error Handling:</strong> Advanced exception recovery for flaky network connections or missing form fields is deferred to production.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Step-by-Step Automation Flow</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1</div>
            <h4 className="font-semibold text-slate-900">Order Sheet Import</h4>
            <p className="text-xs text-slate-600">Load Excel sheet containing eBay order ID, customer details, and supplier links.</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 2</div>
            <h4 className="font-semibold text-slate-900">Sequential Navigation</h4>
            <p className="text-xs text-slate-600">Selenium opens ChromeDriver and navigates to each supplier product link sequentially.</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3</div>
            <h4 className="font-semibold text-slate-900">Safe Form Auto-Fill</h4>
            <p className="text-xs text-slate-600">Customer name and address are auto-populated into checkout fields. Final payment is skipped.</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 4</div>
            <h4 className="font-semibold text-slate-900">Status Update</h4>
            <p className="text-xs text-slate-600">Sheet updates status to 'Processed' and automatically proceeds to the next pending order.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
