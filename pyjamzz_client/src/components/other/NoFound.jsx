import { Link } from "react-router-dom";
import logoPy from '../../assets/logo-pyjamzz.svg';

function NoFound() {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-p-black">
            <img src={logoPy} alt="logo pyjamzz" className="h-20 w-20"/>
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-p-purple px-2 text-sm rounded rotate-12 absolute">
                <p className="text-lg text-p-light">Page introuvable</p>
            </div>
            <button className="mt-5">
                <a
                    className="relative inline-block text-sm font-medium text-p-light group active:text-p-purple focus:outline-none focus:ring hover:text-p-purple"
                >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-p-purple group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span className="relative block px-8 py-3 bg-p-black border border-current">
                        <Link to="/">Revenir au menu</Link>
                    </span>
                </a>
            </button>
        </main>
    )
}

export default NoFound;