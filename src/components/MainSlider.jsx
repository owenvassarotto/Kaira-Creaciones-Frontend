import { Link } from "react-router-dom";
import Slider from "react-slick";
// main slider images
import MainSliderImage1 from '../img/aros_1.png';
import MainSliderImage2 from '../img/aros_2.png';
import MainSliderImage3 from '../img/aros_3.png';

// data
const sliderData = [
  {
    img: MainSliderImage1,
    title: "¡Todas las semanas tenemos modelos nuevos!",
    btnText: "Conocélos",
  },
  {
    img: MainSliderImage2,
    title: "¡Todas las semanas tenemos modelos nuevos!",
    btnText: "Conocélos",
  },
  {
    img: MainSliderImage3,
    title: "¡Todas las semanas tenemos modelos nuevos!",
    btnText: "Conocélos",
  },
]

const MainSlider = () => {
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    arrows: false,
    swipeToSlide: true,
    touchMove: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <Slider {...settings} className='bg-secondary rounded-lg shadow-md'>
      {
        sliderData.map((slider, index) => {
          return (
            <div key={index}>
              {/* flex content */}
              <div className='flex flex-col items-center gap-10 lg:flex-row lg:justify-between p-[20px] md:p-[60px] lg:h-[450px]'>
                <div className='uppercase text-center lg:text-left'>
                  <p className='text-primary font-bold text-2xl sm:text-3xl md:text-4xl mb-16'>{slider.title}</p>
                  <Link to="/products/all" className='btn rounded-full py-3 px-12 mx-auto lg:mx-0 uppercase font-bold text-white'>{slider.btnText}</Link>
                </div>
                
                <div>
                  <img className='w-auto h-64 lg:h-auto lg:pr-20' src={slider.img} alt={`Foto de accesorio ${slider.pretitle}`} />  
                </div>       
              </div>     
            </div>
          )
        })
      }
    </Slider>
  )
}

export default MainSlider