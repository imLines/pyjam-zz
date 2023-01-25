import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './hamburgerAnimation.css';

function Navigation({isOpen, changeHamburgerVisibility}){
    const [isConnected, setIsConnected] = useState(false)

    const navigateTo = useNavigate();

    useEffect(()=>{
        try{
            const token = localStorage.getItem('token');
            if(token == null){
                return
            }else{
                setIsConnected(true)
            }
        }catch(e){
            console.log(e)
        }
    }, [])

    function logout(e){
        e.preventDefault();
        localStorage.removeItem('token');
        setIsConnected(false)
        navigateTo('/');
        changeHamburgerVisibility();
    }

    if(isConnected){
        return (
            <>
                <nav  className={` ${ isOpen ? 'bg-p-purple h-full fixed w-full flex items-start justify-center mt-20 z-30' : 'hidden'}`}>
                    <ul className="h-3/5 flex flex-col items-center justify-around ">
                        
                        <li><Link onClick={changeHamburgerVisibility} to='/' className="text-white text-lg ">Accueil</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/nos-produits' className="text-white text-lg">Nos produits</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/nos-produits/ange' className="text-white text-lg">Partie Ange</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/nos-produits/demon' className="text-white text-lg">Partie Démon</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} className="text-white text-lg">Accessoires</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} className="text-white text-lg">A propos</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} className="text-white text-lg">FAQ</Link></li>
                        <li><Link onClick={e=>logout(e)}  className="text-white text-lg">Me déconnecter</Link></li>
                    </ul>
                </nav> 
            </>
        )
    }else{
        return (
            <>
                <nav  className={` ${ isOpen ? 'bg-p-purple h-full fixed w-full flex items-start justify-center mt-20 z-30' : 'hidden'}`}>
                    <ul className="h-3/5 flex flex-col items-center justify-around ">
                        
                        <li><Link onClick={changeHamburgerVisibility} to='/' className="text-white text-lg ">Accueil</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/nos-produits' className="text-white text-lg">Nos produits</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/nos-produits/ange' className="text-white text-lg">Partie Ange</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/nos-produits/demon' className="text-white text-lg">Partie Démon</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} className="text-white text-lg">Accessoires</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} className="text-white text-lg">A propos</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} className="text-white text-lg">FAQ</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/inscription' className="text-white text-lg">Créer un compte</Link></li>
                        <li><Link onClick={changeHamburgerVisibility} to='/client/connexion' className="text-white text-lg">Me connecter</Link></li>
                    </ul>
                </nav> 
            </>
        )

    }

}

export default Navigation;  