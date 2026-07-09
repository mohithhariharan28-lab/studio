
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Linkedin, MapPin, Send, Loader2, BrainCircuit } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { analyzeContactMessage, ContactMessageOutput } from "@/ai/flows/analyze-contact-message";
import { sendContactEmail } from "@/app/actions/email";

export function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [aiInsight, setAiInsight] = useState<ContactMessageOutput | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiInsight(null);
    setStatus("Initiating Neural Link...");

    try {
      // 1 & 2. Store in Firestore and run AI Analysis in parallel to save time
      setStatus("Analyzing Transmission...");
      const [insight] = await Promise.all([
        analyzeContactMessage({ message: formData.message }),
        addDoc(collection(db, "messages"), {
          ...formData,
          createdAt: serverTimestamp()
        })
      ]);

      setAiInsight(insight);
      
      // 3. Send Email Notification
      setStatus("Dispatching Notification...");
      const emailResult = await sendContactEmail({
        ...formData,
        aiSummary: insight.summary
      });

      if (!emailResult.success) {
        throw new Error(emailResult.error || "Email transmission failed");
      }

      toast({
        title: "Message Sent Successfully",
        description: "Your digital message has been transmitted and summarized by AI.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Message Failed to Send",
        description: "Please check your network connection and try again.",
      });
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold mb-16 flex items-center text-foreground">
          <span className="text-primary mr-3">/</span> Connect
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to pioneer new horizons in AI? Reach out for collaborations or just a digital handshake.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "mohithhariharan28@gmail.com", href: "mailto:mohithhariharan28@gmail.com", color: "primary" },
                { icon: Phone, label: "Phone", value: "+91 9940649811", href: "tel:+919940649811", color: "secondary" },
                { icon: MapPin, label: "Location", value: "Chennai, India", href: null, color: "accent" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className={`bg-white/5 p-5 rounded-2xl group-hover:bg-primary/20 transition-all duration-500 shadow-lg border border-white/10`}>
                    <item.icon className="h-7 w-7 text-foreground group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-xl text-foreground hover:text-primary transition-colors font-bold">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xl text-foreground font-bold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-8">
              <a
                href="https://linkedin.com/in/mohith-hariharan-514345373"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 hover:bg-primary text-foreground hover:text-white transition-all p-5 rounded-2xl border border-white/10 shadow-2xl hover:scale-110"
              >
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>

          <div className="space-y-10">
            <Card className="glass-card border-white/10 p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name"
                    required
                    className="h-14 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 rounded-xl focus:ring-primary focus:border-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="h-14 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 rounded-xl focus:ring-primary focus:border-primary transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="The transmission content..."
                  required
                  className="min-h-[200px] bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 rounded-xl focus:ring-primary focus:border-primary transition-all p-6 text-lg"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black tracking-[0.2em] uppercase py-8 rounded-xl shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      {status}
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-6 w-6" />
                      Launch Transmission
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* AI Insight Visualization */}
            {aiInsight && (
              <div className="animate-in zoom-in-95 duration-700">
                <Card className="border-secondary/30 bg-secondary/5 glass-card overflow-hidden">
                  <div className="bg-secondary/10 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-secondary font-black text-xs uppercase tracking-[0.2em]">
                      <BrainCircuit className="h-5 w-5" />
                      Neural Interpretation
                    </div>
                    <span className="text-[10px] text-secondary/60 italic font-mono uppercase">Node Analysis v2.5</span>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3">AI Synthesis</p>
                      <p className="text-lg italic leading-relaxed text-foreground/90 font-medium">"{aiInsight.summary}"</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {aiInsight.categories.map(cat => (
                        <span key={cat} className="text-[10px] font-black uppercase tracking-[0.1em] bg-secondary/20 text-secondary px-4 py-1.5 rounded-full border border-secondary/30">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
