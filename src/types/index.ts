export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  avatar?: string;
}

export interface Card {
  id: string;
  type: 'visa' | 'mastercard';
  lastFour: string;
  holder: string;
  expiryMonth: string;
  expiryYear: string;
  status: 'active' | 'blocked' | 'expired';
  cardType: 'debit' | 'credit';
  limit?: number;
  available?: number;
  color: 'blue' | 'dark' | 'gradient';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  date: string;
  icon: string;
  merchant?: string;
}

export interface ActivityEvent {
  id: string;
  type:
    | 'balance_check'
    | 'card_blocked'
    | 'card_unblocked'
    | 'address_updated'
    | 'statement_requested'
    | 'statement_downloaded'
    | 'login'
    | 'profile_updated'
    | 'payment_made';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  metadata?: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  actions?: QuickAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: string;
}

export interface Statement {
  id: string;
  period: string;
  month: string;
  year: string;
  status: 'available' | 'processing' | 'pending';
  fileSize?: string;
  generatedAt?: string;
  transactions: number;
  openingBalance: number;
  closingBalance: number;
}
