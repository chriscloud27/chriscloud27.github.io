import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID ?? ''

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NotionBlogPost {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  published: boolean
}

export interface NotionBlogPostDetail extends NotionBlogPost {
  blocks: string // rendered HTML string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function richTextToPlain(rich: RichTextItemResponse[]): string {
  return rich.map((r) => r.plain_text).join('')
}

function richTextToHtml(rich: RichTextItemResponse[]): string {
  return rich
    .map((r) => {
      let text = r.plain_text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      if (r.annotations?.bold) text = `<strong>${text}</strong>`
      if (r.annotations?.italic) text = `<em>${text}</em>`
      if (r.annotations?.code) text = `<code>${text}</code>`
      if ('href' in r && r.href) text = `<a href="${r.href}">${text}</a>`
      return text
    })
    .join('')
}

function blocksToHtml(blocks: BlockObjectResponse[]): string {
  const lines: string[] = []

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph': {
        const text = richTextToHtml(block.paragraph.rich_text)
        if (text) lines.push(`<p>${text}</p>`)
        break
      }
      case 'heading_1': {
        const text = richTextToHtml(block.heading_1.rich_text)
        lines.push(`<h1>${text}</h1>`)
        break
      }
      case 'heading_2': {
        const text = richTextToHtml(block.heading_2.rich_text)
        lines.push(`<h2>${text}</h2>`)
        break
      }
      case 'heading_3': {
        const text = richTextToHtml(block.heading_3.rich_text)
        lines.push(`<h3>${text}</h3>`)
        break
      }
      case 'bulleted_list_item': {
        const text = richTextToHtml(block.bulleted_list_item.rich_text)
        lines.push(`<li>${text}</li>`)
        break
      }
      case 'numbered_list_item': {
        const text = richTextToHtml(block.numbered_list_item.rich_text)
        lines.push(`<li>${text}</li>`)
        break
      }
      case 'quote': {
        const text = richTextToHtml(block.quote.rich_text)
        lines.push(`<blockquote>${text}</blockquote>`)
        break
      }
      case 'code': {
        const text = block.code.rich_text.map((r) => r.plain_text).join('')
        const lang = block.code.language ?? ''
        lines.push(`<pre><code class="language-${lang}">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
        break
      }
      case 'divider': {
        lines.push('<hr />')
        break
      }
      default:
        break
    }
  }

  return lines.join('\n')
}

function pageToPost(page: PageObjectResponse): NotionBlogPost {
  const props = page.properties as Record<string, unknown>

  const titleProp = props['Title'] ?? props['Name']
  const title =
    titleProp && typeof titleProp === 'object' && 'title' in (titleProp as object)
      ? richTextToPlain((titleProp as { title: RichTextItemResponse[] }).title)
      : 'Untitled'

  const slugProp = props['Slug']
  const slug =
    slugProp && typeof slugProp === 'object' && 'rich_text' in (slugProp as object)
      ? richTextToPlain((slugProp as { rich_text: RichTextItemResponse[] }).rich_text)
      : page.id

  const dateProp = props['Date'] ?? props['Published']
  const date =
    dateProp && typeof dateProp === 'object' && 'date' in (dateProp as object)
      ? ((dateProp as { date: { start: string } | null }).date?.start ?? page.last_edited_time)
      : page.last_edited_time

  const excerptProp = props['Excerpt'] ?? props['Summary']
  const excerpt =
    excerptProp && typeof excerptProp === 'object' && 'rich_text' in (excerptProp as object)
      ? richTextToPlain((excerptProp as { rich_text: RichTextItemResponse[] }).rich_text)
      : ''

  const tagsProp = props['Tags']
  const tags =
    tagsProp && typeof tagsProp === 'object' && 'multi_select' in (tagsProp as object)
      ? (tagsProp as { multi_select: { name: string }[] }).multi_select.map((t) => t.name)
      : []

  const publishedProp = props['Published']
  const published =
    publishedProp && typeof publishedProp === 'object' && 'checkbox' in (publishedProp as object)
      ? (publishedProp as { checkbox: boolean }).checkbox
      : true

  return { id: page.id, slug, title, date, excerpt, tags, published }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Fetch all published blog posts from Notion. Revalidate every hour. */
export async function getBlogPosts(): Promise<NotionBlogPost[]> {
  if (!DATABASE_ID) return FALLBACK_POSTS

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    })

    return (response.results as PageObjectResponse[]).map(pageToPost)
  } catch (err) {
    console.error('[Notion] Failed to fetch posts:', err)
    return FALLBACK_POSTS
  }
}

/** Fetch a single blog post with rendered HTML content. */
export async function getBlogPost(slug: string): Promise<NotionBlogPostDetail | null> {
  if (!DATABASE_ID) {
    const fallback = FALLBACK_POSTS.find((p) => p.slug === slug)
    if (!fallback) return null
    
    // Return fallback content for demonstration
    const fallbackContent: Record<string, string> = {
      'ai-native-platform-design': `
        <p>Most teams add AI features on top of existing platforms. But this approach creates compounding complexity:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>Existing data pipelines aren't optimized for ML workloads</li>
          <li>Compute patterns differ fundamentally (batch vs. real-time inference)</li>
          <li>Cost models break when you layer AI on legacy infrastructure</li>
        </ul>
        <p><strong>AI-native architecture</strong> designs the entire system around AI from day one:</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Data Flow</h3>
        <p>Stream-first design. Your core pipeline assumes continuous feature computation, not batch imports. This means Kafka, Flink, or managed streaming services from the start—not a retrofit.</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Compute Patterns</h3>
        <p>GPU-native workloads. Training and inference infrastructure is tightly coupled—not separate concerns. Inference happens at the edge when possible, training happens asynchronously against a live feature store.</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Cost Model</h3>
        <p>Infrastructure costs scale with inference volume, not request count. You pay for compute utilization, not API calls. This changes how you think about caching, batching, and request patterns.</p>
        <p style="margin-top: 24px;"><em>When is this worth it? When your product is fundamentally built on predictions—search ranking, personalization, fraud detection, recommendation systems. Not for teams adding a chatbot to an e-commerce platform.</em></p>
      `,
      'baas-vs-custom-infra': `
        <p>The most overrated infrastructure decision is choosing between BaaS and custom infrastructure as if it's permanent.</p>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Why BaaS Wins Early</h3>
        <p>In your first 18 months, you need to validate product-market fit, not manage Kubernetes. BaaS gives you:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>Faster iteration (no ops)</li>
          <li>Predictable scaling (up to a limit)</li>
          <li>Audit logs and compliance baked in</li>
        </ul>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">Where Custom Infra Becomes Cheaper</h3>
        <p>Around Series A scale, your bill hits ~$50-100K/month. At that point, moving to Kubernetes or ECS saves 30-40% compared to BaaS pricing. But only if:</p>
        <ul style="margin: 16px 0; padding-left: 24px;">
          <li>You have infrastructure expertise on staff</li>
          <li>Your scaling patterns are predictable</li>
          <li>You've actually hit the limits of the BaaS platform</li>
        </ul>
        <h3 style="margin-top: 24px; margin-bottom: 12px;">The Architecture That Actually Works</h3>
        <p>Hybrid approach: Core API on BaaS (Amplify, Firebase). Async jobs and batch workloads on managed Kubernetes. Feature flags to swap implementations. This lets you grow without a rip-and-replace migration.</p>
      `,
    }
    
    return { 
      ...fallback, 
      blocks: fallbackContent[slug] || '<p>Content coming soon.</p>'
    }
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: { equals: slug },
      },
    })

    const page = response.results[0] as PageObjectResponse | undefined
    if (!page) return null

    const post = pageToPost(page)
    const blocksResponse = await notion.blocks.children.list({ block_id: page.id })
    const blocks = blocksToHtml(blocksResponse.results as BlockObjectResponse[])

    return { ...post, blocks }
  } catch (err) {
    console.error('[Notion] Failed to fetch post:', err)
    return null
  }
}

/** Return slugs for generateStaticParams. */
export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts()
  return posts.map((p) => p.slug)
}

// ---------------------------------------------------------------------------
// Fallback data (shown when Notion env vars are not configured)
// ---------------------------------------------------------------------------
const FALLBACK_POSTS: NotionBlogPost[] = [
  {
    id: '1',
    slug: 'ai-native-platform-design',
    title: 'What "AI-Native" Actually Means for Your Platform Architecture',
    date: '2026-03-01',
    excerpt:
      'Most teams add AI features on top of existing platforms. AI-native means designing the platform around AI workloads from the start — different data flows, different compute patterns, different cost models.',
    tags: ['AI-Native', 'Architecture', 'Platform Design'],
    published: true,
  },
  {
    id: '2',
    slug: 'baas-vs-custom-infra',
    title: 'BaaS vs Custom Infrastructure: When to Choose Each',
    date: '2026-02-15',
    excerpt:
      'Backend-as-a-Service accelerates early-stage velocity. Custom infrastructure gives you control at scale. The key is knowing when to switch — and how to architect for that transition from day one.',
    tags: ['BaaS', 'AWS Amplify', 'Startup Architecture'],
    published: true,
  },
]
