import Link from 'next/link';

const journalContent: Record<string, {
  title: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
}> = {
  'creative-process-exploration': {
    title: 'Exploring the Creative Process',
    date: '2024-03-15',
    category: 'Process',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
    content: [
      'Color is emotion made visible. It\'s the fastest way to communicate feeling and set the mood of a piece before a single word is read or form is recognized.',
      'In my work, I use a limited palette of black and gold deliberately. This restriction forces me to be more creative with contrast, value, and composition. The constraints become liberating.',
      'Gold represents luxury, divinity, and achievement. Black provides depth, mystery, and sophistication. Together, they create a tension that draws the eye and holds attention.',
      'But color theory goes beyond just choosing a palette. It\'s about understanding how colors interact, how they change based on what surrounds them, and how cultural contexts shift their meaning.',
      'I spend hours studying the work of masters who understood color: Klimt\'s use of gold leaf, Caravaggio\'s dramatic chiaroscuro, Rothko\'s color fields. Each taught me something different about how color speaks.',
      'The practical application comes down to testing. I create multiple versions of every piece, adjusting hues, saturation, and value until the emotional impact is exactly right.'
    ]
  },
  'studio-setup-2024': {
    title: 'My Studio Setup 2024',
    date: '2024-02-28',
    category: 'Behind the Scenes',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    content: [
      'Your environment shapes your work more than you might realize. Over the years, I\'ve refined my studio space to support both focused work and creative exploration.',
      'The heart of my setup is a large standing desk with dual monitors. One for the work-in-progress, one for references and communication. I alternate between standing and sitting throughout the day.',
      'Lighting is crucial. I have a combination of natural light from north-facing windows and adjustable LED panels for consistent color accuracy when working on digital pieces.',
      'My tools are simple but high-quality: a Wacom tablet for digital work, a collection of Copic markers and micron pens for sketching, and a library of reference books always within arm\'s reach.',
      'Perhaps most important is what\'s not in my studio: distractions. My phone stays in another room during focused work sessions, and I\'ve developed rituals that help me transition into creative mode.',
      'The space continues to evolve. Every few months, I reassess what\'s working and what needs to change. The studio should serve the work, not the other way around.'
    ]
  },
  'inspiration-sources': {
    title: 'Where I Find Inspiration',
    date: '2024-02-20',
    category: 'Inspiration',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?w=800&q=80',
    content: [
      'Inspiration is everywhere, but you have to train yourself to see it. I\'ve developed habits that keep my creative well full, even during challenging periods.',
      'Museums and galleries remain essential. There\'s something about standing in front of original artwork that no reproduction can capture. I try to visit at least once a month.',
      'Books are my constant companions. Not just art books, but history, philosophy, science fiction. Ideas from unexpected places often lead to the most interesting creative connections.',
      'Nature provides endless material. The patterns in tree bark, the way light falls through leaves, the color gradients in a sunset - all of these find their way into my work.',
      'Conversations with other creatives are invaluable. I maintain a network of artists, designers, and makers whose perspectives challenge and expand my own.',
      'And sometimes, inspiration comes from simply being bored. I protect time for doing nothing, for letting my mind wander. Some of my best ideas have come during these quiet moments.'
    ]
  },
  'collaboration-journey': {
    title: 'The Art of Collaboration',
    date: '2024-02-10',
    category: 'Reflection',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    content: [
      'Early in my career, I was fiercely protective of my creative vision. I thought collaboration meant compromise, and compromise meant failure.',
      'I was wrong. The best projects of my career have all involved collaboration - with clients, with other creatives, with mentors who pushed me beyond my comfort zone.',
      'Good collaboration requires clear communication. I\'ve learned to articulate my ideas clearly while remaining genuinely open to feedback and alternative perspectives.',
      'It also requires knowing when to lead and when to follow. Sometimes I\'m the expert in the room; sometimes I need to defer to others who know more about a particular aspect of the project.',
      'The hardest lesson was learning to separate my ego from the work. Criticism of an idea isn\'t criticism of me as a person. Once I internalized this, collaboration became much easier.',
      'Now I actively seek out collaborative opportunities. The work is stronger for it, and the process is more enjoyable too.'
    ]
  },
  'digital-vs-traditional': {
    title: 'Digital vs Traditional Media',
    date: '2024-01-30',
    category: 'Technique',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&q=80',
    content: [
      'I work in both digital and traditional media, and I\'ve come to appreciate that each has its own unique qualities that the other can\'t replicate.',
      'Traditional media offers tactile feedback - the resistance of paper, the smell of paint, the unpredictability of ink. There\'s a directness to it that connects you to centuries of artistic practice.',
      'Digital tools provide infinite undo, perfect precision, and the ability to work non-destructively. You can experiment without fear of ruining your only copy.',
      'I\'ve found that starting projects traditionally and finishing them digitally often gives me the best of both worlds. The initial sketches capture an energy that pure digital work sometimes lacks.',
      'The choice of medium should serve the concept. Some ideas demand the organic imperfection of handmade work; others benefit from digital precision.',
      'What matters most isn\'t the tool but the intention behind its use. A skilled artist can create compelling work with a burnt stick on a cave wall or with the most advanced digital software.',
      'My advice to younger artists: learn both. Understanding traditional media makes you a better digital artist, and vice versa. The skills are more transferable than you might think.'
    ]
  }
};

export default function JournalPost({ params }: { params: { slug: string } }) {
  const post = journalContent[params.slug] || {
    title: 'Post Not Found',
    date: '',
    category: '',
    readTime: '',
    image: '',
    content: ['This post is still being written...']
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-32">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/journal"
            className="inline-flex items-center text-[#ffd700] hover:underline mb-8"
          >
            ← Back to Journal
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="text-[#ffd700]">{post.category}</span>
              {post.date && (
                <>
                  <span>•</span>
                  <time>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time>
                </>
              )}
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {post.title}
            </h1>

            {post.image && (
              <div className="aspect-video bg-gray-900 border border-gray-800 mb-8 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-300 leading-relaxed text-lg">
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
                href="/journal"
                className="text-[#ffd700] hover:underline"
              >
                More posts →
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
