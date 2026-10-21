"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  Variants,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Sun,
  Moon,
  X,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Cookie,
} from "lucide-react";

const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Onda topográfica 3D (inspirada en el video de referencia DigitalPro)
function TopographicWaveSVG({ className = "" }: { className?: string }) {
  const lines = Array.from({ length: 26 });
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
          <stop offset="0%" stopColor="#5246FF" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#9E38F5" stopOpacity="0.34" />
          <stop offset="80%" stopColor="#FF5864" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {lines.map((_, i) => {
        const offset = i * 9.5;
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

// Escultura 3D de Anillos Concéntricos Iridiscentes (segundos 00:02-00:03 del video)
function IridescentRingsSculpture() {
  return (
    <div className="relative w-full h-[320px] sm:h-[440px] flex items-center justify-center select-none pointer-events-none">
      <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#5246FF]/30 via-[#9E38F5]/25 to-[#FF5864]/20 blur-3xl" />

      <motion.div
        animate={{
          rotateZ: [0, 6, 0, -4, 0],
          y: [0, -14, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-[270px] h-[270px] sm:w-[380px] sm:h-[380px] flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-[0_25px_60px_rgba(139,61,255,0.38)]"
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

// Esfera wireframe luminosa para los ítems 01, 02, 03, 04 (como en 00:02 del video)
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Estado para Políticas de Cookies
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);
  const [cookieModalOpen, setCookieModalOpen] = useState<boolean>(false);
  const [cookiePrefs, setCookiePrefs] = useState<{
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
  }>({
    essential: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dynamo_cookie_consent_v1");
      if (!saved) {
        setShowCookieBanner(true);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setCookiePrefs({
            essential: true,
            analytics: Boolean(parsed.analytics),
            marketing: Boolean(parsed.marketing),
          });
        }
      }
    } catch {
      setShowCookieBanner(true);
    }
  }, []);

  const handleSaveCookies = (prefs: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => {
    setCookiePrefs(prefs);
    setShowCookieBanner(false);
    setCookieModalOpen(false);
    try {
      localStorage.setItem(
        "dynamo_cookie_consent_v1",
        JSON.stringify({ ...prefs, updatedAt: new Date().toISOString() })
      );
    } catch {
      // ignore storage errors
    }
  };

  // Estado para la cuadrícula interactiva en la sección "El Manifiesto"
  const [manifestoMouse, setManifestoMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({ x: 500, y: 300, active: false });

  // Física Spring para la tarjeta interactiva "BEFORE / AFTER" de The Bellacy Studio
  const revealRaw = useMotionValue(52);
  const revealSpring = useSpring(revealRaw, {
    stiffness: 160,
    damping: 24,
    mass: 0.6,
  });

  const afterClipPath = useTransform(revealSpring, (v) => {
    const topEdge = Math.max(0, Math.min(100, v + 3));
    const bottomEdge = Math.max(0, Math.min(100, v - 3));
    return `polygon(0% 0%, ${topEdge}% 0%, ${bottomEdge}% 100%, 0% 100%)`;
  });

  const beamLeft = useTransform(revealSpring, (v) => `${v}%`);
  const afterScale = useTransform(revealSpring, [0, 50, 100], [1.015, 1.005, 1]);

  // Barra de luminosidad: 0 = Oscuro (Negro DigitalPro), 25..75 = Grises intermedios, 100 = Claro
  const [luminosity, setLuminosity] = useState<number>(0);

  const t = luminosity / 100;
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  const rgb = (
    r1: number,
    g1: number,
    b1: number,
    r2: number,
    g2: number,
    b2: number
  ) => `rgb(${lerp(r1, r2)}, ${lerp(g1, g2)}, ${lerp(b1, b2)})`;

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

  // MANIFIESTO — 01: Enfoque en Resultados primero + explicación clara de Democratizamos la Escala
  const manifestoItems = [
    {
      num: "01",
      heading: "ENFOQUE EN RESULTADOS",
      body: "Nosotros diseñamos, posicionamos y aceleramos tu negocio; tú te enfocas en lo que mejor sabes hacer.",
    },
    {
      num: "02",
      heading: "DEMOCRATIZAMOS LA ESCALA DIGITAL",
      body: "Acercamos a tu empresa o profesión las mismas herramientas de automatización, IA y captación de clientes que antes solo podían pagar las grandes corporaciones.",
    },
    {
      num: "03",
      heading: "INFRAESTRUCTURA EN AUTOMÁTICO",
      body: "Ecosistemas diseñados para operar las 24 horas y convertir visitantes en clientes recurrentes sin fricción operativa.",
    },
    {
      num: "04",
      heading: "DOS CAMINOS DE CRECIMIENTO",
      body: "Potencia corporativa a medida para empresas y modelo 80/20 sin inversión inicial para profesionales independientes.",
    },
  ];

  // NUEVA SECCIÓN: Fricciones cotidianas reales vs. Resolución Dynamo ("¿POR QUÉ SE ESCAPAN TUS VENTAS?")
  const operationalBottleNecks = [
    {
      code: "01",
      symptomTitle: "MENSAJES SIN RESPONDER EN WHATSAPP",
      painPoint:
        "Te escriben pidiendo precio o turno mientras estás trabajando. Cuando respondes dos horas tarde, el cliente ya reservó con otro.",
      solutionTitle: "RECEPCIONISTA IA 24/7",
      solutionText:
        "Atiende en segundos, perfila al interesado y agenda el turno directo en tu calendario sin que toques el celular.",
    },
    {
      code: "02",
      symptomTitle: "EXCELENTE SERVICIO PERO INVISIBLE EN GOOGLE",
      painPoint:
        "Dependes del boca a boca o de subir historias todos los días. Quien busca tu servicio hoy en tu zona encuentra primero a tu competencia.",
      solutionTitle: "DOMINIO SEO, GEO & MAPS",
      solutionText:
        "Posicionamos tu marca en Google Business, mapas locales y buscadores de IA justo cuando el cliente está listo para comprar.",
    },
    {
      code: "03",
      symptomTitle: "WEBS DECORATIVAS Y ANUNCIOS QUE QUEMAN DINERO",
      painPoint:
        "Páginas lentas que no convierten visitas en ventas y campañas en el botón 'Promocionar' que solo traen likes o curiosos.",
      solutionTitle: "ARQUITECTURA CRO & ADS DE PRECISIÓN",
      solutionText:
        "E-commerce y sitios rápidos diseñados para vender, potenciados con campañas en Google y Meta Ads enfocadas en retorno real.",
    },
    {
      code: "04",
      symptomTitle: "COSTOS INICIALES QUE FRENAN AL PROFESIONAL",
      painPoint:
        "Agencias tradicionales que exigen miles de dólares por adelantado por desarrollar un sistema sin comprometerse con tus reservas.",
      solutionTitle: "ALIANZA 80/20 SIN INVERSIÓN INICIAL",
      solutionText:
        "Para profesionales y oficios: construimos tu plataforma con $0 de costo inicial y solo ganamos el 20% por cita concretada.",
    },
  ];

  // JUEGO DE LETRAS D - Y - N (Ecosistema 01: Soluciones Corporativas)
  const corporatePillars = [
    {
      code: "01",
      letter: "D",
      title: "DISEÑO A MEDIDA DE E-COMMERCE & WEB DE ALTO IMPACTO",
      description:
        "Tiendas online y sitios corporativos rápidos, seguros y optimizados para la conversión (CRO). Cero límites técnicos.",
    },
    {
      code: "02",
      letter: "Y",
      title: "YIELD & POSICIONAMIENTO ORGÁNICO (SEO, GEO & MAPS)",
      description:
        "Máximo rendimiento orgánico en Google, motores de Inteligencia Artificial (GEO) y Google Business justo cuando tus clientes buscan comprar.",
    },
    {
      code: "03",
      letter: "N",
      title: "NEGOCIOS ESCALANDO CON SEM & META ADS",
      description:
        "No compramos clics, compramos rentabilidad. Campañas de alta precisión en Google y Meta enfocadas en ROI y leads calificados.",
    },
  ];

  // JUEGO DE LETRAS A - M - O (Ecosistema 02: Impulso Modelo 80/20)
  const professionalPillars = [
    {
      code: "01",
      letter: "A",
      title: "ALIANZA DE ÉXITO COMPARTIDO (MODELO 80/20)",
      description:
        "Cero inversión inicial en web. Construimos tu plataforma de reservas: 80% para ti, 20% por cita concretada. Si tú no ganas, nosotros tampoco.",
    },
    {
      code: "02",
      letter: "M",
      title: "MENSAJERÍA & RECEPCIONISTA IA EN WHATSAPP 24/7",
      description:
        "Tu asistente con Inteligencia Artificial responde consultas, perfila clientes y agenda citas en automático mientras trabajas.",
    },
    {
      code: "03",
      letter: "O",
      title: "OPTIMIZACIÓN & AUTORIDAD LOCAL EN GOOGLE MAPS",
      description:
        "Posicionamos tu oficio como Área de Servicio para dominar las búsquedas de tu zona sin exponer tu dirección personal.",
    },
  ];

  // LOGOS DE CLIENTES SIN FONDO (Procesados en /public/logos/)
  const clientEcosystems = [
    {
      name: "Alfa 24 Spa",
      category: "Mantenimientos & Servicios",
      logo: "/logos/alfa24.png",
      tag: "ECOSISTEMA ACTIVO",
    },
    {
      name: "The Bellacy Studio",
      category: "Estética & Cuidado Personal",
      logo: "/logos/bellacy.png",
      tag: "GOOGLE MAPS & ADS",
    },
    {
      name: "Cartocentro",
      category: "Industria & Soluciones Corporativas",
      logo: "/logos/cartocentro.png",
      tag: "INFRAESTRUCTURA B2B",
    },
    {
      name: "Mag Barber Studio Vip",
      category: "Barbería &Reservas Automatizadas",
      logo: "/logos/magbarber.png",
      tag: "AUTOMATIZACIÓN & TURNOS",
    },
    {
      name: "Corbyte",
      category: "Tecnología & Soluciones Digitales",
      logo: "/logos/corbyte.png",
      tag: "ESCALA DIGITAL",
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
      {/* BARRA SUPERIOR DE PROGRESO CON EL GRADIENTE DIGITALPRO */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-digital-gradient opacity-95 pointer-events-none" />

      {/* NAVBAR: Solo menú hamburguesa + Logo más a la izquierda + Botón AGENDAR con mayor protagonismo */}
      <header
        style={{
          backgroundColor: navBg,
          borderColor,
        }}
        className="fixed top-[3px] inset-x-0 z-50 border-b backdrop-blur-xl transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Izquierda: Solo Menú Hamburguesa + Logo DYNAMOSOLUTIONS® posicionado a la izquierda */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              style={{
                borderColor,
                color: textPrimary,
              }}
              aria-label="Abrir menú"
              className="w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center gap-1.5 border hover:border-[#9E38F5] transition-colors cursor-pointer shrink-0"
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

            <a href="#" className="flex items-center gap-1 shrink-0">
              <span className="font-display font-extrabold text-base sm:text-2xl tracking-wider uppercase">
                DYNAMO<span className="text-digital-gradient">SOLUTIONS</span>
              </span>
              <sup className="text-[10px] font-mono text-[#9E38F5] font-bold">
                ®
              </sup>
            </a>
          </div>

          {/* Derecha: Barra de Luminosidad + Botón AGENDAR protagonista */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              style={{
                backgroundColor: isLightModeSide
                  ? "rgba(0,0,0,0.06)"
                  : "rgba(255,255,255,0.04)",
                borderColor,
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 border"
              title="Nivelar luminosidad"
            >
              <Moon
                style={{ color: luminosity < 35 ? "#9E38F5" : textMuted }}
                className="w-3.5 h-3.5 shrink-0"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={luminosity}
                onChange={(e) => setLuminosity(Number(e.target.value))}
                aria-label="Luminosidad"
                className="w-12 sm:w-16 h-1.5 rounded-lg appearance-none cursor-pointer accent-[#9E38F5]"
                style={{
                  background:
                    "linear-gradient(to right, #050508 0%, #52525b 50%, #f4f4f5 100%)",
                }}
              />
              <Sun
                style={{ color: luminosity > 65 ? "#FF5864" : textMuted }}
                className="w-3.5 h-3.5 shrink-0"
              />
            </div>

            <a
              href="#agendar"
              className="btn-digital-outline px-4 sm:px-7 py-2.5 sm:py-3 text-[11px] sm:text-xs font-display font-extrabold uppercase tracking-widest text-white inline-flex items-center gap-2.5 shadow-[0_0_25px_rgba(158,56,245,0.35)] hover:scale-[1.03] transition-all"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#FF5864] animate-pulse" />
              <span>AGENDAR</span>
              <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline-block text-[#FF5864]" />
            </a>
          </div>
        </div>

        {/* Menú Hamburguesa Desplegable */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ backgroundColor: bgCard, borderColor }}
              className="border-t overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6">
                  {[
                    { label: "01. Manifiesto", href: "#manifiesto" },
                    { label: "02. Diagnóstico", href: "#diagnostico" },
                    { label: "03. Corporativo [D·Y·N]", href: "#corporativo" },
                    { label: "04. Modelo 80/20 [A·M·O]", href: "#profesionales" },
                    { label: "05. Ecosistemas Activos", href: "#clientes" },
                    { label: "06. Caso Bellacy", href: "#caso-estudio" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ color: textPrimary }}
                      className="text-xs font-display uppercase tracking-wider py-1.5 hover:text-[#B832F5] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <a
                  href="#agendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-digital-outline px-6 py-3 text-xs font-display font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 text-white shrink-0"
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
          1. HERO SECTION (Sin signos de puntuación ";" y sin promesa genérica de +330%)
         ===================================================================== */}
      <section className="relative min-h-screen pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 flex flex-col justify-between overflow-hidden">
        {/* Video de Fondo con 50% de transparencia + Onda Topográfica */}
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
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center opacity-75 mix-blend-screen">
            <TopographicWaveSVG className="w-full h-full max-w-6xl animate-float-slow" />
          </div>
          <div
            style={{
              background: `linear-gradient(to top, ${bgPrimary} 4%, transparent 55%, rgba(0,0,0,0.45) 100%)`,
            }}
            className="absolute inset-0"
          />
        </div>

        <div className="hidden sm:block" />

        {/* TITULAR MONUMENTAL SIN SIGNOS DE PUNTUACIÓN */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-12 sm:py-20 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUpBlur}
            className="font-display font-extrabold uppercase text-2xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.06] tracking-tight text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.85)]"
          >
            <span className="block mb-1.5 sm:mb-2">
              NO SOMOS UNA AGENCIA TRADICIONAL
            </span>
            <span className="block mb-1.5 sm:mb-2">
              SOMOS ARQUITECTOS DE
            </span>
            <span className="block">
              <span className="text-digital-gradient">
                ECOSISTEMAS DIGITALES
              </span>
              <span className="inline-block w-[4px] sm:w-[6px] h-[0.82em] bg-white ml-2 sm:ml-3 animate-cursor-blink align-middle shadow-[0_0_15px_#ffffff]" />
            </span>
          </motion.h1>
        </div>

        {/* BARRA INFERIOR EN 3 COLUMNAS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          <motion.div
            variants={fadeUpBlur}
            className="md:col-span-3 flex items-center gap-3.5"
          >
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-digital-gradient leading-none">
              24/7
            </span>
            <span className="text-xs text-zinc-300 font-light leading-snug max-w-[150px]">
              sistemas operando en piloto automático
            </span>
          </motion.div>

          <motion.p
            variants={fadeUpBlur}
            className="md:col-span-5 text-xs sm:text-sm text-zinc-200 font-light leading-relaxed"
          >
            Tu negocio en piloto automático. Tu crecimiento, sin límites.
            Posicionamiento, automatización e IA que convierten visitas en
            clientes recurrentes.
          </motion.p>

          <motion.div
            variants={fadeUpBlur}
            className="md:col-span-4 flex md:justify-end"
          >
            <a
              href="#agendar"
              className="btn-digital-outline w-full sm:w-auto px-8 py-4 text-xs font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
              <span>AGENDAR AUDITORÍA</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================================
          2. EL MANIFIESTO (01: Enfoque en Resultados primero + Democratizamos la Escala mejor explicado)
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
        {/* CUADRÍCULA DE LÍNEAS INTERACTIVAS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${borderColor} 1px, transparent 1px), linear-gradient(to bottom, ${borderColor} 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
              transform: manifestoMouse.active
                ? `translate3d(${(manifestoMouse.x - 600) * -0.012}px, ${(manifestoMouse.y - 300) * -0.012}px, 0)`
                : "translate3d(0px, 0px, 0)",
            }}
            className="absolute inset-0 opacity-40 transition-transform duration-300 ease-out"
          />

          <div
            style={{
              backgroundImage:
                "linear-gradient(to right, #9E38F5 1.5px, transparent 1.5px), linear-gradient(to bottom, #FF5864 1.5px, transparent 1.5px)",
              backgroundSize: "56px 56px",
              transform: manifestoMouse.active
                ? `translate3d(${(manifestoMouse.x - 600) * 0.024}px, ${(manifestoMouse.y - 300) * 0.024}px, 0)`
                : "translate3d(0px, 0px, 0)",
              WebkitMaskImage: `radial-gradient(340px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              maskImage: `radial-gradient(340px circle at ${manifestoMouse.x}px ${manifestoMouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)`,
              opacity: manifestoMouse.active ? 1 : 0,
            }}
            className="absolute inset-0 transition-opacity duration-300 ease-out drop-shadow-[0_0_12px_rgba(158,56,245,0.85)]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUpBlur}
                className="mb-12 sm:mb-14"
              >
                <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                  <span className="block">EL MANIFIESTO</span>
                  <span className="block">
                    <span className="text-digital-gradient">DYNAMO</span>
                    <span className="inline-block w-[4px] sm:w-[5px] h-[0.82em] bg-white ml-2 animate-cursor-blink align-middle" />
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="space-y-7 sm:space-y-8"
              >
                {manifestoItems.map((item, idx) => (
                  <motion.div
                    key={item.num}
                    variants={fadeUpBlur}
                    style={{ borderColor }}
                    className="pb-7 sm:pb-8 border-b last:border-b-0 grid grid-cols-12 gap-4 items-start group"
                  >
                    <div className="col-span-2 flex flex-col items-start gap-2.5 pt-0.5">
                      <WireframeSphereIcon index={idx} />
                      <span
                        style={{ color: textMuted }}
                        className="font-mono text-xs tracking-widest group-hover:text-[#B832F5] transition-colors"
                      >
                        {item.num}
                      </span>
                    </div>

                    <div className="col-span-10">
                      <h3 className="font-display font-bold uppercase text-sm sm:text-base md:text-lg tracking-wide mb-2 group-hover:text-[#E24497] transition-colors">
                        {item.heading}
                      </h3>
                      <p
                        style={{ color: textSecondary }}
                        className="text-xs sm:text-sm font-light leading-relaxed max-w-xl"
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <IridescentRingsSculpture />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. NUEVA SECCIÓN: ¿POR QUÉ SE ESCAPAN TUS VENTAS?
             (Problemas cotidianos reales y cómo los resolvemos con arquitectura digital)
         ===================================================================== */}
      <section
        id="diagnostico"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-4"
          >
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#FF5864] mb-2">
                DIAGNÓSTICO DE FRICCIÓN · CUELLOS DE BOTELLA REALES
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                ¿POR QUÉ SE ESCAPAN{" "}
                <span className="text-digital-gradient">TUS VENTAS?</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="text-xs sm:text-sm font-light max-w-xs"
            >
              Transformamos los puntos ciegos que hoy desgastan tu día a día en
              sistemas automatizados de captación.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {operationalBottleNecks.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpBlur}
                whileHover={{ y: -5 }}
                style={{ backgroundColor: bgCard, borderColor }}
                className="group relative border p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all"
              >
                {/* Línea superior de gradiente en hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-digital-gradient opacity-40 group-hover:opacity-100 transition-opacity" />

                {/* Bloque Superior: El Problema Cotidiano */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#FF5864] bg-[#FF5864]/10 border border-[#FF5864]/30 px-2.5 py-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>FRICCIÓN {item.code}</span>
                    </span>
                    <span
                      style={{ color: textMuted }}
                      className="font-mono text-xs"
                    >
                      /{item.code}
                    </span>
                  </div>

                  <h3 className="font-display font-bold uppercase text-base sm:text-lg tracking-wide mb-2">
                    {item.symptomTitle}
                  </h3>
                  <p
                    style={{ color: textSecondary }}
                    className="text-xs sm:text-sm font-light leading-relaxed"
                  >
                    {item.painPoint}
                  </p>
                </div>

                {/* Bloque Inferior: Cómo lo resolvemos en Dynamo */}
                <div
                  style={{ backgroundColor: bgCardInner, borderColor }}
                  className="p-4 sm:p-5 border relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-wider text-[#B832F5] mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9E38F5] shrink-0" />
                    <span>SOLUCIÓN DYNAMO: {item.solutionTitle}</span>
                  </div>
                  <p
                    style={{ color: textPrimary }}
                    className="text-xs sm:text-sm font-light leading-relaxed opacity-90"
                  >
                    {item.solutionText}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          4. SOLUCIONES CORPORATIVAS — Iniciales D · Y · N
         ===================================================================== */}
      <section
        id="corporativo"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-4"
          >
            <div>
              <div
                style={{ color: textMuted }}
                className="text-[11px] font-mono uppercase tracking-[0.22em] mb-2"
              >
                01 // EMPRESAS & PYMES · [ D · Y · N ]
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                SOLUCIONES{" "}
                <span className="text-digital-gradient">CORPORATIVAS</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="text-xs sm:text-sm font-light max-w-xs"
            >
              Infraestructura digital, posicionamiento y pauta de alto retorno.
            </p>
          </motion.div>

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
                className="group relative border p-7 sm:p-9 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] overflow-hidden transition-all"
              >
                <div className="absolute -top-6 -right-12 w-72 h-56 opacity-45 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <TopographicWaveSVG className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div
                    style={{ color: textMuted }}
                    className="font-mono text-xs tracking-widest mb-2"
                  >
                    {pillar.code}
                  </div>
                  <div className="font-display-light text-7xl sm:text-8xl leading-none text-digital-gradient select-none mb-6">
                    {pillar.letter}
                  </div>
                </div>

                <div className="relative z-10 my-auto">
                  <h3 className="font-display font-bold uppercase text-base sm:text-lg leading-snug mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p
                    style={{ color: textSecondary }}
                    className="text-xs sm:text-sm font-light leading-relaxed"
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6">
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider group-hover:text-[#E24497] transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                    <span>EMPEZAR</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          5. IMPULSO PARA PROFESIONALES · MODELO 80/20 — Iniciales A · M · O
         ===================================================================== */}
      <section
        id="profesionales"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-4"
          >
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#E24497] mb-2">
                02 // BARBEROS · ESTÉTICA · TÉCNICOS · OFICIOS · [ A · M · O ]
              </div>
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                IMPULSO{" "}
                <span className="text-digital-gradient">MODELO 80/20</span>
              </h2>
            </div>
            <p
              style={{ color: textSecondary }}
              className="text-xs sm:text-sm font-light max-w-xs"
            >
              Digitalizamos tu oficio con $0 de inversión inicial. Crecemos a
              comisión contigo.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {professionalPillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeUpBlur}
                whileHover={{ y: -6 }}
                style={{ backgroundColor: bgCard, borderColor }}
                className="group relative border p-7 sm:p-9 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] overflow-hidden transition-all"
              >
                <div className="absolute -top-6 -right-12 w-72 h-56 opacity-45 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <TopographicWaveSVG className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div
                    style={{ color: textMuted }}
                    className="font-mono text-xs tracking-widest mb-2"
                  >
                    {pillar.code}
                  </div>
                  <div className="font-display-light text-7xl sm:text-8xl leading-none text-digital-gradient select-none mb-6">
                    {pillar.letter}
                  </div>
                </div>

                <div className="relative z-10 my-auto">
                  <h3 className="font-display font-bold uppercase text-base sm:text-lg leading-snug mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p
                    style={{ color: textSecondary }}
                    className="text-xs sm:text-sm font-light leading-relaxed"
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6">
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider group-hover:text-[#E24497] transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_12px_#9E38F5]" />
                    <span>APLICAR AL 80/20</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          6. NUEVA SECCIÓN: MARCAS QUE YA CREARON SUS ECOSISTEMAS DIGITALES
             (Logos sin fondo + Efectos + Animaciones acordes a la plantilla)
         ===================================================================== */}
      <section
        id="clientes"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="relative py-24 sm:py-32 px-4 sm:px-6 border-t overflow-hidden scroll-mt-20 transition-colors duration-200"
      >
        {/* Resplandor ambiental de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[240px] rounded-full bg-gradient-to-r from-[#5246FF]/15 via-[#9E38F5]/15 to-[#FF5864]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="text-center max-w-4xl mx-auto mb-14 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#B832F5] mb-3">
              <span className="w-2 h-2 rounded-full bg-digital-gradient animate-pulse" />
              <span>CONFIANZA & EJECUCIÓN REAL</span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl md:text-5xl leading-[1.06] tracking-tight">
              NEGOCIOS QUE YA CREARON SUS{" "}
              <span className="text-digital-gradient">
                ECOSISTEMAS DIGITALES
              </span>
            </h2>
          </motion.div>

          {/* Banda Marquee Infinita con los Logos sin fondo */}
          <div
            style={{ borderColor, backgroundColor: "rgba(10, 10, 18, 0.55)" }}
            className="relative overflow-hidden border-y py-10 sm:py-12 backdrop-blur-md"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#030306] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#030306] to-transparent z-10" />

            <div className="animate-marquee flex items-center gap-16 sm:gap-28 px-8">
              {[...clientEcosystems, ...clientEcosystems, ...clientEcosystems].map(
                (client, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-300 shrink-0 group"
                  >
                    <div className="h-16 sm:h-24 w-40 sm:w-52 flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-14 sm:max-h-20 max-w-full object-contain filter drop-shadow-[0_0_18px_rgba(158,56,245,0.4)] group-hover:drop-shadow-[0_0_28px_rgba(255,88,100,0.65)] group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. CASO DE ESTUDIO: THE BELLACY STUDIO
             (Presentado como antecedente real del caso y con combinación Naranja Vibrante en la tarjeta desvelable)
         ===================================================================== */}
      <section
        id="caso-estudio"
        style={{ backgroundColor: bgSecondary, borderColor }}
        className="py-24 sm:py-32 px-4 sm:px-6 border-t scroll-mt-20 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpBlur}
            className="grid lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16"
          >
            <div className="lg:col-span-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#FF6B35] font-bold">
                ANTECEDENTE REAL DE ÉXITO
              </div>
              <p
                style={{ color: textMuted }}
                className="text-xs font-light mt-1"
              >
                Resultado documentado en The Bellacy Studio
              </p>
            </div>

            <div className="lg:col-span-9 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight">
                CASO{" "}
                <span className="text-digital-gradient">BELLACY STUDIO</span>
              </h2>
              <span
                style={{ color: textMuted }}
                className="text-xs font-mono uppercase tracking-wider"
              >
                ← DESLIZA LA TARJETA →
              </span>
            </div>
          </motion.div>

          {/* TARJETA INTERACTIVA ANTES / DESPUÉS (Con combinación Naranja Intenso + Coral + Púrpura para resaltar en la web) */}
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
            className="relative grid grid-cols-1 overflow-hidden border border-[#FF6B35]/30 select-none cursor-ew-resize touch-pan-y group shadow-[0_20px_70px_rgba(255,91,34,0.18)]"
          >
            {/* CAPA 1: BEFORE (US$ 300 / MES) */}
            <div className="col-start-1 row-start-1 w-full bg-[#08080D] text-white p-6 sm:p-12 md:p-14 flex flex-col justify-between relative">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center p-1.5">
                      <img
                        src="/logos/bellacy.png"
                        alt="The Bellacy Studio"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase text-lg sm:text-xl tracking-wide text-zinc-200">
                        THE BELLACY STUDIO
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Antecedente Previo · Estado Inicial
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:gap-10 py-6 border-y border-zinc-800/90 mb-6">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        Facturación mensual (Antes)
                      </div>
                      <div className="font-display font-extrabold text-2xl sm:text-4xl text-zinc-300">
                        US$ 300{" "}
                        <span className="text-xs font-mono font-normal text-zinc-500">
                          /mes
                        </span>
                      </div>
                      <div className="mt-3 inline-block text-xs font-display font-bold uppercase tracking-widest text-zinc-400 border-b-2 border-zinc-600 pb-0.5">
                        BEFORE
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-zinc-500 mb-1">
                        Diagnóstico inicial
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        Visibilidad local mínima en Google Maps y captación
                        limitada al boca a boca.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed max-w-xl">
                    &ldquo;El desafío de The Bellacy Studio no era la calidad de
                    su servicio, sino su visibilidad digital. Sin pauta activa
                    ni posicionamiento local estructurado.&rdquo;
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { k: "US$ 300", v: "Ingresos mensuales" },
                    { k: "0 ADS", v: "Sin campañas activas" },
                    { k: "BAJA", v: "Visibilidad en Maps" },
                    { k: "MANUAL", v: "Sin sistema predecible" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-zinc-900/60 border border-zinc-800/80"
                    >
                      <div className="font-display font-bold text-base sm:text-lg text-zinc-300 mb-1">
                        {m.k}
                      </div>
                      <div className="text-[11px] text-zinc-500">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>CASO REAL: THE BELLACY STUDIO · BEFORE</span>
                <span>← DESLIZA PARA REVELAR EL AFTER →</span>
              </div>
            </div>

            {/* CAPA 2: AFTER (US$ 1.300 / MES - Combinación Naranja Intenso + Coral + Violeta Oscuro) */}
            <motion.div
              style={{
                clipPath: afterClipPath,
                scale: afterScale,
              }}
              className="col-start-1 row-start-1 w-full bg-gradient-to-br from-[#FF6A1A] via-[#E03E2D] to-[#6B1B9A] text-white p-6 sm:p-12 md:p-14 flex flex-col justify-between relative z-10 origin-left"
            >
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FF9E44]/25 blur-3xl pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-12 h-12 rounded-full bg-black/40 border border-[#FFB07B]/60 flex items-center justify-center p-1.5">
                      <img
                        src="/logos/bellacy.png"
                        alt="The Bellacy Studio"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold uppercase text-lg sm:text-xl tracking-wide text-white">
                        THE BELLACY STUDIO
                      </h3>
                      <p className="text-xs text-[#FFE2CF]">
                        Ecosistema Google Maps + Pauta Precisa
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 sm:gap-10 py-6 border-y border-white/25 mb-6">
                    <div>
                      <div className="text-xs text-[#FFE2CF] mb-1">
                        Facturación alcanzada (Después)
                      </div>
                      <div className="font-display font-extrabold text-2xl sm:text-4xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                        US$ 1.300{" "}
                        <span className="text-xs font-mono font-normal text-white/85">
                          /mes
                        </span>
                      </div>
                      <div className="mt-3 inline-block text-xs font-display font-bold uppercase tracking-widest text-white border-b-2 border-[#FFD166] pb-0.5">
                        AFTER · CASO BELLACY
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-[#FFE2CF] mb-1">
                        Evolución del estudio
                      </div>
                      <p className="text-xs sm:text-sm text-white font-light leading-relaxed">
                        Pasaron de US$ 300 a US$ 1.300 mensuales en 3 meses con
                        flujo predecible de clientes.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/95 font-light leading-relaxed max-w-xl">
                    &ldquo;Reestructuración completa en Google Maps + campañas
                    de anuncios precisas: en este caso real, el estudio pasó de
                    $300 USD a $1.300 USD mensuales en 3 meses.&rdquo;
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { k: "US$ 1.300", v: "Facturación alcanzada" },
                    { k: "+330%", v: "Crecimiento en este caso" },
                    { k: "3 MESES", v: "Tiempo de ejecución" },
                    { k: "TOP MAPS", v: "Flujo predecible" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-black/35 backdrop-blur-md border border-[#FFB07B]/35 shadow-lg"
                    >
                      <div className="font-display font-bold text-base sm:text-lg text-[#FFD6BA] mb-1">
                        {m.k}
                      </div>
                      <div className="text-[11px] text-white/90">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-white/25 flex items-center justify-between text-xs font-mono text-white">
                <span>ANTECEDENTE REAL: THE BELLACY STUDIO</span>
                <span>DE US$ 300 A US$ 1.300 / MES</span>
              </div>
            </motion.div>

            {/* HAZ LÁSER ESCÁNER CON DESTELLO NARANJA CÁLIDO */}
            <motion.div
              style={{ left: beamLeft }}
              className="absolute inset-y-0 z-20 pointer-events-none -translate-x-1/2 flex items-center justify-center"
            >
              <div className="absolute right-0 w-16 sm:w-28 h-full bg-gradient-to-l from-white/35 via-[#FF6A1A]/40 to-transparent blur-xl -skew-x-3" />
              <div className="w-[2.5px] h-[110%] bg-gradient-to-b from-[#FFB347] via-white to-[#FF5B22] shadow-[0_0_20px_#ffffff,0_0_40px_#FF6A1A] -rotate-[2deg]" />
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-black/90 backdrop-blur-xl text-white shadow-[0_0_30px_rgba(255,106,26,0.95)] border border-[#FF9E44]/70 flex items-center justify-center font-mono text-xs group-hover:scale-110 transition-transform">
                <span className="text-[#FF7A33] font-bold">↔</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. CTA FINAL + FOOTER CON POLÍTICA DE COOKIES
         ===================================================================== */}
      <section
        id="agendar"
        style={{ backgroundColor: bgPrimary, borderColor }}
        className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 border-t overflow-hidden scroll-mt-20"
      >
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
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight mb-5">
            <span className="block">INICIEMOS LA</span>
            <span className="block">
              <span className="text-digital-gradient">COOPERACIÓN</span>
              <span className="inline-block w-[4px] sm:w-[6px] h-[0.82em] bg-white ml-2 sm:ml-3 animate-cursor-blink align-middle" />
            </span>
          </h2>

          <p
            style={{ color: textSecondary }}
            className="text-xs sm:text-sm md:text-base font-light mb-10 max-w-md mx-auto"
          >
            Agenda una reunión estratégica de 30 minutos para evaluar tu
            ecosistema y escalar tus resultados.
          </p>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-digital-outline px-10 py-5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-digital-gradient shadow-[0_0_14px_#9E38F5]" />
              <span>CONTACTAR AHORA</span>
            </motion.button>
          </div>
        </motion.div>

        <footer
          style={{ borderColor }}
          className="relative z-10 max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-1">
            <span className="font-display font-extrabold text-base uppercase tracking-wider">
              DYNAMO<span className="text-digital-gradient">SOLUTIONS</span>
            </span>
            <sup className="text-[10px] font-mono text-[#9E38F5] font-bold">
              ®
            </sup>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setCookieModalOpen(true)}
              style={{ color: textSecondary }}
              className="hover:text-[#FF5864] transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
            >
              <Cookie className="w-3.5 h-3.5 text-[#B832F5]" />
              <span>Política de Cookies</span>
            </button>
            <span style={{ color: textMuted }}>
              © 2026 DYNAMO SOLUTIONS. TODOS LOS DERECHOS RESERVADOS.
            </span>
          </div>
        </footer>
      </section>

      {/* =====================================================================
          BANNER FLOTANTE DE CONSENTIMIENTO DE COOKIES
         ===================================================================== */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            style={{ backgroundColor: bgCard, borderColor }}
            className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:max-w-md z-50 border p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-digital-gradient" />

            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-9 h-9 border border-[#9E38F5]/40 bg-[#9E38F5]/10 flex items-center justify-center shrink-0">
                <Cookie className="w-4 h-4 text-[#E24497]" />
              </div>
              <div>
                <h4 className="font-display font-bold uppercase text-xs sm:text-sm tracking-wider mb-1">
                  PRIVACIDAD & USO DE COOKIES
                </h4>
                <p
                  style={{ color: textSecondary }}
                  className="text-xs font-light leading-relaxed"
                >
                  Utilizamos cookies propias y de terceros para optimizar la
                  experiencia en nuestro ecosistema digital, analizar métricas
                  de tráfico y medir campañas (Google & Meta Ads).{" "}
                  <button
                    type="button"
                    onClick={() => setCookieModalOpen(true)}
                    className="text-[#E24497] hover:underline font-medium cursor-pointer"
                  >
                    Ver Política y Configurar
                  </button>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() =>
                  handleSaveCookies({
                    essential: true,
                    analytics: false,
                    marketing: false,
                  })
                }
                style={{ borderColor, color: textSecondary }}
                className="px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider border hover:text-white transition-colors cursor-pointer"
              >
                Solo Esenciales
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSaveCookies({
                    essential: true,
                    analytics: true,
                    marketing: true,
                  })
                }
                className="btn-digital-outline px-5 py-2 text-[11px] font-display font-bold uppercase tracking-wider text-white inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-digital-gradient" />
                <span>ACEPTAR TODAS</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL COMPLETO DE POLÍTICA Y CONFIGURACIÓN DE COOKIES
         ===================================================================== */}
      <AnimatePresence>
        {cookieModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setCookieModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: bgCard, borderColor }}
              className="relative w-full max-w-2xl border p-6 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-[3px] bg-digital-gradient" />

              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-[#B832F5]" />
                  <h3 className="font-display font-extrabold uppercase text-base sm:text-xl tracking-wide">
                    POLÍTICA DE COOKIES ·{" "}
                    <span className="text-digital-gradient">DYNAMO</span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCookieModalOpen(false)}
                  style={{ borderColor, color: textSecondary }}
                  className="w-8 h-8 border flex items-center justify-center hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                style={{ color: textSecondary }}
                className="space-y-4 text-xs sm:text-sm font-light leading-relaxed mb-6"
              >
                <p>
                  En <strong style={{ color: textPrimary }}>Dynamo Solutions®</strong>{" "}
                  empleamos cookies y tecnologías similares de almacenamiento
                  local para garantizar el correcto funcionamiento de nuestra
                  plataforma, recordar tus preferencias visuales (como el nivel
                  de luminosidad) y analizar el rendimiento de nuestros
                  ecosistemas digitales.
                </p>

                <div className="space-y-3 pt-2">
                  {/* Categoría 1: Técnicas */}
                  <div
                    style={{ backgroundColor: bgCardInner, borderColor }}
                    className="p-4 border flex items-start justify-between gap-4"
                  >
                    <div>
                      <div
                        style={{ color: textPrimary }}
                        className="font-display font-bold uppercase text-xs tracking-wider mb-1"
                      >
                        1. Cookies Técnicas y Estrictamente Necesarias
                      </div>
                      <p className="text-xs">
                        Esenciales para la navegación, seguridad del sitio,
                        preferencia de luminosidad y almacenamiento de tu
                        consentimiento de privacidad. No pueden desactivarse.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                      Siempre Activas
                    </span>
                  </div>

                  {/* Categoría 2: Analíticas */}
                  <div
                    style={{ backgroundColor: bgCardInner, borderColor }}
                    className="p-4 border flex items-start justify-between gap-4"
                  >
                    <div>
                      <div
                        style={{ color: textPrimary }}
                        className="font-display font-bold uppercase text-xs tracking-wider mb-1"
                      >
                        2. Cookies Analíticas y de Rendimiento (SEO / CRO)
                      </div>
                      <p className="text-xs">
                        Nos permiten medir de forma agregada las visitas, el
                        tiempo de permanencia y la interacción con las secciones
                        de la web para mejorar continuamente la experiencia.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePrefs.analytics}
                      onChange={(e) =>
                        setCookiePrefs((p) => ({
                          ...p,
                          analytics: e.target.checked,
                        }))
                      }
                      className="mt-1 w-4 h-4 accent-[#9E38F5] cursor-pointer shrink-0"
                    />
                  </div>

                  {/* Categoría 3: Marketing */}
                  <div
                    style={{ backgroundColor: bgCardInner, borderColor }}
                    className="p-4 border flex items-start justify-between gap-4"
                  >
                    <div>
                      <div
                        style={{ color: textPrimary }}
                        className="font-display font-bold uppercase text-xs tracking-wider mb-1"
                      >
                        3. Cookies de Publicidad y Conversión (SEM & Meta Ads)
                      </div>
                      <p className="text-xs">
                        Utilizadas para medir la efectividad de nuestras
                        campañas publicitarias y presentar anuncios relevantes
                        acordes a tus intereses empresariales.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePrefs.marketing}
                      onChange={(e) =>
                        setCookiePrefs((p) => ({
                          ...p,
                          marketing: e.target.checked,
                        }))
                      }
                      className="mt-1 w-4 h-4 accent-[#9E38F5] cursor-pointer shrink-0"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSaveCookies({
                      essential: true,
                      analytics: false,
                      marketing: false,
                    })
                  }
                  style={{ borderColor, color: textSecondary }}
                  className="px-4 py-2.5 text-xs font-mono uppercase border hover:text-white cursor-pointer"
                >
                  Rechazar Opcionales
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveCookies(cookiePrefs)}
                  style={{ borderColor, color: textPrimary }}
                  className="px-5 py-2.5 text-xs font-display font-bold uppercase border hover:border-[#9E38F5] cursor-pointer"
                >
                  Guardar Selección
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSaveCookies({
                      essential: true,
                      analytics: true,
                      marketing: true,
                    })
                  }
                  className="btn-digital-outline px-6 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-white inline-flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-digital-gradient" />
                  <span>ACEPTAR TODAS</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
