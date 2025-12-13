import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const blogContent: Record<string, {
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}> = {
  'creative-process-exploration': {
    title: 'Exploring the Creative Process',
    date: '2024-03-15',
    category: 'Process',
    readTime: '8 min read',
    content: [
      'The creative process is never linear. It\'s a journey filled with unexpected turns, moments of doubt, and brilliant breakthroughs that come when you least expect them.',
      'Over the years, I\'ve learned to embrace the chaos of creativity. What initially felt like a lack of structure has become my greatest asset. I\'ve developed a practice that honors both discipline and spontaneity.',
      'My typical day starts with morning sketches - not refined work, but pure exploration. These sketches are where I let my subconscious speak without the critic\'s voice interfering. They\'re messy, unpolished, and absolutely essential.',
      'The middle phase is where the real work happens. This is where I take those raw ideas and begin to refine them. I ask questions: What is this piece trying to say? Who is it for? What emotion should it evoke?',
      'The final stage is polish and presentation. But even here, I try to maintain some of that initial energy and spontaneity. Too much refinement can kill the soul of a piece.',
      'What I\'ve learned most is that creativity isn\'t about waiting for inspiration - it\'s about showing up every day and doing the work, even when it feels impossible.'
    ]
  },
  'color-theory-in-practice': {
    title: 'Color Theory in Practice',
    date: '2024-03-08',
    category: 'Theory',
    readTime: '6 min read',
    content: [
      'Color is emotion made visible. It\'s the fastest way to communicate feeling and set the mood of a piece before a single word is read or form is recognized.',
      'In my work, I use a limited palette of black and gold deliberately. This restriction forces me to be more creative with contrast, value, and composition. The constraints become liberating.',
      'Gold represents luxury, divinity, and achievement. Black provides depth, mystery, and sophistication. Together, they create a tension that draws the eye and holds attention.',
      'But color theory goes beyond just choosing a palette. It\'s about understanding how colors interact, how they change based on what surrounds them, and how cultural contexts shift their meaning.',
      'I spend hours studying the work of masters who understood color: Klimt\'s use of gold leaf, Caravaggio\'s dramatic chiaroscuro, Rothko\'s color fields. Each taught me something different about how color speaks.',
      'The practical application comes down to testing. I create multiple versions of every piece, adjusting hues, saturation, and value until the emotional impact is exactly right.'
    ]
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogContent[params.slug] || {
    title: 'Post Not Found',
    date: '',
    category: '',
    readTime: '',
    content: ['This post is still being written...']
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-[#ffd700] hover:underline mb-8"
          >
            ← Back to Journal
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="text-[#ffd700]">{post.category}</span>
              <span>•</span>
              <time>{post.date && new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="aspect-video bg-gray-900 border border-gray-800 mb-8 flex items-center justify-center text-gray-700">
              [Featured Image]
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Share this post</p>
                <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-[#ffd700] transition-colors">
                    Twitter
                  </button>
                  <button className="text-gray-400 hover:text-[#ffd700] transition-colors">
                    LinkedIn
                  </button>
                  <button className="text-gray-400 hover:text-[#ffd700] transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>

              <Link
                href="/blog"
                className="text-[#ffd700] hover:underline"
              >
                More posts →
              </Link>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
