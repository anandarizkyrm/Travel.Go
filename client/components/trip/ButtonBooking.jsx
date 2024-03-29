import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#757575",
        color: "white",
        height: 50,
        width: 213,
        fontFamily: "poppins",
        fontWeight: "light",
        [theme.breakpoints.down("xs")]: {
            height: 30,
            width: 100,
        },
    },
    now: {
        marginLeft: 7,
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
}));

export default function ButtonBooking({ price, count, tripId, item }) {
    const classes = useStyles();
    const router = useRouter();

    const onSubmit = () => {
        router.push({
            pathname: "/book",
            query: { pid: price, cid: count, tid: tripId },
            // asPath: `/book/${count}`,
        });
    };

    return (
        <>
            <Button
                variant="contained"
                className={classes.button}
                onClick={onSubmit}
            >
                Book <span className={classes.now}>Now</span>
            </Button>
        </>
    );
}
