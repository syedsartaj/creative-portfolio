import Link from 'next/link';

const journalPosts = [
  {
    slug: 'creative-process-exploration',
    title: 'Exploring the Creative Process',
    excerpt: 'A deep dive into my artistic journey and the methods I use to bring ideas to life.',
    date: '2024-03-15',
    category: 'Process',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
  },
  {
    slug: 'color-theory-in-practice',
    title: 'Color Theory in Practice',
    excerpt: 'How I use color psychology and theory to create emotional impact in my work.',
    date: '2024-03-08',
    category: 'Theory',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80'
  },
  {
    slug: 'studio-setup-2024',
    title: 'My Studio Setup 2024',
    excerpt: 'A tour of my creative space and the tools that help me create.',
    date: '2024-02-28',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    slug: 'inspiration-sources',
    title: 'Where I Find Inspiration',
    excerpt: 'The books, artists, and experiences that fuel my creative work.',
    date: '2024-02-20',
    category: 'Inspiration',
    image: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?w=800&q=80'
  },
  {
    slug: 'collaboration-journey',
    title: 'The Art of Collaboration',
    excerpt: 'Lessons learned from working with other creatives and clients.',
    date: '2024-02-10',
    category: 'Reflection',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
  },
  {
    slug: 'digital-vs-traditional',
    title: 'Digital vs Traditional Media',
    excerpt: 'Exploring the unique qualities and challenges of both approaches.',
    date: '2024-01-30',
    category: 'Technique',
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&q=80'
  }
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Creative <span className="text-[#ffd700]">Journal</span>
          </h1>
          <p className="text-xl text-gray-400">
            Thoughts, insights, and stories from my creative practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {journalPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group block"
            >
              <article className="border border-gray-800 hover:border-[#ffd700] transition-all duration-300">
                <div className="aspect-video bg-gray-900 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
    </div>
  );
}
