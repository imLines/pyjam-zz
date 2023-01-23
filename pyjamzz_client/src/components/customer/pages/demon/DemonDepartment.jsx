import { Link } from "react-router-dom";
import demonIcon from '../../../../assets/icons/demon.svg';

function DemonDepartment() {
    return (
        <>
            <section className="flex flex-col items-center bg-p-light min-h-screen pt-24">
                <h1 className="text-2xl font-[900] mb-16 flex"><img className="w-8 h-8" src={demonIcon} alt="demon icon" />Rayon Demon<img className="w-8 h-8" src={demonIcon} alt="demon icon" /></h1>
                <section className=" w-full flex flex-col items-center">
                    <Link to='/client/nos-produits/demon/pyjamas' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-demon-pyjamas bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Pyjamas Sexy</h3>
                    </Link>
                    <Link to='/client/nos-produits/demon/nuisettes-sexy' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-demon-nuisette bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Nuisettes Sexy</h3>
                    </Link>
                    <Link to='/client/nos-produits/demon/body-sexy' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-demon-body bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Body Sexy</h3>
                    </Link>
                    <Link to='/client/nos-produits/demon/lingerie-sexy' className="w-3/4 h-32 mb-10 flex items-center justify-around rounded-lg shadow-md shadow-p-purple bg-demon-lingerie bg-cover bg-center">
                        <h3 className="text-xl text-white font-bold">Lingerie Sexy</h3>
                    </Link>
                </section>
            </section>
        </>
    )
}

export default DemonDepartment;