import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { handleUser } from '../Username';
import { useState } from 'react';
import { handleEmail } from '../Email';
import { handlePhoneno } from '../phone';
import { handlepassword } from '../password';



export default function SignUpPage() {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [emailerror, setemailerror] = useState(false);
    const [phoneno, setphoneno] = useState("");
    const [phoneerror, setphoneerror] = useState(false);
    const [passerror, setpasserror] = useState(false);
    const [pass, setpass] = useState("");


    const result =
        username !== "" &&
        pass !== "" &&

        (
            (email !== "" && !emailerror) ||
            (phoneno !== "" && !phoneerror)
        ) &&

        !(email !== "" && emailerror) &&
        !(phoneno !== "" && phoneerror) &&
        !passerror;


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
                    Sign Up
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
                        error={emailerror}
                    >
                        <OutlinedInput
                            onChange={(e) => { handleEmail(e, setemail, setemailerror) }}
                            value={email}
                            placeholder="Please enter Email Id" />
                    </FormControl>
                    <FormControl
                        sx={{ width: '100%', paddingBottom: '20px' }}
                        error={phoneerror}
                    >
                        <OutlinedInput
                            onChange={(e) => { handlePhoneno(e, setphoneno, setphoneerror) }}
                            value={phoneno}
                            placeholder="Please enter Phone No" />
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
                        disabled={!result}
                        onClick={async (e) => {

                            try {

                                e.preventDefault();

                                const response = await fetch(
                                    'http://localhost:3000/signup',
                                    {
                                        method: 'POST',

                                        headers: {
                                            "Content-Type": "application/json",
                                        },

                                        body: JSON.stringify({
                                            userName: username,
                                            email: email,
                                            phoneNo: phoneno,
                                            password: pass
                                        })
                                    }
                                );

                                const data = await response.json();

                                if (!response.ok) {

                                    alert(data.message);

                                    return;
                                }

                                alert(data.message);

                                navigate('/signin');

                            } catch (err) {

                                console.log(err);

                                alert("Something went wrong");

                            }

                        }}
                    >
                        SignUp
                    </Button>

                    <Typography
                        variant="body2"
                        style={{
                            marginTop: '20px',
                            color: '#555',
                        }}
                    >
                        Did you have an account?
                    </Typography>

                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => navigate('/signin')}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </center>
    );
}