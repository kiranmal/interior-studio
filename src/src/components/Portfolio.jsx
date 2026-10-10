import { projects } from '../data/content.js';
import useReveal from '../hooks/useReveal.js';

export default function Portfolio() {
  const ref = useReveal();

  return (
    <section id="projects" className="section portfolio">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Featured Projects</p>
          <h2>Our latest <em>work.</em></h2>
          <p className="sub">
            A glimpse of the warm, modern and practical spaces we create for
            everyday living and working.
          </p>
        </div>

        <div className="project-grid reveal" ref={ref}>
          {projects.map((project) => (
            <article className="project" key={project.name}>
              <img src={project.image} alt={project.name} loading="lazy" />
              <div className="project-info">
                <small>{project.type} · {project.place}</small>
                <h3>{project.name}</h3>
                <p>Thoughtful planning, refined materials and functional details.</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
