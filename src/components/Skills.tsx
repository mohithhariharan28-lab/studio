"use client";

import { useEffect, useState } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";

const skillsData = [
  { skill: "Python", value: 90 },
  { skill: "C / C++", value: 85 },
  { skill: "Data Analysis", value: 80 },
  { skill: "AI & ML", value: 75 },
  { skill: "Full Stack", value: 70 },
  { skill: "Tools", value: 95 },
];

const chartConfig = {
  value: {
    label: "Proficiency",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold mb-16 flex items-center text-foreground">
          <span className="text-primary mr-3">/</span> Skill Matrix
        </h3>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="glass-card p-4 rounded-3xl border-white/5 bg-white/5 backdrop-blur-xl">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[500px]">
                <RadarChart data={skillsData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <PolarGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600 }}
                  />
                  <Radar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                      fill: "hsl(var(--secondary))",
                    }}
                  />
                </RadarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillsData.map((skill, index) => (
                <Card key={index} className="glass-card border-white/5 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold text-foreground">{skill.skill}</span>
                      <span className="text-primary font-black">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground text-center lg:text-left mt-8 italic text-sm">
              * This graph represents a holistic view of my technical competence and strategic tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
