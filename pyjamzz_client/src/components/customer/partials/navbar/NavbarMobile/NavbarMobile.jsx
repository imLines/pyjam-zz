import { Link } from 'react-router-dom';
import logo from '../../../../../assets/logo-pyjamzz.svg';
import search from '../../../../../assets/icons/search.svg';
import bagLogo from '../../../../../assets/icons/bag-shop.svg';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import './hamburgerAnimation.css';
import SearchComponent from '../../search/SearchComponent';



function NavbarMobile() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [hamburgerClass, setHamburgerClass] = useState('menu flex');
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [searchActive, setSearchActive] = useState(false)
    
    const cart = useSelector((state) => state.cart);
    
    useEffect(()=>{
        try{
            let totalInCart = 0;
            cart.map((element)=>{
                totalInCart = totalInCart + element.quantity;
            })
            setQuantityInCart(totalInCart)
        }catch(e){
            console.log(e)
        }
    }, [cart])

    function changeHamburgerVisibility() {
        setNavbarOpen(!navbarOpen);
        if(hamburgerClass == 'menu flex'){
            setHamburgerClass('menu flex opened ')
        }else{
            setHamburgerClass('menu flex')
        }
    }

    function closeHamburgerWhenNav(){
        setNavbarOpen(false)
        setHamburgerClass('menu flex')
    }

    function changeSearchVisibility(){
        setSearchActive(!searchActive)
    }



    return (
        <>
            <header className='relative z-30'>
                <div className='w-full h-20 p-5 flex justify-between fixed bg-white'>
                    <Link to='/'><img className='h-full w-14' src={logo} /></Link>
                    <div className='w-2/5 flex justify-around items-center'>
                        <div onClick={changeSearchVisibility}>
                            <img className='h-8' src={search} />
                            
                        </div>
                        <Link className='relative h-8' onClick={e=>closeHamburgerWhenNav()}  to='/client/panier'>
                            <img className='h-full' src={bagLogo} />
                            <div className={quantityInCart == 0 ? 'hidden':'absolute bottom-0 right-0 bg-p-purple rounded-full h-5 w-5 flex items-center justify-center'}>
                                <p className='text-p-light text-sm'>{quantityInCart}</p>
                            </div>
                        </Link>
                        <input className="hidden" id='toggle' type="checkbox" />
                        <label className='' htmlFor="toggle"
                            onClick={changeHamburgerVisibility}>
                            <button
                                className={`${hamburgerClass}`} 
                                onClick={(event) => {
                                    event.currentTarget.setAttribute('aria-expanded', event.currentTarget.classList.contains('opened'));
                                }}
                                aria-label="Main Menu">
                                <svg className='h-12 w-12' width="100" height="100" viewBox="0 0 100 100">
                                    <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                    <path className="line line2" d="M 20,50 H 80" />
                                    <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                                </svg>
                            </button>
                        </label>
                    </div>
                </div>
            </header>
                <Navigation  isOpen={navbarOpen} changeHamburgerVisibility={changeHamburgerVisibility} />
                <SearchComponent isOpen={searchActive} setSearchActive={setSearchActive} />
        </>
    )


}
export default NavbarMobile;