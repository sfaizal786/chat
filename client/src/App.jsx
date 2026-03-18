import React, {useEffect, useState } from 'react'
import { Children } from 'react';
import {Button} from'@/components/ui/button.tsx'
import {Tabs} from'@/components/ui/tabs.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from '@/pages/Auth'
import Profile from './pages/Profile'
import Chat from './pages/chat'
import { useAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constant'

const PrivateRoute = ({ children })=>{
  const { userInfo } =  useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to ="/Auth"/> ;
}

const Authroute = ({ children })=>{
  const { userInfo } =  useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ?  <Navigate to ="/chat"/> : children;
}
function App() {
  const { userInfo , setUserInfo } = useAppStore();
  const [ loading , setLoading]= useState(true);
  useEffect (() =>{
    const getUserData = async () => {
      try{
const response = await apiClient.get(GET_USER_INFO,{
  withCredentials: true,
});
if(response.status === 200 && response.data.id){
  setUserInfo(response.data);
}else{
  setuserInfo(undefined)
}
console.log({response});
      } catch(error){
       setUserInfo(undefined);
      }finally{
       setLoading(false);
      }
    };
    if(!userInfo){
      getUserData();
    } else {
      setLoading(false)
    }
  },[userInfo,setUserInfo]);
  if(loading){
    return <div>Loading...</div>
  }
    return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/Auth' element={<Authroute>
        <Auth/>
      </Authroute>} />
        <Route path='/Profile' element={<PrivateRoute>
          <Profile />
        </PrivateRoute>} />
        <Route path='/chat' element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
      <Route path='*' element={<Navigate to='/Auth' />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App