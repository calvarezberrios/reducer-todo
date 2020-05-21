import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../hooks/useForm";

const useStyles = makeStyles(() => ({
    completed: {
        textDecoration: "line-through"
    }
}));

export default function Todo({ task, dispatch }) {
    const classes = useStyles();
    const [isEditing, setIsEditing] = React.useState(false);
    const [input, handleChange] = useForm({ edit: task.name });

    const setCompleted = e => {
        dispatch({
            type: "edit",
            payload: {
                elem: "tasks",
                item: task,
                value: {
                    ...task,
                    completed: !task.completed
                }
            }
        });
    };

    const deleteTask = () => {
        dispatch({
            type: "delete",
            payload: {
                elem: "tasks",
                value: task
            }
        });
    }

    const editTask = e => {
        if (input.edit.length === 0) {
            deleteTask();
        }

        dispatch({
            type: "edit",
            payload: {
                elem: "tasks",
                item: task,
                value: {
                    ...task,
                    name: input.edit
                }
            }
        });

        setIsEditing(!isEditing);
    };




    React.useEffect(() => {
        if (task.name.length === 0) {
            setIsEditing(true);
        }
    }, [task.name.length, setIsEditing]);

    const handleKeyPress = e => {
        if(e.key === "Enter") {
            editTask(e);
        }
    }

    React.useEffect(() => {
        if(isEditing) {
            document.querySelector("#editTask").focus();
        }
    }, [isEditing])


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
                {isEditing ? (
                    <>
                        <TextField
                            id="editTask"
                            label="Edit Task"
                            name="edit"
                            value={input.edit}
                            onKeyPress = {handleKeyPress}
                            onBlur = {editTask}
                            onChange={handleChange}                            
                        />
                        <Link variant="body1" component="button" onClick={editTask}>
                            <SystemUpdateAltIcon style={{ marginRight: "5px" }} />
                        </Link>
                    </>
                ) : (
                        // End of edit field

                        <>
                            <FormControlLabel
                                className={task.completed ? ` ${classes.completed}` : ""}
                                control={
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={setCompleted}
                                        name="completed"
                                        color="primary"
                                    />
                                }
                                label={task.name}
                            />
                            <div className="manageButtons">
                                <Link
                                    variant="body1"
                                    component="button"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    <EditIcon style={{ marginRight: "5px" }} />
                                </Link>

                                <Link
                                    variant="body1"
                                    component="button"
                                    onClick={deleteTask}
                                >
                                    <DeleteIcon style={{ marginRight: "5px" }} />
                                </Link>
                            </div>

                        </>
                    )}
            </span>
            <hr
                style={{ border: "1px solid #ccc", width: "100%", margin: "20px 0" }}
            />
        </div>
    );
}
