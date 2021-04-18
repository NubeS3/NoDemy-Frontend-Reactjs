/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {connect, ConnectedProps} from 'react-redux';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ImportContacts from '@material-ui/icons/ImportContacts';
import CategoryOutlined from '@material-ui/icons/CategoryOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Add from '@material-ui/icons/Add';
import EditOutlined from '@material-ui/icons/EditOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import {Button, IconButton, TextField} from "@material-ui/core";

import '../../styles/components/Admin/Admin.scss';

import logo from '../../assets/logo.png';
import {RootState} from "../../reducers/root.reducer";
import {getUsersAndTeachers, upgradeUser, downgradeUser, banUser, unbanUser} from "../../reducers/users.reducer";
import {deleteCourse, fetchListCourses} from "../../reducers/listCoursesAdmin.reducer";
import {deleteCategory, fetchAllCategories} from "../../reducers/categories.reducer";
import HistoryProps from '../../types/HistoryProps.type';
import paths from "../../configs/paths.config";
import CourseBasicInfoProps from "../../types/CourseBasicInfoProps.type";
import Category from "../../types/Category.type";
import CatDialog from "./CatDialog";
import EditCatDialog from "./EditCatDialog";
import BigCatDialog from "./AddBigCatDialog";

const statesToProps = (state: RootState) => ({
    token: state.adminAuthorizationReducer.adminToken,
    users: state.usersReducer.users,
    // info: state.accountReducer.user,
    courses: state.listCoursesAdminReducer.listCourses,
    categories: state.categoriesReducer.categories,
    error: state.categoriesReducer.error,
});

const dispatchToProps = {
    getUsersAndTeachers,
    fetchListCourses,
    deleteCourse,
    fetchAllCategories,
    deleteCategory,
    upgradeUser,
    banUser,
    unbanUser,
    downgradeUser
};

const connector = connect(statesToProps, dispatchToProps);

type AdminProps = ConnectedProps<typeof connector> & HistoryProps;

const Admin = ({
                   // info,
                   token,
                   history,
                   users,
                   getUsersAndTeachers,
                   upgradeUser,
                   downgradeUser,
                   banUser,
                   unbanUser,
                   courses,
                   fetchListCourses,
                   deleteCategory,
                   deleteCourse,
                   categories,
                   error,
                   fetchAllCategories
               }: AdminProps) => {
    const [selected, setSelected] = useState(0);
    const [query, setQuery] = useState('');
    const [catDialog, setCatDialog] = useState(false);
    const [editCatDialog, setEditCatDialog] = useState(false);
    const [bigCatDialog, setBigCatDialog] = useState(false);
    const [selectedCat, setSelectedCat] = useState<Category>({
        _id: '',
        name: '',
        parentCategory: null,
        description: '',
        subCategories: [{category: ''}]
    });

    useEffect(() => {
        getUsersAndTeachers();
        fetchListCourses();
        fetchAllCategories();
    }, []);

    useEffect(() => {
        if (!token || token === "") {
            history.push(paths.base);
        }
    }, [])

    useEffect(() => {
        if (error) {
            alert("Could not delete this category which may have at least one course!");
        }
    }, [error])

    const openCatDialog = (cat: Category) => {
        setSelectedCat(cat);
        setCatDialog(true);
    }

    const closeCatDialog = () => {
        setCatDialog(false);
    }

    const openEditCatDialog = (cat: Category) => {
        setSelectedCat(cat);
        setEditCatDialog(true);
    }

    const closeEditCatDialog = () => {
        setEditCatDialog(false);
    }

    const openBigCatDialog = () => setBigCatDialog(true);

    const closeBigCatDialog = () => setBigCatDialog(false);

    const handleDeleteCourse = (course: CourseBasicInfoProps) => {
        if (window.confirm(`Are you sure you want to delete ${course.title}?`)) {
            deleteCourse(course._id);
        }
        ;
    }

    const handleDeleteCat = (cat: Category) => {
        if (window.confirm(`Are you sure you want to delete ${cat.name}?`)) {
            deleteCategory(cat._id);
        }
        ;
    }

    const Row = (row: Category) => {
        const [open, setOpen] = useState(false);

        return (
            <>
                <TableRow>
                    <TableCell align="center">
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                        <IconButton
                            onClick={() => handleDeleteCat(row)}
                            color="secondary"
                        >
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => openCatDialog(row)}
                            color="primary"
                        >
                            <Add/>
                        </IconButton>
                        <IconButton
                            onClick={() => openEditCatDialog(row)}
                            color="inherit"
                        >
                            <EditOutlined/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className='collapse' colSpan={4}>
                        <Collapse in={open} timeout='auto'>
                            <Table aria-label="simple table">
                                {categories.filter(cat => cat.parentCategory === row._id).map(cat => (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">-</TableCell>
                                            <TableCell align="center">{cat.name}</TableCell>
                                            <TableCell align="center">{cat.description}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={() => handleDeleteCat(cat)}
                                                    color="secondary"
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => openEditCatDialog(cat)}
                                                    color="inherit"
                                                >
                                                    <EditOutlined/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))}
                            </Table>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }

    return (
        <div className="container-admin">
            <div className='sidebar'>
                <div
                    onClick={() => {
                        history.push(paths.base);
                    }}
                    className='header'>
                    <img alt='logo' src={logo} className='logo'/>
                    <p className='title-admin'>Administrator</p>
                </div>
                {/*<img alt='avatar' src={info.avatar} className='avatar'/>*/}
                {/*<p className='name'>{info.fullname}</p>*/}
                <div style={selected === 0 ? {borderColor: '#e73e3e'} : {}} onClick={() => setSelected(0)}
                     className='sideOptions'>
                    <AccountCircle style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 0 ? {color: '#e73e3e'} : {})} className='icon'/>
                    <p style={selected === 0 ? {color: '#e73e3e'} : {}} className='text'>Users</p>
                </div>
                <div style={selected === 1 ? {borderColor: '#e73e3e'} : {}} onClick={() => setSelected(1)}
                     className='sideOptions'>
                    <ImportContacts style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 1 ? {color: '#e73e3e'} : {})} className='icon'/>
                    <p style={selected === 1 ? {color: '#e73e3e'} : {}} className='text'>Courses</p>
                </div>
                <div style={selected === 2 ? {borderColor: '#e73e3e'} : {}} onClick={() => setSelected(2)}
                     className='sideOptions'>
                    <CategoryOutlined style={Object.assign({}, {
                        width: '5vh',
                        height: '5vh'
                    }, selected === 2 ? {color: '#e73e3e'} : {})} className='icon'/>
                    <p style={selected === 2 ? {color: '#e73e3e'} : {}} className='text'>Categories</p>
                </div>
            </div>
            <div className='right'>
                {selected === 0 && <TableContainer component={Paper}>
                    <Table stickyHeader className='table' aria-label="simple table">
                        <TableHead className='header-table'>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        {users.length > 0 && <TableBody>
                            {users.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell align="center">{row.fullname}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">
                                            <Select
                                                native
                                                value={row.accountType}
                                                defaultValue={row.accountType}
                                                onChange={() => row.accountType === 'Student' ? upgradeUser(row._id) : downgradeUser(row._id)}
                                            >
                                                <option value='Student'>Student</option>
                                                <option value='Teacher'>Teacher</option>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => !row.isBanned ? banUser(row._id) : unbanUser(row._id)}
                                                color={!row.isBanned ? 'primary' : 'secondary'}
                                            >
                                                {!row.isBanned ? <LockOpenOutlined/> : <LockOutlined/>}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>}
                    </Table>
                </TableContainer>}
                {selected === 1 && <>
                    <TableFooter className='search-view'>
                        <TextField
                            className='input'
                            id="outlined-basic"
                            label='Search'
                            variant='outlined'
                            autoFocus
                            onChange={(e) => setQuery(e.target.value.toLowerCase())}
                            placeholder="Search by tutor's name or category"
                        />
                    </TableFooter>
                    <TableContainer component={Paper}>
                        <Table stickyHeader className='table' aria-label="simple table">
                            <TableHead className='header-table'>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Tutor</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">Rate</TableCell>
                                    <TableCell align="center">Options</TableCell>
                                </TableRow>
                            </TableHead>
                            {courses.length > 0 && <TableBody>
                                {courses.filter(course => course.tutor.fullname.toLowerCase().includes(query) || course.categoryName.toLowerCase().includes(query)).map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell align="center">{row.title}</TableCell>
                                        <TableCell align="center">{row.tutor.fullname}</TableCell>
                                        <TableCell align="center">{row.categoryName}</TableCell>
                                        <TableCell align="center">{row.averageRatings}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleDeleteCourse(row)}
                                                color="secondary"
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}
                        </Table>
                    </TableContainer>
                </>}
                {selected === 2 &&
                <>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead className='header-table'>
                                <TableRow>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Options</TableCell>
                                </TableRow>
                            </TableHead>
                            {categories.length > 0 && <TableBody>
                                {categories.filter(cat => !cat.parentCategory).map((row) => <Row
                                    key={row._id} {...row} />)}
                            </TableBody>}
                        </Table>
                    </TableContainer>
                    <TableFooter className='search-view'>
                        <Button color="primary" onClick={openBigCatDialog}>Add category</Button>
                    </TableFooter>
                </>
                }
            </div>
            <CatDialog open={catDialog} cat={selectedCat} onClose={closeCatDialog}/>
            <EditCatDialog open={editCatDialog} cat={selectedCat} onClose={closeEditCatDialog}/>
            <BigCatDialog open={bigCatDialog} onClose={closeBigCatDialog}/>
        </div>
    );
};

export default connector(Admin);