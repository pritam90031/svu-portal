import React, { useState } from "react";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
    Link,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // let [data,setData]=useState({})
    // setData({...data,e.target.name:e.target.value})

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Basic validation
        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);
        setError("");

        // Simulate a tiny delay for UX
        const result = await login(username.trim(), password.trim());
        setTimeout(() => {
            console.log("abcdjhghj", result)
            if (result.success) {
                navigate("/home");
            } else {
                setError("Invalid credentials. Please check your username and password.");
            }
            setLoading(false);
        }, 500);
    };

    // Allow login on Enter key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                // Left: green gradient panel | Right: white form panel
                background: "linear-gradient(135deg, #e8f5ed 0%, #c8e6d4 100%)",
            }}
        >
            {/* ── Left Panel (logo + decorative) ── */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(160deg, #e0f2e9 0%, #b2d8c0 100%)",
                }}
            >
                {/* Decorative leaf circles */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 320,
                        height: 320,
                        borderRadius: "50%",
                        border: "1px solid rgba(30,92,58,0.12)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        width: 480,
                        height: 480,
                        borderRadius: "50%",
                        border: "1px solid rgba(30,92,58,0.08)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                />

                {/* University logo */}
                <img
                    src="/logo.png"
                    alt="Swami Vivekananda University"
                    style={{ width: 220, height: 220, objectFit: "contain", zIndex: 1 }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        mt: 3,
                        color: "#1e5c3a",
                        fontWeight: 700,
                        textAlign: "center",
                        zIndex: 1,
                        px: 4,
                        lineHeight: 1.4,
                    }}
                >
                    Swami Vivekananda University
                </Typography>
                <Typography
                    sx={{ color: "#2d7a52", mt: 1, fontSize: "0.95rem", zIndex: 1 }}
                >
                    Student & Faculty Portal
                </Typography>
            </Box>

            {/* ── Right Panel (login form) ── */}
            <Box
                sx={{
                    flex: { xs: 1, md: "0 0 480px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f7faf8",
                    p: { xs: 3, md: 4 },
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                    }}
                >
                    {/* Mobile: show logo inside the form */}
                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                            justifyContent: "center",
                            mb: 2,
                        }}
                    >
                        <img src="/logo.png" alt="SVU" style={{ height: 80 }} />
                    </Box>

                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, textAlign: "center", mb: 3, color: "#1a1a1a" }}
                    >
                        Login to Your Account
                    </Typography>

                    {/* Error message */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Username Field */}
                    <TextField
                        fullWidth
                        placeholder="User ID / Email / Phone"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon sx={{ color: "#999" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2.5,
                                "& fieldset": { borderColor: "#ddd" },
                                "&:hover fieldset": { borderColor: "#1e5c3a" },
                                "&.Mui-focused fieldset": { borderColor: "#1e5c3a" },
                            },
                        }}
                    />

                    {/* Password Field */}
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon sx={{ color: "#999" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOutlinedIcon sx={{ color: "#999" }} />
                                        ) : (
                                            <VisibilityOffOutlinedIcon sx={{ color: "#999" }} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2.5,
                                "& fieldset": { borderColor: "#ddd" },
                                "&:hover fieldset": { borderColor: "#1e5c3a" },
                                "&.Mui-focused fieldset": { borderColor: "#1e5c3a" },
                            },
                        }}
                    />

                    {/* Forgot Password */}
                    <Box sx={{ textAlign: "right", mb: 3 }}>
                        <Link
                            href="#"
                            underline="hover"
                            sx={{ color: "#1e5c3a", fontSize: "0.85rem" }}
                        >
                            Forgot Password?
                        </Link>
                    </Box>

                    {/* Login Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleLogin}
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            borderRadius: 8,
                            bgcolor: "#1e5c3a",
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#174d31" },
                            "&:disabled": { bgcolor: "#a0c4b0" },
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                    {/* Register Link */}
                    <Typography
                        sx={{ textAlign: "center", mt: 2.5, color: "#666", fontSize: "0.9rem" }}
                    >
                        Don't have an account?{" "}
                        <Link
                            href="#"
                            underline="hover"
                            sx={{ color: "#1e5c3a", fontWeight: 600 }}
                        >
                            Register
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default LoginPage;