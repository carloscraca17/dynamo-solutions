"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Globe,
  Zap,
  CheckCircle2,
  Code2,
  Search,
  Target,
  Handshake,
  BotMessageSquare,
  MapPin,
  TrendingUp,
  Sparkles,
  Layers,
  Activity,
  ChevronRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

export default function DynamoLanding() {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Variantes de animación inspiradas en la referencia (suaves, con blur y spring)
  const fadeUpBlur: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const wordRevealContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const wordRevealItem: Variants = {
    hidden: { opacity: 0.2, y: 8, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const corporatePillars = [
    {
      code: "01",
      icon: Code2,
      tag: "Arquitectura & Conversión",
      title: "Desarrollo E-commerce y Web de Alto Rendimiento",
      description:
        "No hacemos simples páginas web; construimos activos digitales. Desarrollamos ecosistemas rápidos, estéticos y escalables, ya sea mediante plataformas líderes como Shopify o arquitecturas web a medida. Cada línea de código y cada decisión de diseño tiene un único objetivo: maximizar tu tasa de conversión y ofrecer una experiencia de usuario impecable.",
      metrics: ["Shopify & Custom Stack", "99.9% Performance", "UX/UI Conversión"],
    },
    {
      code: "02",
      icon: Search,
      tag: "Visibilidad Orgánica & IA",
      title: "Inteligencia de Búsqueda (SEO, GEO y Google Business)",
      description:
        "Aseguramos que tu marca sea la primera opción, tanto para el usuario como para la Inteligencia Artificial. Dominamos el posicionamiento local y orgánico. Gestionamos proactivamente tu reputación, respondiendo reseñas estratégicamente y manteniendo tu perfil de Google actualizado para cada temporada y evento comercial clave. Hacemos que quienes te buscan, te elijan.",
      metrics: ["Posicionamiento GEO/IA", "Google Business Pro", "Gestión de Reseñas"],
    },
    {
      code: "03",
      icon: Target,
      tag: "Tráfico & Escala",
      title: "Adquisición de Clientes (SEM y Meta Ads)",
      description:
        "Convertimos la inversión publicitaria en ingresos predecibles. Diseñamos, auditamos y ejecutamos campañas de alto rendimiento. Utilizamos Google Ads y YouTube para captar clientes con intención de compra directa, y el ecosistema de Meta (Instagram/Facebook) para generar deseo y reconocimiento de marca a gran escala.",
      metrics: ["Google Ads & YouTube", "Meta Ads Full-Funnel", "ROAS Predecible"],
    },
  ];

  const professionalPillars = [
    {
      code: "01",
      icon: Handshake,
      tag: "Éxito Compartido",
      title: "Infraestructura Digital a Riesgo Cero (Modelo 80/20)",
      description:
        "Eliminamos la barrera de entrada a la digitalización. No cobramos altos costos de desarrollo web inicial. Nuestro ecosistema funciona bajo un modelo de éxito compartido: construimos toda tu infraestructura y solo retenemos un 20% de comisión por los servicios efectivamente reservados a través de la plataforma. Si tú no ganas, nosotros tampoco.",
    },
    {
      code: "02",
      icon: BotMessageSquare,
      tag: "Asistente WhatsApp 24/7",
      title: "Automatización de Reservas con IA",
      description:
        "Olvídate de perder clientes por no poder responder el teléfono mientras trabajas. Implementamos tu propia plataforma web de agendamiento, respaldada por un asistente de Inteligencia Artificial integrado en WhatsApp que atiende consultas, perfila clientes y coordina tus citas las 24 horas del día, los 7 días de la semana.",
    },
    {
      code: "03",
      icon: MapPin,
      tag: "Google Maps Local",
      title: "Posicionamiento y Autoridad Local",
      description:
        "Te otorgamos la imagen corporativa de una gran empresa, adaptada a tu oficio. Creamos y posicionamos tu perfil profesional en Google Maps (sin necesidad de exponer tu dirección personal), destacando tus servicios en tu zona de cobertura para generar confianza inmediata y un flujo constante de reservas orgánicas.",
    },
  ];

  const manifestoWords = [
    "En",
    "Dynamo",
    "Solutions",
    "entendimos",
    "que",
    "el",
    "mercado",
    "cambió:",
    "ya",
    "no",
    "basta",
    "con",
    "tener",
    "presencia",
    "en",
    "internet,",
    "necesitas",
    "un",
    "sistema",
    "que",
    "trabaje",
    "por",
    "ti.",
    "Nacimos",
    "con",
    "un",
    "propósito",
    "claro:",
    "democratizar",
    "la",
    "escalabilidad.",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF5B22]/30 selection:text-white">
      {/* BARRA SUPERIOR + NAVEGACIÓN ESTILO REFERENCIA */}
      <header className="fixed w-full top-0 z-50">
        {/* Top subtle announcement bar */}
        <div className="bg-[#08080A]/90 backdrop-blur-md border-b border-white/[0.06] py-2 px-4 text-center">
          <a
            href="#caso-estudio"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5B22] animate-pulse" />
            <span>
              Caso de Estudio: <strong className="text-white font-medium">The Bellacy Studio</strong> escaló de $300 USD a $1.300 USD en 3 meses
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        <nav className="bg-[#050505]/75 backdrop-blur-xl border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D93800] flex items-center justify-center shadow-[0_0_15px_rgba(255,91,34,0.4)]">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Dynamo<span className="text-[#FF5B22]">.</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
              <a href="#manifiesto" className="hover:text-white transition-colors">
                Sobre Nosotros
              </a>
              <a href="#corporativo" className="hover:text-white transition-colors">
                Soluciones Corporativas
              </a>
              <a href="#profesionales" className="hover:text-white transition-colors">
                Impulso Profesionales
              </a>
              <a href="#caso-estudio" className="hover:text-white transition-colors">
                Caso de Estudio
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#agendar"
                className="bg-gradient-to-b from-[#FF6B35] to-[#E84311] text-white px-5 py-2 rounded-lg text-xs md:text-sm font-medium hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,91,34,0.35)] border border-[#FF8559]/40 flex items-center gap-1.5"
              >
                Agendar Reunión
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO SECTION CON VIDEO FIJO EN EL BANNER SUPERIOR (50% TRANSPARENCIA) */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center pt-36 pb-24 md:pt-44 md:pb-32 px-6">
        {/* Video de fondo exclusivo del Hero */}
        <video
          src="https://res.cloudinary.com/ahsxrxpv/video/upload/v1792510146/6930814-uhd_3840_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Capa con 50% de transparencia solicitada */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        {/* Fundido inferior suave para conectar el video con el negro puro del sitio */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Texto Hero alineado al estilo de la referencia */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUpBlur} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1A110D]/90 border border-[#FF5B22]/40 text-[#FF8B60] shadow-[0_0_25px_rgba(255,91,34,0.25)] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
                Arquitectos de Ecosistemas Digitales
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpBlur}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal tracking-tight leading-[1.03] mb-6"
            >
              Automatización y escalabilidad{" "}
              <span className="text-zinc-400">para negocios modernos.</span>
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              className="text-base md:text-lg text-zinc-300 mb-9 max-w-xl font-light leading-relaxed"
            >
              Diseñamos ecosistemas digitales, optimizamos tu posicionamiento y
              construimos soluciones tecnológicas que convierten visitantes en
              clientes recurrentes.
            </motion.p>

            <motion.div
              variants={fadeUpBlur}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#manifiesto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-b from-[#FF6B35] to-[#E54310] text-white px-7 py-3.5 rounded-xl text-sm md:text-base font-medium inline-flex items-center gap-2 shadow-[0_0_30px_rgba(255,91,34,0.45)] border border-[#FF8A61]/40 hover:brightness-110 transition-all"
              >
                Inicia tu transformación <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#agendar"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/[0.14] backdrop-blur-md px-7 py-3.5 rounded-xl text-sm md:text-base font-medium transition-all"
              >
                Agendar Reunión
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* EL MANIFIESTO (SOBRE NOSOTROS) — Estilo 00:03 - 00:04 con grilla y revelación progresiva */}
      <section
        id="manifiesto"
        className="relative py-28 md:py-36 px-6 border-t border-white/[0.06] overflow-hidden scroll-mt-20"
      >
        {/* Fondo de cuadrícula arquitectónica sutil idéntico al segundo 00:03 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "4.5rem 4.5rem",
            maskImage:
              "radial-gradient(ellipse 70% 65% at 50% 50%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at 50% 50%, #000 30%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="mb-8"
          >
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 rounded-md">
              SOBRE NOSOTROS · EL MANIFIESTO
            </span>
          </motion.div>

          {/* Titular Editorial con insignias integradas (Estilo 00:03 - 00:04) */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.12] mb-10 max-w-4xl mx-auto"
          >
            No somos una agencia tradicional;{" "}
            <span className="inline-flex items-center justify-center align-middle mx-1 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/15 shadow-inner">
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
            </span>{" "}
            somos arquitectos de{" "}
            <span className="text-zinc-400">ecosistemas digitales</span>{" "}
            <span className="inline-flex items-center justify-center align-middle mx-1 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/15 shadow-inner">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </span>
            .
          </motion.h2>

          {/* Texto del Manifiesto con efecto de iluminación progresiva de palabras */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={wordRevealContainer}
            className="max-w-4xl mx-auto mb-8"
          >
            <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200 flex flex-wrap justify-center gap-x-2 gap-y-1">
              {manifestoWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordRevealItem}
                  className={
                    word === "Dynamo" ||
                    word === "Solutions" ||
                    word === "democratizar" ||
                    word === "escalabilidad."
                      ? "text-white font-normal"
                      : "text-zinc-300"
                  }
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpBlur}
            className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Ya seas una empresa consolidada buscando dominar su sector, o un
            profesional independiente dando el salto digital, construimos la
            infraestructura tecnológica y estratégica que necesitas para operar
            en automático. Nosotros diseñamos, posicionamos y aceleramos tu
            negocio; tú te enfocas en lo que mejor sabes hacer.
          </motion.p>

          {/* Píldoras de especialidades interactivas (Estilo inferior del frame 00:04) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="pt-6 border-t border-white/[0.06] max-w-3xl mx-auto"
          >
            <div className="text-xs text-zinc-500 mb-4">
              Ecosistemas especializados para cada etapa de crecimiento
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                { label: "Desarrollo E-commerce & Web", href: "#corporativo" },
                { label: "SEO, GEO & Google Business", href: "#corporativo" },
                { label: "SEM & Meta Ads", href: "#corporativo" },
                { label: "Modelo 80/20 Riesgo Cero", href: "#profesionales" },
                { label: "Reservas IA en WhatsApp", href: "#profesionales" },
                { label: "Autoridad Local Google Maps", href: "#profesionales" },
                { label: "Caso The Bellacy Studio", href: "#caso-estudio" },
              ].map((chip, i) => (
                <motion.a
                  key={i}
                  href={chip.href}
                  variants={fadeUpBlur}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0E0E12] border border-white/[0.08] hover:border-[#FF5B22]/50 text-xs text-zinc-300 hover:text-white transition-all"
                >
                  <span>{chip.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESUMEN EJECUTIVO DE LOS DOS ECOSISTEMAS (Bento Dual estilo 00:05) */}
      <section className="py-24 px-6 border-t border-white/[0.06] bg-[#070709]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 rounded-md mb-5">
              DOS MODELOS DE ESCALABILIDAD
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08]">
              Un Ecosistema.{" "}
              <span className="text-zinc-400">Dos Caminos de Crecimiento.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Tarjeta Resumen Ecosistema 1 */}
            <motion.a
              href="#corporativo"
              variants={fadeUpBlur}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl bg-[#0C0C0F] border border-white/[0.08] hover:border-white/[0.18] p-8 md:p-10 overflow-hidden transition-all flex flex-col justify-between"
            >
              {/* Glow cálido estilo referencia */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF5B22]/10 blur-3xl pointer-events-none group-hover:bg-[#FF5B22]/20 transition-all" />

              {/* Ilustración superior estilo Bento 00:05 */}
              <div className="relative h-36 mb-8 rounded-2xl bg-[#08080A] border border-white/[0.06] p-5 flex items-center justify-center gap-4 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-zinc-300" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] border border-[#FF946B]/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,91,34,0.45)] group-hover:scale-110 transition-transform duration-500">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-zinc-300" />
                </div>
                <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
                  ECOSISTEMA 01
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                  Soluciones Corporativas
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base font-light">
                  Desarrollo web a medida, campañas de publicidad (SEM/Meta) y
                  optimización SEO avanzada. Construimos la infraestructura
                  digital que tu empresa necesita para dominar el mercado.
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Desarrollo E-commerce & Web</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Pauta Digital y Analítica</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Optimización GEO & SEO</span>
                  </li>
                </ul>
              </div>
            </motion.a>

            {/* Tarjeta Resumen Ecosistema 2 */}
            <motion.a
              href="#profesionales"
              variants={fadeUpBlur}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl bg-[#0C0C0F] border border-white/[0.08] hover:border-white/[0.18] p-8 md:p-10 overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none group-hover:bg-[#FF5B22]/20 transition-all" />

              {/* Ilustración superior estilo Bento 00:05 */}
              <div className="relative h-36 mb-8 rounded-2xl bg-[#08080A] border border-white/[0.06] p-5 flex items-center justify-center gap-4 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-zinc-300" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] border border-[#FF946B]/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,91,34,0.45)] group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <BotMessageSquare className="w-5 h-5 text-zinc-300" />
                </div>
                <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#FF8B60] bg-[#FF5B22]/10 border border-[#FF5B22]/30 px-2.5 py-1 rounded-md">
                  MODELO 80/20
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                  Impulso para Profesionales
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base font-light">
                  Digitalizamos tu oficio sin costos iniciales de desarrollo.
                  Creamos tu plataforma de reservas, gestionamos tu presencia y
                  crecemos contigo bajo un modelo a comisión (80/20).
                </p>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Sin inversión inicial en web</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Sistema de reservas automatizado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <span>Gestión de Google Business</span>
                  </li>
                </ul>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ECOSISTEMA 1 DETALLE: SOLUCIONES CORPORATIVAS (Bento Cards estilo 00:06) */}
      <section
        id="corporativo"
        className="py-28 md:py-36 px-6 bg-[#050505] border-t border-white/[0.06] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 rounded-md mb-5">
                ECOSISTEMA 01 · SOLUCIONES CORPORATIVAS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08]">
                Soluciones{" "}
                <span className="text-zinc-400">Corporativas.</span>
              </h2>
            </div>
            <p className="text-zinc-400 max-w-md text-sm md:text-base font-light leading-relaxed">
              Orientado a empresas y PYMES que buscan escalar mediante inversión
              en infraestructura y pauta.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {corporatePillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUpBlur}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-3xl bg-[#0B0B0E] border border-white/[0.08] hover:border-white/[0.18] p-7 md:p-8 flex flex-col justify-between overflow-hidden transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                >
                  {/* Ilustración interactiva superior estilo 00:06 */}
                  <div>
                    <div className="relative h-40 mb-7 rounded-2xl bg-[#070709] border border-white/[0.06] p-4 flex flex-col justify-between overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#FF5B22]/15 blur-2xl pointer-events-none group-hover:bg-[#FF5B22]/25 transition-all" />

                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-zinc-500">
                          [{pillar.code}] // {pillar.tag}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Running
                        </span>
                      </div>

                      <div className="flex items-center gap-3 my-auto">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] flex items-center justify-center shadow-[0_0_20px_rgba(255,91,34,0.35)] group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.metrics.map((m, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.07] px-2 py-1 rounded-md"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3.5 leading-snug text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-[15px] font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>CORPORATE // {pillar.code}</span>
                    <span className="text-zinc-300 group-hover:text-[#FF6B35] transition-colors inline-flex items-center gap-1">
                      Escala & Conversión <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ECOSISTEMA 2 DETALLE: IMPULSO PARA PROFESIONALES (Layout interactivo [01] [02] [03] + tarjetas 3D flotantes estilo 00:07 - 00:08) */}
      <section
        id="profesionales"
        className="py-28 md:py-36 px-6 bg-[#08080B] border-t border-b border-white/[0.06] scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header al estilo 00:07 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="grid lg:grid-cols-12 gap-8 items-end mb-16"
          >
            <div className="lg:col-span-7">
              <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF8B60] border border-[#FF5B22]/30 bg-[#FF5B22]/10 px-3.5 py-1.5 rounded-md mb-5">
                ECOSISTEMA 02 · MODELO 80/20
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08]">
                Impulso para{" "}
                <span className="text-zinc-400">Profesionales.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-5">
                Orientado a oficios, técnicos y profesionales independientes:
                barberos, estética, técnicos y servicios de limpieza.
              </p>
              <a
                href="#agendar"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-xs font-medium text-white transition-colors"
              >
                Aplicar al Modelo 80/20 <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Cuerpo dividido: Izquierda pasos [01] [02] [03] / Derecha Tarjetas 3D Flotantes */}
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Columna izquierda: Los 3 pilares con numeración [01], [02], [03] como en 00:08 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="lg:col-span-6 space-y-4"
            >
              {professionalPillars.map((pillar, index) => {
                const isSelected = activeStep === index;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUpBlur}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    className={`cursor-pointer rounded-2xl p-6 md:p-7 border transition-all duration-300 ${
                      isSelected
                        ? "bg-[#101015] border-[#FF5B22]/40 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                        : "bg-[#0B0B0E]/60 border-white/[0.06] hover:border-white/[0.14]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded ${
                            isSelected
                              ? "bg-[#FF5B22]/20 text-[#FF8B60] border border-[#FF5B22]/40"
                              : "bg-white/[0.04] text-zinc-500"
                          }`}
                        >
                          [{pillar.code}]
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm md:text-[15px] font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Columna derecha: Escena de nodos y tarjetas flotantes en perspectiva (Estilo 00:08 y 00:12) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative min-h-[460px] rounded-3xl bg-[#060608] border border-white/[0.07] p-6 md:p-10 flex flex-col justify-between overflow-hidden"
            >
              {/* Resplandor central naranja estilo Kora AI */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#FF5B22]/15 blur-3xl pointer-events-none" />

              {/* Tarjeta superior flotante: Modelo 80/20 */}
              <motion.div
                animate={{
                  y: activeStep === 0 ? -4 : 0,
                  borderColor:
                    activeStep === 0
                      ? "rgba(255,91,34,0.5)"
                      : "rgba(255,255,255,0.08)",
                }}
                className="relative z-10 self-end w-full sm:w-80 rounded-2xl bg-[#0E0E13]/95 border p-5 shadow-2xl -rotate-2"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="font-mono uppercase text-[10px]">
                    [01] Modelo de Éxito Compartido
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">80 / 20</span>
                  <span className="text-xs text-emerald-400 font-mono">
                    +$0 Inversión Inicial
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Si tú no ganas, nosotros tampoco
                </div>
              </motion.div>

              {/* Nodo Central Luminoso con icono (Estilo 00:08 / 00:12) */}
              <div className="relative z-10 my-6 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-[#FF5B22]/25 blur-xl animate-pulse" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] border border-[#FF9B73]/50 flex items-center justify-center shadow-[0_0_40px_rgba(255,91,34,0.6)] rotate-6">
                    <Zap className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Tarjetas inferiores flotantes: IA WhatsApp 24/7 + Google Maps Local */}
              <div className="relative z-10 grid sm:grid-cols-2 gap-4">
                <motion.div
                  animate={{
                    y: activeStep === 1 ? -4 : 0,
                    borderColor:
                      activeStep === 1
                        ? "rgba(255,91,34,0.5)"
                        : "rgba(255,255,255,0.08)",
                  }}
                  className="rounded-2xl bg-[#0E0E13]/95 border p-4 shadow-xl rotate-1"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-white mb-1.5">
                    <BotMessageSquare className="w-4 h-4 text-[#FF6B35]" />
                    <span>Asistente IA WhatsApp</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug mb-2">
                    Atiende consultas, perfila clientes y agenda citas
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3" /> Activo 24/7
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: activeStep === 2 ? -4 : 0,
                    borderColor:
                      activeStep === 2
                        ? "rgba(255,91,34,0.5)"
                        : "rgba(255,255,255,0.08)",
                  }}
                  className="rounded-2xl bg-[#0E0E13]/95 border p-4 shadow-xl -rotate-1"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-white mb-1.5">
                    <MapPin className="w-4 h-4 text-[#FF6B35]" />
                    <span>Autoridad Google Maps</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug mb-2">
                    Posicionamiento local sin exponer tu dirección personal
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF8B60] bg-[#FF5B22]/10 px-2 py-0.5 rounded">
                    ● Reservas Orgánicas
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN EXCLUSIVA: EL CASO THE BELLACY STUDIO (Estilo Bento Showcase 00:10 & 00:14 - 00:15) */}
      <section
        id="caso-estudio"
        className="py-28 md:py-36 px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpBlur}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 rounded-md mb-5">
            CASO DE ESTUDIO EXCLUSIVO · THE BELLACY STUDIO
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08]">
            Transformación digital con{" "}
            <span className="text-zinc-400">resultados medibles.</span>
          </h2>
        </motion.div>

        {/* Contenedor Bento inspirado en el frame 00:14 - 00:15 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="rounded-[2rem] bg-[#0B0B0F] border border-white/[0.08] p-6 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
        >
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Panel Izquierdo: Estado del Ecosistema (Estilo lista de estado en 00:15) */}
            <motion.div
              variants={fadeUpBlur}
              className="lg:col-span-4 rounded-2xl bg-[#08080B] border border-white/[0.07] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
                  Facturación Mensual
                </div>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-zinc-500 line-through text-base">
                    $300 USD
                  </span>
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    $1.300 USD
                  </span>
                </div>

                <div className="text-xs font-medium text-zinc-400 mb-3">
                  Estrategia Implementada
                </div>
                <div className="space-y-2.5 text-xs">
                  {[
                    { name: "Posicionamiento Google Maps", status: "Activo" },
                    { name: "Campañas de Anuncios Precisas", status: "Activo" },
                    { name: "Sistema Predecible de Clientes", status: "Activo" },
                    { name: "Flujo Constante de Reservas", status: "Activo" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#101015] border border-white/[0.05]"
                    >
                      <span className="text-zinc-300">{item.name}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>ROI VERIFICADO</span>
                <span className="text-white">+330%</span>
              </div>
            </motion.div>

            {/* Panel Central: Tarjeta Naranja Cálida de Marca (Idéntica al centro del frame 00:15) */}
            <motion.div
              variants={fadeUpBlur}
              className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#FF7A45] via-[#D94B1A] to-[#2A120A] border border-[#FF9B73]/30 p-7 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
                <BarChart3 className="w-44 h-44 text-white" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15">
                  CASO DE ESTUDIO
                </span>
                <TrendingUp className="w-5 h-5 text-white" />
              </div>

              <div className="my-8">
                <div className="font-serif text-4xl md:text-5xl text-white leading-tight mb-2">
                  The Bellacy Studio
                </div>
                <p className="text-xs md:text-sm text-white/85 font-light">
                  Posicionamiento local en Google Maps combinado con pauta
                  inteligente de alta conversión.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    +330%
                  </div>
                  <div className="text-[11px] text-white/80">
                    Crecimiento en ingresos
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    3 Meses
                  </div>
                  <div className="text-[11px] text-white/80">
                    Tiempo de ejecución
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Panel Derecho: Narrativa íntegra de The Bellacy Studio */}
            <motion.div
              variants={fadeUpBlur}
              className="lg:col-span-4 rounded-2xl bg-[#08080B] border border-white/[0.07] p-7 flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF8B60] mb-4">
                  <Activity className="w-4 h-4" />
                  Impacto Real & Medible
                </div>
                <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed">
                  &ldquo;Para{" "}
                  <span className="text-white font-medium">
                    The Bellacy Studio
                  </span>
                  , el desafío no era la calidad de su servicio, sino su
                  visibilidad. Implementamos una reestructuración completa de su
                  posicionamiento local en Google Maps y lo potenciamos con
                  campañas de anuncios precisas. El resultado: en tan solo 3
                  meses, pasaron de una facturación de{" "}
                  <span className="text-white font-medium">
                    $300 USD a $1.300 USD mensuales
                  </span>
                  , estableciendo un sistema predecible de adquisición de
                  clientes.&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">
                    The Bellacy Studio
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Ecosistema Local + Pauta Digital
                  </div>
                </div>
                <a
                  href="#agendar"
                  className="text-xs font-medium text-[#FF8B60] hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Replicar sistema <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA FINAL + FOOTER CON WATERMARK GIGANTE (Estilo 00:18 - 00:21) */}
      <section
        id="agendar"
        className="relative pt-28 pb-16 px-6 overflow-hidden scroll-mt-20"
      >
        {/* Haz de luz horizontal superior estilo 00:18 */}
        <div className="max-w-5xl mx-auto mb-20 relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-6 bg-[#FF5B22]/25 blur-xl pointer-events-none" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpBlur}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 rounded-md mb-6">
            EMPIEZA HOY
          </span>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight mb-6">
            ¿Listo para <span className="text-zinc-400">escalar?</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Agenda una reunión estratégica de 30 minutos con nuestro equipo.
            Evaluaremos tu situación actual y diseñaremos un plan de acción a
            medida.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-b from-[#FF6B35] to-[#E54310] text-white px-8 py-4 rounded-xl text-base md:text-lg font-medium inline-flex items-center gap-2 shadow-[0_0_35px_rgba(255,91,34,0.45)] border border-[#FF8A61]/40 hover:brightness-110 transition-all cursor-pointer"
            >
              Agendar Auditoría Gratuita <ChevronRight className="w-5 h-5" />
            </motion.button>
            <a
              href="#corporativo"
              className="bg-white/[0.06] hover:bg-white/[0.11] text-white border border-white/[0.12] px-7 py-4 rounded-xl text-base font-medium transition-all"
            >
              Explorar Ecosistemas
            </a>
          </div>
        </motion.div>

        {/* Tarjeta Footer estructurada como en 00:20 */}
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#0A0A0D] border border-white/[0.08] p-8 md:p-12 relative z-10">
          <div className="grid md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.06]">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D93800] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-xl font-semibold tracking-tight">
                  Dynamo Solutions<span className="text-[#FF5B22]">.</span>
                </span>
              </div>
              <p className="text-sm text-zinc-400 max-w-sm font-light leading-relaxed">
                Arquitectos de ecosistemas digitales. Automatización,
                posicionamiento y escalabilidad para empresas y profesionales.
              </p>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="font-medium text-white mb-3">Ecosistema 01</div>
                <ul className="space-y-2 text-zinc-400 text-xs">
                  <li>
                    <a href="#corporativo" className="hover:text-white transition-colors">
                      Desarrollo E-commerce & Web
                    </a>
                  </li>
                  <li>
                    <a href="#corporativo" className="hover:text-white transition-colors">
                      SEO, GEO & Google Business
                    </a>
                  </li>
                  <li>
                    <a href="#corporativo" className="hover:text-white transition-colors">
                      SEM & Meta Ads
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-medium text-white mb-3">Ecosistema 02</div>
                <ul className="space-y-2 text-zinc-400 text-xs">
                  <li>
                    <a href="#profesionales" className="hover:text-white transition-colors">
                      Modelo 80/20 Riesgo Cero
                    </a>
                  </li>
                  <li>
                    <a href="#profesionales" className="hover:text-white transition-colors">
                      Reservas IA en WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="#profesionales" className="hover:text-white transition-colors">
                      Autoridad Local Google Maps
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-medium text-white mb-3">Compañía</div>
                <ul className="space-y-2 text-zinc-400 text-xs">
                  <li>
                    <a href="#manifiesto" className="hover:text-white transition-colors">
                      Sobre Nosotros · El Manifiesto
                    </a>
                  </li>
                  <li>
                    <a href="#caso-estudio" className="hover:text-white transition-colors">
                      Caso The Bellacy Studio
                    </a>
                  </li>
                  <li>
                    <a href="#agendar" className="hover:text-white transition-colors">
                      Agendar Auditoría Gratuita
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <div>© 2026 Dynamo Solutions. Todos los derechos reservados.</div>
            <div className="font-mono text-[11px] text-zinc-400">
              Automatización & Escalabilidad Digital
            </div>
          </div>
        </div>

        {/* Marca de agua gigante inferior idéntica al cierre 00:21 de la referencia */}
        <div className="max-w-7xl mx-auto text-center select-none pointer-events-none overflow-hidden -mt-4">
          <div className="font-sans font-bold text-[15vw] leading-none tracking-tighter bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-transparent">
            Dynamo
          </div>
        </div>
      </section>
    </div>
  );
}
