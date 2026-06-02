import React from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, MapPin, MessageCircle, Phone } from 'lucide-react';
import './styles.css';

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
    `Ola! Vim pelo Instagram e gostaria de agendar atendimento na unidade de ${city.name}.`
  )}`;

function App() {
  return (
    <main className="page-shell">
      <section className="bio-panel" aria-label="Links de contato da CIMO Santa Luzia">
        <div className="brand-block">
          <div className="logo-frame">
            <img src="/logo-cimo.png" alt="CIMO Santa Luzia" />
          </div>
          <p className="eyebrow">Centro Medico e Odontologico</p>
          <h1>CIMO Santa Luzia</h1>
          <p className="intro">
            Exames laboratoriais, atendimento medico e odontologico em Sergipe.
          </p>
        </div>

        <div className="city-list">
          {cities.map((city) => (
            <a className="city-card" key={city.name} href={whatsappUrl(city)} target="_blank" rel="noreferrer">
              <span className="city-icon">
                <MessageCircle size={22} />
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
  );
}

createRoot(document.getElementById('root')).render(<App />);
