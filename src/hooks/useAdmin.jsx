import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import useAuth from './useAuth'

function useAdmin() {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
  
    const { data: isAdmin = '', isLoading } = useQuery({
      queryKey: ['isAdmin', user?.email],
      enabled: !loading && !!user,
      queryFn: async () => {
        const { data } = await axiosSecure(`/user/${user?.email}`)
        console.log(data.role)
        return data.role
      },
    })
  
    //   Fetch user info using logged in user email
  
    return [isAdmin, isLoading]
}

export default useAdmin