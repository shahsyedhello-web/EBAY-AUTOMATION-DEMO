export interface OrderItem {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  phone: string;
  productLink: string;
  supplierLink: string;
  sku: string;
  quantity: number;
  status: 'Pending' | 'Processed' | 'Running' | 'Failed';
  processedAt?: string;
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'action';
  message: string;
  orderId?: string;
}

export type ActiveTab = 'sheet' | 'simulator' | 'code' | 'presentation';
