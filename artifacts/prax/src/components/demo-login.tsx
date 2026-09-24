import { useState, type FormEvent } from 'react';
import { Ambulance, ArrowRight, Eye, EyeOff, Hospital, Info, LockKeyhole, UserRound } from 'lucide-react';
import type { PrototypeCopy } from '@/lib/prototype-i18n';

type DemoRole = 'paramedic' | 'hospital';
const DEMO_USERNAME = 'ABCD123';
const DEMO_PASSWORD = 'AA1122';

export function DemoLogin({ role, t, onEnter, onBack }: {
  role: DemoRole;
  t: PrototypeCopy;
  onEnter: () => void;
  onBack: () => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [error, setError] = useState<'required' | 'incorrect' | null>(null);
  const Icon = role === 'paramedic' ? Ambulance : Hospital;
  const title = role === 'paramedic' ? t.login.paramedicTitle : t.login.hospitalTitle;
  const description = role === 'paramedic' ? t.login.paramedicDescription : t.login.hospitalDescription;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('required');
      return;
    }
    if (username.trim() !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setError('incorrect');
      return;
    }
    setError(null);
    setPassword('');
    onEnter();
  }

  return <main className="mx-auto grid min-h-[calc(100dvh-110px)] max-w-6xl items-center gap-4 px-5 pb-14 pt-3 md:grid-cols-[.95fr_1.05fr] md:gap-8 md:px-10 md:pt-6">
    <section className="rounded-[28px] bg-[hsl(var(--sidebar))] p-5 text-[hsl(var(--sidebar-foreground))] md:p-10">
      <div className="grid size-10 place-items-center rounded-xl bg-[hsl(var(--primary)/.2)] text-[hsl(var(--primary))] md:size-14 md:rounded-2xl"><Icon size={24} /></div>
      <div className="mt-3 text-xs font-extrabold uppercase tracking-[.14em] text-[hsl(var(--primary))] md:mt-8">{t.login.eyebrow}</div>
      <h1 className="mt-2 text-2xl font-extrabold leading-tight text-white md:mt-3 md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[hsl(var(--sidebar-foreground)/.78)] md:mt-4 md:leading-7">{description}</p>
      <div className="mt-4 flex gap-3 rounded-xl border border-white/10 bg-white/[.06] p-3 text-xs leading-6 md:mt-9 md:p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />
        <span>{t.login.notice}</span>
      </div>
    </section>
    <section className="rounded-[28px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_18px_50px_hsl(211_49%_18%/.08)] sm:p-9">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-[hsl(var(--primary)/.1)] text-[hsl(var(--primary))]"><LockKeyhole size={20} /></div>
        <h2 className="text-xl font-extrabold">{forgotOpen ? t.login.recoveryTitle : title}</h2>
      </div>
      {forgotOpen ? <>
        <div role="status" className="mt-7 rounded-xl border border-[hsl(var(--primary)/.2)] bg-[hsl(var(--primary)/.06)] p-5 text-sm leading-7">{t.login.recovery}</div>
        <button type="button" onClick={() => setForgotOpen(false)} className="mt-6 w-full rounded-xl bg-[hsl(var(--primary))] px-5 py-3.5 text-sm font-extrabold text-white">{t.login.returnToLogin}</button>
      </> : <>
        <form className="mt-7 space-y-5" autoComplete="off" onSubmit={submit}>
          <div>
            <label htmlFor="demo-username" className="mb-2 block text-sm font-bold">{t.login.username}</label>
            <div className="relative">
              <UserRound size={18} className="pointer-events-none absolute start-4 top-3.5 text-[hsl(var(--muted-foreground))]" />
              <input id="demo-username" data-testid="input-demo-username" type="text" name="demo-username" value={username} onChange={(event) => { setUsername(event.target.value); setError(null); }} required autoComplete="off" placeholder={t.login.usernamePlaceholder} className="h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] ps-11 pe-4 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />
            </div>
          </div>
          <div>
            <label htmlFor="demo-password" className="mb-2 block text-sm font-bold">{t.login.password}</label>
            <div className="relative">
              <LockKeyhole size={18} className="pointer-events-none absolute start-4 top-3.5 text-[hsl(var(--muted-foreground))]" />
              <input id="demo-password" data-testid="input-demo-password" type={showPassword ? 'text' : 'password'} name="demo-password" value={password} onChange={(event) => { setPassword(event.target.value); setError(null); }} required autoComplete="off" placeholder={t.login.passwordPlaceholder} className="h-12 w-full rounded-xl border border-[hsl(var(--input))] bg-[hsl(var(--background))] ps-11 pe-12 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />
              <button type="button" aria-label={showPassword ? t.login.hidePassword : t.login.showPassword} aria-pressed={showPassword} onClick={() => setShowPassword((current) => !current)} className="absolute end-3 top-3 rounded-lg p-1 text-[hsl(var(--muted-foreground))]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>
          <div className="flex justify-end"><button type="button" data-testid="button-forgot-password" onClick={() => { setPassword(''); setForgotOpen(true); }} className="text-sm font-bold text-[hsl(var(--primary))] hover:underline">{t.login.forgot}</button></div>
          {error && <p role="alert" className="text-xs font-bold text-[hsl(var(--destructive))]">{error === 'required' ? t.login.required : t.login.incorrect}</p>}
          <button type="submit" data-testid="button-demo-sign-in" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3.5 text-sm font-extrabold text-white">{t.login.signIn}<ArrowRight size={17} className="rtl:rotate-180" /></button>
        </form>
      </>}
      <button type="button" onClick={onBack} className="mt-6 w-full text-center text-sm font-bold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]">{t.login.back}</button>
    </section>
  </main>;
}