import TestimonialCard from './TestimonialCard'
import Slider from 'react-slick'
import useTestimonialsContext from '../hooks/useTestimonialsContext'

const Testimonials = () => {

  const { testimonials } = useTestimonialsContext();

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className='mb-14'>
        <h2 className='uppercase text-2xl text-primary font-bold text-center mb-6'>Sus opiniones</h2>

        <Slider {...settings}>
          {testimonials?.map(testimonial => <TestimonialCard key={testimonial.id} data={testimonial} />)}
        </Slider>
    </section>
  )
}

export default Testimonials