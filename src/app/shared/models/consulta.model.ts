export interface ConsultaMedica {
  id_consulta: number;
  id_paciente: number;
  id_medico: number;
  motivo_consulta: string;
  tratamiento: string;
  estado: Estado;
  fecha_cita: string;
  hora_cita: string;
}

export enum Estado {
  CONFIRMADA,
  CANCELADA,
  PENDIENTE,
}
