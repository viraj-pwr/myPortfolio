import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1b1b1b] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
        <Link href="/#blogs" className="text-cyan-400 hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}

