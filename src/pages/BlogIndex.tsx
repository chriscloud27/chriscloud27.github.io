import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import type { BlogPost } from '../types'

/** Placeholder blog posts — replace with real content or a CMS integration */
const POSTS: BlogPost[] = [
  {
    slug: 'ai-native-platform-design',
    title: 'What "AI-Native" Actually Means for Your Platform Architecture',
    date: '2026-03-01',
    excerpt:
      'Most teams add AI features on top of existing platforms. AI-native means designing the platform around AI workloads from the start — different data flows, different compute patterns, different cost models.',
    tags: ['AI-Native', 'Architecture', 'Platform Design'],
  },
  {
    slug: 'baas-vs-custom-infra',
    title: 'BaaS vs Custom Infrastructure: When to Choose Each',
    date: '2026-02-15',
    excerpt:
      'Backend-as-a-Service accelerates early-stage velocity. Custom infrastructure gives you control at scale. The key is knowing when to switch — and how to architect for that transition from day one.',
    tags: ['BaaS', 'AWS Amplify', 'Startup Architecture'],
  },
]

export default function BlogIndex() {
  useEffect(() => {
    document.title = 'Blog — Christian Weber · AI-Native Cloud Architect'
  }, [])

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 'var(--nav)' }}>
        <section style={{ padding: '80px 0 120px', minHeight: '80vh' }}>
          <div className="wrap">
            <div className="eyebrow">Blog</div>
            <h1>Architecture<br /><em>Thinking</em></h1>
            <p className="hero-sub" style={{ marginTop: '24px' }}>
              Practical writing on cloud architecture, AI-native platform design, and
              engineering leadership for growth-stage SaaS companies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '52px' }}>
              {POSTS.map((post) => (
                <article
                  key={post.slug}
                  style={{
                    background: 'rgba(255,255,255,.02)',
                    border: '1px solid rgba(255,255,255,.06)',
                    borderRadius: '8px',
                    padding: '28px',
                    transition: 'border-color .25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(0,229,255,.22)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)')}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '.08em' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3 style={{ marginTop: '10px', marginBottom: '12px' }}>{post.title}</h3>
                  <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.72, color: 'var(--g500)', marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <div className="tags">
                    {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>

            <p style={{ marginTop: '52px', fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--g700)', textAlign: 'center' }}>
              More posts coming soon.{' '}
              <Link to="/#connect" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
                Subscribe via email →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
