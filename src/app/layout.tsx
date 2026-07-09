import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Mohith's DevFolio | AI & Data Science Portfolio",
  description: 'Portfolio of Mohith Hariharan V - B.Tech CSBS student specializing in Data Science and AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground relative overflow-x-hidden">
        {/* Neo Aurora Animated Background Layer */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#0B0F1A]">
          {/* Main Aurora Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] animate-aurora" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[100px] animate-aurora [animation-delay:2s]" />
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[80px] animate-aurora [animation-delay:4s]" />
          
          {/* Depth Overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,15,26,0.8)_100%)]" />
          
          {/* Subtle Grain/Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>
        
        {children}
      </body>
    </html>
  );
}
