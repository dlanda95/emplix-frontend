// 1. Quién envía o recibe (Simplificado)
export interface KudoUser {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  position?: string;
}

// 2. La Categoría del Aplauso
export interface ApplauseCategory {
  code: string;
  label: string;
  score: number;
  icon: string;
  colorClass: string;
  description: string;
}

// 3. El Kudo en sí (Lo que viene del Backend)
export interface Kudo {
  id: string;
  message: string;
  categoryCode: string; // Ej: 'TEAMWORK'
  // 👇 NUEVO CAMPO
  type: 'SENT' | 'RECEIVED';
  createdAt: string | Date;
  sender: KudoUser;    // Ojo: Backend debe mandar 'sender' o 'from'
  receiver: KudoUser;  // Ojo: Backend debe mandar 'receiver' o 'to'
}

// 4. Estadísticas (Para Analytics)
export interface EmployeeKudoStats {
  employeeId: string;
  name: string;
  position: any;
  avatar?: string;
  totalKudos: number;
  totalScore: number;
  breakdown: { [key: string]: number };
}

// 5. Payload para crear
export interface CreateKudoDTO {
  receiverId: string;
  categoryCode: string;
  message: string;
}