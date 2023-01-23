import { useRef } from "react";

function SortBarDiscretLingerie({
    sortBarOpen,
    changeVisibilitySortBar,
    setCustomFilterType,
    setCustomSort,
    maxPriceInAllProducts,
    setCustomFilterPrice,
    customfilterPrice,
    handleSubmitCustomizeSearch,
    resetCustomSearch,

}) {
    const buttonPrice = useRef()


    return (
        <form onSubmit={handleSubmitCustomizeSearch} className={sortBarOpen ? "w-4/5 mx-auto my-9 flex flex-col justify-center items-center  border-2 border-p-purple p-7 rounded-md relative" : 'hidden'}>
            <button onClick={changeVisibilitySortBar} className="absolute top-0 right-0 mr-3 hover:underline">Fermer</button>

            <div className="w-full mx-auto mb-9 flex justify-between ">

                <select onChange={e => setCustomFilterType(e.target.value)} defaultValue={'any'} className="w-2/5 border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-75 my-4">
                    <option value={'any'}>-Filtrer par type-</option>
                    <option value={'culotte'}>Culottes</option>
                    <option value={'soutien-gorge'}>Soutiens-Gorge</option>
                    <option value={'brassiere'}>Brassière</option>
                    <option value={'shorty'}>Shorty</option>
                </select>
                <select onChange={e => setCustomSort(e.target.value)} defaultValue={'any'} className="w-2/5 border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-75 my-4">
                    <option value={'any'}>-Trier par prix-</option>
                    <option value={'croissant'}>Prix croissant</option>
                    <option value={'decroissant'}>Prix décroissant</option>
                </select>

            </div>
            <label  htmlFor="default-range" className="w-auto mb-2 text-sm font-medium text-dark">Moins ou égal à <b>{customfilterPrice}</b>€</label>
            <input ref={buttonPrice} onChange={e => setCustomFilterPrice(e.target.value)} defaultValue={maxPriceInAllProducts} type="range" min={1} max={maxPriceInAllProducts} className="w-3/5 h-1  rounded-lg appearance-none cursor-pointer bg-p-purple active:h-2"></input>
            <button type="submit" className="border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-75 my-4">
                Trier
            </button>
            <label onClick={e => resetCustomSearch(buttonPrice.current.value = maxPriceInAllProducts)} className="mt-5 hover:cursor-pointer hover:underline">Réinitialiser</label>
        </form>
    )
}

export default SortBarDiscretLingerie;