import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Galactic Prominence Hastanesi
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Modern ve güvenilir sağlık hizmetleri için randevu yönetim sistemi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointments"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Hemen Randevu Al
            </Link>
            <Link
              href="/doctors"
              className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-xl border-2 border-white/20"
            >
              Doktorlarımız
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-white/10 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">Uzman Doktorlar</h3>
              <p className="text-gray-400 mb-4">
                Alanında uzman doktorlarımızla kaliteli sağlık hizmeti alın
              </p>
              <Link href="/doctors" className="text-primary font-semibold hover:underline">
                Doktorları Görüntüle →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-white/10 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">Kolay Randevu</h3>
              <p className="text-gray-400 mb-4">
                Online randevu sistemi ile hızlı ve kolay randevu alın
              </p>
              <Link href="/appointments" className="text-primary font-semibold hover:underline">
                Randevu Al →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-white/10 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">Randevu Takibi</h3>
              <p className="text-gray-400 mb-4">
                Tüm randevularınızı tek yerden görüntüleyin ve yönetin
              </p>
              <Link href="/appointments/list" className="text-primary font-semibold hover:underline">
                Randevularım →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-400">Uzman Doktor</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-400">Mutlu Hasta</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-400">Hizmet</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
