import axiosClient from "../config/axios";
import notify from "../helpers/showNotification";
import useCategoriesContext from "../hooks/useCategoriesContext";

const CategoryAdminCard = ({ category }) => {

  const { id, name } = category;

  const { categories, setCategories, setCategoryToUpdate } = useCategoriesContext();

  // function to delete category
  const deleteCategory = async categoryId => {
    
    const isConfirmed = confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    
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
      
      const { data } = await axiosClient.delete(`/categories/${categoryId}`, config);

      notify("success", data.message);

      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.log(error);
      notify("error", error.response.data.message);
    }
  }

  return (
    <div className="bg-white shadow-md p-5 rounded-xl flex flex-col gap-1">
        <p className="font-bold uppercase text-sm">ID: <span className="font-normal normal-case text-black">{id}</span></p> 
        <p className="font-bold uppercase text-sm">Nombre: <span className="font-normal normal-case text-black">{name}</span></p> 

        <div className="mt-2 flex justify-between gap-2">
          <button
            className="py-2 px-8 btn rounded-lg font-bold text-sm"
            onClick={() => setCategoryToUpdate(category)}
          >
            Editar
          </button>

          <button
            className="py-2 px-8 bg-red-500 hover:bg-red-600 rounded-lg font-bold text-white text-sm"
            onClick={() => deleteCategory(id)}
          >
            Eliminar
          </button>
        </div>

    </div>
  )
}

export default CategoryAdminCard