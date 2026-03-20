import Link from "next/link";
import { getBlogPost } from "@/lib/notion";

export async function RelatedArticles({ slugs }: { slugs: string[] }) {
  if (!slugs || slugs.length === 0) {
    return null;
  }

  try {
    const posts = await Promise.all(
      slugs.map((slug) =>
        getBlogPost(slug).then((post) => ({
          slug,
          title: post?.title || slug,
        })),
      ),
    );

    const validPosts = posts.filter((p) => p.title);

    if (validPosts.length === 0) {
      return null;
    }

    return (
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-4">Related articles:</p>
        <ul className="space-y-2">
          {validPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-electric-cyan hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (err) {
    console.error("Failed to load related articles:", err);
    return null;
  }
}
