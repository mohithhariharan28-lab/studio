import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function About() {
  const highlightSkills = ["C", "C++", "Python", "AI Tools", "Business Strategy"];

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h3 className="text-4xl font-bold mb-8 flex items-center text-foreground">
              <span className="text-primary mr-3">/</span> About Me
            </h3>
            <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
              <p>
                I am a motivated 2nd-year B.Tech student in 
                <span className="text-secondary font-medium"> Computer Science & Business Systems</span> at Panimalar Engineering College, Chennai. 
              </p>
              <p>
                I blend technical prowess with business strategy to create value in the modern AI landscape. My focus is on Data Science and Full-Stack Development with a futuristic mindset.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {highlightSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm bg-white/5 backdrop-blur-md text-foreground border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Card className="glass-card relative border-white/10 overflow-hidden transform-gpu transition-all duration-500 hover:rotate-2">
              <CardContent className="p-10">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Born In</p>
                    <p className="text-foreground text-lg font-semibold">Chennai, India</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em]">Education</p>
                    <p className="text-foreground text-lg font-semibold">B.Tech CSBS</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em]">Interests</p>
                    <p className="text-foreground text-lg font-semibold">AI, Data Science</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Hobbies</p>
                    <p className="text-foreground text-lg font-semibold">Problem Solving</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}