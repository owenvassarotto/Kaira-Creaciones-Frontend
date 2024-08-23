import axiosClient from "../config/axios";
import notify from "../helpers/showNotification";
import useTestimonialsContext from "../hooks/useTestimonialsContext";

const TestimonialAdminCard = ({ testimonial }) => {

  const { id, image, text_review } = testimonial;

  const { testimonials, setTestimonialToUpdate, setTestimonials } = useTestimonialsContext();

  // function to delete testimonial
  const deleteTestimonial = async testimonialId => {
    
    const isConfirmed = confirm('¿Estás seguro de que deseas eliminar esta opinión?');
    
    if(!isConfirmed) return;
    
    const token = localStorage.getItem('token_kaira_creaciones');
    if(!token) return;

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    try {
      
      const { data } = await axiosClient.delete(`/testimonials/${testimonialId}`, config);

      notify("success", data.message);

      setTestimonials(testimonials.filter(testimonial => testimonial.id !== testimonialId));
    } catch (error) {
      console.log(error);
      notify("error", error.response.data.message);
    }
  }

  return (
    <div className="bg-white shadow-md p-5 rounded-xl flex flex-col gap-1">
        <p className="font-bold uppercase text-sm">ID: <span className="font-normal normal-case text-black">{id}</span></p> 
        <div>
          <p className="font-bold uppercase text-sm mb-1">Imagen:</p> 
          <img 
            src={image} 
            className="rounded-md w-20 h-28 object-cover"
          />
        </div>
        <p className="font-bold uppercase text-sm">Opinión: <span className="font-normal normal-case text-black">{text_review}</span></p> 

        <div className="mt-2 flex justify-between gap-2">
          <button
            className="py-2 px-8 btn rounded-lg font-bold text-sm"
            onClick={() => setTestimonialToUpdate(testimonial)}
          >
            Editar
          </button>

          <button
            className="py-2 px-8 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white text-sm"
            onClick={() => deleteTestimonial(id)}
          >
            Eliminar
          </button>
        </div>

    </div>
  )
}

export default TestimonialAdminCard