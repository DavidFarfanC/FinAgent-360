import {
  User,
  Card,
  Transaction,
  ActivityEvent,
  ChatMessage,
  Statement,
} from '@/types';

export const mockUser: User = {
  id: 'usr_001',
  name: 'Alberto Figueroa',
  email: 'alberto.figueroa@gmail.com',
  phone: '+52 55 8921 4732',
  address: 'Av. Insurgentes Sur 1602, Col. Crédito Constructor, CDMX 03940',
  accountNumber: '****4721',
  accountType: 'Cuenta Digital Premium',
  balance: 47832.5,
  currency: 'MXN',
  status: 'active',
  joinDate: '2023-01-15',
};

export const mockCards: Card[] = [
  {
    id: 'card_001',
    type: 'visa',
    lastFour: '4721',
    holder: 'ALBERTO FIGUEROA',
    expiryMonth: '09',
    expiryYear: '27',
    status: 'active',
    cardType: 'debit',
    color: 'blue',
  },
  {
    id: 'card_002',
    type: 'mastercard',
    lastFour: '8834',
    holder: 'ALBERTO FIGUEROA',
    expiryMonth: '12',
    expiryYear: '26',
    status: 'active',
    cardType: 'credit',
    limit: 75000,
    available: 58240,
    color: 'dark',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    description: 'Spotify Premium',
    amount: -179,
    type: 'debit',
    category: 'Entretenimiento',
    date: '2026-03-10',
    icon: 'music',
    merchant: 'Spotify AB',
  },
  {
    id: 'txn_002',
    description: 'Depósito nómina',
    amount: 18500,
    type: 'credit',
    category: 'Depósito',
    date: '2026-03-08',
    icon: 'building',
    merchant: 'Empresa Corp S.A.',
  },
  {
    id: 'txn_003',
    description: 'Walmart Insurgentes',
    amount: -1243.8,
    type: 'debit',
    category: 'Supermercado',
    date: '2026-03-07',
    icon: 'shopping-cart',
    merchant: 'Walmart de México',
  },
  {
    id: 'txn_004',
    description: 'Uber Eats',
    amount: -387.5,
    type: 'debit',
    category: 'Comida',
    date: '2026-03-06',
    icon: 'utensils',
    merchant: 'Uber Eats MX',
  },
  {
    id: 'txn_005',
    description: 'Netflix',
    amount: -219,
    type: 'debit',
    category: 'Entretenimiento',
    date: '2026-03-05',
    icon: 'play',
    merchant: 'Netflix International',
  },
  {
    id: 'txn_006',
    description: 'Transferencia recibida',
    amount: 5000,
    type: 'credit',
    category: 'Transferencia',
    date: '2026-03-04',
    icon: 'arrow-down',
    merchant: 'Carlos Morales R.',
  },
  {
    id: 'txn_007',
    description: 'Gasolinería Pemex',
    amount: -850,
    type: 'debit',
    category: 'Gasolina',
    date: '2026-03-03',
    icon: 'fuel',
    merchant: 'Estación Pemex #2841',
  },
  {
    id: 'txn_008',
    description: 'CFE Luz',
    amount: -423.6,
    type: 'debit',
    category: 'Servicios',
    date: '2026-03-01',
    icon: 'zap',
    merchant: 'CFE',
  },
];

export const mockActivityEvents: ActivityEvent[] = [
  {
    id: 'evt_001',
    type: 'balance_check',
    title: 'Saldo consultado',
    description: 'El agente IA consultó el saldo de tu cuenta principal',
    timestamp: '2026-03-10T14:32:00Z',
    status: 'success',
    metadata: { balance: '$47,832.50 MXN', account: '****4721' },
  },
  {
    id: 'evt_002',
    type: 'statement_downloaded',
    title: 'Estado de cuenta descargado',
    description: 'Estado de cuenta de Febrero 2026 descargado exitosamente',
    timestamp: '2026-03-10T11:15:00Z',
    status: 'success',
    metadata: { period: 'Febrero 2026', format: 'PDF' },
  },
  {
    id: 'evt_003',
    type: 'card_blocked',
    title: 'Tarjeta bloqueada',
    description:
      'Tarjeta Visa *4721 bloqueada temporalmente por solicitud del usuario',
    timestamp: '2026-03-09T16:48:00Z',
    status: 'success',
    metadata: { card: 'Visa *4721', reason: 'Solicitud del cliente' },
  },
  {
    id: 'evt_004',
    type: 'card_unblocked',
    title: 'Tarjeta desbloqueada',
    description: 'Tarjeta Visa *4721 reactivada exitosamente',
    timestamp: '2026-03-09T17:02:00Z',
    status: 'success',
    metadata: { card: 'Visa *4721' },
  },
  {
    id: 'evt_005',
    type: 'address_updated',
    title: 'Dirección actualizada',
    description: 'Domicilio fiscal actualizado via asistente IA',
    timestamp: '2026-03-08T09:22:00Z',
    status: 'success',
    metadata: { action: 'Domicilio actualizado' },
  },
  {
    id: 'evt_006',
    type: 'statement_requested',
    title: 'Estado de cuenta solicitado',
    description: 'Generación de estado de cuenta Enero 2026 iniciada',
    timestamp: '2026-03-07T15:44:00Z',
    status: 'success',
    metadata: { period: 'Enero 2026' },
  },
  {
    id: 'evt_007',
    type: 'login',
    title: 'Inicio de sesión',
    description: 'Acceso exitoso desde dispositivo iOS · Ciudad de México',
    timestamp: '2026-03-07T08:01:00Z',
    status: 'success',
    metadata: { device: 'iPhone 15 Pro', location: 'CDMX' },
  },
  {
    id: 'evt_008',
    type: 'payment_made',
    title: 'Pago realizado',
    description: 'Pago de servicio CFE procesado exitosamente',
    timestamp: '2026-03-01T12:30:00Z',
    status: 'success',
    metadata: { amount: '$423.60 MXN', service: 'CFE' },
  },
  {
    id: 'evt_009',
    type: 'balance_check',
    title: 'Saldo consultado',
    description: 'Consulta de saldo disponible en tarjeta de crédito',
    timestamp: '2026-02-28T17:10:00Z',
    status: 'success',
    metadata: { card: 'Mastercard *8834' },
  },
  {
    id: 'evt_010',
    type: 'profile_updated',
    title: 'Perfil actualizado',
    description: 'Número telefónico de contacto actualizado',
    timestamp: '2026-02-25T10:00:00Z',
    status: 'success',
    metadata: { field: 'Teléfono de contacto' },
  },
];

export const mockStatements: Statement[] = [
  {
    id: 'stmt_001',
    period: 'Marzo 2026',
    month: 'Marzo',
    year: '2026',
    status: 'processing',
    transactions: 0,
    openingBalance: 47832.5,
    closingBalance: 0,
  },
  {
    id: 'stmt_002',
    period: 'Febrero 2026',
    month: 'Febrero',
    year: '2026',
    status: 'available',
    fileSize: '284 KB',
    generatedAt: '2026-03-01',
    transactions: 24,
    openingBalance: 31200,
    closingBalance: 47832.5,
  },
  {
    id: 'stmt_003',
    period: 'Enero 2026',
    month: 'Enero',
    year: '2026',
    status: 'available',
    fileSize: '312 KB',
    generatedAt: '2026-02-01',
    transactions: 31,
    openingBalance: 28750,
    closingBalance: 31200,
  },
  {
    id: 'stmt_004',
    period: 'Diciembre 2025',
    month: 'Diciembre',
    year: '2025',
    status: 'available',
    fileSize: '398 KB',
    generatedAt: '2026-01-01',
    transactions: 47,
    openingBalance: 22100,
    closingBalance: 28750,
  },
  {
    id: 'stmt_005',
    period: 'Noviembre 2025',
    month: 'Noviembre',
    year: '2025',
    status: 'available',
    fileSize: '276 KB',
    generatedAt: '2025-12-01',
    transactions: 29,
    openingBalance: 19400,
    closingBalance: 22100,
  },
  {
    id: 'stmt_006',
    period: 'Octubre 2025',
    month: 'Octubre',
    year: '2025',
    status: 'available',
    fileSize: '291 KB',
    generatedAt: '2025-11-01',
    transactions: 33,
    openingBalance: 15800,
    closingBalance: 19400,
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content:
      'Hola Alberto, soy tu asistente financiero FinAgent 360. ¿En qué puedo ayudarte hoy?',
    timestamp: '2026-03-10T14:30:00Z',
    status: 'read',
    actions: [
      { id: 'qa_1', label: 'Ver saldo', action: 'check_balance', icon: 'wallet' },
      { id: 'qa_2', label: 'Bloquear tarjeta', action: 'block_card', icon: 'lock' },
      {
        id: 'qa_3',
        label: 'Estado de cuenta',
        action: 'request_statement',
        icon: 'file-text',
      },
      {
        id: 'qa_4',
        label: 'Actualizar dirección',
        action: 'update_address',
        icon: 'map-pin',
      },
    ],
  },
  {
    id: 'msg_002',
    role: 'user',
    content: '¿Cuál es mi saldo disponible?',
    timestamp: '2026-03-10T14:31:00Z',
    status: 'read',
  },
  {
    id: 'msg_003',
    role: 'assistant',
    content:
      'Tu saldo disponible en cuenta principal ******4721** es de:\n\n**$47,832.50 MXN**\n\nTu última transacción fue un débito de $179.00 por Spotify Premium el día de hoy.',
    timestamp: '2026-03-10T14:32:00Z',
    status: 'read',
  },
  {
    id: 'msg_004',
    role: 'user',
    content: 'Necesito bloquear mi tarjeta Visa temporalmente',
    timestamp: '2026-03-10T14:33:00Z',
    status: 'read',
  },
  {
    id: 'msg_005',
    role: 'assistant',
    content:
      'Entendido. Voy a bloquear temporalmente tu tarjeta **Visa *4721**.\n\n✓ Tarjeta identificada: Visa Débito terminación **4721**\n✓ Tipo de bloqueo: Temporal\n\n¿Confirmas que deseas proceder con el bloqueo?',
    timestamp: '2026-03-10T14:33:30Z',
    status: 'read',
    actions: [
      {
        id: 'qa_confirm',
        label: 'Confirmar bloqueo',
        action: 'confirm_block',
        icon: 'check',
      },
      { id: 'qa_cancel', label: 'Cancelar', action: 'cancel', icon: 'x' },
    ],
  },
];

export const formatCurrency = (
  amount: number,
  currency = 'MXN'
): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
};

export const formatTime = (dateStr: string): string => {
  return new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateStr));
};

export const aiResponses: Record<string, string> = {
  check_balance:
    'Tu saldo disponible en cuenta principal **\*\*\*\*4721** es de:\n\n**$47,832.50 MXN**\n\nTu última transacción fue un débito de $179.00 por Spotify Premium el día de hoy.',
  block_card:
    'Entendido. Voy a bloquear temporalmente tu tarjeta **Visa *4721**.\n\n✓ Tarjeta identificada: Visa Débito terminación **4721**\n✓ Tipo de bloqueo: Temporal\n\n¿Confirmas que deseas proceder con el bloqueo?',
  request_statement:
    'Con gusto puedo preparar tu estado de cuenta. ¿Para qué período lo necesitas?\n\n• Febrero 2026 (disponible)\n• Enero 2026 (disponible)\n• Diciembre 2025 (disponible)',
  update_address:
    'Para actualizar tu domicilio fiscal necesito la nueva dirección completa. Por favor compártela y verificaré los datos antes de realizar el cambio.',
  confirm_block:
    '✓ **Tarjeta Visa *4721 bloqueada exitosamente.**\n\nTu tarjeta ha sido bloqueada de forma temporal. Ninguna transacción podrá procesarse hasta que la reactives. ¿Necesitas algo más?',
  cancel: 'Acción cancelada. No se realizaron cambios en tu cuenta. ¿En qué más puedo ayudarte?',
  default:
    'Entendido. Estoy procesando tu solicitud. Como tu asistente financiero tengo acceso a tu cuenta para ayudarte con consultas de saldo, bloqueo de tarjetas, estados de cuenta y actualizaciones de datos. ¿Puedo ayudarte con algo específico?',
};
