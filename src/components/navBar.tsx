import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import {Avatar} from './Avatar';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { CircularProgress, Collapse, Divider} from '@mui/material';

import {ExpandMore,ExpandLess} from '@mui/icons-material';
import Link from 'next/link';
import { apolloClient, gql } from '../apolloClient';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { useSession,signIn, signOut } from 'next-auth/react';
import { systemsByGenerationQuery } from '../gql/systemsByGenerationQuery';
import * as systemsJson from '../../systems.json'


export type SystemProps ={
  name:string;
  slug:string;
  developer:string;
  generation:number;
  __typename:string
}


export default function NavBar() {
  // const [systems,setSystems] = React.useState([])
  const {data: session,status:sessionStatus} = useSession()


// const {data,loading} = useQuery(systemsByGenerationQuery);

//   const systems = data?.systemsConnection.groupBy.generation
//   const systemsByGen = systems?.map((system:any)=>{
//     return(
//       {generation:system.key,systems:system.connection.values}
      
      
//       )
//   })

//   // por em ordem alfabetica
//   const systemsGroups = systemsByGen?.sort((a:any,b:any)=>{
//     return a.generation - b.generation;
// })


  const loading = false;
  const systemsGroups = systemsJson.map((item)=>{
    return item
  });
  console.log(systemsGroups);



  const [open, setOpen] = React.useState(
    // criar um array todo com false para a quantidade de grupos da query de puxar os sistemas
    Array.from({length: systemsGroups?.length},()=>false)
  );


  const handleClick = (index:number) => {
    
    setOpen(Array.from(open,(element,eIndex)=>{
      if(eIndex == index)
        return !element
        else 
        return element
      
    }));
  };

  
  
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };



  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link href={'/'}> 00Games</Link>
          </IconButton>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <div>
              <IconButton
                size="medium"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                
              >
                Systems
              </IconButton>
              <Menu
                id="menu-appbar"
                
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {loading?
                  <CircularProgress/>
                  :<div>
                    <MenuItem key={-1} onClick={handleClose}><Link className='menuItem' href = {`/systems/`}>{`All Systems`}</Link></MenuItem>
                    <Divider key={`divider-00`} sx={{ my: 0.5 }} />
                    {systemsGroups?.map((item:any,index:number)=>{
                      return(<div key={index}>

                      <MenuItem onClick={()=>handleClick(index)}>{item.generation} {open[index]?<ExpandLess/>:<ExpandMore/>}</MenuItem>
                    <Collapse key={`colapse-${index}`} in={open[index]}>
                      {item.systems.map(
                        (system:any,index:number)=>{
                        return (
                          <MenuItem key={index} onClick={handleClose}><Link className='menuItem' href = {`/systems/${system.slug}`}>{`${system.developer} ${system.name} `}</Link></MenuItem>
                        )
                      })}
                                        
                      </Collapse>
                      {/* nao colocar a divisao se for o ultimo item */}
                      {index == (systemsGroups?.length-1) ? null :<Divider key={`divider-${index}`} sx={{ my: 0.5 }} />}
                      
                      </div>
                      )
                    })}
                </div>
                }
                
              </Menu>
            </div>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <div>
            <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link href="/about"> About</Link>
          </IconButton>
            </div>

            <div>
            <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link href="/contact"> Contact Us</Link>
          </IconButton>
            </div>

            
            <div>
              <IconButton
                size="medium"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu2}
                color="inherit"
                
              >
                My Account
              </IconButton>
              <Menu
                id="menu-appbar"
                
                anchorEl={anchorE2}
                open={Boolean(anchorE2)}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >

                {(!session)?
                <div>
                  <MenuItem ><Link className='menuItem' href = {`/api/auth/signin`}>LogIn</Link></MenuItem>
                  <MenuItem ><Link className='menuItem' href = {`/signup`}>Sign UP</Link></MenuItem>
                </div>
                : 
                <div className='my-account'>
                  <div className= 'my-account-info'>
                  <div className= 'my-account-left'>
                    <Link href={'/user/profile'}><Avatar name={session?.user?.name} alt={session?.user?.name} /></Link>
                  </div>
                  <div className= 'my-account-right'>
                  <Link href={'/user/profile'}><div className='account-item'>{session?.user?.name}</div></Link>
                  <Link href={'/user/profile'}><div className='account-item'>{session?.user?.email}</div></Link>
                  {/* <div className='account-item'>{session?.expires}</div> */}
                  </div>
                  </div>
                  <div className='my-account-bottom'>
                  <Divider key={`divider-00`} sx={{ my: 0.5 }} />
                  <MenuItem onClick={() => signOut()}> LogOut</MenuItem>   
                  </div>
                  <style jsx>
                    {`
                    .my-account-info{
                        display: grid; 
                        grid-template-columns: 0.5fr 1fr; 
                        grid-template-rows: 1fr; 
                        gap: 20px 20px; 
                        grid-template-areas: 
                          ". .";  
                        margin:10px;
                        font-size:1.5rem;
                        color:black;
                      }
                      .my-account-bottom{
                        justify-content:center;
                        color:black;
                        
                      }
                      .my-account-left{
                        justify-content: center;
                        justify-items: center;
                        text-align: center;
                        display: flex;
                        vertical-align: center;
                        margin: auto
                        color:black;
                      }
                      .my-account-right{
                        justify-content: center;
                        justify-items: center;
                        text-align: left;
                        display: flex;
                        flex-direction:column;
                        vertical-align: center;
                        margin: auto
                        color:black;
                      }
                      .account-item{
                        color:black;
                      }
                    `}
                  </style>
                </div>  
              }
                  
                
                
                
                            

                
              </Menu>
            </div>
            
            
           
          
        </Toolbar>
        
      </AppBar>

    </Box>
  );
 
}
