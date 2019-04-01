export const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        width: `calc(100vw - 24px)`
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%"
    },
    paperLeft: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "400"
        // position: "fixed"
    },
    nameLink: {
        color: "black"
    },
    leftButton: {
        borderRadius: 40
    },
    actionPaper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-AROUND"
    },
    descriptionPaper: {
        padding: theme.spacing.unit * 2,
        // textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%"
    },
    header: {
        textAlign: "center"
    },
    descriptionTitle: {
        color: theme.palette.primary.main,
        width: 200,
        display: "inline-block",
        marginTop: 5,
        marginBottom: 5
    },
    divider: {
        background: theme.palette.primary.main
    }
});