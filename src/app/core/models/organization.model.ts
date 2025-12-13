export interface Position {
  id: string;
  name: string;
  description?: string;
  departmentId: string;
  _count?: {
    employees: number;
  };
}

export interface Department {
  id: string;
  name: string;
  code?: string;
  description?: string;
  positions?: Position[]; // El backend nos devuelve esto
  _count?: {
    employees: number;
    positions: number;
  };
}