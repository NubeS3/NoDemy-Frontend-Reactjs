import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import loading from '../../assets/loadings/medium.loading.gif';
import paths from "../../configs/paths.config";

import { updateProfileWithNodemy, updateProfileWithGoogle, updateAccountAvatar } from '../../reducers/account.reducer';
import HistoryProps from "../../types/HistoryProps.type";
import isEmail from 'validator/lib/isEmail';
import "../../styles/components/UserProfile/UserProfile.scss";
import { RootState } from '../../reducers/root.reducer';
import PageWrapper from "../common/PageWrapper";
import { NavBarLink } from "../common/NavBar";
import RouterProps from "../../types/RouterProps.type";

const mapStateToProps = (state: RootState) => ({
    user: state.accountReducer.user,
    accessToken: state.authenticationReducer.accessToken,
});

const mapDispatchToProps = {
    updateProfileWithNodemy,
    updateProfileWithGoogle,
    updateAccountAvatar
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileProps = ConnectedProps<typeof connector> & RouterProps & HistoryProps;


const UserProfile = (props: ProfileProps) => {
    const [tab, setTab] = useState(0);

    const [email, changeEmail] = useState('');
    const [fullname, changeFullname] = useState('');
    const [password, changePassword] = useState('');
    const [currentPassword, changeCurrentPassword] = useState('');
    const [confirmPassword, changeConfirmPassword] = useState('');
    const [avatar, changeAvatar] = useState('');

    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const [error, setError] = useState('');

    const validateData = () => {
        if (email !== '') {
            if (email.trim().length > 100) {
                return 'Email must not contain more than 100 characters!';
            }

            if (!isEmail(email.trim())) {
                return 'Email is not valid!';
            }
        }

        if (fullname !== '') {
            if (fullname.trim().length > 64) {
                return 'Fullname must not contain more than 64 characters!';
            }
        }

        if (currentPassword !== '') {
            if (password.trim().length < 8) {
                return 'Current password must contain at least 8 characters!';
            }
        }

        if (password !== '') {
            if (password.trim().length < 8) {
                return 'Password must contain at least 8 characters!';
            }
        }

        if (confirmPassword !== '') {
            if (password.trim().length < 8) {
                return 'Confirm password must contain at least 8 characters!';
            }
        }

        if (password !== '' && confirmPassword === '') {
            return 'Confirm password is required!'
        }

        if (password === '' && confirmPassword !== '') {
            return 'Password is required!'
        }

        if (password !== '' && confirmPassword !== '') {
            if (confirmPassword !== password) {
                return 'Confirm password must be the same as password!';
            }
        }

        if (password !== '' && confirmPassword !== '' && currentPassword === '') {
            return 'Current password is required!'
        }


        return '';
    };

    const onHandleUpdateWithNodemy = async () => {
        setIsUpdating(true);

        const validateResult = validateData();
        setError(validateResult);

        if (validateResult) {
            return setIsUpdating(false);
        }

        props.updateProfileWithNodemy({
            email,
            fullname
        })
    }

    const onHandleUpdateWithGoogle = async () => {
        setIsUpdating(true);

        const validateResult = validateData();
        setError(validateResult);
        if (validateResult) {
            return setIsUpdating(false);
        }

        props.updateProfileWithGoogle({
            fullname
        })
    }

    const onHandleChangePassword = async () => {
        const validateResult = validateData();
        setError(validateResult);
        if (validateResult) {
            return setIsUpdating(false);
        }

        props.updateProfileWithNodemy({
            currentPassword,
            password
        })
    }

    const onHandleChangeAvatar = async (e: any) => {
        try {
            setIsUploadingImage(true);
            const data = new FormData();
            data.append('avatar', e.target.files[0]);

            props.updateAccountAvatar(data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setIsUploadingImage(false);
    }, [avatar]);

    useEffect(() => {
        if (props.user) {
            changeFullname(props.user.fullname);
            changeAvatar(props.user.avatar);
            changeEmail(props.user.email);
        }
    }, [props.user]);

    const links: Array<NavBarLink> = [{
        name: 'Home',
        url: paths.base,
    }, {
        name: 'Profile',
        url: paths.profile,
    }];

    if (!props.user) {
        return (
            <div style={{ width: '150px', margin: 'auto' }}>
                <img src={loading} alt="Loading... " />
            </div>
        )
    };

    return (
        <PageWrapper links={links} history={props.history}>
            <div className="Profile">
                <Grid container className="Profile__wrapper" justify="center">
                    <Grid item xs={12} lg={2} >
                        <div className="Profile__paper-sidebar">
                            <div className="Profile__avatar no-select"
                                onClick={() => {
                                    if (!isUploadingImage) {
                                        document.getElementById("uploadAvatar").click();
                                    }
                                }}
                            >
                                {
                                    !isUploadingImage && avatar &&
                                    <img src={`data:image/jpeg;base64,${avatar}`} alt="" />
                                }
                                {
                                    !isUploadingImage &&
                                    <input
                                        accept=".jpg,.png,.jpeg"
                                        multiple={false}
                                        type="file"
                                        id="uploadAvatar"
                                        onChange={(e) => onHandleChangeAvatar(e)}
                                        disabled={isUploadingImage}
                                    />
                                }
                                {
                                    isUploadingImage &&
                                    <div>
                                        <img className="AddEditCourse__cover-wrapper__loading" src={loading} height={100} width={100} alt="Uploading..." />
                                    </div>
                                }
                            </div>

                            <Typography className="title Avatar__title">
                                {props.user.fullname}
                            </Typography>

                            <div className={tab === 0 ? "Sidebar__option-title-clicked" : "Sidebar__option-title"}>
                                <Button className="Option-button"
                                    onClick={() => setTab(0)}
                                >Profile</Button>
                            </div>

                            <div
                                hidden={props.user.accountHost === 'Google'}
                                className={tab === 1 ? "Sidebar__option-title-clicked" : "Sidebar__option-title"}
                            >
                                <Button className="Option-button"
                                    onClick={() => setTab(1)}
                                >Change Password</Button>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className="Profile__paper-content">
                            <Typography variant="h4" className="title Profile__title">
                                Profile
                            </Typography>

                            {error ?
                                <Typography className="error" variant="body1">{error}</Typography> :
                                <div hidden={!isUpdating}>
                                    <Typography className="error" variant="body1">Update Success!</Typography>
                                </div>
                            }

                            {tab === 0 &&
                                <div>
                                    <TextField
                                        className="Profile__text-field"
                                        label="Email"
                                        variant="outlined"
                                        type="Email"
                                        value={email}
                                        onChange={(e) => changeEmail(e.target.value)}
                                        required />
                                    <TextField
                                        className="Profile__text-field"
                                        label="Fullname"
                                        variant="outlined"
                                        value={fullname}
                                        onChange={(e) => changeFullname(e.target.value)}
                                        required />
                                    <div className="Profile__content-button">
                                        <Button
                                            className="Profile__cancel-button-custom"
                                            variant="contained"
                                            onClick={() => props.history.push(paths.base)}
                                        >Cancel
                                        </Button>
                                        <Button
                                            className="Profile__update-button-custom"
                                            variant="contained"
                                            onClick={props.user.accountHost === 'Nodemy' ? onHandleUpdateWithNodemy : onHandleUpdateWithGoogle}
                                        >
                                            UPDATE
                                        </Button>
                                    </div>

                                </div>}
                            {tab === 1 &&
                                <div>
                                    <TextField
                                        className="Profile__text-field"
                                        label="Current Password"
                                        variant="outlined"
                                        type="Password"
                                        onChange={(e) => changeCurrentPassword(e.target.value)}
                                        required />

                                    <TextField
                                        className="Profile__text-field"
                                        label="Password"
                                        variant="outlined"
                                        type="Password"
                                        onChange={(e) => changePassword(e.target.value)}
                                        required />

                                    <TextField
                                        className="Profile__text-field"
                                        label="Confirm Password"
                                        variant="outlined"
                                        onChange={(e) => changeConfirmPassword(e.target.value)}
                                        type="Password"
                                        required />
                                    <div className="Profile__content-button">
                                        <Button
                                            className="Profile__cancel-button-custom"
                                            variant="contained"
                                            onClick={() => props.history.push(paths.base)}
                                        >Cancel
                                        </Button>
                                        <Button
                                            className="Profile__update-button-custom"
                                            variant="contained"
                                            onClick={onHandleChangePassword}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div >
        </PageWrapper >
    )
}

export default connector(UserProfile);