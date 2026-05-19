import {
    TextField,
    Button,
    Paper,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";

import { useState } from "react";

import { handleEmail } from "./Email";
import { handlePhoneno } from "./phone";
import { handlepassword } from "./password";

export default function Forgot() {

    const [type, setType] = useState("email");

    const [value, setValue] = useState("");

    const [inputError, setInputError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [newPassError, setNewPassError] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState(false);

    const result =
        value !== '' &&
        newPassword !== '' &&
        confirmPassword !== '' &&
        !inputError &&
        !newPassError;

    const handleInputChange = (e) => {

        if (type === "email") {

            handleEmail(
                e,
                setValue,
                setInputError
            );

        } else {

            handlePhoneno(
                e,
                setValue,
                setInputError
            );

        }

    };

    const handleSubmit = async () => {

        if (newPassword !== confirmPassword) {

            setConfirmPassError(true);

            return;

        }

        try {

            const response = await fetch(
                'http://localhost:3000/forgotpassword',
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        type,
                        value,
                        password: newPassword
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <center>

            <Paper
                elevation={5}
                style={{
                    width: '350px',
                    padding: '40px',
                    marginTop: '100px'
                }}
            >

                <Typography
                    variant="h5"
                    style={{
                        paddingBottom: '20px'
                    }}
                >
                    Forgot Password
                </Typography>

                <RadioGroup
                    row
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                        setValue('');
                        setInputError(false);
                    }}
                >

                    <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="Email"
                    />

                    <FormControlLabel
                        value="phone"
                        control={<Radio />}
                        label="Phone Number"
                    />

                </RadioGroup>

                <TextField
                    fullWidth
                    margin="dense"
                    label={
                        type === "email"
                            ? "Email"
                            : "Phone Number"
                    }
                    value={value}
                    error={inputError}
                    onChange={handleInputChange}
                />

                <TextField
                    fullWidth
                    margin="dense"
                    label="New Password"
                    type="password"
                    error={newPassError}
                    value={newPassword}
                    onChange={(e) => {
                        handlepassword(
                            e,
                            setNewPassword,
                            setNewPassError
                        );
                    }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    error={confirmPassError}
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPassError(false);
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    style={{
                        marginTop: '20px'
                    }}
                    onClick={handleSubmit}
                    disabled={!result}
                >
                    Change Password
                </Button>

            </Paper>

        </center>
    );

}