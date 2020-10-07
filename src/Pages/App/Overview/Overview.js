import React from 'react'
import {HomeRoute } from '../../../Routing'
import { NavLink } from "react-router-dom";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,

    Link,
}  from '@material-ui/core';

// Icons 
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  iconDiv: {
    marginTop: theme.spacing(8),
    margin: 'auto',
    display: 'grid',
    gridAutoFlow: 'column',
    
  },
  icons: {
  
    margin: 'auto ',
    border: '3px solid black',
    borderRadius: '50%' ,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding:'13px',
    fontSize: 'large',
  },
  image: {
    position: 'absolute',
    zIndex: '-1',
    top: '0',
    backgroundSize: 'cover',
    width: '100%',
    height: '90vh',
    filter: 'blur(50%)',
  },
  link: {
    color: 'black',
  },
  hover: {
    '&:hover': {
      animation: `$spin 3s`,
   }
  },
    '@keyframes spin': {
      '25%': {
        transform:' rotateY(-60deg)',
        color: 'blue',
        animationTimingFunction: 'ease',
      },
      
      '100%': {
        color: 'blue',
        transform: 'rotateY(360deg)',
      },
    },
  
  
    // "&:hover": {
    //   backgroundColor: 'rgb(7, 177, 77, 0.42)'
    // }
  

}));

function Overview(props) {


  

  const classes = useStyles();

  return (
    <div>
    <img className={classes.image} 
    src='https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=30' 
    alt="background" />
    <Container className={classes.iconDiv} >
      <div  className={classes.icons}  >
        <NavLink className={classes.link}   to={HomeRoute} > 
          <FlightTakeoffIcon   fontSize='large' className={classes.hover} />
        </NavLink> 
      </div>
      <div  className={classes.icons} > 
        <NavLink className={classes.link}   to={HomeRoute} > 
          <PersonIcon fontSize='large'  className={classes.hover}  />
        </NavLink> 
      </div>  
      <div  className={classes.icons}> 
        <NavLink className={classes.link}   to={HomeRoute} > 
          <LanguageIcon fontSize='large' className={classes.hover}  />
        </NavLink> 
      </div>
    </Container>

    <Container className={classes.iconDiv} >
     <div className={classes.icons}> 
        <NavLink className={classes.link}   to={HomeRoute} > 
          <AccessTimeIcon fontSize='large' className={classes.hover}  />
        </NavLink> 
      </div>
      <div className={classes.icons}> 
        <NavLink className={classes.link}   to={HomeRoute} > 
          <ShareIcon  fontSize='large' className={classes.hover} />
        </NavLink> 
     </div>
      <div className={classes.icons}> 
        <NavLink className={classes.link}   to={HomeRoute} > 
          <AssignmentIndIcon fontSize='large' className={classes.hover}  />
        </NavLink> 
      </div>
    </Container>


  </div>
  )
}

export default Overview
