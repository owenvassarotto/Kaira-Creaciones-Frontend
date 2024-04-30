import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import axiosClient from '../config/axios';
import notify from '../helpers/showNotification';
import useTestimonialsContext from '../hooks/useTestimonialsContext';

const TestimonialsAdminForm = () => {

    const [image, setImage] = useState(null);
    const [textReview, setTextReview] = useState('');
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInputFile, setShowInputFile] = useState(false);

    const { testimonialToUpdate, saveTestimonial } = useTestimonialsContext();

    useEffect(() => {
        if(testimonialToUpdate?.id){
            setId(testimonialToUpdate.id);
            setTextReview(testimonialToUpdate.text_review);
            setShowInputFile(false);
        }
    }, [testimonialToUpdate])

    const handleSubmit = async e => {

        e.preventDefault();

        if(textReview === ''){
            notify("error", "Completa los dos campos");
            return;
        }

        setLoading(true);
        await saveTestimonial({ id, image, text_review: textReview });
        setLoading(false);

        setId(null);
        setImage(null);
        setTextReview('');
    }

    return (
        <>
            <h2 className="font-black text-2xl text-center mb-5">Administrador de opiniones</h2>

            <p className='text-lg text-center mb-8'>Crea nuevas opiniones para Kaira Creaciones y <span className='font-bold'>administralas</span></p>

            <form 
                encType='multipart/form-data'
                className='shadow-lg px-5 py-10 rounded-xl bg-white'
                onSubmit={e => handleSubmit(e)}
            >
                <div className='mb-5'>
                    <label 
                        className="uppercase text-gray-600 block font-bold" 
                        htmlFor="testimonial-image"
                    >
                        Imagen
                    </label>

                    {testimonialToUpdate?.image && showInputFile === false ? (
                        <div className="mt-4">
                            <img 
                                src={import.meta.env.VITE_BACKEND_URL + `/uploads/testimonials/${testimonialToUpdate.image}`} 
                                className="rounded-md w-28 mb-2"
                            />
                            <p className='text-sm w-full'>{testimonialToUpdate.image}</p>
                            <button 
                                className='btn rounded-md font-bold p-1 text-xs mt-2'
                                onClick={() => setShowInputFile(!showInputFile)}
                            >
                                    
                                Cambiar imagen
                            </button>
                        </div>
                    ) : (
                        <input 
                            type="file" 
                            id='testimonial-image'
                            name='testimonial-image'
                            accept="image/jpg, image/png, image/jpeg, image/webp"
                            className='border-2 w-full p-2 mt-2 rounded-md'
                            onChange={e => setImage(e.target.files[0])}
                        />
                    )}
                </div>

                <div className='mb-5'>
                    <label 
                        className="uppercase text-gray-600 block font-bold" 
                        htmlFor="text-review"
                    >
                        Opinión
                    </label>
                    <textarea 
                        name="text-review" 
                        id="text-review" 
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl resize-none h-32'
                        placeholder='Ingresa tu opinión'
                        value={textReview}
                        onChange={e => setTextReview(e.target.value)}
                    ></textarea>
                </div>

                <input 
                    type="submit" 
                    className='btn font-bold p-3 w-full uppercase text-sm rounded-lg'
                    value={id ? "Actualizar opinión" : "Crear opinión"}
                />

                {loading && <div className='my-8'><Spinner /></div>}
            </form>
        </>
    )
}

export default TestimonialsAdminForm