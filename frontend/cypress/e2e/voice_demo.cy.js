describe('Sesli Demo - Hastane Randevu Yönetim Sistemi', () => {
    it('Tüm sistem özelliklerini gösterir', () => {
        // Setup API intercepts
        cy.intercept('GET', '/api/v1/doctors').as('getDoctors');
        cy.intercept('GET', '/api/v1/patients').as('getPatients');
        cy.intercept('POST', '/api/v1/appointments').as('createAppointment');

        // Step 1: Ana Sayfa
        cy.visit('/');
        cy.contains('Galactic Prominence Hospital', { timeout: 10000 }).should('be.visible');
        cy.wait(2000);

        // "Merhaba. Galactic Prominence Hastane Randevu Yönetim Sistemine hoş geldiniz."
        cy.wait(3000);

        // "Bu sistem ile doktorlarımızı görüntüleyebilir, randevu alabilir ve randevularınızı yönetebilirsiniz."
        cy.wait(3000);

        // Step 2: Doktorlar Sayfası
        // "Şimdi doktorlar sayfasına gidiyoruz."
        cy.wait(1000);
        cy.get('a[href="/doctors"]').first().click();
        cy.location('pathname', { timeout: 10000 }).should('eq', '/doctors');

        // Wait for doctors API
        cy.wait('@getDoctors');
        cy.contains('Doktorlarımız', { timeout: 10000 }).should('be.visible');
        cy.wait(2000);

        // "Burada tüm doktorlarımızı ve uzmanlık alanlarını görebilirsiniz."
        cy.wait(3000);

        // "Arama kutusunu kullanarak istediğiniz doktoru bulabilirsiniz."
        cy.get('input[placeholder*="Doktor"]', { timeout: 10000 })
            .should('be.visible')
            .type('House', { delay: 100 });
        cy.wait(2000);

        // Clear search
        cy.get('input[placeholder*="Doktor"]').clear();
        cy.wait(500);

        // Step 3: Randevu Alma
        // "Şimdi randevu alma sayfasına geçiyoruz."
        cy.wait(1000);
        cy.get('a[href="/appointments"]').first().click();
        cy.location('pathname', { timeout: 10000 }).should('eq', '/appointments');
        cy.contains('Book Appointment', { timeout: 10000 }).should('be.visible');
        cy.wait(2000);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 0, 0, 0);
        const dateString = tomorrow.toISOString().slice(0, 16);

        cy.get('input[name="appointment_date"]').should('be.visible').clear().type(dateString);
        cy.wait(2000);

        // "Ve randevuyu onaylıyoruz."
        cy.wait(1000);
        cy.get('button[type="submit"]').should('be.visible').click();
        cy.wait('@createAppointment');
        cy.wait(3000);

        // "Randevu başarıyla oluşturuldu."
        cy.contains('successfully', { matchCase: false, timeout: 10000 }).should('be.visible');
        cy.wait(2000);

        // Step 4: Randevularım
        // "Şimdi oluşturduğumuz randevuyu görüntülemek için randevularım sayfasına gidiyoruz."
        cy.wait(1000);
        cy.get('a[href="/appointments/list"]').first().click();
        cy.location('pathname', { timeout: 10000 }).should('eq', '/appointments/list');
        cy.wait(2000);

        // "Burada tüm randevularınızı görebilir, düzenleyebilir veya iptal edebilirsiniz."
        cy.wait(3000);

        // Step 5: Ana Sayfaya Dönüş
        // "Ana sayfaya geri dönüyoruz."
        cy.wait(1000);
        cy.get('a[href="/"]').first().click();
        cy.location('pathname', { timeout: 10000 }).should('eq', '/');
        cy.wait(2000);

        // "Galactic Prominence Hastane Randevu Yönetim Sistemi demosunu izlediğiniz için teşekkür ederiz. İyi günler dileriz."
        cy.wait(4000);
    });
});
