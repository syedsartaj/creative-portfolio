import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const projects = [
  {
    slug: 'luxury-brand-identity',
    title: 'Luxury Brand Identity',
    category: 'Branding',
    year: '2024',
    image: '/images/work/luxury-brand.jpg',
    featured: true
  },
  {
    slug: 'abstract-gold-series',
    title: 'Abstract Gold Series',
    category: 'Art',
    year: '2024',
    image: '/images/work/abstract-gold.jpg',
    featured: true
  },
  {
    slug: 'editorial-magazine-design',
    title: 'Editorial Magazine Design',
    category: 'Design',
    year: '2024',
    image: '/images/work/editorial.jpg',
    featured: false
  },
  {
    slug: 'corporate-rebranding',
    title: 'Corporate Rebranding',
    category: 'Branding',
    year: '2023',
    image: '/images/work/corporate.jpg',
    featured: false
  },
  {
    slug: 'minimalist-poster-collection',
    title: 'Minimalist Poster Collection',
    category: 'Art',
    year: '2023',
    image: '/images/work/posters.jpg',
    featured: true
  },
  {
    slug: 'digital-art-installation',
    title: 'Digital Art Installation',
    category: 'Art',
    year: '2023',
    image: '/images/work/installation.jpg',
    featured: false
  },
  {
    slug: 'premium-packaging-design',
    title: 'Premium Packaging Design',
    category: 'Design',
    year: '2023',
    image: '/images/work/packaging.jpg',
    featured: false
  },
  {
    slug: 'typography-exploration',
    title: 'Typography Exploration',
    category: 'Design',
    year: '2023',
    image: '/images/work/typography.jpg',
    featured: true
  },
  {
    slug: 'fashion-brand-campaign',
    title: 'Fashion Brand Campaign',
    category: 'Branding',
    year: '2023',
    image: '/images/work/fashion.jpg',
    featured: false
  },
  {
    slug: 'modern-architecture-visualizations',
    title: 'Modern Architecture Visualizations',
    category: 'Art',
    year: '2022',
    image: '/images/work/architecture.jpg',
    featured: false
  },
  {
    slug: 'book-cover-series',
    title: 'Book Cover Series',
    category: 'Design',
    year: '2022',
    image: '/images/work/books.jpg',
    featured: false
  },
  {
    slug: 'experimental-compositions',
    title: 'Experimental Compositions',
    category: 'Art',
    year: '2022',
    image: '/images/work/experimental.jpg',
    featured: false
  }
];

export default function WorkPage() {
  const categories = ['All', 'Branding', 'Art', 'Design'];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Selected <span className="text-[#ffd700]">Work</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A curated collection of projects spanning branding, digital art, and design.
            Each piece represents a unique challenge and creative solution.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 border border-gray-800 hover:border-[#ffd700] hover:bg-[#ffd700]/5 transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`group block ${
                  project.featured && index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="relative overflow-hidden border border-gray-800 hover:border-[#ffd700] transition-all duration-300">
                  <div className={`bg-gray-900 ${
                    project.featured && index % 5 === 0 ? 'aspect-square' : 'aspect-[4/5]'
                  } relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                      [Project Image]
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <div className="text-center">
                      <span className="text-[#ffd700] text-sm mb-2 block">
                        {project.category} • {project.year}
                      </span>
                      <h2 className="text-2xl font-bold mb-3">
                        {project.title}
                      </h2>
                      <span className="text-[#ffd700]">
                        View Project →
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-black/50 backdrop-blur-sm absolute bottom-0 left-0 right-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-400">
                      {project.category} • {project.year}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 text-center">
          <div className="border border-gray-800 p-12">
            <h2 className="text-3xl font-bold mb-4">
              Have a Project in <span className="text-[#ffd700]">Mind?</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always interested in taking on new challenges and collaborations.
              Let's create something extraordinary together.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#ffd700] text-black px-8 py-3 font-bold hover:bg-[#ffd700]/90 transition-colors"
            >
              Start a Project
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
