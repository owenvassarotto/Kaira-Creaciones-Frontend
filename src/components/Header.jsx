//logo img 
import Logo from "../img/Logo_Kaira.png";
// icons
import { SlBag } from "react-icons/sl";
import { HiMenu, HiUserCircle } from "react-icons/hi";
// components 
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { useState } from "react";
// context
import useCartContext from "../hooks/useCartContext";
import useAuthContext from "../hooks/useAuthContext";
import useCategoriesContext from "../hooks/useCategoriesContext";
// useParams hook
import { useParams } from "react-router-dom"

const Header = () => {

  const {isOpen, setIsOpen, itemsAmount} = useCartContext();
  const { categories } = useCategoriesContext();
  const { auth, logout } = useAuthContext();

  const [navbarVisible, setNavbarVisible] = useState(false);

  // If the ID exists, it means the user has searched for a specific category.
  const { id } = useParams();

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <header className="bg-primary py-3 fixed lg:relative mb-[30px] w-full top-0 z-40">
        <div className="container mx-auto">
          <div className="flex flex-row gap-4 items-center justify-between lg:mb-0">

            {/* logo */}
            <Link to={"/"}>
              <img src={Logo} alt="Logotipo" className="w-[110px] xl:w-[160px]" />
            </Link>

            <div className="w-full hidden lg:flex lg:justify-center lg:gap-x-16">
                {categories?.map(category => {
                    return (
                        <Link 
                            to={`/products/${category.id}`} 
                            className={`uppercase cursor-pointer text-white font-semibold text-sm ${id && id == category.id && 'border-b-2'}`}
                            key={category.id}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </div>

            <div className="flex items-center gap-4">

              {/* cart icon */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative cursor-pointer text-white"
                >
                <SlBag className="text-2xl" />
                {/* amount */}
                <p className="bg-secondary text-black absolute w-[18px] h-[18px] rounded-full top-3 -right-1 text-[13px] flex justify-center items-center font-bold tracking-[-0.1em]">{itemsAmount}</p>
              </button>

              {!auth?.email ? (
                <Link to={'/login'} className="text-white">
                  <span className='whitespace-nowrap font-semibold'>Iniciar sesión</span>
                </Link>
              ) : (
                <div className="relative">
                  <button 
                    className="flex gap-1 items-center border hover:shadow-sm py-2 px-3 rounded-full bg-white whitespace-nowrap"
                    onClick={toggleNavbar}
                  >
                    <HiMenu className="text-primario text-xl" />
                    <HiUserCircle className="text-2xl text-secundario" />
                    <span className='text-xs font-bold'>{(auth.name).split(' ')[0]}</span>
                  </button>

                  {navbarVisible && (
                    <div className="bg-white shadow p-4 rounded-lg absolute right-0 w-full mt-4 z-40 whitespace-nowrap">
                      <nav>
                        <ul className="flex flex-col gap-3 text-xs font-semibold">
                          {auth?.is_admin ? (
                            <li className="font-bold uppercase text-[10px]">
                              <Link to={'/admin'}>Admin Panel</Link>
                            </li>
                          ) : null}
                          <li>
                            <Link to={'/user/orders'}>Mis ordenes</Link>
                          </li>
                          <li>
                            <Link to={'/user/profile'}>Mi perfil</Link>
                          </li>
                          <li>
                            <button
                              onClick={logout}
                            >
                              Cerrar sesión
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* cart */}
            <div 
              className={`${isOpen ? 'right-0' : '-right-full'} bg-white shadow-xl fixed top-0 bottom-0 w-full z-50 md:max-w-[500px] transition-all duration-300`}
            >
              <Cart />
            </div>
          </div>

          <div className="w-full flex justify-center gap-x-8 mt-4 text-center flex-wrap lg:hidden">
              {categories?.map(category => {
                  return (
                      <Link 
                          to={`/products/${category.id}`} 
                          className={`uppercase cursor-pointer text-white font-semibold text-sm ${id && id == category.id && 'border-b-2'}`}
                          key={category.id}
                      >
                          {category.name}
                      </Link>
                  );
              })}
          </div>
        </div>
    </header>
  )
}

export default Header