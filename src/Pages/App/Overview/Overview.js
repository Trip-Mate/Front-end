import React from 'react'
import { HomeRoute, NewTripRoute, ContactRoute } from '../../../Routing'
import { NavLink } from "react-router-dom";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
}  from '@material-ui/core';

// Icons 
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  Container: {
    marginTop: theme.spacing(8),
    margin: 'auto',
    display: 'grid',
    gridAutoFlow: 'column',
    
  },
  mainDiv: {
     display: 'grid',
  },

  icons: {
    gridAutoFlow: 'column',
    margin: 'auto ',
    border: '3px solid 	#3b5998',
    borderRadius: '50%' ,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding:'13px',
    fontSize: 'large',
    lineHeight: '0',
  },
  title:{
    color: '	#3b5998',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bolder',
    letterSpacing: '1px',
    BoxShadow: '5px',
    
  },
  image: {
    position: 'absolute',
    zIndex: '-1',
    top: '56px',
    backgroundSize: 'cover',
    width: '100%',
    height: '94vh',
    // filter: 'grayscale(100%)',
    opacity: '0.4',
    
  },
  link: {
    color: '	#3b5998 ',
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
    src='https://images.unsplash.com/photo-1527422265102-22027ee90fcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80' 
    alt="background" />
    <Container className={classes.Container} >
          <div  className={classes.mainDiv}>
            <div  className={classes.icons}  >
                <NavLink className={classes.link}   to={HomeRoute} > 
                  <FlightTakeoffIcon   fontSize='large' className={classes.hover} />
                </NavLink>
              </div>
              <div>
                <Typography className={classes.title}>My Trips</Typography>
            </div>
          </div>
          <div  className={classes.mainDiv}>
            <div  className={classes.icons}  >
                <NavLink className={classes.link}   to={HomeRoute} > 
                  <PersonIcon   fontSize='large' className={classes.hover} />
                </NavLink>
              </div>
              <div>
                <Typography className={classes.title}>Home</Typography>
            </div>
          </div>
          <div  className={classes.mainDiv}>
            <div  className={classes.icons}  >
                <NavLink className={classes.link}   to={NewTripRoute} > 
                  <LanguageIcon   fontSize='large' className={classes.hover} />
                </NavLink>
              </div>
              <div>
                <Typography className={classes.title}>Plan Trip</Typography>
            </div>
          </div>
    </Container>

    <Container className={classes.Container} >
    <div  className={classes.mainDiv}>
            <div  className={classes.icons}  >
                <NavLink className={classes.link}   to={HomeRoute} > 
                  <AccessTimeIcon   fontSize='large' className={classes.hover} />
                </NavLink>
              </div>
              <div>
                <Typography className={classes.title}>Random?</Typography>
            </div>
          </div>
          <div  className={classes.mainDiv}>
            <div  className={classes.icons}  >
                <NavLink className={classes.link}   to={HomeRoute} > 
                  <AssignmentIndIcon   fontSize='large' className={classes.hover} />
                </NavLink>
              </div>
              <div>
                <Typography className={classes.title}>Contact Us</Typography>
            </div>
          </div><div  className={classes.mainDiv}>
            <div  className={classes.icons}  >
                <NavLink className={classes.link}   to={ContactRoute} > 
                  <ShareIcon   fontSize='large' className={classes.hover} />
                </NavLink>
              </div>
              <div>
                <Typography className={classes.title}>Share Trips</Typography>
            </div>
          </div>
    </Container>


  </div>
  )
}

export default Overview
