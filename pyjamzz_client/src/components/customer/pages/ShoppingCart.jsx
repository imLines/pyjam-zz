import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeItem } from '../../../redux/cartSlice';
import Loading from '../../other/Loading';
import crossIcon from '../../../assets/icons/cross.svg'

function ShoppingCart() {
    const [totalAmount, setTotalAmount] = useState(0);

    const [loading, setLoading] = useState(true);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            if (cart.length != 0) {
               getTotalAmount()
            }else{
                setTotalAmount(0)
            }
            
            setLoading(false)

        } catch (e) {
            console.log(e)
        }
    }, [cart])

    function getTotalAmount() {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            let totalAmountInOneId = cart[i].quantity * cart[i].price
            total = total + totalAmountInOneId
        }
        setTotalAmount(total.toFixed(2))
    }

    function deleteItem(item){
        dispatch(removeItem(item))
        getTotalAmount()
    }

    function removeQuantity(item) {
        dispatch(decrementQuantity(item))
        getTotalAmount()
    }


    function addQuantity(item) {
        dispatch(incrementQuantity(item))
        getTotalAmount()
    }

    if (loading) {
        return <Loading />
    } else if (cart.length == 0) {
        return (
            <section className="mt-24 absolute bg-p-light min-h-full w-full flex flex-col items-center p-6">
                <h1 className="text-2xl font-[900] mb-16">Panier</h1>
                <p>Votre panier est vide.</p>
            </section>
        )
    } else {
        return (
            <section className="mt-24 absolute bg-p-light min-h-screen w-full flex flex-col items-center p-4">
                <h1 className="text-2xl font-[900] mb-16">Panier</h1>
                <div className="flex flex-col w-full items-center lg:flex-row lg:justify-around">
                    <div className="w-full  flex flex-col items-center lg:w-2/3">

                        {cart?.map((item, index) => {
                            return (
                                <div className='relative w-full h-36 flex p-1 mb-8 bg-p-purple/30 justify-between items-center' key={index}>
                                    <img className='w-3/6 h-36 object-scale-down' src={item?.picture} alt="picture of product" />
                                    <div className='flex flex-col w-3/6'>
                                        <p className='w-full h-full text-p-purple text-md flex flex-nowrap'>{item?.name}</p>
                                        <p className='text-p-black text-sm'>{item.price}€</p>
                                        <div className='flex'>
                                            <p className='text-p-black text-sm'>Taille : &nbsp;</p>
                                            <p className='text-p-black text-sm'>{item?.size}</p>
                                        </div>
                                        <p className='text-p-black text-sm'>Quantité : </p>
                                        <div className='flex items-center '>
                                            <button className='text-p-purple mr-1 text-2xl' onClick={e => removeQuantity(item)}>-</button>
                                            <p className='text-p-black text-sm'>{item.quantity}</p>
                                            <button className='text-p-purple m-1 text-2xl' onClick={e => addQuantity(item)}>+</button>
                                        </div>
                                        <img onClick={ e=> deleteItem(item)} className='w-6 h-6 absolute right-1 top-1' src={crossIcon} alt="supprimer" />

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full bg-green-200 flex  items-center justify-between lg:w-1/3">
                        <p>Total (hors livraison) </p>
                        <p>{ totalAmount } €</p>
                    </div>
                </div>
            </section>
        )
    }

}

export default ShoppingCart;