"use client";

import { useState, type CSSProperties } from "react";
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
  Sun,
  Moon,
  SlidersHorizontal,
} from "lucide-react";

// Interpolación lineal entre dos canales o valores
function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function rgb(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

// Interpolación por tramos para pasar por una rica escala de grises intermedios
function sampleStops(stops: [number, [number, number, number]][], lum: number) {
  const clamped = Math.max(0, Math.min(100, lum));
  for (let i = 0; i < stops.length - 1; i++) {
    const [p0, c0] = stops[i];
    const [p1, c1] = stops[i + 1];
    if (clamped >= p0 && clamped <= p1) {
      const t = (clamped - p0) / (p1 - p0 || 1);
      return [
        lerp(c0[0], c1[0], t),
        lerp(c0[1], c1[1], t),
        lerp(c0[2], c1[2], t),
      ] as [number, number, number];
    }
  }
  return stops[stops.length - 1][1];
}

function getToneLabel(lum: number) {
  if (lum <= 8) return "Negro Puro (Dark)";
  if (lum <= 30) return "Gris Carbón";
  if (lum <= 55) return "Gris Pizarra Medio";
  if (lum <= 80) return "Gris Plata Claro";
  return "Blanco (Light)";
}

export default function DynamoLanding() {
  const [activeStep, setActiveStep] = useState<number>(0);
  // 0 = Negro (Dark) -> 20..80 = Escala de Grises -> 100 = Blanco (Light)
  const [luminosity, setLuminosity] = useState<number>(0);
  // Coordenadas del cursor para iluminar y mover la grilla de El Manifiesto
  const [manifestoMouse, setManifestoMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 0, y: 0, active: false });
  // Porcentaje de develado de izquierda a derecha (0 = Antes US$ 300, 100 = Después US$ 1.300)
  const [bellacyReveal, setBellacyReveal] = useState<number>(35);

  // Cálculo continuo de la paleta según el nivel de luminosidad (0 - 100)
  const bgPrimaryRGB = sampleStops(
    [
      [0, [5, 5, 5]], // #050505 Negro profundo
      [25, [28, 28, 32]], // #1c1c20 Gris carbón oscuro
      [50, [72, 72, 80]], // #484850 Gris neutro medio
      [75, [175, 175, 184]], // #afafb8 Gris plata
      [100, [248, 248, 250]], // #f8f8fa Blanco limpio
    ],
    luminosity
  );

  const bgSecondaryRGB = sampleStops(
    [
      [0, [8, 8, 11]],
      [25, [36, 36, 42]],
      [50, [84, 84, 94]],
      [75, [190, 190, 198]],
      [100, [238, 238, 243]],
    ],
    luminosity
  );

  const bgCardRGB = sampleStops(
    [
      [0, [12, 12, 15]],
      [25, [44, 44, 52]],
      [50, [56, 56, 64]],
      [75, [215, 215, 222]],
      [100, [255, 255, 255]],
    ],
    luminosity
  );

  const bgCardInnerRGB = sampleStops(
    [
      [0, [8, 8, 10]],
      [25, [32, 32, 38]],
      [50, [44, 44, 52]],
      [75, [198, 198, 206]],
      [100, [242, 242, 246]],
    ],
    luminosity
  );

  // El texto invierte suavemente al cruzar el umbral gris medio-claro (~58%) para mantener legibilidad total
  const isLightModeSide = luminosity >= 58;

  const textPrimary = isLightModeSide
    ? rgb(
        ...sampleStops(
          [
            [58, [24, 24, 28]],
            [100, [9, 9, 11]],
          ],
          luminosity
        )
      )
    : rgb(
        ...sampleStops(
          [
            [0, [255, 255, 255]],
            [57, [250, 250, 252]],
          ],
          luminosity
        )
      );

  const textSecondary = isLightModeSide
    ? rgb(
        ...sampleStops(
          [
            [58, [52, 52, 60]],
            [100, [63, 63, 70]],
          ],
          luminosity
        )
      )
    : rgb(
        ...sampleStops(
          [
            [0, [161, 161, 170]],
            [57, [228, 228, 234]],
          ],
          luminosity
        )
      );

  const textMuted = isLightModeSide
    ? rgb(
        ...sampleStops(
          [
            [58, [82, 82, 91]],
            [100, [113, 113, 122]],
          ],
          luminosity
        )
      )
    : rgb(
        ...sampleStops(
          [
            [0, [113, 113, 122]],
            [57, [200, 200, 210]],
          ],
          luminosity
        )
      );

  const borderColor = isLightModeSide
    ? `rgba(0, 0, 0, ${(0.1 + ((luminosity - 58) / 42) * 0.06).toFixed(2)})`
    : `rgba(255, 255, 255, ${(0.08 + (luminosity / 58) * 0.1).toFixed(2)})`;

  const gridLineColor = isLightModeSide
    ? "rgba(0, 0, 0, 0.07)"
    : "rgba(255, 255, 255, 0.06)";

  const bgPrimary = rgb(...bgPrimaryRGB);
  const bgSecondary = rgb(...bgSecondaryRGB);
  const bgCard = rgb(...bgCardRGB);
  const bgCardInner = rgb(...bgCardInnerRGB);
  const navBg = `rgba(${bgPrimaryRGB[0]}, ${bgPrimaryRGB[1]}, ${bgPrimaryRGB[2]}, 0.82)`;

  const themeVars = {
    "--bg-primary": bgPrimary,
    "--bg-secondary": bgSecondary,
    "--bg-card": bgCard,
    "--bg-card-inner": bgCardInner,
    "--text-primary": textPrimary,
    "--text-secondary": textSecondary,
    "--text-muted": textMuted,
    "--border-subtle": borderColor,
  } as CSSProperties;

  // Variantes de animación inspiradas en la referencia
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
    <div
      style={{
        ...themeVars,
        backgroundColor: bgPrimary,
        color: textPrimary,
      }}
      className="min-h-screen font-sans selection:bg-[#FF5B22]/30 selection:text-white transition-colors duration-200"
    >
      {/* NAVEGACIÓN PRINCIPAL CON NIVELADOR DE LUMINOSIDAD */}
      <header className="fixed w-full top-0 z-50">
        <nav
          style={{
            backgroundColor: navBg,
            borderColor,
          }}
          className="backdrop-blur-xl border-b transition-colors duration-200"
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D93800] flex items-center justify-center shadow-[0_0_15px_rgba(255,91,34,0.4)]">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span
                style={{ color: textPrimary }}
                className="text-xl font-semibold tracking-tight"
              >
                Dynamo<span className="text-[#FF5B22]">.</span>
              </span>
            </a>

            <div
              style={{ color: textSecondary }}
              className="hidden lg:flex items-center gap-7 text-sm"
            >
              <a href="#manifiesto" className="hover:opacity-75 transition-opacity">
                Sobre Nosotros
              </a>
              <a href="#corporativo" className="hover:opacity-75 transition-opacity">
                Soluciones Corporativas
              </a>
              <a href="#profesionales" className="hover:opacity-75 transition-opacity">
                Impulso Profesionales
              </a>
              <a href="#caso-estudio" className="hover:opacity-75 transition-opacity">
                Caso de Estudio
              </a>
            </div>

            <div className="flex items-center gap-3">
              {/* Barra de Luminosidad integrada en el Header */}
              <div
                style={{
                  backgroundColor: bgCard,
                  borderColor,
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm"
                title="Nivelar tonos entre Negro (Dark), Grises intermedios y Blanco (Light)"
              >
                <button
                  type="button"
                  onClick={() => setLuminosity(0)}
                  className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Modo Oscuro"
                >
                  <Moon className="w-3.5 h-3.5 text-[#FF6B35]" />
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={luminosity}
                  onChange={(e) => setLuminosity(Number(e.target.value))}
                  aria-label="Nivel de luminosidad"
                  className="w-20 sm:w-28 h-1.5 rounded-lg appearance-none cursor-pointer accent-[#FF5B22]"
                  style={{
                    background:
                      "linear-gradient(to right, #050505 0%, #3f3f46 35%, #71717a 60%, #d4d4d8 82%, #ffffff 100%)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setLuminosity(100)}
                  className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Modo Claro"
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

              <a
                href="#agendar"
                className="bg-gradient-to-b from-[#FF6B35] to-[#E84311] text-white px-5 py-2 rounded-lg text-xs md:text-sm font-medium hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,91,34,0.35)] border border-[#FF8559]/40 flex items-center gap-1.5 shrink-0"
              >
                Agendar Reunión
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO SECTION CON VIDEO FIJO EN EL BANNER SUPERIOR (50% TRANSPARENCIA) */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center pt-36 pb-24 md:pt-44 md:pb-32 px-6 text-white">
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

        {/* Fundido inferior dinámico hacia el tono actual de la página */}
        <div
          style={{
            background: `linear-gradient(to top, ${bgPrimary} 0%, transparent 100%)`,
          }}
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none transition-colors duration-200"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
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
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6 text-white"
            >
              Automatización y escalabilidad{" "}
              <span className="text-zinc-300">para negocios modernos.</span>
            </motion.h1>

            <motion.p
              variants={fadeUpBlur}
              className="text-base md:text-lg text-zinc-200 mb-9 max-w-xl font-light leading-relaxed"
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
                className="bg-white/[0.1] hover:bg-white/[0.16] text-white border border-white/[0.2] backdrop-blur-md px-7 py-3.5 rounded-xl text-sm md:text-base font-medium transition-all"
              >
                Agendar Reunión
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* EL MANIFIESTO (SOBRE NOSOTROS) — Con grilla interactiva naranja al pasar el cursor */}
      <section
        id="manifiesto"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setManifestoMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          });
        }}
        onMouseLeave={() =>
          setManifestoMouse((prev) => ({ ...prev, active: false }))
        }
        style={{ borderColor, backgroundColor: bgPrimary }}
        className="relative py-28 md:py-36 px-6 border-t overflow-hidden scroll-mt-20 transition-colors duration-200"
      >
        {/* Capa 1: Fondo de cuadrícula base con ligero desplazamiento parallax */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `linear-gradient(to right, ${gridLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridLineColor} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            transform: manifestoMouse.active
              ? `translate3d(${((manifestoMouse.x % 72) - 36) * 0.12}px, ${((manifestoMouse.y % 72) - 36) * 0.12}px, 0)`
              : "translate3d(0, 0, 0)",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 100%)",
          }}
        />

        {/* Capa 2: Líneas de cuadrícula que se iluminan en Naranja (#FF5B22) y se mueven siguiendo el cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: manifestoMouse.active ? 1 : 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255, 91, 34, 0.85) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255, 91, 34, 0.85) 1.5px, transparent 1.5px)",
            backgroundSize: "72px 72px",
            transform: manifestoMouse.active
              ? `translate3d(${((manifestoMouse.x % 72) - 36) * 0.22}px, ${((manifestoMouse.y % 72) - 36) * 0.22}px, 0)`
              : "translate3d(0, 0, 0)",
            maskImage: `radial-gradient(280px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, #000 0%, rgba(0,0,0,0.4) 55%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(280px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, #000 0%, rgba(0,0,0,0.4) 55%, transparent 100%)`,
            filter: "drop-shadow(0 0 8px rgba(255, 91, 34, 0.65))",
          }}
        />

        {/* Capa 3: Celda activa y halo cálido naranja bajo el cursor */}
        {manifestoMouse.active && (
          <>
            <div
              className="absolute pointer-events-none transition-all duration-150 ease-out rounded-sm"
              style={{
                width: 72,
                height: 72,
                left: Math.floor(manifestoMouse.x / 72) * 72,
                top: Math.floor(manifestoMouse.y / 72) * 72,
                backgroundColor: "rgba(255, 91, 34, 0.14)",
                border: "1px solid rgba(255, 107, 53, 0.6)",
                boxShadow: "0 0 25px rgba(255, 91, 34, 0.35)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(340px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(255, 91, 34, 0.13), transparent 75%)`,
              }}
            />
          </>
        )}

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="mb-8"
          >
            <span
              style={{
                borderColor,
                backgroundColor: bgCard,
                color: textSecondary,
              }}
              className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] border px-3.5 py-1.5 rounded-md"
            >
              SOBRE NOSOTROS · EL MANIFIESTO
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-10 max-w-4xl mx-auto"
          >
            No somos una agencia tradicional;{" "}
            <span
              style={{ backgroundColor: bgCard, borderColor }}
              className="inline-flex items-center justify-center align-middle mx-1 w-10 h-10 md:w-12 md:h-12 rounded-xl border shadow-inner"
            >
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-[#FF6B35]" />
            </span>{" "}
            somos arquitectos de{" "}
            <span style={{ color: textSecondary }}>ecosistemas digitales</span>{" "}
            <span
              style={{ backgroundColor: bgCard, borderColor }}
              className="inline-flex items-center justify-center align-middle mx-1 w-10 h-10 md:w-12 md:h-12 rounded-xl border shadow-inner"
            >
              <Zap
                style={{ color: textPrimary }}
                className="w-5 h-5 md:w-6 md:h-6"
              />
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
            <p className="text-xl md:text-2xl font-light leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-1">
              {manifestoWords.map((word, idx) => {
                const isHighlight =
                  word === "Dynamo" ||
                  word === "Solutions" ||
                  word === "democratizar" ||
                  word === "escalabilidad.";
                return (
                  <motion.span
                    key={idx}
                    variants={wordRevealItem}
                    style={{
                      color: isHighlight ? textPrimary : textSecondary,
                    }}
                    className={isHighlight ? "font-medium" : ""}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpBlur}
            style={{ color: textSecondary }}
            className="text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Ya seas una empresa consolidada buscando dominar su sector, o un
            profesional independiente dando el salto digital, construimos la
            infraestructura tecnológica y estratégica que necesitas para operar
            en automático. Nosotros diseñamos, posicionamos y aceleramos tu
            negocio; tú te enfocas en lo que mejor sabes hacer.
          </motion.p>

          {/* Píldoras de especialidades interactivas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ borderColor }}
            className="pt-6 border-t max-w-3xl mx-auto"
          >
            <div style={{ color: textMuted }} className="text-xs mb-4">
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
                  style={{
                    backgroundColor: bgCard,
                    borderColor,
                    color: textSecondary,
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border hover:border-[#FF5B22]/60 text-xs transition-all"
                >
                  <span>{chip.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESUMEN EJECUTIVO DE LOS DOS ECOSISTEMAS */}
      <section
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 px-6 border-t transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span
              style={{
                borderColor,
                backgroundColor: bgCard,
                color: textSecondary,
              }}
              className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] border px-3.5 py-1.5 rounded-md mb-5"
            >
              DOS MODELOS DE ESCALABILIDAD
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Un Ecosistema.{" "}
              <span style={{ color: textSecondary }}>
                Dos Caminos de Crecimiento.
              </span>
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
              style={{ backgroundColor: bgCard, borderColor }}
              className="group relative rounded-3xl border p-8 md:p-10 overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF5B22]/10 blur-3xl pointer-events-none group-hover:bg-[#FF5B22]/20 transition-all" />

              <div
                style={{ backgroundColor: bgCardInner, borderColor }}
                className="relative h-36 mb-8 rounded-2xl border p-5 flex items-center justify-center gap-4 overflow-hidden"
              >
                <div
                  style={{ backgroundColor: bgCard, borderColor }}
                  className="w-12 h-12 rounded-xl border flex items-center justify-center"
                >
                  <Code2
                    style={{ color: textSecondary }}
                    className="w-5 h-5"
                  />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] border border-[#FF946B]/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,91,34,0.45)] group-hover:scale-110 transition-transform duration-500">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div
                  style={{ backgroundColor: bgCard, borderColor }}
                  className="w-12 h-12 rounded-xl border flex items-center justify-center"
                >
                  <Target
                    style={{ color: textSecondary }}
                    className="w-5 h-5"
                  />
                </div>
                <span
                  style={{
                    backgroundColor: bgCard,
                    borderColor,
                    color: textMuted,
                  }}
                  className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest border px-2.5 py-1 rounded-md"
                >
                  ECOSISTEMA 01
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                  Soluciones Corporativas
                </h3>
                <p
                  style={{ color: textSecondary }}
                  className="mb-6 leading-relaxed text-sm md:text-base font-light"
                >
                  Desarrollo web a medida, campañas de publicidad (SEM/Meta) y
                  optimización SEO avanzada. Construimos la infraestructura
                  digital que tu empresa necesita para dominar el mercado.
                </p>
                <ul
                  style={{ color: textSecondary }}
                  className="space-y-3 text-sm"
                >
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
              style={{ backgroundColor: bgCard, borderColor }}
              className="group relative rounded-3xl border p-8 md:p-10 overflow-hidden transition-all flex flex-col justify-between"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none group-hover:bg-[#FF5B22]/20 transition-all" />

              <div
                style={{ backgroundColor: bgCardInner, borderColor }}
                className="relative h-36 mb-8 rounded-2xl border p-5 flex items-center justify-center gap-4 overflow-hidden"
              >
                <div
                  style={{ backgroundColor: bgCard, borderColor }}
                  className="w-12 h-12 rounded-xl border flex items-center justify-center"
                >
                  <Handshake
                    style={{ color: textSecondary }}
                    className="w-5 h-5"
                  />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] border border-[#FF946B]/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,91,34,0.45)] group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div
                  style={{ backgroundColor: bgCard, borderColor }}
                  className="w-12 h-12 rounded-xl border flex items-center justify-center"
                >
                  <BotMessageSquare
                    style={{ color: textSecondary }}
                    className="w-5 h-5"
                  />
                </div>
                <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF5B22]/15 border border-[#FF5B22]/30 px-2.5 py-1 rounded-md">
                  MODELO 80/20
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                  Impulso para Profesionales
                </h3>
                <p
                  style={{ color: textSecondary }}
                  className="mb-6 leading-relaxed text-sm md:text-base font-light"
                >
                  Digitalizamos tu oficio sin costos iniciales de desarrollo.
                  Creamos tu plataforma de reservas, gestionamos tu presencia y
                  crecemos contigo bajo un modelo a comisión (80/20).
                </p>
                <ul
                  style={{ color: textSecondary }}
                  className="space-y-3 text-sm"
                >
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

      {/* ECOSISTEMA 1 DETALLE: SOLUCIONES CORPORATIVAS */}
      <section
        id="corporativo"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="py-28 md:py-36 px-6 border-t scroll-mt-20 transition-colors duration-200"
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
              <span
                style={{
                  borderColor,
                  backgroundColor: bgCard,
                  color: textSecondary,
                }}
                className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] border px-3.5 py-1.5 rounded-md mb-5"
              >
                ECOSISTEMA 01 · SOLUCIONES CORPORATIVAS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Soluciones{" "}
                <span style={{ color: textSecondary }}>Corporativas.</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="max-w-md text-sm md:text-base font-light leading-relaxed"
            >
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
                  style={{ backgroundColor: bgCard, borderColor }}
                  className="group relative rounded-3xl border p-7 md:p-8 flex flex-col justify-between overflow-hidden transition-all"
                >
                  <div>
                    <div
                      style={{ backgroundColor: bgCardInner, borderColor }}
                      className="relative h-40 mb-7 rounded-2xl border p-4 flex flex-col justify-between overflow-hidden"
                    >
                      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#FF5B22]/15 blur-2xl pointer-events-none group-hover:bg-[#FF5B22]/25 transition-all" />

                      <div className="flex items-center justify-between">
                        <span
                          style={{ color: textMuted }}
                          className="text-[11px] font-mono"
                        >
                          [{pillar.code}] // {pillar.tag}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Running
                        </span>
                      </div>

                      <div className="flex items-center gap-3 my-auto">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] flex items-center justify-center shadow-[0_0_20px_rgba(255,91,34,0.35)] group-hover:scale-105 transition-transform shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.metrics.map((m, idx) => (
                            <span
                              key={idx}
                              style={{
                                backgroundColor: bgCard,
                                borderColor,
                                color: textSecondary,
                              }}
                              className="text-[10px] font-mono border px-2 py-1 rounded-md"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3.5 leading-snug">
                      {pillar.title}
                    </h3>
                    <p
                      style={{ color: textSecondary }}
                      className="leading-relaxed text-sm md:text-[15px] font-light"
                    >
                      {pillar.description}
                    </p>
                  </div>

                  <div
                    style={{ borderColor, color: textMuted }}
                    className="mt-8 pt-5 border-t flex items-center justify-between text-xs font-mono"
                  >
                    <span>CORPORATE // {pillar.code}</span>
                    <span
                      style={{ color: textSecondary }}
                      className="group-hover:text-[#FF6B35] transition-colors inline-flex items-center gap-1"
                    >
                      Escala & Conversión <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ECOSISTEMA 2 DETALLE: IMPULSO PARA PROFESIONALES */}
      <section
        id="profesionales"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-28 md:py-36 px-6 border-t border-b scroll-mt-20 overflow-hidden transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="grid lg:grid-cols-12 gap-8 items-end mb-16"
          >
            <div className="lg:col-span-7">
              <span className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B35] border border-[#FF5B22]/30 bg-[#FF5B22]/10 px-3.5 py-1.5 rounded-md mb-5">
                ECOSISTEMA 02 · MODELO 80/20
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Impulso para{" "}
                <span style={{ color: textSecondary }}>Profesionales.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p
                style={{ color: textSecondary }}
                className="text-sm md:text-base font-light leading-relaxed mb-5"
              >
                Orientado a oficios, técnicos y profesionales independientes:
                barberos, estética, técnicos y servicios de limpieza.
              </p>
              <a
                href="#agendar"
                style={{
                  backgroundColor: bgCard,
                  borderColor,
                  color: textPrimary,
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium hover:border-[#FF5B22]/50 transition-colors"
              >
                Aplicar al Modelo 80/20 <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
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
                    style={{
                      backgroundColor: isSelected ? bgCard : bgCardInner,
                      borderColor: isSelected
                        ? "rgba(255, 91, 34, 0.5)"
                        : borderColor,
                    }}
                    className="cursor-pointer rounded-2xl p-6 md:p-7 border transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          style={
                            !isSelected
                              ? {
                                  backgroundColor: bgCard,
                                  color: textMuted,
                                }
                              : undefined
                          }
                          className={`font-mono text-xs px-2 py-0.5 rounded ${
                            isSelected
                              ? "bg-[#FF5B22]/20 text-[#FF6B35] border border-[#FF5B22]/40"
                              : ""
                          }`}
                        >
                          [{pillar.code}]
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      style={{ color: textSecondary }}
                      className="text-sm md:text-[15px] font-light leading-relaxed"
                    >
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Escena de tarjetas flotantes en perspectiva */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: bgCardInner, borderColor }}
              className="lg:col-span-6 relative min-h-[460px] rounded-3xl border p-6 md:p-10 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#FF5B22]/15 blur-3xl pointer-events-none" />

              <motion.div
                animate={{
                  y: activeStep === 0 ? -4 : 0,
                  borderColor:
                    activeStep === 0 ? "rgba(255,91,34,0.6)" : borderColor,
                }}
                style={{ backgroundColor: bgCard }}
                className="relative z-10 self-end w-full sm:w-80 rounded-2xl border p-5 shadow-xl -rotate-2"
              >
                <div
                  style={{ color: textMuted }}
                  className="flex items-center justify-between text-xs mb-2"
                >
                  <span className="font-mono uppercase text-[10px]">
                    [01] Modelo de Éxito Compartido
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold">80 / 20</span>
                  <span className="text-xs text-emerald-500 font-mono">
                    +$0 Inversión Inicial
                  </span>
                </div>
                <div
                  style={{ color: textMuted }}
                  className="text-[11px] mt-1"
                >
                  Si tú no ganas, nosotros tampoco
                </div>
              </motion.div>

              <div className="relative z-10 my-6 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-[#FF5B22]/25 blur-xl animate-pulse" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#D43800] border border-[#FF9B73]/50 flex items-center justify-center shadow-[0_0_40px_rgba(255,91,34,0.6)] rotate-6">
                    <Zap className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid sm:grid-cols-2 gap-4">
                <motion.div
                  animate={{
                    y: activeStep === 1 ? -4 : 0,
                    borderColor:
                      activeStep === 1 ? "rgba(255,91,34,0.6)" : borderColor,
                  }}
                  style={{ backgroundColor: bgCard }}
                  className="rounded-2xl border p-4 shadow-lg rotate-1"
                >
                  <div className="flex items-center gap-2 text-xs font-medium mb-1.5">
                    <BotMessageSquare className="w-4 h-4 text-[#FF6B35]" />
                    <span>Asistente IA WhatsApp</span>
                  </div>
                  <div
                    style={{ color: textSecondary }}
                    className="text-[11px] leading-snug mb-2"
                  >
                    Atiende consultas, perfila clientes y agenda citas
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3" /> Activo 24/7
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: activeStep === 2 ? -4 : 0,
                    borderColor:
                      activeStep === 2 ? "rgba(255,91,34,0.6)" : borderColor,
                  }}
                  style={{ backgroundColor: bgCard }}
                  className="rounded-2xl border p-4 shadow-lg -rotate-1"
                >
                  <div className="flex items-center gap-2 text-xs font-medium mb-1.5">
                    <MapPin className="w-4 h-4 text-[#FF6B35]" />
                    <span>Autoridad Google Maps</span>
                  </div>
                  <div
                    style={{ color: textSecondary }}
                    className="text-[11px] leading-snug mb-2"
                  >
                    Posicionamiento local sin exponer tu dirección personal
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF6B35] bg-[#FF5B22]/15 px-2 py-0.5 rounded">
                    ● Reservas Orgánicas
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN EXCLUSIVA: EL CASO THE BELLACY STUDIO — Tarjeta Interactiva Antes / Después (Develado Izquierda a Derecha) */}
      <section
        id="caso-estudio"
        className="py-28 md:py-36 px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpBlur}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span
            style={{
              borderColor,
              backgroundColor: bgCard,
              color: textSecondary,
            }}
            className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] border px-3.5 py-1.5 rounded-md mb-5"
          >
            CASO DE ESTUDIO EXCLUSIVO · THE BELLACY STUDIO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            Transformación digital con{" "}
            <span style={{ color: textSecondary }}>resultados medibles.</span>
          </h2>
          <p style={{ color: textSecondary }} className="text-sm md:text-base font-light">
            Desliza la tarjeta de <strong style={{ color: textPrimary }} className="font-medium">izquierda a derecha</strong> para develar el antes y el después de The Bellacy Studio.
          </p>
        </motion.div>

        {/* Controles rápidos de comparación Antes vs Después */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setBellacyReveal(8)}
            style={{
              backgroundColor: bellacyReveal <= 15 ? "#27272a" : bgCard,
              borderColor: bellacyReveal <= 15 ? "#71717a" : borderColor,
              color: bellacyReveal <= 15 ? "#ffffff" : textSecondary,
            }}
            className="px-4 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            ← Ver Antes (US$ 300/mes)
          </button>
          <button
            type="button"
            onClick={() => setBellacyReveal(50)}
            style={{
              backgroundColor:
                bellacyReveal > 15 && bellacyReveal < 85 ? bgCardInner : bgCard,
              borderColor:
                bellacyReveal > 15 && bellacyReveal < 85
                  ? "#FF6B35"
                  : borderColor,
              color: textPrimary,
            }}
            className="px-4 py-2 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            Comparar 50 / 50
          </button>
          <button
            type="button"
            onClick={() => setBellacyReveal(94)}
            className="px-4 py-2 rounded-xl border border-[#FF8559]/50 bg-gradient-to-r from-[#FF6B35] to-[#E54310] text-white text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(255,91,34,0.35)] transition-all cursor-pointer"
          >
            Develar Después (US$ 1.300/mes) →
          </button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          style={{ backgroundColor: bgCard, borderColor }}
          className="rounded-[2rem] border p-5 md:p-8 shadow-2xl transition-colors duration-200"
        >
          {/* TARJETA INTERACTIVA DE DEVELADO IZQUIERDA A DERECHA */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 select-none min-h-[520px] md:min-h-[460px]">
            {/* Input range invisible que cubre toda la tarjeta para arrastrar de izquierda a derecha con mouse o touch */}
            <input
              type="range"
              min={0}
              max={100}
              value={bellacyReveal}
              onChange={(e) => setBellacyReveal(Number(e.target.value))}
              aria-label="Develar de izquierda a derecha el antes y después de The Bellacy Studio"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
            />

            {/* =========================================================
                CAPA BASE (ANTES DE CONTRATAR NUESTROS SERVICIOS: US$ 300)
               ========================================================= */}
            <div className="w-full h-full min-h-[520px] md:min-h-[460px] bg-gradient-to-br from-[#141418] via-[#0D0D10] to-[#08080A] text-white p-7 md:p-12 flex flex-col justify-between relative">
              <div className="absolute right-8 bottom-8 opacity-5 pointer-events-none">
                <BarChart3 className="w-56 h-56 text-zinc-400" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-900/90 border border-zinc-700/80 px-3.5 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  ANTES DE DYNAMO SOLUTIONS · ESTADO INICIAL
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Desliza de izquierda a derecha para transformar →
                </span>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center my-8">
                <div className="lg:col-span-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                    Caso de Estudio · Diagnóstico Inicial
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-200 mb-3">
                    The Bellacy Studio
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-6">
                    Antes de contratar nuestros servicios, el estudio contaba con
                    una excelente calidad de servicio pero carecía de visibilidad
                    local estructurada en Google Maps y de campañas de adquisición
                    digital.
                  </p>

                  <div className="inline-block rounded-2xl bg-black/60 border border-zinc-800 p-5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                      Facturación Mensual (Antes)
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-bold text-zinc-300">
                        US$ 300
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        / mes
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Flujo limitado e impredecible de nuevos clientes
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                    Situación Previa a la Intervención
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        title: "Posicionamiento Google Maps",
                        state: "Baja visibilidad local",
                      },
                      {
                        title: "Campañas de Anuncios",
                        state: "Sin pauta estructurada",
                      },
                      {
                        title: "Captación de Clientes",
                        state: "Dependiente del boca a boca",
                      },
                      {
                        title: "Facturación Mensual",
                        state: "Estancada en US$ 300 / mes",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-zinc-900/70 border border-zinc-800/90 p-4 flex flex-col justify-between"
                      >
                        <span className="text-zinc-300 font-medium mb-1">
                          {item.title}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          {item.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
                <span>ESTADO: PRE-OPTIMIZACIÓN</span>
                <span>INGRESOS MENSUALES: US$ 300</span>
              </div>
            </div>

            {/* =========================================================
                CAPA SUPERIOR DEVELADA (DESPUÉS DE DYNAMO SOLUTIONS: US$ 1.300)
                Se devela de izquierda a derecha según bellacyReveal (%)
               ========================================================= */}
            <div
              style={{
                clipPath: `inset(0 ${100 - bellacyReveal}% 0 0)`,
              }}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FF7A45] via-[#D94B1A] to-[#1E0D07] text-white p-7 md:p-12 flex flex-col justify-between z-10"
            >
              <div className="absolute right-8 bottom-8 opacity-15 pointer-events-none">
                <BarChart3 className="w-56 h-56 text-white" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white bg-black/35 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  DESPUÉS DE DYNAMO SOLUTIONS · EN TAN SOLO 3 MESES
                </span>
                <span className="text-xs font-mono text-white/90 bg-black/25 px-3 py-1 rounded-md border border-white/15">
                  ROI VERIFICADO: +330%
                </span>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center my-8">
                <div className="lg:col-span-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/80 mb-2">
                    Caso de Estudio · Ecosistema Activo
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
                    The Bellacy Studio
                  </h3>
                  <p className="text-sm md:text-base text-white/90 font-light leading-relaxed mb-6">
                    Posicionamiento local en Google Maps combinado con pauta
                    inteligente de alta conversión. Sistema predecible y
                    constante de adquisición de nuevos clientes.
                  </p>

                  <div className="inline-flex flex-wrap items-center gap-6 rounded-2xl bg-black/45 backdrop-blur-md border border-white/25 p-5 shadow-2xl">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white/75 mb-1">
                        Facturación Mensual (Después)
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-white/50 line-through text-base font-mono">
                          US$ 300
                        </span>
                        <span className="text-4xl md:text-5xl font-bold text-white">
                          US$ 1.300
                        </span>
                        <span className="text-xs font-mono text-white/80">
                          / mes
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 pl-4 border-l border-white/20">
                      <div>
                        <div className="text-2xl font-bold text-emerald-300">
                          +330%
                        </div>
                        <div className="text-[11px] text-white/80">
                          Crecimiento
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          3 Meses
                        </div>
                        <div className="text-[11px] text-white/80">
                          Ejecución
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-white/85 mb-3">
                    Estrategia Implementada con Éxito
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        title: "Posicionamiento Google Maps",
                        state: "Activo · Top Local",
                      },
                      {
                        title: "Campañas de Anuncios Precisas",
                        state: "Activo · Alta Conversión",
                      },
                      {
                        title: "Sistema Predecible de Clientes",
                        state: "Activo · Flujo Constante",
                      },
                      {
                        title: "Escala de Facturación",
                        state: "De US$ 300 a US$ 1.300/mes",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-black/40 backdrop-blur-md border border-white/20 p-4 flex flex-col justify-between"
                      >
                        <span className="text-white font-medium mb-1">
                          {item.title}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {item.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/90">
                <span>RESULTADO: ECOSISTEMA EN ESCALA AUTOMÁTICA</span>
                <span>FACTURACIÓN ALCANZADA: US$ 1.300 / MES (+330%)</span>
              </div>
            </div>

            {/* =========================================================
                DIVISOR VERTICAL INTERACTIVO (CORTINA IZQUIERDA -> DERECHA)
               ========================================================= */}
            <div
              style={{ left: `${bellacyReveal}%` }}
              className="absolute inset-y-0 z-20 pointer-events-none -translate-x-1/2 flex flex-col items-center justify-center"
            >
              {/* Línea vertical luminosa */}
              <div className="w-0.5 h-full bg-white shadow-[0_0_20px_#ffffff,0_0_35px_#FF5B22]" />

              {/* Botón central de arrastre */}
              <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-full bg-white text-black shadow-[0_0_35px_rgba(0,0,0,0.8),0_0_25px_rgba(255,91,34,0.9)] border-2 border-[#FF6B35] flex items-center justify-center font-mono text-xs font-bold">
                  ↔
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-black/85 text-white border border-white/20 text-[10px] font-mono whitespace-nowrap shadow-lg">
                  {bellacyReveal}% develado
                </span>
              </div>
            </div>
          </div>

          {/* BLOQUE INFERIOR CON LA NARRATIVA COMPLETA Y CTA DE LA SECCIÓN */}
          <div
            style={{ backgroundColor: bgCardInner, borderColor }}
            className="mt-6 rounded-2xl border p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6B35] mb-2">
                <Activity className="w-4 h-4" />
                Impacto Real & Medible · Resumen del Caso
              </div>
              <p
                style={{ color: textSecondary }}
                className="text-sm md:text-base font-light leading-relaxed"
              >
                &ldquo;Para{" "}
                <span style={{ color: textPrimary }} className="font-medium">
                  The Bellacy Studio
                </span>
                , el desafío no era la calidad de su servicio, sino su
                visibilidad. Implementamos una reestructuración completa de su
                posicionamiento local en Google Maps y lo potenciamos con
                campañas de anuncios precisas. El resultado: en tan solo 3
                meses, pasaron de una facturación de{" "}
                <span style={{ color: textPrimary }} className="font-medium">
                  $300 USD a $1.300 USD mensuales
                </span>
                , estableciendo un sistema predecible de adquisición de
                clientes.&rdquo;
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto">
              <a
                href="#agendar"
                className="bg-gradient-to-b from-[#FF6B35] to-[#E54310] text-white px-6 py-3.5 rounded-xl text-xs md:text-sm font-medium inline-flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,91,34,0.35)] border border-[#FF8A61]/40 hover:brightness-110 transition-all"
              >
                Replicar este sistema <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA FINAL + FOOTER CON WATERMARK GIGANTE */}
      <section
        id="agendar"
        className="relative pt-28 pb-16 px-6 overflow-hidden scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto mb-20 relative">
          <div
            style={{
              background: `linear-gradient(to right, transparent, ${borderColor}, transparent)`,
            }}
            className="h-px w-full"
          />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-6 bg-[#FF5B22]/25 blur-xl pointer-events-none" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpBlur}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <span
            style={{
              borderColor,
              backgroundColor: bgCard,
              color: textSecondary,
            }}
            className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] border px-3.5 py-1.5 rounded-md mb-6"
          >
            EMPIEZA HOY
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            ¿Listo para <span style={{ color: textSecondary }}>escalar?</span>
          </h2>
          <p
            style={{ color: textSecondary }}
            className="text-base md:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed"
          >
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
              style={{
                backgroundColor: bgCard,
                borderColor,
                color: textPrimary,
              }}
              className="border px-7 py-4 rounded-xl text-base font-medium hover:opacity-85 transition-all"
            >
              Explorar Ecosistemas
            </a>
          </div>
        </motion.div>

        {/* Tarjeta Footer */}
        <div
          style={{ backgroundColor: bgCard, borderColor }}
          className="max-w-7xl mx-auto rounded-3xl border p-8 md:p-12 relative z-10 transition-colors duration-200"
        >
          <div
            style={{ borderColor }}
            className="grid md:grid-cols-12 gap-10 pb-10 border-b"
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#D93800] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-xl font-semibold tracking-tight">
                  Dynamo Solutions<span className="text-[#FF5B22]">.</span>
                </span>
              </div>
              <p
                style={{ color: textSecondary }}
                className="text-sm max-w-sm font-light leading-relaxed"
              >
                Arquitectos de ecosistemas digitales. Automatización,
                posicionamiento y escalabilidad para empresas y profesionales.
              </p>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="font-medium mb-3">Ecosistema 01</div>
                <ul
                  style={{ color: textSecondary }}
                  className="space-y-2 text-xs"
                >
                  <li>
                    <a
                      href="#corporativo"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Desarrollo E-commerce & Web
                    </a>
                  </li>
                  <li>
                    <a
                      href="#corporativo"
                      className="hover:opacity-100 transition-opacity"
                    >
                      SEO, GEO & Google Business
                    </a>
                  </li>
                  <li>
                    <a
                      href="#corporativo"
                      className="hover:opacity-100 transition-opacity"
                    >
                      SEM & Meta Ads
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-medium mb-3">Ecosistema 02</div>
                <ul
                  style={{ color: textSecondary }}
                  className="space-y-2 text-xs"
                >
                  <li>
                    <a
                      href="#profesionales"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Modelo 80/20 Riesgo Cero
                    </a>
                  </li>
                  <li>
                    <a
                      href="#profesionales"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Reservas IA en WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="#profesionales"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Autoridad Local Google Maps
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-medium mb-3">Compañía</div>
                <ul
                  style={{ color: textSecondary }}
                  className="space-y-2 text-xs"
                >
                  <li>
                    <a
                      href="#manifiesto"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Sobre Nosotros · El Manifiesto
                    </a>
                  </li>
                  <li>
                    <a
                      href="#caso-estudio"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Caso The Bellacy Studio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#agendar"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Agendar Auditoría Gratuita
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            style={{ color: textMuted }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
          >
            <div>© 2026 Dynamo Solutions. Todos los derechos reservados.</div>
            <div className="font-mono text-[11px]">
              Automatización & Escalabilidad Digital
            </div>
          </div>
        </div>

        {/* Marca de agua gigante inferior */}
        <div className="max-w-7xl mx-auto text-center select-none pointer-events-none overflow-hidden -mt-4">
          <div
            style={{
              backgroundImage: isLightModeSide
                ? "linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)"
                : "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
            }}
            className="font-sans font-bold text-[15vw] leading-none tracking-tighter bg-clip-text text-transparent"
          >
            Dynamo
          </div>
        </div>
      </section>
    </div>
  );
}
