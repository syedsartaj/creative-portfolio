import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getSmakslyBlogs, formatBlogDate, SmakslyBlog } from '@/lib/smaksly-blogs';

export const dynamic = 'force-dynamic'
export const revalidate = 0

function transformSmakslyBlogToPost(blog: SmakslyBlog) {
  const excerpt = blog.body
    .replace(/<[^>]*>/g, '')
    .substring(0, 150) + '...'

  return {
    slug: blog.slug,
    title: blog.title,
    excerpt,
    date: blog.publish_date,
    category: blog.category || 'Uncategorized',
    image: blog.image_url || '/images/blog/default.jpg'
  }
}

export default async function BlogPage() {
  const smakslyBlogs = await getSmakslyBlogs()
  const blogPosts = smakslyBlogs.map(transformSmakslyBlogToPost)
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
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
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
                      <time>{formatBlogDate(post.date)}</time>
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No blog posts available yet.</p>
              <p className="text-gray-600 mt-2">Check back soon for new content!</p>
            </div>
          )}
        </div>

        {blogPosts.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-gray-500">More posts coming soon...</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
