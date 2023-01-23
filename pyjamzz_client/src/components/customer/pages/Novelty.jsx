import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../other/Loading";
import NoveltyCard from "../partials/cards/NoveltyCard";

function Novelty(){
    const [noveltyProducts, setNoveltyProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const navigateTo = useNavigate();

    useEffect(()=>{
        try{
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };        
            fetch('http://localhost:8000/product/novelty', { requestOptions })
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                setNoveltyProducts(data.products)
            })
            .catch(e=>{
                console.log(e)
                navigateTo('/serveur-error')
            })

        }catch(e){
        } 
    }, []) 



    if(loading){

        return(
            <section className="bg-p-light min-h-screen flex flex-col items-center p-5 pt-28s">
            
                <h1 className="text-2xl font-[900] mb-16">Nouveautés</h1>
                <div className=" flex flex-row flex-wrap justify-center items-center w-full mx-auto md:flex-row md:flex-wrap md:justify-center">
                    {noveltyProducts?.map(item=><NoveltyCard item={item} key={item.id} />)}
                </div>
            </section>
        )
    }else{
            <section className="bg-p-light min-h-screen flex flex-col items-center p-5">
                    <h1 className="text-2xl font-[900] mb-16">Nouveautés</h1>
                    <p>Aucune nouveauté pour le moment mais vous pouvez vous inscrire à la newsletter pour être informé des prochains arrivages :)</p>
                </section>
    }
};

export default Novelty;