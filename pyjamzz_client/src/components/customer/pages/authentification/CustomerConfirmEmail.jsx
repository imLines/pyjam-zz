import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../other/Loading";

function CustomerConfirmEmail() {
    const [loading, setLoading] = useState(true);
    const [statusReponse, setStatusResponse] = useState(null)

    const { token } = useParams();
    console.log({ token })

    useEffect(() => {
        try {
            if (token) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                };
                fetch('http://localhost:8000/log/confirm-email', requestOptions)
                    .then(response => {
                        setStatusResponse(response.status)
                        console.log(response.status)
                        setLoading(false)
                    })
            } else {
                console.log("Aucun token n'as été fourni.")
            }
        } catch (e) {
            console.log(e);
        }
    }, [])

    if (loading) {
        return <Loading />
    } else if (statusReponse == 200) {

        return (

            <section className="bg-p-light min-h-screen flex flex-col items-center p-5 pt-24 w-full text-center">
                <h1 className="text-2xl font-[900] mb-16 text-green-400">Compte vérifié</h1>
                <p>Vous pouvez vous connecter dès maintenant.</p>

            </section>
        )
    } else if (statusReponse == 404) {
        return (
            <section className="bg-p-light min-h-screen flex flex-col items-center p-5 pt-24 w-full text-center">
                <h1 className="text-2xl font-[900] mb-16 text-red-400">Compte déjà vérifié ou inexistant</h1>
                <p>Vous avez surement déjà activé votre compte et il devrait être accessible en vous connectant. Si ce n'est pas le cas, il se peut qu'il n'existe plus suite à une demande de clôture.</p>
                <p>Si vous n'êtes pas à l'origine de cette suppression, n'hésitez pas à contacter le support technique Pyjam'zz.</p>
            </section>

        )
    }


}

export default CustomerConfirmEmail;