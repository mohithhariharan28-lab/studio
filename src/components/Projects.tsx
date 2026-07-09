import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, CodeXml } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const projects = [
  {
    title: "Smart Trolley System",
    description: "A futuristic retail solution using IoT for automated item tracking and real-time billing, optimizing efficiency.",
    image: PlaceHolderImages.find(img => img.id === "project-smart-trolley")?.imageUrl || "/certificates/smart.jpg",
    imageHint: "ai shopping cart",
    tags: ["IoT", "Python", "Real-time Processing"],
    codeUrl: "https://github.com/mohithhariharan28-lab/SMART-TROLLEY-SYSTEM"
  },
  {
    title: "Delhi Air Quality (AQI) Analysis",
    description: "Analyzed Delhi’s air pollution trends using Python with PM2.5 as a key AQI indicator. Focused on identifying dominant pollutants and seasonal patterns through data visualization.",
    image: PlaceHolderImages.find(img => img.id === "project-delhi-aqi")?.imageUrl || "/certificates/delhi.jpg",
    imageHint: "city smog",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    codeUrl: "https://github.com/mohithhariharan28-lab/Shadow-Fox-Internship"
  },
  {
    title: "Sales Data Analysis (Pavan Lawani Dataset)",
    description: "This project analyzes sales data to uncover trends, customer behavior, and business performance insights using Python and statistical analysis.",
    image: PlaceHolderImages.find(img => img.id === "project-sales-analysis")?.imageUrl || "/certificates/sales.jpg",
    imageHint: "sales chart",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    codeUrl: "https://github.com/mohithhariharan28-lab/codec-intern-DA"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold mb-16 flex items-center text-foreground">
          <span className="text-accent mr-3">/</span> Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Card key={index} className="glass-card group overflow-hidden flex flex-col border-white/5">
              <div className="relative h-56 overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 brightness-75 group-hover:brightness-100"
                  data-ai-hint={project.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <CodeXml className="h-5 w-5 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors text-foreground font-bold">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed text-md mb-6 line-clamp-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.15em] bg-white/5 text-secondary px-3 py-1 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pb-8">
                <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all rounded-xl py-6" asChild>
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" /> View Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <div className="glass-card rounded-xl flex items-center justify-center p-12 text-center border-dashed border-white/10 min-h-[400px]">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-white/5 rounded-full mx-auto flex items-center justify-center animate-pulse">
                <span className="text-4xl text-muted-foreground">+</span>
              </div>
              <p className="text-muted-foreground font-medium italic text-lg">More digital innovations incoming...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}