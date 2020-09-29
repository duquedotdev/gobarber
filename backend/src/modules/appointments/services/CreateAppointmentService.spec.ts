import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new Appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '5e119bf1-6c8d-4de3-8081-29c133de7ca8',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('5e119bf1-6c8d-4de3-8081-29c133de7ca8');
  });

  it('should not be able to create two Appointment in the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 12, 25, 11);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '5e119bf1-6c8d-4de3-8081-29c133de7ca8',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '5e119bf1-6c8d-4de3-8081-29c133de7ca8',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
