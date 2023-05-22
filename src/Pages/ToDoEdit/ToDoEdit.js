import { Button, CircularProgress, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from '../../Axios';
import './ToDoEdit.css';

const ToDoEdit = () => {
    const [todo, setTodo] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = async () => {
        try {
            const response = await axiosInstance.get(`/todos/${id}`);
            console.log(response);
            setInputValue(response.data.title);
            setTodo(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setError(false);
        setErrorMsg("");

        if (value.trim() === "") {
            setError(true);
            setErrorMsg("Content is required");
        } else if (value.length < 5) {
            setError(true);
            setErrorMsg("Content should be at least 5 characters");
        } else if (value.length > 100) {
            setError(true);
            setErrorMsg("Content should be at most 100 characters");
        }
    };

    const handleHomeBtn = () => {
        navigate('/');
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleUpdateBtn(event);
        }
    };

    const handleUpdateBtn = async (event) => {
        event.preventDefault();

        if (inputValue.trim() === "" || inputValue.length < 5 || inputValue.length > 100) {
            setError(true);
        } else {
            await axiosInstance.patch(`/todos/${todo.id}`, {
                title: inputValue.trim(),
                modified_at: Date.now()
            })
                .then(data => {
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="to-do-list">
            <Typography color="primary" variant="h2" component="h1" my={4} sx={{ textAlign: 'center' }}>Edit todo</Typography>
            {todo ?
                <form className="edit-container" onSubmit={handleUpdateBtn}>
                    <TextField
                        style={{ width: 500, marginBottom: 20 }}
                        id="outlined-multiline-static"
                        label="To Do"
                        multiline
                        rows={4}
                        value={inputValue}
                        onChange={handleChange}
                        error={error}
                        helperText={errorMsg}
                        onKeyPress={handleKeyPress}
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
                        </TableBody>
                    </Table>
                    <div className="edit-btns">
                        <Button onClick={handleHomeBtn} className="btn" variant="contained" color="warning">
                            Home
                        </Button>
                        <Button onClick={handleUpdateBtn} className="btn" variant="contained" color="primary">
                            Update
                        </Button>
                    </div>
                </form>
                : <div>
                    <CircularProgress color="primary" />
                </div>}
        </div>
    );
}

export default ToDoEdit;