import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function CreateStudent() {
    let baseURL = "http://localhost:8080";
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('studentName'),
            address: data.get('address'),
        });
        const stu = {
            name: data.get('studentName'),
            address: data.get('address')
        }
        fetch(baseURL + '/students/add', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stu)
        })
            .then(function (response) {
                if (response.status === 200) {
                    setAlertContent("Student created successfully");
                    setStudentCreationStatus('success');
                    setAlert(true);
                } else {
                    setAlertContent("Student creation failed");
                    setStudentCreationStatus('error');
                    setAlert(true);
                }

                console.log(response);
            })
            .catch(function (error) {
                setAlertContent("Student creation failed");
                setStudentCreationStatus('error');
                setAlert(true);
                console.log(error);
            });
    };

    const [alert, setAlert] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState('');
    const [studentCreationStatus, setStudentCreationStatus] = React.useState('error');

    return (
        <><Typography component="h1" variant="h5">
            Enter details
        </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="studentName"
                    label="Student Name"
                    name="studentName"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="text"
                    id="address"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onSubmit={handleSubmit}
                >
                    Create student
                </Button>
            </Box>
            {alert ? <Alert onClose={() => { setAlert(false) }} severity={studentCreationStatus}>
                <AlertTitle>{studentCreationStatus}</AlertTitle>
                {alertContent}
            </Alert> : <></>}
            </>
    )

}