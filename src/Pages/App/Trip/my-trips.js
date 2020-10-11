import React, { useEffect, useContext } from 'react';

import axios from 'axios';

/* Date format to be YYYY-MM */
import moment from 'moment';

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

/* User Context */
import CurrentUserContext from '../../../contexts/current-user/current-user.context';

/* Styling Components */
const useStyles = makeStyles((theme) => ({

    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    // Container
    gridList: {
      width: '100vw',
      height: '100vh',
    },
    // Navigation Bar
    title: {
      fontWeight: 'bold',
      fontSize: '20px',
      textAlign: 'center'
    },
    // Info
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },

}));

const MyTrips = () => {
    
    /* getting trips from user context */
    const { setCurrentUser, currentUser: { trips } } = useContext(CurrentUserContext);

    /* Styling Components */
    const classes = useStyles();

    /* get user trips only once */
    useEffect(() => {
		( async () => {

            try {

                /* getting user token */
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user.token;

                /* getting authorized response */
                const res = await axios.get("/trips", {
                    headers: {
                        'x-auth-token': token,
                    }
                });

                /* set current user to have trips data */
                setCurrentUser(res.data);

            } catch (error) {
                console.log('Error', error.message);
            }

        })()
	}, []);
    
    return (
        <div className={classes.root}>

                <GridList cellHeight={180} className={classes.gridList}>

                    {/* Navigation Bar */}

                    <GridListTile cols={1} style={{ height: 'auto' }}>
                        <ListSubheader 
                        color='primary'
                        className={classes.title}
                        component="div">
                            Current Trips
                        </ListSubheader>
                    </GridListTile>

                    <GridListTile cols={1} style={{ height: 'auto' }}>
                        <ListSubheader 
                        color='primary'
                        className={classes.title}
                        component="div">
                            Past Trips
                        </ListSubheader>
                    </GridListTile>

                    {/* Trips Collection */}

                    {
                        !trips.length ? (
                            /* Link to redirect the user to Create Trip Page */
                            <h2> You have no trips yet</h2>

                        ) : (

                            trips.map(({ backgroundImage, from, title, to, _id}) => {

                                /* Sets a flag on the original moment to use UTC to display a moment instead of the original moment's time. */
                                const utcStart = new moment(from).utc()
                                const utcEnd = new moment(to).utc()

                                return(
                                    <GridListTile key={_id}>

                                        <img src={backgroundImage} alt={title} />

                                        <GridListTileBar
                                        key={_id}
                                        title={title}
                                        subtitle={
                                            <span>
                                                {utcStart.format("YYYY-MM")} - {utcEnd.format("YYYY-MM")}
                                            </span>
                                        }
                                        actionIcon={
                                            <IconButton 
                                            aria-label={`info about ${title}`} 
                                            className={classes.icon}>
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                        />

                                    </GridListTile>
                                )
                            })
                        )
                    }
                </GridList>

        </div>
      );
}

export default MyTrips;