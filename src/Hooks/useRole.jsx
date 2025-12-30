import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "./useAxiosSec";
import useAuth from "./useAuth";

export const useRole = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSec();
  const {data: userRole = {}, isLoading: roleLoading} = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async() =>{
      const {data} = await axiosSecure.get(`/user-role/${user?.email}`);
      return data;
    }
  })
  return [userRole, roleLoading];
}
