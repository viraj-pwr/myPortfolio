"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Blog } from "../../data/blogs";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1b1b1b]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <Link 
            href="/#blogs" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Blog Content */}
      <main className="pt-24 pb-20 px-6">
        <article className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className={`h-64 rounded-2xl bg-gradient-to-br ${blog.gradient} flex items-center justify-center mb-8`}>
            <span className="text-8xl">{blog.emoji}</span>
          </div>

          {/* Meta Info */}
          <div className="mb-8">
            <span className={`text-sm ${blog.categoryColor} mb-2 block`}>{blog.category}</span>
            <h1 className="font-poppins font-bold text-white text-4xl md:text-5xl mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <span>{blog.readTime}</span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-white/80 mb-12 font-poppins leading-relaxed border-l-4 border-cyan-400 pl-6">
            {blog.description}
          </p>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-poppins text-3xl font-bold text-white mb-6 mt-12 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-poppins text-2xl font-semibold text-cyan-400 mb-4 mt-10">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-poppins text-xl font-medium text-white mb-3 mt-8">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-white/80 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-white/80 my-4 space-y-2 ml-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-white/80 my-4 space-y-2 ml-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-white/80">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-white/90 italic">
                    {children}
                  </em>
                ),
                code: ({ className, children }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-white/10 px-2 py-1 rounded text-cyan-400 text-sm font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="text-cyan-300 font-mono text-sm">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[#0d0d0d] border border-white/10 rounded-xl p-6 overflow-x-auto my-6">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-cyan-400 pl-6 my-6 text-white/70 italic">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-cyan-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="border-white/20 my-8" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-white/20 rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="bg-white/10 px-4 py-2 text-left text-white font-semibold border-b border-white/20">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-white/80 border-b border-white/10">
                    {children}
                  </td>
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link 
              href="/#blogs" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to all blogs
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}

