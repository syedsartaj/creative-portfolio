import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const skills = [
    'Digital Illustration',
    'Graphic Design',
    'Art Direction',
    'Branding & Identity',
    'Typography',
    'UI/UX Design',
    'Photography',
    'Print Design'
  ];

  const exhibitions = [
    {
      year: '2024',
      title: 'Modern Visions',
      location: 'Contemporary Art Gallery, New York'
    },
    {
      year: '2023',
      title: 'Digital Renaissance',
      location: 'Design Museum, London'
    },
    {
      year: '2023',
      title: 'Solo Exhibition: Gold & Shadow',
      location: 'Studio Gallery, Los Angeles'
    },
    {
      year: '2022',
      title: 'Emerging Artists Collective',
      location: 'Art Basel, Miami'
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Best Visual Identity',
      organization: 'Design Awards Annual'
    },
    {
      year: '2023',
      title: 'Rising Star in Design',
      organization: 'Creative Industry Awards'
    },
    {
      year: '2023',
      title: 'Excellence in Digital Art',
      organization: 'International Art Competition'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-16">
            About <span className="text-[#ffd700]">Me</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="aspect-square bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-700">
              [Portrait Photo]
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-[#ffd700]">
                Artist Statement
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I create at the intersection of traditional artistry and modern design.
                  My work explores the tension between simplicity and luxury, using minimal
                  color palettes to create maximum emotional impact.
                </p>
                <p>
                  With over a decade of experience in visual arts and design, I've developed
                  a signature style that combines bold graphic elements with refined craftsmanship.
                  Every piece I create tells a story, whether it's a brand identity that captures
                  a company's essence or a personal artwork that explores human emotion.
                </p>
                <p>
                  I believe that true creativity comes from constraint. By limiting my palette
                  to black and gold, I force myself to think deeper about composition, form,
                  and meaning. This restriction has become my signature, a visual language that
                  speaks of elegance, power, and timeless beauty.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[#ffd700]">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="border border-gray-800 p-4 text-center hover:border-[#ffd700] hover:bg-[#ffd700]/5 transition-all duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[#ffd700]">
              Exhibitions
            </h2>
            <div className="space-y-6">
              {exhibitions.map((exhibition, index) => (
                <div
                  key={index}
                  className="border-l-2 border-[#ffd700] pl-6 py-2"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="text-[#ffd700] font-bold">{exhibition.year}</span>
                    <span className="hidden md:block text-gray-600">|</span>
                    <span className="font-semibold">{exhibition.title}</span>
                    <span className="hidden md:block text-gray-600">•</span>
                    <span className="text-gray-400">{exhibition.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[#ffd700]">
              Awards & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="border border-gray-800 p-6 hover:border-[#ffd700] transition-colors"
                >
                  <div className="text-[#ffd700] text-sm mb-2">{award.year}</div>
                  <h3 className="font-bold text-lg mb-1">{award.title}</h3>
                  <p className="text-gray-400 text-sm">{award.organization}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border border-gray-800 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Let's Create <span className="text-[#ffd700]">Together</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always interested in new projects and collaborations.
              Whether you need design work, commissions, or just want to connect,
              I'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#ffd700] text-black px-8 py-3 font-bold hover:bg-[#ffd700]/90 transition-colors"
            >
              Get in Touch
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
