import { useSession } from "next-auth/react";
import * as React from "react";
import NavBar from '../components/navBar'

const Header =()=>{

return (

        <header>
                <div className="flex-container">
                <NavBar/>
                </div>

<style jsx>
{ `
        
        header{
                color:white;
                width:100%;
                position: -webkit-sticky; /* Safari */
                position: sticky;
                box-sizing: content-box;
                min-width:450px;
                top: 0;
                z-index: 10;
        }
        .flex-container{
                display: flex; 
                justify-content: space-evenly;

        }

        h3.menuItem :not(:first-child){
                        margin-left:20px;
                        
                }
        

        `}
</style>
        </header>

)
}

export default Header
