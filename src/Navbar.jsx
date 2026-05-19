import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
export default function Navbar() {
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/signin');
        }

    }, []);
    return (

        <Box sx={{ flexGrow: 1 }}>

            <AppBar
                position="static"
                sx={{
                    height: "45px",
                    justifyContent: "center"
                }}
            >

                <Toolbar
                    sx={{
                        minHeight: "45px !important"
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                        style={{ textAlign: "center" }}
                    >
                        ToDo App
                    </Typography>
                    <Button color='inherit' onClick={() => {
                        navigate('/user-Management');
                    }}> User Management </Button>
                    <Button color="inherit" onClick={() => {
                        localStorage.removeItem("token");
                        navigate('/signin')
                    }}>
                        Logout
                    </Button>

                </Toolbar>

            </AppBar>

        </Box>

    );
}