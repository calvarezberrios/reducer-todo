import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InboxIcon from "@material-ui/icons/Inbox";
import Badge from "@material-ui/core/Badge";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { indigo } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import useLocalStorage from "../hooks/useLocalStorage";
import { reducer } from "../reducers/reducer";
import TodoList from "./TodoList";
import useForm from "../hooks/useForm";
import useDarkMode from "../hooks/useDarkMode";

const drawerWidth = 250;

const CustomSwitch = withStyles({
    switchBase: {
        color: indigo[500],
        '&$checked': {
            color: indigo[500],
        },
        '&$checked + $track': {
            backgroundColor: indigo[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const StyledBadge = withStyles(theme => ({
    badge: {
        border: "none"
    }
}))(Badge);

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    margin: {
        margin: theme.spacing(1)
    },
    bigButtonBadge: {
        right: "-12px",
        top: "1px"
    },
    button: {
        margin: theme.spacing(0),
        width: "90%"
    },
    add: {
        display: "flex",
        padding: "10px",
        alignItems: "center"
    },
    listNames: {
        display: "flex",
        padding: "3px 10px",
        alignItems: "center"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function SideBar(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [savedState, setSavedState] = useLocalStorage("state", "");
    const [state, dispatch] = useReducer(
        reducer,
        savedState
            ? savedState
            : {
                tasks: [],
                lists: [],
                selectedList: ""
            }
    );
    const [filteredTasks, setFilteredTasks] = React.useState(state.tasks);
    const [input, handleChange] = useForm({ search: "" });
    const [darkMode, setDarkMode] = useDarkMode(false);

    useEffect(() => {
        if(darkMode) {
            document.body.classList.add("darkMode");
        }
    }, [darkMode]);

    useEffect(() => {
        setSavedState(state);
    }, [state, setSavedState]);

    useEffect(() => {
        if (input.search.length > 0) {
            dispatch({ type: "edit", payload: { elem: "selectedList", value: "" } });
        }

        setFilteredTasks(
            state.tasks.filter(task => {
                if (state.selectedList) {
                    if (state.selectedList === "Completed Tasks") {
                        return task.completed;
                    }
                    return task.list === state.selectedList && !task.completed;
                }

                return task.name.toLowerCase().includes(input.search.toLowerCase());
            })
        );
    }, [state.tasks, input.search, state.selectedList]);

    const createNewList = e => {
        const input = prompt("List Name: ");

        if (input) {
            dispatch({
                type: "add",
                payload: {
                    elem: "lists",
                    value: [...state.lists, input]
                }
            });
        }
    };

    const createNewTask = e => {
        dispatch({
            type: "add",
            payload: {
                elem: "tasks",
                value: [
                    ...state.tasks,
                    {
                        name: "",
                        id: Date.now(),
                        completed: false,
                        list: state.selectedList
                    }
                ]
            }
        });
    };

    const deleteList = list => {
        dispatch({
            type: "delete",
            payload: { elem: "lists", value: list }
        });

        dispatch({
            type: "add",
            payload: {
                elem: "tasks",
                value: state.tasks.filter(task => task.list !== list)
            }
        });

        dispatch({ type: "edit", payload: { elem: "selectedList", value: "" } });
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <FormGroup style = {{ width: "100%", textAlign: "center"}}>
                <FormControlLabel
                    style = {{ margin: "0 5px"}}
                    control={<CustomSwitch checked={darkMode} onChange={setDarkMode} name="darkMode" />}
                    label="Dark Mode"
                />
            </FormGroup>
            <List>
                <div className={classes.margin}>
                    <Grid container spacing={0} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField
                                
                                label="Search Tasks..."
                                name="search"
                                value={input.search}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </div>
            </List>

            <Grid container spacing={0} style={{ padding: "0 10px" }}>
                <Grid item xs>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<InboxIcon />}
                        onClick={() => {
                            dispatch({
                                type: "edit",
                                payload: { elem: "selectedList", value: "" }
                            });
                        }}
                    >
                        All
            <StyledBadge
                            className={classes.bigButtonBadge}
                            badgeContent={state.tasks.length}
                        />
                    </Button>
                </Grid>
                <Grid item xs>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AssignmentTurnedInIcon />}
                        onClick={() => {
                            dispatch({
                                type: "edit",
                                payload: { elem: "selectedList", value: "Completed Tasks" }
                            });
                        }}
                    >
                        Done
            <StyledBadge
                            className={classes.bigButtonBadge}
                            badgeContent={state.tasks.filter(task => task.completed).length}
                        />
                    </Button>
                </Grid>
            </Grid>

            <Link variant="body2" className={classes.add} onClick={createNewList}>
                <AddCircleIcon style={{ marginRight: "5px" }} />
        Add List...
      </Link>

            <List>
                {state.lists.map((list, index) => (
                    <li
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 15px"
                        }}
                    >
                        <Link
                            onClick={() => deleteList(list)}
                            component="button"
                            variant="body2"
                        >
                            x
                        </Link>

                        <Link
                            onClick={() =>
                                dispatch({
                                    type: "add",
                                    payload: { elem: "selectedList", value: list }
                                })
                            }
                            component="button"
                            variant="body2"
                            className={classes.listNames}
                            style={{ paddingRight: "0px" }}
                        >
                            {list}
                        </Link>
                        
                        <StyledBadge
                            badgeContent={
                                state.tasks.filter(
                                    task => task.list === list && !task.completed
                                ).length
                            }
                            color="primary"
                        />
                        
                    </li>
                ))}
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                        noWrap
                    >
                        {state.selectedList
                            ? state.selectedList
                            : input.search.length > 0
                                ? `Results for: ${input.search}`
                                : "Reminders"}

                        {state.selectedList && state.selectedList !== "Completed Tasks" && (
                            <Link
                                component="button"
                                variant="body2"
                                className={classes.add}
                                onClick={createNewTask}
                                style={{ color: "white" }}
                            >
                                <AddCircleIcon />
                            </Link>
                        )}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="task lists">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <TodoList tasks={filteredTasks} dispatch={dispatch} />
            </main>
        </div>
    );
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default SideBar;
