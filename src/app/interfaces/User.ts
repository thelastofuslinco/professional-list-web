export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  password: string;
  authenticated: boolean;
  skills: string[];
  created_at: Date;
  authenticated_at?: Date;
}
