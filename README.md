# FinAgent 360

**Tu copiloto financiero impulsado por IA** — Dashboard de banca digital construido con Next.js 14, TypeScript y Tailwind CSS.

---

## Descripción

FinAgent 360 es una interfaz de banca digital moderna con tema claro, diseñada para demostrar una experiencia de usuario premium en el sector fintech. Incluye un asistente de IA conversacional con voz bidireccional, gestión de tarjetas, historial de actividad, perfil de cuenta y centro de documentos — todo integrado en una sola aplicación web sin dependencias de APIs externas.

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

**Sin dependencias externas de IA ni TTS** — todo usa APIs nativas del navegador (Web Speech API).

---

## Requisitos

- **Node.js** 18.17 o superior
- **npm** 9 o superior (o equivalente con yarn/pnpm)
- Navegador con soporte de Web Speech API (Chrome, Safari, Edge)

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
│   ├── app/                        # Rutas (Next.js App Router)
│   │   ├── layout.tsx              # Layout raíz + metadata global
│   │   ├── globals.css             # Variables CSS, utilidades globales y animaciones
│   │   ├── page.tsx                # / → Dashboard principal
│   │   ├── chat/
│   │   │   └── page.tsx            # /chat → Asistente IA con voz
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
│   │   │   ├── QuickActions.tsx    # Accesos directos (transferir, pagar, recargar…)
│   │   │   ├── AgentHighlight.tsx  # Banner de acceso al asistente IA
│   │   │   └── RecentTransactions.tsx # Últimos movimientos
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx   # Chat completo con burbujas, typing indicator e input
│   │   │   └── VoiceButton.tsx     # Botón de micrófono con ecualizador animado
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
│   ├── hooks/
│   │   └── useVoiceChat.ts         # Hook de voz: STT + TTS con Web Speech API
│   │
│   ├── lib/
│   │   └── mock-data.ts            # Datos mock + helpers formatCurrency/formatDate/formatTime
│   │
│   └── types/
│       └── index.ts                # Interfaces TypeScript: User, Card, Transaction…
│
├── tailwind.config.ts              # Tokens de diseño, colores, animaciones personalizadas
├── tsconfig.json                   # Configuración TypeScript con path alias (@/)
├── next.config.mjs                 # Configuración Next.js
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

Interfaz conversacional completa con soporte de voz bidireccional:

- Mensajes con burbujas diferenciadas (usuario vs. asistente).
- Indicador de escritura animado (typing dots) durante la respuesta.
- **Quick actions** contextuales: Ver saldo, Bloquear tarjeta, Estado de cuenta, Actualizar dirección.
- Respuestas mock predefinidas según la acción seleccionada (`aiResponses` en `mock-data.ts`).
- Flujo de confirmación para el bloqueo de tarjeta (botones Confirmar / Cancelar).
- Soporte básico de Markdown en respuestas del asistente (negritas con `**texto**`).
- Envío con `Enter`, nueva línea con `Shift+Enter`.
- **Voz:** micrófono para dictar mensajes + TTS para escuchar las respuestas del asistente.

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

## Sistema de voz

### Arquitectura

El sistema de voz usa exclusivamente la **Web Speech API nativa del navegador** — sin SDKs externos ni llamadas a APIs de terceros.

```
useVoiceChat (hook)
├── SpeechRecognition API  → voz del usuario a texto (STT)
└── SpeechSynthesis API    → texto del asistente a voz (TTS)

VoiceButton (componente)
└── Visualización del estado: idle / escuchando / hablando
```

### Hook `useVoiceChat` (`src/hooks/useVoiceChat.ts`)

```typescript
const {
  isListening,    // true mientras el micrófono está activo
  isSpeaking,     // true mientras el asistente está hablando
  transcript,     // texto parcial en tiempo real mientras escucha
  isSupported,    // false si el navegador no soporta Web Speech API
  startListening, // inicia/detiene el micrófono
  speak,          // reproduce un texto en voz alta
  stopSpeaking,   // cancela el TTS en curso
} = useVoiceChat({ onTranscript });
```

**Speech Recognition (STT):**
- Idioma: `es-MX`
- Resultados intermedios activados (`interimResults: true`) — muestra el texto mientras el usuario habla
- Un resultado final dispara `onTranscript(text)` automáticamente

**Text-to-Speech (TTS):**
- Idioma: `es-MX`
- Pitch: `0.8` (voz grave)
- Rate: `0.95` (ritmo natural)
- Volume: `1.0`
- Selección de voz por nombre exacto — lista de preferencia en orden:
  ```
  'Google español de Estados Unidos'
  'Google español'
  ```
  Si ninguna está disponible, usa la voz por defecto del sistema con `pitch: 0.8`.

**Carga de voces (compatibilidad Safari/Chrome):**

`speechSynthesis.getVoices()` puede devolver un array vacío en la primera llamada (especialmente en Chrome, que carga voces de forma asíncrona). El hook maneja ambos casos:

```typescript
if (voices.length > 0) {
  speakWithVoice(); // voces ya disponibles
} else {
  // Espera al evento onvoiceschanged
  window.speechSynthesis.onvoiceschanged = speakWithVoice;
  // Fallback para Safari (puede no disparar el evento)
  setTimeout(speakWithVoice, 100);
}
```

El flag `fired` previene ejecución doble cuando ambos mecanismos están activos.

**Limpieza de texto antes de TTS:**

El hook elimina marcado Markdown y símbolos antes de hablar, para que el audio suene natural:

```typescript
text
  .replace(/\*\*(.*?)\*\*/g, '$1')  // quita negritas
  .replace(/\*(.*?)\*/g, '$1')       // quita cursivas
  .replace(/[✓•·]/g, '')            // quita símbolos
  .replace(/\n+/g, '. ')            // convierte saltos en pausas
```

**Debug:** al llamar `speak()`, el hook imprime en consola la lista completa de voces disponibles y cuál fue seleccionada. Útil para identificar nombres exactos en nuevos dispositivos.

### Componente `VoiceButton` (`src/components/chat/VoiceButton.tsx`)

Botón circular de micrófono con tres estados visuales:

| Estado | Ícono | Color | Efecto |
|---|---|---|---|
| Inactivo | `Mic` | Gris translúcido | — |
| Escuchando | `MicOff` | Rojo | `animate-pulse` |
| Hablando | `Volume2` | Cyan (`#06B6D4`) | Brillo cyan |

Cuando está activo (escuchando o hablando), muestra un **ecualizador animado** de 5 barras con alturas y delays escalonados (`voiceWave` keyframe), en rojo para micrófono y cyan para TTS.

Se renderiza `null` si `isSupported === false` (navegador sin Web Speech API).

### Flujo de interacción por voz

```
1. Usuario presiona el botón de micrófono
   → Si el asistente está hablando: cancela el TTS inmediatamente
   → Si no: inicia SpeechRecognition

2. Usuario habla
   → Transcript parcial aparece como placeholder en el textarea

3. Silencio detectado → resultado final
   → voiceTriggeredRef.current = true
   → sendMessage(transcript) se ejecuta automáticamente

4. Asistente genera respuesta (mock, 1.2–1.8s de delay)

5. useEffect detecta nuevo mensaje de asistente + voiceTriggeredRef === true
   → speak(response) → TTS reproduce la respuesta
   → voiceTriggeredRef.current = false (evita re-ejecución en re-renders)
```

### Voces disponibles por plataforma

Las voces disponibles dependen del SO y el navegador. Para ver la lista exacta en tu dispositivo, abre la consola del navegador en `/chat` y envía cualquier mensaje por voz — aparecerá el log `Voces disponibles:`.

**macOS / Safari:**
- Voces del sistema: Paulina, Mónica (femeninas), Eddy, Reed, Rocko, Grandpa (masculinas) — en español (México)

**Chrome (cualquier SO):**
- Google español, Google español de Estados Unidos

**Windows:**
- Microsoft Pablo, Microsoft Sabina (depende de los language packs instalados)

Para cambiar la voz, editar la función `speakWithVoice` en `useVoiceChat.ts`:

```typescript
const maleVoice = voices.find(
  (v) =>
    v.name === 'Google español de Estados Unidos' ||
    v.name === 'Google español'
);
```

---

## Sistema de diseño

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `background` | `#F0F4FF` | Fondo general de la app |
| `surface` | `#FFFFFF` | Superficies de tarjetas/paneles |
| `primary` | `#2563EB` | Azul principal (botones, gradientes) |
| `cyan` | `#06B6D4` | Acento cyan (gradientes, voz activa) |
| `purple` | `#7C3AED` | Acento IA / asistente |
| `success` | `#10B981` | Estados positivos |
| `warning` | `#F59E0B` | Alertas / pendientes |
| `error` | `#EF4444` | Errores / bloqueados |

### Clases CSS utilitarias (`globals.css`)

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

Toda la información proviene de `src/lib/mock-data.ts`. No hay llamadas a APIs externas ni bases de datos.

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
- Modo oscuro (dark mode)

---

## Licencia

Proyecto privado. Todos los derechos reservados.
