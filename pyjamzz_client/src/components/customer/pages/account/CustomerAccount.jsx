import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function CustomerAccount() {


    return (
        <section className="bg-p-light min-h-screen flex flex-col items-center p-5 pt-24">
            <h1 className="text-2xl font-[900] mb-16">Mon compte</h1>
            <div className="w-full flex flex-col bg-p-purple p-4">
                <Link className="text-p-light" to='/client/mon-compte/mes-informations'>Mes informations</Link>
                <Link className="text-p-light" to='/client/mon-compte/mes-adresses'>Mes adresses</Link>
                <Link className="text-p-light" to='/client/mon-compte/mes-commandes'>Mes commandes</Link>
                <Link className="text-p-light" to='/client/mon-compte/securite'>Sécurité</Link>
            </div>
            <Outlet/>
        </section>
    )
}

export default CustomerAccount;