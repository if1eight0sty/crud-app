import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
};

export function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([
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
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      // Update existing blog
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id
            ? {
                ...blog,
                title,
                content,
                image,
                tags: tags.split(",").map((tag) => tag.trim()),
              }
            : blog
        )
      );
      setEditingBlog(null);
    } else {
      // Add new blog
      const newBlog: Blog = {
        id: Date.now().toString(),
        title,
        content,
        image,
        tags: tags.split(",").map((tag) => tag.trim()),
      };
      setBlogs([...blogs, newBlog]);
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage("");
    setTags("");
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.image);
    setTags(blog.tags.join(", "));
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <Card className="mb-8 md:w-1/2">
        <CardHeader>
          <CardTitle>{editingBlog ? "Edit Blog" : "Add New Blog"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>
            <Button type="submit">{editingBlog ? "Update" : "Add"} Blog</Button>
            {editingBlog && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingBlog(null);
                  resetForm();
                }}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <h2 className="mb-4 text-2xl font-bold">Your Blogs</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-600">
                  {blog.content.substring(0, 100)}...
                </p>
              </div>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{blog.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p>{blog.content}</p>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-48"
                      />
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
                    </div>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleEdit(blog)}>Edit</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your blog post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(blog.id)}>
                        Yes, delete blog
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
