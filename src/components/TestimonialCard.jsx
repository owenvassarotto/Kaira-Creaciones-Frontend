// iconw
import { BiSolidQuoteAltRight } from "react-icons/bi";

const TestimonialCard = ({ data }) => {

  return (
    <div className='bg-secondary w-full h-[450px] p-4 rounded-md my-2'>
        {/* img with icon */}
        <div className='w-full flex flex-col items-center'>
            <img 
                className='w-full h-[310px] rounded-md object-cover'
                src={data.image} 
                alt="Foto de testimonio" 
            />
            
            {/* quote icon */}
            <div className='bg-primary text-white p-3 rounded-full inline-block -m-6'>
                <BiSolidQuoteAltRight className='text-2xl' />
            </div>
        </div>

        {/* testimonial text */}
        <div className='mt-12'>
            <p className='font-semibold text-center text-primary'>{data.text_review}</p>
        </div>
    </div>
  )
}

export default TestimonialCard