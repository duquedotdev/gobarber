import { isEqual } from 'date-fns';
import Appointments from '../model/Appointment';

interface ICreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  public appointments: Appointments[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointments[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointments | null {
    const findAppointments = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointments || null;
  }

  public create({ provider, date }: ICreateAppointmentDTO): Appointments {
    const appointment = new Appointments({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
