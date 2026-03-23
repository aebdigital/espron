"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Domov", href: "#top" },
  { label: "O nás", href: "#preco" },
  { label: "Služby", href: "#sluzby" },
  { label: "Realizácie", href: "#realizacie" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open to prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? "bg-primary/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
        <div className="mx-auto w-[95vw] flex items-center justify-between h-16 md:h-24 px-6 md:px-10">
          
          {/* Logo Alignment: Left on All screens */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-black tracking-wider text-white">
                ESPRON
              </span>
            </Link>
          </div>

          {/* Right: Menu Toggle Button */}
          <div className="flex justify-end items-center">
            <button
              onClick={() => setOpen(true)}
              className="text-white transition-colors text-xs tracking-[0.2em] font-medium uppercase border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-3 hover:bg-white/10 backdrop-blur-sm group"
            >
              <div className="w-4 flex flex-col gap-1">
                <span className="w-full h-[1.5px] bg-white rounded-full"></span>
                <span className="w-full h-[1.5px] bg-white rounded-full"></span>
              </div>
              <span className="hover-split-text">
                <span className="hover-split-text-inner" data-text="Menu">Menu</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Dropdown Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 inset-x-0 h-[70vh] z-[60] bg-primary flex flex-col overflow-hidden shadow-2xl border-b border-white/10"
          >
            {/* Texture background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{ backgroundImage: "url('/texture.svg')", backgroundSize: "cover", filter: "invert(1)" }} />

            {/* Top Bar within Menu (for Close button) */}
            <div className="relative z-10 mx-auto w-[95vw] flex items-center justify-between h-24 px-6 md:px-10">
              <div className="flex items-center">
                 <span className="text-xl md:text-2xl font-black tracking-wider text-white">
                   ESPRON
                 </span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="text-white transition-colors text-xs tracking-[0.2em] font-medium uppercase border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-3 hover:bg-white/10 group"
                >
                  <span className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-full h-[1.5px] bg-white rotate-45 rounded-full"></span>
                    <span className="absolute w-full h-[1.5px] bg-white -rotate-45 rounded-full"></span>
                  </span>
                  <span className="hover-split-text">
                    <span className="hover-split-text-inner" data-text="Zavrieť">Zavrieť</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Menu Links Content */}
            <div className="relative z-10 flex-1 flex items-center pb-8">
              <div className="mx-auto w-[95vw] px-6 md:px-10 w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
                {/* Column 1: Detailed Contact Info */}
                <div className="hidden md:flex flex-col">
                  <span className="text-white/30 text-xs uppercase tracking-widest block mb-8">Kontakt & Informácie</span>
                  
                  <div className="mb-8">
                    <p className="text-white text-xl font-black mb-2 tracking-tight">ESPRON s.r.o</p>
                    <p className="text-white/50 text-sm font-light leading-relaxed">
                      IČO: 50915380<br />
                      Slovenská 31<br />
                      Spišská Nová Ves, 05201<br />
                      Slovensko
                    </p>
                  </div>

                  <div className="mb-8">
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] block mb-2 font-bold">Kontaktné údaje</span>
                    <p className="text-white text-xl font-light">+421 944 624 685</p>
                    <p className="text-white/60 text-lg font-light">info@espron.sk</p>
                  </div>

                  <div>
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] block mb-2 font-bold">Kedy nás kontaktovať</span>
                    <p className="text-white/70 text-sm font-light">Po – Pi</p>
                    <p className="text-white/70 text-sm font-light">8:00 – 17:00</p>
                  </div>
                </div>

                {/* Column 2: Our Services */}
                <div className="flex flex-col gap-2 items-center md:items-start order-2 md:order-2">
                  <span className="text-white/30 text-xs uppercase tracking-widest block mb-8 self-start ml-0">Naše Služby</span>
                  <div className="flex flex-col gap-3">
                    {[
                      "Zatepľovacie práce",
                      "Sadrokartónové práce",
                      "Ručné omietky",
                      "Interiérový dizajn",
                      "Tepovanie",
                      "Čistenie fasády",
                      "Čistenie dlažby"
                    ].map((service, i) => (
                      <motion.div 
                        key={service}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                      >
                        <Link
                          href="#sluzby"
                          onClick={() => setOpen(false)}
                          className="text-lg md:text-2xl text-white/70 hover:text-white transition-colors block group"
                        >
                           <span className="hover-split-text leading-tight">
                             <span className="hover-split-text-inner" data-text={service}>{service}</span>
                           </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Main Sections */}
                <nav className="flex flex-col gap-4 items-center md:items-end order-1 md:order-3">
                  <span className="text-white/30 text-xs uppercase tracking-widest block mb-8">Navigácia</span>
                  <div className="flex flex-col gap-4 items-center md:items-end">
                    {navItems.map((item, i) => (
                      <motion.div 
                        key={item.href}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="text-3xl md:text-4xl lg:text-5xl text-white block group font-bold tracking-tight"
                        >
                           <span className="hover-split-text">
                             <span className="hover-split-text-inner" data-text={item.label}>{item.label}</span>
                           </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
