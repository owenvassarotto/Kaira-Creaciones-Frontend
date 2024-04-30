import Slider from "react-slick";
import Product from './Product';
// icons
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const ProductSlider = ({ data }) => {
  
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
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
    <Slider {...settings}>
      {data?.map(product => product.is_new === 1 ?  <Product key={product.id} product={product} /> : null)}
    </Slider>
  )
}

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 -left-3 top-1/2 transform -translate-y-1/2 btn p-1 rounded-full"
      onClick={onClick}
    >
      <IoIosArrowRoundBack className='text-3xl text-white' />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 -right-3 top-1/2 transform -translate-y-1/2 btn p-1 rounded-full"
      onClick={onClick}
    >
      <IoIosArrowRoundForward className='text-3xl text-white' />
    </button>
  );
};


export default ProductSlider