'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Github, Linkedin, Mail, Phone, Award } from 'lucide-react';
import { Header } from '@/app/components/header';
import { ProjectPrioritizer } from '@/app/components/project-prioritizer';
import { skills, certifications, type Certification } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Home() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');
  const [selectedCert, setSelectedCert] = useState<Certification | undefined>();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Hello, I'm Ohith Hariharan
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A passionate analyst and aspiring entrepreneur, dedicated to extracting valuable insights from data and driving business growth.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#projects">View Projects</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                {profileImage && (
                  <Image
                    src={profileImage.imageUrl}
                    alt={profileImage.description}
                    data-ai-hint={profileImage.imageHint}
                    width={500}
                    height={500}
                    className="h-auto w-full max-w-sm rounded-full object-cover shadow-lg aspect-square"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Me</h2>
              <p className="text-muted-foreground md:text-lg/relaxed">
                I am a detail-oriented analyst with a strong foundation in data and business analysis. My goal is to leverage my analytical skills to solve complex problems and contribute to strategic decision-making. I have a keen interest in entrepreneurship and am always looking for opportunities to innovate and build something new.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">My Skills</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm hover:bg-accent transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-20 md:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Projects Portfolio</h2>
              <p className="text-muted-foreground md:text-lg/relaxed">
                Here are some of the projects I've worked on.
              </p>
            </div>
            <div className="mt-12">
              <ProjectPrioritizer />
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Certifications</h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  onClick={() => cert.imageUrl && setSelectedCert(cert)}
                  className={cert.imageUrl ? 'cursor-pointer' : ''}
                >
                  <Card className="flex h-full flex-col items-center text-center p-6 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                    <Award className="h-12 w-12 mb-4 text-primary" />
                    <CardHeader className="p-0">
                      <CardTitle>{cert.name}</CardTitle>
                      <CardDescription>{cert.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={!!selectedCert} onOpenChange={(isOpen) => !isOpen && setSelectedCert(undefined)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedCert?.imageUrl && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedCert.name} Certificate</DialogTitle>
                <DialogDescription>
                  Certificate of completion for {selectedCert.name} - {selectedCert.description}.
                </DialogDescription>
              </DialogHeader>
              <Image
                src={selectedCert.imageUrl}
                alt={`${selectedCert.name} Certificate`}
                width={1190}
                height={841}
                className="w-full h-auto rounded-md"
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer / Contact Section */}
      <footer id="contact" className="w-full bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Get In Touch</h2>
          <p className="mt-4 mb-8 max-w-md mx-auto">
            I'm currently open to new opportunities. Feel free to reach out!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <a href="mailto:ohith.hariharan.sample@email.com" className="hover:underline">ohith.hariharan.sample@email.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+91 12345 67890</span>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
              <a href="https://linkedin.com/in/ohith-hariharan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
              <a href="https://github.com/ohith-hariharan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
            </Button>
          </div>
          <p className="mt-8 text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Ohith Hariharan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
