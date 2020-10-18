import React, { useContext, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import CustomModal from '../CustomModal/CustomModal';
import { TextField, Button, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '90%',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #f50057',
		borderRadius: '10px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	error: {
        padding: theme.spacing(0, 2),
    },
    formControl: {
        minWidth: '100%',
      },
	submit: {
		width: '100%',
		marginTop: '8px',
	},
}));

const EditProfile = () => {
    const { currentUser, setCurrentUser}  = useContext(CurrentUserContext);
    const [ username, setUsername ] = useState(currentUser?.name || '');
    const [ baseCurrency, setBaseCurrency ] = useState(currentUser?.baseCurrency || '');
    const classes = useStyles();
    const handleSubmit = async () => {
        try {
            let user = {
                ...currentUser,
                name: username,
                baseCurrency: baseCurrency
            }
            let storedUser = JSON.parse(localStorage.getItem('user'))
            const res = await axios({
                url: `/users/${user._id}`,
                method: 'patch',
                data: {...user},
                headers: { 'x-auth-token': storedUser.token }
            })
            if ( res.status === 200) {
                setCurrentUser(user);
                user = {
                    ...storedUser,
                    user: {...user}
                }
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
            }

        } catch (e) {
            console.log(e);
        }
    }
    const modalBody = (
        <>
            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='username'
                label='Username'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="base-currency-label">Base Currency</InputLabel>
                <Select
                    label="Base Currency"
                    id="base-currency-select"
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                </Select>
            </FormControl>
            <Button
                className={classes.submit}
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
            >
                UPDATE
            </Button>
        </>
    )
    return (
        <CustomModal
            buttonColor="primary"
            buttonVariant="outlined"
			buttonTitle={<><EditIcon fontSize="small"/> EDIT</>}
			modalBody={modalBody}
			header="Edit Profile"
            closeIcon
		/>
    )
};

export default EditProfile;