import { useContext } from "react";
import TestimonialContext from "../../context/TestimonialsContext";

const useTestimonialsContext = () => useContext(TestimonialContext);

export default useTestimonialsContext;