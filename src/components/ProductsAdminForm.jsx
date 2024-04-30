import { useEffect, useState } from 'react'
import notify from '../helpers/showNotification';
import Spinner from './Spinner';
import useProductsContext from '../hooks/useProductsContext';
import useCategoriesContext from '../hooks/useCategoriesContext';

const ProductsAdminForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [isNew, setIsNew] = useState(null);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(null);
    const [showInputFile, setShowInputFile] = useState(false);
    const [loading, setLoading] = useState(false);

    const { saveProduct, productToUpdate } = useProductsContext();
    const { categories } = useCategoriesContext();

    useEffect(() => {
        if(productToUpdate?.title){
            setTitle(productToUpdate.title);
            setDescription(productToUpdate.description);
            setPrice(productToUpdate.price);
            setCategory(productToUpdate.category_id);
            setIsNew(productToUpdate.is_new);
            setId(productToUpdate.id);
            setShowInputFile(false);
        }
    }, [productToUpdate])

    const handleSubmit = async e => {
        e.preventDefault();

        if (!title || !description || !price) {
            notify("error", "Todos los campos son obligatorios");
            return;
        }

        setLoading(true);

        await saveProduct({title, description, price, image, category_id: category, is_new: isNew, id});

        setLoading(false);

        setTitle('');
        setDescription('');
        setPrice('');
        setCategory(1);
        setIsNew(1);
        setId(null);
        setImage(null);
        setShowInputFile(false);
    }
    
  return (
    <>
        <h2 className="font-black text-2xl text-center mb-5">Administrador de productos</h2>

        <p className='text-lg text-center mb-8'>Crea tus productos y <span className='font-bold'>administralos</span></p>

        <form 
            encType='multipart/form-data'
            className='shadow-lg px-5 py-10 rounded-xl bg-white'
            onSubmit={e => handleSubmit(e)}
        >
            <div className='mb-5'>
                <label className="uppercase font-bold text-sm" htmlFor="title">Titulo del producto</label>
                <input 
                    type="text" 
                    id='title'
                    name='title'
                    placeholder='Ingresa el titulo del producto'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            
            <div className='mb-5'>
                <label className="uppercase font-bold text-sm" htmlFor="description">Descripción del producto</label>
                <textarea 
                    name="description" 
                    id="description" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none h-32'
                    placeholder='Ingresa la descripción del producto'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>

            <div className='mb-5'>
                <label className="uppercase font-bold text-sm" htmlFor="price">Precio del producto</label>
                <input 
                    type="number" 
                    id='price'
                    name='price'
                    placeholder='Ingresa el precio del producto'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={price}
                    onChange={e => setPrice(parseInt(e.target.value))}
                />
            </div>

            <div className='mb-8'>

                <label className="uppercase font-bold text-sm" htmlFor="product-image">Foto del producto</label>

                {productToUpdate?.image && showInputFile === false ? (
                    <div className="mt-4">
                        <img 
                            src={import.meta.env.VITE_BACKEND_URL + `/uploads/products/${productToUpdate.image}`} 
                            className="rounded-md w-28 mb-2"
                        />
                        <p className='text-sm w-full'>{productToUpdate.image}</p>
                        <button 
                            className='btn rounded-md font-bold p-1 text-xs mt-2'
                            onClick={() => setShowInputFile(!showInputFile)}
                        >
                                
                            Cambiar imagen
                        </button>
                    </div>
                ) : (
                    <>
                        <input 
                            type="file" 
                            id='product-image'
                            name='product-image'
                            accept="image/jpg, image/png, image/jpeg, image/webp"
                            className='border-2 w-full p-2 mt-2 rounded-md'
                            onChange={e => setImage(e.target.files[0])}
                        />
                    </>
                )}

            </div>

            <div className='mb-5'>
                <label className="uppercase font-bold text-sm block" htmlFor="category">Categoría</label>
                <select 
                    id='category'
                    name='category'
                    className='border-2 p-2 mt-2 rounded-md w-full'
                    value={category}
                    onChange={e => setCategory(parseInt(e.target.value))}
                >
                    <option value="">-- Seleccionar categoría --</option>
                    {categories?.map(item => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div> 

            <div className='mb-5'>
                <label className="uppercase font-bold text-sm block" htmlFor="isNew">¿Es nuevo?</label>
                <select 
                    id='isNew'
                    name='isNew'
                    className='border-2 p-2 mt-2 rounded-md'
                    value={isNew}
                    onChange={e => setIsNew(parseInt(e.target.value))}
                >
                    <option value="">-- Seleccionar --</option>
                    <option value="1">Si</option>
                    <option value="0">No</option>
                </select>
            </div>  

            <input 
                type="submit" 
                className='btn font-bold p-3 w-full uppercase text-sm rounded-lg'
                value={id ? "Actualizar producto" : "Crear producto"}
            />

            {loading && <div className='my-8'><Spinner /></div>}
        </form>
    </>
  )
}

export default ProductsAdminForm