import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getSmakslyBlogBySlug, formatBlogDate, estimateReadTime } from '@/lib/smaksly-blogs';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getSmakslyBlogBySlug(params.slug);

  if (!blog) {
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
            <div className="text-center py-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Post Not Found</h1>
              <p className="text-gray-400 mb-8">This blog post does not exist or is still being written.</p>
              <Link href="/blog" className="text-[#ffd700] hover:underline">
                Browse all posts →
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  const post = {
    title: blog.title,
    date: formatBlogDate(blog.publish_date),
    category: blog.category || 'Uncategorized',
    readTime: estimateReadTime(blog.body),
    content: blog.body,
    image: blog.image_url
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
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {post.title}
            </h1>

            {post.image && (
              <div className="aspect-video bg-gray-900 border border-gray-800 mb-8 flex items-center justify-center text-gray-700">
                [Featured Image]
              </div>
            )}
          </header>

          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#ffd700] prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
