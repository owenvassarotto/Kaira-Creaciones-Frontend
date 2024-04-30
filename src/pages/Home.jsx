// components
import Hero from '../components/Hero';
import LatestProducts from '../components/LatestProducts';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import FooterBanner from '../components/FooterBanner';

const Home = () => {

  return (
    <section>
      {/* hero */}
      <Hero />

      {/* lastest products */}
      <LatestProducts />

      {/* testimonials section */}
      <Testimonials />

      {/* contact form section */}
      <ContactForm />      

      {/* Banner before footer */}
      <FooterBanner />
    </section>
  )
}

export default Home