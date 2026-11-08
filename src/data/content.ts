/** Page copy that is reused or long enough to keep out of the components. */

export const steps = [
  {
    n: '01',
    title: 'Create',
    body: 'Add your client details, customize your invoice, and send it in seconds.',
  },
  {
    n: '02',
    title: 'Send & Track',
    body: 'Share invoices instantly and track payment progress in real time.',
  },
  {
    n: '03',
    title: 'Get Paid',
    body: 'Send automatic reminders and get paid without the unnecessary follow-ups.',
  },
];

/** Illustrative testimonials. These are sample content, not real customers. */
export const testimonials = [
  {
    quote:
      'I used to block out Friday afternoons for chasing invoices. Now reminders go out on their own and I only step in when a client actually replies.',
    name: 'Priya Raman',
    role: 'Independent brand designer',
    initials: 'PR',
    hue: '#FCE7D6',
    theme: 'Saves admin time',
  },
  {
    quote:
      'With eight people billing across a dozen retainers, we finally have one place that shows what’s been paid and what hasn’t. Month-end is a lot calmer.',
    name: 'Daniel Okafor',
    role: 'Founder, creative agency',
    initials: 'DO',
    hue: '#DCEBFF',
    theme: 'Clear cash-flow view',
  },
  {
    quote:
      'Clients pay sooner when the invoice looks professional and has a pay button right on it. I stopped dreading the overdue column.',
    name: 'Sofia Martins',
    role: 'Owner, home services business',
    initials: 'SM',
    hue: '#E3F5EC',
    theme: 'Fewer late payments',
  },
];

export type Plan = {
  name: string;
  blurb: string;
  monthly: number;
  /** Price per month when billed yearly. */
  yearly: number;
  cta: string;
  featured?: boolean;
  lead?: string;
  features: string[];
};

/** Yearly = two months free (about 17% off). */
export const plans: Plan[] = [
  {
    name: 'Free',
    blurb: 'For getting started with your first clients.',
    monthly: 0,
    yearly: 0,
    cta: 'Get Started Free',
    features: ['Up to 5 invoices per month', 'Basic invoice templates', 'Client management', 'Payment tracking', 'Basic dashboard'],
  },
  {
    name: 'Pro',
    blurb: 'For freelancers who invoice every week.',
    monthly: 12,
    yearly: 10,
    cta: 'Start Pro Trial',
    featured: true,
    lead: 'Everything in Free, plus:',
    features: ['Unlimited invoices', 'Automated payment reminders', 'Custom branding', 'Advanced reporting', 'Unlimited clients', 'Priority support'],
  },
  {
    name: 'Business',
    blurb: 'For agencies and teams that bill together.',
    monthly: 29,
    yearly: 24,
    cta: 'Choose Business',
    lead: 'Everything in Pro, plus:',
    features: ['Multiple team members', 'Advanced financial insights', 'Team collaboration', 'Custom workflows', 'Dedicated support'],
  },
];

export const faqs = [
  {
    q: 'What is InvoiceFlow?',
    a: 'InvoiceFlow is an online invoicing and payment tracking tool for freelancers, agencies and small businesses. You create and send invoices, InvoiceFlow follows up with reminders, and your dashboard shows what’s paid, pending and overdue.',
  },
  {
    q: 'Is InvoiceFlow free to use?',
    a: 'Yes. The Free plan includes up to 5 invoices a month, client management and payment tracking, with no time limit and no credit card. Upgrade to Pro when you need unlimited invoices and automatic reminders.',
  },
  {
    q: 'Can I customize my invoices?',
    a: 'Every plan includes clean, professional templates. On Pro and Business you can add your logo, brand colours, payment terms and a personal note, and save them as your default.',
  },
  {
    q: 'Can InvoiceFlow automatically send payment reminders?',
    a: 'Yes, on Pro and Business. Choose when reminders go out (for example, 3 days before the due date, on the day, and 7 days after) and edit the wording. Reminders stop as soon as the invoice is paid.',
  },
  {
    q: 'How can I track overdue invoices?',
    a: 'Overdue invoices are flagged on your dashboard and collected in their own view, with the amount, days overdue and the last reminder sent. You can send a manual nudge in one click.',
  },
  {
    q: 'Can I manage multiple clients?',
    a: 'Yes. Each client has a profile with contact details, invoice history, payments and outstanding balance. Free includes client management; Pro and Business remove the client limit.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Anytime, from your account settings. Upgrades apply immediately. Downgrades take effect at the end of your current billing period, and your invoices and client data stay intact.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Your data is encrypted in transit and at rest, and card payments are handled by a PCI-compliant payment processor, so card details never touch our servers. You can export or delete your data whenever you like.',
  },
];

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Guides', href: '/guides' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];
