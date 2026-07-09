"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

export function Hero() {
  const [text, setText] = useState("");
  const fullText = "Mohith Hariharan V";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const handleViewResume = () => {
    // Dispatch custom event that Education.tsx listens for
    const event = new CustomEvent("open-resume");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleType = () => {
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center animate-float">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-foreground">
          I&apos;m <span className="text-gradient typing-cursor">{text}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          Aspiring <span className="text-secondary font-semibold">Data Scientist</span> | 
          AI Enthusiast | Futuristic Solver
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <a href="#projects">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white group px-10 py-7 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:scale-105 active:scale-95">
              View Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={handleViewResume}
            className="border-white/10 bg-white/5 backdrop-blur-md text-foreground hover:bg-white/10 px-10 py-7 rounded-full transition-all hover:scale-105"
          >
            <Eye className="mr-2 h-5 w-5" />
            View Resume
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
        </div>
      </div>
    </section>
  );
}
