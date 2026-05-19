import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { handleUser } from './Username';
import { handleEmail } from './Email';
import { handlePhoneno } from './phone';
import dayjs from 'dayjs';
import { handlepassword } from './password';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },

}));

export default function UserManagement() {
    const [selectedUser, setSelectedUser] = useState({});
    const [users, setUsers] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openpass, setopenpass] = useState(false);
    const [emailerror, setemailerror] = useState(false);
    const [phoneerror, setphoneerror] = useState(false);
    const [oldPassError, setOldPassError] = useState(false);
    const [newPassError, setNewPassError] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const handlePasswordChange = async () => {

        try {

            const response = await fetch(
                `http://localhost:3000/changepassword/${selectedUser.uid}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldPassword: passwordData.oldPassword,
                        newPassword: passwordData.newPassword
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            if (response.ok) {

                setopenpass(false);
                getUsers();

                setPasswordData({
                    oldPassword: '',
                    newPassword: ''
                });
                setOldPassError(false);
                setNewPassError(false);

            }

        } catch (err) {

            console.log(err);

        }

    };
    const handleSave = async () => {

        try {

            await fetch(
                `http://localhost:3000/update/${selectedUser.uid}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(selectedUser)
                }
            );

            setOpenEdit(false);

            getUsers();

        } catch (err) {

            console.log(err);

        }

    };
    useEffect(() => {

        getUsers();

    }, []);

    const getUsers = async () => {

        try {

            const response = await fetch(
                'http://localhost:3000/user'
            );

            const data = await response.json();

            //console.log(data);

            setUsers(data.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (
        <>
            <Navbar />

            <TableContainer component={Paper} style={{ paddingTop: '45px' }}>

                <Table sx={{ minWidth: 700 }}>

                    <TableHead>

                        <TableRow>

                            <StyledTableCell align='center'>
                                UID
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                User Name
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Email Id
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Phone No
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Status
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Created Date
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Updated Date
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Edit
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                change password
                            </StyledTableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {users.map((row) => (

                            <StyledTableRow key={row.uid}>

                                <StyledTableCell>
                                    {row.uid}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {row.userName}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {row.email}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {row.phoneNo}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {row.status}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {dayjs(row.created_date).format('DD-MM-YYYY hh:mm A')}
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    {
                                        row.updated_date
                                            ? dayjs(row.updated_date).format('DD-MM-YYYY hh:mm A')
                                            : '-'
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center">

                                    <IconButton onClick={() => {
                                        setSelectedUser(row);
                                        setOpenEdit(true);
                                    }}>

                                        <EditIcon />

                                    </IconButton>

                                </StyledTableCell>

                                <StyledTableCell align="center">

                                    <IconButton onClick={() => {
                                        setSelectedUser(row);
                                        setopenpass(true);
                                    }}>

                                        <LockResetIcon />

                                    </IconButton>

                                </StyledTableCell>

                            </StyledTableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>
            <Dialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle>
                    Edit User
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="User Name"
                        value={selectedUser?.userName || ''}
                        onChange={(e) => {
                            handleUser(
                                e,
                                (value) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        userName: value
                                    })
                            );
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        error={emailerror}
                        helperText={emailerror ? 'Invalid Email' : ''}
                        value={selectedUser?.email || ''}
                        onChange={(e) => {
                            handleEmail(
                                e,
                                (value) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        email: value
                                    }),
                                setemailerror
                            );
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Phone No"
                        error={phoneerror}
                        helperText={phoneerror ? 'Invalid Phone Number' : ''}
                        value={selectedUser?.phoneNo || ''}
                        onChange={(e) => {
                            handlePhoneno(
                                e,
                                (value) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        phoneNo: value
                                    }),
                                setphoneerror
                            );
                        }}
                    />


                    <FormControl
                        fullWidth
                        margin="dense"
                    >

                        <InputLabel>
                            Status
                        </InputLabel>

                        <Select
                            value={selectedUser?.status || ''}
                            label="Status"
                            onChange={(e) =>
                                setSelectedUser({
                                    ...selectedUser,
                                    status: e.target.value
                                })
                            }
                        >

                            <MenuItem value={1}>
                                Inactive
                            </MenuItem>

                            <MenuItem value={2}>
                                Active
                            </MenuItem>

                            <MenuItem value={3}>
                                Blocked
                            </MenuItem>

                        </Select>

                    </FormControl>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpenEdit(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={emailerror || phoneerror}
                    >
                        Save
                    </Button>

                </DialogActions>

            </Dialog>
            <Dialog
                open={openpass}
                onClose={() => setopenpass(false)}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle>
                    Password Change {selectedUser.userName}
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Old Password"
                        type="password"
                        error={oldPassError}
                        helperText={oldPassError ? 'Invalid Password Format' : ''}
                        value={passwordData.oldPassword}
                        onChange={(e) => {
                            handlepassword(
                                e,
                                (value) =>
                                    setPasswordData({
                                        ...passwordData,
                                        oldPassword: value
                                    }),
                                setOldPassError
                            );
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="New Password"
                        type="password"
                        error={newPassError}
                        helperText={
                            newPassError
                                ? 'Password must contain uppercase, lowercase, number & special character'
                                : ''
                        }
                        value={passwordData.newPassword}
                        onChange={(e) => {
                            handlepassword(
                                e,
                                (value) =>
                                    setPasswordData({
                                        ...passwordData,
                                        newPassword: value
                                    }),
                                setNewPassError
                            );
                        }}
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => {

                            setopenpass(false);

                            setPasswordData({
                                oldPassword: '',
                                newPassword: ''
                            });

                            setOldPassError(false);

                            setNewPassError(false);

                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handlePasswordChange}
                        disabled={
                            oldPassError ||
                            newPassError ||
                            passwordData.oldPassword.trim() === '' ||
                            passwordData.newPassword.trim() === ''
                        }
                    >
                        Save Password
                    </Button>

                </DialogActions>

            </Dialog>
        </>
    );

}