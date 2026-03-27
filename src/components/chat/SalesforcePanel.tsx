'use client'

interface SalesforcePanelProps {
  suggestedInput?: string
}

export default function SalesforcePanel({ suggestedInput }: SalesforcePanelProps) {
  const vfUrl = 'https://orgfarm-6448954ded-dev-ed--c.develop.vf.force.com/apex/BreBankNexo'

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <div className="w-6 h-6">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="#00A1E0"/>
            <text x="50" y="67" textAnchor="middle" fill="white" fontSize="52" fontWeight="bold">S</text>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Nexo — Agente BreBank</p>
          <p className="text-xs text-gray-400">Powered by Agentforce</p>
        </div>
        <span className="ml-auto flex items-center gap-1 text-xs text-green-600">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
          En línea
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-700 text-sm font-semibold">Chatea con Nexo en Agentforce</p>
          <p className="text-gray-400 text-xs mt-1">Se abrirá en una ventana segura de Salesforce</p>
        </div>
        <button
          onClick={() => window.open(vfUrl, 'nexo-chat', 'width=400,height=600')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <span>💬</span>
          Abrir chat con Nexo
        </button>
        {suggestedInput && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 max-w-xs">
            <p className="font-medium mb-1">Nexo sugiere escribir:</p>
            <p>"{suggestedInput}"</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-300">🔒 Secured by Salesforce Agentforce</p>
      </div>
    </div>
  )
}
