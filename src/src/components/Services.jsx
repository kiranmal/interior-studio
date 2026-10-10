import { services } from '../data/content.js';
import useReveal from '../hooks/useReveal.js';

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" className="section services">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Our Services</p>
          <h2>Spaces designed <em>around you.</em></h2>
          <p className="sub">
            From concept to completion, Ivy Interio brings design, planning and
            execution together for homes and commercial spaces.
          </p>
        </div>

        <div className="service-grid reveal" ref={ref}>
          {services.map((service) => (
            <article className="service" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#calculator" className="service-link">Plan your space →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
