import { Activity, AlertTriangle, Droplets, HeartPulse, Thermometer, Wind } from 'lucide-react';
import { demoPatient, localize, type Lang, type PrototypeCopy } from '@/lib/prototype-i18n';

/** Shared handoff readings. The consciousness finding alone carries the critical treatment. */
export function VitalSigns({ lang, t }: { lang: Lang; t: PrototypeCopy }) {
  const readings = [
    { id: 'heart-rate', label: t.record.heartRate, value: demoPatient.vitals.heartRate, unit: 'bpm', icon: HeartPulse },
    { id: 'blood-pressure', label: t.record.bloodPressure, value: demoPatient.vitals.bloodPressure, unit: 'mmHg', icon: Activity },
    { id: 'oxygen', label: t.record.oxygen, value: demoPatient.vitals.oxygen, unit: '%', icon: Droplets },
    { id: 'respiratory', label: t.record.respiratory, value: demoPatient.vitals.respiratory, unit: '/min', icon: Wind },
    { id: 'temperature', label: t.record.temperature, value: demoPatient.vitals.temperature, unit: '°C', icon: Thermometer },
  ];

  return <div className="vital-grid" aria-label={t.record.vitals}>
    <div className="vital-tile vital-tile--critical" data-testid="card-vital-consciousness">
      <span className="vital-tile__icon" aria-hidden="true"><AlertTriangle size={22} strokeWidth={2.2} /></span>
      <div className="min-w-0 flex-1">
        <span className="vital-tile__label">{t.record.consciousness}</span>
        <strong className="vital-tile__value" data-testid="text-vital-consciousness">{localize(demoPatient.vitals.consciousness, lang)}</strong>
      </div>
      <span className="vital-tile__flag">{t.common.critical}</span>
    </div>
    {readings.map(({ id, label, value, unit, icon: Icon }) =>
      <div key={id} className={`vital-tile vital-tile--reading vital-tile--${id}`} data-testid={`card-vital-${id}`}>
        <span className="vital-tile__icon" aria-hidden="true"><Icon size={17} strokeWidth={2} /></span>
        <div>
          <span className="vital-tile__label">{label}</span>
          <strong className="vital-tile__value" dir="ltr" data-testid={`text-vital-${id}`}>{value}<span className="vital-tile__unit">{unit}</span></strong>
        </div>
      </div>,
    )}
  </div>;
}