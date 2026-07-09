import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary/40 selection:text-white">
      <Navigation />
      
      <div className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
      
      <footer className="py-20 border-t border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-3xl font-black text-gradient mb-8">Mohith<span className="text-foreground">.</span></p>
          <div className="flex justify-center space-x-12 mb-10">
            <a href="https://linkedin.com/in/mohith-hariharan-514345373" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-all font-bold tracking-widest uppercase text-xs">LinkedIn</a>
            <a href="mailto:mohithhariharan28@gmail.com" className="text-muted-foreground hover:text-secondary transition-all font-bold tracking-widest uppercase text-xs">Email</a>
          </div>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.5em] font-medium">
            © {new Date().getFullYear()} MOHITH HARIHARAN V
            <br />
            <span className="mt-2 block">Engineered with AI & Future-Ready Tech</span>
          </p>
        </div>
      </footer>
      
      <Toaster />
    </main>
  );
}