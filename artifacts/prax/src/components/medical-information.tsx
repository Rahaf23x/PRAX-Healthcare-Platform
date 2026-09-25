import { AlertTriangle, FileText, HeartPulse, Pill } from 'lucide-react';
import { demoPatient, localize, type Lang, type PrototypeCopy } from '@/lib/prototype-i18n';

export function medicalCards(lang: Lang, t: PrototypeCopy) {
  const p = demoPatient;
  return [
    { title: t.record.allergies, icon: AlertTriangle, tone: 'border-[hsl(var(--destructive)/.25)] bg-[hsl(var(--destructive)/.07)] text-[hsl(var(--destructive))]', children: <><div className="font-extrabold">{localize(p.allergies, lang)}</div><div className="mt-1 text-xs">{localize(p.allergyDetail, lang)}</div></> },
    { title: t.record.chronic, icon: HeartPulse, tone: 'border-[hsl(var(--accent)/.35)] bg-[hsl(var(--accent)/.13)] text-[hsl(33_70%_31%)] dark:text-[hsl(39_92%_77%)]', children: p.chronic.map((item) => <div key={item.en}>• {localize(item, lang)}</div>) },
    { title: t.record.medications, icon: Pill, tone: 'border-[hsl(203_78%_45%/.2)] bg-[hsl(203_78%_45%/.07)] text-[hsl(203_78%_38%)] dark:text-[hsl(203_78%_72%)]', children: p.medications.map((item) => <div key={item.en}>• {localize(item, lang)}</div>) },
    { title: t.record.previous, icon: FileText, tone: 'border-[hsl(var(--border))] bg-[hsl(var(--muted)/.55)]', children: p.previous.map((item) => <div key={item.en}>• {localize(item, lang)}</div>) },
  ] as const;
}

export function MedicalInformation({ lang, t }: { lang: Lang; t: PrototypeCopy }) {
  return <div className="grid gap-3 sm:grid-cols-2">{medicalCards(lang, t).map(({ title, icon: Icon, tone, children }) =>
    <div key={title} className={`rounded-2xl border p-4 ${tone}`}>
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase"><Icon size={16} />{title}</div>
      <div className="mt-4 text-sm">{children}</div>
    </div>,
  )}</div>;
}