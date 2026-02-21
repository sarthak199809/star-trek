/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { Rocket, ArrowRight, Menu, X, Zap, Target, Shield, Coffee } from "lucide-react";
import { useState, useRef } from "react";
import { Scene } from "./components/Scene";

const FEATURES = [
  {
    id: "warp",
    title: "Warp Propulsion",
    description: "The heart of the NCC-1701. Our dual-nacelle warp drive allows for speeds up to Warp 8, turning the vastness of space into your backyard.",
    icon: <Zap className="text-indigo-400" size={32} />,
    color: "from-indigo-500/20",
  },
  {
    id: "transporter",
    title: "Transporter Array",
    description: "Redefining arrival. Our state-of-the-art transporter systems allow for safe, instantaneous transport to planetary surfaces or other vessels.",
    icon: <Target className="text-blue-400" size={32} />,
    color: "from-blue-500/20",
  },
  {
    id: "shield",
    title: "Deflector Shielding",
    description: "Safety in the void. Advanced graviton-based shielding ensures your journey remains undisturbed by cosmic radiation or micro-meteoroids.",
    icon: <Shield className="text-emerald-400" size={32} />,
    color: "from-emerald-500/20",
  },
  {
    id: "quarters",
    title: "Premium Quarters",
    description: "Unparalleled comfort. Every cabin is a masterpiece of design, featuring automated climate control and panoramic views of the final frontier.",
    icon: <Coffee className="text-amber-400" size={32} />,
    color: "from-amber-500/20",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <Scene />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
            <Rocket size={20} />
          </div>
          <span className="font-display text-xl font-bold tracking-tighter uppercase">Starfleet</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {["Vessel", "Specs", "Legacy", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 md:block">
            Book a voyage
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black md:hidden"
        >
          {["Vessel", "Specs", "Legacy", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="py-4 text-2xl font-display font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-8 rounded-full bg-white px-8 py-3 text-black font-bold">
            Book a voyage
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* Background Decorative Element (Abstract Curve) */}
        <div className="absolute top-0 right-0 h-full w-full overflow-hidden pointer-events-none">
          <svg
            className="absolute -right-1/4 top-0 h-full w-[150%] opacity-20"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0,1000 C300,800 700,200 1000,0"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              d="M0,950 C350,750 650,250 1000,50"
              fill="none"
              stroke="white"
              strokeWidth="0.2"
            />
          </svg>

          {/* Subtle Glows */}
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="mb-4 inline-block font-display text-sm font-semibold tracking-[0.3em] text-white/40 uppercase">
              USS Star NCC-1701
            </span>
            <h1 className="font-display text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">
                New era of
              </span>
              <span className="block">travel.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Experience the pinnacle of Starfleet engineering. The Constitution-class
            heavy cruiser is now available for civilian interstellar exploration.
            Redefining distance, time, and the human experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-105 active:scale-95">
              Secure your berth
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95">
              View specifications
            </button>
          </motion.div>
        </div>

        {/* Bottom Stats/Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-6 right-6 flex flex-wrap items-end justify-between gap-8 md:left-12 md:right-12 lg:left-24 lg:right-24"
        >
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Max Velocity</p>
              <p className="font-display text-2xl font-light">Warp 8.0</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Capacity</p>
              <p className="font-display text-2xl font-light">430 Crew</p>
            </div>
          </div>

          <div className="hidden text-right md:block">
            <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Status</p>
            <p className="flex items-center justify-end gap-2 font-display text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              Operational
            </p>
          </div>
        </motion.div>
      </main>

      {/* Features Section (Sticky Scroll) */}
      <section ref={featuresRef} className="relative h-[400vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Glows that change based on scroll */}
          {FEATURES.map((feature, index) => {
            const start = index / FEATURES.length;
            const end = (index + 1) / FEATURES.length;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

            return (
              <motion.div
                key={`${feature.id}-glow`}
                style={{ opacity }}
                className={`absolute inset-0 bg-radial ${feature.color} to-transparent opacity-30 blur-[120px]`}
              />
            );
          })}

          <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-12 lg:px-24">
            <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left Side: Text Content */}
              <div className="relative h-[400px] flex flex-col justify-center">
                {FEATURES.map((feature, index) => {
                  const start = index / FEATURES.length;
                  const end = (index + 1) / FEATURES.length;
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const y = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [40, 0, 0, -40]);

                  return (
                    <motion.div
                      key={feature.id}
                      style={{ opacity, y }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                        {feature.icon}
                      </div>
                      <h2 className="font-serif text-5xl font-medium italic tracking-tight md:text-7xl lg:text-8xl">
                        {feature.title}
                      </h2>
                      <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60 md:text-xl">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Side: Visual Element (Card Stack inspired by screenshot) */}
              <div className="relative hidden h-[500px] items-center justify-center lg:flex">
                <div className="relative w-full max-w-md">
                  {FEATURES.map((feature, index) => {
                    const start = index / FEATURES.length;
                    const end = (index + 1) / FEATURES.length;
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 1.2]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotate = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [-10, 0, 0, 10]);

                    return (
                      <motion.div
                        key={`${feature.id}-visual`}
                        style={{ opacity, scale, rotate }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="relative h-[450px] w-[320px] rounded-[32px] border border-white/20 bg-gradient-to-br from-white/10 to-transparent p-1 backdrop-blur-2xl">
                          <div className="h-full w-full rounded-[30px] bg-black/80 p-8 flex flex-col justify-between overflow-hidden">
                            {/* Decorative Grid Pattern */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                              <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                            </div>

                            <div className="relative z-10">
                              <div className="mb-4 text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">System Protocol</div>
                              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col items-center justify-center py-12">
                              <div className="mb-6 h-24 w-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                {feature.icon}
                              </div>
                              <div className="text-center font-display text-xs font-bold tracking-widest text-white/40 uppercase">
                                Active Module {index + 1}
                              </div>
                            </div>

                            <div className="relative z-10">
                              <div className="flex justify-between items-end">
                                <div>
                                  <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Vessel ID</div>
                                  <div className="font-mono text-xs">NCC-1701</div>
                                </div>
                                <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            {FEATURES.map((_, index) => {
              const start = index / FEATURES.length;
              const end = (index + 1) / FEATURES.length;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(scrollYProgress, [start, end], [1, 1.5]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity, scale }}
                  className="h-1.5 w-1.5 rounded-full bg-white"
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* Starfleet Section (Bento Grid) */}
      <section id="legacy" className="bg-black px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-5xl font-bold tracking-tighter md:text-7xl"
              >
                The Architects of <br />
                <span className="text-white/40">the Final Frontier.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-xs text-sm leading-relaxed text-white/40"
            >
              From the shipyards of San Francisco to the research outposts of the outer rim,
              Starfleet brings together the brightest minds to push the boundaries of what's possible.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 lg:gap-8">
            {/* Left Column: Small Cards */}
            <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-3">
              <motion.div
                whileHover={{ y: -5 }}
                className="group rounded-3xl bg-white/5 p-8 border border-white/10 transition-colors hover:bg-white/10"
              >
                <h3 className="text-lg font-bold text-white/40 group-hover:text-white transition-colors">Our Vision.</h3>
                <p className="mt-4 text-sm text-white/40">To explore strange new worlds and seek out new life.</p>
                <div className="mt-6 flex justify-end">
                  <ArrowRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group rounded-3xl bg-white/5 p-8 border border-white/10 transition-colors hover:bg-white/10"
              >
                <h3 className="text-lg font-bold text-white/40 group-hover:text-white transition-colors">Global Reach.</h3>
                <p className="mt-4 text-sm text-white/40">Talent sourced from every continent and colony.</p>
                <div className="mt-6 flex justify-end">
                  <ArrowRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group rounded-3xl bg-white/5 p-8 border border-white/10 transition-colors hover:bg-white/10"
              >
                <h3 className="text-lg font-bold text-white/40 group-hover:text-white transition-colors">Legacy.</h3>
                <p className="mt-4 text-sm text-white/40">A century of pioneering interstellar travel.</p>
                <div className="mt-6 flex justify-end">
                  <ArrowRight size={20} className="text-white/20 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            </div>

            {/* Middle Column: Tall Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 md:col-span-4 lg:col-span-4"
            >
              <img
                src="https://picsum.photos/seed/starfleet-team/800/1200"
                alt="Engineering Team"
                className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Exceptional Talent
                </div>
                <h3 className="font-serif text-3xl font-medium italic">Crafted by the best.</h3>
                <p className="mt-4 text-sm text-white/60">
                  Our engineering team consists of Nobel laureates and field experts
                  dedicated to the perfection of every bolt and circuit.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Medium Cards */}
            <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-5">
              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8"
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    High-Grade Materials
                  </div>
                  <h3 className="font-serif text-3xl font-medium italic">Science Meets <br />Sustainability.</h3>
                  <p className="mt-4 max-w-xs text-sm text-white/60">
                    Utilizing Duranium-Tritanium composites for a hull that withstands
                    the pressures of deep space for generations.
                  </p>
                </div>
                <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8"
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Warp Integrity
                  </div>
                  <h3 className="font-serif text-3xl font-medium italic">Pure, Powerful, <br />Reliable.</h3>
                  <p className="mt-4 max-w-xs text-sm text-white/60">
                    A warp core designed to run for millions of light years without
                    degradation. The ultimate endurance.
                  </p>
                </div>
                <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
              </motion.div>
            </div>

            {/* Bottom Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[40px] bg-white/5 border border-white/10 md:col-span-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src="https://picsum.photos/seed/warp-core/1200/800"
                    alt="Warp Core"
                    className="h-full w-full object-cover opacity-60 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/30"
                    >
                      <div className="h-0 w-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </motion.div>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-12 lg:p-16">
                  <h3 className="font-serif text-4xl font-medium italic leading-tight md:text-5xl lg:text-6xl">
                    Make Every Journey <br />
                    <span className="text-white/40">Sustainable, Beautiful, and Simple.</span>
                  </h3>
                  <p className="mt-8 text-sm leading-relaxed text-white/40 lg:text-base">
                    Ready to live better among the stars? Explore our curated collection of
                    interstellar vessels and sustainable life-support systems.
                    Make small changes today that create a lasting impact tomorrow.
                  </p>
                  <div className="mt-12">
                    <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105">
                      Browse Starfleet Favorites
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Bold Footer */}
      <footer className="bg-black pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <Rocket size={16} />
                </div>
                <span className="font-display text-lg font-bold tracking-tighter uppercase">Starfleet</span>
              </div>
              <p className="max-w-sm text-lg text-white/40 leading-relaxed">
                Pioneering the future of interstellar travel since 2161.
                Join us as we venture into the final frontier.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-8">Navigation</h4>
              <ul className="space-y-4">
                {["Vessel", "Specs", "Legacy", "Contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-8">Connect</h4>
              <ul className="space-y-4">
                {["Subspace", "Holonet", "Quantum Link", "Terminal"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Massive Typographic Brand Mark */}
          <div className="relative overflow-hidden py-12">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[15vw] font-black tracking-tighter leading-none text-white uppercase select-none"
            >
              NCC-1701
            </motion.h2>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
              © 2265 United Federation of Planets. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-bold tracking-widest text-white/20 uppercase hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] font-bold tracking-widest text-white/20 uppercase hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
