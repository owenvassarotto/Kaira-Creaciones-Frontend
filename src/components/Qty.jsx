// context
import useCartContext from '../hooks/useCartContext';

const Qty = ({ item }) => {

    const { handleInput, handleSelect } = useCartContext();

  return (
    <div>
        {item.amount < 10 ? (
            <select 
                onChange={(e) => handleSelect(e, item.id)}
                value={item.amount}
                className='p-2 rounded-lg w-[100px] h-10 outline-none text-primary bg-secondary'
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">+10</option>
            </select>
        ) : (
            <input 
                onBlur={e => handleInput(e, item.id)}
                min={1}
                type='number' 
                placeholder={`${item.amount}`} 
                className='text-primary placeholder-primary h-10 rounded-md p-4 w-[100px] outline-none bg-secondary'
            />
        )}
    </div>
  )
}

export default Qty