import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const projectData: Record<string, {
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  tools: string[];
  images: number;
}> = {
  'luxury-brand-identity': {
    title: 'Luxury Brand Identity',
    category: 'Branding',
    year: '2024',
    client: 'Elegance & Co.',
    role: 'Lead Designer & Art Director',
    description: 'A complete brand identity system for a luxury lifestyle brand, combining timeless elegance with modern minimalism.',
    challenge: 'The client needed a brand identity that would appeal to high-end consumers while maintaining approachability. The challenge was to create something that felt exclusive without being pretentious.',
    solution: 'I developed a visual language centered around the interplay of black and gold, using geometric shapes and refined typography to create a sense of luxury. The logo features a custom monogram that can be used as a standalone mark or incorporated into larger compositions.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'After Effects'],
    images: 6
  },
  'abstract-gold-series': {
    title: 'Abstract Gold Series',
    category: 'Art',
    year: '2024',
    client: 'Personal Project',
    role: 'Artist',
    description: 'A series of abstract compositions exploring the relationship between light, shadow, and metallic surfaces.',
    challenge: 'Creating digital art that captures the physical properties of gold - its reflectivity, warmth, and luminosity - while maintaining artistic expression and emotional depth.',
    solution: 'Through experimentation with digital painting techniques and careful attention to light behavior, I developed a series of pieces that feel both tactile and ethereal. Each composition balances chaos and control, allowing the gold elements to flow naturally while maintaining intentional structure.',
    tools: ['Procreate', 'Adobe Photoshop', 'Blender'],
    images: 8
  },
  'editorial-magazine-design': {
    title: 'Editorial Magazine Design',
    category: 'Design',
    year: '2024',
    client: 'Modern Culture Magazine',
    role: 'Art Director',
    description: 'Complete redesign of a cultural magazine focusing on art, design, and contemporary living.',
    challenge: 'The existing design felt dated and didn\'t reflect the cutting-edge content. Readers were dropping off, and the brand needed to attract a younger, design-savvy audience.',
    solution: 'I created a bold new visual system that uses dramatic contrast, generous white space, and striking typography. The black and gold accent color became a signature element, used sparingly but effectively to highlight key content and create visual hierarchy.',
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'Photoshop'],
    images: 5
  }
};

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug] || {
    title: 'Project Not Found',
    category: '',
    year: '',
    client: '',
    role: '',
    description: 'This project is still being documented...',
    challenge: '',
    solution: '',
    tools: [],
    images: 3
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center text-[#ffd700] hover:underline mb-8"
          >
            ← Back to Work
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="text-[#ffd700]">{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-[#ffd700] font-semibold mb-2">Client</h3>
                <p className="text-gray-300">{project.client}</p>
              </div>
              <div>
                <h3 className="text-[#ffd700] font-semibold mb-2">Role</h3>
                <p className="text-gray-300">{project.role}</p>
              </div>
              <div>
                <h3 className="text-[#ffd700] font-semibold mb-2">Year</h3>
                <p className="text-gray-300">{project.year}</p>
              </div>
            </div>
          </header>

          <div className="aspect-video bg-gray-900 border border-gray-800 mb-12 flex items-center justify-center text-gray-700">
            [Hero Image]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#ffd700]">Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </section>

              {project.challenge && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-[#ffd700]">The Challenge</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </section>
              )}

              {project.solution && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-[#ffd700]">The Solution</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </section>
              )}
            </div>

            <div>
              <div className="border border-gray-800 p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-[#ffd700]">Tools Used</h3>
                <ul className="space-y-2">
                  {project.tools.map((tool, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="text-[#ffd700]">→</span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[#ffd700]">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: project.images }).map((_, index) => (
                <div
                  key={index}
                  className={`bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-700 ${
                    index === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'
                  }`}
                >
                  [Project Image {index + 1}]
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="border border-gray-800 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">
                Project <span className="text-[#ffd700]">Outcome</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The project exceeded expectations, receiving critical acclaim and achieving measurable
                success. The client reported increased engagement, brand recognition, and positive
                feedback from their target audience. This work has since been featured in several
                design publications and won multiple awards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 border border-gray-800">
                  <div className="text-3xl font-bold text-[#ffd700] mb-2">150%</div>
                  <div className="text-sm text-gray-400">Engagement Increase</div>
                </div>
                <div className="text-center p-6 border border-gray-800">
                  <div className="text-3xl font-bold text-[#ffd700] mb-2">3</div>
                  <div className="text-sm text-gray-400">Awards Won</div>
                </div>
                <div className="text-center p-6 border border-gray-800">
                  <div className="text-3xl font-bold text-[#ffd700] mb-2">100%</div>
                  <div className="text-sm text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-800 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Like what you see?
                </h3>
                <p className="text-gray-400">
                  Let's create something amazing together.
                </p>
              </div>
              <a
                href="/contact"
                className="bg-[#ffd700] text-black px-8 py-3 font-bold hover:bg-[#ffd700]/90 transition-colors"
              >
                Start a Project
              </a>
            </div>
          </section>

          <div className="mt-12 flex items-center justify-between border-t border-gray-800 pt-8">
            <Link
              href="/work"
              className="text-gray-400 hover:text-[#ffd700] transition-colors"
            >
              ← All Projects
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-[#ffd700] transition-colors"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
