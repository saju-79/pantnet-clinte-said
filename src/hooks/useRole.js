// import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: role, isLoading: roleLoading } = useQuery({
        queryKey: ["role", user?.email], // ❗ use email, not boolean
        enabled: !loading && !!user?.email, // ✅ force boolean
        queryFn: async () => {
            const { data } = await axiosSecure(
                `/user/role/${user?.email}`
            );
            return data;
        },
    });

    return [role?.role, roleLoading];
};

export default useRole;




/*  useEffect(() => {
       if (!user) return setIsRoleLoading(false)
       const fetchUserRole = async () => {
           try {
               const { data } = await axiosSecure(
                   `${import.meta.env.VITE_API_URL}/user/role/${user?.email}`
               )
 
               setRole(data?.role)
 
           } catch (err) {
               console.log(err)
           } finally {
               setIsRoleLoading(false)
           }
       }
       fetchUserRole()
   }, [user, axiosSecure]) */