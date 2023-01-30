import { useState } from "react";
import { useEffect } from "react";

function PersonnalInfo(){
    const [infos, setInfos] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null)


    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };
            fetch('/api/customer/profil', requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setInfos(data)
                    let dateToFr = new Date(data.dateOfBirth) ;
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    setDateOfBirth(dateToFr.toLocaleDateString('fr-EU', options))
                })
        } catch (e) {
            console.log(e);
        }
    }, [])

    return(
        <section className="mt-6 w-full flex flex-col">
            <h2>Informations personnelles</h2>

            <div className="w-full mt-2 mb-2 flex">
                <p>{infos?.genre == 'homme' ? 'M.' : 'Mme'} <b>{infos?.lastName}</b> {infos?.firstName}</p>
            </div>
            <div className="w-full mt-2 mb-2 flex">
                <p>{infos?.genre == 'homme' ? 'Né' : 'Née'} le {dateOfBirth}</p>
            </div>

            

        </section>
    )
}

export default PersonnalInfo;