

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import heroImg from '../assets/riot-hero.png';
import frankieImg from '../assets/myr.png';
import blindBoxImg from '../assets/blindbox.png';

function Home() {

  const handleConfetti = () => {
    confetti({ particleCount: 100, spread: 70 })
  };

  return (
    <>
      <Navbar />

      {/* PROMO BANNER */}
      <div className="promo-bg">
        <p className="promo-banner">
          Shopping with us? Here's 15% off, our gift to you! Use code{' '}
          <a href="/shop">RIOT15</a>
        </p>
      </div>

      {/* HERO IMAGE */}
      <img className="hero-img" src={heroImg} alt="Hero Image" />

      {/* MEET YOUR RIOT LEADER */}
      <section className="myr">
        <div>
          <h3>MEET YOUR RIOT LEADER</h3>
          <p>Hey! I'm Frankie, drummer and band leader of Peach Riot- a punk trio that chose making music over playing by the rules. We've got Gigi on vocals and guitar with those killer riffs, Poppy bringing serious style on bass and keys, and me behind the kit keeping the rhythm alive. When I'm not gaming, I'm making sure we stay bold and show the world exactly what we've got.</p>
        </div>
        <img className="frankie" src={frankieImg} alt="Frankie the Figurine" />
      </section>

      {/* WHAT'S A BLIND BOX */}
      <section className="surprise">
        <div>
          <h3>THE SURPRISE INSIDE !</h3>
          <p>It's a surprise in a box. You won't know which design you get until you open it and that's the fun part. Each series has different characters to collect, including rare ones that are harder to find. Pick one, unbox it, and see who's inside.</p>
        </div>
        <div className="blind-box">
          <img
            src={blindBoxImg}
            alt="Mystery Blind Box"
            id="celebrate-image"
            onClick={handleConfetti}
          />
          <figcaption>Click Me</figcaption>
        </div>
      </section>

      <Slider />

      <Footer />
    </>
  );
}

export default Home;