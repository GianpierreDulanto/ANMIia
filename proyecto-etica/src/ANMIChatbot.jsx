import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Info,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Star,
  Volume2,
  Settings,
  ArrowDown,
} from 'lucide-react';
import { buscarRespuesta } from './MotorConocimiento';

const TIPS_NUTRICION = [
  'Ofrece alimentos ricos en hierro como hígado, sangrecita, lentejas y pescado.',
  'Acompaña los alimentos ricos en hierro con frutas cítricas para mejorar la absorción.',
  'Evita el té o café en niños pequeños, pueden disminuir la absorción de hierro.',
  'Mantén la lactancia materna junto con la alimentación complementaria.',
  'Introduce nuevos alimentos de manera progresiva y observa posibles reacciones.',
];

const MensajeChat = ({ mensaje, esBot, temaOscuro }) => (
  <div
    className={`d-flex mb-3 animate-fade-in ${
      esBot ? 'justify-content-start' : 'justify-content-end'
    }`}
  >
    {esBot && (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center me-2 animate-bounce-once"
        style={{
          width: '40px',
          height: '40px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #198754, #0f5132)',
          boxShadow: '0 4px 12px rgba(25, 135, 84, 0.4)',
        }}
      >
        <Bot className="text-white" size={20} />
      </div>
    )}
    <div
      className="px-4 py-3 rounded-4 animate-slide-up"
      style={{
        maxWidth: '80%',
        background: esBot
          ? temaOscuro
            ? 'linear-gradient(135deg, #2d3748, #1a202c)'
            : 'linear-gradient(135deg, #ffffff, #f8f9fa)'
          : 'linear-gradient(135deg, #198754, #157347)',
        color: esBot ? (temaOscuro ? '#e2e8f0' : '#1a202c') : '#ffffff',
        border: esBot && !temaOscuro ? '1px solid #e2e8f0' : 'none',
        boxShadow: esBot
          ? temaOscuro
            ? '0 4px 16px rgba(0, 0, 0, 0.4)'
            : '0 4px 16px rgba(0, 0, 0, 0.08)'
          : '0 4px 16px rgba(25, 135, 84, 0.3)',
      }}
    >
      <p className="mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
        {mensaje}
      </p>
    </div>
    {!esBot && (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center ms-2"
        style={{
          width: '40px',
          height: '40px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #0d6efd, #0a58ca)',
          boxShadow: '0 4px 12px rgba(13, 110, 253, 0.4)',
        }}
      >
        <User className="text-white" size={20} />
      </div>
    )}
  </div>
);

const AvisoResponsabilidad = ({ alAceptar }) => (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center animate-fade-in"
    style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
  >
    <div
      className="bg-white rounded-4 p-4 shadow-lg animate-scale-in"
      style={{ maxWidth: '550px', width: '90%' }}
    >
      <div className="text-center mb-4">
        <div
          className="mx-auto mb-3 animate-bounce-once d-flex align-items-center justify-content-center"
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #198754, #0f5132)',
            borderRadius: '50%',
          }}
        >
          <Bot size={40} className="text-white" />
        </div>
        <h2 className="h3 fw-bold text-success mb-2">ANMI</h2>
        <p className="text-muted small mb-0">Asistente Nutricional Materno Infantil</p>
      </div>

      <div
        className="alert alert-warning d-flex align-items-start mb-3 rounded-3"
        role="alert"
      >
        <AlertCircle
          className="text-warning me-2 flex-shrink-0"
          size={24}
          style={{ marginTop: '2px' }}
        />
        <div style={{ lineHeight: '1.6' }}>
          <h5 className="alert-heading fw-bold mb-2">⚠️ Aviso Importante</h5>
          <p className="mb-2">
            <strong>ANMI es una herramienta educativa</strong> que proporciona información
            general sobre nutrición infantil.
          </p>
          <p className="mb-2">
            <strong>No soy un profesional de la salud</strong> y no puedo:
          </p>
          <ul className="mb-2 ps-3">
            <li>Diagnosticar enfermedades</li>
            <li>Recetar medicamentos o suplementos</li>
            <li>Proporcionar dietas personalizadas</li>
            <li>Reemplazar la consulta médica</li>
          </ul>
          <p className="fw-bold text-dark mb-0">
            Siempre consulta con tu pediatra o nutricionista para el cuidado específico de tu
            bebé.
          </p>
        </div>
      </div>

      <div className="text-center mb-3">
        <p className="text-muted small mb-1">
          <strong>Desarrollado por estudiantes de la</strong>
        </p>
        <p className="text-success fw-bold mb-0">
          Universidad Nacional Mayor de San Marcos
        </p>
      </div>

      <button
        onClick={alAceptar}
        className="btn btn-success w-100 fw-bold py-3 rounded-3 btn-hover"
      >
        Entiendo y Acepto
      </button>
    </div>
  </div>
);

const PanelInformacion = () => (
  <div
    className="d-flex align-items-start mb-3 rounded-4 animate-slide-down p-4"
    style={{
      background: 'linear-gradient(135deg, #e7f3ff 0%, #d4edff 100%)',
      border: '1px solid #b8daff',
      boxShadow: '0 4px 20px rgba(13, 110, 253, 0.15)',
    }}
  >
    <Info className="text-info me-3 flex-shrink-0 animate-float" size={24} style={{ marginTop: '2px' }} />
    <div>
      <p className="fw-bold mb-3" style={{ fontSize: '1.1em', color: '#004085' }}>
        💚 Puedo ayudarte con:
      </p>
      <ul className="mb-3" style={{ color: '#004085' }}>
        <li>Información sobre anemia infantil</li>
        <li>Alimentos ricos en hierro para bebés</li>
        <li>Preparación segura de alimentos</li>
        <li>Nutrición de 6 a 12 meses</li>
      </ul>

      <p className="fw-bold mb-2 mt-3" style={{ fontSize: '1em', color: '#004085' }}>
        📚 Recursos confiables:
      </p>
      <ul className="mb-0 small" style={{ color: '#084298' }}>
        <li>
          <a
            href="https://www.gob.pe/minsa"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#0d6efd',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Ministerio de Salud del Perú (MINSA)
          </a>
        </li>
        <li>
          <a
            href="https://www.who.int/es"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#0d6efd',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Organización Mundial de la Salud (OMS)
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const ItemChat = ({
  chat,
  seleccionado,
  alSeleccionar,
  alRenombrar,
  alEliminar,
  alToggleFavorito,
}) => {
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(chat.nombre);

  const guardarNombre = () => {
    if (nuevoNombre.trim()) {
      alRenombrar(chat.id, nuevoNombre.trim());
      setEditando(false);
    }
  };

  return (
    <div
      className="p-3 rounded-3 mb-2 cursor-pointer transition-all"
      onClick={() => !editando && alSeleccionar(chat.id)}
      style={{
        cursor: 'pointer',
        background: seleccionado
          ? 'linear-gradient(135deg, #d1f2eb, #c3f0e3)'
          : '#ffffff',
        border: seleccionado ? '2px solid #198754' : '1px solid #e2e8f0',
        boxShadow: seleccionado
          ? '0 4px 16px rgba(25, 135, 84, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!seleccionado) {
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!seleccionado) {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
      }}
    >
      {editando ? (
        <div
          className="d-flex align-items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && guardarNombre()}
            className="form-control form-control-sm"
            autoFocus
          />
          <button onClick={guardarNombre} className="btn btn-success btn-sm">
            <Check size={16} />
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between">
          <span className="fw-semibold text-dark flex-grow-1 text-truncate">
            {chat.nombre}
          </span>
          <div className="d-flex gap-1 ms-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditando(true);
              }}
              className="btn btn-sm btn-link text-secondary p-1 hover-primary"
              style={{ lineHeight: 1 }}
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alEliminar(chat.id);
              }}
              className="btn btn-sm btn-link text-secondary p-1 hover-danger"
              style={{ lineHeight: 1 }}
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alToggleFavorito(chat.id);
              }}
              className="btn btn-sm btn-link p-1"
              style={{
                lineHeight: 1,
                color: chat.favorito ? '#ffc107' : '#adb5bd',
              }}
            >
              <Star size={14} />
            </button>
          </div>
        </div>
      )}
      <p className="text-muted small mb-0 mt-1">{chat.fecha}</p>
    </div>
  );
};

const Sidebar = ({
  abierta,
  alCerrar,
  chats,
  chatActual,
  alSeleccionarChat,
  alNuevoChat,
  alRenombrarChat,
  alEliminarChat,
  alToggleFavoritoChat,
}) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const chatsFiltrados = chats
    .slice()
    .sort((a, b) => {
      if (a.favorito === b.favorito) return 0;
      return a.favorito ? -1 : 1;
    })
    .filter((chat) => {
      if (!terminoBusqueda.trim()) return true;
      const texto = terminoBusqueda.toLowerCase();
      const coincideNombre = chat.nombre.toLowerCase().includes(texto);
      const coincideMensajes = (chat.mensajes || []).some((m) =>
        (m.texto || '').toLowerCase().includes(texto)
      );
      return coincideNombre || coincideMensajes;
    });

  return (
    <>
      {abierta && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark animate-fade-in"
          style={{ zIndex: 1040, opacity: 0.5 }}
          onClick={alCerrar}
        />
      )}

      <div
        className="position-fixed top-0 start-0 h-100 animate-slide-in-left"
        style={{
          width: '320px',
          zIndex: 1051,
          background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
          display: abierta ? 'block' : 'none',
        }}
      >
        <div className="d-flex flex-column h-100">
          <div className="p-4" style={{
            background: 'linear-gradient(135deg, #198754, #157347)',
            boxShadow: '0 2px 12px rgba(25, 135, 84, 0.3)',
          }}>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="h5 mb-0 fw-bold text-white">💬 Mis Chats</h2>
              <button
                onClick={alCerrar}
                className="btn btn-link p-1"
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-3">
            <button
              onClick={() => {
                alNuevoChat();
                alCerrar();
              }}
              className="btn w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-3 rounded-3 btn-hover"
              style={{
                background: 'linear-gradient(135deg, #198754, #157347)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 12px rgba(25, 135, 84, 0.3)',
              }}
            >
              <Plus size={20} />
              Nuevo Chat
            </button>
          </div>

          <div className="px-3 mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar en mis chats..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
          </div>

          <div
            className="flex-grow-1 overflow-auto px-3 pb-3"
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          >
            {chatsFiltrados.length === 0 ? (
              <p className="text-muted text-center mt-5 small">
                No se encontraron chats
              </p>
            ) : (
              chatsFiltrados.map((chat) => (
                <ItemChat
                  key={chat.id}
                  chat={chat}
                  seleccionado={chat.id === chatActual}
                  alSeleccionar={alSeleccionarChat}
                  alRenombrar={alRenombrarChat}
                  alEliminar={alEliminarChat}
                  alToggleFavorito={alToggleFavoritoChat}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SubmenuSettings = ({
  abierto,
  alCerrar,
  tamanoFuente,
  disminuirFuente,
  aumentarFuente,
  temaOscuro,
  toggleTema,
  manejarDescargarChat,
  estadoIA,
}) => {
  if (!abierto) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark animate-fade-in"
        style={{ zIndex: 1040, opacity: 0.4 }}
        onClick={alCerrar}
      />
      <div
        className="position-fixed top-0 end-0 h-100 animate-slide-in-right"
        style={{
          width: '300px',
          zIndex: 1052,
          background: temaOscuro
            ? 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)'
            : 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="d-flex flex-column h-100">
          <div
            className="p-4"
            style={{
              background: temaOscuro
                ? 'linear-gradient(135deg, #2d3748, #1a202c)'
                : 'linear-gradient(135deg, #198754, #157347)',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span
                className="fw-bold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#ffffff', fontSize: '1.1em' }}
              >
                ⚙️ Configuración
              </span>
              <button
                onClick={alCerrar}
                className="btn btn-link p-1"
                style={{
                  color: temaOscuro ? 'rgba(226, 232, 240, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = temaOscuro ? '#ffffff' : '#ffffff';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = temaOscuro
                    ? 'rgba(226, 232, 240, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="p-3 flex-grow-1 overflow-auto">
            <div className="mb-4">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                📏 Tamaño de letra
              </p>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm"
                  onClick={disminuirFuente}
                  style={{
                    background: temaOscuro ? '#2d3748' : '#ffffff',
                    color: temaOscuro ? '#e2e8f0' : '#1a202c',
                    border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  A-
                </button>
                <button
                  className="btn btn-sm"
                  onClick={aumentarFuente}
                  style={{
                    background: temaOscuro ? '#2d3748' : '#ffffff',
                    color: temaOscuro ? '#e2e8f0' : '#1a202c',
                    border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  A+
                </button>
                <span
                  className="small ms-1"
                  style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}
                >
                  {tamanoFuente}px
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                🎨 Tema
              </p>
              <button
                className="btn btn-sm d-flex align-items-center gap-2"
                onClick={toggleTema}
                style={{
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#1a202c',
                  border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {temaOscuro ? 'Modo claro ☀️' : 'Modo oscuro 🌙'}
              </button>
            </div>

            <div className="mb-4">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                🤖 Estado de IA Local
              </p>
              
              {/* Estado de Embeddings */}
              <div className="mb-3 p-2 rounded" style={{ 
                background: temaOscuro ? '#2d3748' : '#f8f9fa',
                border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`
              }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small fw-semibold" style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}>
                    Búsqueda Semántica
                  </span>
                  <span className="small" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                    {estadoIA.embeddings.estado === 'listo' ? '✅ Listo' : 
                     estadoIA.embeddings.estado === 'descargando' ? '⏳ Descargando...' : 
                     estadoIA.embeddings.estado === 'error' ? '❌ Error' : '⏸️ No iniciado'}
                  </span>
                </div>
                {estadoIA.embeddings.estado === 'descargando' && (
                  <div className="mt-2">
                    <div className="progress" style={{ height: '6px', background: temaOscuro ? '#1a202c' : '#e2e8f0' }}>
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ 
                          width: `${estadoIA.embeddings.porcentaje}%`,
                          background: 'linear-gradient(90deg, #198754, #157347)'
                        }}
                      />
                    </div>
                    <p className="small mt-1 mb-0" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                      {estadoIA.embeddings.mensaje || `${estadoIA.embeddings.porcentaje}%`}
                    </p>
                  </div>
                )}
                {estadoIA.embeddings.mensaje && estadoIA.embeddings.estado !== 'descargando' && (
                  <p className="small mt-1 mb-0" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                    {estadoIA.embeddings.mensaje}
                  </p>
                )}
              </div>

              {/* Estado de Generación */}
              <div className="mb-3 p-2 rounded" style={{ 
                background: temaOscuro ? '#2d3748' : '#f8f9fa',
                border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`
              }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small fw-semibold" style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}>
                    Modelo de IA
                  </span>
                  <span className="small" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                    {estadoIA.generacion.estado === 'listo' ? '✅ Listo' : 
                     estadoIA.generacion.estado === 'descargando' ? '⏳ Descargando...' : 
                     estadoIA.generacion.estado === 'error' ? '❌ Error' : '⏸️ No iniciado'}
                  </span>
                </div>
                {estadoIA.generacion.modelo && (
                  <p className="small mb-1" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                    Modelo: {estadoIA.generacion.modelo}
                  </p>
                )}
                {estadoIA.generacion.estado === 'descargando' && (
                  <div className="mt-2">
                    <div className="progress" style={{ height: '6px', background: temaOscuro ? '#1a202c' : '#e2e8f0' }}>
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ 
                          width: `${estadoIA.generacion.porcentaje}%`,
                          background: 'linear-gradient(90deg, #198754, #157347)'
                        }}
                      />
                    </div>
                    <p className="small mt-1 mb-0" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                      {estadoIA.generacion.mensaje || `${estadoIA.generacion.porcentaje}%`}
                    </p>
                  </div>
                )}
                {estadoIA.generacion.mensaje && estadoIA.generacion.estado !== 'descargando' && (
                  <p className="small mt-1 mb-0" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d' }}>
                    {estadoIA.generacion.mensaje}
                  </p>
                )}
              </div>

              <p className="small mb-0" style={{ color: temaOscuro ? '#a0aec0' : '#6c757d', lineHeight: '1.5' }}>
                Los modelos se descargan automáticamente la primera vez. Después funcionan offline.
              </p>
              {(estadoIA.embeddings.estado === 'error' || estadoIA.generacion.estado === 'error') && (
                <div className="mt-3 p-2 rounded" style={{ 
                  background: temaOscuro ? '#4a1e1e' : '#fff3cd',
                  border: `1px solid ${temaOscuro ? '#6b2c2c' : '#ffc107'}`
                }}>
                  <p className="small mb-0" style={{ color: temaOscuro ? '#fca5a5' : '#856404' }}>
                    <strong>Nota:</strong> El sistema funciona perfectamente sin IA mejorada. Las respuestas siguen siendo precisas y basadas en información oficial de OMS/MINSA.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-3">
              <p
                className="mb-2 fw-semibold"
                style={{ color: temaOscuro ? '#e2e8f0' : '#1a202c' }}
              >
                💾 Exportar chat
              </p>
              <button
                className="btn btn-sm"
                onClick={manejarDescargarChat}
                style={{
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#1a202c',
                  border: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Descargar historial (.txt)
              </button>
              <p
                className="small mt-2 mb-0"
                style={{ color: temaOscuro ? '#a0aec0' : '#6c757d', lineHeight: '1.5' }}
              >
                Se descargará un archivo de texto con todas las preguntas y respuestas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function ChatbotANMI() {
  const [mensajes, setMensajes] = useState([]);
  const [valorEntrada, setValorEntrada] = useState('');
  const [mostrarAviso, setMostrarAviso] = useState(true);
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);
  const [sidebarAbierta, setSidebarAbierta] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatActualId, setChatActualId] = useState(null);
  const [tipActual, setTipActual] = useState(
    () => TIPS_NUTRICION[Math.floor(Math.random() * TIPS_NUTRICION.length)]
  );

  const [temaOscuro, setTemaOscuro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('anmi_tema') === 'oscuro';
  });

  const [tamanoFuente, setTamanoFuente] = useState(() => {
    if (typeof window === 'undefined') return 16;
    const guardado = localStorage.getItem('anmi_font_size');
    return guardado ? parseInt(guardado, 10) : 16;
  });

  const [mostrarBotonBajar, setMostrarBotonBajar] = useState(false);

  // Estados para rastrear descarga de modelos de IA
  const [estadoIA, setEstadoIA] = useState({
    embeddings: { estado: 'no_iniciado', mensaje: '', porcentaje: 0 },
    generacion: { estado: 'no_iniciado', mensaje: '', porcentaje: 0, modelo: '' }
  });

  const finMensajesRef = useRef(null);
  const contenedorChatRef = useRef(null);

  // Cargar chats al inicio
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const chatsGuardados = localStorage.getItem('anmi_chats');
    if (chatsGuardados) {
      const chatsParseados = JSON.parse(chatsGuardados);
      setChats(chatsParseados);
      if (chatsParseados.length > 0) {
        setChatActualId(chatsParseados[0].id);
        setMensajes(chatsParseados[0].mensajes || []);
      }
    }
  }, []);

  // Guardar chats en localStorage cada vez que cambien
  useEffect(() => {
    if (typeof window === 'undefined' || chats.length === 0) return;
    console.log('Guardando chats en localStorage:', chats);
    localStorage.setItem('anmi_chats', JSON.stringify(chats));
  }, [chats]);

  // Configurar callbacks de progreso de IA
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    import('./IALocal').then(module => {
      if (module.configurarCallbacks) {
        module.configurarCallbacks(
          // Callback de progreso
          (progreso) => {
            setEstadoIA(prev => ({
              ...prev,
              [progreso.tipo]: {
                ...prev[progreso.tipo],
                porcentaje: progreso.porcentaje,
                modelo: progreso.modelo || prev[progreso.tipo].modelo
              }
            }));
          },
          // Callback de cambio de estado
          (status) => {
            setEstadoIA(prev => ({
              ...prev,
              [status.tipo]: {
                estado: status.estado,
                mensaje: status.mensaje,
                porcentaje: status.estado === 'listo' ? 100 : prev[status.tipo].porcentaje,
                modelo: status.modelo || prev[status.tipo].modelo
              }
            }));
          }
        );
      }
      
      // Pre-cargar modelos
      if (module.precargarModelo) {
        module.precargarModelo();
      }
    }).catch(error => {
      console.log('IA local no disponible:', error);
    });
  }, []);

  // Guardar preferencias
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('anmi_tema', temaOscuro ? 'oscuro' : 'claro');
  }, [temaOscuro]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('anmi_font_size', tamanoFuente.toString());
  }, [tamanoFuente]);

  // Actualizar mensajes en el chat actual cada vez que cambian
  useEffect(() => {
    if (!chatActualId || mensajes.length === 0) return;
    
    setChats((prevChats) => {
      const chatsActualizados = prevChats.map((chat) =>
        chat.id === chatActualId
          ? {
              ...chat,
              mensajes: [...mensajes],
              ultimaActualizacion: new Date().toISOString(),
            }
          : chat
      );
      return chatsActualizados;
    });
  }, [mensajes, chatActualId]);

  const desplazarAlFinal = () => {
    finMensajesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    desplazarAlFinal();
  }, [mensajes, estaEscribiendo]);

  // Detectar si el usuario está cerca del final del chat
  useEffect(() => {
    const contenedor = contenedorChatRef.current;
    
    if (!contenedor) return;

    const manejarScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contenedor;
      const distanciaDelFinal = scrollHeight - scrollTop - clientHeight;
      const deberiaMostrar = distanciaDelFinal > 150;
      setMostrarBotonBajar(deberiaMostrar);
    };

    contenedor.addEventListener('scroll', manejarScroll);
    setTimeout(() => manejarScroll(), 100);
    
    return () => {
      contenedor.removeEventListener('scroll', manejarScroll);
    };
  }, [mensajes]);

  useEffect(() => {
    if (!mostrarAviso && mensajes.length === 0 && chatActualId) {
      setMensajes([
        {
          texto: `¡Hola! Soy ANMI, tu Asistente Nutricional Materno Infantil 👶

Estoy aquí para ayudarte con información educativa sobre nutrición y prevención de anemia en bebés de 6 a 12 meses.

¿En qué puedo ayudarte hoy?`,
          esBot: true,
        },
      ]);
    }
  }, [mostrarAviso, chatActualId]);

  const crearNuevoChat = () => {
    const nuevoChat = {
      id: Date.now().toString(),
      nombre: `Chat ${chats.length + 1}`,
      fecha: new Date().toLocaleDateString(),
      mensajes: [],
      ultimaActualizacion: new Date().toISOString(),
      favorito: false,
    };
    setChats((prev) => [nuevoChat, ...prev]);
    setChatActualId(nuevoChat.id);
    setMensajes([]);
  };

  const seleccionarChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setChatActualId(chatId);
      setMensajes(chat.mensajes || []);
    }
  };

  const renombrarChat = (chatId, nuevoNombre) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, nombre: nuevoNombre } : chat
      )
    );
  };

  const eliminarChat = (chatId) => {
    const nuevosChats = chats.filter((c) => c.id !== chatId);
    setChats(nuevosChats);

    if (chatId === chatActualId) {
      if (nuevosChats.length > 0) {
        setChatActualId(nuevosChats[0].id);
        setMensajes(nuevosChats[0].mensajes || []);
      } else {
        setChatActualId(null);
        setMensajes([]);
      }
    }
  };

  const toggleFavoritoChat = (chatId) => {
    setChats((prev) =>
      prev
        .map((chat) =>
          chat.id === chatId ? { ...chat, favorito: !chat.favorito } : chat
        )
        .sort((a, b) => {
          if (a.favorito === b.favorito) return 0;
          return a.favorito ? -1 : 1;
        })
    );
  };

  const manejarEnvio = () => {
    if (!valorEntrada.trim()) return;

    if (!chatActualId) {
      crearNuevoChat();
      // Esperar un momento para que se cree el chat
      setTimeout(() => {
        const mensajeUsuario = valorEntrada.trim();
        setMensajes([{ texto: mensajeUsuario, esBot: false }]);
        setValorEntrada('');
        setEstaEscribiendo(true);

        setTimeout(async () => {
          const respuesta = await buscarRespuesta(mensajeUsuario, []);
          setEstaEscribiendo(false);
          setMensajes((prev) => [
            ...prev,
            { texto: respuesta.texto, esBot: true },
          ]);
        }, 800);
      }, 100);
      return;
    }

    const mensajeUsuario = valorEntrada.trim();
    setMensajes((prev) => [...prev, { texto: mensajeUsuario, esBot: false }]);
    setValorEntrada('');
    setEstaEscribiendo(true);

    setTimeout(async () => {
      // Pasar historial de mensajes para contexto conversacional
      const historial = mensajes.map(m => ({ texto: m.texto, esBot: m.esBot }));
      const respuesta = await buscarRespuesta(mensajeUsuario, historial);
      setEstaEscribiendo(false);
      setMensajes((prev) => [
        ...prev,
        { texto: respuesta.texto, esBot: true },
      ]);
    }, 800);
  };

  const manejarTeclaPresionada = (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      manejarEnvio();
    }
  };

  const manejarDescargarChat = () => {
    if (!mensajes.length) return;

    const contenido = mensajes
      .map((m) => `${m.esBot ? 'ANMI:' : 'Usuario:'}\n${m.texto}`)
      .join('\n\n-----------------------------\n\n');

    const blob = new Blob([contenido], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-anmi.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const disminuirFuente = () => {
    setTamanoFuente((prev) => Math.max(14, prev - 2));
  };

  const aumentarFuente = () => {
    setTamanoFuente((prev) => Math.min(22, prev + 2));
  };

  const leerUltimoMensajeBot = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('El lector de voz no está disponible en este dispositivo.');
      return;
    }
    const ultimoBot = [...mensajes].reverse().find((m) => m.esBot);
    if (!ultimoBot) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(ultimoBot.texto);
    utterance.lang = 'es-PE';
    window.speechSynthesis.speak(utterance);
  };

  if (mostrarAviso) {
    return <AvisoResponsabilidad alAceptar={() => setMostrarAviso(false)} />;
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.05) rotate(-5deg); }
          50% { transform: scale(1.1) rotate(5deg); }
          75% { transform: scale(1.05) rotate(-3deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slideDown 0.4s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-bounce-once {
          animation: bounceOnce 0.8s ease-in-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .btn-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-hover:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .btn-hover:active {
          transform: translateY(0) scale(0.98);
        }
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transform: translateX(4px);
        }
        .hover-primary:hover {
          color: #0d6efd !important;
        }
        .hover-danger:hover {
          color: #dc3545 !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .mensaje-burbuja {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gradient-header {
          background: linear-gradient(135deg, #198754 0%, #157347 50%, #0f5132 100%);
          box-shadow: 0 4px 20px rgba(25, 135, 84, 0.3);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .glass-effect-dark {
          background: rgba(30, 30, 30, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <Sidebar
        abierta={sidebarAbierta}
        alCerrar={() => setSidebarAbierta(false)}
        chats={chats}
        chatActual={chatActualId}
        alSeleccionarChat={seleccionarChat}
        alNuevoChat={crearNuevoChat}
        alRenombrarChat={renombrarChat}
        alEliminarChat={eliminarChat}
        alToggleFavoritoChat={toggleFavoritoChat}
      />

      <SubmenuSettings
        abierto={submenuAbierto}
        alCerrar={() => setSubmenuAbierto(false)}
        tamanoFuente={tamanoFuente}
        disminuirFuente={disminuirFuente}
        aumentarFuente={aumentarFuente}
        temaOscuro={temaOscuro}
        toggleTema={() => setTemaOscuro((prev) => !prev)}
        manejarDescargarChat={manejarDescargarChat}
        estadoIA={estadoIA}
      />

      <div
        className="d-flex flex-column vh-100"
        style={{
          background: temaOscuro
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #d1f2eb 0%, #f8f9fa 50%, #ffffff 100%)',
          transition: 'background 0.3s ease, color 0.3s ease',
          fontSize: `${tamanoFuente}px`,
          color: temaOscuro ? '#e2e8f0' : '#1a202c',
        }}
      >
        {/* Header fijo */}
        <div
          className="text-white p-3 gradient-header"
          style={{
            background: 'linear-gradient(135deg, #198754 0%, #157347 50%, #0f5132 100%)',
            boxShadow: '0 4px 20px rgba(25, 135, 84, 0.3)',
          }}
        >
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => setSidebarAbierta(true)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                  }}
                  aria-label="Abrir lista de chats"
                >
                  <Menu size={24} />
                </button>
                <div
                  className="bg-white rounded-circle p-2 animate-float d-flex align-items-center justify-content-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Bot size={32} style={{ color: '#198754' }} />
                </div>
                <div>
                  <h1 className="h4 mb-0 d-flex align-items-center fw-bold">
                    ANMI
                  </h1>
                  <p className="mb-0 small" style={{ opacity: 0.95 }}>
                    Asistente Nutricional Materno Infantil
                  </p>
                </div>
              </div>

              <button
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                }}
                onClick={() => setSubmenuAbierto(true)}
                aria-label="Abrir configuración"
              >
                <Settings size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Área de Chat scrollable */}
        <div
          ref={contenedorChatRef}
          className="flex-grow-1 overflow-auto p-3 position-relative"
          style={{
            background: temaOscuro
              ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
              : 'linear-gradient(180deg, #d1f2eb 0%, #f8f9fa 50%, #ffffff 100%)',
          }}
        >
          <div className="container" style={{ maxWidth: '900px' }}>
            <PanelInformacion />

            {tipActual && (
              <div
                className="rounded-4 mb-3 animate-fade-in p-4"
                style={{
                  background: temaOscuro
                    ? 'linear-gradient(135deg, #065f46, #047857)'
                    : 'linear-gradient(135deg, #d1f2eb, #a7f3d0)',
                  border: `1px solid ${temaOscuro ? '#059669' : '#6ee7b7'}`,
                  boxShadow: temaOscuro
                    ? '0 4px 20px rgba(6, 95, 70, 0.4)'
                    : '0 4px 20px rgba(16, 185, 129, 0.2)',
                  color: temaOscuro ? '#d1fae5' : '#064e3b',
                }}
              >
                <strong style={{ fontSize: '1.05em' }}>💡 Tip ANMI:</strong> {tipActual}
                <button
                  className="btn btn-sm ms-3 p-1 px-2"
                  onClick={() => {
                    const random =
                      TIPS_NUTRICION[
                        Math.floor(Math.random() * TIPS_NUTRICION.length)
                      ];
                    setTipActual(random);
                  }}
                  style={{
                    background: temaOscuro ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                    color: temaOscuro ? '#d1fae5' : '#064e3b',
                    border: 'none',
                    fontSize: '0.85em',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = temaOscuro
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(0, 0, 0, 0.12)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = temaOscuro
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(0, 0, 0, 0.08)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🔄 Otro tip
                </button>
              </div>
            )}

            {mensajes.map((msj, indice) => (
              <MensajeChat
                key={indice}
                mensaje={msj.texto}
                esBot={msj.esBot}
                temaOscuro={temaOscuro}
              />
            ))}

            {estaEscribiendo && (
              <div className="d-flex align-items-center mb-3 animate-fade-in">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #198754, #0f5132)',
                    boxShadow: '0 4px 12px rgba(25, 135, 84, 0.4)',
                  }}
                >
                  <Bot className="text-white" size={20} />
                </div>
                <div
                  className="px-4 py-3 rounded-4"
                  style={{
                    background: temaOscuro
                      ? 'linear-gradient(135deg, #2d3748, #1a202c)'
                      : 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                    border: temaOscuro ? 'none' : '1px solid #e2e8f0',
                    boxShadow: temaOscuro
                      ? '0 4px 16px rgba(0, 0, 0, 0.4)'
                      : '0 4px 16px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="d-flex gap-1">
                    <div
                      className="spinner-grow text-secondary"
                      role="status"
                      style={{ width: '10px', height: '10px' }}
                    >
                      <span className="visually-hidden">Escribiendo...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary"
                      role="status"
                      style={{
                        width: '10px',
                        height: '10px',
                        animationDelay: '0.15s',
                      }}
                    >
                      <span className="visually-hidden">Escribiendo...</span>
                    </div>
                    <div
                      className="spinner-grow text-secondary"
                      role="status"
                      style={{
                        width: '10px',
                        height: '10px',
                        animationDelay: '0.3s',
                      }}
                    >
                      <span className="visually-hidden">Escribiendo...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={finMensajesRef} />
          </div>
        </div>

        {/* Botón flotante para bajar al final - encima del input */}
        <div
          className="position-relative"
          style={{
            width: '100%',
            height: '0',
            pointerEvents: 'none',
          }}
        >
          {mostrarBotonBajar && (
            <button
              onClick={desplazarAlFinal}
              className="btn position-absolute animate-fade-in"
              style={{
                bottom: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(25, 135, 84, 0.9)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 4px 16px rgba(25, 135, 84, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                pointerEvents: 'auto',
              }}
              aria-label="Ir al final del chat"
            >
              <ArrowDown size={24} />
            </button>
          )}
        </div>

        {/* Input fijo abajo */}
        <div
          className="p-3"
          style={{
            background: temaOscuro
              ? 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
            borderTop: `1px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="d-flex gap-2 align-items-center">
              <button
                onClick={leerUltimoMensajeBot}
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: '46px',
                  height: '46px',
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#495057',
                  border: `1px solid ${temaOscuro ? '#4a5568' : '#ced4da'}`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                aria-label="Escuchar último mensaje de ANMI"
              >
                <Volume2 size={20} />
              </button>
              <input
                type="text"
                value={valorEntrada}
                onChange={(evento) => setValorEntrada(evento.target.value)}
                onKeyPress={manejarTeclaPresionada}
                placeholder="Escribe tu pregunta..."
                className="form-control rounded-3"
                style={{
                  background: temaOscuro ? '#2d3748' : '#ffffff',
                  color: temaOscuro ? '#e2e8f0' : '#1a202c',
                  border: `2px solid ${temaOscuro ? '#4a5568' : '#dee2e6'}`,
                  padding: '12px 16px',
                  fontSize: '1em',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#198754';
                  e.target.style.boxShadow = '0 0 0 3px rgba(25, 135, 84, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = temaOscuro ? '#4a5568' : '#dee2e6';
                  e.target.style.boxShadow = 'none';
                }}
                aria-label="Escribe tu pregunta para ANMI"
              />
              <button
                onClick={manejarEnvio}
                disabled={!valorEntrada.trim()}
                className="btn px-4 rounded-3 btn-hover"
                style={{
                  background: valorEntrada.trim()
                    ? 'linear-gradient(135deg, #198754, #157347)'
                    : temaOscuro
                    ? '#4a5568'
                    : '#e9ecef',
                  color: valorEntrada.trim() ? '#ffffff' : temaOscuro ? '#718096' : '#adb5bd',
                  border: 'none',
                  height: '46px',
                  boxShadow: valorEntrada.trim()
                    ? '0 4px 12px rgba(25, 135, 84, 0.3)'
                    : 'none',
                  cursor: valorEntrada.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}