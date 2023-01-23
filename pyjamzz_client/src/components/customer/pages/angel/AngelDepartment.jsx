import { Link } from "react-router-dom";
import angelIcon from '../../../../assets/icons/angel.svg';


function AngelDepartment() {
    return (
        <>
            <section className="flex flex-col items-center bg-p-light min-h-screen pt-5">
                <h1 className="text-2xl font-[900] mb-16 flex"><img className="w-8 h-8" src={angelIcon} alt="angel icon" />Rayon Ange<img className="w-8 h-8" src={angelIcon} alt="angel icon" /></h1>
                <section className=" w-full flex flex-col items-center">
                    <Link to='/client/nos-produits/ange/pyjamas' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-angel-pyjamas bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Pyjamas Ange</h3>
                    </Link>
                    <Link to='/client/nos-produits/ange/lingerie-discrete' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-angel-lingerie bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Lingerie discrète</h3>
                    </Link>
                    <Link to='/client/nos-produits/ange/nuisettes' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-angel-short bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Nuisettes</h3>
                    </Link>
                </section>
            </section>
        </>
    )
}

export default AngelDepartment;