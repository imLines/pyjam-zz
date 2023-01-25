import { useState } from "react";

function CustomerSignIn() {
    const [genre, setGenre] = useState('femme');
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [agreeTerm, setAgreeTerm] = useState(false);
    const [suscribeNewsletter, setSuscribeNewsletter] = useState(false);
    const [successAccount, setSuccessAccount] = useState(false)

    //ERROR management
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            setErrorMessage('')
            console.log(phone)
            const passwordSpecialChar = password.search(/[!@#\$%^&*(),.?":{}|<>]/)
            const passwordOneUpperCase = password.search(/[A-Z]/)
            if (isNaN(phone)) {
                setErrorMessage("Le numéro de téléphone n'est pas un numéro valide.")
                return
            }
            if (passwordSpecialChar == -1 || passwordOneUpperCase == -1) {
                setErrorMessage('Le mot de passe choisi ne contient soit pas de majuscule et/ou aucun caractère spécial.')
                return
            }
            if (password.length < 8) {
                setErrorMessage('Le mot de passe choisi doit faire 8 caractères minimum.')
                return
            }
            if (password != confirmPassword) {
                setErrorMessage('Les mots de passe ne correspondent pas.')
                return
            }
            if (agreeTerm != true) {
                setErrorMessage('Vous devez accepter les conditions légales pour créer un compte.');
                return
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ genre, firstName, lastName, dateOfBirth, email, password, phone })
            };
            fetch('/api/log/registration', requestOptions)
            .then(data => {
                console.log(data)
                if(data.status == 201){
                    setSuccessAccount(true)
                }else if(data.status == 400){
                    setErrorMessage("L'email que vous avez rensigné est déjà utilisé. Veuillez en choisir une autre ou bien vous connecter.")
                }
                return data.json()
            })


        } catch (e) {
            console.log(e)
        }



    }

    if (successAccount) {
        return (
            <section className="bg-p-light min-h-screen flex flex-col items-center p-5 pt-24 w-full text-center">
                <h1 className="text-2xl font-[900] mb-16">Création du compte réussie !</h1>
                <p className="w-4/5 text-left">Un email de confirmation à été envoyé à l'adresse email <b>{email}</b>.</p>
                <p className="w-4/5 text-left">Merci de cliquer sur le lien de confirmation se trouvant dans l'email pour pouvoir commencer à utiliser votre compte.</p>
            </section>
        )
    } else {
        return (
            <section className="flex flex-col items-center min-h-screen pt-24 bg-p-light">
                <h1 className="text-2xl font-[900] mb-16">Inscription</h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-4/5 items-center">
                    <p className="text-red-500">{errorMessage}</p>
                    <div className="flex justify-center w-full">
                        <p className="mr-2">Mme</p>
                        <input checked value={'femme'} onChange={e => setGenre(e.target.value)} type="radio" name="genre" className="accent-p-purple mr-6" />
                        <p className="mr-2">M.</p>
                        <input value={'homme'} onChange={e => setGenre(e.target.value)} type="radio" name="genre" className="accent-p-purple" />
                    </div>
                    <div className="flex flex-col items-center w-full mt-7">
                        <input required onChange={e => setLastName(e.target.value)} name="lastName" type="text" placeholder="Nom" className="w-full border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
                        <input required onChange={e => setFirstName(e.target.value)} name="firstName" type="text" placeholder="Prénom" className="w-full mt-7 border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
                    </div>
                    <input required onChange={e => setDateOfBirth(e.target.value)} type="date" className="mt-7 border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none outline-none" />
                    <input required onChange={e => setEmail(e.target.value)} name="email" type="email" placeholder="E-mail" className="w-full mt-7 border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
                    <input required onChange={e => setPhone(parseInt(e.target.value))} pattern='^[0-9]*$' minLength={10} maxLength={10} name="phone" type="tel" placeholder="Téléphone" className="w-full mt-7 border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
                    <p className="text-sm mt-7">Au moins une majuscule et un caractère spécial. Minimum 8 caractères.</p>
                    <input required onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Mot de passe" className="w-full border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
                    <input required autoComplete="off" onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm-password" placeholder="Confirmez votre mot de passe" className="w-full mt-7 border-2 border-p-purple p-2 rounded-lg focus:bg-purple-100/50 focus:outline-none" />
                    <div className="flex justify-start items-start w-full mt-7 accent-p-purple">
                        <input onChange={e => setAgreeTerm(e.target.checked)} type="checkbox" name="agree-term" /><label htmlFor="agree-term">J'accepte les CGV ainsi que les...</label>
                    </div>
                    <div className="flex justify-start items-start w-full mt-7 accent-p-purple">
                        <input onChange={e => setSuscribeNewsletter(e.target.checked)} type="checkbox" name="newsletter" /><label htmlFor="newsletter">Je souhaite m'inscrire à la newsletter pour recevoir des promotions exculsives</label>
                    </div>
                    <button type="submit" className="mt-7 border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-0 my-4">M'inscrire</button>
                </form>
            </section>
        )

    }

}
export default CustomerSignIn;