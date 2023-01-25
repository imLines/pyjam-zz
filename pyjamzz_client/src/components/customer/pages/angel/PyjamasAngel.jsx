import { useState } from 'react';
import { useEffect } from 'react';
import angelIcon from '../../../../assets/icons/angel.svg';
import AngelCard from '../../partials/cards/AngelCard';



function PyjamasAngel(){
    const [allProducts, setAllProducts] = useState(null)

    useEffect(()=>{
        try{
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };        
            fetch('/api/product/list/pyjamas-ange', { requestOptions })
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                console.log(data)
                setAllProducts(data.products)
            })
            .catch(e=>{
                console.log(e)
                navigateTo('/serveur-error')
            })

        }catch(e){

        }
    }, [])



    return(
        <section className="flex flex-col items-center bg-p-light min-h-screen pt-24">
                <h1 className="text-2xl font-[900] mb-16 flex"><img className="w-8 h-8" src={angelIcon} alt="angel icon" />Pyjamas Ange<img className="w-8 h-8" src={angelIcon} alt="angel icon" /></h1>
                <div className=" flex flex-row flex-wrap justify-center items-center w-full mx-auto md:flex-row md:flex-wrap md:justify-center">
                    {allProducts?.map(item=><AngelCard item={item} key={item.id} />)}
                </div>

            </section>
    )
}

export default PyjamasAngel; 