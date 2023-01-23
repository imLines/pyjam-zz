import { Link } from "react-router-dom";

function ServorError() {
    return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 bg-p-black min-h-screen">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="bg-p-black">
                            <h1 className="my-2 text-p-purple font-bold text-2xl">
                                Oups.. le serveur de Pyjam'zz rencontre un problème.
                            </h1>
                            <p className="my-2 text-p-light">Pas de panique, nos développeurs sont sur le coup et vous aurez de nouveau accès d'ici peu.</p>
                            <button className="mt-5">
                                <a
                                    className="relative inline-block text-sm font-medium text-p-light group active:text-p-purple focus:outline-none focus:ring hover:text-p-light"
                                >
                                    <span
                                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-p-purple group-hover:translate-y-0 group-hover:translate-x-0"
                                    ></span>

                                    <span className="relative block px-8 py-3 bg-p-purple border border-current">
                                        <Link to="/">Revenir au menu</Link>
                                    </span>
                                </a>
                            </button>                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-p-black">
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
    )
};

export default ServorError;