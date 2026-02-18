import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Pause,
  Play,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sanityClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (src: any) => builder.image(src).width(1200).url();

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

function PostModal({
  post,
  triggerContent,
}: {
  post: Post;
  triggerContent: React.ReactNode;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

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
        ?.map((b: any) => (b.children ? b.children.map((c: any) => c.text).join(" ") : ""))
        .join(" ")}
    `;

    const utterance = new SpeechSynthesisUtterance(plainText);

    const femaleVoice =
      availableVoices.find(v => v.name.includes("Google UK English Female")) ||
      availableVoices.find(v => v.name.includes("Google US English Female")) ||
      availableVoices.find(v => v.name.includes("Microsoft Zira")) ||
      availableVoices.find(v => v.name === "Samantha") ||
      availableVoices[0];

    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.cancel();
    setTimeout(() => window.speechSynthesis.speak(utterance), 150);
  };

  return (
    <Dialog onOpenChange={(open) => !open && window.speechSynthesis.cancel()}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{triggerContent}</div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl h-[85vh] md:h-auto md:max-h-[90vh] overflow-y-auto p-0 rounded-t-[2rem] md:rounded-[2.5rem] border-none shadow-2xl custom-scrollbar">
        <div className="relative">
          <div className="absolute top-4 right-14 z-50">
            <Button
              onClick={toggleSpeech}
              size="icon"
              className={`rounded-full shadow-lg transition-all duration-300 ${isSpeaking ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-primary hover:scale-110"
                }`}
            >
              {isSpeaking ? <Pause className="text-white" /> : <Play className="text-white" />}
            </Button>
          </div>

          <div className="w-full h-48 md:h-96 relative">
            <img src={urlFor(post.image)} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <div className="px-4 md:px-12 pb-10 -mt-12 md:-mt-20 relative z-10">
            <div className="bg-background rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl border border-border/50">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <Badge className="bg-primary text-[10px] md:text-xs">{post.category}</Badge>
                  <div className="flex items-center gap-2 text-[10px] md:text-sm text-muted-foreground">
                    <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {isSpeaking && (
                  <div className="flex gap-1 items-end h-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 16, 4] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-1 bg-primary rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>

              <DialogTitle className="text-2xl md:text-5xl font-display font-bold mb-6 md:mb-8 leading-tight">
                {post.title}
              </DialogTitle>

              <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="text-base md:text-xl font-medium text-foreground mb-4 md:mb-6 leading-relaxed italic border-l-4 border-primary pl-4">
                  {post.excerpt}
                </p>
                <Separator className="my-6 md:my-8" />
                <PortableText value={post.content} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="blog"] | order(date desc){
          _id, title, category, date, author, image, excerpt, content
        }`
      )
      .then(setPosts)
      .finally(() => setIsLoading(false));
  }, []);

  // 1. Separate logic: 
  // featuredPost is ALWAYS the first one.
  // gridPosts are the rest (slice(1)).
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  // 2. Extract categories from the entire list
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];

  // 3. Filter ONLY the grid posts
  const filteredGridPosts = selectedCategory === "All"
    ? gridPosts
    : gridPosts.filter(post => post.category === selectedCategory);

  if (isLoading) {
  return (
    <div className="container-padding py-20">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Featured Skeleton */}
        <div className="animate-pulse grid lg:grid-cols-2 gap-10 items-center">
          <div className="w-full h-64 bg-muted rounded-[2.5rem]" />
          <div className="space-y-6">
            <div className="h-6 w-24 bg-muted rounded-full" />
            <div className="h-10 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="w-full h-48 bg-muted rounded-3xl" />
              <div className="h-4 w-24 bg-muted rounded-full" />
              <div className="h-6 w-3/4 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



  return (
    <PageTransition>
      <div className="container-padding py-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              Practical <span className="text-primary">Insights</span>
            </h1>
          </div>

          {/* Featured Post (Fixed) */}
          {featuredPost && (
            <PostModal
              post={featuredPost}
              triggerContent={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative mb-24"
                >
                  <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div className="overflow-hidden rounded-[2.5rem] bg-muted">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={urlFor(featuredPost.image)}
                          alt={featuredPost.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                      </AspectRatio>
                    </div>
                    <div className="space-y-6">
                      <Badge className="bg-primary">Featured</Badge>
                      <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-lg text-muted-foreground">{featuredPost.excerpt}</p>
                      <Button variant="ghost" className="p-0 text-lg font-bold hover:bg-transparent hover:text-primary gap-2">
                        Read Featured Story <ArrowUpRight size={20} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              }
            />
          )}

          <Separator className="mb-12 opacity-50" />
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">

            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span className="text-xl font-medium">Filter By:</span>
            </div>

            {/* ✅ MOBILE: Centered Dropdown */}
            <div className="block md:hidden w-full">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>

                {/* 1. Added 'justify-center' to center the text inside the button */}
                <SelectTrigger className="w-full h-12 rounded-full bg-background text-base px-4 justify-center text-center">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    /* 2. Added 'justify-center' to center the options in the list */
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-base py-3 justify-center text-center cursor-pointer"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* DESKTOP: Buttons */}
            <div className="hidden md:flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === cat
                      ? "shadow-md hover:opacity-90"
                      : "hover:border-primary/50 bg-background"
                    }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>



          {/* Blog Grid (Filtered) */}
          <div className="grid md:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredGridPosts.length > 0 ? (
                filteredGridPosts.map((post, idx) => (
                  <PostModal
                    key={post._id}
                    post={post}
                    triggerContent={
                      <motion.article
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="group flex flex-col h-full"
                      >
                        <div className="mb-6 overflow-hidden rounded-3xl bg-muted shadow-lg">
                          <AspectRatio ratio={4 / 3}>
                            <img
                              src={urlFor(post.image)}
                              alt={post.title}
                              className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-primary border-primary/20">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
                          <span className="text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read Story <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </motion.article>
                    }
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                  <p className="text-xl">No older posts found in this category.</p>
                  <Button
                    variant="link"
                    onClick={() => setSelectedCategory("All")}
                    className="mt-4 text-primary"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}