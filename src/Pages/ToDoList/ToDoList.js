import { Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from '../../Axios';
import './ToDoList.css';

const ToDoList = () => {
    const [todos, setTodos] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getTodos();
    }, []);

    const handleCreateBtn = () => {
        navigate('/create-to-do');
    }

    const handleEditBtn = (id) => {
        navigate(`/edit-to-do/${id}`);
    }

    const handleDeleteBtn = async (id) => {
        await axiosInstance.delete(`/todos/${id}`)
        .then(data => {
            getTodos();
        })
        .catch(error => {
            console.error(error);
        })
    }

    const getTodos = async () => {
        try {
            const response = await axiosInstance.get("/todos");
            console.log(response.data);
            const arr = response.data;
            arr.sort((a, b) => b.created_at - a.created_at);
            setTodos(arr);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="to-do-list">
            <Typography color="primary" variant="h2" component="h1" my={4} sx={{ textAlign: 'center' }}>To Do App</Typography>
            <Button onClick={handleCreateBtn} className="btn" variant="contained" startIcon={<FontAwesomeIcon icon={faAdd} />}>
                Create
            </Button>
            {todos ?
                <div>
                    {todos.map(todo => (
                        <Stack sx={{ marginTop: '25px' }} key={todo.id} direction={"row"} alignItems={"center"} spacing={2}>
                            <Link to={`/to-do-list/${todo.id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{ minWidth: 500 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {todo.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {(new Date(todo.created_at)).toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Button onClick={() => handleDeleteBtn(todo.id)} className="btn" variant="contained" color="error" startIcon={<FontAwesomeIcon icon={faTrash} />}>
                                Delete
                            </Button>
                            <Button onClick={() => {handleEditBtn(todo.id)}} className="btn" variant="contained" color="success" startIcon={<FontAwesomeIcon icon={faEdit} />}>
                                Edit
                            </Button>
                        </Stack>
                    ))}
                </div> :
                <div>
                    <CircularProgress color="primary" />
                </div>}
        </div>
    );
}

export default ToDoList;