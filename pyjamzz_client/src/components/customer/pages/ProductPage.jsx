import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../../other/Loading";
import angelIcon from '../../../assets/icons/angel.svg';
import demonIcon from '../../../assets/icons/demon.svg';

import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";


function ProductPage() {
    const [product, setProduct] = useState(null);
    const [pictures, setPictures] = useState(null);
    const [loading, setLoading] = useState(true);

    //CUSTOM PAGE
    const [environment, setEnvironment] = useState(null)
    const [environmentDefined, setEnvironmentDefined] = useState(false)

    //MANAGE LOOK PICTURE
    const [currentPicture, setCurrentPicture] = useState('');
    const [openPicture, setOpenPicture] = useState(false);

    //FORM
    const [sizes, setSizes] = useState('any');
    const [sizeSelected, setSizeSelected] = useState('any');
    const [quantitySelected, setQuantitySelected] = useState(1);

    //ERROR MANAGEMENT 
    //SUBMIT
    const [successAddInCart, setSuccessAddInCart] = useState(false)
    const [sizeSelectError, setSizeSelectedError] = useState(null)
    const [quantitySelectedError, setQuantitySelectedError] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    const { productId } = useParams();
    const body = document.getElementById('body');
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        try {
            setLoading(true)
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`http://localhost:8000/product/${productId}`, { requestOptions })
                .then(response => {
                    return response.json()
                })
                .then(productData => {
                    setProduct(productData.product)
                    setSizes(productData.size)
                    if (productData.product.environment == 'ange') {
                        setEnvironment(angelIcon)
                        setEnvironmentDefined(true)
                    } else if (productData.product.environment == 'demon') {
                        setEnvironment(demonIcon)
                        setEnvironmentDefined(true)
                    }
                    setPictures(productData.pictures)
                    setCurrentPicture(productData.pictures[0].url)
                    setLoading(false)
                })
        } catch (e) {

        }
    }, [location.pathname])


    function manageOverlay() {
        setOpenPicture(!openPicture)
        if (openPicture == true) {
            body.style.overflow = "scroll"
        } else {
            body.style.position = "relative"
            body.style.overflow = "hidden"
        }
    }

    

   

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (sizeSelected == 'any') {
            setErrorMessage('Veuillez choisir une taille et choisir une quantité valide (en chiffre).')
            setSizeSelectedError('bg-red-200 border-red-500 border-2')
            return
        }
        if (quantitySelected == 0 || isNaN(quantitySelected)) {
            setErrorMessage('Veuillez choisir une taille et une quantité valide (en chiffre).')
            setQuantitySelectedError('bg-red-200 border-red-500 border-2')
            return
        }
        const id = product.id;
        const name = product.name;
        const size = sizeSelected;
        const quantity = quantitySelected;
        const picture = pictures[0].url;
        const price = product.priceTTC;
        dispatch(addToCart({id, name, size, quantity, picture, price}))
        setSuccessAddInCart(true)
        setTimeout(function(){
            setSuccessAddInCart(false)
        }, 5000)
    }

    function resetErrorForm(e) {
        e.preventDefault()
        setSizeSelectedError(null)
        setQuantitySelectedError(null)
        setErrorMessage(null)
    }

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <>

                <div onClick={manageOverlay} className={openPicture ? "fixed bg-p-black h-96 w-screen flex justify-center items-center overflow-scroll" : "hidden"} >
                    <img onClick={manageOverlay} className="absolute w-auto h-96 object-scale-down" src={currentPicture} alt="picture of article" />

                </div>
                <section className={openPicture ? "bg-p-light   w-full p-10 flex flex-col items-center justify-start pt-20" : " bg-p-light   w-full p-10 flex flex-col items-center justify-start pt-20"}>
                    <span className={product.novelty ? "inline-flex items-center m-2 px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-full text-sm font-semibold text-yellow-600 mb-10 mt-10" : "hidden"}>
                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>
                        <span className="ml-1">
                            Nouveauté
                        </span>
                    </span>
                    <div className=" w-11/12 flex flex-col items-center">
                        <img onClick={manageOverlay} className="w-full h-96 object-cover object-center mb-5 hover:cursor-pointer" src={currentPicture} alt="picture of article" />
                        <div className="w-full flex  justify-between mb-6">
                            <img className="h-28 w-3/12 object-cover hover:cursor-pointer" onClick={e => setCurrentPicture(pictures[0].url)} src={pictures[0].url} alt="picture of article" />
                            <img className="h-28 w-3/12 object-cover hover:cursor-pointer" onClick={e => setCurrentPicture(pictures[1].url)} src={pictures[1].url} alt="picture of article" />
                            <img className="h-28 w-3/12 object-cover hover:cursor-pointer" onClick={e => setCurrentPicture(pictures[2].url)} src={pictures[2].url} alt="picture of article" />
                        </div>
                    </div>
                    <div className="flex justify-between w-full ">
                        <h1 className="mb-2 text-2xl  font-semibold text-p-dark w-auto">{product.name}<img className={environmentDefined ? "w-8 h-8 " : "hidden"} src={environment} alt="" /></h1>
                        <p className="text-xl font-bold ">{product.priceTTC}€</p>
                    </div>
                    <div className="flex flex-col justify-start w-full mb-8">
                        <div className="w-full flex">
                            <p className="text-p-purple text-bold text-lg">Environemment : &ensp; </p><p className="text-lg">  {product.environment}</p>
                        </div>
                        <div className="w-full flex">
                            <p className="text-p-purple text-bold text-lg">Catégorie : &ensp; </p><p className="text-lg">  {product.category}</p>
                        </div>
                        <div className="w-full flex">
                            <p className="text-p-purple text-bold text-lg">Sous catégorie : &ensp; </p><p className="text-lg">  {product.subCategory}</p>
                        </div>
                        <div className="w-full flex">
                            <p className="text-p-purple text-bold text-lg">Couleur : &ensp; </p><p className="text-lg">  {product.color}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-11/12 border-p-purple border-2 p-4 rounded-lg">
                        <h3 className="text-lg text-p-purple font-bold">Description :</h3>
                        <p className="text-p-black leading-loose">{product.description}</p>
                    </div>
                    <form onChange={resetErrorForm} className=" w-11/12 h-auto flex flex-col items-center mt-8">
                        <p className="text-red-500 text-center">{errorMessage}</p>
                        <select onChange={e => setSizeSelected(e.target.value)} className={`${sizeSelectError} border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-75 my-4`} name="sizeSelect" id="" defaultValue={'any'}>
                            <option value={'any'}>-Choisir une taille-</option>
                            {sizes.map((element, index) => <option key={index} value={element.size}>{element.size}</option>)}
                        </select>
                        <input defaultValue={1} pattern="[0-9]{10}" min={1} onChange={e => setQuantitySelected(parseInt(e.target.value))} type='number' className={`${quantitySelectedError} border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-text hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-75 my-4 w-24`} />
                        <button onClick={handleSubmit} type='submit' className={successAddInCart ? "px-3 py-2 text-p-light bg-green-500 rounded-md transition ease-in-out delay-0 my-4" :"border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-0 my-4"}>{successAddInCart ? "Ajouté au panier !" :"Ajouter au Panier"}</button>
                    </form>
                </section>
            </>
        )
    }

}

export default ProductPage;