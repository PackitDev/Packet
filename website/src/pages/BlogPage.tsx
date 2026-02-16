import { Calendar, Clock, ArrowRight, TrendingUp, Code, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'Introducing Packet SDK: The Future of Full-Stack Development',
      excerpt: 'Learn how Packet SDK is revolutionizing the way developers build production-ready applications in minutes, not days.',
      date: 'Feb 10, 2026',
      readTime: '5 min read',
      category: 'Product',
      image: '/blog/intro.jpg',
      author: 'Creator',
      featured: true
    },
    {
      id: 2,
      title: 'From Idea to Production in 60 Seconds',
      excerpt: 'A step-by-step guide on how to go from zero to a deployed full-stack application using Packet SDK.',
      date: 'Feb 8, 2026',
      readTime: '8 min read',
      category: 'Tutorial',
      image: '/blog/quick-start.jpg',
      author: 'Alex Chen'
    },
    {
      id: 3,
      title: 'Why I Built Packet: The Story Behind the SDK',
      excerpt: 'The journey from frustration with existing tools to building the world\'s fastest SDK for modern developers.',
      date: 'Feb 5, 2026',
      readTime: '6 min read',
      category: 'Company',
      image: '/blog/story.jpg',
      author: 'Creator'
    },
    {
      id: 4,
      title: 'Authentication Made Simple: JWT, OAuth & More',
      excerpt: 'Deep dive into Packet SDK\'s built-in authentication system and how it handles security out of the box.',
      date: 'Feb 1, 2026',
      readTime: '10 min read',
      category: 'Technical',
      image: '/blog/auth.jpg',
      author: 'Mike Johnson'
    },
    {
      id: 5,
      title: 'Database Integration: PostgreSQL, MySQL, MongoDB & SQLite',
      excerpt: 'How Packet SDK provides type-safe database operations across multiple database engines with zero configuration.',
      date: 'Jan 28, 2026',
      readTime: '7 min read',
      category: 'Technical',
      image: '/blog/database.jpg',
      author: 'Alex Chen'
    },
    {
      id: 6,
      title: 'Deploy Anywhere: Vercel, AWS, Docker & More',
      excerpt: 'Exploring the one-click deployment options and how Packet SDK makes shipping to production effortless.',
      date: 'Jan 25, 2026',
      readTime: '9 min read',
      category: 'Tutorial',
      image: '/blog/deploy.jpg',
      author: 'Sarah Miller'
    }
  ]

  const categories = ['All', 'Product', 'Tutorial', 'Technical', 'Company']

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-pink-500/10 py-32">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <h1 className="text-huge font-black tracking-tighter">
              <span className="gradient-text">BLOG</span>
            </h1>
            <p className="text-2xl text-white/70 font-semibold uppercase tracking-wide max-w-3xl mx-auto">
              INSIGHTS, TUTORIALS, AND BETA UPDATES
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-black/50 backdrop-blur-sm border-y-2 border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, i) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-all ${
                  i === 0
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border-2 border-white/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-tight gradient-text mb-2">Featured Post</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-pink-500" />
          </motion.div>

          {posts.filter(post => post.featured).map(post => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-yellow-500/20 to-pink-500/20 flex items-center justify-center">
                  <TrendingUp className="w-32 h-32 text-yellow-400/50" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 font-semibold">By {post.author}</span>
                    <button className="flex items-center gap-2 text-yellow-400 font-bold uppercase text-sm group-hover:gap-4 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-gradient-to-b from-black to-yellow-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-black uppercase tracking-tight gradient-text mb-2">Latest Posts</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-pink-500" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.filter(post => !post.featured).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all group flex flex-col"
              >
                <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-pink-500/20 flex items-center justify-center">
                  {post.category === 'Tutorial' && <Code className="w-16 h-16 text-yellow-400/50" />}
                  {post.category === 'Technical' && <Rocket className="w-16 h-16 text-pink-400/50" />}
                  {post.category === 'Company' && <TrendingUp className="w-16 h-16 text-orange-400/50" />}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-white/60 text-xs">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white/60 text-sm font-semibold">By {post.author}</span>
                    <button className="flex items-center gap-2 text-yellow-400 font-bold uppercase text-xs group-hover:gap-3 transition-all">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black mb-6 tracking-tighter">
              <span className="gradient-text">STAY UPDATED</span>
            </h2>
            <p className="text-xl text-white/70 font-semibold uppercase tracking-wide mb-8">
              Get the latest posts delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white placeholder-white/50 font-semibold uppercase tracking-wide focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
              <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-8 py-4 rounded-full font-black uppercase tracking-wide hover:scale-105 transition-transform shadow-lg">
                Subscribe →
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
