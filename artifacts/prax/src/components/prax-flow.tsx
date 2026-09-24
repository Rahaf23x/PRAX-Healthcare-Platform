import { useEffect, useState, type ReactNode } from 'react';
import {
  AlertTriangle, Ambulance, ArrowRight, Bell, BrainCircuit, Check, CheckCircle2,
  ChevronRight, ClipboardCheck, Clock3, FileText, Fingerprint, HeartPulse,
  Hospital, Info, LockKeyhole, MapPin, Pill, Radio, Search, Send, ShieldCheck,
  Siren, UserRound, X, Zap, type LucideIcon,
} from 'lucide-react';
import {
  demoHospitals, demoPatient, localize, prototypeCopy, type Lang, type PrototypeCopy,
} from '@/lib/prototype-i18n';
import { DemoLogin } from '@/components/demo-login';
import { VitalSigns } from '@/components/vital-signs';

type Role = 'paramedic' | 'hospital';
type View = 'role' | 'login' | 'identify' | 'record' | 'hospitals' | 'share' | 'sent' | 'hospital';
type ScanState = 'idle' | 'scanning' | 'verifying' | 'verified';
type NotificationKey = keyof typeof prototypeCopy.en.notifications;
type Copy = PrototypeCopy;

function useFlowLanguage() {
  const [lang, setLang] = useState<Lang>(() => localStorage.getItem('prax-language') === 'ar' ? 'ar' : 'en');
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('prax-language', lang);
  }, [lang]);
  return { lang, setLang, t: prototypeCopy[lang] as Copy };
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <img
    dir="ltr"
    src={`${import.meta.env.BASE_URL}prax-wordmark.png`}
    alt="PRAX"
    width={972}
    height={240}
    className={`block h-auto shrink-0 object-contain ${compact ? 'w-[100px] sm:w-[145px]' : 'w-[135px] sm:w-[170px]'}`}
  />;
}

function LanguageSwitch({ lang, setLang, t }: { lang: Lang; setLang: (value: Lang) => void; t: Copy }) {
  return <div className="flex items-center gap-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-1 text-xs shadow-sm" aria-label={t.app.language}><button type="button" data-testid="button-language-en" onClick={() => setLang('en')} className={`rounded-lg px-3 py-1.5 font-bold ${lang === 'en' ? 'bg-[hsl(var(--primary))] text-white' : 'text-[hsl(var(--muted-foreground))]'}`}>English</button><button type="button" data-testid="button-language-ar" onClick={() => setLang('ar')} className={`rounded-lg px-3 py-1.5 font-bold ${lang === 'ar' ? 'bg-[hsl(var(--primary))] text-white' : 'text-[hsl(var(--muted-foreground))]'}`}>العربية</button></div>;
}

function Badge({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'red' | 'amber' | 'blue' | 'slate' }) {
  const color = { teal: 'bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))]', red: 'bg-[hsl(var(--destructive)/.12)] text-[hsl(var(--destructive))]', amber: 'bg-[hsl(var(--accent)/.2)] text-[hsl(33_70%_31%)]', blue: 'bg-[hsl(203_78%_45%/.12)] text-[hsl(203_78%_38%)]', slate: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]' };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${color[tone]}`}>{children}</span>;
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] shadow-[0_12px_34px_hsl(211_49%_18%/.055)] ${className}`}>{children}</section>;
}

function SectionTitle({ icon: Icon, title, action }: { icon: LucideIcon; title: string; action?: ReactNode }) {
  return <div className="flex items-center justify-between gap-3 border-b border-[hsl(var(--border)/.8)] px-5 py-4"><div className="flex items-center gap-2.5 text-sm font-extrabold tracking-[-.01em]"><span className="grid size-8 place-items-center rounded-lg bg-[hsl(var(--primary)/.09)] text-[hsl(var(--primary))]"><Icon size={16} /></span>{title}</div>{action}</div>;
}

function Shell({ children, role, lang, setLang, t, notifications, onHome, onNotifications, notificationOpen }: { children: ReactNode; role: Role; lang: Lang; setLang: (value: Lang) => void; t: Copy; notifications: NotificationKey[]; onHome: () => void; onNotifications: () => void; notificationOpen: boolean }) {
  return <div className="min-h-[100dvh] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
    <header className="sticky top-0 z-30 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/.94)] px-3 py-3 backdrop-blur-xl sm:px-5 md:px-9">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button type="button" onClick={onHome} aria-label={t.app.backHome} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2.5 py-2 text-xs font-extrabold text-[hsl(var(--muted-foreground))] transition hover:border-[hsl(var(--primary)/.45)] hover:text-[hsl(var(--primary))] sm:px-3"><ArrowRight size={15} className="rotate-180 rtl:rotate-0" /><span className="hidden sm:inline">{t.common.back}</span></button>
          <button type="button" onClick={onHome} aria-label={t.app.backHome} className="shrink-0"><Logo compact /></button>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-[hsl(var(--muted)/.7)] px-3 py-2 text-[11px] font-bold text-[hsl(var(--muted-foreground))] lg:flex">{role === 'paramedic' ? <Ambulance size={14} className="text-[hsl(var(--primary))]" /> : <Hospital size={14} className="text-[hsl(var(--primary))]" />}{role === 'paramedic' ? t.app.paramedic : t.app.hospital}</div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={onNotifications} aria-label={t.notifications.title} className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-2.5 text-[hsl(var(--muted-foreground))]"><Bell size={17} />{notifications.length > 0 && <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[hsl(var(--destructive))] text-[9px] text-white">{notifications.length}</span>}</button>
          <LanguageSwitch lang={lang} setLang={setLang} t={t} />
        </div>
        {notificationOpen && <div className="absolute end-3 top-full mt-1 w-[min(340px,calc(100vw-1.5rem))] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-xl md:end-9"><div className="mb-3 flex items-center justify-between text-sm font-extrabold">{t.notifications.title}<button type="button" onClick={onNotifications} aria-label={t.common.close}><X size={16} /></button></div><div className="space-y-2">{notifications.length === 0 ? <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.notifications.empty}</p> : notifications.map((item, index) => <div key={`${item}-${index}`} className="flex gap-2 rounded-xl bg-[hsl(var(--muted)/.7)] p-3 text-xs"><span className="mt-1 size-2 shrink-0 rounded-full bg-[hsl(var(--primary))]" />{t.notifications[item]}</div>)}</div></div>}
      </div>
    </header>{children}
  </div>;
}

function Progress({ view, t }: { view: View; t: Copy }) {
  const steps = [{ id: 'identify', label: t.nav.identification }, { id: 'record', label: t.nav.record }, { id: 'hospitals', label: t.nav.hospitals }, { id: 'share', label: t.nav.review }];
  const current = steps.findIndex((step) => step.id === view);
  const progressLang: Lang = String(t.record.title) === String(prototypeCopy.ar.record.title) ? 'ar' : 'en';
  return <div className="mb-7">
    <div className="flex items-center gap-2 overflow-x-auto pb-1">{steps.map((step, index) => <div key={step.id} className="flex min-w-max items-center gap-2"><span className={`grid size-7 place-items-center rounded-full text-[11px] font-extrabold ${index <= current ? 'bg-[hsl(var(--primary))] text-white shadow-[0_4px_12px_hsl(var(--primary)/.2)]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}`}>{index < current ? <Check size={14} /> : index + 1}</span><span className={`text-xs font-bold ${index <= current ? '' : 'text-[hsl(var(--muted-foreground))]'}`}>{step.label}</span>{index < steps.length - 1 && <ChevronRight size={14} className="text-[hsl(var(--muted-foreground))] rtl:rotate-180" />}</div>)}</div>
    {view === 'record' && <div className="mt-5 overflow-hidden rounded-2xl border border-[hsl(var(--destructive)/.22)] bg-[hsl(var(--card))] shadow-[0_12px_34px_hsl(211_49%_18%/.055)]">
      <div className="flex flex-col justify-between gap-3 border-b border-[hsl(var(--destructive)/.14)] bg-[hsl(var(--destructive)/.055)] px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[hsl(var(--destructive)/.12)] text-[hsl(var(--destructive))]"><Siren size={19} /></span><div><div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[hsl(var(--destructive))]">{t.hospital.emergencyStatus}</div><div className="mt-0.5 text-base font-extrabold">{t.common.critical}</div></div></div>
        <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--muted-foreground))]"><ShieldCheck size={15} className="text-[hsl(var(--primary))]" />{t.common.verified}</div>
      </div>
      <div className="grid divide-y divide-[hsl(var(--border))] sm:grid-cols-4 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
        {[
          [t.record.allergies, localize(demoPatient.allergies, progressLang), 'critical'],
          [t.record.consciousness, localize(demoPatient.vitals.consciousness, progressLang), 'critical'],
          [t.record.bloodType, demoPatient.bloodType, 'normal'],
          [t.record.update, localize(demoPatient.lastUpdate, progressLang), 'normal'],
        ].map(([label, value, status]) => <div key={label} className="px-5 py-3.5"><div className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{label}</div><div className={`mt-1 text-sm font-extrabold ${status === 'critical' ? 'text-[hsl(var(--destructive))]' : ''}`}>{value}</div></div>)}
      </div>
    </div>}
  </div>;
}

function RoleSelection({ lang, setLang, t, choose }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; choose: (role: Role) => void }) {
  const roles = [
    { id: 'paramedic' as const, icon: Ambulance, title: t.app.paramedic, description: t.role.paramedicDescription, number: '01' },
    { id: 'hospital' as const, icon: Hospital, title: t.app.hospital, description: t.role.hospitalDescription, number: '02' },
  ];
  return <div className="min-h-[100dvh] bg-[hsl(var(--background))]">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10"><Logo /><LanguageSwitch lang={lang} setLang={setLang} t={t} /></header>
    <main className="mx-auto max-w-6xl px-6 pb-14 pt-5 md:px-10 md:pt-8">
      <section className="relative isolate overflow-hidden rounded-[28px] bg-[hsl(var(--sidebar))] px-6 py-9 text-[hsl(var(--sidebar-foreground))] shadow-[0_24px_60px_hsl(211_49%_18%/.14)] md:px-11 md:py-12">
        <div aria-hidden="true" className="absolute -end-16 -top-28 -z-10 size-80 rounded-full bg-[hsl(var(--primary)/.18)] blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 start-1/3 -z-10 size-72 rounded-full bg-[hsl(203_78%_45%/.12)] blur-3xl" />
        <Badge><ShieldCheck size={13} />{t.common.secure}</Badge>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-.045em] text-white md:text-6xl">{t.app.subtitle}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/.76)] md:text-base">{t.app.shortSubtitle}</p>
        <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-bold">
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.06] px-3 py-2"><Fingerprint size={14} className="text-[hsl(var(--primary))]" />{t.nav.identification}</span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.06] px-3 py-2"><HeartPulse size={14} className="text-[hsl(var(--primary))]" />{t.nav.record}</span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.06] px-3 py-2"><Radio size={14} className="text-[hsl(var(--primary))]" />{t.nav.incoming}</span>
        </div>
      </section>
      <section className="mt-10 md:mt-12">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[hsl(var(--primary))]">{t.common.secure}</div><h2 className="mt-2 text-2xl font-extrabold tracking-tight">{t.role.title}</h2></div><p className="text-sm text-[hsl(var(--muted-foreground))]">{t.role.subtitle}</p></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{roles.map(({ id, icon: Icon, title, description, number }) => <button type="button" key={id} data-testid={`button-role-${id}`} onClick={() => choose(id)} className="group min-h-[218px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-start shadow-[0_8px_28px_hsl(211_49%_18%/.035)] transition duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/.55)] hover:shadow-[0_18px_42px_hsl(var(--primary)/.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
          <div className="flex items-start justify-between"><div className="grid size-12 place-items-center rounded-xl bg-[hsl(var(--primary)/.1)] text-[hsl(var(--primary))] transition group-hover:bg-[hsl(var(--primary))] group-hover:text-white"><Icon size={22} /></div><span className="font-mono text-xs font-bold tracking-wider text-[hsl(var(--muted-foreground)/.65)]">{number}</span></div>
          <div className="mt-9 flex items-center justify-between gap-3"><div className="text-xl font-extrabold">{title}</div><ArrowRight size={18} className="text-[hsl(var(--muted-foreground))] transition group-hover:translate-x-1 group-hover:text-[hsl(var(--primary))] rtl:rotate-180 rtl:group-hover:-translate-x-1" /></div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{description}</p>
          <div className="mt-5 text-xs font-extrabold text-[hsl(var(--primary))]">{t.role.continue} <ChevronRight className="inline rtl:rotate-180" size={14} /></div>
        </button>)}</div>
      </section>
      <div className="mt-8 flex items-start gap-2 border-t border-[hsl(var(--border))] pt-5 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]"><Info size={15} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />{t.app.fictional}</div>
    </main>
  </div>;
}

function Identification({ lang, setLang, t, state, nationalId, setNationalId, onScan, onSearch, error, onHome, notifications, notificationOpen, onNotifications }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; state: ScanState; nationalId: string; setNationalId: (value: string) => void; onScan: () => void; onSearch: () => void; error: boolean; onHome: () => void; notifications: NotificationKey[]; notificationOpen: boolean; onNotifications: () => void }) {
  const message = state === 'scanning' ? t.identify.scanning : state === 'verifying' ? t.identify.verifying : state === 'verified' ? t.identify.verified : t.identify.waiting;
  return <Shell role="paramedic" lang={lang} setLang={setLang} t={t} notifications={notifications} notificationOpen={notificationOpen} onNotifications={onNotifications} onHome={onHome}><main className="mx-auto max-w-6xl px-5 py-8 md:px-9 md:py-10"><Progress view="identify" t={t} /><div className="mb-8"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[hsl(var(--primary))]">{t.identify.step}</div><h1 className="mt-2 text-3xl font-extrabold">{t.identify.title}</h1><p className="mt-3 max-w-2xl text-sm text-[hsl(var(--muted-foreground))]">{t.identify.subtitle}</p></div><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><Card className="flex min-h-[430px] flex-col items-center justify-center p-7 text-center"><div className={`relative grid size-44 place-items-center rounded-[2.5rem] border-2 ${state === 'verified' ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.1)]' : 'border-[hsl(var(--primary)/.25)] bg-[hsl(var(--primary)/.05)]'}`}><div className={`absolute inset-4 rounded-[2rem] border border-dashed border-[hsl(var(--primary)/.4)] ${state === 'scanning' || state === 'verifying' ? 'animate-pulse' : ''}`} /><Fingerprint size={78} strokeWidth={1.2} className={state === 'verified' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'} />{state === 'verified' && <div className="absolute -bottom-3 -end-3 grid size-10 place-items-center rounded-full bg-[hsl(var(--primary))] text-white"><Check size={21} /></div>}</div><div className="mt-7 text-xl font-extrabold">{message}</div>{state === 'verified' ? <div className="mt-3 flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]"><CheckCircle2 size={17} />{t.identify.verifiedArabic}</div> : <div className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">{t.identify.placeFinger}</div>}<button type="button" data-testid="button-scan-fingerprint" disabled={state === 'scanning' || state === 'verifying'} onClick={onScan} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50"><Fingerprint size={17} />{state === 'verified' ? t.identify.scanAgain : t.identify.scan}</button><div className="mt-4 text-[11px] text-[hsl(var(--muted-foreground))]">{t.identify.simulated}</div></Card><Card className="h-fit p-6"><div className="flex items-center gap-2 text-sm font-extrabold"><Search size={17} className="text-[hsl(var(--primary))]" />{t.identify.alternative}</div><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t.identify.nationalId}</p><input value={nationalId} onChange={(event) => setNationalId(event.target.value)} placeholder={t.identify.nationalIdPlaceholder} aria-label={t.identify.nationalId} className="mt-5 h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--card))] px-3 text-sm font-mono outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />{error && <p className="mt-2 text-xs font-bold text-[hsl(var(--destructive))]">{t.identify.idRequired}</p>}<button type="button" data-testid="button-search-patient" onClick={onSearch} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[hsl(var(--primary)/.35)] bg-[hsl(var(--primary)/.07)] py-3 text-sm font-extrabold text-[hsl(var(--primary))]"><Search size={16} />{t.identify.search}</button><div className="mt-6 flex items-start gap-2 rounded-xl bg-[hsl(var(--muted)/.7)] p-3 text-xs text-[hsl(var(--muted-foreground))]"><LockKeyhole size={15} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />{t.common.secure}</div></Card></div></main></Shell>;
}

function PatientRecord({ lang, setLang, t, onSend, onHome, notifications, notificationOpen, onNotifications }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; onSend: () => void; onHome: () => void; notifications: NotificationKey[]; notificationOpen: boolean; onNotifications: () => void }) {
  const p = demoPatient;
  return <Shell role="paramedic" lang={lang} setLang={setLang} t={t} notifications={notifications} notificationOpen={notificationOpen} onNotifications={onNotifications} onHome={onHome}>
    <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-5 md:px-9 md:py-10">
      <Progress view="record" t={t} />
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[hsl(var(--primary))]">{t.nav.record}</div><h1 className="mt-2 text-3xl font-extrabold">{t.record.title}</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t.record.subtitle}</p></div>
        <Badge><ShieldCheck size={13} />{t.common.verified}</Badge>
      </div>
      <div className="space-y-5">
        <Card>
          <SectionTitle icon={UserRound} title={t.record.patientProfile} action={<Badge><CheckCircle2 size={13} />{t.record.verification}</Badge>} />
          <div className="p-5">
            <div className="mb-5 flex items-center gap-4"><div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[hsl(var(--secondary))] text-xl font-extrabold text-[hsl(var(--primary))]">AS</div><div className="min-w-0"><h2 className="text-2xl font-extrabold">{localize(p.name, lang)}</h2><div className="mt-1 font-mono text-xs">{p.patientId}</div></div></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[t.record.patientName, localize(p.name, lang)], [t.record.patientId, p.patientId], [t.record.age, `${p.age} ${t.record.years}`], [t.record.bloodType, p.bloodType]].map(([label, value]) => <div key={label} className="rounded-xl bg-[hsl(var(--muted)/.7)] p-3"><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{label}</div><div className="mt-1 text-sm font-extrabold">{value}</div></div>)}</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">{[[t.record.nationalId, p.nationalId], [t.record.gender, localize(p.gender, lang)], [t.record.emergencyContact, localize(p.emergencyContact, lang)]].map(([label, value]) => <div key={label} className="rounded-xl border border-[hsl(var(--border))] p-3"><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{label}</div><div className="mt-1 break-words text-sm font-bold">{value}</div></div>)}</div>
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-[hsl(var(--primary)/.08)] p-3 text-xs text-[hsl(var(--primary))]"><Clock3 size={14} className="shrink-0" />{t.record.update}: {localize(p.lastUpdate, lang)}</div>
          </div>
        </Card>
        <Card><SectionTitle icon={ClipboardCheck} title={t.record.medicalInformation} /><div className="grid gap-3 p-5 sm:grid-cols-2">{medicalCards(lang, t).map(({ title, icon: Icon, tone, children }) => <div key={title} className={`rounded-2xl border p-4 ${tone}`}><div className="flex items-center gap-2 text-xs font-extrabold uppercase"><Icon size={16} />{title}</div><div className="mt-4 text-sm">{children}</div></div>)}</div></Card>
      </div>
      <Card className="mt-5 overflow-hidden border-[hsl(var(--primary)/.24)]">
        <SectionTitle icon={HeartPulse} title={t.record.vitals} action={<span className="text-[11px] font-bold text-[hsl(var(--muted-foreground))]">{t.record.captured}</span>} />
        <div className="p-4 sm:p-5"><VitalSigns lang={lang} t={t} /></div>
      </Card>
      <div className="mt-5"><AISupport t={t} /></div>
      <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-[hsl(var(--primary)/.25)] bg-[hsl(var(--primary)/.07)] p-5 sm:flex-row sm:items-center"><div className="flex items-start gap-3"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" /><div><div className="text-sm font-extrabold">{t.common.secure}</div><div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{t.record.recordDisclaimer}</div></div></div><button type="button" data-testid="button-send-case" onClick={onSend} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-extrabold text-white">{t.record.sendCase}<ArrowRight size={16} className="rtl:rotate-180" /></button></div>
    </main>
  </Shell>;
}

function medicalCards(lang: Lang, t: Copy) {
  const p = demoPatient;
  return [{ title: t.record.allergies, icon: AlertTriangle, tone: 'border-[hsl(var(--destructive)/.25)] bg-[hsl(var(--destructive)/.07)] text-[hsl(var(--destructive))]', children: <><div className="font-extrabold">{localize(p.allergies, lang)}</div><div className="mt-1 text-xs">{localize(p.allergyDetail, lang)}</div></> }, { title: t.record.chronic, icon: HeartPulse, tone: 'border-[hsl(var(--accent)/.35)] bg-[hsl(var(--accent)/.13)] text-[hsl(33_70%_31%)]', children: p.chronic.map((item) => <div key={item.en}>• {localize(item, lang)}</div>) }, { title: t.record.medications, icon: Pill, tone: 'border-[hsl(203_78%_45%/.2)] bg-[hsl(203_78%_45%/.07)] text-[hsl(203_78%_38%)]', children: p.medications.map((item) => <div key={item.en}>• {localize(item, lang)}</div>) }, { title: t.record.previous, icon: FileText, tone: 'border-[hsl(var(--border))] bg-[hsl(var(--muted)/.55)]', children: p.previous.map((item) => <div key={item.en}>• {localize(item, lang)}</div>) }] as const;
}

function AISupport({ t }: { t: Copy }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [consultationSent, setConsultationSent] = useState(false);
  const runAnalysis = () => {
    setAnalyzing(true);
    window.setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 850);
  };
  const items = [
    { title: t.ai.critical, text: t.ai.criticalCopy, icon: AlertTriangle, tone: 'border-[hsl(var(--destructive)/.25)] bg-[hsl(var(--destructive)/.07)] text-[hsl(var(--destructive))]' },
    { title: t.ai.warning, text: t.ai.warningCopy, icon: Pill, tone: 'border-[hsl(var(--primary)/.25)] bg-[hsl(var(--primary)/.07)] text-[hsl(var(--primary))]' },
    { title: t.ai.recommendation, text: t.ai.recommendationCopy, icon: BrainCircuit, tone: 'border-[hsl(203_78%_45%/.2)] bg-[hsl(203_78%_45%/.07)] text-[hsl(203_78%_38%)]' },
  ];
  return <Card><div className="flex flex-col justify-between gap-4 bg-[hsl(var(--sidebar))] p-5 text-[hsl(var(--sidebar-foreground))] sm:flex-row sm:items-center"><div><div className="flex items-center gap-2 text-sm font-extrabold"><BrainCircuit size={18} className="text-[hsl(var(--primary))]" />{t.ai.title}</div><p className="mt-2 max-w-xl text-xs text-[hsl(var(--sidebar-foreground)/.65)]">{t.ai.subtitle}</p><div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary)/.14)] px-2.5 py-1 text-[10px] font-bold text-[hsl(var(--primary))]"><CheckCircle2 size={13} />{analyzing ? t.ai.analyzing : analysisComplete ? t.ai.analysisStatus : t.ai.analysisPending}</div></div><div className="flex flex-wrap gap-2"><button type="button" onClick={runAnalysis} disabled={analyzing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-2.5 text-xs font-extrabold text-white disabled:opacity-60">{analyzing ? <Clock3 size={15} className="animate-pulse" /> : <Zap size={15} />}{analyzing ? t.ai.analyzing : t.ai.analyze}</button><button type="button" onClick={() => setConsultationSent(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[hsl(var(--primary)/.45)] bg-[hsl(var(--sidebar))] px-4 py-2.5 text-xs font-extrabold text-[hsl(var(--primary))]"><UserRound size={15} />{consultationSent ? t.consultation.sent : t.consultation.request}</button></div></div>{analysisComplete ? <div className="grid gap-3 p-5 md:grid-cols-3">{items.map(({ title, text, icon: Icon, tone }) => <div key={title} className={`rounded-xl border p-4 ${tone}`}><div className="flex items-center gap-2 text-xs font-extrabold"><Icon size={16} />{title}</div><p className="mt-3 text-xs leading-relaxed text-[hsl(var(--foreground))]">{text}</p></div>)}</div> : <div className="p-5"><div className="flex items-start gap-3 rounded-xl border border-dashed border-[hsl(var(--primary)/.28)] bg-[hsl(var(--primary)/.05)] p-4 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]"><BrainCircuit size={16} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />{t.ai.analysisPending}</div></div>}<div className="mx-5 mb-5 flex gap-2 rounded-xl bg-[hsl(var(--muted)/.6)] p-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]"><Info size={15} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />{t.ai.interactionNote}</div>{consultationSent && <div className="mx-5 mb-5 rounded-xl border border-[hsl(var(--primary)/.25)] bg-[hsl(var(--primary)/.07)] p-3 text-xs text-[hsl(var(--primary))]"><CheckCircle2 size={14} className="me-1 inline" />{t.consultation.received}</div>}</Card>;
}

function HospitalSelection({ lang, setLang, t, selected, setSelected, onContinue, onHome, notifications, notificationOpen, onNotifications }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; selected: string; setSelected: (value: string) => void; onContinue: () => void; onHome: () => void; notifications: NotificationKey[]; notificationOpen: boolean; onNotifications: () => void }) {
  return <Shell role="paramedic" lang={lang} setLang={setLang} t={t} notifications={notifications} notificationOpen={notificationOpen} onNotifications={onNotifications} onHome={onHome}><main className="mx-auto max-w-6xl px-5 py-8 md:px-9 md:py-10"><Progress view="hospitals" t={t} /><div className="mb-7"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[hsl(var(--primary))]">{t.hospitals.step}</div><h1 className="mt-2 text-3xl font-extrabold">{t.hospitals.title}</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t.hospitals.subtitle}</p></div><div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><Card className="min-h-[360px] overflow-hidden"><div className="relative flex min-h-[360px] items-center justify-center bg-[hsl(var(--sidebar))] p-8 text-center text-[hsl(var(--sidebar-foreground))]"><div><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[hsl(var(--primary)/.18)] text-[hsl(var(--primary))]"><MapPin size={30} /></div><div className="mt-5 text-lg font-extrabold">{t.hospitals.map}</div><div className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/.6)]">{t.hospitals.routeCopy}</div><div className="mx-auto mt-9 flex w-64 items-center gap-2"><div className="h-px flex-1 bg-[hsl(var(--primary)/.45)]" /><Ambulance size={17} className="text-[hsl(var(--primary))]" /><div className="h-px flex-1 bg-[hsl(var(--primary)/.45)]" /><Hospital size={17} className="text-[hsl(var(--primary))]" /></div></div></div></Card><Card><SectionTitle icon={Hospital} title={t.hospitals.title} action={<Badge><Radio size={12} />{t.common.secure}</Badge>} /><div className="divide-y divide-[hsl(var(--border))]">{demoHospitals.map((hospital) => { const isSelected = selected === hospital.id; const tone = hospital.status === 'available' ? 'teal' : hospital.status === 'limited' ? 'amber' : 'red'; return <button type="button" key={hospital.id} disabled={hospital.status === 'full'} onClick={() => setSelected(hospital.id)} className={`flex w-full items-start gap-4 p-5 text-start transition ${hospital.status === 'full' ? 'cursor-not-allowed opacity-55' : 'hover:bg-[hsl(var(--muted)/.5)]'} ${isSelected ? 'bg-[hsl(var(--primary)/.06)]' : ''}`}><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Hospital size={18} /></div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-extrabold">{localize(hospital.name, lang)}</span><Badge tone={tone}>{hospital.status === 'available' ? t.common.available : hospital.status === 'limited' ? t.common.limited : t.common.full}</Badge></div><div className="mt-2 grid grid-cols-3 gap-3 text-xs"><div><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{t.hospitals.distance}</div><div className="mt-1 font-bold">{hospital.distance}</div></div><div><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{t.hospitals.eta}</div><div className="mt-1 font-bold">{hospital.eta} {t.common.minutes}</div></div><div><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{t.hospitals.capacity}</div><div className="mt-1 font-bold">{hospital.capacity}</div></div></div></div><div className={`grid size-7 place-items-center rounded-full border ${isSelected ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white' : 'border-[hsl(var(--border))]'}`}>{isSelected && <Check size={15} />}</div></button>; })}</div><div className="flex items-center justify-between gap-3 border-t border-[hsl(var(--border))] p-5"><span className="text-xs font-bold text-[hsl(var(--primary))]"><CheckCircle2 size={14} className="me-1 inline" />{t.hospitals.selected}</span><button type="button" data-testid="button-send-patient-information" onClick={onContinue} className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-xs font-extrabold text-white">{t.hospitals.send}<ArrowRight size={15} className="rtl:rotate-180" /></button></div></Card></div></main></Shell>;
}

function ShareReview({ lang, setLang, t, selected, onSend, onHome, notifications, notificationOpen, onNotifications }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; selected: string; onSend: () => void; onHome: () => void; notifications: NotificationKey[]; notificationOpen: boolean; onNotifications: () => void }) {
  const hospital = demoHospitals.find((item) => item.id === selected) ?? demoHospitals[0];
  const rows = [{ icon: UserRound, title: t.share.identity, value: `${localize(demoPatient.name, lang)} • ${demoPatient.age} ${t.record.years} • ${demoPatient.bloodType}` }, { icon: ClipboardCheck, title: t.share.clinical, value: `${localize(demoPatient.allergies, lang)} • ${localize(demoPatient.chronic[0], lang)} • ${localize(demoPatient.medications[0], lang)}` }, { icon: HeartPulse, title: t.share.vitals, value: `${demoPatient.vitals.heartRate} bpm • ${demoPatient.vitals.bloodPressure} • SpO₂ ${demoPatient.vitals.oxygen}%` }, { icon: BrainCircuit, title: t.share.aiAlerts, value: t.ai.criticalCopy }, { icon: Clock3, title: t.share.arrival, value: `${hospital.eta} ${t.common.minutes}` }, { icon: Ambulance, title: t.share.ambulance, value: 'AMB-204 • 18 km/h' }];
  return <Shell role="paramedic" lang={lang} setLang={setLang} t={t} notifications={notifications} notificationOpen={notificationOpen} onNotifications={onNotifications} onHome={onHome}><main className="mx-auto max-w-5xl px-5 py-8 md:px-9 md:py-10"><Progress view="share" t={t} /><div className="mb-7"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[hsl(var(--primary))]">{t.share.step}</div><h1 className="mt-2 text-3xl font-extrabold">{t.share.title}</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t.share.subtitle}</p></div><Card><SectionTitle icon={LockKeyhole} title={t.share.summary} action={<Badge><ShieldCheck size={13} />{t.common.secure}</Badge>} /><div className="divide-y divide-[hsl(var(--border))]">{rows.map(({ icon: Icon, title, value }) => <div key={title} className="flex gap-4 p-5"><div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Icon size={17} /></div><div><div className="text-xs font-bold text-[hsl(var(--muted-foreground))]">{title}</div><div className="mt-1 text-sm font-extrabold">{value}</div></div></div>)}<div className="flex gap-4 p-5"><div className="grid size-9 place-items-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Hospital size={17} /></div><div><div className="text-xs font-bold text-[hsl(var(--muted-foreground))]">{t.share.selected}</div><div className="mt-1 text-sm font-extrabold">{localize(hospital.name, lang)}</div></div></div></div><div className="flex items-center justify-between gap-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/.5)] p-5"><span className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><LockKeyhole size={14} className="text-[hsl(var(--primary))]" />{t.common.secure}</span><button type="button" data-testid="button-send-securely" onClick={onSend} className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-extrabold text-white">{t.share.send}<Send size={16} /></button></div></Card></main></Shell>;
}

function Sent({ lang, setLang, t, openHospital, reset, notifications, onHome }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; openHospital: () => void; reset: () => void; notifications: NotificationKey[]; onHome: () => void }) {
  return <Shell role="paramedic" lang={lang} setLang={setLang} t={t} notifications={notifications} notificationOpen={false} onNotifications={() => undefined} onHome={onHome}><main className="mx-auto flex min-h-[calc(100dvh-82px)] max-w-3xl items-center justify-center px-5 py-12"><Card className="w-full p-8 text-center md:p-12"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))]"><CheckCircle2 size={42} /></div><h1 className="mt-7 text-3xl font-extrabold">{t.share.sentTitle}</h1><p dir="rtl" className="mt-3 text-base text-[hsl(var(--muted-foreground))]">{t.share.sentArabic}</p><p className="mx-auto mt-4 max-w-lg text-sm text-[hsl(var(--muted-foreground))]">{t.share.sentCopy}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={openHospital} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-extrabold text-white">{t.share.viewHospital}<ArrowRight size={16} className="rtl:rotate-180" /></button><button type="button" onClick={reset} className="rounded-xl border border-[hsl(var(--border))] px-5 py-3 text-sm font-extrabold">{t.share.sendAnother}</button></div></Card></main></Shell>;
}

function HospitalDashboard({ lang, setLang, t, checklist, toggleChecklist, notifications, notificationOpen, onNotifications, onHome }: { lang: Lang; setLang: (value: Lang) => void; t: Copy; checklist: boolean[]; toggleChecklist: (index: number) => void; notifications: NotificationKey[]; notificationOpen: boolean; onNotifications: () => void; onHome: () => void }) {
  const completed = checklist.filter(Boolean).length;
  const readiness = Math.round((completed / checklist.length) * 100);
  return <Shell role="hospital" lang={lang} setLang={setLang} t={t} notifications={notifications} notificationOpen={notificationOpen} onNotifications={onNotifications} onHome={onHome}>
    <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-5 md:px-9 md:py-10">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[hsl(var(--primary))]">{t.nav.incoming}</div><h1 className="mt-2 text-3xl font-extrabold">{t.hospital.title}</h1><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{t.hospital.subtitle}</p></div><Badge tone="amber"><RadioIcon />{t.common.enRoute}</Badge></div>
      <Card className="overflow-hidden border-[hsl(var(--destructive)/.22)]">
        <div className="flex flex-col justify-between gap-4 bg-[hsl(var(--destructive)/.06)] p-5 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--destructive)/.12)] text-[hsl(var(--destructive))]"><Ambulance size={21} /></div><div><div className="text-base font-extrabold">{t.hospital.incoming}</div><div dir="rtl" className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{t.hospital.incomingArabic}</div></div></div><Badge tone="red"><AlertTriangle size={12} />{t.common.critical}</Badge></div>
        <div className="grid grid-cols-2 gap-5 border-t border-[hsl(var(--destructive)/.15)] p-5 md:grid-cols-4">{[[t.hospital.patient, localize(demoPatient.name, lang)], [t.record.age, `${demoPatient.age} ${t.record.years}`], [t.record.bloodType, demoPatient.bloodType], [t.hospital.ambulanceId, 'AMB-204']].map(([label, value]) => <div key={label}><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{label}</div><div className="mt-1 text-sm font-extrabold">{value}</div></div>)}</div>
      </Card>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-5">
          <Card><SectionTitle icon={UserRound} title={t.hospital.profile} action={<Badge><CheckCircle2 size={13} />{t.common.verified}</Badge>} /><div className="grid gap-3 p-5 sm:grid-cols-2">{[[t.record.patientName, localize(demoPatient.name, lang)], [t.record.patientId, demoPatient.patientId], [t.record.emergencyContact, localize(demoPatient.emergencyContact, lang)], [t.hospital.route, 'King Fahd Road']].map(([label, value]) => <div key={label} className="rounded-xl bg-[hsl(var(--muted)/.7)] p-3"><div className="text-[10px] text-[hsl(var(--muted-foreground))]">{label}</div><div className="mt-1 break-words text-sm font-extrabold">{value}</div></div>)}</div></Card>
          <Card><SectionTitle icon={ClipboardCheck} title={t.hospital.medical} /><div className="p-5"><div className="mb-4 flex items-start gap-3 rounded-xl border border-[hsl(var(--destructive)/.25)] bg-[hsl(var(--destructive)/.07)] p-4 text-[hsl(var(--destructive))]"><AlertTriangle size={19} className="shrink-0" /><div><div className="font-extrabold">{t.hospital.allergy}</div><div className="mt-1 text-xs">{localize(demoPatient.allergyDetail, lang)}</div></div></div><div className="grid gap-3 md:grid-cols-2">{medicalCards(lang, t).slice(1).map(({ title, icon: Icon, tone, children }) => <div key={title} className={`rounded-2xl border p-4 ${tone}`}><div className="flex items-center gap-2 text-xs font-extrabold uppercase"><Icon size={16} />{title}</div><div className="mt-4 text-sm">{children}</div></div>)}</div></div></Card>
          <Card className="overflow-hidden border-[hsl(var(--primary)/.24)]"><SectionTitle icon={HeartPulse} title={t.hospital.vitals} action={<span className="text-[11px] font-bold text-[hsl(var(--muted-foreground))]">{t.record.captured}</span>} /><div className="p-4 sm:p-5"><VitalSigns lang={lang} t={t} /></div></Card>
        </div>
        <div className="space-y-5">
          <Card><SectionTitle icon={Clock3} title={t.hospital.etaTitle} action={<Badge tone="amber">{t.common.enRoute}</Badge>} /><div className="p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><div className="text-3xl font-extrabold sm:text-4xl">{t.hospital.arrivalTime}</div><div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{t.hospital.eta} • 7 {t.common.minutes}</div></div><div className="font-mono text-sm font-bold">AMB-204</div></div><div className="mt-8 h-2 rounded-full bg-[hsl(var(--muted))]"><div className="h-full w-[64%] rounded-full bg-[hsl(var(--primary))]" /></div><div className="mt-2 flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]"><span>{t.hospital.routeStart}</span><span>{t.hospital.routeEnd}</span></div></div></Card>
          <Card><SectionTitle icon={ClipboardCheck} title={t.hospital.readiness} action={<Badge tone={readiness >= 85 ? 'teal' : 'amber'}>{readiness}%</Badge>} /><div className="p-5"><p className="text-sm text-[hsl(var(--muted-foreground))]">{t.hospital.readinessCopy}</p><div className="mt-4 h-2 rounded-full bg-[hsl(var(--muted))]"><div className="h-full rounded-full bg-[hsl(var(--primary))] transition-all" style={{ width: `${readiness}%` }} /></div><div className="mt-5 space-y-2">{t.hospital.checklist.map((item, index) => <button type="button" key={item} onClick={() => toggleChecklist(index)} className="flex w-full items-center gap-3 rounded-xl p-2 text-start hover:bg-[hsl(var(--muted)/.6)]"><span className={`grid size-6 shrink-0 place-items-center rounded-full ${checklist[index] ? 'bg-[hsl(var(--primary))] text-white' : 'border border-[hsl(var(--border))] text-transparent'}`}><Check size={14} /></span><span className={`text-xs ${checklist[index] ? 'font-bold' : 'text-[hsl(var(--muted-foreground))]'}`}>{item}</span></button>)}</div><div className="mt-5 flex items-center gap-2 rounded-xl bg-[hsl(var(--primary)/.1)] p-3 text-xs font-extrabold text-[hsl(var(--primary))]"><ShieldCheck size={15} />{readiness >= 85 ? t.hospital.ready : t.hospital.progress}</div></div></Card>
          <Card><SectionTitle icon={Bell} title={t.notifications.title} /><div className="space-y-3 p-5">{[t.notifications.received, t.notifications.record, t.notifications.eta, t.notifications.team].map((item) => <div key={item} className="flex items-start gap-2 text-xs"><span className="mt-1 size-2 shrink-0 rounded-full bg-[hsl(var(--primary))]" />{item}</div>)}</div></Card>
        </div>
      </div>
    </main>
  </Shell>;
}

function RadioIcon() { return <Radio size={12} />; }

export function PraxFlow() {
  const { lang, setLang, t } = useFlowLanguage();
  const [view, setView] = useState<View>('role');
  const [role, setRole] = useState<Role | null>(null);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [nationalId, setNationalId] = useState('');
  const [idError, setIdError] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<string>(demoHospitals[0].id);
  const [notifications, setNotifications] = useState<NotificationKey[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [checklist, setChecklist] = useState([true, true, true, true, true, false]);

  const addNotification = (key: NotificationKey) => setNotifications((current) => current.includes(key) ? current : [key, ...current]);
  const reset = () => { setView('role'); setRole(null); setScanState('idle'); setNationalId(''); setIdError(false); setNotifications([]); setChecklist([true, true, true, true, true, false]); setNotificationOpen(false); };
  const choose = (nextRole: Role) => { setRole(nextRole); setView('login'); };
  const enterDemo = () => {
    if (role === 'hospital') {
      setNotifications(['received', 'record', 'eta', 'team']);
      setView('hospital');
    } else {
      setView('identify');
    }
  };
  const scan = () => { setScanState('scanning'); window.setTimeout(() => setScanState('verifying'), 700); window.setTimeout(() => { setScanState('verified'); addNotification('identity'); addNotification('allergy'); window.setTimeout(() => setView('record'), 900); }, 1500); };
  const searchPatient = () => { if (nationalId.trim().length < 4) { setIdError(true); return; } setIdError(false); setScanState('verified'); addNotification('identity'); window.setTimeout(() => setView('record'), 500); };
  const shared = { lang, setLang, t, notifications, notificationOpen, onNotifications: () => setNotificationOpen((value) => !value), onHome: reset };
  if (view === 'role' || !role) return <RoleSelection lang={lang} setLang={setLang} t={t} choose={choose} />;
  if (view === 'login') return <div className="min-h-[100dvh] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 md:px-10">
      <button type="button" onClick={reset} aria-label={t.app.backHome}><Logo /></button>
      <LanguageSwitch lang={lang} setLang={setLang} t={t} />
    </header>
    <DemoLogin key={role} role={role} t={t} onEnter={enterDemo} onBack={reset} />
  </div>;
  if (view === 'identify') return <Identification {...shared} state={scanState} nationalId={nationalId} setNationalId={setNationalId} onScan={scan} onSearch={searchPatient} error={idError} />;
  if (view === 'record') return <PatientRecord {...shared} onSend={() => setView('hospitals')} />;
  if (view === 'hospitals') return <HospitalSelection {...shared} selected={selectedHospital} setSelected={setSelectedHospital} onContinue={() => setView('share')} />;
  if (view === 'share') return <ShareReview {...shared} selected={selectedHospital} onSend={() => { addNotification('ai'); addNotification('sent'); setView('sent'); }} />;
  if (view === 'sent') return <Sent {...shared} reset={reset} openHospital={() => choose('hospital')} />;
  return <HospitalDashboard {...shared} checklist={checklist} toggleChecklist={(index) => setChecklist((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} />;
}