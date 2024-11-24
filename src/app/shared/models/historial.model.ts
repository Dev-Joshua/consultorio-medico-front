export interface HistorialMedico {
  id_historial?: number;
  id_paciente: number;
  id_consulta: number;
  fecha_consulta: string;
  tratamiento: string;
}
