'use client';
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockUser } from '@/lib/mock-data';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit3,
  Check,
  X,
  Lock,
  Smartphone,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { clsx } from 'clsx';

interface EditableFieldProps {
  label: string;
  value: string;
  icon: React.ElementType;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}

function EditableField({
  label,
  value,
  icon: Icon,
  editing,
  onChange,
  type = 'text',
  multiline,
}: EditableFieldProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-white/[0.05] last:border-0">
      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1">
          {label}
        </p>
        {editing ? (
          multiline ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={2}
              className="w-full bg-white/[0.04] border border-blue-500/40 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-white/[0.04] border border-blue-500/40 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          )
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed">{value}</p>
        )}
      </div>
    </div>
  );
}

function SecurityItem({
  icon: Icon,
  label,
  value,
  status,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  status?: 'active' | 'warning';
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/[0.05] last:border-0">
      <div
        className={clsx(
          'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
          status === 'active'
            ? 'bg-emerald-500/10 border border-emerald-500/20'
            : 'bg-white/[0.04] border border-white/[0.07]'
        )}
      >
        <Icon
          className={clsx(
            'w-4 h-4',
            status === 'active' ? 'text-emerald-400' : 'text-slate-500'
          )}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-300">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{value}</p>
      </div>
      {status === 'active' && (
        <Badge variant="success" dot size="sm">
          Activo
        </Badge>
      )}
    </div>
  );
}

export default function AccountPage() {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [fields, setFields] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    address: mockUser.address,
  });
  const [original, setOriginal] = useState(fields);

  const handleEdit = () => {
    setOriginal(fields);
    setEditing(true);
    setSaved(false);
  };

  const handleCancel = () => {
    setFields(original);
    setEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <MainLayout title="Mi Cuenta" subtitle="Información y configuración de tu cuenta">
      <div className="max-w-3xl space-y-6">
        {/* Profile header card */}
        <div className="glass-card rounded-2xl p-6 animate-fade-in">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-500/30">
                AM
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0B1120] flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-white">{fields.name}</h2>
                <Badge variant="active" dot>
                  {mockUser.accountType}
                </Badge>
              </div>
              <p className="text-sm text-slate-500">
                {mockUser.accountNumber} · Miembro desde{' '}
                {new Intl.DateTimeFormat('es-MX', {
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(mockUser.joinDate))}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {saved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  Guardado
                </div>
              )}
              {!editing ? (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit3 className="w-3.5 h-3.5" />
                  Editar perfil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="w-3.5 h-3.5" />
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    loading={saving}
                    onClick={handleSave}
                  >
                    <Check className="w-3.5 h-3.5" />
                    Guardar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal info */}
          <div className="glass-card rounded-2xl p-6 animate-fade-in delay-100">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-semibold text-white">
                Información personal
              </h3>
            </div>
            <div>
              <EditableField
                label="Nombre completo"
                value={fields.name}
                icon={User}
                editing={editing}
                onChange={(v) => setFields((f) => ({ ...f, name: v }))}
              />
              <EditableField
                label="Correo electrónico"
                value={fields.email}
                icon={Mail}
                editing={editing}
                onChange={(v) => setFields((f) => ({ ...f, email: v }))}
                type="email"
              />
              <EditableField
                label="Teléfono"
                value={fields.phone}
                icon={Phone}
                editing={editing}
                onChange={(v) => setFields((f) => ({ ...f, phone: v }))}
                type="tel"
              />
              <EditableField
                label="Dirección"
                value={fields.address}
                icon={MapPin}
                editing={editing}
                onChange={(v) => setFields((f) => ({ ...f, address: v }))}
                multiline
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Account info */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in delay-200">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-white">
                  Información de cuenta
                </h3>
              </div>
              <div className="space-y-0">
                {[
                  {
                    label: 'Número de cuenta',
                    value: mockUser.accountNumber,
                  },
                  { label: 'Tipo de cuenta', value: mockUser.accountType },
                  { label: 'Moneda', value: mockUser.currency },
                  {
                    label: 'Estado',
                    value:
                      mockUser.status === 'active' ? 'Activa' : 'Suspendida',
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between py-3 border-b border-white/[0.05] last:border-0"
                  >
                    <span className="text-xs text-slate-500">{label}</span>
                    <span
                      className={clsx(
                        'text-xs font-medium',
                        label === 'Estado'
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      )}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in delay-300">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-white">Seguridad</h3>
              </div>
              <div>
                <SecurityItem
                  icon={Smartphone}
                  label="Autenticación de dos factores"
                  value="Activa via SMS"
                  status="active"
                />
                <SecurityItem
                  icon={Lock}
                  label="Contraseña"
                  value="Última actualización hace 2 meses"
                />
                <SecurityItem
                  icon={Calendar}
                  label="Último acceso"
                  value="Hoy, 08:01 · iPhone 15 Pro · CDMX"
                  status="active"
                />
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <Lock className="w-3.5 h-3.5" />
                Cambiar contraseña
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
