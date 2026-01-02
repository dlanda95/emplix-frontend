// Tipos de solicitud
export type RequestTypeID = 'VACATION' | 'PERMIT' | 'SICK_LEAVE' | 'HOME_OFFICE' | 'PROFILE_UPDATE';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// Payload para crear (lo que envías)
export interface RequestPayload {
  type: RequestTypeID;
  reason?: string;
  startDate?: string; // ISO String
  endDate?: string;   // ISO String
  data?: any;         // JSON para cambios de perfil
}

// Respuesta del Backend (lo que recibes)
export interface RequestResponse {
  id: string;
  type: RequestTypeID;
  status: RequestStatus;
  createdAt: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  data?: any;
}

// Saldo de Vacaciones
export interface VacationBalance {
  hireDate: string;
  monthsWorked: number;
  daysEarned: number;
  daysUsed: number;
  balance: number;
}