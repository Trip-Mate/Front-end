import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red, indigo } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "36vh",
    width: "80%",
    margin: "5%",
    border: "1px solid black",
  },
  header: {
    height: '24%',
    padding: '16px'
  },
  avatar: {
    fontSize: '12px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    height: '13.75%',
    padding: '3px',
  },
  favorite: {
    '&:hover': {
        color: red[500],
     }
  },
  share: {
    '&:hover': {
        color: indigo[500],
     }
  },
}));

const Day = React.forwardRef((props, ref ) => {

  const classes = useStyles();

  //const { country, date, photos } = day;

  return (
    <Card className={classes.root} ref={ref}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar aria-label="Day number" className={classes.avatar}>
          {`Day ${props.index+1}`}
        </Avatar>}
        action={<IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>}
        title=""/* {country} */
        subheader=""/* {date.slice(0, 10)}*/ />
      <CardMedia
        className={classes.media}
        image={/* photos.length ? photos[0] :  */'https://images.unsplash.com/photo-1534951474654-87823058c487?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1309&q=80'}
        title="Day photo" />
      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon className={classes.favorite} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon className={classes.share}/>
        </IconButton>
      </CardActions>
    </Card>
  );
})

export default Day;