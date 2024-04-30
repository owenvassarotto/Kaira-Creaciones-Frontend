import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import notify from '../helpers/showNotification';
import axiosClient from '../config/axios';
import useTestimonialsContext from '../hooks/useTestimonialsContext';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert';

const CreateTestimonial = () => {

  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [textReview, setTextReview] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});

  const { testimonials, setTestimonials } = useTestimonialsContext();

  useEffect(() => {
    const checkToken = async () => {

      setLoading(true);

      try {
          await axiosClient(`/testimonials/${token}`);

          setValidToken(true);
      } catch (error) {
          setLoading(false);
          setAlert({
              msg: error.response.data.message,
              error: true,
              autoClose: false,
          })
      }
      setLoading(false);
  }
  checkToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if([image, textReview].includes('' || null)){
      notify("error", "Debes completar los dos campos");
      return;
    }

    setLoading(true);
    try {

      const formData = new FormData();
      formData.append('testimonial-image', image);
      formData.append('text_review', textReview);

      const { data } = await axiosClient.put(`/testimonials/${token}`, formData);

      setTestimonials([...testimonials, data.newTestimonial]);

      notify("success", data.message);

      setTextReview('');
    } catch (error) {
      console.log(error);
      notify("error", error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className='mt-32 lg:mt-10 container mx-auto'>
      <h1 className='h2 font-bold text-center mb-4'>Crear Opinión</h1>

      <p className='text-center text-black mb-6'>Crea tu opinión para <span className='text-primary font-semibold'>Kaira Creaciones aquí</span></p>

      {/* form */}
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          {validToken ? (
            <form
              encType='multipart/form-data'
              onSubmit={e => handleSubmit(e)}
            >
              <div className='my-3'>
                <label 
                  className="uppercase text-gray-600 block font-bold" 
                  htmlFor="testimonial-image"
                >
                  Tu foto
                </label>
                <input 
                  type="file" 
                  id='testimonial-image'
                  name='testimonial-image'
                  accept="image/jpg, image/png, image/jpeg, image/webp"
                  className='border-2 w-full p-2 mt-2 rounded-md'
                  onChange={e => setImage(e.target.files[0])}
                />
              </div>

              <div className='my-3'>
                  <label 
                    className="uppercase text-gray-600 block font-bold" 
                    htmlFor="text-review"
                  >
                    Tu opinión
                  </label>
                  <textarea 
                      name="text-review" 
                      id="text-review" 
                      className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl resize-none h-32'
                      placeholder='Ingresa tu opinión'
                      onChange={e => setTextReview(e.target.value)}
                  ></textarea>
              </div>

              <input 
                type="submit" 
                className='btn uppercase px-2 py-3 rounded-lg font-bold w-full'  
                value="Crear opinión"
              />

              {loading && <div className='my-8'><Spinner /></div>}
            </form>
          ) : (
            loading === true ? <div className='my-8'><Spinner /></div> : loading === false ? <Alert alert={alert} /> : null
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateTestimonial