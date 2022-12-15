import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Collapse, Divider} from '@mui/material';

import {ExpandMore,ExpandLess} from '@mui/icons-material';
import Link from 'next/link';

export default function NavBar() {

  let newOpen =[];
//   const data = useStaticQuery(graphql`
//   query systemsQuery {
//     allJson(sort: {fields: generation}) {
//       group(field: generation) {
//         nodes {
//       type
//       name
//       developer
//       generation
//       fields {
//               slug
//             }
//     }
//     fieldValue
//     totalCount
//   }
//     }
//   }
// `)

const systemsGroups = [
  {generation:4, systems:[
    {name:'snes',developer: 'nintendo',generation:4, slug: 'nintendo-snes'},
    {name:'mega drive',developer: 'sega',generation:4, slug: 'sega-mega-drive'},
    ]},
  {generation:3, systems:[
    {name:'nes',developer: 'nintendo',generation:3, slug: 'nintendo-nes'},
    {name:'master system',developer: 'sega',generation:3, slug: 'sega-master-system'},
    ]}
  ];

const [open, setOpen] = React.useState(
  // criar um array todo com false para a quantidade de grupos da query de puxar os sistemas
  Array.from({length: systemsGroups.length},()=>false)
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
                <MenuItem key={-1} onClick={handleClose}><Link className='menuItem' href = {`/systems/`}>{`All Systems`}</Link></MenuItem>
                <Divider key={`divider-00`} sx={{ my: 0.5 }} />
                {systemsGroups.map((item:any,index:number)=>{
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
                  {index == (systemsGroups.length-1) ? null :<Divider key={`divider-${index}`} sx={{ my: 0.5 }} />}
                  
                  </div>
                  )
                })}
                
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
          
        </Toolbar>
        
      </AppBar>

    </Box>
  );
 
}
