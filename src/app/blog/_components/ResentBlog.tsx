import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Choosing the Talent Badger",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus, elit nibh et mi, pellentesque sollicitudin facilisis at. Aliquam proin sem viverra vitam lectus sed non.",
    date: "14 August, 2025",
    readTime: "12 min read",
    image: "/resentBlog1.jpg",
  },
  {
    id: 2,
    title: "Choosing the Talent Badger",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus, elit nibh et mi, pellentesque sollicitudin facilisis at. Aliquam proin sem viverra vitam lectus sed non.",
    date: "14 August, 2025",
    readTime: "13 min read",
    image: "/resentBlog1.jpg",
  },
  {
    id: 3,
    title: "Choosing the Talent Badger",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus, elit nibh et mi, pellentesque sollicitudin facilisis at. Aliquam proin sem viverra vitam lectus sed non.",
    date: "14 August, 2025",
    readTime: "13 min read",
    image: "/resentBlog1.jpg",
  },
];

export default function RecentBlogPosts() {
  return (
    <section className="w-full container mx-auto  py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Recent Blog Posts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Large featured post */}
        <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 lg:row-span-2">
          <div className="relative h-64 sm:h-72 lg:h-80">
            <Image
              src={blogPosts[0].image || "/placeholder.svg"}
              alt={blogPosts[0].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{blogPosts[0].date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{blogPosts[0].readTime}</span>
              </div>
            </div>
            <h2 className="text-[18px] font-medium text-[#191D23] mb-3">
              {blogPosts[0].title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {blogPosts[0].excerpt}
            </p>
            <a
              href="#"
              className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
            >
              Read More
            </a>
          </div>
        </article>

        {/* Two smaller posts */}
        {blogPosts.slice(1).map((post) => (
          <div key={post.id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col sm:flex-row">
              {/* Image */}
              <div className="w-full sm:w-[236px] h-[180px] sm:h-auto overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={900}
                  height={700}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between">
                <div className="flex items-center gap-4 text-sm mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8E938F]" />
                    <span className="text-[#8E938F] font-normal text-[12px]">
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#8E938F]" />
                    <span className="text-[#8E938F] font-normal text-[12px]">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-[#191D23] font-medium text-[18px] mb-2">
                    {post.title}
                  </h2>
                  <p className="text-[#68706A] font-normal text-[14px] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
