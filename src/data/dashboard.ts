import type { InvoiceStatus } from '../components/ui/StatusBadge';

/** Illustrative sample data for product mockups. Client names are fictional. */

export const revenueByMonth = [
  { month: 'Dec', value: 18420 },
  { month: 'Jan', value: 16980 },
  { month: 'Feb', value: 21350 },
  { month: 'Mar', value: 19870 },
  { month: 'Apr', value: 24610 },
  { month: 'May', value: 23140 },
  { month: 'Jun', value: 26890 },
  { month: 'Jul', value: 25320 },
  { month: 'Aug', value: 28760 },
  { month: 'Sep', value: 27410 },
  { month: 'Oct', value: 30950 },
  { month: 'Nov', value: 31280 },
];

export type Invoice = {
  id: string;
  client: string;
  initials: string;
  hue: string;
  amount: number;
  due: string;
  status: InvoiceStatus;
};

export const invoices: Invoice[] = [
  { id: 'INV-0418', client: 'Northwind Studio', initials: 'NS', hue: '#DCEBFF', amount: 4250, due: 'Nov 30', status: 'Paid' },
  { id: 'INV-0417', client: 'Halcyon & Co.', initials: 'HC', hue: '#FCE7D6', amount: 2800, due: 'Nov 24', status: 'Pending' },
  { id: 'INV-0416', client: 'Brightline Consulting', initials: 'BC', hue: '#E3F5EC', amount: 6120, due: 'Nov 12', status: 'Overdue' },
  { id: 'INV-0415', client: 'Fernwood Bakery', initials: 'FB', hue: '#F3E8FD', amount: 980, due: 'Nov 10', status: 'Paid' },
  { id: 'INV-0414', client: 'Atlas Field Labs', initials: 'AF', hue: '#FFF4CC', amount: 3400, due: 'Dec 04', status: 'Pending' },
  { id: 'INV-0413', client: 'Kestrel Media', initials: 'KM', hue: '#E1F0F7', amount: 1750, due: 'Dec 08', status: 'Draft' },
];

export const stats = {
  revenueYtd: 284920,
  revenueDelta: '+12.4%',
  outstanding: 18450,
  outstandingCount: 9,
  paidThisMonth: 31280,
  paidCount: 14,
  overdue: 6120,
  overdueCount: 2,
};

export const usd = (n: number, cents = false) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
