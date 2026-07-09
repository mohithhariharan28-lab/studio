"use client";

import { useState, useEffect, useRef } from "react";
import { GraduationCap, Award, Eye, Download, X, Calendar, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

const educationData = [
  {
    degree: "B.Tech CSE (Business Systems)",
    institution: "Panimalar Engineering College",
    period: "2024 – Present",
    score: "Currently Pursuing",
    location: "Chennai, India"
  },
  {
    degree: "HSC (Class XII)",
    institution: "Everwin Matriculation School",
    period: "2024",
    score: "Completed",
    location: "Chennai, India"
  },
  {
    degree: "SSLC (Class X)",
    institution: "Everwin Matriculation School",
    period: "2022",
    score: "Completed",
    location: "Chennai, India"
  }
];

const certificationsData = [
  { 
    title: "Employability Skills - JobReady", 
    provider: "Wadhwani Foundation",
    image: "/certificates/wadhwani.jpg",
    date: "2024"
  },
  { 
    title: "Exploratory Data Analysis", 
    provider: "NASSCOM",
    image: "/certificates/nasscom.jpg",
    date: "2024"
  },
  { 
    title: "Introduction to Generative AI", 
    provider: "Gemini / Google",
    image: "/certificates/gemini.jpg",
    date: "2024"
  },
  { 
    title: "Data Visualization with Python", 
    provider: "IBM SkillsBuild",
    image: "/certificates/ibm.jpg",
    date: "2024"
  },
  // Hidden items used by events
  { 
    title: "Resume", 
    provider: "Professional Profile",
    image: "/certificates/resume.jpg",
    date: "2025"
  }
];

function TimelineNode({ active }: { active: boolean }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
      <div className={cn(
        "w-4 h-4 rounded-full border-2 transition-all duration-500",
        active 
          ? "bg-primary border-primary shadow-[0_0_20px_rgba(139,92,246,0.8)] scale-125" 
          : "bg-background border-muted-foreground/30 scale-100"
      )} />
      {active && (
        <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-40" />
      )}
    </div>
  );
}

export function Education() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [activeEduIndex, setActiveEduIndex] = useState(-1);
  const [activeCertIndex, setActiveCertIndex] = useState(-1);
  
  const eduRefs = useRef<(HTMLDivElement | null)[]>([]);
  const certRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleOpenResume = () => {
      const resume = certificationsData.find(c => c.title === "Resume");
      if (resume) setSelectedCert(resume);
    };

    const handleOpenCert = (e: any) => {
      setSelectedCert(e.detail);
    };

    window.addEventListener("open-resume", handleOpenResume);
    window.addEventListener("open-certificate", handleOpenCert);
    return () => {
      window.removeEventListener("open-resume", handleOpenResume);
      window.removeEventListener("open-certificate", handleOpenCert);
    };
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.6 };

    const eduObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = eduRefs.current.indexOf(entry.target as HTMLDivElement);
          setActiveEduIndex(index);
        }
      });
    }, observerOptions);

    const certObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = certRefs.current.indexOf(entry.target as HTMLDivElement);
          setActiveCertIndex(index);
        }
      });
    }, observerOptions);

    eduRefs.current.forEach((ref) => ref && eduObserver.observe(ref));
    certRefs.current.forEach((ref) => ref && certObserver.observe(ref));

    return () => {
      eduObserver.disconnect();
      certObserver.disconnect();
    };
  }, []);

  // Filter out the Resume and Internships from the visible Credentials timeline
  const visibleCertifications = certificationsData.filter(c => c.title !== "Resume");

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Education Timeline */}
        <div className="mb-40">
          <h3 className="text-4xl font-bold mb-20 flex items-center text-foreground">
            <span className="text-primary mr-3">/</span> Academic Path
          </h3>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block opacity-20" />
            
            <div className="space-y-24">
              {educationData.map((edu, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { eduRefs.current[idx] = el; }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center w-full opacity-0 translate-y-10 transition-all duration-700 delay-100",
                    activeEduIndex >= idx && "opacity-100 translate-y-0"
                  )}
                >
                  <TimelineNode active={activeEduIndex === idx} />

                  <div className={cn(
                    "w-full md:w-1/2 flex",
                    idx % 2 !== 0 
                      ? "md:justify-start md:pl-16 md:ml-auto"
                      : "md:justify-end md:pr-16 md:mr-auto"
                  )}>
                    <div className="glass-card p-8 rounded-3xl border-white/5 w-full max-w-lg hover:scale-[1.02] transition-transform group">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <GraduationCap className="text-primary h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {edu.degree}
                          </h4>
                          <p className="text-muted-foreground font-medium mt-1">{edu.institution}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary/80">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent/80">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Status</span>
                        <p className="text-sm font-bold text-foreground mt-1">{edu.score}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Timeline */}
        <div>
          <h3 className="text-4xl font-bold mb-20 flex items-center text-foreground">
            <span className="text-accent mr-3">/</span> Credentials
          </h3>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-secondary to-transparent opacity-20" />
            
            <div className="space-y-12">
              {visibleCertifications.map((cert, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { certRefs.current[idx] = el; }}
                  className={cn(
                    "relative pl-12 md:pl-24 opacity-0 translate-x-10 transition-all duration-700",
                    activeCertIndex >= idx && "opacity-100 translate-x-0"
                  )}
                >
                  <div className={cn(
                    "absolute left-[13px] md:left-[29px] top-8 w-2.5 h-2.5 rounded-full border transition-all duration-500",
                    activeCertIndex === idx 
                      ? "bg-accent border-accent shadow-[0_0_15px_rgba(244,114,182,0.8)] scale-125" 
                      : "bg-background border-muted-foreground/30 scale-100"
                  )} />

                  <div className="glass-card group p-6 rounded-2xl border-white/5 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-all">
                    <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 group-hover:bg-accent/20 transition-all shrink-0">
                      <Award className="text-accent h-8 w-8" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                        {cert.title}
                      </h4>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                          {cert.provider}
                        </span>
                        {cert.date && (
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">
                            Issued {cert.date}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedCert(cert)}
                      className="text-xs px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white border-0 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-5xl h-fit max-h-[90vh] p-0 bg-background/60 backdrop-blur-3xl border-white/10 overflow-hidden shadow-2xl flex flex-col rounded-3xl">
          <DialogHeader className="p-6 bg-white/5 border-b border-white/10 flex-row items-center justify-between space-y-0 shrink-0">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-4">
              {selectedCert?.title === "Resume" ? (
                <FileText className="text-primary h-7 w-7" />
              ) : (
                <Award className="text-primary h-7 w-7" />
              )}
              {selectedCert?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative flex-1 bg-black/60 p-10 overflow-auto flex items-center justify-center min-h-[400px]">
            {selectedCert && (
              <div className="relative w-full aspect-[1.414/1] shadow-2xl rounded-xl overflow-hidden border border-white/10 bg-white group">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between gap-6 shrink-0">
            <p className="text-sm text-muted-foreground font-semibold italic">
              {selectedCert?.title === "Resume" ? "Official Document" : `Verified by ${selectedCert?.provider}`}
            </p>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="h-12 bg-white/5 hover:bg-primary border-white/10 text-foreground hover:text-white px-8 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!selectedCert) return;
                  const link = document.createElement('a');
                  link.href = selectedCert.image;
                  link.download = `${selectedCert.title.replace(/\s+/g, '_')}_Mohith.jpg`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download {selectedCert?.title === "Resume" ? "Resume" : "PDF"}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-xl text-muted-foreground hover:text-white hover:bg-white/10"
                onClick={() => setSelectedCert(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
