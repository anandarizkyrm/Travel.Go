import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import {
    IconButton,
    Collapse,
    Popper,
    Paper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Avatar,
    Divider,
    Box,
} from "@material-ui/core";
import Link from "../../src/Link";
import { useDispatch } from "react-redux";

function randomColor(string) {
    return "#f" + string.slice(1, 6);
}

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    },
    menuMobileWrapper: {
        backgroundColor: "#757575",
        color: "#ccc",
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        borderBottom: "17px solid white",
        position: "absolute",
        top: -7,
        right: theme.spacing(2.7),
    },
    menu: {
        marginLeft: 13,
        fontSize: 16,
        fontFamily: "poppins",
        fontWeight: "500",
        color: "gray",
        [theme.breakpoints.down("md")]: {
            color: "gray",
            marginLeft: 12,
            padding: "0px",
            fontSize: 14,
            fontFamily: "poppins",
            fontWeight: "500",
        },
    },
    icon: {
        marginLeft: 2,
        filter: "grayscale(100%)",
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
            // position: "absolute",
        },
    },
    menuItem: {
        "&:hover": {
            backgroundColor: "#e5e5e5",
        },
    },
    avatar: {
        fontWeight: "bold",
        fontSize: 15,
        [theme.breakpoints.up("lg")]: {
            width: 35,
            height: 35,
            // position: "absolute",
        },
        [theme.breakpoints.down("xs")]: {
            width: 30,
            height: 30,
            // position: "absolute",
        },
    },
    paper: {
        width: 220,

        [theme.breakpoints.down("md")]: {
            width: 125,
            width: 220,
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0px",
            width: 220,

            // position: "absolute",
        },
    },
    iconButton: {
        width: "7px",
        height: "4px",
    },
}));

export default function UserMenu({ user, logout, drawerState }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        router.push("/");
        logout(dispatch);
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                size="small"
            >
                <Avatar
                    className={classes.avatar}
                    src={`http://localhost:5000/images/${user.profile}`}
                    style={{
                        backgroundColor: randomColor(
                            user.phone ? user.phone : "pink"
                        ),
                    }}
                >
                    {user?.username?.slice(0, 1).toUpperCase()}
                </Avatar>
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                placement="bottom-end"
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Collapse
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper className={classes.paper}>
                            <Box variant="div" className={classes.arrow} />
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {user.admin ? (
                                        <Box variant="div">
                                            <MenuItem
                                                component={Link}
                                                href="/profile"
                                                className={classes.menuItem}
                                                onClick={handleClose}
                                                style={{ marginTop: 5 }}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/user.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Profile
                                                </span>
                                            </MenuItem>
                                            <MenuItem
                                                component={Link}
                                                href="/addtrip"
                                                className={classes.menuItem}
                                                onClick={handleClose}
                                                style={{ marginTop: 5 }}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/journey.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Add Trip
                                                </span>
                                            </MenuItem>
                                            <MenuItem
                                                component={Link}
                                                href="/trip"
                                                className={classes.menuItem}
                                                onClick={handleClose}
                                                style={{ marginTop: 5 }}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/plane.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Trip
                                                </span>
                                            </MenuItem>
                                            <Divider
                                                style={{
                                                    height: 3,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                }}
                                            />
                                            <MenuItem onClick={handleLogout}>
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/logout.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Logout
                                                </span>
                                            </MenuItem>
                                        </Box>
                                    ) : (
                                        <Box
                                            className={classes.box}
                                            variant="div"
                                        >
                                            <MenuItem
                                                component={Link}
                                                href={`/profile`}
                                                className={classes.menuItem}
                                                onClick={handleClose}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/user.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Profile
                                                </span>
                                            </MenuItem>
                                            <MenuItem
                                                component={Link}
                                                href={`/order/`}
                                                className={classes.menuItem}
                                                onClick={handleClose}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/bill.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Your Order
                                                </span>
                                            </MenuItem>
                                            <Divider
                                                style={{
                                                    height: 3,
                                                    marginTop: 20,
                                                    marginBottom: 10,
                                                }}
                                            />
                                            <MenuItem
                                                className={classes.menuItem}
                                                onClick={handleLogout}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/anfedu/dewe_tour/master/client/public/logout.png"
                                                    className={classes.icon}
                                                    alt=""
                                                />{" "}
                                                <span className={classes.menu}>
                                                    Logout
                                                </span>
                                            </MenuItem>
                                        </Box>
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Collapse>
                )}
            </Popper>
        </div>
    );
}
