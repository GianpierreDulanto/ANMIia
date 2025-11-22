# Sistema de IA Local con RAG (Retrieval Augmented Generation)

## 🚀 ¿Qué es RAG?

RAG (Retrieval Augmented Generation) es una técnica avanzada que combina:
1. **Búsqueda semántica** en la base de conocimiento OMS/MINSA
2. **Generación de texto** usando modelos de IA ligeros
3. **Garantía de precisión** al usar solo información oficial

## ✨ Características

### Modelos Implementados

1. **Modelo de Embeddings** (Búsqueda semántica):
   - `Xenova/paraphrase-multilingual-MiniLM-L12-v2`
   - Tamaño: ~50 MB
   - Funciona en español y otros idiomas
   - Usado para encontrar información relevante en la base de conocimiento

2. **Modelo de Generación** (Genera respuestas):
   - **Primera opción**: `Xenova/Qwen2.5-0.5B-Instruct` (~200 MB)
     - Muy ligero, funciona bien en móviles
     - Mejor que DistilGPT-2
   - **Segunda opción**: `Xenova/TinyLlama-1.1B-Chat-v1.0` (~600 MB)
     - Más inteligente, mejor para PC
   - **Fallback**: `Xenova/distilgpt2` (~82 MB)
     - Si los anteriores no están disponibles

### Ventajas del Sistema RAG

✅ **Precisión garantizada**: Solo usa información de OMS/MINSA  
✅ **Funciona offline**: Todo se ejecuta localmente  
✅ **Ligero**: Modelos optimizados para móviles y PC  
✅ **Inteligente**: Mejora significativamente las interacciones  
✅ **Ético**: Siempre recomienda consultar pediatra cuando es necesario  
✅ **Privado**: No envía datos a servidores externos  

## 📱 Compatibilidad

- ✅ **Móviles**: Funciona en Android e iOS (navegadores modernos)
- ✅ **PC**: Windows, macOS, Linux
- ✅ **Tablets**: iPad, Android tablets
- ✅ **PWA**: Se descarga con la aplicación

## 🔧 Requisitos

- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Conexión a internet solo para la primera descarga de modelos
- Después funciona 100% offline
- ~250-650 MB de espacio (dependiendo del modelo)

## 📥 Descarga de Modelos

Los modelos se descargan automáticamente la primera vez que se usa la IA:
1. Se descargan en segundo plano
2. Se guardan en el caché del navegador
3. Funcionan offline después de la primera descarga
4. Se pueden usar inmediatamente (no bloquea la app)

## 🎯 Cómo Funciona

1. **Usuario hace una pregunta**: "mi bebe no toma leche"

2. **Búsqueda semántica**:
   - El modelo de embeddings busca en la base de conocimiento OMS/MINSA
   - Encuentra información relevante sobre rechazo de leche

3. **Creación del prompt RAG**:
   - Se combina la información encontrada con el contexto del usuario
   - Se crea un prompt que instruye al modelo a usar SOLO información oficial

4. **Generación de respuesta**:
   - El modelo genera una respuesta basada en el contexto OMS/MINSA
   - La respuesta es natural, empática y precisa

5. **Validación ética**:
   - Se valida que no haga diagnósticos
   - Se agregan advertencias cuando es necesario

## 🛠️ Configuración

El sistema se activa automáticamente. No requiere configuración adicional.

Si quieres desactivar la IA local:
- El sistema automáticamente usa el sistema mejorado sin IA como fallback

## 📊 Rendimiento

- **Primera carga**: 10-30 segundos (descarga de modelos)
- **Respuestas**: 1-3 segundos (después de cargar)
- **Memoria**: ~100-300 MB RAM (dependiendo del modelo)
- **CPU**: Usa todos los cores disponibles para mejor rendimiento

## 🔒 Privacidad y Seguridad

- ✅ Todo funciona localmente
- ✅ No se envían datos a servidores
- ✅ Los modelos se guardan en el caché del navegador
- ✅ Se puede limpiar el caché para eliminar los modelos

## 🐛 Solución de Problemas

### El modelo no carga
- Verifica tu conexión a internet (solo para la primera descarga)
- Espera unos segundos, la descarga puede tardar
- El sistema usa automáticamente el sistema mejorado sin IA como fallback

### Respuestas lentas
- Es normal en la primera vez (cargando modelos)
- Después de cargar, las respuestas son rápidas
- En móviles antiguos puede ser más lento

### Modelo muy pesado
- El sistema intenta cargar primero el modelo más ligero (Qwen2.5-0.5B)
- Si no está disponible, usa TinyLlama
- Como último recurso, usa DistilGPT-2

## 📚 Información Técnica

### Arquitectura RAG

```
Usuario pregunta
    ↓
Búsqueda semántica en base OMS/MINSA
    ↓
Encuentra información relevante
    ↓
Crea prompt con contexto oficial
    ↓
Modelo genera respuesta basada en contexto
    ↓
Validación ética
    ↓
Respuesta final al usuario
```

### Modelos Disponibles

| Modelo | Tamaño | Velocidad | Inteligencia | Móvil |
|--------|--------|-----------|--------------|-------|
| Qwen2.5-0.5B | ~200 MB | ⚡⚡⚡ | ⭐⭐⭐ | ✅ Excelente |
| TinyLlama-1.1B | ~600 MB | ⚡⚡ | ⭐⭐⭐⭐ | ✅ Bueno |
| DistilGPT-2 | ~82 MB | ⚡⚡⚡ | ⭐⭐ | ✅ Excelente |

## 🎓 Referencias

- **OMS**: Organización Mundial de la Salud
- **MINSA**: Ministerio de Salud del Perú
- **Transformers.js**: Biblioteca para ejecutar modelos de IA en el navegador
- **RAG**: Retrieval Augmented Generation

