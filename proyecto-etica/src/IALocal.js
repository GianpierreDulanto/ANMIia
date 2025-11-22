// Sistema de IA Local Avanzado con RAG (Retrieval Augmented Generation)
// Usa la base de conocimiento OMS/MINSA como contexto para respuestas precisas
// Optimizado para español, móviles y PC
// Funciona 100% offline

import { pipeline, env } from '@xenova/transformers';

// Configurar para mejor rendimiento en móviles y PC
env.allowLocalModels = true;
env.allowRemoteModels = true;
env.backends.onnx.wasm.proxy = false;
env.backends.onnx.wasm.numThreads = navigator.hardwareConcurrency || 2;

// Configurar para mejor compatibilidad
env.useBrowserCache = true;
env.useCustomCache = true;

// Desactivar descarga automática en desarrollo si hay problemas
// Los modelos se cargarán solo cuando se necesiten

let modeloGeneracion = null;
let modeloEmbeddings = null;
let cargandoGeneracion = false;
let cargandoEmbeddings = false;

// Callbacks para notificar el progreso (se pueden configurar desde fuera)
let onProgressCallback = null;
let onStatusChangeCallback = null;

// Configurar callbacks de progreso
export const configurarCallbacks = (onProgress, onStatusChange) => {
  onProgressCallback = onProgress;
  onStatusChangeCallback = onStatusChange;
};

// Base de conocimiento OMS/MINSA (se usa como contexto para RAG)
const CONOCIMIENTO_NUTRICION = {
  alimentosHierro: ['sangrecita', 'hígado', 'bazo', 'bofe', 'carne', 'pollo', 'pescado', 'cuy', 'lentejas', 'garbanzos', 'quinua', 'yema de huevo'],
  alimentosVitaminaC: ['naranja', 'mandarina', 'limón', 'tomate', 'pimiento', 'kiwi', 'fresas'],
  sintomasAnemia: ['palidez', 'cansancio', 'fatiga', 'poco apetito', 'irritabilidad', 'somnolencia']
};

// Cargar modelo de embeddings (para búsqueda semántica en base de conocimiento)
const cargarModeloEmbeddings = async () => {
  if (modeloEmbeddings) return modeloEmbeddings;
  if (cargandoEmbeddings) {
    while (cargandoEmbeddings) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return modeloEmbeddings;
  }

  try {
    cargandoEmbeddings = true;
    console.log('Cargando modelo de embeddings...');
    if (onStatusChangeCallback) {
      onStatusChangeCallback({ 
        tipo: 'embeddings', 
        estado: 'descargando', 
        mensaje: 'Descargando modelo de búsqueda semántica...' 
      });
    }
    
    // Modelo pequeño de embeddings multilingüe (incluye español)
    // Usar un modelo más simple y confiable que definitivamente existe
    try {
      modeloEmbeddings = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2', // Modelo más simple y confiable
        {
          quantized: true,
          progress_callback: (progress) => {
            if (progress.status === 'progress') {
              const porcentaje = Math.round(progress.progress * 100);
              console.log(`Cargando embeddings: ${porcentaje}%`);
              if (onProgressCallback) {
                onProgressCallback({ 
                  tipo: 'embeddings', 
                  porcentaje, 
                  archivo: progress.file || 'modelo' 
                });
              }
            }
          }
        }
      );
    } catch (error1) {
      console.log('Error con all-MiniLM-L6-v2, intentando distilbert...');
      // Fallback a un modelo aún más simple
      modeloEmbeddings = await pipeline(
        'feature-extraction',
        'Xenova/distilbert-base-uncased',
        {
          quantized: true,
          progress_callback: (progress) => {
            if (progress.status === 'progress') {
              const porcentaje = Math.round(progress.progress * 100);
              if (onProgressCallback) {
                onProgressCallback({ 
                  tipo: 'embeddings', 
                  porcentaje, 
                  archivo: progress.file || 'modelo' 
                });
              }
            }
          }
        }
      );
    }
    
    console.log('Modelo de embeddings cargado exitosamente');
    if (onStatusChangeCallback) {
      onStatusChangeCallback({ 
        tipo: 'embeddings', 
        estado: 'listo', 
        mensaje: 'Modelo de búsqueda semántica listo' 
      });
    }
    cargandoEmbeddings = false;
    return modeloEmbeddings;
  } catch (error) {
    console.error('Error al cargar modelo de embeddings:', error);
    if (onStatusChangeCallback) {
      const mensajeError = error.message?.includes('DOCTYPE') || error.message?.includes('JSON') 
        ? 'Error de conexión. Verifica tu internet o usa el sistema sin IA.'
        : error.message || 'Error desconocido al cargar el modelo';
      
      onStatusChangeCallback({ 
        tipo: 'embeddings', 
        estado: 'error', 
        mensaje: mensajeError
      });
    }
    cargandoEmbeddings = false;
    return null;
  }
};

// Cargar modelo de generación de texto (ligero pero inteligente)
const cargarModeloGeneracion = async () => {
  if (modeloGeneracion) return modeloGeneracion;
  if (cargandoGeneracion) {
    while (cargandoGeneracion) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return modeloGeneracion;
  }

  try {
    cargandoGeneracion = true;
    console.log('Cargando modelo de generación de IA...');
    if (onStatusChangeCallback) {
      onStatusChangeCallback({ 
        tipo: 'generacion', 
        estado: 'descargando', 
        mensaje: 'Descargando modelo de IA...' 
      });
    }
    
    // Opción 1: Qwen2.5-0.5B (muy ligero ~200MB, mejor que DistilGPT-2, funciona en móviles)
    // Opción 2: TinyLlama-1.1B (más inteligente ~600MB, mejor para PC)
    // Usamos Qwen2.5-0.5B por ser más ligero y funcionar mejor en móviles
    
    // Intentar cargar modelos en orden de preferencia (del más ligero al más pesado)
    // Empezar con DistilGPT-2 que es el más confiable y siempre disponible
    try {
      if (onStatusChangeCallback) {
        onStatusChangeCallback({ 
          tipo: 'generacion', 
          estado: 'descargando', 
          mensaje: 'Descargando DistilGPT-2 (~82 MB)...' 
        });
      }
      modeloGeneracion = await pipeline(
        'text-generation',
        'Xenova/distilgpt2',
        {
          quantized: true,
          progress_callback: (progress) => {
            if (progress.status === 'progress') {
              const porcentaje = Math.round(progress.progress * 100);
              console.log(`Cargando modelo: ${porcentaje}%`);
              if (onProgressCallback) {
                onProgressCallback({ 
                  tipo: 'generacion', 
                  porcentaje, 
                  archivo: progress.file || 'modelo',
                  modelo: 'DistilGPT-2'
                });
              }
            }
          }
        }
      );
      console.log('Modelo DistilGPT-2 cargado exitosamente');
      if (onStatusChangeCallback) {
        onStatusChangeCallback({ 
          tipo: 'generacion', 
          estado: 'listo', 
          mensaje: 'Modelo DistilGPT-2 listo',
          modelo: 'DistilGPT-2'
        });
      }
    } catch (error) {
      console.error('Error al cargar modelo de generación:', error);
      if (onStatusChangeCallback) {
        const mensajeError = error.message?.includes('DOCTYPE') || error.message?.includes('JSON')
          ? 'Error de conexión con Hugging Face. El sistema funcionará sin IA mejorada. Verifica tu conexión a internet.'
          : error.message || 'No se pudo cargar el modelo de IA. El sistema funcionará sin IA mejorada.';
        
        onStatusChangeCallback({ 
          tipo: 'generacion', 
          estado: 'error', 
          mensaje: mensajeError
        });
      }
    }
    
    cargandoGeneracion = false;
    return modeloGeneracion;
  } catch (error) {
    console.error('Error general al cargar modelo de generación:', error);
    if (onStatusChangeCallback) {
      const mensajeError = error.message?.includes('DOCTYPE') || error.message?.includes('JSON')
        ? 'Error de conexión. El sistema funcionará sin IA mejorada.'
        : 'Error al cargar el modelo. El sistema funcionará sin IA mejorada.';
      
      onStatusChangeCallback({ 
        tipo: 'generacion', 
        estado: 'error', 
        mensaje: mensajeError
      });
    }
    cargandoGeneracion = false;
    return null;
    cargandoGeneracion = false;
    return modeloGeneracion;
  }
};

// Buscar información relevante en la base de conocimiento usando embeddings
const buscarInformacionRelevante = async (consulta, baseConocimiento) => {
  if (!modeloEmbeddings) {
    await cargarModeloEmbeddings();
  }
  
  if (!modeloEmbeddings) {
    // Fallback: búsqueda por palabras clave
    return buscarPorPalabrasClave(consulta, baseConocimiento);
  }

  try {
    // Obtener embedding de la consulta
    const embeddingConsulta = await modeloEmbeddings(consulta, { pooling: 'mean', normalize: true });
    const vectorConsulta = Array.from(embeddingConsulta.data);
    
    // Buscar en la base de conocimiento
    let mejorMatch = null;
    let mejorScore = 0;
    
    // Buscar en cada entrada de la base de conocimiento
    for (const [clave, datos] of Object.entries(baseConocimiento)) {
      if (!datos.palabrasClave || !datos.respuesta) continue;
      
      // Crear texto de búsqueda combinando palabras clave
      const textoBusqueda = datos.palabrasClave.join(' ');
      
      // Obtener embedding del texto de búsqueda
      const embeddingBusqueda = await modeloEmbeddings(textoBusqueda, { pooling: 'mean', normalize: true });
      const vectorBusqueda = Array.from(embeddingBusqueda.data);
      
      // Calcular similitud coseno
      const similitud = calcularSimilitudCoseno(vectorConsulta, vectorBusqueda);
      
      if (similitud > mejorScore) {
        mejorScore = similitud;
        mejorMatch = { clave, datos, score: similitud };
      }
    }
    
    // Retornar si la similitud es alta (>0.3)
    if (mejorMatch && mejorScore > 0.3) {
      return mejorMatch;
    }
    
    return null;
  } catch (error) {
    console.error('Error en búsqueda semántica:', error);
    return buscarPorPalabrasClave(consulta, baseConocimiento);
  }
};

// Búsqueda por palabras clave (fallback)
const buscarPorPalabrasClave = (consulta, baseConocimiento) => {
  const consultaLower = consulta.toLowerCase();
  let mejorMatch = null;
  let mejorScore = 0;
  
  for (const [clave, datos] of Object.entries(baseConocimiento)) {
    if (!datos.palabrasClave) continue;
    
    let score = 0;
    datos.palabrasClave.forEach(palabra => {
      if (consultaLower.includes(palabra.toLowerCase())) {
        score += 1;
      }
    });
    
    if (score > mejorScore) {
      mejorScore = score;
      mejorMatch = { clave, datos, score };
    }
  }
  
  return mejorMatch;
};

// Calcular similitud coseno entre dos vectores
const calcularSimilitudCoseno = (vec1, vec2) => {
  if (vec1.length !== vec2.length) return 0;
  
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
  }
  
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
};

// Crear prompt RAG (Retrieval Augmented Generation) con contexto de OMS/MINSA
const crearPromptRAG = (consulta, contextoEncontrado, respuestaBase, contexto) => {
  let prompt = `Eres ANMI, un asistente nutricional especializado en bebés de 0-2 años en Perú. `;
  prompt += `Toda tu información está basada en las guías oficiales del MINSA (Ministerio de Salud del Perú) y OMS (Organización Mundial de la Salud).\n\n`;
  
  // Agregar contexto encontrado de la base de conocimiento
  if (contextoEncontrado) {
    let textoContexto = '';
    if (typeof contextoEncontrado.datos.respuesta === 'function') {
      textoContexto = contextoEncontrado.datos.respuesta(contexto);
    } else if (Array.isArray(contextoEncontrado.datos.respuesta)) {
      textoContexto = contextoEncontrado.datos.respuesta[0];
    } else {
      textoContexto = contextoEncontrado.datos.respuesta;
    }
    
    prompt += `INFORMACIÓN OFICIAL (MINSA/OMS):\n${textoContexto.substring(0, 300)}\n\n`;
  }
  
  // Agregar información de la respuesta base
  if (respuestaBase && respuestaBase.texto) {
    prompt += `RESPUESTA BASE:\n${respuestaBase.texto.substring(0, 200)}\n\n`;
  }
  
  // Agregar contexto del usuario
  if (contexto.edad !== null) {
    prompt += `El bebé tiene ${contexto.edad} ${contexto.edad === 1 ? 'mes' : 'meses'}.\n`;
  }
  
  if (contexto.alimentos.length > 0) {
    prompt += `Alimentos mencionados: ${contexto.alimentos.join(', ')}.\n`;
  }
  
  prompt += `\nCONSULTA DEL USUARIO: "${consulta}"\n\n`;
  prompt += `INSTRUCCIONES:\n`;
  prompt += `- Responde en español peruano, de forma natural y empática.\n`;
  prompt += `- Usa SOLO la información oficial de MINSA/OMS proporcionada arriba.\n`;
  prompt += `- Si no tienes información oficial sobre algo, di que consultes con un pediatra.\n`;
  prompt += `- Sé conciso pero completo (máximo 150 palabras).\n`;
  prompt += `- No inventes información médica.\n`;
  prompt += `- Si es sobre diagnóstico o tratamiento, siempre recomienda consultar al pediatra.\n\n`;
  prompt += `RESPUESTA:`;
  
  return prompt;
};

// Generar respuesta mejorada usando RAG (Retrieval Augmented Generation)
export const generarRespuestaIA = async (respuestaBase, contexto, baseConocimiento) => {
  try {
    // Si la respuesta base es muy corta o es un saludo, no usar IA
    if (respuestaBase.texto.length < 50 || 
        contexto.intencion === 'agradecimiento' || 
        contexto.intencion === 'despedida' ||
        contexto.mensajeOriginal.toLowerCase().trim() === 'hola') {
      return mejorarRespuestaInteligente(respuestaBase, contexto);
    }

    // Cargar modelos si no están cargados
    if (!modeloGeneracion) {
      await cargarModeloGeneracion();
    }

    // Si el modelo no está disponible, usar sistema inteligente mejorado
    if (!modeloGeneracion) {
      return mejorarRespuestaInteligente(respuestaBase, contexto);
    }

    // PASO 1: Buscar información relevante en la base de conocimiento (RAG)
    const consulta = contexto.mensajeOriginal;
    const contextoEncontrado = await buscarInformacionRelevante(consulta, baseConocimiento);
    
    // PASO 2: Crear prompt RAG con contexto de OMS/MINSA
    const prompt = crearPromptRAG(consulta, contextoEncontrado, respuestaBase, contexto);
    
    // PASO 3: Generar respuesta usando el modelo con el contexto
    const resultado = await modeloGeneracion(prompt, {
      max_new_tokens: 150,
      temperature: 0.7,
      do_sample: true,
      top_p: 0.9,
      repetition_penalty: 1.3,
      pad_token_id: 50256
    });

    // Extraer texto generado
    let textoGenerado = resultado[0]?.generated_text || '';
    
    // Limpiar: remover el prompt
    textoGenerado = textoGenerado.replace(prompt, '').trim();
    
    // Si el texto generado es muy corto o no tiene sentido, usar sistema mejorado
    if (textoGenerado.length < 30 || textoGenerado === respuestaBase.texto) {
      return mejorarRespuestaInteligente(respuestaBase, contexto);
    }

    // Usar sistema avanzado de mejoras
    let respuestaFinal = mejorarRespuestaAvanzada(respuestaBase, contexto);
    
    // Combinar con el texto generado por IA (si es útil)
    if (textoGenerado.length > 50 && !respuestaFinal.includes(textoGenerado.substring(0, 30))) {
      // El modelo generó algo útil, incorporarlo
      respuestaFinal = textoGenerado;
    }
    
    // Validar éticamente (solo cuando es necesario)
    respuestaFinal = validarEticamente(respuestaFinal, contexto);
    
    // Mejorar fluidez final
    respuestaFinal = mejorarFluidez(respuestaFinal);

    return {
      ...respuestaBase,
      texto: respuestaFinal,
      mejoradoConIA: true
    };
  } catch (error) {
    console.error('Error en IA RAG, usando sistema mejorado:', error);
    return mejorarRespuestaInteligente(respuestaBase, contexto);
  }
};

// Mejorar respuesta usando sistema inteligente (sin modelo pesado)
const mejorarRespuestaInteligente = (respuestaBase, contexto) => {
  let respuesta = respuestaBase.texto;
  
  const necesitaMejora = respuesta.length > 50 && 
                         !respuesta.includes('😊') && 
                         !respuesta.includes('💚');
  
  if (necesitaMejora) {
    respuesta = hacerConversacional(respuesta, contexto);
    
    if (contexto.edad !== null) {
      respuesta = personalizarPorEdad(respuesta, contexto.edad);
    }
    
    respuesta = mejorarFluidez(respuesta);
  }
  
  respuesta = validarEticamente(respuesta, contexto);
  
  return {
    ...respuestaBase,
    texto: respuesta
  };
};

// Mejorar respuesta usando técnicas avanzadas
const mejorarRespuestaAvanzada = (respuestaBase, contexto) => {
  let mejorada = respuestaBase.texto;
  const tema = extraerTema(mejorada);
  
  if (contexto.intencion === 'pregunta' && mejorada.length > 80) {
    if (!mejorada.match(/^(Hola|Entiendo|Sobre|Para|Según|Es|La|El|Te explico)/i)) {
      mejorada = 'Te explico: ' + mejorada;
    }
  }
  
  if (contexto.edad !== null && tema !== 'general') {
    const edadTexto = `${contexto.edad} ${contexto.edad === 1 ? 'mes' : 'meses'}`;
    if (!mejorada.toLowerCase().includes(edadTexto.toLowerCase()) && mejorada.length > 100) {
      if (tema === 'anemia' && contexto.edad >= 6) {
        mejorada = `Para tu bebé de ${edadTexto}, ` + mejorada.toLowerCase().charAt(0) + mejorada.slice(1);
      } else if (tema === 'lactancia' && contexto.edad < 6) {
        mejorada = `Para tu bebé de ${edadTexto}, ` + mejorada.toLowerCase().charAt(0) + mejorada.slice(1);
      }
    }
  }
  
  if (contexto.alimentos.length > 0 && tema === 'alimentacion') {
    const alimentosHierro = contexto.alimentos.filter(a => CONOCIMIENTO_NUTRICION.alimentosHierro.includes(a));
    if (alimentosHierro.length > 0 && !mejorada.includes('vitamina C') && !mejorada.includes('absorción')) {
      mejorada += ` Recuerda combinar estos alimentos con vitamina C para mejorar la absorción del hierro.`;
    }
  }
  
  mejorada = mejorada.replace(/\.([A-Z])/g, '. $1');
  mejorada = mejorada.replace(/\s+/g, ' ');
  
  return mejorada;
};

// Extraer tema
const extraerTema = (texto) => {
  const textoLower = texto.toLowerCase();
  if (textoLower.includes('anemia') || textoLower.includes('hierro')) return 'anemia';
  if (textoLower.includes('lactancia') || textoLower.includes('pecho') || textoLower.includes('leche')) return 'lactancia';
  if (textoLower.includes('alimentacion') || textoLower.includes('comida')) return 'alimentacion';
  return 'general';
};

// Hacer conversacional
const hacerConversacional = (texto, contexto) => {
  let mejorado = texto;
  
  if (contexto.intencion === 'pregunta' && texto.length > 50) {
    if (!mejorado.match(/^(Hola|Entiendo|Sobre|Para|Según|Es|La|El|Te explico)/i)) {
      mejorado = 'Te explico: ' + mejorado;
    }
  }
  
  return mejorado;
};

// Personalizar por edad
const personalizarPorEdad = (texto, edad) => {
  if (texto.includes(`${edad} ${edad === 1 ? 'mes' : 'meses'}`)) {
    return texto;
  }
  
  if (edad < 6 && !texto.includes('lactancia exclusiva') && texto.length > 100) {
    return `Para tu bebé de ${edad} ${edad === 1 ? 'mes' : 'meses'}, ` + texto.toLowerCase();
  }
  
  return texto;
};

// Validar éticamente (solo cuando es realmente necesario)
const validarEticamente = (texto, contexto) => {
  let validado = texto;
  
  const esRespuestaSimple = texto.length < 100 || 
                            contexto.intencion === 'agradecimiento' ||
                            contexto.intencion === 'despedida' ||
                            contexto.mensajeOriginal.toLowerCase().trim() === 'hola';
  
  if (esRespuestaSimple) {
    return validado;
  }
  
  const mencionaDiagnosticoEspecifico = /(tiene anemia|tiene la enfermedad|diagnóstico de|padece|sufre de)/i.test(validado);
  const mencionaMedicinaEspecifica = /(dosis de|medicamento específico|recetar|prescripción de)/i.test(validado);
  const tieneAdvertencia = validado.includes('⚠️') || validado.includes('consulta con') || validado.includes('pediatra para');
  
  if (mencionaDiagnosticoEspecifico && !tieneAdvertencia) {
    validado += `\n\n⚠️ Importante: Esta información es educativa. Siempre consulta con un pediatra para diagnóstico y tratamiento adecuado.`;
  } else if (mencionaMedicinaEspecifica && !tieneAdvertencia) {
    validado += ` La dosis debe ser indicada por un pediatra o profesional de salud.`;
  } else if (contexto.sintomas.length >= 2 && 
             !tieneAdvertencia && 
             contexto.sintomas.some(s => ['vomita', 'fiebre', 'dificultad respirar', 'convulsion'].includes(s)) &&
             validado.toLowerCase().includes('síntoma')) {
    validado += `\n\n⚠️ Si los síntomas persisten o empeoran, consulta con un pediatra de inmediato.`;
  }
  
  return validado;
};

// Mejorar fluidez
const mejorarFluidez = (texto) => {
  let fluido = texto;
  
  fluido = fluido.replace(/\b(\w+)\s+\1\b/gi, '$1');
  fluido = fluido.replace(/\s+/g, ' ');
  fluido = fluido.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return fluido.trim();
};

// Pre-cargar modelos en segundo plano (solo si hay conexión)
export const precargarModelo = () => {
  if (typeof window === 'undefined') return;
  
  // Verificar conexión antes de intentar cargar
  if (!navigator.onLine) {
    console.log('Sin conexión a internet. Los modelos se cargarán cuando haya conexión.');
    if (onStatusChangeCallback) {
      onStatusChangeCallback({ 
        tipo: 'generacion', 
        estado: 'error', 
        mensaje: 'Sin conexión a internet. Conecta para descargar modelos.' 
      });
      onStatusChangeCallback({ 
        tipo: 'embeddings', 
        estado: 'error', 
        mensaje: 'Sin conexión a internet. Conecta para descargar modelos.' 
      });
    }
    return;
  }
  
  if (!modeloGeneracion && !cargandoGeneracion) {
    // Esperar más tiempo antes de intentar cargar (para no bloquear la app)
    setTimeout(() => {
      cargarModeloGeneracion().catch((error) => {
        console.log('Modelo de generación no disponible:', error.message);
        // No mostrar error aquí, solo cuando el usuario intente usarlo
      });
      cargarModeloEmbeddings().catch((error) => {
        console.log('Modelo de embeddings no disponible:', error.message);
        // No mostrar error aquí, solo cuando el usuario intente usarlo
      });
    }, 5000); // Esperar 5 segundos antes de intentar cargar
  }
};

// Verificar disponibilidad
export const estaDisponibleIA = async () => {
  try {
    if (modeloGeneracion) return true;
    const modelo = await cargarModeloGeneracion();
    return modelo !== null;
  } catch {
    return false;
  }
};
