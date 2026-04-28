/**
 * ============================================================
 *  GRUPO SOLUCIONES ÉLITE — Archivo de Configuración
 *  Edita este archivo para actualizar todo el contenido
 *  del sitio sin tocar el código fuente.
 * ============================================================
 */

const GSE = {

    /* ── DOMINIO DEL SITIO ───────────────────────────────────── */
  // ← EDITAR AQUÍ cuando tengas tu dominio definitivo.
  //   Ahora en Netlify será algo como: "https://grupoelit.netlify.app"
  //   Cuando compres dominio propio: "https://www.gruposoluciones.hn"
  //   (sin barra al final)
  siteUrl: "https://www.solucioneselite.com",

  /* ── MODELO 3D DEL DRON ──────────────────────────────────── */
  // Cambia el nombre del archivo .glb que quieras mostrar:
  //   Sin color (gris/metal): "dji_mavic_air_drone.glb"
  //   Con color:              "dji_mavic_air_-_arctic_white.glb"
  drone3DModel: "dji_mavic_air_-_arctic_white.glb",

  // true  → el dron sigue al mouse por toda la pantalla
  // false → el dron se queda fijo en la esquina superior derecha
  //          (sigue rotando 360° y sigue el scroll de la página)
  droneFollowsMouse: false,
  /* ── EMPRESA ─────────────────────────────────────────── */
  empresa: {
    nombre:            "Grupo Soluciones Élite",
    slogan:            "Nos elevamos juntos",
    descripcion:       "Líderes en soluciones de drones para agricultura, bienes raíces, inspección de infraestructura y más. Tecnología de punta para elevar tu negocio a nuevas alturas.",
    whatsapp:          "+50489775763",          // ← EDITAR: número con código de país
    whatsappMensaje:   "Hola! Me interesa conocer más sobre sus servicios de drones. ¿Me pueden dar información?",
    email:             "ventas@solucioneselite.com",  // ← EDITAR
    telefono:          "+504 8977-5763",             // ← EDITAR
    ubicacion:         "Honduras, San Pedro Sula", // ← EDITAR
    instagram:         "https://www.instagram.com/gruposolucioneselite/",  // ← URL completa
    facebook:          "https://www.facebook.com/profile.php?id=61582240800999", // ← URL completa
    logoUrl:           "",  // ← EDITAR: ruta a logo PNG/SVG (dejar vacío para usar texto)
  },

  /* ── COLORES (deben coincidir con style.css) ─────────── */
  colores: {
    principal:  "#0D2F3F",
    secundario: "#4B5320",
    acento:     "#C9A84C",
    blanco:     "#FFFFFF",
    gris:       "#A8A8A8",
  },

  /* ── HERO ─────────────────────────────────────────────── */
  hero: {
    badge:          "Pioneros en Honduras -Tecnología de Punta en Drones",
    titulo:         "Soluciones Aéreas de",
    tituloDestacado:"Alta Precisión",
    subtitulo:      "Transformamos industrias con drones de última generación. Agricultura, bienes raíces, inspección y mapeo con resultados comprobados.",
    botonPrimario:  "Contáctanos por WhatsApp",
    botonSecundario:"Ver Servicios",
  },

  /* ── SERVICIOS ────────────────────────────────────────── */
/* ── SERVICIOS ────────────────────────────────────────── */
servicios: [
  {
    icono:          "building",
    titulo:         "Limpieza de Fachadas de Edificios",
    descripcion:    "Utilizamos drones de alta presión diseñados para la limpieza de cristales y fachadas en altura, eliminando la necesidad de andamios y reduciendo significativamente los tiempos de ejecución.",
    caracteristicas:[
      "Limpieza sin andamios",
      "Alta presión controlada",
      "Reducción de tiempo hasta 50%",
      "Seguridad total para personal y transeúntes"
    ],
  },
  {
    icono:          "sun",
    titulo:         "Limpieza de Paneles Solares",
    descripcion:    "Nuestros drones aplican soluciones de limpieza de forma uniforme y delicada, eliminando polvo y suciedad sin riesgo de dañar las celdas solares.",
    caracteristicas:[
      "Limpieza sin contacto directo",
      "Protección contra microfisuras",
      "Aplicación uniforme",
      "Optimización del rendimiento energético"
    ],
  },
  {
    icono:          "inspect",
    titulo:         "Inspección de Fachadas",
    descripcion:    "Detectamos patologías estructurales mediante cámaras de alta resolución y sensores térmicos, permitiendo mantenimiento preventivo sin infraestructura pesada.",
    caracteristicas:[
      "Cámaras de alta resolución",
      "Sensores térmicos",
      "Detección de grietas y humedades",
      "Reportes técnicos detallados"
    ],
  },
  {
    icono:          "leaf",
    titulo:         "Fumigación con Drones",
    descripcion:    "Ofrecemos fumigación agrícola, cubriendo grandes extensiones de forma rápida, precisa y eficiente.",
    caracteristicas:[
      "Tecnología ULV",
      "Cobertura de grandes áreas",
      "Distribución homogénea",
      "Reducción del impacto ambiental"
    ],
  },
],

  /* ── POR QUÉ NOSOTROS ─────────────────────────────────── */
  porQueNosotros: [
    {
      icono:       "award",
      titulo:      "Pilotos Certificados",
      descripcion: "Nuestro equipo cuenta con certificaciones oficiales de la agencia Hondureña de Aeronáutica Civil.",
    },
    {
      icono:       "rocket",
      titulo:      "Tecnología DJI Profesional",
      descripcion: "Trabajamos con drones de alto rendimiento como DJI Matrice M400, DJI Mini 5 Pro y DJI Agras T100, seleccionados para garantizar precisión, seguridad y resultados superiores en cada proyecto.",
    },
    {
      icono:       "lightning",
      titulo:      "Respuesta Rápida",
      descripcion: "Disponibilidad para proyectos urgentes. Movilización en 24 h y respuesta a cotizaciones en menos de 2 horas.",
    },
  ],

  /* ── MISIÓN & VISIÓN ──────────────────────────────────── */
  misionVision: {
    mision: {
      icono:  "target",
      titulo: "Nuestra Misión",
      texto:  "Impulsar el crecimiento de nuestros clientes  mediante soluciones aéreas innovadoras, seguras y de alta precisión.",
    },
    vision: {
      icono:  "eye",
      titulo: "Nuestra Visión",
      texto:  "Ser el referente tecnológico líder en el país, transformando la eficiencia operativa a través de nuestra visión desde el aire.",
    },
  },

  /* ── FAQ ─────────────────────────────────────────────── */
preguntas: [
  {
    pregunta: "¿Qué tipos de drones utilizan?",
    respuesta: "Operamos con drones de última generación como DJI Matrice M400, DJI Mini 5 Pro y DJI Agras T100, equipados para tareas de limpieza, inspección y fumigación con alta precisión y eficiencia.",
  },
  {
    pregunta: "¿Gestionan los permisos de vuelo?",
    respuesta: "Sí, contamos con todos los permisos como operadores RPAS en Honduras. Nuestros pilotos están certificados oficialmente y cumplimos con la normativa vigente.",
  },
  {
    pregunta: "¿En qué zonas geográficas operan?",
    respuesta: "Operamos a nivel nacional, con capacidad de movilizarnos a cualquier zona del país, incluyendo áreas de difícil acceso.",
  },
  {
    pregunta: "¿Cuánto tiempo tarda un proyecto típico?",
    respuesta: "El tiempo estimado depende de varios factores, como la altura y la complejidad del proyecto. Cada servicio se planifica de forma personalizada, envianos un mensaje para darte una cotización con tiempos específicos.",
  },
  {
    pregunta: "¿Qué condiciones climáticas afectan las operaciones?",
    respuesta: "Las lluvias fuertes pueden afectar las operaciones. Sin embargo, lluvias leves no representan inconvenientes significativos para nuestros servicios.",
  },
  {
    pregunta: "¿Cómo solicito una cotización?",
    respuesta: "Puedes contactarnos por WhatsApp, teléfono o correo electrónico. Te responderemos con una propuesta personalizada en el menor tiempo posible.",
  },
  {
    pregunta: "¿Cuentan con seguros o respaldo en sus operaciones?",
    respuesta: "Estamos capacitados para cubrir daños a terceros y operamos bajo estrictos estándares de seguridad para garantizar la protección en cada servicio.",
  },
  {
    pregunta: "¿Los pilotos están certificados?",
    respuesta: "Sí, contamos con pilotos certificados oficialmente por RPAS, garantizando operaciones seguras y profesionales.",
  },
],

  /* ── CONTACTO ─────────────────────────────────────────── */
  contacto: {
    titulo:    "¿Listo para Elevarte?",
    subtitulo: "Contáctanos ahora y recibe una cotización personalizada sin costo",
    boton:     "Hablar por WhatsApp ahora",
  },

  /* ── FOOTER ───────────────────────────────────────────── */
  footer: {
    texto:  "© 2026 Grupo Soluciones Élite. Todos los derechos reservados.",
    slogan: "Nos elevamos juntos",
  },
};
