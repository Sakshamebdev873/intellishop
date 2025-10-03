import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import Navbar  from '../components/Navbar';
import  Footer from '../components/Footer';

// --- Particle Network Background Component ---
const PARTICLE_COLOR = 'rgba(99, 102, 241, 0.5)';
const MOUSE_RADIUS = 150;

class Particle {
    x: number; y: number; size: number; baseX: number; baseY: number; density: number;
    constructor(x: number, y: number, size = 2) {
        this.x = x; this.y = y; this.size = size;
        this.baseX = this.x; this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(mouse: { x: number | null, y: number | null }) {
        if (mouse.x === null || mouse.y === null) {
            if (this.x !== this.baseX) { this.x -= (this.x - this.baseX) / 10; }
            if (this.y !== this.baseY) { this.y -= (this.y - this.baseY) / 10; }
            return;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = MOUSE_RADIUS;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < MOUSE_RADIUS) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) { this.x -= (this.x - this.baseX) / 10; }
            if (this.y !== this.baseY) { this.y -= (this.y - this.baseY) / 10; }
        }
    }
}

const ParticleNetworkBackground = ({ triggerPulse }: { triggerPulse: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pulseRef = useRef<{ x: number; y: number; radius: number; opacity: number } | null>(null);

    useEffect(() => {
        if(triggerPulse && !pulseRef.current) {
            const canvas = canvasRef.current;
            if(canvas) {
                pulseRef.current = { x: canvas.width / 2, y: canvas.height / 2, radius: 0, opacity: 1 };
            }
        }
    }, [triggerPulse]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray: Particle[] = [];

        const init = () => {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particlesArray.push(new Particle(x, y));
            }
        };
        init();
        
        const mouse = { x: null as number | null, y: null as number | null };
        const handleMouseMove = (event: MouseEvent) => { mouse.x = event.x; mouse.y = event.y; };
        const handleMouseOut = () => { mouse.x = null; mouse.y = null; };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => { p.update(mouse); p.draw(ctx); });
            
            if (pulseRef.current) {
                const pulse = pulseRef.current;
                ctx.beginPath();
                ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(99, 102, 241, ${pulse.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                pulse.radius += 15;
                pulse.opacity -= 0.02;
                if (pulse.opacity <= 0) pulseRef.current = null;
            }
            requestAnimationFrame(animate);
        };
        animate();
        
        const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 bg-gray-50" />;
};


// --- Main Page Component ---
export const ContactPage = () => {
  const [formState, setFormState] = useState('idle');
  const [pulse, setPulse] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setPulse(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');
    setTimeout(() => setPulse(false), 500);
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden">
        <ParticleNetworkBackground triggerPulse={pulse} />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-24 px-6">
          <AnimatedText
            text="Get in Touch"
            el="h1"
            className="text-5xl md:text-7xl font-extrabold text-gray-900 text-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto text-center"
          >
            We're here to help with any questions. Whether it's about an order, our products, or just to say hello, we'd love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            className="mt-12 w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex flex-col justify-between text-white">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white/80">
                      <Mail size={20} className="text-white"/> <span>hello@aether.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <Phone size={20} className="text-white"/> <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-start gap-4 text-white/80">
                      <MapPin size={20} className="text-white mt-1"/> <span>123 Artisan Way, Suite 100,<br/>Creativity City, 54321</span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="text-white">
                <div className="space-y-6">
                  <div className="relative">
                    <input type="text" id="name" className="peer block w-full appearance-none border-0 border-b-2 border-white/30 bg-transparent py-2.5 px-0 focus:border-white focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-white/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-white">Your Name</label>
                  </div>
                  <div className="relative">
                    <input type="email" id="email" className="peer block w-full appearance-none border-0 border-b-2 border-white/30 bg-transparent py-2.5 px-0 focus:border-white focus:outline-none focus:ring-0" placeholder=" " required />
                    <label htmlFor="email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-white/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-white">Your Email</label>
                  </div>
                  <div className="relative">
                    <textarea id="message" rows={4} className="peer block w-full appearance-none border-0 border-b-2 border-white/30 bg-transparent py-2.5 px-0 focus:border-white focus:outline-none focus:ring-0" placeholder=" " required></textarea>
                    <label htmlFor="message" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-white/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-white">Your Message</label>
                  </div>
                </div>
                <div className="mt-8">
                  <motion.button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formState === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </motion.button>
                  {formState === 'success' && <p className="mt-4 text-center text-green-300">Message sent successfully!</p>}
                  {formState === 'error' && <p className="mt-4 text-center text-red-300">Something went wrong. Please try again.</p>}
                </div>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
};