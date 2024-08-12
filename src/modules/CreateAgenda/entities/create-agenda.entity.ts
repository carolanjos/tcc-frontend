// src/modules/CreateAgenda/entities/create-agenda.entity.ts

export default class Calendar {
  id: number | null = null;
  start_hour = '';  // Tipo string é inferido automaticamente
  end_hour = '';    // Tipo string é inferido automaticamente
  start_date = '';  // Tipo string é inferido automaticamente
  end_date = '';    // Tipo string é inferido automaticamente
  week_day: string[] = [];
  doctor: number | null = null;
}
