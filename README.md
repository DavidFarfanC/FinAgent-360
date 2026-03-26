# FinAgent 360

**Tu copiloto financiero impulsado por IA** — Dashboard de banca digital construido con Next.js 14, TypeScript y Tailwind CSS, con asistente de voz conversacional y canal de atención digital integrado con Salesforce Agentforce.

---

## Descripción

FinAgent 360 es una interfaz de banca digital moderna con tema claro, diseñada para demostrar una experiencia de usuario premium en el sector fintech. Incluye:

- Un **asistente de voz conversacional (Nexo)** impulsado por OpenAI y Web Speech API
- Un **canal de chat con Salesforce Agentforce** (Messaging for Web) embebible
- Gestión de tarjetas, historial de actividad, perfil de cuenta y centro de documentos

La página `/chat` está dividida en dos paneles que pueden integrarse de forma independiente: el panel de voz (Nexo) y el widget de Agentforce.

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

**APIs externas utilizadas:**
- **OpenAI API** (`gpt-4o-mini`) — respuestas conversacionales de Nexo (voz)
- **Salesforce Agentforce** (Einstein AI Agent API) — chat de atención digital
- **Web Speech API** (nativa del navegador) — STT y TTS sin SDK adicional

---

## Requisitos

- **Node.js** 18.17 o superior
- **npm** 9 o superior (o equivalente con yarn/pnpm)
- Navegador con soporte de Web Speech API (Chrome, Safari, Edge)
- Variables de entorno configuradas (ver sección siguiente)

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# OpenAI — respuestas del asistente de voz Nexo
OPENAI_API_KEY=sk-...

# Salesforce Agentforce — canal de chat digital
SALESFORCE_INSTANCE_URL=https://tu-org.my.salesforce.com
SALESFORCE_CLIENT_ID=3MVG9...
SALESFORCE_CLIENT_SECRET=...
AGENTFORCE_AGENT_ID=0Xx...
SALESFORCE_RUNTIME_BASE_URL=https://api.salesforce.com
```

> Si estas variables no están configuradas, el panel de voz y el chat de agente mostrarán mensajes de error en consola, pero el resto de la aplicación seguirá funcionando con datos mock.

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/FinAgent-360.git
cd FinAgent-360

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local   # editar con tus credenciales

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

### Limpiar caché de Next.js

Si hay comportamientos inesperados tras cambios de configuración:

```bash
rm -rf .next
npm run dev
```

---

## Estructura del proyecto

```
FinAgent-360/
├── src/
│   ├── app/                            # Rutas (Next.js App Router)
│   │   ├── layout.tsx                  # Layout raíz + metadata global
│   │   ├── globals.css                 # Variables CSS, utilidades globales y animaciones
│   │   ├── page.tsx                    # / → Dashboard principal
│   │   ├── chat/
│   │   │   └── page.tsx                # /chat → Asistente de voz + canal Agentforce
│   │   ├── cards/
│   │   │   └── page.tsx                # /cards → Gestión de tarjetas
│   │   ├── account/
│   │   │   └── page.tsx                # /account → Perfil de usuario
│   │   ├── activity/
│   │   │   └── page.tsx                # /activity → Historial de actividad
│   │   ├── documents/
│   │   │   └── page.tsx                # /documents → Centro de documentos
│   │   └── api/
│   │       ├── nexo/
│   │       │   └── route.ts            # POST /api/nexo → OpenAI gpt-4o-mini (voz Nexo)
│   │       └── agent/
│   │           ├── session/
│   │           │   └── route.ts        # POST/DELETE /api/agent/session → sesión Agentforce
│   │           ├── message/
│   │           │   └── route.ts        # POST /api/agent/message → mensaje a Agentforce
│   │           ├── log/
│   │           │   └── route.ts        # POST /api/agent/log → log de eventos
│   │           └── test/
│   │               └── route.ts        # GET /api/agent/test → health check Salesforce
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx             # Barra lateral fija (240px) con navegación
│   │   │   ├── Header.tsx              # Encabezado con título de página y acciones
│   │   │   └── MainLayout.tsx          # Wrapper que compone Sidebar + Header + contenido
│   │   │
│   │   ├── dashboard/
│   │   │   ├── BalanceCard.tsx         # Tarjeta de saldo con toggle show/hide
│   │   │   ├── QuickActions.tsx        # Accesos directos (transferir, pagar, recargar…)
│   │   │   ├── AgentHighlight.tsx      # Banner de acceso al asistente IA
│   │   │   └── RecentTransactions.tsx  # Últimos movimientos
│   │   │
│   │   ├── chat/
│   │   │   ├── NexoVoicePanel.tsx      # Panel de voz conversacional con Nexo (oscuro)
│   │   │   ├── SalesforcePanel.tsx     # Widget real Salesforce Messaging for Web (MIAW)
│   │   │   ├── ChatInterface.tsx       # Chat de texto conectado a Agentforce
│   │   │   └── VoiceButton.tsx         # Botón de micrófono con ecualizador animado
│   │   │
│   │   ├── cards/
│   │   │   ├── BankCard.tsx            # Componente visual de tarjeta bancaria
│   │   │   └── CardActions.tsx         # Acciones: bloquear/desbloquear tarjeta
│   │   │
│   │   ├── activity/
│   │   │   └── EventLog.tsx            # Timeline de eventos con pestañas de filtro
│   │   │
│   │   ├── documents/
│   │   │   └── DocumentCenter.tsx      # Lista de estados de cuenta con descarga simulada
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx              # Botón con variantes (primary, ghost, outline…)
│   │       ├── Badge.tsx               # Badge de estado con colores semánticos
│   │       └── Card.tsx                # Contenedor de superficie con estilos glass
│   │
│   ├── hooks/
│   │   ├── useNexoVoice.ts             # Hook de voz conversacional: STT + OpenAI + TTS
│   │   └── useVoiceChat.ts             # Hook de voz legacy (STT + TTS local)
│   │
│   ├── lib/
│   │   ├── salesforce.ts               # Cliente Salesforce: OAuth2 + Agentforce REST API
│   │   └── mock-data.ts                # Datos mock + helpers formatCurrency/formatDate/formatTime
│   │
│   └── types/
│       └── index.ts                    # Interfaces TypeScript: User, Card, Transaction…
│
├── tailwind.config.ts                  # Tokens de diseño, colores, animaciones personalizadas
├── tsconfig.json                       # Configuración TypeScript con path alias (@/)
├── next.config.mjs                     # Configuración Next.js
└── package.json
```

---

## Páginas y funcionalidades

### Dashboard `/`

Layout en grid 3 columnas balanceado (`items-start`):

- **Columna izquierda (2/3):** BalanceCard → QuickActions → RecentTransactions
- **Columna derecha (1/3):** AgentHighlight

Componentes:
- **BalanceCard** — saldo disponible con gradiente azul-cyan, toggle show/hide, indicador de rendimiento mensual.
- **QuickActions** — accesos directos a operaciones frecuentes (transferir, pagar, recargar, más).
- **RecentTransactions** — tabla de últimos movimientos con categoría, monto y fecha.
- **AgentHighlight** — banner que invita al usuario a consultar al asistente IA.

### Asistente IA `/chat`

Página de dos columnas (desktop) / pestañas (mobile) que combina dos canales independientes:

#### Panel izquierdo — Nexo Voice (`NexoVoicePanel`)

Asistente de voz conversacional con diseño oscuro (slate-900/blue-950):

- Botón central de micrófono con tres estados: **escuchando** (rojo), **pensando** (púrpura), **hablando** (cyan)
- Ecualizador animado de barras mientras escucha o responde
- Transcript en tiempo real mientras el usuario habla (burbuja flotante sobre el botón)
- Historial de los últimos 4 intercambios de la conversación
- Las respuestas de Nexo son generadas por **OpenAI `gpt-4o-mini`** vía `/api/nexo`
- Si Nexo detecta que el usuario quiere realizar una acción concreta, sugiere escribirlo en el chat → el texto se pasa automáticamente al panel de Agentforce

#### Panel derecho — Agentforce Chat (`SalesforcePanel`)

Widget real de **Salesforce Messaging for Web** (Embedded Messaging / MIAW):

- Carga el script oficial de bootstrap de Salesforce vía `useEffect` (una sola vez, controlado con `useRef`)
- Registra `window.initEmbeddedMessaging` e invoca `embeddedservice_bootstrap.init(...)` con las credenciales de la org
- El chat flotante oficial de Salesforce aparece en la **esquina inferior derecha** de la pantalla
- El panel muestra una tarjeta informativa indicando al usuario dónde aparece el botón del chat
- Si llega un `suggestedInput` desde Nexo, se muestra como sugerencia visual en el panel
- Cleanup al desmontar: elimina ambos scripts del `<head>` para evitar duplicados en hot-reload

#### Comunicación entre paneles

```
NexoVoicePanel
  └─ onActionDetected(texto) ──► ChatPage state
                                      └─ suggestedInput ──► SalesforcePanel input
```

Cuando el usuario le pide a Nexo algo accionable (bloquear tarjeta, consultar saldo, etc.), Nexo detecta la intención y pre-rellena el campo de texto del canal de Agentforce. En mobile, también cambia la pestaña activa al panel de chat.

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

## Sistema de voz — Nexo

### Arquitectura

```
useNexoVoice (hook)
├── Web Speech API (SpeechRecognition)  → STT: voz del usuario a texto
├── POST /api/nexo → OpenAI gpt-4o-mini → respuesta conversacional en español
└── Web Speech API (SpeechSynthesis)    → TTS: respuesta de Nexo en audio

NexoVoicePanel (componente)
└── Visualiza estado (escuchando / pensando / hablando) + historial
```

### Hook `useNexoVoice` (`src/hooks/useNexoVoice.ts`)

```typescript
const {
  isListening,       // true mientras el micrófono está activo
  isSpeaking,        // true mientras Nexo está hablando
  isThinking,        // true mientras espera la respuesta de OpenAI
  isSupported,       // false si el navegador no soporta Web Speech API
  transcript,        // texto parcial en tiempo real mientras escucha
  startConversation, // toggle on/off de la conversación
  stopSpeaking,      // cancela el TTS en curso
} = useNexoVoice({ onActionDetected });
```

**Flujo completo de una interacción:**

```
1. Usuario presiona el botón central
   → conversation mode ON → inicia SpeechRecognition (continuo)

2. Usuario habla
   → transcript parcial se muestra en tiempo real
   → debounce de 1500ms tras el último fragmento final

3. Silencio detectado → debounce dispara
   → recognition.stop()
   → POST /api/nexo { message, history (últimos 6 turnos) }

4. OpenAI responde → texto limpiado (quita markdown)
   → SpeechSynthesis reproduce la respuesta (TTS)

5. TTS termina → recognition.start() de nuevo
   → listo para el siguiente turno

Interrupción: si el usuario habla mientras Nexo habla
   → speechSynthesis.cancel() inmediato → toma el turno
```

**Detección de intención accionable:**

Si la respuesta de OpenAI contiene frases como `"escríbelo en el chat"` o `"en el chat"`, el hook invoca `onActionDetected(últimoMensajeUsuario)` para trasladar la acción al canal de Agentforce.

**TTS — selección de voz:**

| Navegador | Voces preferidas |
|---|---|
| Chrome | Google español de Estados Unidos → Google español |
| Safari (macOS) | Paulina → Jorge → Diego → Reed (Spanish Mexico) → Eddy (Spanish Mexico) |
| Fallback | Primera voz `lang.startsWith('es')` disponible |

Parámetros de voz: `rate: 1.35` (Chrome) / `1.0` (Safari), `pitch: 0.7` / `0.85`, `lang: es-MX`.

**Limpieza de texto antes de TTS:**

```typescript
text
  .replace(/\*\*(.*?)\*\*/g, '$1')  // quita negritas
  .replace(/\*(.*?)\*/g, '$1')       // quita cursivas
  .replace(/[✓•·]/g, '')            // quita símbolos
  .replace(/\n+/g, '. ')            // convierte saltos en pausas
```

**Compatibilidad de voces (Chrome/Safari):**

`speechSynthesis.getVoices()` puede devolver array vacío en la primera llamada. El hook espera al evento `onvoiceschanged` con fallback de `setTimeout(100ms)` para Safari. El flag `fired` previene ejecución doble.

---

## Integración Salesforce Agentforce

### Arquitectura

```
src/lib/salesforce.ts
├── getSalesforceToken()      → OAuth2 client_credentials (token cacheado 55 min)
├── createAgentSession()      → POST /einstein/ai-agent/v1/agents/:id/sessions
├── deleteAgentSession()      → DELETE /einstein/ai-agent/v1/sessions/:sessionId
└── sendAgentMessage()        → POST /einstein/ai-agent/v1/sessions/:sessionId/messages

API Routes (Next.js)
├── POST   /api/agent/session  → crea sesión al cargar ChatInterface
├── DELETE /api/agent/session  → destruye sesión al desmontar ChatInterface
├── POST   /api/agent/message  → envía mensaje y retorna respuesta del agente
└── GET    /api/agent/test     → health check de la conexión Salesforce
```

### Gestión de sesión

`ChatInterface` crea una sesión de Agentforce al montarse y la destruye en el cleanup del `useEffect`. Cada mensaje se envía con un `sequenceId` incremental como requiere el protocolo Einstein AI Agent.

### Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `SALESFORCE_INSTANCE_URL` | URL base de la org (`https://tu-org.my.salesforce.com`) |
| `SALESFORCE_CLIENT_ID` | Client ID de la Connected App |
| `SALESFORCE_CLIENT_SECRET` | Client Secret de la Connected App |
| `AGENTFORCE_AGENT_ID` | ID del agente en Salesforce (`0Xx...`) |
| `SALESFORCE_RUNTIME_BASE_URL` | Endpoint runtime de Agentforce (`https://api.salesforce.com`) |

### Widget `SalesforcePanel` — Messaging for Web real

`SalesforcePanel` carga el widget oficial de Salesforce Embedded Messaging directamente desde el CDN de la org. No depende de las rutas `/api/agent/*` propias — el chat lo gestiona Salesforce end-to-end.

**Credenciales del widget (hardcoded en el componente):**

| Parámetro | Valor |
|---|---|
| Org ID | `00Daj00000mMjCe` |
| Deployment name | `ESA_Web_Deployment` |
| Site URL | `https://orgfarm-6448954ded-dev-ed.develop.my.site.com/...` |
| scrt2URL | `https://orgfarm-6448954ded-dev-ed.develop.my.salesforce-scrt.com` |
| Idioma | `es` |

**Props:**

```typescript
interface SalesforcePanelProps {
  suggestedInput?: string;  // texto sugerido por Nexo, mostrado como aviso visual
}
```

**Snippet de carga (implementado en `useEffect`):**

```html
<!-- Script 1: registra initEmbeddedMessaging en window -->
<script>
  window.initEmbeddedMessaging = function() {
    embeddedservice_bootstrap.settings.language = 'es';
    embeddedservice_bootstrap.init('00Daj00000mMjCe', 'ESA_Web_Deployment', ...);
  }
</script>

<!-- Script 2: carga bootstrap y llama a init en onload -->
<script src=".../bootstrap.min.js" onload="initEmbeddedMessaging()"></script>
```

El componente puede embeberse en cualquier página Next.js sin configuración adicional. El widget flotante de Salesforce gestiona la conversación de forma completamente independiente.

---

## API de voz — `/api/nexo`

```
POST /api/nexo
Content-Type: application/json

{
  "message": "¿Cuánto cuesta bloquear mi tarjeta?",
  "history": [                          // opcional — últimos turnos (máx 6)
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}

→ 200 { "reply": "En BreBank bloquear tu tarjeta es completamente gratuito..." }
→ 500 { "error": "OpenAI error" }
```

**System prompt (Nexo):** Nexo es el ejecutivo bancario virtual de BreBank. Responde solo en español conversacional, sin listas ni bullets, con 2-3 oraciones por turno. Conoce políticas de bloqueo de tarjetas, requisitos de productos, tiempos de entrega, devoluciones y estados de cuenta.

---

## Sistema de diseño

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `background` | `#F0F4FF` | Fondo general de la app |
| `surface` | `#FFFFFF` | Superficies de tarjetas/paneles |
| `primary` | `#2563EB` | Azul principal (botones, gradientes) |
| `cyan` | `#06B6D4` | Acento cyan (gradientes, voz activa) |
| `purple` | `#7C3AED` | Acento IA / asistente / pensando |
| `success` | `#10B981` | Estados positivos |
| `warning` | `#F59E0B` | Alertas / pendientes |
| `error` | `#EF4444` | Errores / bloqueados |

El panel de voz de Nexo usa la paleta inversa: fondo `slate-900` / `blue-950` con tipografía y acciones en blanco.

### Clases CSS utilitarias (`globals.css`)

```css
.glass-card      /* Fondo translúcido con blur — superficies flotantes */
.gradient-text   /* Texto con gradiente azul → cyan */
.card-hover      /* Efecto hover sutil en tarjetas */
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

Las animaciones del panel de voz (`nexoPanelWave`, `nexoPanelDot`) están definidas inline en `NexoVoicePanel.tsx` para evitar dependencia del scope global.

### Tipografía

Fuente principal: **Inter** → `-apple-system` → `BlinkMacSystemFont` → `sans-serif`.

---

## Datos mock

La información de usuario, tarjetas, transacciones y actividad proviene de `src/lib/mock-data.ts`.

**Usuario de prueba:**
- Nombre: Alejandro Morales Reyes
- Cuenta: `****4721` — Cuenta Premium
- Saldo: `$47,832.50 MXN`

**Datos disponibles:**
- 2 tarjetas bancarias (Visa débito y Mastercard crédito)
- 10 transacciones recientes con categorías e íconos
- 10 eventos de actividad (login, bloqueo, pagos, actualizaciones)
- 6 estados de cuenta mensuales
- Historial de chat de muestra y respuestas mock por tipo de acción

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

- **VS Code** con extensiones: `Tailwind CSS IntelliSense`, `ESLint`, `TypeScript`
- Path alias `@/` configurado en `tsconfig.json` → apunta a `./src`
- El proyecto incluye `.eslintrc.json` con reglas de `eslint-config-next`

---

## Roadmap / posibles extensiones

- Autenticación con NextAuth.js
- Conexión a base de datos (Prisma + PostgreSQL)
- Notificaciones push / WebSockets para actividad en tiempo real
- Internacionalización (i18n) para soporte multi-idioma
- Tests con Jest + React Testing Library
- Modo oscuro (dark mode)
- Migrar TTS a ElevenLabs o Azure TTS para voz más natural
- Activar el widget oficial de Salesforce Messaging for Web (MIAW) en producción

---

## Licencia

Proyecto privado. Todos los derechos reservados.
