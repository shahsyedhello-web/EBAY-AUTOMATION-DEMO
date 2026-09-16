import React, { useState, useEffect } from 'react';
import { OrderItem, LogEntry } from '../types';
import { Play, Pause, SkipForward, RotateCcw, Terminal, Globe, ShieldCheck, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';

interface SimulatorTabProps {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export const SimulatorTab: React.FC<SimulatorTabProps> = ({ orders, setOrders }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [stepPhase, setStepPhase] = useState<'idle' | 'navigating' | 'filling' | 'verifying' | 'completed'>('idle');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: 'System ready. Python + Selenium + Pandas environment loaded.',
    },
  ]);

  const addLog = (level: LogEntry['level'], message: string, orderId?: string) => {
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        level,
        message,
        orderId,
      },
      ...prev.slice(0, 49),
    ]);
  };

  // Active order
  const activeOrder = orders[currentIndex] || orders[0];

  // Simulation loop effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setTimeout(() => {
        runNextSimulationStep();
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentIndex, stepPhase]);

  const startSimulation = () => {
    if (orders.length === 0) return;
    setIsRunning(true);
    setStepPhase('navigating');
    addLog('info', `[Python Script] Initializing ChromeDriver session for Order ${activeOrder.orderId}...`);
    
    // Mark current as running
    setOrders((prev) =>
      prev.map((o, idx) => (idx === currentIndex ? { ...o, status: 'Running' } : o))
    );
  };

  const pauseSimulation = () => {
    setIsRunning(false);
    addLog('warning', 'Simulation paused by user.');
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentIndex(0);
    setStepPhase('idle');
    setOrders((prev) => prev.map((o) => ({ ...o, status: 'Pending' })));
    setLogs([
      {
        timestamp: new Date().toLocaleTimeString(),
        level: 'info',
        message: 'Simulation reset. All orders set to Pending.',
      },
    ]);
  };

  const runNextSimulationStep = () => {
    if (stepPhase === 'navigating') {
      setStepPhase('filling');
      addLog('action', `[Selenium] Opened supplier URL: ${activeOrder.supplierLink}`, activeOrder.orderId);
      addLog('info', `[Auto-Fill] Populating name "${activeOrder.customerName}" and address...`, activeOrder.orderId);
    } else if (stepPhase === 'filling') {
      setStepPhase('verifying');
      addLog('success', `[Auto-Fill] Form successfully populated for ${activeOrder.customerName}.`, activeOrder.orderId);
      addLog('warning', '[SAFE DEMO] Halting before "Place Order" click to prevent real payment/charge.', activeOrder.orderId);
    } else if (stepPhase === 'verifying') {
      setStepPhase('completed');
      addLog('success', `[Excel] Updating order ${activeOrder.orderId} status to 'Processed' in sheet.`, activeOrder.orderId);
      
      // Update order status in sheet
      setOrders((prev) =>
        prev.map((o, idx) => (idx === currentIndex ? { ...o, status: 'Processed' } : o))
      );
    } else if (stepPhase === 'completed') {
      if (currentIndex + 1 < orders.length) {
        setCurrentIndex(currentIndex + 1);
        setStepPhase('navigating');
        addLog('info', `[Loop] Moving to next order: ${orders[currentIndex + 1].orderId}`);
        setOrders((prev) =>
          prev.map((o, idx) => (idx === currentIndex + 1 ? { ...o, status: 'Running' } : o))
        );
      } else {
        setIsRunning(false);
        setStepPhase('idle');
        addLog('success', '==================================================');
        addLog('success', ' [COMPLETE] All orders in sheet successfully processed! 🎉');
        addLog('success', '==================================================');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Live Browser Automation Simulator</h2>
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-medium border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Safe Demo Mode
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            Simulating Python + Selenium executing sequential order fulfillment from the Excel sheet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button
              onClick={startSimulation}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Automation</span>
            </button>
          ) : (
            <button
              onClick={pauseSimulation}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-colors cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={runNextSimulationStep}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step</span>
          </button>

          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Simulated Browser Window */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          {/* Browser Chrome Header */}
          <div className="bg-slate-900 text-slate-300 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-slate-800 text-slate-200 text-xs px-3 py-1 rounded-md flex items-center gap-2 ml-3 max-w-md truncate">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{activeOrder?.supplierLink || 'https://www.supplier-portal.com/checkout'}</span>
              </div>
            </div>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 animate-pulse" /> Selenium ChromeDriver Active
            </div>
          </div>

          {/* Simulated Supplier Checkout Page Viewport */}
          <div className="p-6 bg-slate-50 flex-1 flex flex-col justify-between space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Supplier Checkout Portal</h3>
                  <p className="text-xs text-slate-500">Processing Order: <span className="font-semibold text-blue-600">{activeOrder?.orderId}</span></p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                  Step: {stepPhase.toUpperCase()}
                </span>
              </div>

              {/* Form Fields being Auto-Filled */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Recipient Name</label>
                  <div className={`p-2.5 rounded-lg text-sm font-medium border transition-all ${
                    stepPhase !== 'idle' && stepPhase !== 'navigating' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    {activeOrder?.customerName || 'Waiting for order...'}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Contact Phone</label>
                  <div className={`p-2.5 rounded-lg text-sm font-medium border transition-all ${
                    stepPhase !== 'idle' && stepPhase !== 'navigating' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    {activeOrder?.phone || 'Waiting...'}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Shipping Address</label>
                  <div className={`p-2.5 rounded-lg text-sm font-medium border transition-all ${
                    stepPhase !== 'idle' && stepPhase !== 'navigating' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    {activeOrder?.address || 'Waiting...'}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Item SKU & Qty</label>
                  <div className="p-2.5 rounded-lg text-sm font-medium bg-slate-100 border border-slate-200 text-slate-700">
                    {activeOrder?.sku} (Qty: {activeOrder?.quantity})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Order Status</label>
                  <div className="p-2.5 rounded-lg text-sm font-medium bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-between">
                    <span>{activeOrder?.status}</span>
                    {activeOrder?.status === 'Processed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                </div>
              </div>

              {/* Safe Demo Notice Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 mt-4">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong className="font-bold">Safe Demo Mode Active:</strong> The "Place Order" button at the bottom of the supplier page is intentionally skipped in this 3-day demo. No payments are charged and no actual orders are placed.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Live Python/Selenium Terminal Logs */}
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-slate-400 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Terminal / Selenium Logs</span>
            </div>
            <span className="text-emerald-400">● Live Stream</span>
          </div>

          <div className="p-4 font-mono text-xs overflow-y-auto space-y-2 flex-1 max-h-[500px]">
            {logs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                <span
                  className={
                    log.level === 'success'
                      ? 'text-emerald-400 font-semibold'
                      : log.level === 'warning'
                      ? 'text-amber-400 font-semibold'
                      : log.level === 'action'
                      ? 'text-blue-400'
                      : 'text-slate-300'
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="bg-slate-950 p-4 border-t border-slate-800">
            {(() => {
              const processedCount = orders.filter((o) => o.status === 'Processed').length;
              const percent = Math.min(100, Math.round((processedCount / orders.length) * 100));
              return (
                <>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Progress: {processedCount} of {orders.length} Processed</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
