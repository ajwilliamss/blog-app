import heroImage from "../../assets/hero-img.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-title">
        <h1>Welcome to my blog!</h1>
      </div>
      <img src={heroImage} alt="hero" className="hero-img" />
    </section>
  );
};

export default Hero;
