import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Loading } from "../components/Shared/Loading";
export const PrivateRoute = ({children}) => {
  const {loader, user} = useContext(AuthContext);
  const location = useLocation();

  if(loader){
    return <Loading />
  }

  return (
    user ? children : <Navigate state={location.pathname} to='/login'></Navigate>
  )
}