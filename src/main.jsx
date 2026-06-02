import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, MapPin, Phone } from 'lucide-react';
import './styles.css';

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function Intro({ exiting, onSkip }) {
  return (
    <div
      className={`intro-screen${exiting ? ' exiting' : ''}`}
      onClick={onSkip}
      role="button"
      aria-label="Pular introdução"
    >
      <div className="intro-glow" />
      <div className="intro-logo-wrap">
        <img src="/logo-cimo.png" alt="CIMO Santa Luzia" />
      </div>
      <div className="intro-copy">
        <p className="intro-eyebrow">Centro Médico e Odontológico</p>
        <h2 className="intro-title">CIMO Santa Luzia</h2>
        <div className="intro-line" />
        <p className="intro-tagline">Saúde com cuidado em Sergipe</p>
      </div>
      <p className="intro-hint">Toque para continuar</p>
    </div>
  );
}

const cities = [
  {
    name: 'Campo do Brito',
    phone: '79999171613',
    address: 'Av. Jose Carlos Ribeiro de Oliveira, 65',
  },
  {
    name: 'Sao Domingos',
    phone: '79998418232',
    address: 'Unidade CIMO Santa Luzia',
  },
  {
    name: 'Frei Paulo',
    phone: '79998611951',
    address: 'Unidade CIMO Santa Luzia',
  },
];

const formatPhone = (phone) => `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
const whatsappUrl = (city) =>
  `https://api.whatsapp.com/send?phone=55${city.phone}&text=${encodeURIComponent(
    `Ola! Venho do Instagram e gostaria de contato com a unidade de ${city.name}.`
  )}`;

function App() {
  const [phase, setPhase] = useState('intro');

  const skip = useCallback(() => {
    if (phase === 'intro') setPhase('exit');
  }, [phase]);

  useEffect(() => {
    if (phase === 'intro') {
      const t = setTimeout(() => setPhase('exit'), 3400);
      return () => clearTimeout(t);
    }
    if (phase === 'exit') {
      const t = setTimeout(() => setPhase('done'), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <>
      {phase !== 'done' && <Intro exiting={phase === 'exit'} onSkip={skip} />}

      <main className={`page-shell ${phase === 'done' ? 'page-visible' : 'page-hidden'}`}>
        <section className="bio-panel" aria-label="Links de contato da CIMO Santa Luzia">
          <div className="brand-block">
            <div className="logo-frame">
              <img src="/logo-cimo.png" alt="CIMO Santa Luzia" />
            </div>
            <p className="eyebrow">Centro Medico e Odontologico</p>
    <p className="intro">
              Exames Laboratoriais, Cardiológicos, Ultrassonografias, Consultas Odontológicas, Oftalmológicas e Médicas em Geral.
            </p>
          </div>

          <div className="city-list">
            {cities.map((city) => (
              <a className="city-card" key={city.name} href={whatsappUrl(city)} target="_blank" rel="noreferrer">
                <span className="city-icon">
                  <WhatsAppIcon size={22} />
                </span>
                <span className="city-copy">
                  <strong>{city.name}</strong>
                  <span>{formatPhone(city.phone)}</span>
                </span>
                <span className="city-action">Chamar</span>
              </a>
            ))}
          </div>

          <div className="info-band">
            <div>
              <MapPin size={18} />
              <span>3 unidades para atendimento</span>
            </div>
            <div>
              <CalendarDays size={18} />
              <span>Agende pelo WhatsApp</span>
            </div>
            <div>
              <Phone size={18} />
              <span>Resposta direta da unidade escolhida</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
