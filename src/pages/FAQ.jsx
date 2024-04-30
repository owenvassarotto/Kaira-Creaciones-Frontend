import LogoImage from "../img/Icon_Kaira.png";

const FAQ = () => {
  return (
    <div className="container mx-auto mt-36 lg:mt-0">
        <h2 className='text-primary bg-secondary shadow-md uppercase text-xl py-2 font-bold mb-6 text-center xl:pl-5 xl:text-left'>Preguntas frecuentes</h2>

        {/* text */}
        <div className='flex gap-36 mt-10'>
            <div className="lg:w-3/4">
                <h2 className="mb-3"><strong>¿Cómo comprar?</strong></h2>
                <p className="mb-6">Para comprar nos envías un mensaje a la cuenta de Instagram o al correo electrónico, detallando el modelo seleccionado; nosotras te proporcionamos los medios de facturación y una vez realizado el pago, se prepara tu pedido para poder retirarlo.</p>

                <h2 className="mb-3"><strong>Puntos de retiro</strong></h2>
                <p className="mb-6">Avenida España 724 (con coordinación, ya que no tenemos local con vista al público)</p>

                <h2 className="mb-3"><strong>Cuidado de las joyas</strong></h2>
                <p className="mb-6">Debes manipular los accesorios con cuidado y guardarlos en lugares rígidos. Puedes limpiarlos usando un algodón con quitaesmalte o alcohol.</p>

                <h2 className="mb-3"><strong>¿De qué material están hechos?</strong></h2>
                <p className="mb-6">Están hechos de arcilla polimérica (compuesta de PVC, pigmentos de colores y un aceite plastificante).</p>

                <h2 className="mb-3"><strong>¿Son hipoalergénicos?</strong></h2>
                <p className="mb-6">Claro, los topes, argollas y collares son de acero quirúrgico.</p>

                <h2 className="mb-3"><strong>¿Son livianos?</strong></h2>
                <p className="mb-6">Son súper livianos, lo máximo que puede llegar a pesar un par de aros son 10 gramos.</p>

                <h2 className="mb-3"><strong>Cambios o devoluciones</strong></h2>
                <p className="mb-6">En el caso de haber alguna falla en un lapso de 24 horas, el accesorio tiene cambio o devolución.</p>

                <p>Si tienes otra consulta, puedes contactarnos directamente en Instagram <a className="font-semibold" href="https://www.instagram.com/kaira.mdz" target="_blank">@kaira.mdz</a> o enviarnos un correo electrónico a <a  className="font-semibold" href="mailto:mdz.kaira@gmail.com" target="_blank">mdz.kaira@gmail.com</a>.</p>
            </div>

            {/* logo image */}
            <div className="hidden lg:w-1/4 lg:flex lg:items-center lg:justify-center">
                <img src={LogoImage} alt="logo" />
            </div>
        </div>
    </div>
  )
}

export default FAQ