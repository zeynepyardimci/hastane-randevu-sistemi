describe('Sesli Demo - Hastane Randevu Yönetim Sistemi (Puppeteer Kaydı)', () => {
    let videoPath;

    it('Tüm sistem özelliklerini sesli olarak gösterir ve kaydeder', () => {
        // Start Puppeteer recording
        cy.task('startRecording', { url: 'http://localhost:3000' }).then((result) => {
            videoPath = result.videoPath;
            cy.log(`Recording started: ${videoPath}`);
        });

        // Step 1: Ana Sayfa
        cy.task('puppeteerWait', { ms: 2000 });
        cy.task('puppeteerSpeak', { text: 'Merhaba. Galactic Prominence Hastane Randevu Yönetim Sistemine hoş geldiniz.' });
        cy.task('puppeteerWait', { ms: 3000 });

        cy.task('puppeteerSpeak', { text: 'Bu sistem ile doktorlarımızı görüntüleyebilir, randevu alabilir ve randevularınızı yönetebilirsiniz.' });
        cy.task('puppeteerWait', { ms: 3000 });

        // Step 2: Doktorlar Sayfası
        cy.task('puppeteerSpeak', { text: 'Şimdi doktorlar sayfasına gidiyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'a[href="/doctors"]' });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Burada tüm doktorlarımızı ve uzmanlık alanlarını görebilirsiniz.' });
        cy.task('puppeteerWait', { ms: 3000 });

        cy.task('puppeteerSpeak', { text: 'Arama kutusunu kullanarak istediğiniz doktoru bulabilirsiniz.' });
        cy.task('puppeteerType', { selector: 'input[placeholder*="Doktor"]', text: 'House' });
        cy.task('puppeteerWait', { ms: 2000 });

        // Clear search
        cy.task('puppeteerClick', { selector: 'input[placeholder*="Doktor"]' }).then(() => {
            cy.task('puppeteerWait', { ms: 500 });
        });

        // Step 3: Randevu Alma
        cy.task('puppeteerSpeak', { text: 'Şimdi randevu alma sayfasına geçiyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'a[href="/appointments"]' });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Randevu almak için önce bir doktor seçiyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'select[name="doctor_id"]' });
        cy.task('puppeteerWait', { ms: 500 });
        cy.task('puppeteerClick', { selector: 'select[name="doctor_id"] option:nth-child(2)' });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Ardından hasta bilgisini seçiyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'select[name="patient_id"]' });
        cy.task('puppeteerWait', { ms: 500 });
        cy.task('puppeteerClick', { selector: 'select[name="patient_id"] option:nth-child(2)' });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Randevu tarihini belirliyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });

        // Calculate tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(14, 0, 0, 0);
        const dateString = tomorrow.toISOString().slice(0, 16);

        cy.task('puppeteerType', { selector: 'input[name="appointment_date"]', text: dateString });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Ve randevuyu onaylıyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'button[type="submit"]' });
        cy.task('puppeteerWait', { ms: 3000 });

        cy.task('puppeteerSpeak', { text: 'Randevu başarıyla oluşturuldu.' });
        cy.task('puppeteerWait', { ms: 2000 });

        // Step 4: Randevularım
        cy.task('puppeteerSpeak', { text: 'Şimdi oluşturduğumuz randevuyu görüntülemek için randevularım sayfasına gidiyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'a[href="/appointments/list"]' });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Burada tüm randevularınızı görebilir, düzenleyebilir veya iptal edebilirsiniz.' });
        cy.task('puppeteerWait', { ms: 3000 });

        // Step 5: Ana Sayfaya Dönüş
        cy.task('puppeteerSpeak', { text: 'Ana sayfaya geri dönüyoruz.' });
        cy.task('puppeteerWait', { ms: 1000 });
        cy.task('puppeteerClick', { selector: 'a[href="/"]' });
        cy.task('puppeteerWait', { ms: 2000 });

        cy.task('puppeteerSpeak', { text: 'Galactic Prominence Hastane Randevu Yönetim Sistemi demosunu izlediğiniz için teşekkür ederiz. İyi günler dileriz.' });
        cy.task('puppeteerWait', { ms: 4000 });

        // Stop recording
        cy.task('stopRecording').then(() => {
            cy.log(`Recording saved to: ${videoPath}`);
        });
    });
});
