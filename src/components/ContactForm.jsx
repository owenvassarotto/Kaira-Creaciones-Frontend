import { useState } from "react";
import LogoImage from "../img/Icon_Kaira.png";
import notify from "../helpers/showNotification";
import Spinner from "./Spinner";
import axiosClient from '../config/axios';

const ContactForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        if([name, email, phoneNumber, message].includes('')){
            notify("error", "Completa todos los campos");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axiosClient.post('/contact', { name, email, phone_number: phoneNumber, message });
            notify("success", data.message);

            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
        } catch (error) {
            console.log(error);
            notify("error", error.response.data.message);
            setLoading(false);
        }
        setLoading(false);
    }
    
  return (
    <div className="container mx-auto flex justify-around gap-4 mb-14">
        <div>
            <h2 className="text-primary font-bold text-2xl mb-7 text-center">Si tenes alguna duda o queres algún modelo personalizado <span className="block">¡háblanos!</span></h2>

            <form 
                className="w-full flex flex-col gap-4"
                onSubmit={e => handleSubmit(e)}
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full">
                        <label className="hidden" htmlFor="name">Nombre completo</label>
                        <input 
                            className="border-2 border-primary rounded-md w-full p-2 placeholder:text-primary" 
                            placeholder="Nombre completo" 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <label className="hidden" htmlFor="email">Correo electrónico</label>
                        <input 
                            className="border-2 border-primary rounded-md w-full p-2 placeholder:text-primary" 
                            placeholder="Correo electrónico" 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="hidden" htmlFor="cel">Número de teléfono</label>
                    <input 
                        className="border-2 border-primary rounded-md w-full p-2 placeholder:text-primary" 
                        placeholder="Número de teléfono" 
                        type="cel" 
                        id="cel" 
                        name="cel" 
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div>
                    <label className="hidden" htmlFor="message">Mensaje</label>
                    <textarea 
                        className="border-2 border-primary rounded-md w-full p-2 placeholder:text-primary resize-none h-[120px]" 
                        name="message" 
                        id="message" 
                        placeholder="Mensaje"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    >
                    </textarea>                    
                </div>

                <input 
                    type="submit" 
                    value="Enviar" 
                    className="bg-secondary p-3 font-bold shadow-md cursor-pointer text-xl hover:shadow-lg transition-all"
                />

                {loading && <div className='my-8'><Spinner /></div>}
            </form>
        </div>

        {/* logo image */}
        <div className="w-72 hidden lg:flex lg:items-center">
            <img src={LogoImage} alt="" />
        </div>
    </div>
  )
}

export default ContactForm