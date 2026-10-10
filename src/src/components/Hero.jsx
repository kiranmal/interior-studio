import Counter from './Counter.jsx';
import { stats } from '../data/content.js';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-media">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury modern living room designed by Ivy Interio"
        />
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Premium Interior Design & Decor</p>
          <h1>
            Beautiful spaces <br />
            <em>for a better life.</em>
          </h1>
          <p className="lead">
            At Ivy Interio, we create modern, functional and timeless interiors
            that reflect your personality, lifestyle and everyday needs.
          </p>

          <div className="hero-actions">
            <a className="btn gold" href="#projects">Explore Our Work →</a>
            <a className="btn ghost" href="#process">See Our Process ◉</a>
          </div>

          <div className="hero-points">
            <div className="hero-point"><span /> Modern Design</div>
            <div className="hero-point"><span /> Premium Quality</div>
            <div className="hero-point"><span /> On-Time Planning</div>
            <div className="hero-point"><span /> End-to-End Support</div>
          </div>
        </div>

        <div className="hero-side">Your Dream<br />Our Design</div>
      </div>

      <div className="hero-scroll"><i /> Scroll to explore</div>
    </section>
  );
}
