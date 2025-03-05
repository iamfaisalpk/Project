import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navigation from './Naviagtion'

const Layout = () => {
return (
    <>
    <Navigation/>
    <Outlet/>
    <Footer/>
    </>
)
}

export default Layout
