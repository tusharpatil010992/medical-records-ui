export type CustomSnackbarProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    severity: "error" | "info" | "success" | "warning",
    message: string;
}