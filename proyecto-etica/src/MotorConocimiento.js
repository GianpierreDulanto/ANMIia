// Motor de conocimiento ANMI (100% offline, sin backend) ✨
// Sistema avanzado de procesamiento de lenguaje natural con información basada en guías alimentarias oficiales
// Con principios éticos integrados y memoria conversacional tipo ChatGPT
// 
// CARACTERÍSTICAS ESPECIALES:
// - Tolerante a errores ortográficos y de escritura (diseñado para usuarios con dificultades de escritura)
// - Corrige automáticamente errores comunes (bebe/bebé, nino/niño, ke/que, etc.)
// - Usa distancia de Levenshtein para matching aproximado
// - Normaliza variaciones comunes de palabras mal escritas
// - Funciona incluso con escritura muy informal o con faltas ortográficas

// ----------------- UTILIDADES BÁSICAS AVANZADAS -----------------

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Diccionario de correcciones ortográficas comunes
const CORRECCIONES_ORTograficas = {
  // Errores comunes de escritura
  "bebe": "bebe", "bebé": "bebe", "bebito": "bebe", "bebita": "bebe",
  "nino": "nino", "niño": "nino", "nina": "nina", "niña": "nina",
  "meses": "meses", "mese": "meses", "mes": "meses",
  "anemia": "anemia", "anemía": "anemia", "anemio": "anemia",
  "hierro": "hierro", "ierro": "hierro", "hiero": "hierro",
  "leche": "leche", "leche": "leche", "leche": "leche",
  "pecho": "pecho", "pecho": "pecho",
  "comer": "comer", "comer": "comer", "comer": "comer",
  "alimentacion": "alimentacion", "alimentación": "alimentacion",
  "lactancia": "lactancia", "lactansia": "lactancia", "lactansia": "lactancia",
  "sangrecita": "sangrecita", "sangrecita": "sangrecita", "sangrecita": "sangrecita",
  "higado": "higado", "hígado": "higado", "higado": "higado",
  "lentejas": "lentejas", "lentejas": "lentejas", "lentejas": "lentejas",
  "cuando": "cuando", "cuando": "cuando", "kuando": "cuando",
  "como": "como", "cómo": "como", "komo": "como",
  "que": "que", "qué": "que", "ke": "que", "q": "que",
  "porque": "porque", "por qué": "porque", "porque": "porque", "xq": "porque", "pq": "porque",
  "tiene": "tiene", "tiene": "tiene", "tiene": "tiene",
  "puedo": "puedo", "puedo": "puedo", "puedo": "puedo",
  "debo": "debo", "debo": "debo", "debo": "debo",
  "dar": "dar", "dar": "dar", "dar": "dar",
  "no come": "no come", "no come": "no come", "no kome": "no come",
  "rechaza": "rechaza", "rechasa": "rechaza", "rechasa": "rechaza",
  "vomita": "vomita", "vomita": "vomita", "vomita": "vomita",
  "diarrea": "diarrea", "diarrea": "diarrea", "diarrea": "diarrea",
  "fiebre": "fiebre", "fiebre": "fiebre", "fiebre": "fiebre"
};

// Función para corregir errores ortográficos comunes
const corregirOrtografia = (texto) => {
  let corregido = texto.toLowerCase();
  
  // Reemplazar caracteres problemáticos comunes
  const reemplazos = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'ñ': 'n', 'ü': 'u',
    '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't'
  };
  
  Object.entries(reemplazos).forEach(([mal, bien]) => {
    corregido = corregido.replace(new RegExp(mal, 'g'), bien);
  });
  
  // Corregir palabras comunes mal escritas
  const erroresComunes = {
    'bebe': 'bebe', 'bebé': 'bebe', 'bebito': 'bebe', 'bebita': 'bebe',
    'nino': 'nino', 'niño': 'nino', 'nina': 'nina', 'niña': 'nina',
    'anemia': 'anemia', 'anemía': 'anemia', 'anemio': 'anemia',
    'hierro': 'hierro', 'ierro': 'hierro', 'hiero': 'hierro',
    'lactancia': 'lactancia', 'lactansia': 'lactancia', 'lactansia': 'lactancia',
    'alimentacion': 'alimentacion', 'alimentación': 'alimentacion',
    'sangrecita': 'sangrecita', 'sangrecita': 'sangrecita',
    'higado': 'higado', 'hígado': 'higado',
    'lentejas': 'lentejas', 'lentejas': 'lentejas',
    'cuando': 'cuando', 'kuando': 'cuando', 'cuando': 'cuando',
    'como': 'como', 'cómo': 'como', 'komo': 'como',
    'que': 'que', 'qué': 'que', 'ke': 'que',
    'porque': 'porque', 'por qué': 'porque', 'xq': 'porque', 'pq': 'porque',
    'rechaza': 'rechaza', 'rechasa': 'rechaza',
    'no come': 'no come', 'no kome': 'no come'
  };
  
  Object.entries(erroresComunes).forEach(([error, correcto]) => {
    const regex = new RegExp(`\\b${error}\\b`, 'gi');
    corregido = corregido.replace(regex, correcto);
  });
  
  return corregido;
};

// Normalizar texto: minúsculas, sin tildes, sin espacios raros, expandir contracciones, corregir ortografía
const normalizar = (texto) => {
  if (!texto) return "";
  
  // Primero corregir ortografía común
  let normalizado = corregirOrtografia(texto);
  
  // Normalizar caracteres
  normalizado = normalizado
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  
  // Expandir contracciones comunes
  const contracciones = {
    "q ": "que ", " xq ": " porque ", " x ": " por ", " d ": " de ",
    " n ": " no ", " t ": " te ", " m ": " me ", " s ": " se ",
    " pq ": " porque ", " k ": " que ", " d ": " de ",
    " xk ": " porque ", " xq ": " porque ", " x ": " por "
  };
  
  Object.entries(contracciones).forEach(([contraccion, expansion]) => {
    normalizado = normalizado.replace(new RegExp(contraccion, "g"), expansion);
  });
  
  // Normalizar variaciones comunes de escritura
  normalizado = normalizado
    .replace(/\b(bebe|bebé|bebito|bebita)\b/gi, "bebe")
    .replace(/\b(nino|niño|nina|niña)\b/gi, "nino")
    .replace(/\b(anemia|anemía|anemio)\b/gi, "anemia")
    .replace(/\b(hierro|ierro|hiero)\b/gi, "hierro")
    .replace(/\b(lactancia|lactansia)\b/gi, "lactancia")
    .replace(/\b(alimentacion|alimentación)\b/gi, "alimentacion")
    .replace(/\b(cuando|kuando)\b/gi, "cuando")
    .replace(/\b(como|cómo|komo)\b/gi, "como")
    .replace(/\b(que|qué|ke)\b/gi, "que")
    .replace(/\b(porque|por qué|porque)\b/gi, "porque")
    .replace(/\b(rechaza|rechasa)\b/gi, "rechaza")
    .replace(/\b(no come|no kome)\b/gi, "no come");
  
  return normalizado;
};

const tokenizar = (texto) => normalizar(texto).split(" ").filter(Boolean);

// ----------------- PRINCIPIOS ÉTICOS INTEGRADOS -----------------

const PRINCIPIOS_ETICOS = {
  // Aplicar advertencia ética a respuestas médicas (solo cuando es necesario)
  aplicarAdvertencia: (respuesta, esMedica = false) => {
    const textoLower = respuesta.toLowerCase();
    
    // No agregar si ya tiene advertencia
    if (textoLower.includes('⚠️') || textoLower.includes('consulta con un pediatra')) {
      return respuesta;
    }
    
    // Solo agregar si es realmente necesario
    if (esMedica || 
        textoLower.includes('diagnóstico de') || 
        textoLower.includes('tratamiento específico') || 
        textoLower.includes('medicamento específico') || 
        textoLower.includes('dosis de')) {
      return respuesta + `\n\n⚠️ Importante: Esta información es educativa. Siempre consulta con un pediatra o profesional de salud para diagnóstico y tratamiento adecuado.`;
    }
    return respuesta;
  },
  
  // Verificar si la respuesta necesita advertencia (solo si realmente es necesario)
  necesitaAdvertencia: (respuesta) => {
    const textoLower = respuesta.toLowerCase();
    
    // Si ya tiene advertencia, no agregar otra
    if (textoLower.includes('⚠️') || textoLower.includes('consulta con un pediatra') || 
        textoLower.includes('debe ser indicado por un pediatra') ||
        textoLower.includes('profesional de salud para diagnóstico')) {
      return false;
    }
    
    // Solo agregar advertencia si menciona términos médicos específicos Y no tiene advertencia
    const palabrasMedicasEspecificas = [
      'diagnóstico de', 'tratamiento específico', 'medicamento específico', 
      'dosis de', 'recetar', 'prescripción de', 'síntoma grave', 
      'patología', 'tiene la enfermedad', 'padece'
    ];
    
    return palabrasMedicasEspecificas.some(palabra => textoLower.includes(palabra));
  },
  
  // Aplicar principio de no diagnóstico
  noDiagnosticar: (respuesta) => {
    if (respuesta.includes('tiene') && (respuesta.includes('anemia') || respuesta.includes('enfermedad'))) {
      return respuesta.replace(/tiene (anemia|enfermedad)/gi, 'podría tener $1 (consulta al pediatra para confirmar)');
    }
    return respuesta;
  }
};

// ----------------- SISTEMA DE MEMORIA CONVERSACIONAL -----------------

const extraerContextoConversacional = (historialMensajes = []) => {
  if (!historialMensajes || historialMensajes.length === 0) {
    return {
      edadMencionada: null,
      temasPrevios: [],
      alimentosMencionados: [],
      sintomasMencionados: [],
      ultimoTema: null
    };
  }
  
  // Extraer información de los últimos 5 mensajes
  const mensajesRecientes = historialMensajes.slice(-5);
  let edadMencionada = null;
  const temasPrevios = [];
  const alimentosMencionados = [];
  const sintomasMencionados = [];
  
  mensajesRecientes.forEach(mensaje => {
    if (!mensaje.esBot) {
      const edad = extraerEdad(mensaje.texto);
      if (edad !== null) edadMencionada = edad;
      
      const alimentos = extraerAlimentos(mensaje.texto);
      alimentosMencionados.push(...alimentos);
      
      const sintomas = extraerSintomas(mensaje.texto);
      sintomasMencionados.push(...sintomas);
      
      // Detectar temas principales
      const texto = normalizar(mensaje.texto);
      if (texto.includes('lactancia') || texto.includes('pecho') || texto.includes('leche')) {
        temasPrevios.push('lactancia');
      }
      if (texto.includes('anemia') || texto.includes('hierro')) {
        temasPrevios.push('anemia');
      }
      if (texto.includes('alimentacion') || texto.includes('comida') || texto.includes('comer')) {
        temasPrevios.push('alimentacion');
      }
    }
  });
  
  return {
    edadMencionada: edadMencionada,
    temasPrevios: [...new Set(temasPrevios)],
    alimentosMencionados: [...new Set(alimentosMencionados)],
    sintomasMencionados: [...new Set(sintomasMencionados)],
    ultimoTema: temasPrevios[temasPrevios.length - 1] || null
  };
};

// ----------------- MEJORA DE COMPRENSIÓN DE LENGUAJE -----------------

// Diccionario de sinónimos y variaciones
const SINONIMOS = {
  'bebe': ['bebé', 'bebe', 'bebito', 'bebita', 'nene', 'nena', 'niño', 'niña', 'pequeño', 'pequeña'],
  'comer': ['comer', 'alimentar', 'dar de comer', 'dar comida', 'darle', 'ofrecer', 'dar'],
  'leche': ['leche', 'pecho', 'teta', 'lactancia', 'mama', 'mamá', 'biberon', 'biberón', 'mamar', 'lactar'],
  'anemia': ['anemia', 'anémico', 'anémica', 'falta de hierro', 'hierro bajo', 'hemoglobina baja'],
  'no come': ['no come', 'rechaza', 'no quiere comer', 'no acepta', 'rechaza comida', 'no come nada'],
  'no toma leche': ['no toma leche', 'rechaza leche', 'no quiere leche', 'no acepta leche', 'no toma pecho', 'rechaza pecho', 'no quiere pecho', 'no acepta pecho', 'no toma teta', 'rechaza teta', 'no quiere teta', 'no acepta teta', 'no quiere mamar', 'rechaza mamar', 'no acepta mamar', 'se niega a mamar', 'no quiere lactar', 'rechaza lactar', 'no acepta lactar'],
  'edad': ['meses', 'mes', 'año', 'años', 'edad', 'tiene', 'cumple']
};

// Expandir sinónimos en el mensaje
const expandirSinonimos = (texto) => {
  let textoExpandido = normalizar(texto);
  Object.entries(SINONIMOS).forEach(([palabra, sinonimos]) => {
    sinonimos.forEach(sinonimo => {
      if (textoExpandido.includes(sinonimo)) {
        textoExpandido += ' ' + palabra;
      }
    });
  });
  return textoExpandido;
};

// ----------------- EXTRACCIÓN DE ENTIDADES (NLP) -----------------

// Extraer edad del mensaje (tolerante a errores ortográficos)
const extraerEdad = (mensaje) => {
  const texto = normalizar(mensaje);
  // Patrones expandidos: "6 meses", "8 meses", "1 año", "12 meses", "dos años", etc.
  // Incluye variaciones comunes mal escritas
  const patrones = [
    /\b(\d+)\s*(mes|meses|mese|m)\b/,
    /\b(\d+)\s*(año|años|año|a|ano|anos)\b/,
    /\b(un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|cat|catorce|quince|dieciseis|diecisiete|dieciocho|diecinueve|veinte)\s*(mes|meses|mese|año|años|ano|anos)\b/,
    /\b(recien nacido|recién nacido|recien nacida|recién nacida|neonato|recien|recién)\b/,
    /\b(bebe de|bebé de|bebe|bebito|bebita|nino de|niño de|nina de|niña de|nino|nina)\s*(\d+)\s*(mes|meses|mese|año|años|ano|anos)\b/,
    // Patrones más flexibles para errores comunes
    /\b(\d+)\s*(mes|mese|meses)\b/i,
    /\b(\d+)\s*(año|ano|años|anos)\b/i
  ];
  
  for (const patron of patrones) {
    const match = texto.match(patron);
    if (match) {
      let numero = parseInt(match[1] || match[2] || "0");
      const unidad = match[2] || match[3] || "";
      
      // Convertir números en palabras
      if (isNaN(numero)) {
        const numerosPalabra = {
          "un": 1, "una": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5,
          "seis": 6, "siete": 7, "ocho": 8, "nueve": 9, "diez": 10,
          "once": 11, "doce": 12, "trece": 13, "catorce": 14, "quince": 15
        };
        numero = numerosPalabra[match[1]?.toLowerCase()] || 0;
      }
      
      if (unidad.includes("año") || unidad.includes("a")) {
        return numero * 12; // Convertir años a meses
      } else if (unidad.includes("mes") || unidad.includes("m")) {
        return numero;
      } else if (match[0].includes("recien") || match[0].includes("neonato")) {
        return 0;
      }
    }
  }
  
  return null;
};

// Extraer alimentos mencionados (tolerante a errores)
const extraerAlimentos = (mensaje) => {
  // Lista expandida con variaciones comunes mal escritas
  const alimentos = [
    "leche", "leche", "pecho", "teta", "lactancia", "formula", "biberon", "biberón",
    "arroz", "arros", "papa", "camote", "zanahoria", "zanahoria", "calabaza", "zapallo",
    "pollo", "poyo", "carne", "pescado", "pescado", "huevo", "higado", "hígado", "higado", "sangrecita", "sangrecita",
    "lentejas", "lentejas", "garbanzos", "quinua", "quinoa", "avena", "plátano", "platano", "banana",
    "manzana", "pera", "papaya", "naranja", "mandarina", "aguacate", "palta",
    "espinaca", "acelga", "brócoli", "brocoli", "yogur", "yogurt", "queso",
    "agua", "jugo", "miel", "azucar", "azúcar", "sal"
  ];
  
  const texto = normalizar(mensaje);
  const alimentosEncontrados = [];
  
  alimentos.forEach(alimento => {
    const alimentoNormalizado = normalizar(alimento);
    
    // Match exacto
    if (texto.includes(alimentoNormalizado)) {
      alimentosEncontrados.push(alimento);
      return;
    }
    
    // Match aproximado (tolerante a 1-2 errores)
    const tokensTexto = tokenizar(texto);
    tokensTexto.forEach(token => {
      const distancia = distanciaLevenshtein(token, alimentoNormalizado);
      const maxLen = Math.max(token.length, alimentoNormalizado.length);
      if (maxLen > 0 && distancia <= 2 && distancia / maxLen < 0.4) {
        alimentosEncontrados.push(alimento);
      }
    });
  });
  
  return [...new Set(alimentosEncontrados)];
};

// Extraer síntomas o problemas mencionados (tolerante a errores)
const extraerSintomas = (mensaje) => {
  // Lista expandida con variaciones comunes mal escritas
  const sintomas = [
    "anemia", "anemía", "anemio", "palido", "pálido", "palidez", "cansancio", "cansancio", "fatiga", "debilidad",
    "no come", "no kome", "rechaza", "rechasa", "vomita", "vomita", "diarrea", "diarrea", 
    "estrenimiento", "estreñimiento", "constipacion", "constipación",
    "fiebre", "fiebre", "tos", "mocos", "resfriado", "resfriado", "alergia", "alergia", 
    "ronchas", "urticaria", "atragantamiento", "ahogo", "dolor", "irritabilidad", "llanto", "somnolencia"
  ];
  
  const texto = normalizar(mensaje);
  const sintomasEncontrados = [];
  
  sintomas.forEach(sintoma => {
    const sintomaNormalizado = normalizar(sintoma);
    
    // Match exacto
    if (texto.includes(sintomaNormalizado)) {
      sintomasEncontrados.push(sintoma);
      return;
    }
    
    // Match aproximado (tolerante a errores)
    const tokensTexto = tokenizar(texto);
    tokensTexto.forEach(token => {
      const distancia = distanciaLevenshtein(token, sintomaNormalizado);
      const maxLen = Math.max(token.length, sintomaNormalizado.length);
      if (maxLen > 0 && distancia <= 2 && distancia / maxLen < 0.4) {
        sintomasEncontrados.push(sintoma);
      }
    });
  });
  
  return [...new Set(sintomasEncontrados)];
};

// Detectar intención del mensaje
const detectarIntencion = (mensaje) => {
  const texto = normalizar(mensaje);
  
  // Detectar problemas específicos primero (prioridad alta)
  if (/(no toma|rechaza|no quiere|no acepta).*(leche|pecho|teta|mamar|lactar)/.test(texto)) {
    return "problema_lactancia";
  }
  if (/(no come|rechaza|no quiere|no acepta).*(comida|alimento|solido)/.test(texto)) {
    return "problema_alimentacion";
  }
  
  const intenciones = {
    pregunta: /^(que|como|cuando|donde|por que|porque|cuanto|cuantos|cuantas|quien|cual|para que|por que motivo|que pasa|que hago|que debo)/,
    negacion: /^(no|nunca|tampoco|nada|ningun|ninguna|tampoco|ni)/,
    afirmacion: /^(si|claro|exacto|correcto|bueno|vale|ok|okey|entendido|perfecto)/,
    solicitud: /(puedo|puede|debo|deberia|necesito|quiero|deseo|me gustaria|ayudame|ayuda|recomiendame|dame|quiero saber)/,
    comparacion: /(vs|versus|o|o bien|mejor que|peor que|diferencia entre|comparar|entre|cuál es mejor)/,
    agradecimiento: /(gracias|muchas gracias|te agradezco|agradecido|agradecida)/,
    despedida: /(adios|chau|hasta luego|nos vemos|bye|hasta pronto)/
  };
  
  for (const [intencion, patron] of Object.entries(intenciones)) {
    if (patron.test(texto)) {
      return intencion;
    }
  }
  
  return "general";
};

// Detectar si es un seguimiento de conversación previa
const detectarSeguimiento = (mensaje, historial) => {
  const texto = normalizar(mensaje);
  const palabrasSeguimiento = ['y', 'tambien', 'ademas', 'otra', 'otro', 'mas', 'más', 'sigue', 'continua'];
  
  // Si el mensaje es muy corto o usa palabras de seguimiento
  if (texto.split(' ').length <= 3 || palabrasSeguimiento.some(p => texto.includes(p))) {
    return true;
  }
  
  // Si el último mensaje del bot mencionó algo y el usuario pregunta sobre eso
  if (historial.length > 0) {
    const ultimoBot = historial.filter(m => m.esBot).pop();
    if (ultimoBot) {
      const ultimoBotTexto = normalizar(ultimoBot.texto);
      // Si el mensaje actual menciona palabras del último mensaje del bot
      const palabrasComunes = texto.split(' ').filter(p => ultimoBotTexto.includes(p));
      if (palabrasComunes.length >= 2) {
        return true;
      }
    }
  }
  
  return false;
};

// ----------------- BASE DE CONOCIMIENTO -----------------

export const baseConocimiento = {
  // --------- SALUDOS / INICIO ---------
  saludo: {
    palabrasClave: [
      "hola", "holaa", "holaaa", "buenos dias", "buenas tardes", "buenas noches",
      "buen dia", "buenas", "hey", "holi", "holis", "que tal", "como estas",
      "saludos", "saludito", "buen inicio de semana", "feliz dia",
      "tengo una duda", "quiero preguntar", "consulta rapidita", "inicio", "empezar"
    ],
    respuesta: (contexto) => {
      // Si hay historial, es un saludo en medio de conversación
      if (contexto.historial && contexto.historial.length > 0) {
        return `Hola de nuevo 😊 ¿En qué más puedo ayudarte?`;
      }
      return `Hola 😊 Soy ANMI, tu Asistente Nutricional Materno Infantil.

Puedo ayudarte con lactancia, alimentación complementaria, prevención de anemia y cuidados del bebé de 0 a 2 años, basándome en las guías del MINSA y OMS.

¿En qué puedo ayudarte hoy? 💛`;
    },
    prioridad: 10
  },

  // --------- LACTANCIA MATERNA < 6 MESES ---------

  lactanciaExclusiva: {
    palabrasClave: [
      "lactancia exclusiva", "solo leche materna", "solo pecho",
      "dar solo teta", "hasta cuando lactancia exclusiva", "6 meses exclusiva",
      "antes de los 6 meses puede comer", "puede tomar otra cosa antes de los 6 meses",
      "dar agua antes de los 6 meses", "mate antes de los 6 meses",
      "puedo darle jugo", "puedo darle aguita", "aguita de anis", "aguita de manzanilla",
      "lactancia materna exclusiva", "leche materna exclusiva", "solo mama", "solo mamá"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `🍼 Hasta los 6 meses, solo leche materna a libre demanda. `;
      
      if (edad !== null && edad < 6) {
        respuesta += `Tu bebé de ${edad} ${edad === 1 ? 'mes' : 'meses'} aún no necesita nada más.\n\n`;
      } else {
        respuesta += `No necesita agua, tés ni otros alimentos.\n\n`;
      }
      
      respuesta += `La leche materna cubre todo: nutrientes, hidratación y defensas. `;
      respuesta += `Señales de que está bien: moja 6-8 pañales al día y aumenta de peso. `;
      respuesta += `No introduzcas sólidos antes de los 6 meses.`;
      
      return respuesta;
    },
    prioridad: 9
  },

  aguaAntesSeisMeses: {
    palabrasClave: [
      "agua antes de los 6 meses", "cuando empezar agua", "dar agua recien nacido",
      "agua a los 3 meses", "agua a los 4 meses", "sed bebe pequeno",
      "puede tomar agua con calor", "hidratacion menor de 6 meses"
    ],
    respuesta: [
      `💧 Si tu bebé toma solo pecho, antes de los 6 meses no necesita agua extra, ni con calor.  
La leche materna cubre la sed y darle otros líquidos puede desplazar la leche o aumentar riesgo de infecciones.`
    ]
  },

  contactoPielAPiel: {
    palabrasClave: [
      "piel con piel", "contacto piel a piel", "primera hora de vida",
      "hora de oro", "recién nacido pecho", "inicio temprano lactancia",
      "despues del parto piel a piel", "cesarea piel con piel"
    ],
    respuesta: [
      `🤱 El contacto piel a piel en la primera hora de vida ayuda a que el bebé se calme, mantenga el calor  
y encuentre el pecho más fácil. También favorece que la leche “baje” y refuerza el vínculo con la mamá.`
    ]
  },

  calostro: {
    palabrasClave: [
      "calostro", "primera leche", "leche amarilla espesa", "poca leche primeros dias",
      "leche amarilla del pecho", "colostro", "no tengo mucha leche al inicio"
    ],
    respuesta: [
      `✨ El calostro es la primera leche, espesa y amarillita. Aunque salga poquito, es suficiente  
y actúa como una “primera vacuna”: protege el intestino y ayuda a sacar el meconio. Es oro líquido para tu bebé.`
    ]
  },

  tecnicaAmamantamiento: {
    palabrasClave: [
      "como darle pecho", "agarre correcto", "dolor al amamantar", "pezon adolorido",
      "como se si agarra bien", "posicion para dar de lactar", "posición de lactancia",
      "bebe se atraganta al pecho", "se suelta a cada rato", "no se llena con el pecho"
    ],
    respuesta: [
      `🤱 Señales de buen agarre: boca bien abierta, más areola arriba que abajo, mentón pegado al pecho  
y succión lenta y profunda sin dolor. Puedes probar distintas posiciones hasta sentirte cómoda.`
    ]
  },

  rechazoLeche: {
    palabrasClave: [
      "no toma leche", "rechaza leche", "no quiere leche", "no acepta leche",
      "no toma pecho", "rechaza pecho", "no quiere pecho", "no acepta pecho",
      "no toma teta", "rechaza teta", "no quiere teta", "no acepta teta",
      "bebe no toma leche", "bebe rechaza leche", "bebe no quiere leche",
      "mi bebe no toma leche", "mi bebe rechaza leche", "mi bebe no quiere leche",
      "no quiere mamar", "rechaza mamar", "no acepta mamar", "se niega a mamar",
      "no quiere lactar", "rechaza lactar", "no acepta lactar",
      "se suelta del pecho", "no se agarra al pecho", "rechaza el pecho",
      "no quiere biberon", "rechaza biberon", "no acepta biberon"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `🍼 Si tu bebé rechaza la leche, puede ser por varias razones:\n\n`;
      
      if (edad !== null && edad < 6) {
        respuesta += `A los ${edad} ${edad === 1 ? 'mes' : 'meses'}, el rechazo puede deberse a:\n`;
        respuesta += `• Infección o malestar (fiebre, resfriado, cólicos)\n`;
        respuesta += `• Cambios en el sabor de la leche (alimentos, medicamentos, menstruación)\n`;
        respuesta += `• Dificultad para agarrar el pecho (frenillo, posición)\n`;
        respuesta += `• Distracciones o sobreestimulación\n\n`;
        respuesta += `Revisa si hay señales de enfermedad, prueba diferentes posiciones, `;
        respuesta += `ofrece en un ambiente tranquilo y consulta con un pediatra o consultor de lactancia si persiste.`;
      } else if (edad !== null && edad >= 6) {
        respuesta += `A los ${edad} ${edad === 1 ? 'mes' : 'meses'}, puede estar prefiriendo alimentos sólidos. `;
        respuesta += `Ofrece primero la leche cuando esté tranquilo y luego la comida. `;
        respuesta += `Si el rechazo es total y persiste varios días, consulta con el pediatra para descartar problemas de salud.`;
      } else {
        respuesta += `Posibles causas: enfermedad, cambios en el sabor de la leche, dificultades de agarre, `;
        respuesta += `distracciones o preferencia por sólidos (si tiene más de 6 meses).\n\n`;
        respuesta += `Revisa señales de enfermedad, prueba diferentes posiciones, ofrece en ambiente tranquilo. `;
        respuesta += `Si persiste, consulta con pediatra o consultor de lactancia.`;
      }
      
      return respuesta;
    },
    prioridad: 10
  },

  extraccionLeche: {
    palabrasClave: [
      "extraer leche", "sacarme leche", "como guardar leche materna", "congelar leche",
      "cuanto dura la leche", "como calentar leche materna", "bombita de leche",
      "leche extraida trabajo", "banco de leche casero"
    ],
    respuesta: [
      `🧊 Puedes extraer la leche con la mano o con sacaleches y guardarla en frascos limpios con tapa.  
En refri dura unos 3–4 días y en congeladora varios meses. Para usarla, descongela en la refri y entíbiala al baño maría.`
    ]
  },

  suplementoHierro4m: {
    palabrasClave: [
      "hierro en gotas", "a que edad se da hierro", "gotas de sulfato ferroso",
      "chispitas no, gotas", "suplemento de hierro 4 meses", "prevencion de anemia gotas",
      "suplemento hierro", "gotas hierro", "cuando dar hierro", "hierro gotas",
      "sulfato ferroso", "prevencion anemia", "suplementacion hierro"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `🩸 El MINSA recomienda suplementación preventiva con hierro desde los 4 meses, `;
      respuesta += `incluso con lactancia exclusiva.\n\n`;
      
      if (edad !== null) {
        if (edad < 4) {
          respuesta += `Tu bebé tiene ${edad} ${edad === 1 ? 'mes' : 'meses'}. `;
          respuesta += `Aún no es momento. El pediatra evaluará a partir de los 4 meses.\n\n`;
        } else if (edad >= 4) {
          respuesta += `Tu bebé tiene ${edad} ${edad === 1 ? 'mes' : 'meses'}. `;
          respuesta += `Ya debería recibir suplemento según indicación médica.\n\n`;
        }
      }
      
      respuesta += `Tipo: Sulfato ferroso en gotas (no "chispitas"). `;
      respuesta += `La dosis la indica el pediatra (generalmente 1-2 mg/kg/día).\n\n`;
      
      respuesta += `Cuándo darlo: Entre comidas o con jugo de naranja (mejor absorción). `;
      respuesta += `Evita con leche (disminuye absorción).\n\n`;
      
      respuesta += `Efectos normales: Heces oscuras (normal). `;
      respuesta += `Si hay estreñimiento, consulta al pediatra.\n\n`;
      
      respuesta += `⚠️ La suplementación complementa, no reemplaza una alimentación rica en hierro.`;
      
      return respuesta;
    },
    prioridad: 9,
    edadRelevante: (edad) => edad >= 3 && edad <= 24
  },

  // --------- LACTANCIA 6–24 MESES ---------

  lactanciaProlongada: {
    palabrasClave: [
      "hasta cuando dar pecho", "hasta que edad lactar", "lactancia 2 años",
      "seguir dando teta despues del año", "lactancia prolongada", "pecho y comida",
      "mi hijo grande sigue tomando pecho", "quieren que destete"
    ],
    respuesta: [
      `👶 La leche materna sigue siendo muy valiosa después de los 6 meses y hasta los 2 años o más.  
Aporta energía, defensas y consuelo. Puedes continuar mientras tú y tu bebé lo deseen.`
    ]
  },

  desteteSuave: {
    palabrasClave: [
      "como dejar el pecho", "destete", "quitar la teta", "dejar de amamantar",
      "destete respetuoso", "destetar sin trauma", "mi bebe se pega mucho al pecho"
    ],
    respuesta: [
      `🌙 Para un destete más suave, ve retirando tomas de a poco, empezando por las menos importantes.  
Ofrece agua, alimento, juego y mucho cariño extra, evitando engaños o castigos.`
    ]
  },

  // --------- ANEMIA / HIERRO ---------

  anemia: {
    palabrasClave: [
      "anemia", "anemico", "anemia infantil", "anemia en bebes", "anemia en ninos",
      "baja hemoglobina", "hemoglobina baja", "hemoglobina en 10", "hemoglobina en 9",
      "hemograma bajo", "ferritina baja", "globulos rojos bajos", "sangre baja",
      "deficiencia de hierro", "deficit de hierro", "hierro bajo", "falta de hierro",
      "anemia ferropenica", "palido", "bebe palido", "nino palido", "labios palidos",
      "sin energia", "falta de energia", "cansancio", "somnolencia", "irritabilidad",
      "no quiere comer", "poco apetito", "decaimiento", "ojeras", "reserva de hierro agotada",
      "sospecha de anemia", "signos de anemia", "sintomas de anemia", "hemoglobina"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `🩸 La anemia por falta de hierro es común entre 6-24 meses. `;
      respuesta += `Signos: palidez, cansancio, poco apetito.\n\n`;
      
      if (edad !== null && edad >= 6 && edad <= 24) {
        respuesta += `Para tu bebé de ${edad} ${edad === 1 ? 'mes' : 'meses'}: `;
        respuesta += `ofrece hierro diariamente y continúa el suplemento según indicación médica.\n\n`;
      }
      
      respuesta += `Alimentos ricos en hierro:\n`;
      respuesta += `• Sangrecita, hígado, bazo (mejor absorción)\n`;
      respuesta += `• Carne, pollo, pescado, cuy\n`;
      respuesta += `• Menestras, quinua, yema de huevo\n\n`;
      
      respuesta += `Mejora la absorción:\n`;
      respuesta += `Combina con vitamina C (naranja, tomate) y evita té/café cerca de las comidas.\n\n`;
      
      respuesta += `⚠️ Si sospechas anemia, consulta al pediatra para diagnóstico y tratamiento adecuado.`;
      
      return respuesta;
    },
    prioridad: 9
  },

  alimentosHierro: {
    palabrasClave: [
      "alimentos ricos en hierro", "que tiene hierro", "comidas con hierro",
      "hierro hemo", "hierro no hemo", "sangrecita", "higado", "bazo", "bofe",
      "carne roja", "cuy", "menestras", "lentejas", "garbanzos", "pallar",
      "espinaca", "acelga", "quinua", "yema de huevo", "pescado azul",
      "fuentes de hierro", "que dar para hierro", "subir hierro rapido", "menu para anemia",
      "comidas hierro", "alimentos con hierro", "que comer para anemia"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `🍖 Mejores fuentes de hierro:\n\n`;
      
      respuesta += `Hierro hemo (mejor absorción):\n`;
      respuesta += `• Sangrecita, hígado, bazo, bofe\n`;
      respuesta += `• Carne, pollo, pescado, cuy\n\n`;
      
      respuesta += `Hierro no hemo:\n`;
      respuesta += `• Menestras (lentejas, garbanzos), quinua, yema de huevo\n\n`;
      
      if (edad !== null && edad >= 6) {
        respuesta += `Para ${edad} ${edad === 1 ? 'mes' : 'meses'}: `;
        if (edad < 12) {
          respuesta += `ofrece hierro 2-3 veces por semana en purés suaves.\n\n`;
        } else {
          respuesta += `incluye hierro diariamente en trozos pequeños.\n\n`;
        }
      }
      
      respuesta += `💡 Mejora la absorción:\n`;
      respuesta += `Combina con vitamina C (naranja, tomate) y evita té/café 1 hora después de comer.`;
      
      return respuesta;
    },
    prioridad: 8
  },

  recetasHierro: {
    palabrasClave: [
      "recetas hierro", "ideas hierro", "menu hierro", "sangrecita receta",
      "papilla carne", "pure lentejas", "hamburguesa lentejas", "preparaciones hierro",
      "como incluir sangrecita", "recetas para anemia"
    ],
    respuesta: [
      `👩‍🍳 Algunas ideas:  
• Puré de papa o zapallo con sangrecita bien cocida.  
• Lentejas suaves con arroz y zanahoria.  
• Carne molida con verduras picadas y arroz o camote.  
Siempre acompañar con fruta cítrica para mejorar la absorción. 🍊`
    ]
  },

  // --------- TIPOS DE ALIMENTOS ---------

  alimentosNaturales: {
    palabrasClave: [
      "alimentos naturales", "comida natural", "comida casera", "hecho en casa",
      "procesados vs naturales", "que es alimento natural", "comida de verdad"
    ],
    respuesta: [
      `🥦 Alimentos naturales son los que casi no han sido modificados: frutas, verduras, menestras,  
tubérculos, granos, huevos, carnes, leche. Son la base ideal de la alimentación del bebé y de la familia.`
    ]
  },

  alimentosProcesadosUltra: {
    palabrasClave: [
      "ultraprocesados", "chatarra para bebes", "galletas para bebe", "juguitos en caja",
      "salchicha bebe", "embutidos bebe", "snacks empaquetados", "comida chatarra",
      "cereal azucarado", "yogur azucarado", "gomitas", "chizitos", "comida rapida"
    ],
    respuesta: [
      `🚫 Para bebés y niños pequeños es mejor evitar galletas dulces, jugos en caja, gaseosas, embutidos,  
snacks, yogures muy azucarados y comida rápida. Llénale el plato con comida casera sencilla y natural.`
    ]
  },

  alimentosNoRecomendados: {
    palabrasClave: [
      "evitar alimentos", "no recomendados", "prohibidos bebe", "miel", "sal", "azucar",
      "frutos secos enteros", "pescado crudo", "huevo crudo", "leche de vaca entera",
      "espinaca nitratos", "miel botulismo", "que no dar", "no debo darle"
    ],
    respuesta: [
      `🚫 Antes del año evita miel, frutos secos enteros, sal añadida, azúcar, pescados y huevos crudos  
y bebidas azucaradas. También cuidado con alimentos muy duros o redondos que puedan atragantar.`
    ]
  },

  // --------- ALIMENTACIÓN COMPLEMENTARIA ---------

  alimentacionComplementaria: {
    palabrasClave: [
      "alimentacion complementaria", "empezar solidos", "cuando iniciar solidos",
      "blw", "baby led weaning", "papillas", "pures", "comida solida",
      "introduccion de alimentos", "6 meses", "señales de preparacion",
      "mi bebe ya se sienta", "que darle cuando cumple 6 meses", "iniciar alimentos",
      "comenzar con comida", "empezar a comer", "primera comida"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `👶 Inicia alrededor de los 6 meses cuando el bebé: `;
      respuesta += `se sienta con apoyo, sostiene la cabeza, muestra interés por la comida y abre la boca.\n\n`;
      
      if (edad !== null) {
        if (edad < 6) {
          respuesta += `Tu bebé tiene ${edad} ${edad === 1 ? 'mes' : 'meses'}. `;
          respuesta += `Aún es muy pequeño, continúa con lactancia exclusiva.\n\n`;
        } else if (edad >= 6 && edad < 7) {
          respuesta += `Tu bebé tiene ${edad} meses. `;
          respuesta += `Es momento de iniciar si muestra las señales de estar listo.\n\n`;
        } else if (edad >= 7 && edad <= 12) {
          respuesta += `Tu bebé tiene ${edad} meses. `;
          respuesta += `Ya debería estar recibiendo alimentos complementarios.\n\n`;
        }
      }
      
      respuesta += `Principios:\n`;
      respuesta += `• La leche materna sigue siendo principal (ofrecer a demanda)\n`;
      respuesta += `• Ofrecer sin forzar, respetar hambre y saciedad\n`;
      respuesta += `• Priorizar alimentos ricos en hierro\n`;
      respuesta += `• Texturas apropiadas según la edad\n\n`;
      
      respuesta += `Para empezar (6-7 meses):\n`;
      respuesta += `Purés de papa, camote, plátano, lentejas o hígado. `;
      respuesta += `Puedes usar purés tradicionales, BLW o combinado.`;
      
      return respuesta;
    },
    prioridad: 9,
    edadRelevante: (edad) => edad >= 5 && edad <= 12
  },

  texturasPorEdad: {
    palabrasClave: [
      "texturas por edad", "como debe ser la comida", "papilla espesa",
      "comida licuada o machacada", "cuando dejar la licuadora", "trozos blandos",
      "consistencia de alimentos", "textura 6 meses", "textura 8 meses", "textura 1 año",
      "que textura", "como debe estar la comida", "consistencia"
    ],
    respuesta: (contexto) => {
      const edad = contexto.edad;
      let respuesta = `🍽️ Texturas por edad:\n\n`;
      
      if (edad !== null) {
        if (edad < 6) {
          respuesta += `Aún muy pequeño. Solo leche materna exclusiva.\n\n`;
        } else if (edad >= 6 && edad < 8) {
          respuesta += `6-8 meses: Purés espesos, papillas, comida machacada. `;
          respuesta += `Evita licuadora (hace muy líquido).\n\n`;
        } else if (edad >= 8 && edad < 10) {
          respuesta += `8-10 meses: Trozos blandos (bastones), comida machacada con tenedor. `;
          respuesta += `Puede agarrar con las manos.\n\n`;
        } else if (edad >= 10 && edad < 12) {
          respuesta += `10-12 meses: Trozos pequeños y suaves. `;
          respuesta += `Comida de la familia adaptada (sin sal, picada pequeña).\n\n`;
        } else if (edad >= 12 && edad <= 24) {
          respuesta += `12-24 meses: Comida de la familia en trozos seguros. `;
          respuesta += `Mayor autonomía al comer.\n\n`;
        }
      } else {
        respuesta += `6-8 meses: Purés espesos, papillas\n`;
        respuesta += `8-10 meses: Trozos blandos (bastones)\n`;
        respuesta += `10-12 meses: Trozos pequeños y suaves\n`;
        respuesta += `12-24 meses: Comida de la familia\n\n`;
      }
      
      respuesta += `⚠️ Prevención atragantamiento:\n`;
      respuesta += `Evita uvas enteras, frutos secos enteros, salchichas en rodajas. `;
      respuesta += `Corta en trozos seguros y supervisa siempre.`;
      
      return respuesta;
    },
    prioridad: 8,
    edadRelevante: (edad) => edad >= 6 && edad <= 24
  },

  horariosComidas: {
    palabrasClave: [
      "horarios de comidas", "frecuencia", "cuantas comidas", "cada cuanto come",
      "horario alimentacion", "rutina comidas", "cuando darle", "cuantas veces al dia",
      "comidas y snacks", "merienda cuantas veces"
    ],
    respuesta: [
      `⏰ En general:  
6–8 meses: 2–3 comidas + leche.  
9–11 meses: 3 comidas + 1–2 snacks + leche.  
12 meses+: 3 comidas + 2 snacks + leche.  
Lo clave es respetar hambre y saciedad y evitar picar todo el día.`
    ]
  },

  ideasMenus: {
    palabrasClave: [
      "ideas de menus", "menu por edad", "ejemplo menu", "que darle de comer",
      "combinaciones", "comidas por textura", "ideas recetas", "que cocinarle"
    ],
    respuesta: [
      `🍽️ Ejemplos sencillos:  
• Desayuno: avena con plátano.  
• Almuerzo: arroz suave con lentejas y zanahoria.  
• Cena: puré de papa o camote con pollo o pescado.  
Adáptalo según lo que tengas y lo que tolere tu bebé.`
    ]
  },

  snacksSaludables: {
    palabrasClave: [
      "snacks", "colaciones", "entre comidas", "bocaditos", "merienda",
      "que darle entre comidas", "snacks saludables", "refrigerios", "lonchera bebe"
    ],
    respuesta: [
      `🍌 Snacks simples: plátano maduro, fruta cocida, zanahoria bien cocida, pepino pelado,  
aguacate, pan simple o yogur natural sin azúcar. Mejor evitar ultraprocesados y jugos azucarados.`
    ]
  },

  // --------- CONDUCTA ALIMENTARIA / ALIMENTACIÓN RESPONSIVA ---------

  rechazoComida: {
    palabrasClave: [
      "no quiere comer", "rechazo de alimentos", "rechaza comida", "no come",
      "no acepta", "cierra la boca", "escupe", "tira la comida", "no le gusta nada",
      "solo quiere leche", "no prueba", "dificil de alimentar", "come poco", "inapetente"
    ],
    respuesta: [
      `🍽️ Es normal que a veces rechacen comida.  
Ofrece sin obligar, permite que juegue un poco con la comida, cambia texturas y come con él/ella.  
Si casi no come y baja de peso, coméntalo con su pediatra.`
    ]
  },

  soloQuiereLeche: {
    palabrasClave: [
      "solo quiere leche", "rechaza solidos", "no acepta comida", "puro pecho",
      "solo teta", "solo biberon", "no come solo toma", "no quiere solidos"
    ],
    respuesta: [
      `🍼 Al inicio es común que prefiera la leche.  
Ofrece primero la comida cuando esté despierto y tranquilo y la leche después.  
Deja que explore; si pasa el tiempo y sigue rechazando casi todo, consulta con el pediatra.`
    ]
  },

  mejorarApetito: {
    palabrasClave: [
      "aumentar apetito", "que le abra el hambre", "come poco", "estimular apetito",
      "mas calorias", "denso nutricionalmente", "que engorde", "subir peso sin forzar"
    ],
    respuesta: [
      `🍽️ No hay comida mágica, pero puedes hacer las preparaciones más nutritivas:  
añade aguacate, aceite de oliva, yema de huevo o un poco de queso rallado.  
Ofrece porciones pequeñas más frecuentes y evita llenarlo con líquidos antes de comer.`
    ]
  },

  senalesHambreSaciedad: {
    palabrasClave: [
      "senales de hambre", "como saber si tiene hambre", "saciedad", "ya no quiere",
      "señales bebe", "cuando parar de dar", "esta satisfecho", "comer a demanda"
    ],
    respuesta: [
      `👶 Hambre: busca la comida, se inclina hacia el plato, abre la boca.  
Saciedad: cierra la boca, gira la cabeza, empuja la cuchara o se distrae.  
Respetar estas señales ayuda a que aprenda a regularse solo.`
    ]
  },

  consistenciaCuidadores: {
    palabrasClave: [
      "abuelos dan dulces", "cuidadores diferentes", "familia opina", "cada quien hace distinto",
      "conflicto crianza", "no respetan indicaciones", "todos opinan de la comida"
    ],
    respuesta: [
      `👨‍👩‍👧 Cuando varias personas lo cuidan, sirve acordar reglas simples:  
por ejemplo, sin azúcar antes del año, nada de jugos en caja y priorizar comida casera.  
Hablarlo con calma ayuda a que todos remen para el mismo lado.`
    ]
  },

  apoyoEmocional: {
    palabrasClave: [
      "cansada", "agotada", "estresada", "no puedo mas", "me siento mal",
      "ansiosa", "abrumada", "culpa", "mala madre", "mal padre", "agobiado",
      "no duermo", "exhausta", "no doy mas", "sobrepasada"
    ],
    respuesta: [
      `💚 Cuidar a un bebé es hermoso, pero también muy cansado.  
Sentirte agotada o desbordada no te hace mala madre/padre.  
Pedir ayuda, dormir cuando se pueda y hablar de lo que sientes también es cuidar.`
    ]
  },

  // --------- TEMAS DE SEGURIDAD ---------

  cortarAlimentos: {
    palabrasClave: [
      "como cortar", "formas seguras", "corte de alimentos", "tamano", "bastones",
      "evitar atragantamiento", "que tamano", "prevenir ahogo", "como cortar uvas",
      "cortar salchicha"
    ],
    respuesta: [
      `✂️ De 6–9 meses ofrece bastones blandos que pueda agarrar con la mano.  
Luego, trocitos pequeños y suaves. Evita uvas enteras, frutos secos enteros, salchichas en rodajas gruesas  
y trozos muy duros de zanahoria o manzana.`
    ]
  },

  atragantamientoArcadas: {
    palabrasClave: [
      "atragantamiento", "arcadas", "se ahoga", "reflejo nausea", "gag reflex",
      "diferencia arcadas", "tose", "se pone rojo", "se atora con la comida"
    ],
    respuesta: [
      `😮 Si tose y hace ruido, suelen ser arcadas normales y está protegiéndose.  
Atragantamiento grave es cuando no puede toser ni llorar y se pone morado: eso es urgencia.  
Ante una situación así, hay que acudir de inmediato a un servicio de emergencia.`
    ]
  },

  preparacionSegura: {
    palabrasClave: [
      "preparacion segura", "higiene de alimentos", "manipulacion",
      "almacenamiento", "descongelar", "recalentar", "lavado de manos",
      "intoxicacion", "comida guardada bebe"
    ],
    respuesta: [
      `🍲 Lava tus manos y los alimentos, cocina bien carnes y huevos y refrigera lo que sobre antes de 2 horas.  
Cuando recalentas, que quede bien caliente, y no vuelvas a guardar lo que el bebé ya probó.`
    ]
  },

  almacenamientoComida: {
    palabrasClave: [
      "congelar", "recalentar", "almacenar", "guardar comida", "cuanto dura",
      "como conservar", "meal prep", "preparar comida para varios dias",
      "pure congelado"
    ],
    respuesta: [
      `🧊 La comida cocida puede durar 2–3 días en refri bien tapada.  
En congelador, unos 2–3 meses en recipientes cerrados. Descongela en la refri o microondas  
y recalienta solo una vez hasta que esté bien caliente.`
    ]
  },

  // --------- LACTANCIA / SUPLEMENTOS ---------

  lactanciaMixta: {
    palabrasClave: [
      "lactancia mixta", "pecho y formula", "combinar leche", "leche materna y formula",
      "complementar con formula", "dar pecho y biberon", "mixta"
    ],
    respuesta: [
      `🍼 En lactancia mixta suele ayudarnos ofrecer primero el pecho y luego la fórmula si hace falta.  
Haz los cambios de forma gradual y revisa con el pediatra qué tipo de fórmula y cantidades son mejores.`
    ]
  },

  lactanciaVitaminas: {
    palabrasClave: [
      "lactar", "lactancia", "vitaminas", "vitamina d", "suplementos", "hierro gotas",
      "multivitaminico", "calcio", "omega 3", "galactagogos", "sube la leche",
      "baja la leche", "leche materna poca", "no tengo leche"
    ],
    respuesta: [
      `🍼 A veces se indica vitamina D o hierro según el caso; eso lo define el profesional de salud.  
Comer variado, tomar líquidos y descansar en lo posible ayuda a mantener la producción de leche.  
No hay alimentos “mágicos”, pero sí buenos hábitos.`
    ]
  },

  // --------- HIDRATACIÓN / AGUA ---------

  aguaHidratacion: {
    palabrasClave: [
      "agua", "hidratacion", "cuanta agua", "vasito", "taza", "sed", "cuando dar agua",
      "agua despues de los 6 meses", "no quiere tomar agua"
    ],
    respuesta: [
      `💧 Desde los 6 meses puedes ofrecer pequeños sorbos de agua en vasito junto con las comidas.  
No hacen falta jugos ni gaseosas; el agua es la mejor bebida. Si toma mucho pecho, puede pedir poca agua.`
    ]
  },

  // --------- ALERGIAS / ESTREÑIMIENTO / ENFERMEDAD ---------

  alergias: {
    palabrasClave: [
      "alergia", "alergenos", "introduccion alergenos", "huevo", "mani", "cacahuate",
      "pescado", "lactosa", "gluten", "urticaria", "erupcion", "como introducir",
      "miedo a la alergia"
    ],
    respuesta: [
      `🌰 Hoy se recomienda introducir huevo, maní, pescado y otros alergenos desde el inicio de la alimentación  
complementaria, de a poco y uno por vez. Si hay ronchas leves, suspende y consulta;  
si hay dificultad para respirar o hinchazón de cara/labios, es urgencia.`
    ]
  },

  alergiaLeve: {
    palabrasClave: [
      "alergia leve", "reaccion alergica", "ronchas", "urticaria",
      "erupcion", "sarpullido", "alergia grave", "diferencia alergia"
    ],
    respuesta: [
      `🌰 Si aparecen ronchas leves tras un alimento nuevo, deja de ofrecerlo y coméntalo con el pediatra.  
Si se hinchan labios o cara o le cuesta respirar, acude de inmediato a emergencia.`
    ]
  },

  estrenimientoRelacionado: {
    palabrasClave: [
      "estrenimiento frecuente", "heces muy duras", "constipacion", "hace mucha fuerza",
      "popo con dolor", "sangra al hacer", "no hace hace varios dias"
    ],
    respuesta: [
      `🍐 Para heces duras ayuda ofrecer más agua, frutas con fibra (papaya, pera, ciruela), verduras cocidas y avena.  
Si hay mucho dolor, sangrado o varios días sin evacuar, es importante consultarlo con el pediatra.`
    ]
  },

  bebeEnfermo: {
    palabrasClave: [
      "bebe enfermo", "come menos enfermo", "resfriado", "gripe", "esta resfriado",
      "con tos", "mocos", "enfermo no come", "inapetente por enfermedad", "fiebre y comida"
    ],
    respuesta: [
      `🤧 Cuando está resfriado suele comer menos.  
Prioriza líquidos (leche, agua, caldos), comidas suaves y porciones pequeñas y frecuentes.  
Si hay fiebre alta, dificultad para respirar o rechazo total de líquidos, ve a un servicio de salud.`
    ]
  },

  mitosFrecuentes: {
    palabrasClave: [
      "mitos alimentacion", "creencias falsas", "verdades", "mentiras",
      "mitos comunes", "falsos mitos", "errores comunes", "mitos bebe",
      "dicen que el huevo hace daño", "dicen que el azucar abre el apetito"
    ],
    respuesta: [
      `🔍 Algunos mitos:  
• No necesitan sal ni azúcar para aceptar la comida.  
• El huevo bien cocido se puede dar desde los 6 meses.  
• El té puede bajar la absorción de hierro y no se recomienda de rutina.`
    ]
  },

  // --------- UTENSILIOS / AUTONOMÍA ---------

  utensilios: {
    palabrasClave: [
      "vasito", "cucharita", "como ensenar", "uso de cubiertos", "vaso abierto",
      "transicion vaso", "biberon", "cuando usar cuchara", "blw utensilios",
      "cuando dejar el biberon"
    ],
    respuesta: [
      `🥄 Desde que inicia sólidos puede usar vasito y cucharita con ayuda.  
Al inicio es más juego que comida, pero poco a poco irá comiendo más solo.  
La transición del biberón al vaso suele hacerse alrededor del año, de forma gradual.`
    ]
  },

  blwVsPures: {
    palabrasClave: [
      "blw vs pures", "blw o papillas", "metodo blw", "autoalimentacion",
      "que es mejor", "papillas o blw", "combinacion de metodos"
    ],
    respuesta: [
      `🍽️ BLW (trozos) y purés son opciones válidas.  
Lo importante es que sea seguro, se avancen texturas y se respeten las señales del bebé.  
Puedes usar uno solo o combinarlos según lo que funcione mejor para ustedes.`
    ]
  },

  // --------- PESO / CRECIMIENTO ---------

  bajopeso: {
    palabrasClave: [
      "bajo peso", "no sube de peso", "crece lento", "crecimiento lento",
      "esta flaco", "muy delgado", "preocupa su peso", "pesa poco",
      "percentil bajo", "esta en percentil 3"
    ],
    respuesta: [
      `📊 Algunos bebés son naturalmente más delgados, pero si no gana peso o lo pierde hay que revisarlo.  
Puedes sumar calorías con aguacate, yema de huevo, aceite de oliva y comidas más frecuentes.  
El pediatra es quien debe evaluar con la curva de crecimiento.`
    ]
  }
};

// ----------------- SALIDAS ESPECIALES -----------------

export const salidasEmergencia = {
  medica: `⚠️ Esta consulta necesita atención médica directa. Contacta al pediatra o acude a tu centro de salud. Si hay dificultad para respirar, fiebre muy alta o decaimiento extremo, ve a emergencia de inmediato.`,

  dieta: `🍽️ No puedo dar dietas personalizadas con cantidades exactas. Cada bebé es distinto. Para un plan detallado, consulta con pediatra o nutricionista infantil.`,

  noEncontrada: `No entendí bien la consulta. 😔 Puedo ayudarte con lactancia, anemia, alimentación complementaria, texturas y seguridad al comer (0-2 años).`
};

// ----------------- DETECTORES DE EMERGENCIA Y DIETA -----------------

export const detectarEmergenciaMedica = (mensaje) => {
  const palabrasEmergencia = [
    "enfermo", "vomita", "vomito", "diarrea con sangre", "fiebre alta", "temperatura alta",
    "urgencia", "emergencia", "hospital", "dolor fuerte", "dolor abdominal", "sangra", "sangrado",
    "alergia grave", "reaccion grave", "convulsiona", "convulsion", "dificultad para respirar",
    "respira mal", "no responde", "muy somnoliento", "deshidratacion", "no orina",
    "letargo", "decaimiento severo", "labios morados", "rechazo absoluto de liquidos",
    "signos de deshidratacion", "se desmaya", "inconsciente", "no despierta"
  ];
  const fiebreAlta = /\b(38(\.|,)?5|39|40|41)(?:\s*°?\s*c| c| grados)?\b/i;
  const txtNormalizado = normalizar(mensaje);
  return palabrasEmergencia.some(p => txtNormalizado.includes(normalizar(p))) || fiebreAlta.test(mensaje);
};

export const detectarSolicitudDieta = (mensaje) => {
  const palabrasDieta = [
    "cuanto darle", "cantidad exacta", "porcion", "gramos", "racion",
    "menu para", "menu diario", "menu semanal", "plan de alimentacion",
    "dieta para", "calorias", "medida exacta", "cuanto debe comer", "ml exactos", "gramaje",
    "cuantos gramos", "cuantas cucharadas exactas"
  ];
  const txtNormalizado = normalizar(mensaje);
  return palabrasDieta.some(p => txtNormalizado.includes(normalizar(p)));
};

// ----------------- SISTEMA AVANZADO DE BÚSQUEDA Y SCORING -----------------

// Calcular distancia de Levenshtein (para errores ortográficos)
const distanciaLevenshtein = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // eliminación
          dp[i][j - 1] + 1,     // inserción
          dp[i - 1][j - 1] + 1  // sustitución
        );
      }
    }
  }
  
  return dp[m][n];
};

// Calcular similitud entre dos textos (Jaccard + Levenshtein mejorado)
const calcularSimilitud = (texto1, texto2) => {
  const tokens1 = new Set(tokenizar(texto1));
  const tokens2 = new Set(tokenizar(texto2));
  
  // Intersección exacta
  const interseccion = new Set([...tokens1].filter(x => tokens2.has(x)));
  // Unión
  const union = new Set([...tokens1, ...tokens2]);
  
  // Coeficiente de Jaccard
  const jaccard = union.size > 0 ? interseccion.size / union.size : 0;
  
  // Bonus por similitud aproximada (tolerante a errores)
  let bonus = 0;
  tokens1.forEach(t1 => {
    tokens2.forEach(t2 => {
      // Match exacto
      if (t1 === t2) {
        bonus += 0.2;
      } else {
        // Match por substring (palabras parciales)
        if (t1.includes(t2) || t2.includes(t1)) {
          bonus += 0.1;
        }
        // Match por distancia de Levenshtein (errores ortográficos)
        const distancia = distanciaLevenshtein(t1, t2);
        const maxLen = Math.max(t1.length, t2.length);
        if (maxLen > 0 && distancia <= 2 && distancia / maxLen < 0.4) {
          bonus += 0.15 * (1 - distancia / maxLen);
        }
      }
    });
  });
  
  return Math.min(1, jaccard + bonus);
};

// Búsqueda exacta mejorada con scoring (tolerante a errores)
const buscarExacto = (mensajeNormalizado, contexto) => {
  const resultados = [];
  
  // Detectar intención específica primero para priorizar
  const esProblemaLactancia = contexto.intencion === "problema_lactancia" || 
                               /(no toma|rechaza|no quiere|no acepta).*(leche|pecho|teta|mamar|lactar)/.test(mensajeNormalizado);
  const esProblemaAlimentacion = contexto.intencion === "problema_alimentacion" || 
                                  /(no come|rechaza|no quiere|no acepta).*(comida|alimento|solido)/.test(mensajeNormalizado);
  
  for (const [clave, datos] of Object.entries(baseConocimiento)) {
    let score = 0;
    let matches = 0;
    
    // Bonus por prioridad del tema
    if (esProblemaLactancia && clave === 'rechazoLeche') {
      score += 50; // Prioridad máxima para casos específicos
    }
    if (esProblemaAlimentacion && (clave === 'rechazoComida' || clave === 'soloQuiereLeche')) {
      score += 50;
    }
    
    datos.palabrasClave.forEach(palabra => {
      const palabraNormalizada = normalizar(palabra);
      
      // Match exacto
      if (mensajeNormalizado.includes(palabraNormalizada)) {
        score += 10;
        matches++;
      }
      
      // Match parcial (substring) - más tolerante
      if (mensajeNormalizado.includes(palabraNormalizada) || 
          palabraNormalizada.includes(mensajeNormalizado.substring(0, Math.min(10, mensajeNormalizado.length)))) {
        score += 5;
      }
      
      // Similitud con tolerancia a errores ortográficos
      const similitud = calcularSimilitud(mensajeNormalizado, palabraNormalizada);
      score += similitud * 5; // Aumentado para dar más peso a similitudes aproximadas
      
      // Bonus por match aproximado de palabras individuales (tolerante a errores)
      const tokensMensaje = tokenizar(mensajeNormalizado);
      const tokensPalabra = tokenizar(palabraNormalizada);
      
      tokensMensaje.forEach(tokenMsg => {
        tokensPalabra.forEach(tokenPal => {
          // Match exacto
          if (tokenMsg === tokenPal) {
            score += 3;
          } else {
            // Match aproximado (errores ortográficos)
            const distancia = distanciaLevenshtein(tokenMsg, tokenPal);
            const maxLen = Math.max(tokenMsg.length, tokenPal.length);
            if (maxLen > 0 && distancia <= 2 && distancia / maxLen < 0.5) {
              score += 2 * (1 - distancia / maxLen);
            }
            // Match por substring
            if (tokenMsg.includes(tokenPal) || tokenPal.includes(tokenMsg)) {
              score += 1.5;
            }
          }
        });
      });
    });
    
    // Bonus por prioridad (default 5 si no tiene)
    const prioridad = datos.prioridad || 5;
    score += prioridad;
    
    // Bonus por contexto (edad, síntomas, alimentos)
    if (contexto.edad !== null && datos.edadRelevante) {
      const relevante = datos.edadRelevante(contexto.edad);
      if (relevante) score += 5;
    } else if (contexto.edad !== null) {
      // Bonus general si hay edad mencionada
      score += 2;
    }
    
    if (score > 0) {
      resultados.push({ clave, datos, score, matches });
    }
  }
  
  // Ordenar por score
  resultados.sort((a, b) => b.score - a.score);
  
  if (resultados.length > 0 && resultados[0].score >= 8) {
    const mejor = resultados[0];
    let texto;
    
    if (typeof mejor.datos.respuesta === 'function') {
      texto = mejor.datos.respuesta(contexto);
    } else if (Array.isArray(mejor.datos.respuesta)) {
      texto = pick(mejor.datos.respuesta);
    } else {
      texto = mejor.datos.respuesta;
    }
    
    return { texto, esEmergencia: false, score: mejor.score };
  }
  
  return null;
};

// Búsqueda aproximada mejorada con múltiples algoritmos (tolerante a errores)
const buscarAproximado = (mensajeNormalizado, contexto) => {
  const tokensMensaje = new Set(tokenizar(mensajeNormalizado));
  const resultados = [];
  
  for (const [clave, datos] of Object.entries(baseConocimiento)) {
    let scoreTotal = 0;
    let matchesTokens = 0;
    let matchesPalabras = 0;
    
    // Algoritmo 1: Matching por tokens (exacto y aproximado)
    datos.palabrasClave.forEach(p => {
      const tokensPalabra = new Set(tokenizar(p));
      const interseccion = new Set([...tokensMensaje].filter(x => tokensPalabra.has(x)));
      
      if (interseccion.size > 0) {
        const similitud = interseccion.size / Math.max(tokensMensaje.size, tokensPalabra.size);
        scoreTotal += similitud * 5;
        matchesTokens += interseccion.size;
      }
      
      // Matching aproximado por distancia de Levenshtein
      tokensMensaje.forEach(tokenMsg => {
        tokensPalabra.forEach(tokenPal => {
          const distancia = distanciaLevenshtein(tokenMsg, tokenPal);
          const maxLen = Math.max(tokenMsg.length, tokenPal.length);
          if (maxLen > 0 && distancia <= 2 && distancia / maxLen < 0.5) {
            scoreTotal += 3 * (1 - distancia / maxLen);
            matchesTokens++;
          }
        });
      });
    });
    
    // Algoritmo 2: Matching por palabras completas (tolerante a errores)
    datos.palabrasClave.forEach(p => {
      const palabraNormalizada = normalizar(p);
      tokensMensaje.forEach(token => {
        // Match exacto
        if (palabraNormalizada.includes(token) || token.includes(palabraNormalizada)) {
          scoreTotal += 2;
          matchesPalabras++;
        } else {
          // Match aproximado
          const distancia = distanciaLevenshtein(token, palabraNormalizada);
          const maxLen = Math.max(token.length, palabraNormalizada.length);
          if (maxLen > 0 && distancia <= 3 && distancia / maxLen < 0.6) {
            scoreTotal += 1.5 * (1 - distancia / maxLen);
            matchesPalabras++;
          }
        }
      });
    });
    
    // Algoritmo 3: Similitud semántica mejorada (tolerante a errores)
    datos.palabrasClave.forEach(p => {
      const similitud = calcularSimilitud(mensajeNormalizado, p);
      scoreTotal += similitud * 4; // Aumentado para dar más peso
    });
    
    // Bonus por prioridad (default 5 si no tiene)
    const prioridad = datos.prioridad || 5;
    scoreTotal += prioridad * 0.5;
    
    // Bonus por contexto
    if (contexto.sintomas.length > 0) {
      const sintomasEnCategoria = datos.palabrasClave.some(p => 
        contexto.sintomas.some(s => normalizar(p).includes(s))
      );
      if (sintomasEnCategoria) scoreTotal += 3;
    }
    
    if (contexto.alimentos.length > 0) {
      const alimentosEnCategoria = datos.palabrasClave.some(p => 
        contexto.alimentos.some(a => normalizar(p).includes(a))
      );
      if (alimentosEnCategoria) scoreTotal += 3;
    }
    
    if (scoreTotal > 0) {
      resultados.push({ clave, datos, score: scoreTotal, matchesTokens, matchesPalabras });
    }
  }
  
  // Ordenar y filtrar
  resultados.sort((a, b) => b.score - a.score);
  
  // Umbral dinámico basado en el mejor resultado
  if (resultados.length > 0) {
    const mejorScore = resultados[0].score;
    const umbral = Math.max(3, mejorScore * 0.3); // Al menos 30% del mejor score
    
    const candidatos = resultados.filter(r => r.score >= umbral);
    
    if (candidatos.length > 0) {
      const mejor = candidatos[0];
      let texto;
      
      if (typeof mejor.datos.respuesta === 'function') {
        texto = mejor.datos.respuesta(contexto);
      } else if (Array.isArray(mejor.datos.respuesta)) {
        texto = pick(mejor.datos.respuesta);
      } else {
        texto = mejor.datos.respuesta;
      }
      
      return { texto, esEmergencia: false, score: mejor.score };
    }
  }
  
  return null;
};

// Manejar seguimiento de conversación
const manejarSeguimiento = (mensaje, contexto) => {
  const texto = normalizar(mensaje);
  
  // Respuestas más naturales para seguimiento
  if (contexto.ultimoTema === 'lactancia') {
    if (texto.includes('cuando') || texto.includes('hasta cuando')) {
      return {
        texto: `Puedes continuar la lactancia mientras tú y tu bebé lo deseen. La OMS recomienda hasta los 2 años o más. La leche materna sigue aportando nutrientes y defensas.`,
        esEmergencia: false
      };
    }
    if (texto.includes('como') || texto.includes('tecnica')) {
      return {
        texto: `Señales de buen agarre: boca bien abierta, más areola arriba que abajo, mentón pegado al pecho y succión lenta sin dolor. Prueba distintas posiciones hasta sentirte cómoda.`,
        esEmergencia: false
      };
    }
    return {
      texto: `Sobre la lactancia: puedes continuar mientras tú y tu bebé lo deseen. La leche materna sigue siendo valiosa después de los 6 meses. ¿Qué específicamente te gustaría saber?`,
      esEmergencia: false
    };
  }
  
  if (contexto.ultimoTema === 'anemia') {
    if (texto.includes('alimentos') || texto.includes('que dar') || texto.includes('comer')) {
      return {
        texto: `Alimentos ricos en hierro: sangrecita, hígado, bazo (mejor absorción), carne, pollo, pescado, menestras, quinua. Combínalos con vitamina C (naranja, tomate) para mejor absorción.`,
        esEmergencia: false
      };
    }
    if (texto.includes('suplemento') || texto.includes('gotas')) {
      return {
        texto: `El MINSA recomienda suplementación preventiva desde los 4 meses. La dosis la indica el pediatra (generalmente 1-2 mg/kg/día). Dalo entre comidas o con jugo de naranja.`,
        esEmergencia: false
      };
    }
    return {
      texto: `Sobre anemia: prioriza alimentos ricos en hierro como sangrecita, hígado, menestras. Combínalos con vitamina C. ¿Necesitas ideas de recetas o más información?`,
      esEmergencia: false
    };
  }
  
  if (contexto.ultimoTema === 'alimentacion') {
    if (texto.includes('cuando') || texto.includes('edad')) {
      return {
        texto: `La alimentación complementaria inicia alrededor de los 6 meses cuando el bebé se sienta con apoyo y muestra interés por la comida.`,
        esEmergencia: false
      };
    }
    if (texto.includes('textura') || texto.includes('consistencia')) {
      return {
        texto: `6-8 meses: purés espesos. 8-10 meses: trozos blandos. 10-12 meses: trozos pequeños. 12+ meses: comida de la familia adaptada.`,
        esEmergencia: false
      };
    }
  }
  
  return null;
};

// Aplicar principios éticos a la respuesta
const aplicarPrincipiosEticos = (respuesta) => {
  let texto = respuesta.texto;
  
  // Aplicar principio de no diagnóstico
  texto = PRINCIPIOS_ETICOS.noDiagnosticar(texto);
  
  // Aplicar advertencia si es necesario
  if (PRINCIPIOS_ETICOS.necesitaAdvertencia(texto) || respuesta.esEmergencia) {
    texto = PRINCIPIOS_ETICOS.aplicarAdvertencia(texto, true);
  }
  
  return { ...respuesta, texto };
};

// ----------------- MOTOR PRINCIPAL AVANZADO (OFFLINE) -----------------

// Importar IA local (siempre activa)
let generarRespuestaIA = null;
let usarIA = true;

// Cargar IA local (solo si hay conexión y el usuario lo necesita)
if (typeof window !== 'undefined') {
  import('./IALocal').then(module => {
    generarRespuestaIA = module.generarRespuestaIA;
    // No activar IA automáticamente - solo cuando se use
    usarIA = false; // Desactivado por defecto hasta que los modelos estén listos
    // Pre-cargar modelo en segundo plano (solo si hay conexión)
    if (module.precargarModelo && navigator.onLine) {
      // Esperar a que la app esté lista antes de intentar cargar
      setTimeout(() => {
        module.precargarModelo();
      }, 2000);
    }
    console.log('IA local disponible (se activará cuando los modelos estén listos)');
  }).catch((error) => {
    console.log('IA local no disponible, usando sistema mejorado:', error);
    usarIA = false;
  });
}

export const buscarRespuesta = async (mensaje, historialMensajes = []) => {
  const mensajeNormalizado = normalizar(mensaje);
  const mensajeExpandido = expandirSinonimos(mensaje);
  
  // 1. Extraer contexto conversacional del historial
  const contextoConversacional = extraerContextoConversacional(historialMensajes);
  
  // 2. Extraer contexto del mensaje actual (NLP avanzado)
  const edadActual = extraerEdad(mensaje);
  const contexto = {
    edad: edadActual || contextoConversacional.edadMencionada, // Usar edad del historial si no está en mensaje actual
    alimentos: [...new Set([...extraerAlimentos(mensaje), ...contextoConversacional.alimentosMencionados])],
    sintomas: [...new Set([...extraerSintomas(mensaje), ...contextoConversacional.sintomasMencionados])],
    intencion: detectarIntencion(mensaje),
    mensajeOriginal: mensaje,
    mensajeNormalizado: mensajeNormalizado,
    mensajeExpandido: mensajeExpandido,
    historial: historialMensajes,
    temasPrevios: contextoConversacional.temasPrevios,
    ultimoTema: contextoConversacional.ultimoTema,
    esSeguimiento: historialMensajes.length > 0 && detectarSeguimiento(mensaje, historialMensajes)
  };

  // 2. Seguridad primero - Detección de emergencias mejorada
  if (detectarEmergenciaMedica(mensajeNormalizado)) {
    let respuestaEmergencia = salidasEmergencia.medica;
    
    if (contexto.sintomas.length > 0) {
      respuestaEmergencia += ` Detecté: ${contexto.sintomas.join(", ")}. `;
      respuestaEmergencia += `Consulta con un profesional de salud.`;
    }
    
    return aplicarPrincipiosEticos({ texto: respuestaEmergencia, esEmergencia: true });
  }

  if (detectarSolicitudDieta(mensajeNormalizado)) {
    let respuestaDieta = salidasEmergencia.dieta;
    
    if (contexto.edad !== null) {
      respuestaDieta += ` Un nutricionista puede crear un plan personalizado para ${contexto.edad} ${contexto.edad === 1 ? 'mes' : 'meses'}.`;
    }
    
    return aplicarPrincipiosEticos({ texto: respuestaDieta, esEmergencia: true });
  }

  // 3. Manejar problemas específicos de lactancia (prioridad alta)
  if (contexto.intencion === "problema_lactancia") {
    let respuestaRechazo = buscarExacto(mensajeNormalizado, contexto) || buscarExacto(mensajeExpandido, contexto);
    if (respuestaRechazo && respuestaRechazo.score >= 8) {
      respuestaRechazo = aplicarPrincipiosEticos(respuestaRechazo);
      if (usarIA && generarRespuestaIA) {
        try {
          return await generarRespuestaIA(respuestaRechazo, contexto, baseConocimiento);
        } catch (error) {
          console.error('Error en IA, usando respuesta base:', error);
          return respuestaRechazo;
        }
      }
      return respuestaRechazo;
    }
    // Si no encuentra, buscar específicamente rechazoLeche
    if (baseConocimiento.rechazoLeche) {
      let texto;
      if (typeof baseConocimiento.rechazoLeche.respuesta === 'function') {
        texto = baseConocimiento.rechazoLeche.respuesta(contexto);
      } else if (Array.isArray(baseConocimiento.rechazoLeche.respuesta)) {
        texto = pick(baseConocimiento.rechazoLeche.respuesta);
      } else {
        texto = baseConocimiento.rechazoLeche.respuesta;
      }
      const respuesta = aplicarPrincipiosEticos({ texto, esEmergencia: false });
      if (usarIA && generarRespuestaIA) {
        try {
          return await generarRespuestaIA(respuesta, contexto, baseConocimiento);
        } catch (error) {
          return respuesta;
        }
      }
      return respuesta;
    }
  }

  // 4. Si es seguimiento, usar contexto del último tema
  if (contexto.esSeguimiento && contexto.ultimoTema) {
    const respuestaSeguimiento = manejarSeguimiento(mensajeNormalizado, contexto);
    if (respuestaSeguimiento) {
      return aplicarPrincipiosEticos(respuestaSeguimiento);
    }
  }

  // 5. Búsqueda exacta mejorada con contexto (usar mensaje expandido también)
  let exacta = buscarExacto(mensajeNormalizado, contexto) || buscarExacto(mensajeExpandido, contexto);
  if (exacta && exacta.score >= 8) {
    exacta = aplicarPrincipiosEticos(exacta);
    // Mejorar con IA (siempre activa)
    if (usarIA && generarRespuestaIA) {
      try {
        return await generarRespuestaIA(exacta, contexto, baseConocimiento);
      } catch (error) {
        console.error('Error en IA, usando respuesta base:', error);
        return exacta;
      }
    }
    return exacta;
  }

  // 6. Búsqueda aproximada mejorada con contexto
  let aproximada = buscarAproximado(mensajeNormalizado, contexto) || buscarAproximado(mensajeExpandido, contexto);
  if (aproximada && aproximada.score >= 3) {
    aproximada = aplicarPrincipiosEticos(aproximada);
    // Mejorar con IA (siempre activa)
    if (usarIA && generarRespuestaIA) {
      try {
        return await generarRespuestaIA(aproximada, contexto, baseConocimiento);
      } catch (error) {
        console.error('Error en IA, usando respuesta base:', error);
        return aproximada;
      }
    }
    return aproximada;
  }

  // 7. Manejar intenciones especiales (sin usar IA para respuestas simples)
  if (contexto.intencion === "agradecimiento") {
    const variaciones = [
      `De nada 😊 Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda orientarte?`,
      `¡Por supuesto! 😊 Me alegra haber podido ayudarte. ¿Tienes alguna otra duda?`,
      `De nada 💚 Siempre estoy aquí para apoyarte. ¿Necesitas algo más?`
    ];
    return { 
      texto: pick(variaciones), 
      esEmergencia: false 
    };
  }
  
  if (contexto.intencion === "despedida") {
    const variaciones = [
      `¡Hasta luego! 💚 Recuerda que siempre puedes volver si tienes más dudas sobre nutrición infantil.`,
      `¡Nos vemos! 💚 Cualquier duda, aquí estaré para ayudarte.`,
      `¡Adiós! 💚 Cuídate mucho y recuerda consultar siempre con tu pediatra para temas específicos.`
    ];
    return { 
      texto: pick(variaciones), 
      esEmergencia: false 
    };
  }
  
  // Manejar negaciones con contexto
  if (contexto.intencion === "negacion" && contexto.historial.length > 0) {
    const ultimoBot = contexto.historial.filter(m => m.esBot).pop();
    if (ultimoBot) {
      return {
        texto: `Entiendo. ¿Hay algo más en lo que pueda ayudarte?`,
        esEmergencia: false
      };
    }
  }
  
  // Manejar saludos simples (sin agregar advertencias innecesarias)
  if (contexto.intencion === "pregunta" && 
      (contexto.mensajeOriginal.toLowerCase().trim() === 'hola' || 
       contexto.mensajeOriginal.toLowerCase().trim() === 'hola de nuevo' ||
       contexto.mensajeOriginal.toLowerCase().includes('requiero ayuda'))) {
    return {
      texto: `Hola 😊 Estoy aquí para ayudarte con información sobre nutrición infantil, lactancia, anemia y cuidados del bebé de 0 a 2 años. ¿Sobre qué tema te gustaría saber?`,
      esEmergencia: false
    };
  }

  // 7. Búsqueda por intención si no se encontró nada específico
  if (contexto.intencion === "pregunta" && contexto.edad !== null) {
    let respuestaContextual = `Tu bebé tiene ${contexto.edad} ${contexto.edad === 1 ? 'mes' : 'meses'}. `;
    
    if (contexto.edad < 6) {
      respuestaContextual += `A esta edad, lactancia materna exclusiva es lo principal. `;
      respuestaContextual += `¿Qué te gustaría saber sobre la lactancia?`;
    } else if (contexto.edad >= 6 && contexto.edad < 12) {
      respuestaContextual += `Ya puedes iniciar alimentación complementaria. `;
      respuestaContextual += `¿Sobre qué alimentos o preparación te gustaría saber?`;
    } else if (contexto.edad >= 12) {
      respuestaContextual += `Puede comer una gran variedad de alimentos. `;
      respuestaContextual += `¿Qué duda específica tienes?`;
    }
    
    return { texto: respuestaContextual, esEmergencia: false };
  }

  // 6. Respuesta inteligente basada en alimentos mencionados
  if (contexto.alimentos.length > 0) {
    const alimentosStr = contexto.alimentos.join(", ");
    let respuestaAlimentos = `Sobre ${alimentosStr}: `;
    
    const infoAlimentos = contexto.alimentos.map(alimento => {
      if (["sangrecita", "higado", "bazo", "bofe"].includes(alimento)) {
        return `excelente fuente de hierro, muy recomendable para prevenir anemia.`;
      } else if (["lentejas", "garbanzos", "quinua"].includes(alimento)) {
        return `ricas en hierro y proteínas. Combínalas con vitamina C.`;
      } else if (alimento === "leche" || alimento === "pecho") {
        return `la lactancia materna es fundamental. Continúa a demanda.`;
      }
      return null;
    }).filter(Boolean);
    
    if (infoAlimentos.length > 0) {
      respuestaAlimentos += infoAlimentos[0];
      return { texto: respuestaAlimentos, esEmergencia: false };
    }
  }

  // 8. Respuesta final mejorada con contexto conversacional
  let respuestaFinal = salidasEmergencia.noEncontrada;
  
  // Si hay contexto previo, usarlo para dar respuesta más inteligente
  if (contexto.temasPrevios.length > 0) {
    respuestaFinal += ` Veo que estábamos hablando de ${contexto.temasPrevios.join(' y ')}. `;
  }
  
  if (contexto.edad !== null) {
    respuestaFinal += `Tu bebé tiene ${contexto.edad} ${contexto.edad === 1 ? 'mes' : 'meses'}. `;
    respuestaFinal += `¿Sobre qué aspecto específico te gustaría saber más?`;
  } else if (contexto.alimentos.length > 0) {
    respuestaFinal += ` Sobre ${contexto.alimentos[0]}: puedo ayudarte con información nutricional y preparación segura. ¿Qué te gustaría saber?`;
  } else {
    respuestaFinal += ` Puedo ayudarte con lactancia, alimentación complementaria, anemia, texturas y seguridad al comer. `;
    respuestaFinal += `¿Sobre qué tema específico te gustaría información?`;
  }
  
  const respuestaFinalAplicada = aplicarPrincipiosEticos({ texto: respuestaFinal, esEmergencia: false });
  
  // Mejorar con IA (siempre activa)
  if (usarIA && generarRespuestaIA) {
    try {
      return await generarRespuestaIA(respuestaFinalAplicada, contexto, baseConocimiento);
    } catch (error) {
      console.error('Error en IA, usando respuesta base:', error);
      return respuestaFinalAplicada;
    }
  }
  
  return respuestaFinalAplicada;
};
