export interface ApplauseCategory {
  code: string;
  label: string;
  score: number;
  icon: string;
  colorClass: string; // 'blue', 'green', 'orange', 'purple', 'gold'
  description: string;
}

export const APPLAUSE_CONFIG: ApplauseCategory[] = [
  { code: 'TEAMWORK', label: 'Trabajo en Equipo', score: 2.0, icon: 'groups', colorClass: 'blue', description: 'Fomenta la unión y ayuda a sus compañeros.' },
  { code: 'CLIENT_FOCUS', label: 'Compromiso Cliente', score: 2.5, icon: 'support_agent', colorClass: 'green', description: 'Excede expectativas y genera confianza.' },
  { code: 'RESULTS', label: 'Resultados', score: 3.0, icon: 'trending_up', colorClass: 'orange', description: 'Cumple objetivos con excelencia.' },
  { code: 'INNOVATION', label: 'Innovación', score: 3.5, icon: 'lightbulb', colorClass: 'purple', description: 'Propone mejoras y se adapta.' },
  { code: 'LEADERSHIP', label: 'Liderazgo', score: 4.0, icon: 'military_tech', colorClass: 'gold', description: 'Motiva a otros e inspira.' }
];