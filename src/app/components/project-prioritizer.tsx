'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Github, Loader2 } from 'lucide-react';
import type { Project } from '@/ai/flows/prioritize-projects-based-on-relevance';
import { getPrioritizedProjects } from '@/app/actions';
import { projects as initialProjects } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
  userDescription: z.string().min(10, {
    message: "Please enter at least 10 characters to help us prioritize.",
  }).max(500, {
    message: "Description must not be longer than 500 characters."
  }),
});


export function ProjectPrioritizer() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userDescription: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await getPrioritizedProjects({ projects: initialProjects, userDescription: data.userDescription });
      if (result.success && result.data) {
        setProjects(result.data);
      } else {
        toast({
            title: "Prioritization Failed",
            description: result.error || "An unexpected error occurred while reordering projects.",
            variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="space-y-12">
      <Card className="max-w-2xl mx-auto text-left">
        <CardHeader>
          <CardTitle>Highlight Relevant Projects</CardTitle>
          <CardDescription>
            Tell us about your interests or what you're looking for (e.g., "strong data visualization skills"). Our AI will reorder the projects to show you the most relevant ones first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'data visualization', 'python', 'business insights'"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Prioritizing...
                  </>
                ) : (
                  'Prioritize Projects'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={`${project.title}-${index}`} className="flex flex-col text-left transition-transform transform hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
            <CardFooter>
              {project.githubLink && (
                <Button asChild variant="outline">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
