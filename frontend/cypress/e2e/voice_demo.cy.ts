describe('Sesli Demo - Hastane Randevu Yönetim Sistemi', () => {
    it('Tüm sistem özelliklerini sesli olarak gösterir', () => {
        // Step 1: Ana Sayfa
        cy.visit('/');
        cy.speak('Merhaba. Galactic Prominence Hastane Randevu Yönetim Sistemine hoş geldiniz.');
        cy.wait(2000);

        cy.speak('Bu sistem ile doktorlarımızı görüntüleyebilir, randevu alabilir ve randevularınızı yönetebilirsiniz.');
        cy.wait(2000);

        // Step 2: Doktorlar Sayfası
        cy.speak('Şimdi doktorlar sayfasına gidiyoruz.');
        cy.contains('Doktorlarımız').click();
        cy.wait(2000);

        cy.speak('Burada tüm doktorlarımızı ve uzmanlık alanlarını görebilirsiniz.');
        cy.wait(2000);

        cy.speak('Arama kutusunu kullanarak istediğiniz doktoru bulabilirsiniz.');
        cy.get('input[placeholder*="Doktor"]').type('House');
        cy.wait(2000);
        cy.get('input[placeholder*="Doktor"]').clear();
        cy.wait(1000);

        // Step 3: Randevu Alma
        cy.speak('Şimdi randevu alma sayfasına geçiyoruz.');
        cy.contains('Randevu Al').click();
        cy.wait(2000);

        cy.speak('Randevu almak için önce bir doktor seçiyoruz.');
        cy.get('select[name="doctor_id"]').select(1);
        cy.wait(1500);

        cy.speak('Ardından hasta bilgisini seçiyoruz.');
        cy.get('select[name="patient_id"]').select(1);
        cy.wait(1500);

        cy.speak('Randevu tarihini belirliyoruz.');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 0, 0, 0);
        const dateString = tomorrow.toISOString().slice(0, 16);
        cy.get('input[name="appointment_date"]').type(dateString);
        cy.wait(1500);

        cy.speak('Ve randevuyu onaylıyoruz.');
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.contains('başarıyla').should('be.visible');
        cy.speak('Randevu başarıyla oluşturuldu.');
        cy.wait(2000);

        // Step 4: Randevularım
        cy.speak('Şimdi oluşturduğumuz randevuyu görüntülemek için randevularım sayfasına gidiyoruz.');
        cy.contains('Randevularım').click();
        cy.wait(2000);

        cy.speak('Burada tüm randevularınızı görebilir, düzenleyebilir veya iptal edebilirsiniz.');
        cy.wait(2000);

        // Step 5: Ana Sayfaya Dönüş
        cy.speak('Ana sayfaya geri dönüyoruz.');
        cy.contains('Ana Sayfa').click();
        cy.wait(2000);

        cy.speak('Galactic Prominence Hastane Randevu Yönetim Sistemi demosunu izlediğiniz için teşekkür ederiz. İyi günler dileriz.');
        cy.wait(3000);
    });
});
