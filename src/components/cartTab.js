import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './cartItem.js';
import { products } from '../products';
import { toggleStatusTab } from '../stores/cart';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();

    const totalAmount = carts.reduce((total, item) => {
        const product = products.find(product => product.id === item.productId);
        if (product) {
            return total + product.price * item.quantity;
        }
        return total;
    }, 0);

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    };

    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
        transform transition-transform duration-500
        ${statusTab === false ? "translate-x-full" : ""}
        `}>
            <div className='p-5 text-white text-2xl flex justify-between items-center'>
                <h2>Shopping Cart</h2>
                <button className='text-white' onClick={handleCloseTabCart}>
                    &times;
                </button>
            </div>
            <div className='p-5 overflow-y-auto'>
                {carts.map((item, key) => 
                    <CartItem key={key} data={item}/>
                )}
            </div>
            <div className='p-5 flex justify-between items-center'>
                <span className='text-white text-lg font-semibold'>Total:</span>
                <span className='text-amber-600 text-lg font-semibold'>₹{totalAmount.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default CartTab;
