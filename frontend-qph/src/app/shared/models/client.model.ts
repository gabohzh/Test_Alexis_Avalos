export interface Client {
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
  activo: boolean;
  fecharegistro: Date;
}