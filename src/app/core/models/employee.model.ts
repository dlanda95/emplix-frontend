// Define tipos auxiliares para no repetir código
export interface Department {
  id?: string;
  name: string;
  code?: string;
}

export interface Position {
  id?: string;
  name: string;
}

export interface Supervisor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserContext {
  email: string;
  role: string; // O puedes usar un Enum si lo tienes en el front
  isActive: boolean;
}

// 👑 LA ENTIDAD PRINCIPAL
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  secondLastName?: string;
  
  // Datos personales
  personalEmail?: string;
  phone?: string;
  address?: string;
  birthDate?: string | Date;
  emergencyPhone?:string;
  emergencyName?: string
  
  // Datos corporativos
  documentId?: string;
  hireDate?: string | Date;
  status?: 'ACTIVE' | 'INACTIVE'; // Tipado estricto
  
  // Relaciones (Opcionales porque no siempre vienen)
  department?: Department;
  position?: Position;
  supervisor?: Supervisor;
  user?: UserContext;

  
  // 📸 La joya de la corona (generada por nuestro backend)
  photoUrl: string | null; 
}

// Contexto de equipo (para la vista "Mi Equipo")
export interface TeamContext {
  me: Employee;
  supervisor?: Employee;
  peers: Employee[];
  subordinates: Employee[];
}