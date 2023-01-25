import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../other/Loading";

function NoveltyCard({ item }) {
    const [picture, setPicture] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`/api/product/images/${item.id}`, { requestOptions })
                .then(response => {
                    return response.json()
                })
                .then(pictureData => {
                    setPicture(pictureData[0].url)
                    setLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])


    if (loading) {
        return (
            <>
                <div className="shadow-md shadow-p-black  h-56 w-56 mx-9  mb-6 md:w-96 md:h-72  rounded-lg relative  flex items-end bg-gray-200 animate-pulse">
                
                    <div className=" absolute bottom-0 left-0 right-0 w-full h-1/3 bg-p-light rounded-b-lg p-2 flex flex-col justify-between">
                        <p className="text-p-light w-full"></p>
                        <div className="w-full text-end">
                            <p className="w-full h-1/2 bg-gray-200 rounded animate-pulse"></p>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Link to={`/client/produit/${item.id}`} className={`shadow-md shadow-p-black  h-56 w-56 mx-9  mb-6 md:w-96 md:h-72  rounded-lg relative  flex items-end`}>
                    <img src={picture} alt="" className="h-56 w-56  md:w-96 md:h-72  rounded-lg object-cover" />
                    <div className=" absolute bottom-0 left-0 right-0 w-full h-1/3 bg-p-purple/70 rounded-b-lg p-2 flex flex-col justify-between">
                        <p className="text-p-light w-full">{item?.name}</p>
                        <div className="w-full text-end">
                            <p className="text-p-light">{item?.priceTTC}€</p>
                        </div>
                    </div>
                </Link>
            </>
        )

    }

};

export default NoveltyCard;