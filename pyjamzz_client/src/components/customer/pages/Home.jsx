import { Link } from "react-router-dom";
import NavbarDesktop from "../partials/navbar/NavbarDesktop";
import NavbarMobile from "../partials/navbar/NavbarMobile/NavbarMobile";
import demonIcon from '../../../assets/icons/demon.svg';
import angelIcon from '../../../assets/icons/angel.svg';
import { useEffect } from "react";


function Home(){


    return(
        <div className="bg-p-light">
            {/* <NavbarDesktop/> */}
            <NavbarMobile/>
            <section className="bg-home-background bg-cover bg-center w-full h-[500px] flex flex-col items-center justify-center">
                    <div className="w-3/5 p-7 h-auto flex flex-col justify-center items-center backdrop-blur-xl rounded-lg ">
                        <h1 className="text-center text-xl mt-5 text-white font-[900] drop-shadow-lg">Pyjam’Zz, aux côtés des rêves de toutes les femmes.</h1>
                    </div>
            </section>
            <section className="mt-10 w-full flex flex-col items-center">
                <p className="text-3xl font-[800] mb-4">Tu es plutôt...</p>
                <Link to='/client/nos-produits/ange' className="w-3/4 h-32 bg-p-angel-dark flex items-center justify-around rounded-lg shadow-lg shadow-p-angel-dark">
                    <h3 className="text-3xl text-white font-bold">Ange</h3>
                    <img className="h-4/5" src={angelIcon} alt="" />
                </Link>
                <p className="text-3xl font-[800] mb-4 mt-4">ou...</p>
                <Link to='/client/nos-produits/demon' className="w-3/4 h-32 bg-p-demon-dark flex items-center justify-around rounded-lg shadow-md shadow-p-demon-dark">
                    <img className="h-4/5" src={demonIcon} alt="" />
                    <h3 className="text-3xl text-white font-bold">Démon</h3>
                </Link>
            </section>
        </div>
    )
}

export default Home;