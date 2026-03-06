import { Alert, Snackbar } from "@mui/material";

export default function CustomAlert({ 
    alertOpen,
    setAlertOpen, 
    alertMessage, 
    alertSeverity 
}) {
    return(
        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </Snackbar>
    );
}