import { useEffect } from "react";
import About from "@/components/About";
import { CinematicFooter } from "@/components/ui/motion-footer";

const AboutPage = () => {
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = -1000;
    let lastY = -1000;
    let grids: HTMLElement[] = [];

    const refreshGrids = () => {
      grids = Array.from(document.querySelectorAll<HTMLElement>('.global-bg-grid, .footer-bg-grid'));
    };
    refreshGrids();
    {/* This is a comment inside JSX */}
    window.addEventListener('resize', refreshGrids, { passive: true });

    const updateVisibleGrids = () => {
      rafId = null;
      const vh = window.innerHeight;
      for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        const rect = grid.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= vh) {
          grid.style.setProperty('--mouse-x', `${lastX - rect.left}px`);
          grid.style.setProperty('--mouse-y', `${lastY - rect.top}px`);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(updateVisibleGrids);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', refreshGrids);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <About />
      <CinematicFooter />
    </div>
  );
};

export default AboutPage;
