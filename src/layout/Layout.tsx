import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout =({children}:{children:ReactNode})=>{
return(
    <>
    <Header/>
    <div className="main-content">
        {children}
    </div>
    <Footer/>

    <style jsx>
        {`
            
            .main-content{
                margin:50px;
                display:block;
                min-height: 100vh;
                min-width:300px;
            }
            
        `}
        
    </style>
    </>
)

}


export default Layout
