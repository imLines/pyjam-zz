import { Link } from "react-router-dom";
import demonIcon from '../../../assets/icons/demon.svg';
import angelIcon from '../../../assets/icons/angel.svg';

function AllProducts(){
    return(
        <section className="flex flex-col items-center pt-24 bg-p-light">
            <h1 className="text-2xl font-[900] mb-16">Nos Produits</h1>
            <section className=" w-full flex flex-col items-center">
            <Link to='/client/nos-produits/nouveautes' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-novelty bg-cover bg-center">
                    <h3 className="text-xl text-white font-bold">Les Nouveautés</h3>
                </Link>
                <Link to='/client/nos-produits/ange' className="w-3/4 h-32 mb-10 bg-p-angel-dark flex items-center justify-around rounded-lg shadow-lg shadow-p-angel-dark">
                    <h3 className="text-xl text-white font-bold">Rayon Ange</h3>
                    <img className="h-3/5" src={angelIcon} alt="angel-icon" />
                </Link>
                <Link className="w-3/4 h-32 mb-10 bg-p-demon-dark flex items-center justify-around rounded-lg shadow-md shadow-p-demon-dark">
                    <h3 className="text-xl text-white font-bold">Rayon Démon</h3>
                    <img className="h-3/5" src={demonIcon} alt="demon-icon" />
                </Link>
                <Link className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-accessories bg-cover bg-center">
                    <h3 className="text-xl text-white font-bold">Rayon Accessoires</h3>
                </Link>
            </section>
        </section>
    )
};

export default AllProducts;