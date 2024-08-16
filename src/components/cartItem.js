import React, { useState, useEffect } from 'react';
import { products } from '../products';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeFromCart } from '../stores/cart';
import { FaTrash } from 'react-icons/fa';

const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.find(product => product.id === productId);
        setDetail(findDetail);
    }, [productId]);

    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    };

    const handleDeleteItem = () => {
        dispatch(removeFromCart({ productId }));
    };

    return (
        <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-2 rounded-md'>
            <img src={detail.image} alt="" className='w-12' />
            <h3 className='flex-1 text-sm'>{detail.name}</h3>
            <p className='text-sm'>₹{detail.price * quantity}</p>
            <div className='flex items-center gap-2'>
                <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600 flex items-center justify-center' onClick={handleMinusQuantity}>-</button>
                <span>{quantity}</span>
                <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600 flex items-center justify-center' onClick={handlePlusQuantity}>+</button>
            </div>
            <button className='rounded-full w-6 h-6 text-white flex items-center justify-center' onClick={handleDeleteItem}>
                <FaTrash style={{ color: "red" }}/>
            </button>
        </div>
    );
}

export default CartItem;
