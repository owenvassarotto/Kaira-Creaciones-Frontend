import useTestimonialsContext from "../hooks/useTestimonialsContext"
import TestimonialAdminCard from "./TestimonialAdminCard";

const TestimonialsAdminList = () => {

  const { testimonials } = useTestimonialsContext();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

  return (
    <>
      { testimonials?.length > 0 ? (
        <>
          <h2 className="font-black text-2xl text-center mb-5">Listado de opiniones</h2> 

          <p className='text-lg text-center mb-8'>Administra tus <span className='font-bold'>opiniones</span></p>

          <div className="flex flex-col gap-6">
            {testimonials?.map(testimonial => (
              testimonial.id && (
                <TestimonialAdminCard 
                  key={testimonial.id} 
                  testimonial={testimonial}
                />
              )
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center mb-8">No hay opiniones</h2> 
        
          <p className="text-center">Comienza creando una opinión y aparecerá en este lugar.</p>
        </>
      ) }
    </>
  )
}

export default TestimonialsAdminList