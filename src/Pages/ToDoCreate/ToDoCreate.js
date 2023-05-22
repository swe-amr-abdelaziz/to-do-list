import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from '../../Axios';
import './ToDoCreate.css';

const ToDoCreate = () => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

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
            handleSubmitBtn(event);
        }
    };

    const handleSubmitBtn = async (event) => {
        event.preventDefault();

        if (inputValue.trim() === "" || inputValue.length < 5 || inputValue.length > 100) {
            setError(true);
        } else {
            await axiosInstance.post("/todos", {
                title: inputValue.trim(),
                created_at: Date.now(),
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
            <Typography color="primary" variant="h2" component="h1" my={4} sx={{ textAlign: 'center' }}>Create new todo</Typography>
            <form className="create-container" onSubmit={handleSubmitBtn}>
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
                <div className="create-btns">
                    <Button onClick={handleHomeBtn} className="btn" variant="contained" color="warning">
                        Home
                    </Button>
                    <Button onClick={handleSubmitBtn} className="btn" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ToDoCreate;