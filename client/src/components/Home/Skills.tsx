import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowUpRight,
  Calendar,
  Loader2,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sanityClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

// --- Sanity Configuration ---
const builder = imageUrlBuilder(sanityClient);
const urlFor = (src: any) => builder.image(src).width(800).url(); // Optimized width for cards

// --- Types ---
type Post = {
  _id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: any;
  excerpt: string;
  content: any[];
};

// --- Reusable Post Modal (Same as your Blog page) ---
function PostModal({
  post,
  triggerContent,
}: {
  post: Post;
  triggerContent: React.ReactNode;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>(
    []
  );

  useEffect(() => {
    const loadVoices = () => {
      setAvailableVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const plainText = `
      ${post.title}.
      ${post.excerpt}.
      ${post.content
        ?.map((b: any) =>
          b.children ? b.children.map((c: any) => c.text).join(" ") : ""
        )
        .join(" ")}
    `;

    const utterance = new SpeechSynthesisUtterance(plainText);
    const femaleVoice =
      availableVoices.find((v) => v.name.includes("Google UK English Female")) ||
      availableVoices[0];

    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.cancel();
    setTimeout(() => window.speechSynthesis.speak(utterance), 150);
  };

  return (
    <Dialog onOpenChange={(open) => !open && window.speechSynthesis.cancel()}>
      <DialogTrigger asChild>
        <div className="cursor-pointer h-full">{triggerContent}</div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[85vh] md:h-auto md:max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-none shadow-2xl custom-scrollbar">
        <div className="relative">
          <div className="absolute top-4 right-14 z-50">
            <Button
              onClick={toggleSpeech}
              size="icon"
              className={`rounded-full shadow-lg transition-all duration-300 ${
                isSpeaking
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-primary hover:scale-110"
              }`}
            >
              {isSpeaking ? (
                <Pause className="text-white" />
              ) : (
                <Play className="text-white" />
              )}
            </Button>
          </div>
          <div className="w-full h-56 md:h-80 relative">
            <img
              src={urlFor(post.image)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="p-6 md:p-10">
            <Badge className="mb-4">{post.category}</Badge>
            <DialogTitle className="text-3xl font-bold mb-4">
              {post.title}
            </DialogTitle>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              <PortableText value={post.content} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Main Section Component ---
export default function InsightsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch only the latest 3 posts for the section
    sanityClient
      .fetch(
        `*[_type=="blog"] | order(date desc)[0...3]{
          _id, title, category, date, author, image, excerpt, content
        }`
      )
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 flex justify-center">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Read our Latest Insights
            </h2>
            <p className="text-muted-foreground max-w-lg text-lg">
              Explore the latest trends, strategies, and stories from our team.
            </p>
          </div>
          
          <Button asChild size="lg" variant="outline" className="group">
            <Link href="/blog">
              More Blogs 
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <PostModal
                post={post}
                triggerContent={
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden flex flex-col">
                    {/* Image Area */}
                    <div className="relative w-full h-56 overflow-hidden">
                      <img
                        src={urlFor(post.image)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Area */}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <CardDescription className="line-clamp-3 text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>

                    <CardFooter className="pt-0 pb-6">
                      <div className="text-sm font-medium text-primary flex items-center gap-1 group/link">
                        Read Article
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </div>
                    </CardFooter>
                  </Card>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}