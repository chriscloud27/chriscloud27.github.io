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
    return fallback ? { ...fallback, blocks: '<p>Content coming soon.</p>' } : null
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
