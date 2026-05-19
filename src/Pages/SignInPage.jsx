import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handlepassword } from '../password';
import { handleUser } from '../Username';


export default function SignIn() {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [passerror, setpasserror] = useState(false);
    const [pass, setpass] = useState("");
    const login_result = username !== "" &&
        pass !== "" && !passerror;

    return (
        <center>
            <Paper
                elevation={5}
                style={{
                    width: '350px',
                    padding: '40px',
                    marginTop: '100px',
                    borderRadius: '15px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                <Typography
                    variant="h4"
                    style={{
                        paddingBottom: '25px',
                        fontWeight: 'bold',
                        color: '#333',
                    }}
                >
                    Sign In
                </Typography>

                <form noValidate autoComplete="off">
                    <FormControl
                        sx={{ width: '100%', paddingBottom: '20px' }}
                    >
                        <OutlinedInput
                            onChange={(e) => { handleUser(e, setusername) }}
                            value={username}
                            placeholder="Please enter Username" />
                    </FormControl>

                    <FormControl
                        sx={{ width: '100%', paddingBottom: '20px' }}
                        error={passerror}
                    >
                        <OutlinedInput
                            onChange={(e) => { handlepassword(e, setpass, setpasserror) }}
                            value={pass}
                            placeholder="Please enter Password"
                        />
                    </FormControl>

                    <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            marginTop: '10px',
                        }}
                        disabled={!login_result}
                        onClick={async (e) => {

                            try {

                                e.preventDefault();

                                const response = await fetch(
                                    `http://localhost:3000/login?userName=${username}&password=${pass}`
                                );
                                const data = await response.json();
                                // console.log(data);
                                if (!response.ok) {
                                    alert(data.message);
                                    return;
                                }
                                localStorage.setItem("token", data.token);

                                //console.log(localStorage.getItem("token"));

                                alert(data.message);

                                navigate('/todo');

                            }
                            catch (err) {

                                console.log(err);

                                alert("Something went wrong");
                            }
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => navigate('/forgot')}
                    >
                        Forgot Password
                    </Button>

                    <Typography
                        variant="body2"
                        style={{
                            marginTop: '20px',
                            color: '#555',
                        }}
                    >
                        Don’t have an account?
                    </Typography>

                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => navigate('/signup')}
                    >
                        Create Account
                    </Button>
                </form>
            </Paper>
        </center >
    );
}