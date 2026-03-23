# FinAgent 360

**Tu copiloto financiero impulsado por IA** — Dashboard de banca digital construido con Next.js 14, TypeScript y Tailwind CSS.

---

## Descripción

FinAgent 360 es una interfaz de banca digital moderna con tema oscuro, diseñada para demostrar una experiencia de usuario premium en el sector fintech. Incluye un asistente de IA conversacional, gestión de tarjetas, historial de actividad, perfil de cuenta y centro de documentos — todo integrado en una sola aplicación web.

---

## Tech Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 14.2.5 | Framework (App Router) |
| React | 18 | UI library |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 3.4.1 | Estilos utilitarios |
| Lucide React | 0.400.0 | Iconografía |
| clsx | 2.1.1 | Composición condicional de clases |
| tailwind-merge | 2.4.0 | Merge seguro de clases Tailwind |

---

## Requisitos

- **Node.js** 18.17 o superior
- **npm** 9 o superior (o equivalente con yarn/pnpm)

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/FinAgent-360.git
cd FinAgent-360

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo (hot reload)
npm run build    # Compilación para producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Análisis estático con ESLint
```

---

## Estructura del proyecto

```
FinAgent-360/
├── src/
│   ├── app/                        # Rutas (Next.js App Router)
│   │   ├── layout.tsx              # Layout raíz + metadata global
│   │   ├── globals.css             # Variables CSS, utilidades globales y animaciones
│   │   ├── page.tsx                # / → Dashboard principal
│   │   ├── chat/
│   │   │   └── page.tsx            # /chat → Asistente IA
│   │   ├── cards/
│   │   │   └── page.tsx            # /cards → Gestión de tarjetas
│   │   ├── account/
│   │   │   └── page.tsx            # /account → Perfil de usuario
│   │   ├── activity/
│   │   │   └── page.tsx            # /activity → Historial de actividad
│   │   └── documents/
│   │       └── page.tsx            # /documents → Centro de documentos
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx         # Barra lateral fija (240px) con navegación
│   │   │   ├── Header.tsx          # Encabezado con título de página y acciones
│   │   │   └── MainLayout.tsx      # Wrapper que compone Sidebar + Header + contenido
│   │   │
│   │   ├── dashboard/
│   │   │   ├── BalanceCard.tsx     # Tarjeta de saldo con toggle show/hide
│   │   │   ├── QuickActions.tsx    # Acciones rápidas (transferir, pagar, etc.)
│   │   │   ├── AgentHighlight.tsx  # Banner de acceso al asistente IA
│   │   │   └── RecentTransactions.tsx # Lista de transacciones recientes
│   │   │
│   │   ├── chat/
│   │   │   └── ChatInterface.tsx   # Chat completo con burbujas, typing indicator e input
│   │   │
│   │   ├── cards/
│   │   │   ├── BankCard.tsx        # Componente visual de tarjeta bancaria
│   │   │   └── CardActions.tsx     # Acciones: bloquear/desbloquear tarjeta
│   │   │
│   │   ├── activity/
│   │   │   └── EventLog.tsx        # Timeline de eventos con pestañas de filtro
│   │   │
│   │   ├── documents/
│   │   │   └── DocumentCenter.tsx  # Lista de estados de cuenta con descarga simulada
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx          # Botón con variantes (primary, ghost, outline…)
│   │       ├── Badge.tsx           # Badge de estado con colores semánticos
│   │       └── Card.tsx            # Contenedor de superficie con estilos glass
│   │
│   ├── lib/
│   │   └── mock-data.ts            # Todos los datos mock + helpers formatCurrency/formatDate/formatTime
│   │
│   └── types/
│       └── index.ts                # Interfaces TypeScript: User, Card, Transaction, ActivityEvent, ChatMessage, Statement
│
├── tailwind.config.ts              # Tokens de diseño, colores, animaciones personalizadas
├── tsconfig.json                   # Configuración TypeScript con path alias (@/)
├── next.config.mjs                 # Configuración Next.js
└── package.json
```

---

## Páginas y funcionalidades

### Dashboard `/`
Página de inicio con resumen financiero completo:
- **BalanceCard** — saldo disponible con gradiente azul-cyan, botón para ocultar/mostrar el monto, indicador de rendimiento mensual (+12.4%).
- **QuickActions** — accesos directos a operaciones frecuentes (transferir, pagar, recargar, más).
- **AgentHighlight** — banner destacado que invita al usuario a consultar al asistente IA.
- **RecentTransactions** — tabla de últimos movimientos con categoría, monto y fecha.

### Asistente IA `/chat`
Interfaz conversacional completa:
- Mensajes con burbujas diferenciadas (usuario vs. asistente).
- Indicador de escritura animado (typing dots) durante la respuesta.
- **Quick actions** contextuales: Ver saldo, Bloquear tarjeta, Estado de cuenta, Actualizar dirección.
- Respuestas mock predefinidas según la acción seleccionada (`aiResponses` en `mock-data.ts`).
- Flujo de confirmación para el bloqueo de tarjeta (botones Confirmar / Cancelar).
- Soporte básico de Markdown en respuestas del asistente (texto en negritas).
- Envío con `Enter`, nueva línea con `Shift+Enter`.

### Mis Tarjetas `/cards`
- Visualización de 2 tarjetas (Visa débito `*4721`, Mastercard crédito `*8834`) con componente `BankCard`.
- Detalle de límite, disponible y estado por tarjeta.
- Acciones: bloquear / desbloquear con estado reactivo.

### Mi Cuenta `/account`
- Perfil del usuario (nombre, email, teléfono, dirección, número de cuenta).
- Modo edición con campos editables y botones Guardar / Cancelar.

### Actividad `/activity`
- Timeline vertical de eventos de seguridad y operaciones con timestamp.
- Pestañas de filtro: Todos, Seguridad, Transacciones, Sistema.
- Cada evento muestra título, descripción, estado (success / pending / failed) y metadatos opcionales.

### Documentos `/documents`
- Grid de estados de cuenta de los últimos 6 meses.
- Estado por documento: disponible, procesando, pendiente.
- Simulación de descarga con feedback visual.

---

## Sistema de diseño

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `background` | `#050912` | Fondo general de la app |
| `surface` | `#0B1120` | Superficies de tarjetas/paneles |
| `elevated` | `#111827` | Elementos elevados sobre surface |
| `primary` | `#2563EB` | Azul principal (botones, gradientes) |
| `cyan` | `#06B6D4` | Acento cyan (gradientes, highlights) |
| `purple` | `#8B5CF6` | Acento IA / asistente |
| `success` | `#10B981` | Estados positivos |
| `warning` | `#F59E0B` | Alertas / pendientes |
| `error` | `#EF4444` | Errores / bloqueados |

### Clases CSS utilitarias (globals.css)

```css
.glass-card     /* Fondo translúcido con blur — superficies flotantes */
.gradient-text  /* Texto con gradiente azul → cyan */
.card-hover     /* Efecto hover sutil en tarjetas */
.animate-fade-in /* Entrada suave desde abajo (fadeIn 0.4s) */
```

### Animaciones personalizadas (Tailwind)

| Clase | Efecto |
|---|---|
| `animate-fade-in` | Aparece con movimiento hacia arriba (0.4s) |
| `animate-slide-up` | Sube con fade in más pronunciado (0.5s) |
| `animate-slide-in` | Entra desde la izquierda (0.3s) |
| `animate-pulse-glow` | Pulso de brillo azul (2s loop) |
| `animate-float` | Flotación vertical suave (3s loop) |
| `animate-spin-slow` | Rotación lenta (8s loop) |

### Tipografía

Fuente principal: **Inter** → `-apple-system` → `BlinkMacSystemFont` → `sans-serif`.

---

## Datos mock

Toda la información de la aplicación proviene de `src/lib/mock-data.ts`. No hay llamadas a APIs externas ni bases de datos.

**Usuario de prueba:**
- Nombre: Alejandro Morales Reyes
- Cuenta: `****4721` — Cuenta Premium
- Saldo: `$47,832.50 MXN`

**Datos disponibles:**
- 2 tarjetas bancarias (Visa débito y Mastercard crédito)
- 10 transacciones recientes con categorías e íconos
- 10 eventos de actividad (login, bloqueo, pagos, actualizaciones)
- 6 estados de cuenta mensuales
- Historial de chat de muestra
- Respuestas de IA por tipo de acción (`aiResponses`)

**Helpers incluidos:**
```typescript
formatCurrency(amount: number): string  // "$47,832.50"
formatDate(dateString: string): string  // "15 Mar 2024"
formatTime(dateString: string): string  // "10:30 AM"
```

---

## Tipos TypeScript

Definidos en `src/types/index.ts`:

```typescript
interface User          // Perfil de usuario (id, name, email, balance, status…)
interface Card          // Tarjeta bancaria (type, lastFour, status, cardType, limit…)
interface Transaction   // Movimiento (description, amount, type, category, date…)
interface ActivityEvent // Evento de actividad (type, title, status, metadata…)
interface ChatMessage   // Mensaje de chat (role, content, status, actions…)
interface QuickAction   // Acción rápida en chat (label, action, icon)
interface Statement     // Estado de cuenta (period, status, transactions, balances…)
```

---

## Configuración del editor (recomendada)

Para la mejor experiencia de desarrollo con este proyecto:

- **VS Code** con extensiones: `Tailwind CSS IntelliSense`, `ESLint`, `TypeScript`
- Path alias `@/` configurado en `tsconfig.json` → apunta a `./src`
- El proyecto incluye `.eslintrc.json` con reglas de `eslint-config-next`

---

## Roadmap / posibles extensiones

- Integración con API real de Claude / OpenAI para respuestas dinámicas del asistente
- Autenticación con NextAuth.js
- Conexión a base de datos (Prisma + PostgreSQL)
- Notificaciones push / WebSockets para actividad en tiempo real
- Internacionalización (i18n) para soporte multi-idioma
- Tests con Jest + React Testing Library
- Modo claro (light mode)

---

## Licencia

Proyecto privado. Todos los derechos reservados.
