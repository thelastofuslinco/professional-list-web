export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  password: string;
  authenticated?: Date;
  skills: string[];
  created_at: Date;
}
