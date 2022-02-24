
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function ViewStudent() {
    let baseURL = "http://localhost:8080";
    const [students1, setStudents] = React.useState([]);

    const [sid, setId] = React.useState('');
    const [sname, setName] = React.useState('');
    const [saddress, setAddress] = React.useState('');
    const [showStudent, setShowStudent] = React.useState(false);


    const handleSubmitForViewStudent = (event) => {
        event.preventDefault();

        fetch(baseURL + '/students/getAll', {
            method: 'get',
            headers: { "Content-Type": "application/json" },

        }).then((res) => res.json())
            .then(data => setStudents(data))
            .catch(function (error) {

                console.log(error);
            });

    };
    const handleSubmitForViewOneStudent = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('studentID'),
        });
        fetch(baseURL + '/students/student/' + data.get('studentID'), {
            method: 'get',
            headers: { "Content-Type": "application/json" },

        }).then((res) => res.json())
            .then(data => {
                setShowStudent(true);
                setId(data.id);
                setAddress(data.name);
                setName(data.address);
            })
            .catch(function (error) {

                console.log(error);
            });

    };

    const handleSubmitForDeleteStudent = (event) => {
        event.preventDefault();
        console.log(
            "id" + event.target.id
        );
        fetch(baseURL + '/students/student/' +event.target.id , {
            method: 'delete',
            headers: { "Content-Type": "application/json" },

        })
            .then(data => {
                setShowStudent(false)
                setId('');
                setAddress('');
                setName('');
            })
            .catch(function (error) {

                console.log(error);
            });

    };

    return (
        <><Box component="form" onSubmit={handleSubmitForViewOneStudent} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="studentID"
                label="Student ID"
                name="studentID"
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                View Student
            </Button>
        </Box>
            <Box component="form" onSubmit={handleSubmitForViewStudent} noValidate sx={{ mt: 1 }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    View ALL Students
                </Button>
            </Box>

            {showStudent ? <Paper elevation={3} >


                <Box noValidate sx={{ mt: 1 }}>
                    ID: {sid} <br />
                    Name: {sname}<br />
                    Address: {saddress} <br />
                    <Button
                        id={sid}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmitForDeleteStudent} 
                    >Delete</Button>
                </Box>

            </Paper> : null}
            <Paper elevation={3} >
                {students1.map(student => (
                    <Paper elevation={6} key={student.id} style={{ padding: "15px", margin: "10px" }}>
                        ID: {student.id} <br />
                        Name: {student.name}<br />
                        Address: {student.address}

                    </Paper>
                ))}
            </Paper>
     </>
    );
}  