"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Eye } from "lucide-react";

const experiences = [
  {
    role: "Data Science Intern",
    company: "RINEX",
    period: "May – July 2025",
    description: "Architected data-driven models to analyze student performance metrics. Leveraged advanced Python libraries and predictive analytics to transform raw educational datasets into strategic insights.",
    tags: ["Python", "Data Visualization", "Analysis"],
    certificateImage: "/certificates/rinex.jpg"
  },
  {
    role: "AI Sustainability Virtual Intern",
    company: "1M1B",
    period: "Dec 2025 – Jan 2026",
    description: "Developed an intelligent waste segregation platform using Computer Vision. Orchestrated RAG-based systems to promote environmental sustainability through automated digital innovation.",
    tags: ["Computer Vision", "RAG", "Sustainability"],
    certificateImage: "/certificates/internship.jpg"
  }
];

export function Experience() {
  const handleViewCertificate = (title: string, image: string, provider: string) => {
    const event = new CustomEvent("open-certificate", {
      detail: { title, image, provider }
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold mb-16 flex items-center text-foreground">
          <span className="text-secondary mr-3">/</span> Experience
        </h3>

        <div className="space-y-12 max-w-4xl relative">
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-primary via-secondary to-transparent ml-[-1px] opacity-20" />
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12 group">
              <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all group-hover:scale-150" />
              <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-20" />
              
              <Card className="glass-card border-white/5 overflow-hidden transform-gpu transition-all duration-500 hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-2xl text-foreground font-bold flex items-center group-hover:text-primary transition-colors">
                      <Briefcase className="mr-3 h-6 w-6 text-primary" />
                      {exp.role}
                    </CardTitle>
                    <div className="flex items-center text-secondary text-[10px] font-black uppercase tracking-[0.2em] bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20 whitespace-nowrap">
                      <Calendar className="mr-2 h-4 w-4" />
                      {exp.period}
                    </div>
                  </div>
                  <CardDescription className="text-xl font-medium text-white/70 mt-2">
                    {exp.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {exp.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex flex-wrap gap-3">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-[0.15em] text-primary bg-primary/10 px-4 py-1.5 rounded-lg border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleViewCertificate(exp.role, exp.certificateImage, exp.company)}
                      className="text-xs px-4 py-2 h-auto rounded-full bg-gradient-to-r from-primary to-secondary text-white border-0 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105"
                    >
                      <Eye className="mr-2 h-3.5 w-3.5" />
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
