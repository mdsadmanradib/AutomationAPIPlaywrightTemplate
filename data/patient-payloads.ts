/**
 * This file stores reusable test data for the Denticon API.
 * * NOTE: You must update these values to match data in your test environment.
 */

export const PatientPayloads = {
  /**
   * A payload for a patient you know *exists* in your test database.
   */
  existingPatient: {
    officeId: 1, // Change to a valid officeId
    lastName: 'Patient-LastName', // Change to a real last name
    firstName: 'Patient-FirstName', // Change to a real first name
    birthDate: '1990-01-01', // Change to a real birth date
  },

  /**
   * A payload for a patient you know *does not* exist.
   */
  nonExistingPatient: {
    officeId: 1,
    lastName: 'NonExistent',
    firstName: 'User',
    birthDate: '2000-01-01',
  },

  /**
   * An invalid payload missing a required field (e.g., lastName).
   */
  invalidPatientPayload: {
    officeId: 1,
    firstName: 'Test',
    birthDate: '1995-05-05',
    // lastName is intentionally missing
  },
};