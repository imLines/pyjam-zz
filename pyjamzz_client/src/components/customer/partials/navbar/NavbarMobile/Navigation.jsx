import { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './hamburgerAnimation.css';

function Navigation({isOpen, changeHamburgerVisibility}){
    const [isConnected, setIsConnected] = useState(false);

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

    let activeStyle = "text-white text-lg underline";

    let noActiveStyle= "text-white text-lg";
    

    if(isConnected){
        return (
            <>
                <nav  className={` ${ isOpen ? 'bg-p-purple h-full fixed w-full flex items-start justify-center mt-20 z-30' : 'hidden'}`}>
                    <ul className="h-3/5 flex flex-col items-center justify-around ">
                        
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/'>Accueil</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/nos-produits'>Nos produits</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/nos-produits/ange' >Partie Ange</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/nos-produits/demon' >Partie Démon</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility}  >Accessoires</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility}  >A propos</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility}  >FAQ</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/mon-compte' >Mon compte</NavLink></li>
                        <li><NavLink onClick={e=>logout(e)}  className="text-white text-lg">Me déconnecter</NavLink></li>
                    </ul>
                </nav> 
            </>
        )
    }else{
        return (
            <>
                <nav  className={` ${ isOpen ? 'bg-p-purple h-full fixed w-full flex items-start justify-center mt-20 z-30' : 'hidden'}`}>
                    <ul className="h-3/5 flex flex-col items-center justify-around ">
                        
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/'>Accueil</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/nos-produits'>Nos produits</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/nos-produits/ange'>Partie Ange</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/nos-produits/demon'>Partie Démon</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility}  >Accessoires</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility}  >A propos</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility}  >FAQ</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/inscription'>Créer un compte</NavLink></li>
                        <li><NavLink onClick={changeHamburgerVisibility} end className={({ isActive }) =>isActive ? activeStyle : noActiveStyle} to='/client/connexion'>Me connecter</NavLink></li>
                    </ul>
                </nav> 
            </>
        )

    }

}

export default Navigation;  