import { useEffect, useRef } from 'react';

interface Character {
  char: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  shade: number;
}

const CHARACTERS = ['0', '1'];

export default function FlyingCharactersCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charactersRef = useRef<Character[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial setup

    const spawnInterval = window.setInterval(spawnCharacter, 500);

    function spawnCharacter() {
      if (!canvas) return;
      const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

      // Spawn at left side
      const x = -50;
      const y = Math.random() * canvas.height;

      // Random velocity
      const dx = 1 + Math.random() * 2;
      const dy = (Math.random() - 0.5) * 0.5;
      const size = 10 + Math.random() * 10;
      const shade = 0.1 + Math.random() * 0.9;

      charactersRef.current.push({ char, x, y, dx, dy, size, shade });
    }

    function animate() {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Update character positions
      charactersRef.current.forEach((c) => {
        c.x += c.dx;
        c.y += c.dy;
      });

      // Remove characters that have moved off the right side
      charactersRef.current = charactersRef.current.filter(
        (c) => c.x < width + 50,
      );

      // Draw characters
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';

      charactersRef.current.forEach((c) => {
        ctx.font = `bold ${c.size}px monospace`;
        // ctx.fillStyle = `rgba(255, 255, 255, ${c.shade})`;
        ctx.fillStyle = `rgba(0, 0, 0, ${c.shade})`;
        ctx.fillText(c.char, c.x, c.y);
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(spawnInterval);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></canvas>
  );
}
