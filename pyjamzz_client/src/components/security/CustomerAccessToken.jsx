import {Navigate} from 'react-router-dom';

function CustomerAccessToken({children}){
    const token = localStorage.getItem('token')
    if(token == null){
        return <Navigate to={'/client/connexion'} replace={true}/>
    }else{
        return children
    }
}

export default CustomerAccessToken;