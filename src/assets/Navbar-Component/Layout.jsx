import React from 'react'
import Naviagtion from './Naviagtion'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
return (
    <>
    <Naviagtion/>
    <Outlet/>
    <Footer/>
    </>
)
}

export default Layout
