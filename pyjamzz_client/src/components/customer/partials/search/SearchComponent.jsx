import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InstantSearch, Hits, SearchBox, Configure } from 'react-instantsearch-dom';
import searchClient from '../../../../config/algolia.config';
import Loading from '../../../other/Loading';

import './SearchComponent.css'


function SearchComponent({ isOpen, setSearchActive }) {
    const [pictures, setPictures] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <>
            <div className={isOpen ? 'bg-p-purple h-full fixed w-full flex flex-col items-center justify-start mt-20 z-30 p-11' : 'hidden'}>
                <InstantSearch indexName='products' searchClient={searchClient}>
                    <SearchBox />
                    <div className='h-3/5 w-full  overflow-y-scroll'>
                        <Hits hitComponent={Hit}  setSearchActive={setSearchActive}/>

                    </div>
                </InstantSearch>
            </div>
        </>
    )
    function Hit(product) {
        const [picture, setPicture] = useState(null);
        const [loading, setLoading] = useState(true);

    
        useEffect(() => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                fetch(`http://localhost:8000/product/images/${product.hit.id}`, { requestOptions })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        setPicture(data[0].url)
                    })
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }, [])
    
            return (
                <Link to={`/client/produit/${product.hit.id}`} onClick={e=>setSearchActive(false)}  className='bg-p-light/70 mb-5 h-36 w-full flex  justify-around items-center rounded-lg hover:bg-p-light'>
                    <img className='h-full w-2/5 object-cover' src={picture} alt="" />
                    <h2 className='w-1/3 text-md font-bold text-p-black'>{product.hit.name}</h2>
    
                </Link>
            );
        
    
    }
};




export default SearchComponent;