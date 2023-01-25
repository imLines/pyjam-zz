import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function CustomerLogin(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    //Error Managing
    const [errorMessage, setErrorMessage] = useState('')

    const navigateTo = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        try{
            setErrorMessage('');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            };
            fetch('/api/log/login', requestOptions)
            .then(data => {
                if(data.status != 200){
                    setErrorMessage('Adresse email et/ou mot de passe incorrect.')
                }else{
                    return data.json()
                }
            })
            .then(token=>{
                localStorage.setItem('token', token.token)
                navigateTo('/')
            })


        }catch(e){
            console.log(e)
        }

    }


    return(
        <section className="flex flex-col items-center min-h-screen pt-24 bg-p-light">
        <h1 className="text-2xl font-[900] mb-16">Connexion</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-4/5 items-center">
            <p className="text-red-500">{errorMessage}</p>
            <input required onChange={e => setEmail(e.target.value)} name="email" type="email" placeholder="E-mail" className="w-full mt-7 border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
            <input required onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Mot de passe" className="w-full border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none mt-7" />
            <button type="submit" className="mt-7 border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-0 my-4">Me connecter</button>
        </form>
    </section>
    )
}

export default CustomerLogin;