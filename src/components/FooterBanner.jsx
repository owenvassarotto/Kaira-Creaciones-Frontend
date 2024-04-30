import { Link } from "react-router-dom";
import FooterBannerImage from "../img/aros.jpg";

const FooterBanner = () => {
  return (
    <div className='bg-secondary shadow-lg p-10'>
      <div className="container mx-auto flex flex-col items-center lg:items-start lg:flex-row gap-14 lg:gap-20 lg:justify-evenly">
        {/* text and button */}
        <div>
          <p className='font-semibold text-xl lg:text-2xl text-center lg:w-[602px] lg:text-right mb-12'>Explora nuestra colección de accesorios hoy mismo y descubre las piezas que te harán brillar con confianza, ya sean aros, collares o pulseras. ¡Gracias por elegirnos para formar parte de tu estilo único y auténtico!</p>

          <div className="flex justify-center lg:justify-end">
            <Link 
              to="/products/all"
              className='btn py-3 px-16 rounded-full uppercase font-bold text-white'
            >
              Conocélos
            </Link>
          </div>
        </div>
        
        {/* image */}
        <div className="w-72">
          <img className="rounded-lg w-full h-72 object-cover" src={FooterBannerImage} />
        </div>
      </div>
    </div>
  )
}

export default FooterBanner