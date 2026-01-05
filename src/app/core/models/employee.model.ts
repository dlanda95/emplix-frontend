// 1. Interfaces auxiliares (Existentes)
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
  role: string;
  isActive: boolean;
}

// 👇 2. NUEVAS INTERFACES (Para mapear lo que manda el Backend)
export interface ContractType {
  id: string;
  name: string;
}

export interface WorkShift {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
}

// Esta es la "Ficha Técnica" que agregamos
export interface EmployeeLaborData {
  id: string;
  salary: number;
  startDate: string | Date;
  // Como en el backend usamos include: { contractType: true, workShift: true }
  // Aquí recibiremos los objetos completos, no solo los IDs.
  contractType?: ContractType; 
  workShift?: WorkShift;
}

// 👑 3. ENTIDAD PRINCIPAL ACTUALIZADA
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
  emergencyPhone?: string;
  emergencyName?: string
  
  // Datos corporativos
  documentId?: string;
  hireDate?: string | Date;
  status?: 'ACTIVE' | 'INACTIVE'; 
  
  // Relaciones
  department?: Department;
  position?: Position;
  supervisor?: Supervisor;
  user?: UserContext;

  // 👇 AGREGAMOS ESTO: El conector con la nómina
  laborData?: EmployeeLaborData;

  // 📸 Foto
  photoUrl: string | null; 
}

// Contexto de equipo
export interface TeamContext {
  me: Employee;
  supervisor?: Employee;
  peers: Employee[];
  subordinates: Employee[];
}