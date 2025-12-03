import { notFound } from "next/navigation";
import { getBlogBySlug, blogs } from "../../data/blogs";
import BlogContent from "./BlogContent";

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogContent blog={blog} />;
}
