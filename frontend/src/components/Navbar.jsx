import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../routes/AuthContext";

const navLinks = [
    { label: "Home", path: "/home" },
    // { label: "Attendance", path: "/attendance" },
    { label: "Library", path: "/library" },
    { label: "About Us", path: "/about" },
];

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Dropdown menu for user profile
    const [anchorEl, setAnchorEl] = useState(null);
    // Mobile drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate("/");
    };

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{ bgcolor: "white", color: "#1a1a1a" }}
        >
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
                {/* Logo and Hamburger */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {isMobile && (
                        <IconButton onClick={() => setDrawerOpen(true)} edge="start" sx={{ mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Box
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                        onClick={() => navigate("/home")}
                    >
                        <img
                            src="/logo.png"
                            alt="SVU Logo"
                            style={{ height: 52, width: 52, marginRight: 8 }}
                        />
                    </Box>
                </Box>

                {/* Desktop Nav Links */}
                {!isMobile && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    sx={{
                                        color: isActive ? "#1e5c3a" : "#444",
                                        fontWeight: isActive ? 700 : 500,
                                        fontSize: "0.95rem",
                                        textTransform: "none",
                                        borderBottom: isActive ? "2.5px solid #1e5c3a" : "2.5px solid transparent",
                                        borderRadius: 0,
                                        px: 2,
                                        pb: 0.5,
                                        "&:hover": { color: "#1e5c3a", bgcolor: "transparent" },
                                    }}
                                >
                                    {link.label}
                                </Button>
                            );
                        })}
                    </Box>
                )}

                {/* User Avatar + Dropdown */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 0.5,
                        }}
                        onClick={handleMenuOpen}
                    >
                        <Avatar
                            sx={{
                                bgcolor: currentUser?.avatarColor || "#1e5c3a",
                                width: 36,
                                height: 36,
                                fontSize: "0.9rem",
                            }}
                        >
                            {currentUser?.name?.charAt(0) || "U"}
                        </Avatar>
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            {currentUser?.name}
                        </Typography>
                        <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#666" }} />
                    </Box>

                    {/* Profile Dropdown */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{ sx: { mt: 1, minWidth: 140, boxShadow: 3 } }}
                    >
                        {/*<MenuItem onClick={() => { handleMenuClose(); navigate("/profile"); }}>
                            Profile
                        </MenuItem> */}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 240, pt: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <img src="/logo.png" alt="SVU Logo" style={{ height: 60 }} />
                    </Box>
                    <List>
                        {navLinks.map((link) => (
                            <ListItem
                                button
                                key={link.path}
                                onClick={() => { navigate(link.path); setDrawerOpen(false); }}
                                sx={{
                                    color: location.pathname === link.path ? "#1e5c3a" : "#444",
                                    fontWeight: location.pathname === link.path ? 700 : 400,
                                }}
                            >
                                <ListItemText primary={link.label} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
}

export default Navbar;