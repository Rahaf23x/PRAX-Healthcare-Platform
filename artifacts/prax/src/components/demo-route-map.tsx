import { Ambulance, Clock3, Hospital, MapPin } from 'lucide-react';
import { demoHospitals, localize, type Lang, type PrototypeCopy } from '@/lib/prototype-i18n';

const destinations: Record<string, { x: number; y: number }> = {
  'al-noor': { x: 475, y: 87 },
  kingdom: { x: 322, y: 68 },
  eastline: { x: 520, y: 195 },
};
const startingPoint = { x: 120, y: 237 };

export function DemoRouteMap({ lang, t, selectedHospital, arrived }: {
  lang: Lang;
  t: PrototypeCopy;
  selectedHospital: string;
  arrived: boolean;
}) {
  const destination = demoHospitals.find((hospital) => hospital.id === selectedHospital) ?? demoHospitals[0];
  const end = destinations[destination.id];
  const ambulance = arrived ? end : startingPoint;
  const route = `M ${startingPoint.x} ${startingPoint.y} C 185 237, 180 155, 285 158 S ${end.x - 95} ${end.y}, ${end.x} ${end.y}`;

  return <section className="min-w-0 overflow-hidden rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))]" aria-label={t.hospital.mapTitle} data-testid="section-demo-route-map">
    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[hsl(var(--border))] p-5">
      <div><h2 className="flex items-center gap-2 font-extrabold"><MapPin size={18} className="text-[hsl(var(--primary))]" />{t.hospital.mapTitle}</h2><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{t.hospital.mapCaption}</p></div>
      <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-xs font-bold text-[hsl(var(--muted-foreground))]">{t.ops.demo}</span>
    </div>
    <div className="relative aspect-[15/8] min-h-[205px] overflow-hidden bg-[#e6eff2] dark:bg-[#21384b]" role="img" aria-label={`${t.hospital.routeStart}: ${t.hospital.routeEnd} ${localize(destination.name, lang)}. ${t.hospital.eta}: ${arrived ? t.ops.arrived : `${destination.eta} ${t.common.minutes}`}. ${t.hospital.mapCaption}`}>
      <svg viewBox="0 0 600 320" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 size-full">
        <path d="M 0 20 L 165 0 L 195 98 L 50 138 Z M 350 0 L 600 0 L 600 77 L 477 113 Z M 0 284 L 115 248 L 240 320 L 0 320 Z M 362 237 L 530 185 L 600 285 L 600 320 L 375 320 Z" className="fill-[#cde5d7] dark:fill-[#2a504d]" />
        <g fill="none" className="stroke-[#c3d5db] dark:stroke-[#456275]" strokeWidth="25">
          <path d="M -25 85 L 625 160 M -20 205 L 620 265 M 75 -20 L 150 340 M 262 -20 L 308 340 M 500 -20 L 445 340" />
        </g>
        <g fill="none" className="stroke-white dark:stroke-[#314d60]" strokeWidth="17">
          <path d="M -25 85 L 625 160 M -20 205 L 620 265 M 75 -20 L 150 340 M 262 -20 L 308 340 M 500 -20 L 445 340" />
        </g>
        <g fill="none" className="stroke-white/75 dark:stroke-[#3c5869]" strokeWidth="8">
          <path d="M 8 35 L 560 305 M 360 0 L 46 320 M 590 24 L 148 320 M 0 160 L 510 0" />
        </g>
        <path d={route} fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" />
        <path d={route} fill="none" className="stroke-[#126b9a] dark:stroke-[#54b4e7]" strokeWidth="7" strokeLinecap="round" strokeDasharray={arrived ? undefined : '14 9'} />
        <circle cx={end.x} cy={end.y} r="24" className="fill-[#126b9a] dark:fill-[#54b4e7]" opacity=".18" />
        <circle cx={end.x} cy={end.y} r="10" className="fill-[#126b9a] dark:fill-[#54b4e7]" stroke="white" strokeWidth="4" />
        <circle cx={ambulance.x} cy={ambulance.y} r="23" className="fill-[#b84535]" opacity=".16" />
        <circle cx={ambulance.x} cy={ambulance.y} r="11" className="fill-[#b84535]" stroke="white" strokeWidth="4" />
      </svg>
      <span aria-hidden="true" className="absolute grid size-8 -translate-x-1/2 -translate-y-[160%] place-items-center rounded-full bg-white text-[#126b9a] shadow-md" style={{ left: `${end.x / 6}%`, top: `${end.y / 3.2}%` }}><Hospital size={17} /></span>
      <span aria-hidden="true" className="absolute grid size-8 -translate-x-1/2 translate-y-[35%] place-items-center rounded-full bg-white text-[#b84535] shadow-md" style={{ left: `${ambulance.x / 6}%`, top: `${ambulance.y / 3.2}%` }}><Ambulance size={17} /></span>
    </div>
    <div className="grid gap-3 p-4 text-xs sm:grid-cols-2">
      <div className="flex items-start gap-2"><Ambulance size={16} className="shrink-0 text-[hsl(var(--destructive))]" /><div><span className="text-[hsl(var(--muted-foreground))]">{t.hospital.routeStart}</span><strong className="block font-mono">AMB-204</strong></div></div>
      <div className="flex items-start gap-2"><Hospital size={16} className="shrink-0 text-[hsl(var(--primary))]" /><div><span className="text-[hsl(var(--muted-foreground))]">{t.hospital.routeEnd}</span><strong className="block">{localize(destination.name, lang)}</strong><span className="text-[hsl(var(--muted-foreground))]">{localize(destination.emergency, lang)} · {destination.distance}</span></div></div>
      <div className="flex items-center gap-2 border-t border-[hsl(var(--border))] pt-3 font-bold sm:col-span-2"><Clock3 size={16} className="text-[hsl(var(--primary))]" />{arrived ? t.ops.arrived : `${t.hospital.eta}: ${destination.eta} ${t.common.minutes}`}</div>
    </div>
  </section>;
}