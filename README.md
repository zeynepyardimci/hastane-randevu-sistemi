# 🏥 Hastane Randevu Yönetim Sistemi (HRYS)

> **Modern Web Teknolojileri, Microservis Mimarisi ve AI Destekli Test Otomasyonu**

Bu proje, özel hastaneler için geliştirilmiş kapsamlı bir **Randevu Yönetim Sistemi**dir. Hastaların randevu almasını, doktorların takvimlerini yönetmesini ve yöneticilerin raporlama yapmasını sağlayan bu sistem; **Ruby on Rails** ve **Next.js** teknolojileri kullanılarak geliştirilmiş, **Cypress** ve **Cucumber** ile test edilmiştir.

---

## 🚀 Proje Hakkında

Proje, modern yazılım geliştirme süreçlerine uygun olarak **Davranış Odaklı Geliştirme (BDD)** prensipleriyle tasarlanmıştır. Kullanıcı dostu arayüzü ve güçlü backend yapısı ile aşağıdaki temel sorunlara çözüm üretir:

* **Hasta:** Hızlı ve kolay randevu alma, doktor müsaitliklerini anlık görüntüleme.
* **Doktor:** Günlük ve haftalık randevu programını takip etme.
* **Yönetim:** Merkezi sistem üzerinden doktor ve klinik yönetimi.

---

## 🎥 Proje Demo ve Test Videosu

Projenin uçtan uca (E2E) çalışma senaryosu, Cypress ve AI seslendirme teknolojisi kullanılarak otomatik olarak kaydedilmiştir.
Video Linki: https://www.youtube.com/watch?v=EIgG11s7UKE

---

## 🛠️ Teknolojiler ve Mimari

Bu proje **Antigravity** yaklaşımı ile modüler bir yapıda geliştirilmiştir.

| Alan | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Backend** | ![Ruby on Rails](https://img.shields.io/badge/-Ruby%20on%20Rails-CC0000?style=flat&logo=rubyonrails&logoColor=white) | API Mode, RESTful Mimari |
| **Frontend** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) | React Tabanlı SSR Arayüz |
| **Database** | ![SQLite](https://img.shields.io/badge/-SQLite3-003B57?style=flat&logo=sqlite&logoColor=white) | Geliştirme ve Test Veritabanı |
| **E2E Test** | ![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=flat&logo=cypress&logoColor=white) | Frontend ve Entegrasyon Testleri |
| **BDD Test** | ![Cucumber](https://img.shields.io/badge/-Cucumber-23D96C?style=flat&logo=cucumber&logoColor=white) | Senaryo Bazlı Backend Testleri |
| **AI & Tools** | **Antigravity & FFmpeg** | AI Destekli Kodlama ve Otomatik Video İşleme |

---

## ✨ Temel Özellikler

### 1. Kullanıcı Modülü (Hasta)
* Güvenli giriş ve kayıt olma ekranları.
* Klinik ve doktor bazlı arama yapabilme.
* Müsait tarih ve saatleri takvim üzerinde görüntüleme.
* Randevu oluşturma ve iptal etme.

### 2. Yönetim Modülü (Doktor & Admin)
* **Doktor:** Kendi randevu listesini görüntüleme.
* **Admin:** Yeni doktor ekleme, klinik tanımlama ve sistem raporlarını inceleme.

---

## ⚙️ Kurulum ve Çalıştırma (Local Setup)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Ön Hazırlık
Repoyu klonlayın:
```bash
git clone [https://github.com/zeynepyardimci/hastane-randevu-sistemi.git](https://github.com/zeynepyardimci/hastane-randevu-sistemi.git)
cd hastane-randevu-sistemi
```

## 1. Backend (Ruby on Rails) Kurulumu
```bash
cd backend
bundle install
rails db:create db:migrate
rails s -p 3001
```
Backend servisi http://localhost:3001 portunda çalışacaktır.

## 2. Frontend (Next.js) Kurulumu
Yeni bir terminal sekmesi açın:
```bash
cd frontend
npm install
# Port çakışmasını önlemek için 3002 portunu kullanıyoruz
npm run dev -- -p 3002
```
Uygulama arayüzüne http://localhost:3002 adresinden erişebilirsiniz.

🧪 Test Süreçleri
Cypress ile Arayüz Testleri
Otomatik test senaryolarını çalıştırmak ve video kaydı oluşturmak için:
```bash
cd frontend
npx cypress run
```
Test arayüzünü görerek çalıştırmak için: npx cypress open

Cucumber ile Backend Testleri
Gherkin formatında yazılmış senaryoları koşmak için:
```bash
cd backend
cucumber
```
## 📂 Proje Klasör Yapısı
hastane-randevu-sistemi/
├── backend/                # Rails API

│   ├── app/models/         # Veritabanı Modelleri

│   ├── app/controllers/    # API Uç Noktaları

│   └── features/           # Cucumber Test Senaryoları (*.feature)

│
├── frontend/               # Next.js Uygulaması

│   ├── app/                # Sayfalar (Login, Dashboard vb.)

│   ├── cypress/            # E2E Test Dosyaları

│   │   ├── e2e/            # Test Kodları

│   │   └── videos/         # Otomatik Oluşturulan Demo Videoları

│   └── public/             # Görsel Varlıklar
│
└── README.md               # Proje Dokümantasyonu

## 👩‍💻 Geliştirici
Zeynep Yardımcı
