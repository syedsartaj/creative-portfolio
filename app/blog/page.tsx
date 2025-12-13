import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'creative-process-exploration',
    title: 'Exploring the Creative Process',
    excerpt: 'A deep dive into my artistic journey and the methods I use to bring ideas to life.',
    date: '2024-03-15',
    category: 'Process',
    image: '/images/blog/process.jpg'
  },
  {
    slug: 'color-theory-in-practice',
    title: 'Color Theory in Practice',
    excerpt: 'How I use color psychology and theory to create emotional impact in my work.',
    date: '2024-03-08',
    category: 'Theory',
    image: '/images/blog/color.jpg'
  },
  {
    slug: 'studio-setup-2024',
    title: 'My Studio Setup 2024',
    excerpt: 'A tour of my creative space and the tools that help me create.',
    date: '2024-02-28',
    category: 'Behind the Scenes',
    image: '/images/blog/studio.jpg'
  },
  {
    slug: 'inspiration-sources',
    title: 'Where I Find Inspiration',
    excerpt: 'The books, artists, and experiences that fuel my creative work.',
    date: '2024-02-20',
    category: 'Inspiration',
    image: '/images/blog/inspiration.jpg'
  },
  {
    slug: 'collaboration-journey',
    title: 'The Art of Collaboration',
    excerpt: 'Lessons learned from working with other creatives and clients.',
    date: '2024-02-10',
    category: 'Reflection',
    image: '/images/blog/collaboration.jpg'
  },
  {
    slug: 'digital-vs-traditional',
    title: 'Digital vs Traditional Media',
    excerpt: 'Exploring the unique qualities and challenges of both approaches.',
    date: '2024-01-30',
    category: 'Technique',
    image: '/images/blog/media.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Creative <span className="text-[#ffd700]">Journal</span>
          </h1>
          <p className="text-xl text-gray-400">
            Thoughts, insights, and stories from my creative practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="border border-gray-800 hover:border-[#ffd700] transition-all duration-300">
                <div className="aspect-video bg-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                    [Image]
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="text-[#ffd700]">{post.category}</span>
                    <span>•</span>
                    <time>{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</time>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 group-hover:text-[#ffd700] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>

                  <span className="text-[#ffd700] group-hover:underline">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">More posts coming soon...</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
