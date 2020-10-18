import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Container, Grid, makeStyles, Paper, Table, TableBody, TableRow, TableCell, Button, Stepper, Step, StepLabel, withStyles } from '@material-ui/core';
import StepConnector from '@material-ui/core/StepConnector';
import CurrentUserContext from '../../../../contexts/current-user/current-user.context';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import EditProfile from '../../../../components/EditProfile/EditProfile';
import DeleteAccount from '../../../../components/DeleteAccount/DeleteAccount';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(4)
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    header: {
        fontSize: '1.5rem'
    },
    table: {
        marginTop: theme.spacing(2)
    }
}));

const useStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
      'linear-gradient( 136deg,rgb(67,81,175) 0%,rgb(88, 116, 161) 50%,rgb(66, 135, 245) 100%)',
    },
  });

const StepIcon = (props) => {
    const classes = useStepIconStyles();
    const icons = {
        1: <EmailIcon />,
        2: <InfoIcon />,
        3: <GroupAddIcon />,
    }
    return (
        <div className={classes.root + " " + (props.active ? classes.active: props.completed && classes.completed)}>
            {icons[props.icon]}
        </div>
    )
}

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(67,81,175) 0%,rgb(88, 116, 161) 50%,rgb(66, 135, 245) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);

const Profile = () => {
    const classes = useStyles();
    const { currentUser } = useContext(CurrentUserContext);
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        if (currentUser?.isEmailVerified) {
            setActiveStep(1)
        } else if ( currentUser?.name && currentUser?.baseCurrency) {
            setActiveStep(2)
        } else if (currentUser?.travelMates?.length > 0) {
            setActiveStep(3)
        }
    }, [currentUser]);
    return (
			<Container>
				<Grid container spacing={1} alignItems='center' justify='center'>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Avatar
                                    variant='rounded'
                                    className={classes.large}
                                    src={`${currentUser?.avatar}`}
                                ></Avatar>
                            </div>
							
						</Paper>
					</Grid>
                    {
                        activeStep < 3 && (
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.paper} square={false}>
                                    <div className={classes.header}>Complete your Profile</div>
                                    <Stepper
                                        alternativeLabel
                                        activeStep={activeStep}
                                        connector={<ColorlibConnector />}
                                        style={{ paddingLeft: 0, paddingRight: 0 }}
                                    >
                                        <Step>
                                            <StepLabel StepIconComponent={StepIcon}>
                                                Verify Email
                                            </StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel StepIconComponent={StepIcon}>Basic Info</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel StepIconComponent={StepIcon}>
                                                Add Travel Mates
                                            </StepLabel>
                                        </Step>
                                    </Stepper>
                                </Paper>
                            </Grid>
                        )
                    }
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>
                            <div className={classes.headerContainer}>
                                <div>
                                    <div className={classes.header}>Profile</div>
                                    <span style={{ marginTop: '0.8rem' }}>
                                        Basic info for a better experience
                                    </span>
                                </div>
                                <div>
                                    <EditProfile />
                                </div>
                            </div>
							<Table className={classes.table}>
								<TableBody>
									<TableRow>
										<TableCell width={200}>Name</TableCell>
										<TableCell>{currentUser?.name}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell width={200}>Base Currency</TableCell>
										<TableCell>{currentUser?.baseCurrency}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>
                            <div className={classes.headerContainer}>
                                <div>
                                    <div className={classes.header}>Login Details</div>
                                    <span style={{ marginTop: '0.8rem' }}>
                                        Manage Email address and password
                                    </span>
                                </div>
                            </div>
							<Table className={classes.table}>
								<TableBody>
									<TableRow>
										<TableCell width={200}>Email</TableCell>
										<TableCell>{currentUser?.email}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell width={200}>Password</TableCell>
										<TableCell>********</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>
                            <div className={classes.headerContainer}>
                                <div>
                                    <div className={classes.header}>Travel Mate(s)</div>
                                    <span style={{ marginTop: '0.8rem' }}>
                                        You have 0 mate(s)
                                    </span>
                                </div>
                                <div>
                                    <Button variant="outlined">
                                        <AddIcon fontSize="small"/> ADD
                                    </Button>
                                </div>
                            </div>
						</Paper>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button
							variant='contained'
							color='secondary'
							style={{ margin: '0.2rem' }}
						>
							Disable Account
						</Button>
						<DeleteAccount />
					</Grid>
				</Grid>
			</Container>
		);
};

export default Profile;