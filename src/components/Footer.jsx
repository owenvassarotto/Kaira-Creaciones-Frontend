import { Link } from "react-router-dom";
import { GrInstagram } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 absolute bottom-0 w-full">

      <div className="flex flex-col items-center justify-center mb-5 gap-3">
        <Link 
          to={"/faq"}
          className="font-semibold text-primary text-lg underline hover:scale-105"
        >
          Preguntas frecuentes
        </Link>

        <div className="flex items-center gap-3">
          <a className="text-2xl" href="https://www.instagram.com/kaira.mdz" target="_blank"><GrInstagram /></a>
          <a  href="mailto:mdz.kaira@gmail.com" target="_blank" className="text-3xl"><MdOutlineEmail /></a>
        </div>
      </div>

      <p className="bg-primary p-2 text-center text-white text-sm font-medium">
        &copy; {year} Kaira Creaciones. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer