import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import angelIcon from '../../../../assets/icons/angel.svg';
import Loading from "../../../other/Loading";
import AngelCard from "../../partials/cards/AngelCard";
import SortBarDiscretLingerie from "../../partials/sortbar/SortBarDiscretLingerie";

function DiscreetLingerie() {
  const [allProducts, setAllProducts] = useState(null)
  const [sortBarOpen, setSortBarOpen] = useState(false)
  const [maxPriceInAllProducts, setMaxPriceInAllProduct] = useState(0)

  //CUSTOM SEARCH
  const [customSearchActive, setCustomSearchActive] = useState(false)
  const [customSearchArray, setCustomSearchArray] = useState(null)
  const [customFilterType, setCustomFilterType] = useState('any')
  const [customerSort, setCustomSort] = useState('any')
  const [customfilterPrice, setCustomFilterPrice] = useState(0)

  const [loading, setLoading] = useState(true)

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      fetch('/api/product/list/lingerie-discrete', { requestOptions })
        .then(response => {
          return response.json()
        })
        .then(data => {
          setAllProducts(data.products)
          let maxInArray = 0;
          data.products.map(element => {
            if (element.priceTTC > maxInArray) {
              maxInArray = element.priceTTC;
            }
          })
          setMaxPriceInAllProduct(maxInArray + 1)
          setCustomFilterPrice(maxInArray)
          setLoading(false)
        })
        .catch(e => {
          // console.log(e)
          // navigateTo('/serveur-error')
        })

    } catch (e) {

    }
  }, [])



  function changeVisibilitySortBar(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setSortBarOpen(!sortBarOpen)
  }

  function resetCustomSearch(e) {
    setSortBarOpen(!sortBarOpen)
    setCustomSearchActive(false)
    setCustomFilterPrice(maxPriceInAllProducts)
    setCustomFilterType('any')
    setCustomSearchArray(null)
    setCustomSort('any')
  }

  function handleSubmitCustomizeSearch(e) {
    e.preventDefault();
    setLoading(true)
    setCustomSearchActive(false)
    changeVisibilitySortBar();
    let provisionalArray = [];
    setCustomSearchArray(provisionalArray)
    if (customFilterType != 'any') {
      const provideCustomFilterType = allProducts.filter(element => element.subCategory == customFilterType)
      provisionalArray = provisionalArray.concat(provideCustomFilterType);
    } else {
      provisionalArray = provisionalArray.concat(allProducts);
    }
    for (let i = 0; i < provisionalArray.length; i++) {
      if (provisionalArray[i].priceTTC > customfilterPrice) {
        provisionalArray.splice(i, 1)
        i--;
      }
    }
    if (customerSort == 'croissant') {
      function merge(left, right) {
        let tab = [], l = 0, r = 0;
        while (l < left.length && r < right.length) {
          if (left[l].priceTTC < right[r].priceTTC) {
            tab.push(left[l++]);
          } else {
            tab.push(right[r++]);
          }
        }
        return tab.concat(left.slice(l)).concat(right.slice(r));
      }
      function sort(tab) {
        if (tab.length < 2) {
          return tab;
        }
        let mid = Math.floor(tab.length / 2),
          right = tab.slice(mid),
          left = tab.slice(0, mid),
          p = merge(sort(left), sort(right));

        p.unshift(0, tab.length);
        tab.splice.apply(tab, p);
        return tab;
      }
      provisionalArray = sort(provisionalArray);
    }
    if (customerSort == 'decroissant') {
      function merge(left, right) {
        let tab = [], l = 0, r = 0;
        while (l < left.length && r < right.length) {
          if (left[l].priceTTC > right[r].priceTTC) {
            tab.push(left[l++]);
          } else {
            tab.push(right[r++]);
          }
        }
        return tab.concat(left.slice(l)).concat(right.slice(r));
      }
      function sort(tab) {
        if (tab.length < 2) {
          return tab;
        }
        let mid = Math.floor(tab.length / 2),
          right = tab.slice(mid),
          left = tab.slice(0, mid),
          p = merge(sort(left), sort(right));
        p.unshift(0, tab.length);
        tab.splice.apply(tab, p);
        return tab;
      }
      provisionalArray = sort(provisionalArray);
    }
    setCustomSearchArray(provisionalArray);
    setLoading(false)
    setCustomSearchActive(true)
  }



  if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <>
        <section className="flex flex-col items-center bg-p-light min-h-screen pt-5">
          <h1 className="text-2xl font-[900] mb-16 flex"><img className="w-8 h-8" src={angelIcon} alt="angel icon" />Lingerie Discrète<img className="w-8 h-8" src={angelIcon} alt="angel icon" /></h1>

          <SortBarDiscretLingerie
            sortBarOpen={sortBarOpen}
            changeVisibilitySortBar={changeVisibilitySortBar}
            setCustomFilterType={setCustomFilterType}
            setCustomSort={setCustomSort}
            maxPriceInAllProducts={maxPriceInAllProducts}
            setCustomFilterPrice={setCustomFilterPrice}
            customfilterPrice={customfilterPrice}
            handleSubmitCustomizeSearch={handleSubmitCustomizeSearch}
            resetCustomSearch={resetCustomSearch}

          />
          <button onClick={changeVisibilitySortBar} className={sortBarOpen ? 'hidden' : "border shadow-sm shadow-p-purple  border-p-purple rounded-md px-3 py-2 text-p-purple cursor-pointer hover:bg-p-purple hover:text-p-light active:shadow-none  transition ease-in-out delay-75 my-4"}>Filtrer / Trier</button>
          <div className=" flex flex-row flex-wrap justify-center items-center w-full mx-auto md:flex-row md:flex-wrap md:justify-center">

            {customSearchActive ? customSearchArray?.map(item => <AngelCard item={item} key={item.id} />) : allProducts?.map(item => <AngelCard item={item} key={item.id} />)}
          </div>

        </section>
      </>
    )
  }

}

export default DiscreetLingerie;