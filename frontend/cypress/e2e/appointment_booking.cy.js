describe('Randevu Alma İşlemi', () => {
    it('Başarıyla randevu oluşturur', () => {
        // Setup API intercepts
        cy.intercept('GET', '/api/v1/doctors').as('getDoctors');
        cy.intercept('GET', '/api/v1/patients').as('getPatients');
        cy.intercept('POST', '/api/v1/appointments').as('createAppointment');

        // Step 1: Randevu Sayfasına Git
        cy.visit('/appointments');
        cy.location('pathname', { timeout: 10000 }).should('eq', '/appointments');
        cy.contains('Book Appointment', { timeout: 10000 }).should('be.visible');

        // Narration: "Randevu alma sayfasına hoş geldiniz." (3s)
        cy.wait(3000);

        // Wait for form data to load
        cy.wait('@getDoctors');
        cy.wait('@getPatients');

        // Narration: "Burada kolayca yeni bir randevu oluşturabilirsiniz." (4s)
        cy.wait(4000);

        // Step 2: Doktor Seçimi
        // Narration: "İlk olarak, muayene olmak istediğiniz doktoru seçin." (4s)
        // Wait for doctors to be loaded in select and select the second option dynamically
        cy.get('select[name="doctor_id"] option').should('have.length.greaterThan', 1);
        cy.get('select[name="doctor_id"]').find('option').eq(1).then($option => {
            cy.get('select[name="doctor_id"]').select($option.val());
        });
        cy.wait(4000);

        // Step 3: Hasta Seçimi
        // Narration: "Ardından, hasta bilgisini seçin." (3s)
        // Wait for patients to be loaded in select and select the second option dynamically
        cy.get('select[name="patient_id"] option').should('have.length.greaterThan', 1);
        cy.get('select[name="patient_id"]').find('option').eq(1).then($option => {
            cy.get('select[name="patient_id"]').select($option.val());
        });
        cy.wait(3000);

        // Step 4: Tarih Seçimi
        // Narration: "Uygun olduğunuz tarihi ve saati belirleyin." (4s)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 0, 0, 0);
        // Format for datetime-local input: YYYY-MM-DDTHH:mm
        const dateString = tomorrow.toISOString().slice(0, 16);

        cy.get('input[name="appointment_date"]').should('be.visible').clear().type(dateString);
        cy.wait(4000);

        // Step 5: Onaylama
        // Narration: "Bilgileri kontrol ettikten sonra randevuyu onaylayın." (4s)
        cy.get('button[type="submit"]').should('be.visible').click();

        // Wait for API response
        cy.wait('@createAppointment');
        cy.wait(4000);

        // Step 6: Başarı Mesajı Kontrolü
        // Narration: "Randevunuz başarıyla oluşturuldu. Geçmiş olsun dileklerimizle." (5s)
        cy.contains('successfully', { matchCase: false, timeout: 10000 }).should('be.visible');

        // Wait for the final narration to finish
        cy.wait(5000);
    });
});
