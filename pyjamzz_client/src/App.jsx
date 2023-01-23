import { Routes, Route } from 'react-router-dom'
import './App.css'

//COMPONENTS OF ADMIN SECTION
import AdminHome from './components/admin/AdminHome';

//OTHER
import NoFound from './components/other/NoFound';
import ServorError from './components/other/ServorError';


//COMPONENTS OF CUSTOMER SECTION
//OTHER
import Home from './components/customer/pages/Home';
import Customer from './components/customer/Customer';
import AllProducts from './components/customer/pages/AllProducts';
import Novelty from './components/customer/pages/Novelty';
import ProductPage from './components/customer/pages/ProductPage';
import ShoppingCart from './components/customer/pages/ShoppingCart';

//ANGEL
import AngelDepartment from './components/customer/pages/angel/AngelDepartment';
import PyjamasAngel from './components/customer/pages/angel/PyjamasAngel';
import DiscreetLingerie from './components/customer/pages/angel/DiscreetLingerie';
import AngelNightie from './components/customer/pages/angel/AngelNightie';

//DEMON
import DemonDepartment from './components/customer/pages/demon/DemonDepartment';
import PyjamasSexy from './components/customer/pages/demon/PyjamasSexy';
import SexyNightie from './components/customer/pages/demon/SexyNightie';
import SexyBodysuit from './components/customer/pages/demon/SexyBodysuit';
import SexyLingerie from './components/customer/pages/demon/SexyLingerie';

//SECURITY
import CustomerSignIn from './components/customer/pages/authentification/CustomerSignIn';

function App() {


    return (
        <Routes>
            <Route exact path='/serveur-error' element={<ServorError />} />
            <Route path='*' element={<NoFound />} />
            <Route exact path='/' element={<Home />} />
            <Route path='/client' element={<Customer />}>
                <Route exact path='/client/inscription' element={<CustomerSignIn/>}/>


                <Route exact path='/client/nos-produits' element={<AllProducts />} />
                <Route exact path='/client/nos-produits/nouveautes' element={<Novelty />} />

                <Route exact path='/client/nos-produits/ange' element={<AngelDepartment />}/>
                <Route exact path='/client/nos-produits/ange/pyjamas' element={<PyjamasAngel/>}/>
                <Route exact path='/client/nos-produits/ange/lingerie-discrete' element={<DiscreetLingerie/>}/>
                <Route exact path='/client/nos-produits/ange/nuisettes' element={<AngelNightie/>}/>

                <Route exact path='/client/nos-produits/demon' element={<DemonDepartment/>}/>
                <Route exact path='/client/nos-produits/demon/pyjamas' element={<PyjamasSexy/>}/>
                <Route exact path='/client/nos-produits/demon/nuisettes-sexy' element={<SexyNightie/>}/>
                <Route exact path='/client/nos-produits/demon/body-sexy' element={<SexyBodysuit/>}/>
                <Route exact path='/client/nos-produits/demon/lingerie-sexy' element={<SexyLingerie/>}/>

                <Route exact path='/client/produit/:productId' element={<ProductPage/>}/>
                <Route exact path='/client/panier' element={<ShoppingCart/>}/>
            </Route>




            <Route exact path='/admin' element={<AdminHome />}>

            </Route>
        </Routes>
    )
}

export default App
