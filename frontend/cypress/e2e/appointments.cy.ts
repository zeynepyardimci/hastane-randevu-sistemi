describe('Appointment System', () => {
    it('should allow booking an appointment', () => {
        cy.visit('/');
        cy.contains('Hospital Appointment System');
        cy.get('a[href="/appointments"]').click();
        cy.get('select[name="doctor_id"]').select('Dr. Gregory House');
        cy.get('select[name="patient_id"]').select('John Doe');
        cy.get('input[name="appointment_date"]').type('2025-12-25T10:00');
        cy.get('button[type="submit"]').click();
        cy.contains('Appointment created successfully');
    });
});
