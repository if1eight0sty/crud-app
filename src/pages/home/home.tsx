import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
};

const recentBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content:
      "React is a popular JavaScript library for building user interfaces...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "JavaScript", "Web Development"],
  },
  {
    id: "2",
    title: "The Power of Next.js",
    content:
      "Next.js is a React framework that enables server-side rendering...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Next.js", "React", "SSR"],
  },
  // Add more blog posts as needed
];

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="text-white bg-gradient-to-r from-purple-700 to-indigo-800">
        <div className="container flex flex-col items-center px-4 py-24 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Welcome to Our Blog
          </h1>
          <p className="max-w-2xl mb-8 text-xl md:text-2xl">
            Discover insightful articles, expert opinions, and the latest trends
            in technology and web development.
          </p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline" className="text-black">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-12 mx-auto">
          <h2 className="mb-8 text-3xl font-bold">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentBlogs.map((blog) => (
              <Card key={blog.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover w-full h-48 mb-4 rounded-md"
                  />
                  <p className="mb-2 text-sm text-gray-600">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read more
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-white bg-gray-800">
        <div className="container px-4 mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Our Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
