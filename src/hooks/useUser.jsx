import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

function useUser() {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
  
    const { data: loggedUser = {}, isLoading,refetch } = useQuery({
      queryKey: ['user', user?.email],
      enabled: !loading && !!user,
      queryFn: async () => {
        const { data } = await axiosSecure(`/user/${user?.email}`)
        console.log(data)
        return data
      },
    })
  
    //   Fetch user info using logged in user email
  
    return [loggedUser, isLoading]
}

export default useUser