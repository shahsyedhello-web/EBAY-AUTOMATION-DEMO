import React, { useState } from 'react';
import { ActiveTab, OrderItem } from './types';
import { INITIAL_ORDERS } from './data/defaultOrders';
import { Navbar } from './components/Navbar';
import { OrderSheetTab } from './components/OrderSheetTab';
import { SimulatorTab } from './components/SimulatorTab';
import { PythonCodeTab } from './components/PythonCodeTab';
import { PresentationTab } from './components/PresentationTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('sheet');
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);

  const processedCount = orders.filter((o) => o.status === 'Processed').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orderCount={orders.length}
        processedCount={processedCount}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'sheet' && (
          <OrderSheetTab
            orders={orders}
            setOrders={setOrders}
            onStartSimulation={() => setActiveTab('simulator')}
          />
        )}
        {activeTab === 'simulator' && (
          <SimulatorTab orders={orders} setOrders={setOrders} />
        )}
        {activeTab === 'code' && <PythonCodeTab />}
        {activeTab === 'presentation' && <PresentationTab />}
      </main>
    </div>
  );
}
