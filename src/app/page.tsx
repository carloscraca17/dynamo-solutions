"use client";

import React, { useState } from "react";
import {
  motion,
  Variants,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Zap,
  ArrowUpRight,
  ArrowRight,
  Code2,
  Globe,
  BarChart3,
  BotMessageSquare,
  MapPin,
  Handshake,
  CheckCircle2,
  TrendingUp,
  Layers,
  ShieldCheck,
  Clock,
  Target,
  Activity,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
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
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

// Componente reutilizable de onda topográfica 3D (inspirado en el video de referencia DigitalPro)
function TopographicWaveSVG({ className = "" }: { className?: string }) {
  const lines = Array.from({ length: 28 });
  return (
    <svg
      viewBox="0 0 900 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="topoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5246FF" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#9E38F5" stopOpacity="0.32" />
          <stop offset="80%" stopColor="#FF5864" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {lines.map((_, i) => {
        const offset = i * 9;
        const curveShift = Math.sin(i * 0.28) * 35;
        return (
          <path
            key={i}
            d={`M ${-80 + offset * 0.4} ${560 - offset * 1.4} C ${
              220 + curveShift
            } ${120 + offset * 1.2}, ${480 - curveShift} ${
              520 - offset * 1.1
            }, ${960 - offset * 0.3} ${80 + offset * 1.3}`}
            stroke="url(#topoGrad)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

// Escultura 3D de Anillos Concéntricos Iridiscentes (inspirada en los segundos 00:02-00:03 del video)
function IridescentRingsSculpture() {
  return (
    <div className="relative w-full h-[360px] sm:h-[460px] flex items-center justify-center select-none pointer-events-none">
      {/* Resplandor ambiental profundo */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#5246FF]/30 via-[#9E38F5]/25 to-[#FF5864]/20 blur-3xl" />

      <motion.div
        animate={{
          rotateZ: [0, 6, 0, -4, 0],
          y: [0, -14, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-[290px] h-[290px] sm:w-[390px] sm:h-[390px] flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-[0_25px_60px_rgba(139,61,255,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ringMetal1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#140F2D" />
              <stop offset="28%" stopColor="#5246FF" />
              <stop offset="58%" stopColor="#B832F5" />
              <stop offset="85%" stopColor="#FF5864" />
              <stop offset="100%" stopColor="#1A0B1E" />
            </linearGradient>
            <linearGradient id="ringMetal2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF7A6B" />
              <stop offset="35%" stopColor="#9E38F5" />
              <stop offset="70%" stopColor="#2B1E66" />
              <stop offset="100%" stopColor="#090712" />
            </linearGradient>
            <linearGradient id="ringRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C6BFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#E965C9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Anillo exterior 1 */}
          <ellipse
            cx="250"
            cy="290"
            rx="215"
            ry="120"
            transform="rotate(-14 250 290)"
            fill="url(#ringMetal1)"
            stroke="url(#ringRim)"
            strokeWidth="2"
          />
          <ellipse
            cx="250"
            cy="282"
            rx="175"
            ry="92"
            transform="rotate(-14 250 282)"
            fill="#06050B"
            stroke="#5246FF"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />

          {/* Anillo medio 2 */}
          <ellipse
            cx="250"
            cy="245"
            rx="185"
            ry="102"
            transform="rotate(-10 250 245)"
            fill="url(#ringMetal2)"
            stroke="url(#ringRim)"
            strokeWidth="2.2"
          />
          <ellipse
            cx="250"
            cy="238"
            rx="140"
            ry="74"
            transform="rotate(-10 250 238)"
            fill="#080610"
            stroke="#B832F5"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />

          {/* Anillo superior 3 */}
          <ellipse
            cx="250"
            cy="198"
            rx="145"
            ry="78"
            transform="rotate(-6 250 198)"
            fill="url(#ringMetal1)"
            stroke="url(#ringRim)"
            strokeWidth="2.5"
          />
          <ellipse
            cx="250"
            cy="192"
            rx="100"
            ry="50"
            transform="rotate(-6 250 192)"
            fill="#07050E"
            stroke="#FF5864"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />

          {/* Núcleo flotante */}
          <ellipse
            cx="250"
            cy="155"
            rx="82"
            ry="40"
            transform="rotate(-3 250 155)"
            fill="url(#ringMetal2)"
            stroke="url(#ringRim)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// Esfera wireframe luminosa para los ítems numerados 01, 02, 03, 04 (como en 00:02 del video)
function WireframeSphereIcon({ index }: { index: number }) {
  return (
    <div className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5246FF]/30 via-[#9E38F5]/30 to-[#FF5864]/30 blur-sm" />
      <svg
        viewBox="0 0 36 36"
        className="w-8 h-8 relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="14"
          stroke="url(#sphereGrad)"
          strokeWidth="1.2"
          strokeDasharray={index % 2 === 0 ? "3 2" : "none"}
        />
        <ellipse
          cx="18"
          cy="18"
          rx="14"
          ry="6"
          transform={`rotate(${index * 35 + 20} 18 18)`}
          stroke="url(#sphereGrad)"
          strokeWidth="1.1"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="6"
          ry="14"
          transform={`rotate(${index * 25} 18 18)`}
          stroke="url(#sphereGrad)"
          strokeWidth="1.1"
        />
        <defs>
          <linearGradient id="sphereGrad" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="50%" stopColor="#C039E5" />
            <stop offset="100%" stopColor="#FF5864" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function DynamoLanding() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Estado para la cuadrícula interactiva en la sección "El Manifiesto"
  const [manifestoMouse, setManifestoMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 500, y: 300, active: false });

  // Física Spring para la tarjeta interactiva "Antes / Después" de The Bellacy Studio
  const revealRaw = useMotionValue(52);
  const revealSpring = useSpring(revealRaw, {
    stiffness: 160,
    damping: 24,
    mass: 0.6,
  });

  // Corte diagonal moderno con efecto de onda oblicua
  const afterClipPath = useTransform(revealSpring, (v) => {
    const topEdge = Math.max(0, Math.min(100, v + 3.5));
    const bottomEdge = Math.max(0, Math.min(100, v - 3.5));
    return `polygon(0% 0%, ${topEdge}% 0%, ${bottomEdge}% 100%, 0% 100%)`;
  });

  const beamLeft = useTransform(revealSpring, (v) => `${v}%`);
  const afterScale = useTransform(revealSpring, [0, 50, 100], [1.02, 1.005, 1]);

  // Barra de luminosidad: 0 = Oscuro (Negro DigitalPro), 25..75 = Escala de Grises intermedios, 100 = Claro
  const [luminosity, setLuminosity] = useState<number>(0);

  const t = luminosity / 100;
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  const rgb = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) =>
    `rgb(${lerp(r1, r2)}, ${lerp(g1, g2)}, ${lerp(b1, b2)})`;

  // Colores base inspirados en DigitalPro (#030305 -> #08080E) con interpolación continua
  const bgPrimary = rgb(3, 3, 6, 246, 246, 250);
  const bgSecondary = rgb(7, 7, 12, 236, 236, 242);
  const bgCard = rgb(10, 10, 16, 255, 255, 255);
  const bgCardInner = rgb(6, 6, 10, 240, 240, 246);
  const textPrimary = rgb(250, 250, 252, 12, 12, 18);
  const textSecondary = rgb(168, 168, 182, 75, 75, 90);
  const textMuted = rgb(110, 110, 128, 115, 115, 132);
  const borderColor =
    t < 0.5
      ? `rgba(255, 255, 255, ${(0.08 + t * 0.1).toFixed(2)})`
      : `rgba(15, 15, 25, ${(0.1 + (t - 0.5) * 0.14).toFixed(2)})`;
  const navBg =
    t < 0.5
      ? `rgba(${lerp(4, 245)}, ${lerp(4, 245)}, ${lerp(8, 250)}, 0.86)`
      : `rgba(${lerp(4, 245)}, ${lerp(4, 245)}, ${lerp(8, 250)}, 0.92)`;
  const isLightModeSide = luminosity > 58;

  // Pilares de Soluciones Corporativas (Ecosistema 1) — con letras gigantes estilo A / B / G del video
  const corporatePillars = [
    {
      code: "01",
      letter: "A",
      title: "Desarrollo E-commerce y Web de Alto Impacto",
      description:
        "Creamos tiendas online y sitios corporativos diseñados con un único objetivo: vender. Estructuras rápidas, seguras y optimizadas para la conversión (CRO), listas para escalar tu catálogo o tus servicios sin límites técnicos.",
      icon: Code2,
      tag: "CRO & E-COMMERCE",
      metrics: ["Conversión CRO", "Arquitectura Rápida", "Escala sin Límites"],
    },
    {
      code: "02",
      letter: "B",
      title: "Posicionamiento Orgánico (SEO, GEO y Google Business)",
      description:
        "Hacemos que tus clientes te encuentren justo cuando están buscando comprar. Optimizamos tu presencia en motores de búsqueda tradicionales (SEO), motores de inteligencia artificial (GEO) y dominamos las búsquedas locales a través de una gestión estratégica de tu perfil de Google Business.",
      icon: Globe,
      tag: "SEO · GEO · LOCAL",
      metrics: ["Motores IA (GEO)", "SEO Tradicional", "Google Business"],
    },
    {
      code: "03",
      letter: "G",
      title: "Tráfico Pagado y Adquisición (SEM & Meta Ads)",
      description:
        "No compramos clics, compramos rentabilidad. Diseñamos, ejecutamos y optimizamos campañas de publicidad en Google Ads (SEM) y Meta Ads (Instagram/Facebook) enfocadas en el retorno de inversión (ROI) y la captación de leads calificados.",
      icon: Target,
      tag: "SEM & META ADS",
      metrics: ["Enfoque en ROI", "Google Ads (SEM)", "Meta Ads Leads"],
    },
  ];

  // Pilares de Impulso para Profesionales (Ecosistema 2 - Modelo 80/20)
  const professionalPillars = [
    {
      code: "01",
      letter: "E",
      title: "El Modelo de Éxito Compartido (80/20)",
      description:
        "Eliminamos la barrera de entrada. No pagas miles de dólares por el desarrollo de tu página web ni por el sistema de gestión. Nosotros invertimos en construir tu plataforma digital a medida y solo retenemos un 20% por cada servicio o reserva concretada a través del sistema. El 80% va directo a tu bolsillo. Si tú no ganas, nosotros tampoco.",
      icon: Handshake,
      badge: "80% Para Ti / 20% Éxito",
    },
    {
      code: "02",
      letter: "I",
      title: "Tu Recepcionista con Inteligencia Artificial en WhatsApp",
      description:
        "Olvídate de perder clientes por no responder a tiempo mientras estás trabajando. Integramos un asistente de IA directamente en tu WhatsApp que atiende consultas, perfila al cliente, muestra tu disponibilidad y agenda citas automáticamente las 24 horas del día, los 7 días de la semana.",
      icon: BotMessageSquare,
      badge: "WhatsApp IA 24/7",
    },
    {
      code: "03",
      letter: "M",
      title: "Autoridad Local en Google Maps",
      description:
        "Aunque trabajes a domicilio o en un estudio privado sin atención al público general, necesitas existir en el mapa. Configuramos y posicionamos tu perfil de Google Business como un 'Negocio de Área de Servicio' para que domines las búsquedas en tu zona sin exponer tu dirección personal, conectando el perfil directamente con tu calendario de reservas.",
      icon: MapPin,
      badge: "Área de Servicio",
    },
  ];

  // Ítems numerados de El Manifiesto (con el texto 100% íntegro distribuido al estilo 01, 02, 03, 04 del video)
  const manifestoItems = [
    {
      num: "01",
      heading: "ARQUITECTOS DE ECOSISTEMAS DIGITALES",
      body: "No somos una agencia tradicional; somos arquitectos de ecosistemas digitales.",
    },
    {
      num: "02",
      heading: "DEMOCRATIZAR EL CRECIMIENTO DIGITAL",
      body: "En Dynamo Solutions nacimos con una premisa clara: la tecnología de alto nivel y las estrategias de captación masiva no deberían ser exclusivas de las grandes corporaciones. Nuestro propósito es democratizar el crecimiento digital, ofreciendo soluciones que eliminan la fricción operativa y multiplican la rentabilidad.",
    },
    {
      num: "03",
      heading: "INFRAESTRUCTURA EN AUTOMÁTICO",
      body: "Ya seas una empresa consolidada buscando dominar su sector, o un profesional independiente dando el salto digital, construimos la infraestructura tecnológica y estratégica que necesitas para operar en automático.",
    },
    {
      num: "04",
      heading: "ENFOQUE EN LO QUE MEJOR SABES HACER",
      body: "Nosotros diseñamos, posicionamos y aceleramos tu negocio; tú te enfocas en lo que mejor sabes hacer.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: bgPrimary,
        color: textPrimary,
      }}
      className="relative min-h-screen overflow-hidden transition-colors duration-200"
    >
      {/* BARRA SUPERIOR DE PROGRESO CON EL GRADIENTE DIGITALPRO (Exactamente como en el borde superior del video) */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-digital-gradient opacity-95 pointer-events-none" />

      {/* NAVBAR MINIMALISTA ESTILO DIGITALPRO */}
      <header
        style={{
          backgroundColor: navBg,
          borderColor,
        }}
        className="fixed top-[3px] inset-x-0 z-50 border-b backdrop-blur-xl transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Izquierda: Botón Hamburguesa estilo DigitalPro + Navegación rápida en Desktop */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              style={{
                borderColor,
                color: textPrimary,
              }}
              aria-label="Abrir menú de navegación"
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 border hover:border-[#9E38F5] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <>
                  <span
                    style={{ backgroundColor: textPrimary }}
                    className="w-5 h-[1.5px] block"
                  />
                  <span
                    style={{ backgroundColor: textPrimary }}
                    className="w-5 h-[1.5px] block"
                  />
                </>
              )}
            </button>

            <nav
              style={{ color: textSecondary }}
              className="hidden xl:flex items-center gap-6 text-xs uppercase tracking-[0.14em] font-medium"
            >
              <a
                href="#manifiesto"
                className="hover:text-white transition-colors"
              >
                Sobre Nosotros
              </a>
              <a
                href="#corporativo"
                className="hover:text-white transition-colors"
              >
                Soluciones Corporativas
              </a>
              <a
                href="#profesionales"
                className="hover:text-white transition-colors"
              >
                Impulso 80/20
              </a>
              <a
                href="#caso-estudio"
                className="hover:text-white transition-colors"
              >
                Caso de Estudio
              </a>
            </nav>
          </div>

          {/* Centro: Logotipo DYNAMO® con tipografía extendida Monument/Archivo */}
          <a
            href="#"
            className="flex items-center gap-1.5 group shrink-0"
          >
            <span className="font-display font-extrabold text-lg sm:text-2xl tracking-wider uppercase">
              DYNAMO
              <span className="text-digital-gradient">SOLUTIONS</span>
            </span>
            <sup className="text-[10px] font-mono text-[#9E38F5] font-bold">
              ®
            </sup>
          </a>

          {/* Derecha: Barra de Luminosidad + CTA con punto luminoso estilo GET STARTED */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div
              style={{
                backgroundColor: isLightModeSide
                  ? "rgba(0,0,0,0.06)"
                  : "rgba(255,255,255,0.04)",
                borderColor,
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 border"
              title="Nivelar luminosidad entre oscuro, grises y claro"
            >
              <Moon
                style={{
                  color: luminosity < 35 ? "#9E38F5" : textMuted,
                }}
                className="w-3.5 h-3.5 shrink-0 transition-colors"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={luminosity}
                onChange={(e) => setLuminosity(Number(e.target.value))}
                aria-label="Nivel de luminosidad"
                className="w-12 sm:w-20 h-1.5 rounded-lg appearance-none cursor-pointer accent-[#9E38F5]"
                style={{
                  background:
                    "linear-gradient(to right, #050508 0%, #52525b 50%, #f4f4f5 100%)",
                }}
              />
              <Sun
                style={{
                  color: luminosity > 65 ? "#FF5864" : textMuted,
                }}
                className="w-3.5 h-3.5 shrink-0 transition-colors"
              />
            </div>

            <a
              href="#agendar"
              className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
              <span>AGENDAR REUNIÓN</span>
            </a>
          </div>
        </div>

        {/* Drawer de Navegación Desplegable */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                backgroundColor: bgCard,
                borderColor,
              }}
              className="border-t overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
                  {[
                    { label: "01. Sobre Nosotros · El Manifiesto", href: "#manifiesto" },
                    { label: "02. Soluciones Corporativas", href: "#corporativo" },
                    { label: "03. Impulso Profesionales (80/20)", href: "#profesionales" },
                    { label: "04. Caso The Bellacy Studio", href: "#caso-estudio" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ color: textPrimary }}
                      className="text-xs sm:text-sm font-display uppercase tracking-wider py-2 hover:text-[#B832F5] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <a
                  href="#agendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-digital-outline px-5 py-3 text-xs font-display font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 text-white"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_10px_#9E38F5]" />
                  <span>AGENDAR REUNIÓN</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          1. HERO SECTION (Video de Fondo Original + Onda Topográfica + Estética DigitalPro)
         ===================================================================== */}
      <section className="relative min-h-screen pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 flex flex-col justify-between overflow-hidden">
        {/* Video de Fondo en el Banner Principal con 50% de transparencia */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/ahsxrxpv/video/upload/v1792510146/6930814-uhd_3840_2160_25fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Capa de 50% de transparencia solicitada */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Escultura de ondas topográficas estilo DigitalPro sobre el video */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70 mix-blend-screen">
            <TopographicWaveSVG className="w-full h-full max-w-6xl animate-float-slow" />
          </div>
          {/* Degradado inferior suave hacia el color principal */}
          <div
            style={{
              background: `linear-gradient(to top, ${bgPrimary} 4%, transparent 55%, rgba(0,0,0,0.45) 100%)`,
            }}
            className="absolute inset-0"
          />
        </div>

        {/* Espaciador superior para centrar el titular monumental como en 00:00 */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-white/15 bg-black/50 backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-zinc-300"
          >
            <span className="w-2 h-2 rounded-full bg-digital-gradient animate-pulse" />
            <span>DYNAMO SOLUTIONS · ARQUITECTURA & ESCALA DIGITAL</span>
          </motion.div>
        </div>

        {/* TITULAR CENTRAL MONUMENTAL (Tipografía Extendida + Gradiente Indigo-Violeta-Coral + Cursor "|") */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 sm:py-16 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUpBlur}
            className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.04] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.85)]"
          >
            <span className="block mb-2 sm:mb-3">
              TU NEGOCIO EN PILOTO AUTOMÁTICO.
            </span>
            <span className="text-digital-gradient inline-flex items-center justify-center flex-wrap">
              TU CRECIMIENTO, SIN LÍMITES.
              <span className="inline-block w-[4px] sm:w-[6px] h-[0.85em] bg-white ml-2 sm:ml-3 animate-cursor-blink align-middle shadow-[0_0_15px_#ffffff]" />
            </span>
          </motion.h1>
        </div>

        {/* BARRA INFERIOR DEL HERO EN 3 COLUMNAS (Exactamente como en el segundo 00:00 del video DigitalPro) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Columna 1: Métrica en Gradiente (como el "45 active clients" en la esquina inferior izquierda del video) */}
          <motion.div
            variants={fadeUpBlur}
            className="lg:col-span-3 flex items-center gap-4"
          >
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-digital-gradient leading-none">
              +330%
            </span>
            <span className="text-xs text-zinc-300 font-light leading-snug max-w-[160px]">
              escalabilidad y retorno medible en ecosistemas activos
            </span>
          </motion.div>

          {/* Columna 2: Subtítulo íntegro en el centro */}
          <motion.p
            variants={fadeUpBlur}
            className="lg:col-span-5 text-sm sm:text-base text-zinc-200 font-light leading-relaxed text-left lg:text-center"
          >
            Diseñamos ecosistemas digitales, optimizamos tu posicionamiento y
            construimos soluciones tecnológicas que convierten visitantes en
            clientes recurrentes.
          </motion.p>

          {/* Columna 3: Botones de Acción (Botón Rectangular con Borde Gradiente + Punto Violeta) */}
          <motion.div
            variants={fadeUpBlur}
            className="lg:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-end gap-3"
          >
            <a
              href="#agendar"
              className="btn-digital-outline px-6 py-4 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
              <span>AGENDAR AUDITORÍA GRATUITA</span>
            </a>
            <a
              href="#corporativo"
              className="px-5 py-4 text-xs font-display uppercase tracking-wider text-zinc-300 hover:text-white border border-white/15 hover:border-white/35 bg-black/40 backdrop-blur-md inline-flex items-center justify-center gap-1.5 transition-all"
            >
              <span>ECOSISTEMAS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================================
          2. SECCIÓN SOBRE NOSOTROS: EL MANIFIESTO (Layout 00:02-00:03 del video + Cuadrícula Interactiva)
         ===================================================================== */}
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
        onTouchMove={(e) => {
          const touch = e.touches[0];
          if (!touch) return;
          const rect = e.currentTarget.getBoundingClientRect();
          setManifestoMouse({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
            active: true,
          });
        }}
        onMouseLeave={() =>
          setManifestoMouse((prev) => ({ ...prev, active: false }))
        }
        style={{ borderColor }}
        className="relative py-24 sm:py-32 px-4 sm:px-6 border-t overflow-hidden scroll-mt-20"
      >
        {/* CUADRÍCULA DE LÍNEAS INTERACTIVAS (Iluminada con el gradiente Indigo/Violeta/Coral al pasar el cursor) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${borderColor} 1px, transparent 1px), linear-gradient(to bottom, ${borderColor} 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
              transform: manifestoMouse.active
                ? `translate3d(${(manifestoMouse.x - 600) * -0.012}px, ${(manifestoMouse.y - 300) * -0.012}px, 0)`
                : "translate3d(0px, 0px, 0)",
            }}
            className="absolute inset-0 opacity-45 transition-transform duration-300 ease-out"
          />

          <div
            style={{
              backgroundImage:
                "linear-gradient(to right, #9E38F5 1.5px, transparent 1.5px), linear-gradient(to bottom, #FF5864 1.5px, transparent 1.5px)",
              backgroundSize: "56px 56px",
              transform: manifestoMouse.active
                ? `translate3d(${(manifestoMouse.x - 600) * 0.024}px, ${(manifestoMouse.y - 300) * 0.024}px, 0)`
                : "translate3d(0px, 0px, 0)",
              WebkitMaskImage: `radial-gradient(360px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              maskImage: `radial-gradient(360px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              opacity: manifestoMouse.active ? 1 : 0,
            }}
            className="absolute inset-0 transition-opacity duration-300 ease-out drop-shadow-[0_0_12px_rgba(158,56,245,0.85)]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Encabezado de Sección al estilo "WHY CHOOSE DIGITAL PRO" (00:02) */}
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Columna Izquierda: Título Monumental + Lista Numerada 01, 02, 03, 04 con íconos de esfera wireframe */}
            <div className="lg:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpBlur}
                className="mb-12 sm:mb-16"
              >
                <div
                  style={{ color: textMuted }}
                  className="text-xs font-mono uppercase tracking-[0.25em] mb-3"
                >
                  SOBRE NOSOTROS · EL MANIFIESTO
                </div>
                <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                  <span className="block">DYNAMO</span>
                  <span className="text-digital-gradient inline-flex items-center">
                    SOLUTIONS
                    <span className="inline-block w-[4px] sm:w-[5px] h-[0.82em] bg-white ml-2 animate-cursor-blink" />
                  </span>
                </h2>
              </motion.div>

              {/* Bloques 01, 02, 03, 04 con el texto completo del Manifiesto */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="space-y-8 sm:space-y-10"
              >
                {manifestoItems.map((item, idx) => (
                  <motion.div
                    key={item.num}
                    variants={fadeUpBlur}
                    style={{ borderColor }}
                    className="pb-8 sm:pb-10 border-b last:border-b-0 grid grid-cols-12 gap-4 sm:gap-6 items-start group"
                  >
                    {/* Columna de icono wireframe + número 01/02/03/04 igual al video */}
                    <div className="col-span-2 sm:col-span-2 flex flex-col items-start gap-3 pt-1">
                      <WireframeSphereIcon index={idx} />
                      <span
                        style={{ color: textMuted }}
                        className="font-mono text-xs tracking-widest group-hover:text-[#B832F5] transition-colors"
                      >
                        {item.num}
                      </span>
                    </div>

                    {/* Columna de contenido */}
                    <div className="col-span-10 sm:col-span-10">
                      <h3 className="font-display font-bold uppercase text-base sm:text-lg md:text-xl tracking-wide mb-3 group-hover:text-[#E24497] transition-colors">
                        {item.heading}
                      </h3>
                      <p
                        style={{ color: textSecondary }}
                        className="text-sm sm:text-base font-light leading-relaxed"
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Columna Derecha: Escultura 3D de Anillos Iridiscentes (00:02-00:03) + Resumen de los 2 Caminos */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
              <IridescentRingsSculpture />

              {/* Tarjeta arquitectónica de conexión rápida a los 2 ecosistemas */}
              <div
                style={{ backgroundColor: bgCard, borderColor }}
                className="w-full border p-6 sm:p-7 mt-4 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-digital-gradient" />
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B832F5] mb-2">
                  ARQUITECTURA DUAL
                </div>
                <h3 className="font-display font-bold uppercase text-lg sm:text-xl mb-3">
                  UN ECOSISTEMA. DOS CAMINOS DE CRECIMIENTO.
                </h3>
                <p
                  style={{ color: textSecondary }}
                  className="text-xs sm:text-sm font-light leading-relaxed mb-5"
                >
                  Selecciona la vertical diseñada para la etapa actual de tu
                  negocio o actividad profesional:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a
                    href="#corporativo"
                    style={{ borderColor, backgroundColor: bgCardInner }}
                    className="p-3.5 border hover:border-[#8B3DFF] transition-all group flex flex-col justify-between"
                  >
                    <span className="font-mono text-[10px] text-[#8B3DFF] mb-1">
                      01 // EMPRESAS & PYMES
                    </span>
                    <span className="font-display font-bold uppercase text-xs flex items-center justify-between">
                      <span>CORPORATIVO</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                  <a
                    href="#profesionales"
                    style={{ borderColor, backgroundColor: bgCardInner }}
                    className="p-3.5 border hover:border-[#FF5864] transition-all group flex flex-col justify-between"
                  >
                    <span className="font-mono text-[10px] text-[#FF5864] mb-1">
                      02 // MODELO 80/20
                    </span>
                    <span className="font-display font-bold uppercase text-xs flex items-center justify-between">
                      <span>PROFESIONALES</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ECOSISTEMA 1: SOLUCIONES CORPORATIVAS (Tarjetas Verticales A / B / G del segundo 00:04 del video)
         ===================================================================== */}
      <section
        id="corporativo"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabecera monumental estilo "SERVICES" (00:04) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-6"
          >
            <div>
              <div
                style={{ color: textMuted }}
                className="text-xs font-mono uppercase tracking-[0.22em] mb-3"
              >
                ECOSISTEMA 01 · INFRAESTRUCTURA & PAUTA
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                SOLUCIONES{" "}
                <span className="text-digital-gradient">CORPORATIVAS</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="max-w-md text-sm sm:text-base font-light leading-relaxed"
            >
              Orientado a empresas y PYMES que buscan escalar mediante inversión
              en infraestructura y pauta. Desarrollo web a medida, campañas de
              publicidad (SEM/Meta) y optimización SEO avanzada.
            </p>
          </motion.div>

          {/* 3 Tarjetas Verticales Arquitectónicas con Letras Gigantes "A / B / G" y Ondas Topográficas (00:04-00:05) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {corporatePillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeUpBlur}
                whileHover={{ y: -6 }}
                style={{ backgroundColor: bgCard, borderColor }}
                className="group relative border p-7 sm:p-9 md:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[540px] overflow-hidden transition-all"
              >
                {/* Onda topográfica decorativa en la esquina superior derecha (idéntica a las tarjetas A, B, G del video) */}
                <div className="absolute -top-6 -right-12 w-72 h-56 opacity-45 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <TopographicWaveSVG className="w-full h-full" />
                </div>

                {/* Parte superior: Número 01/02/03 + Letra Gigante en Gradiente (A, B, G) */}
                <div className="relative z-10">
                  <div
                    style={{ color: textMuted }}
                    className="font-mono text-xs tracking-widest mb-2"
                  >
                    {pillar.code}
                  </div>
                  <div className="font-display-light text-7xl sm:text-8xl leading-none text-digital-gradient select-none mb-8">
                    {pillar.letter}
                  </div>
                </div>

                {/* Parte central: Título en mayúsculas + Descripción íntegra */}
                <div className="relative z-10 my-auto">
                  <h3 className="font-display font-bold uppercase text-lg sm:text-xl leading-snug mb-4 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p
                    style={{ color: textSecondary }}
                    className="text-sm font-light leading-relaxed mb-6"
                  >
                    {pillar.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pillar.metrics.map((m, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: bgCardInner,
                          borderColor,
                          color: textMuted,
                        }}
                        className="text-[10px] font-mono uppercase tracking-wider border px-2.5 py-1"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Parte inferior: Botón con punto luminoso violeta estilo "● GET STARTED" del video */}
                <div className="relative z-10 pt-5 border-t border-white/10">
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2.5 text-xs font-display font-bold uppercase tracking-wider group-hover:text-[#E24497] transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                    <span>ESCALAR MI EMPRESA</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          4. ECOSISTEMA 2: IMPULSO PARA PROFESIONALES (MODELO 80/20)
         ===================================================================== */}
      <section
        id="profesionales"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 overflow-hidden transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabecera monumental */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#E24497] mb-3">
                <span className="w-2 h-2 rounded-full bg-digital-gradient" />
                <span>ECOSISTEMA 02 · MODELO A COMISIÓN 80/20 (SIN COSTO INICIAL)</span>
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                IMPULSO PARA{" "}
                <span className="text-digital-gradient">PROFESIONALES</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="max-w-md text-sm sm:text-base font-light leading-relaxed"
            >
              Orientado a oficios, técnicos y profesionales independientes:
              barberos, estética, técnicos y servicios de limpieza. Digitalizamos
              tu oficio sin costos iniciales de desarrollo.
            </p>
          </motion.div>

          {/* 3 Tarjetas Verticales del Ecosistema 80/20 con estética DigitalPro */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6 mb-12"
          >
            {professionalPillars.map((pillar, index) => {
              const isSelected = activeStep === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeUpBlur}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ y: -6 }}
                  style={{
                    backgroundColor: bgCard,
                    borderColor: isSelected ? "#9E38F5" : borderColor,
                  }}
                  className="cursor-pointer group relative border p-7 sm:p-9 md:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[520px] overflow-hidden transition-all"
                >
                  {/* Barra superior activa */}
                  <div
                    className={`absolute top-0 inset-x-0 h-[2px] bg-digital-gradient transition-opacity duration-300 ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Onda topográfica en la esquina superior derecha */}
                  <div className="absolute -top-6 -right-12 w-72 h-56 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none">
                    <TopographicWaveSVG className="w-full h-full" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        style={{ color: textMuted }}
                        className="font-mono text-xs tracking-widest"
                      >
                        {pillar.code}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border border-[#9E38F5]/40 bg-[#9E38F5]/10 text-[#E24497]">
                        {pillar.badge}
                      </span>
                    </div>
                    <div className="font-display-light text-7xl sm:text-8xl leading-none text-digital-gradient select-none mb-8">
                      {pillar.letter}
                    </div>
                  </div>

                  <div className="relative z-10 my-auto">
                    <h3 className="font-display font-bold uppercase text-lg sm:text-xl leading-snug mb-4 tracking-wide">
                      {pillar.title}
                    </h3>
                    <p
                      style={{ color: textSecondary }}
                      className="text-sm font-light leading-relaxed mb-6"
                    >
                      {pillar.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-5 border-t border-white/10">
                    <a
                      href="#agendar"
                      className="inline-flex items-center gap-2.5 text-xs font-display font-bold uppercase tracking-wider group-hover:text-[#E24497] transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                      <span>APLICAR AL MODELO 80/20</span>
                      <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Barra resumen interactiva del Modelo 80/20 */}
          <div
            style={{ backgroundColor: bgCard, borderColor }}
            className="border p-6 sm:p-8 grid sm:grid-cols-3 gap-6 items-center"
          >
            <div className="flex items-center gap-4">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-digital-gradient">
                80/20
              </span>
              <div className="text-xs" style={{ color: textSecondary }}>
                <strong style={{ color: textPrimary }} className="block font-display uppercase">
                  Sin inversión inicial en web
                </strong>
                80% para ti · 20% por reserva concretada
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-digital-gradient">
                24/7
              </span>
              <div className="text-xs" style={{ color: textSecondary }}>
                <strong style={{ color: textPrimary }} className="block font-display uppercase">
                  Recepcionista IA WhatsApp
                </strong>
                Perfila clientes y agenda citas en automático
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-digital-gradient">
                MAPS
              </span>
              <div className="text-xs" style={{ color: textSecondary }}>
                <strong style={{ color: textPrimary }} className="block font-display uppercase">
                  Autoridad Google Business
                </strong>
                Posicionado en tu zona sin exponer tu dirección
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SECCIÓN EXCLUSIVA: EL CASO THE BELLACY STUDIO (Layout "CASES" 00:06 + Tarjeta Interactiva Izquierda a Derecha)
         ===================================================================== */}
      <section
        id="caso-estudio"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabecera inspirada en el segundo 00:06 ("90% of clients..." + "CASES") */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="grid lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16"
          >
            <div className="lg:col-span-3">
              <div className="text-xs font-mono uppercase tracking-wider mb-1">
                <span className="text-digital-gradient font-bold text-base">
                  +330%
                </span>{" "}
                <span style={{ color: textSecondary }}>
                  crecimiento mensual
                </span>
              </div>
              <p
                style={{ color: textMuted }}
                className="text-xs font-light leading-relaxed"
              >
                Resultados verificados en tan solo 3 meses de ejecución.
              </p>
            </div>

            <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div
                  style={{ color: textMuted }}
                  className="text-xs font-mono uppercase tracking-[0.22em] mb-2"
                >
                  CASO DE ESTUDIO EXCLUSIVO · ANTES Y DESPUÉS
                </div>
                <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                  CASO{" "}
                  <span className="text-digital-gradient">BELLACY STUDIO</span>
                </h2>
              </div>
              <p
                style={{ color: textSecondary }}
                className="text-xs sm:text-sm font-light max-w-xs"
              >
                Mueve el cursor o desliza de{" "}
                <strong style={{ color: textPrimary }} className="font-medium">
                  izquierda a derecha
                </strong>{" "}
                sobre la tarjeta para develar el antes y el después.
              </p>
            </div>
          </motion.div>

          {/* CONTENEDOR DE LA TARJETA INTERACTIVA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            style={{ backgroundColor: bgCard, borderColor }}
            className="border p-3 sm:p-5 md:p-8 shadow-2xl transition-colors duration-200"
          >
            {/* TARJETA INTERACTIVA EN CSS GRID (Ambas capas comparten la celda 1/1 para que NUNCA se corte el alto) */}
            <div
              onPointerMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                revealRaw.set(Math.max(0, Math.min(100, pct)));
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                if (!touch) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((touch.clientX - rect.left) / rect.width) * 100;
                revealRaw.set(Math.max(0, Math.min(100, pct)));
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                revealRaw.set(pct > 50 ? 100 : 0);
              }}
              className="relative grid grid-cols-1 overflow-hidden border border-white/15 select-none cursor-ew-resize touch-pan-y group"
            >
              {/* =========================================================
                  CAPA 1 (BASE): ANTES DE DYNAMO SOLUTIONS (US$ 300 / MES)
                 ========================================================= */}
              <div className="col-start-1 row-start-1 w-full bg-gradient-to-br from-[#0B0B12] via-[#07070C] to-[#040407] text-white p-5 sm:p-10 md:p-12 flex flex-col justify-between relative">
                <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 opacity-5 pointer-events-none">
                  <BarChart3 className="w-36 h-36 sm:w-56 sm:h-56 text-zinc-400" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-zinc-300 bg-zinc-900/90 border border-zinc-700/80 px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
                    <span>BEFORE · ANTES DE DYNAMO SOLUTIONS</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/10 px-3 py-1">
                    ← Desliza hacia la derecha para revelar el Después →
                  </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center my-6 sm:my-10">
                  <div className="lg:col-span-6">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                      Caso de Estudio · Diagnóstico Inicial
                    </div>
                    <h3 className="font-display font-extrabold uppercase text-2xl sm:text-4xl md:text-5xl tracking-tight text-zinc-200 mb-3">
                      THE BELLACY STUDIO
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-5 sm:mb-6">
                      Antes de contratar nuestros servicios, el estudio contaba
                      con una excelente calidad de servicio pero carecía de
                      visibilidad local estructurada en Google Maps y de campañas
                      de adquisición digital.
                    </p>

                    <div className="flex flex-col sm:inline-flex sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 bg-black/75 border border-zinc-800 p-4 sm:p-5">
                      <div>
                        <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                          Facturación Mensual (Antes)
                        </div>
                        <div className="flex items-baseline gap-2.5 sm:gap-3">
                          <span className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-zinc-300">
                            US$ 300
                          </span>
                          <span className="text-xs font-mono text-zinc-500">
                            / mes
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-3 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-zinc-800">
                        <div>
                          <div className="font-display font-bold text-xl sm:text-2xl text-zinc-400">
                            Baja
                          </div>
                          <div className="text-[11px] text-zinc-500 uppercase font-mono">
                            BEFORE
                          </div>
                        </div>
                        <div>
                          <div className="font-display font-bold text-xl sm:text-2xl text-zinc-400">
                            0 Ads
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            Pauta activa
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                      Situación Previa a la Intervención
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
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
                          className="bg-zinc-900/70 border border-zinc-800/90 p-3.5 sm:p-4 flex flex-col justify-between"
                        >
                          <span className="text-zinc-300 font-display uppercase text-xs font-bold mb-1.5">
                            {item.title}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                            {item.state}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-5 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-zinc-400">
                  <span>ESTADO: PRE-OPTIMIZACIÓN (BEFORE)</span>
                  <span>INGRESOS MENSUALES: US$ 300 / MES</span>
                </div>
              </div>

              {/* =========================================================
                  CAPA 2 (DEVELADA CON CORTE DIAGONAL Y SPRING): DESPUÉS (US$ 1.300 / MES)
                  Estética DigitalPro: Gradiente Indigo -> Violeta -> Magenta -> Coral
                 ========================================================= */}
              <motion.div
                style={{
                  clipPath: afterClipPath,
                  scale: afterScale,
                }}
                className="col-start-1 row-start-1 w-full bg-gradient-to-br from-[#3729B2] via-[#7A22C9] to-[#D93870] text-white p-5 sm:p-10 md:p-12 flex flex-col justify-between relative z-10 origin-left"
              >
                <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 opacity-15 pointer-events-none">
                  <BarChart3 className="w-36 h-36 sm:w-56 sm:h-56 text-white" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white bg-black/40 backdrop-blur-md border border-white/25 px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5864] animate-pulse shrink-0" />
                    <span>AFTER · DESPUÉS DE DYNAMO SOLUTIONS (3 MESES)</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-white bg-black/35 px-3 py-1 border border-white/20">
                    ROI VERIFICADO: +330%
                  </span>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center my-6 sm:my-10">
                  <div className="lg:col-span-6">
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/80 mb-2">
                      Caso de Estudio · Ecosistema Activo
                    </div>
                    <h3 className="font-display font-extrabold uppercase text-2xl sm:text-4xl md:text-5xl tracking-tight text-white mb-3">
                      THE BELLACY STUDIO
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white/90 font-light leading-relaxed mb-5 sm:mb-6">
                      Posicionamiento local en Google Maps combinado con pauta
                      inteligente de alta conversión. Sistema predecible y
                      constante de adquisición de nuevos clientes.
                    </p>

                    <div className="flex flex-col sm:inline-flex sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 bg-black/45 backdrop-blur-md border border-white/25 p-4 sm:p-5 shadow-2xl">
                      <div>
                        <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/75 mb-1">
                          Facturación Mensual (Después)
                        </div>
                        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                          <span className="text-white/50 line-through text-sm sm:text-base font-mono">
                            US$ 300
                          </span>
                          <span className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
                            US$ 1.300
                          </span>
                          <span className="text-xs font-mono text-white/80">
                            / mes
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-3 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-white/20">
                        <div>
                          <div className="font-display font-bold text-xl sm:text-2xl text-[#FF94A1]">
                            +330%
                          </div>
                          <div className="text-[11px] text-white font-mono uppercase border-b border-[#FF5864]">
                            AFTER
                          </div>
                        </div>
                        <div>
                          <div className="font-display font-bold text-xl sm:text-2xl text-white">
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
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/85 mb-3">
                      Estrategia Implementada con Éxito
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
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
                          className="bg-black/40 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 flex flex-col justify-between"
                        >
                          <span className="text-white font-display uppercase text-xs font-bold mb-1.5">
                            {item.title}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#FFB3BD]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5864] animate-pulse shrink-0" />
                            {item.state}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-5 border-t border-white/25 flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-white">
                  <span>RESULTADO: ECOSISTEMA EN ESCALA AUTOMÁTICA (AFTER)</span>
                  <span>FACTURACIÓN ALCANZADA: US$ 1.300 / MES (+330%)</span>
                </div>
              </motion.div>

              {/* =========================================================
                  HAZ LÁSER ESCÁNER CON INERCIA SPRING (Onda Moderna DigitalPro)
                 ========================================================= */}
              <motion.div
                style={{ left: beamLeft }}
                className="absolute inset-y-0 z-20 pointer-events-none -translate-x-1/2 flex items-center justify-center"
              >
                <div className="absolute right-0 w-16 sm:w-28 h-full bg-gradient-to-l from-white/30 via-[#9E38F5]/35 to-transparent blur-xl -skew-x-3" />

                <div className="w-[2.5px] h-[110%] bg-gradient-to-b from-[#5246FF] via-white to-[#FF5864] shadow-[0_0_20px_#ffffff,0_0_40px_#9E38F5] -rotate-[2.5deg]" />

                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-black/85 backdrop-blur-xl text-white shadow-[0_0_30px_rgba(158,56,245,0.9)] border border-white/40 flex items-center justify-center font-mono text-xs sm:text-sm group-hover:scale-110 transition-transform">
                  <span className="text-digital-gradient font-bold">↔</span>
                </div>
              </motion.div>
            </div>

            {/* BLOQUE INFERIOR CON LA NARRATIVA COMPLETA Y CTA DE LA SECCIÓN (Inspirado en la cita de 00:06) */}
            <div
              style={{ backgroundColor: bgCardInner, borderColor }}
              className="mt-5 sm:mt-6 border p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6"
            >
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E24497] mb-2">
                  <span className="font-bold">01 / 01</span>
                  <span>· IMPACTO REAL & MEDIBLE</span>
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

              <div className="shrink-0 w-full lg:w-auto">
                <a
                  href="#agendar"
                  className="btn-digital-outline w-full sm:w-auto px-6 py-4 text-xs font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-2.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                  <span>REPLICAR ESTE SISTEMA</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          6. CTA FINAL + FOOTER (Inspirado en 00:07-00:08 "LET'S BEGIN COOPERATION")
         ===================================================================== */}
      <section
        id="agendar"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="relative pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 border-t overflow-hidden scroll-mt-20"
      >
        {/* Escultura de Onda Topográfica de Fondo como en "LET'S BEGIN COOPERATION" (00:08) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <TopographicWaveSVG className="w-full h-full max-w-6xl animate-float-slow" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpBlur}
          className="relative z-10 max-w-5xl mx-auto text-center mb-24 sm:mb-32"
        >
          <div
            style={{ color: textMuted }}
            className="text-xs font-mono uppercase tracking-[0.25em] mb-5"
          >
            EMPIEZA HOY · AUDITORÍA ESTRATÉGICA
          </div>

          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight mb-6">
            <span className="block">¿LISTO PARA</span>
            <span className="text-digital-gradient inline-flex items-center justify-center">
              ESCALAR TU NEGOCIO?
              <span className="inline-block w-[4px] sm:w-[6px] h-[0.85em] bg-white ml-2 sm:ml-3 animate-cursor-blink" />
            </span>
          </h2>

          <p
            style={{ color: textSecondary }}
            className="text-sm sm:text-base md:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Agenda una reunión estratégica de 30 minutos con nuestro equipo.
            Evaluaremos tu situación actual y diseñaremos un plan de acción a
            medida.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-digital-outline px-9 py-5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="w-3 h-3 rounded-full bg-digital-gradient shadow-[0_0_14px_#9E38F5]" />
              <span>AGENDAR AUDITORÍA GRATUITA</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Minimalista Arquitectónico estilo DigitalPro (00:08) */}
        <footer
          style={{ borderColor }}
          className="relative z-10 max-w-7xl mx-auto pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-base sm:text-lg uppercase tracking-wider">
              DYNAMO<span className="text-digital-gradient">SOLUTIONS</span>
            </span>
            <sup className="text-[10px] font-mono text-[#9E38F5] font-bold">
              ®
            </sup>
          </div>

          <div
            style={{ color: textSecondary }}
            className="flex flex-wrap gap-6 text-xs font-display uppercase tracking-wider"
          >
            <a href="#manifiesto" className="hover:text-[#E24497] transition-colors">
              Manifiesto
            </a>
            <a href="#corporativo" className="hover:text-[#E24497] transition-colors">
              Corporativo
            </a>
            <a href="#profesionales" className="hover:text-[#E24497] transition-colors">
              Modelo 80/20
            </a>
            <a href="#caso-estudio" className="hover:text-[#E24497] transition-colors">
              Caso Bellacy
            </a>
          </div>

          <div
            style={{ color: textMuted }}
            className="font-mono text-[11px] text-left md:text-right"
          >
            <div>© 2026 DYNAMO SOLUTIONS. TODOS LOS DERECHOS RESERVADOS.</div>
          </div>
        </footer>
      </section>
    </div>
  );
}
