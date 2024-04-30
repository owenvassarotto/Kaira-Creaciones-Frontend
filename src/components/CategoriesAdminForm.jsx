import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import useCategoriesContext from '../hooks/useCategoriesContext';
import axiosClient from '../config/axios';
import notify from '../helpers/showNotification';

const CategoriesAdminForm = () => {

    const [name, setName] = useState('');
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);

    const { categoryToUpdate, categories, setCategories } = useCategoriesContext();

    useEffect(() => {
        if(categoryToUpdate?.id){
            setId(categoryToUpdate.id);
            setName(categoryToUpdate.name);
        }
    }, [categoryToUpdate])

    const handleSubmit = async e => {

        e.preventDefault();

        const token = localStorage.getItem('token_kaira_creaciones');
        if(!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }
        
        if(id){
            // update category
            setLoading(true);
            try {
                const { data } = await axiosClient.put(`/categories/${id}`, { name }, config);
                notify("success", data.message);
                setCategories(categories.map(category => category.id === id ? data.updatedCategory : category))
                setId(null);
                setName('');
            } catch (error) {
                console.log(error);
                notify("error", error.response.data.message);
                setLoading(false);
            }
            setLoading(false);
        }else{
            // create new category
            setLoading(true);
            try {
                const { data } = await axiosClient.post('/categories', { name }, config);
                notify("success", data.message);
                setCategories([...categories, data.newCategory ]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                setName('');
            } catch (error) {
                console.log(error);
                notify("error", error.response.data.message);
                setLoading(false);
            }
            setLoading(false);
        }
    }

    return (
        <>
            <h2 className="font-black text-2xl text-center mb-5">Administrador de categorías</h2>

            <p className='text-lg text-center mb-8'>Crea las categorías de tus productos <span className='font-bold'>administralas</span></p>

            <form 
                className='shadow-lg px-5 py-10 rounded-xl bg-white'
                onSubmit={e => handleSubmit(e)}
            >
                <div className='mb-5'>
                    <label className="uppercase font-bold text-sm" htmlFor="name">Nombre de la categoría</label>
                    <input 
                        type="text" 
                        id='name'
                        name='name'
                        placeholder='Ingresa el nombre de la categoría'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    className='btn font-bold p-3 w-full uppercase text-sm rounded-lg'
                    value={id ? "Actualizar categoría" : "Crear categoría"}
                />

                {loading && <div className='my-8'><Spinner /></div>}
            </form>
        </>
    )
}

export default CategoriesAdminForm