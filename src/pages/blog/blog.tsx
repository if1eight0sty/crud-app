import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, ClockIcon, TagIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

type Blog = {
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readingTime: number;
};

// This would typically come from an API or database
const blogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with React: A Comprehensive Guide for Beginners",
    content: `React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently. In this blog post, we'll cover the basics of React and how to set up your first React project.

    First, let's understand what React is and why it's so popular. React was developed by Facebook and is now used by many large companies and small startups alike. Its component-based architecture makes it easy to build complex UIs from small, isolated pieces of code.

    To get started with React, you'll need to have Node.js installed on your computer. Once you have Node.js, you can use create-react-app, a tool that sets up a new React project with a single command. Here's how you can do it:

    1. Open your terminal
    2. Run the following command: npx create-react-app my-first-react-app
    3. Once the installation is complete, navigate to your project folder: cd my-first-react-app
    4. Start your development server: npm start

    Congratulations! You've just created your first React application. The create-react-app tool sets up a development environment with everything you need to start building React applications.

    In the next part of this series, we'll dive deeper into React components, state management, and how to structure your React applications for scalability and maintainability. Stay tuned!`,
    image: "/placeholder.svg?height=400&width=800",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    author: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    publishDate: "2023-06-15",
    readingTime: 5,
  },
];

export function Blog() {
  const { id } = useParams();

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h1 className="mb-4 text-3xl font-bold">Blog post not found</h1>
        <p className="mb-4">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={blog.publishDate}>
              {new Date(blog.publishDate).toLocaleDateString()}
            </time>
            <span>•</span>
            <ClockIcon className="w-4 h-4" />
            <span>{blog.readingTime} min read</span>
          </div>
          <CardTitle className="text-3xl font-bold">{blog.title}</CardTitle>
          <CardDescription className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback>
                {blog.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span>By {blog.author.name}</span>
          </CardDescription>
        </CardHeader>
        <img
          src={blog.image}
          alt={blog.title}
          className="object-cover w-full h-64"
        />
        <CardContent className="pt-6 prose prose-lg max-w-none">
          {blog.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-6">
          <TagIcon className="w-5 h-5 text-muted-foreground" />
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </CardFooter>
      </Card>
      <div className="mt-8 text-center">
        <Button asChild>
          <Link to="/">Back to All Posts</Link>
        </Button>
      </div>
    </div>
  );
}
