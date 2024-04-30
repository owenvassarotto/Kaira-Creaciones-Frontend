import { createContext, useEffect, useState } from "react";
import axiosClient from "../src/config/axios";
import notify from "../src/helpers/showNotification";

const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {

    const [testimonials, setTestimonials] = useState([]);
    const [testimonialToUpdate, setTestimonialToUpdate] = useState(null);

    useEffect(() => {
        const getTestimonials = async () => {
            try {
                const {data} = await axiosClient('/testimonials');

                setTestimonials(data);
            } catch (error) {
                console.log(error);
            }
        }
        getTestimonials();
    }, [])

    const saveTestimonial = async (testimonial) => {

        const formData = new FormData();
        formData.append('testimonial-image', testimonial.image);
        formData.append('text_review', testimonial.text_review);

        const token = localStorage.getItem('token_kaira_creaciones');
        if(!token) return;

        const config = {
            // The condition selects the appropriate Content-Type based on testimonial.id and testimonial.image. For editing with no new image, it's "application/json", else it's "multipart/form-data". This ensures accurate data transmission in the request.
            headers: {
                "Content-Type": testimonial.id && testimonial.image === null ? "application/json" : "multipart/form-data",
                "Authorization": "Bearer " + token
            }
        }

        if(testimonial.id){
            // update testimonial
            try {

                let requestData;
                if (testimonial.id && testimonial.image === null) {
                    requestData = testimonial; // Use 'testimonial' as JSON data
                } else {
                    requestData = formData; // Use 'formData' as FormData
                }

                const { data } = await axiosClient.put(`/testimonials/admin/${testimonial.id}`, requestData, config);
                
                notify("success", data.message);
                
                const updatedTestimonial = data.updatedTestimonial;

                setTestimonials(testimonials.map(testimonial => testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial ));
                
                setTestimonialToUpdate({});

            } catch (error) {
                notify("error", error.response.data.message);
            }
        }else{
            // create new testimonial
            try {
    
                const { data } = await axiosClient.post('/testimonials', formData, config);
                
                notify("success", data.message);
    
                // add the new testimonial to the state
                const newTestimonial = data.newTestimonial;
    
                setTestimonials([...testimonials, newTestimonial]);
    
            } catch (error) {
                console.log(error);
                notify("error", error.response.data.message);
            }
        }
    }

    return (
        <TestimonialContext.Provider
            value={{
                testimonials,
                setTestimonials,
                testimonialToUpdate,
                setTestimonialToUpdate,
                saveTestimonial,
            }}
        >
            {children}
        </TestimonialContext.Provider>
    )

}

export default TestimonialContext;