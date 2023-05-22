import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from '../../Axios';
import './ToDoDetails.css';
import { useEffect, useState } from "react";
import { Button, CircularProgress, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";

const ToDoDetails = () => {
    const [todo, setTodo] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = async () => {
        try {
            const response = await axiosInstance.get(`/todos/${id}`);
            console.log(response);
            setTodo(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleHomeBtn = () => {
        navigate('/');
    }

    const handleUpdateBtn = () => {
        navigate(`/edit-to-do/${todo.id}`);
    }

    return (
        todo ?
            <div className="to-do-details">
                <Typography color="primary" variant="h2" component="h1" my={4} sx={{ textAlign: 'center' }}>Edit todo</Typography>
                <TextField
                    style={{ width: 500, marginBottom: 20 }}
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    value={todo.title}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Table sx={{ maxWidth: 300, marginBottom: 2 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell><b>Created at:</b></TableCell>
                            <TableCell>{(new Date(todo.created_at)).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Updated on:</b></TableCell>
                            <TableCell>{(new Date(todo.modified_at)).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="edit-btns">
                    <Button onClick={handleHomeBtn} className="btn" variant="contained" color="warning">
                        Home
                    </Button>
                    <Button onClick={handleUpdateBtn} className="btn" variant="contained" color="primary">
                        Edit
                    </Button>
                </div>
            </div>
            : <div>
                <CircularProgress color="primary" />
            </div>

    );
}

export default ToDoDetails;