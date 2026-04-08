import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import ComputerIcon from "@mui/icons-material/Computer";
import BarChartIcon from "@mui/icons-material/BarChart";
import CodeIcon from "@mui/icons-material/Code";
import BusinessIcon from "@mui/icons-material/Business";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Navbar from "../components/Navbar";
import { useAuth } from "../routes/AuthContext";

// University programmes data
const programmes = [
    {
        title: "B.Tech Computer Science",
        description: "A comprehensive program for future engineers.",
        duration: "4 Years",
        icon: <ComputerIcon sx={{ fontSize: 40, color: "#1e5c3a" }} />,
    },
    {
        title: "MBA in Finance",
        description: "Strategic leadership for global financial markets.",
        duration: "2 Years",
        icon: <BarChartIcon sx={{ fontSize: 40, color: "#1e5c3a" }} />,
    },
    {
        title: "BCA (Bachelor of Comp. Apps.)",
        description: "Software development and web application design.",
        duration: "3 Years",
        icon: <CodeIcon sx={{ fontSize: 40, color: "#1e5c3a" }} />,
    },
    {
        title: "BBA (Bachelor of Business Adm.)",
        description: "Professional development and administration design.",
        duration: "3 Years",
        icon: <BusinessIcon sx={{ fontSize: 40, color: "#1e5c3a" }} />,
    },
    {
        title: "EE (Electrical Engineering)",
        description: "Core conceptual development of electrical devices",
        duration: "4 Years",
        icon: <ElectricBoltIcon sx={{ fontSize: 40, color: "#1e5c3a" }} />,
    },

];

// University highlights
const highlights = [
    { icon: <SchoolIcon sx={{ fontSize: 32, color: "#1e5c3a" }} />, title: "Quality Education", sub: "Rigorous programs" },
    { icon: <GroupsIcon sx={{ fontSize: 32, color: "#1e5c3a" }} />, title: "Experienced Faculty", sub: "Industry mentors" },
    { icon: <ApartmentIcon sx={{ fontSize: 32, color: "#1e5c3a" }} />, title: "Modern Infrastructure", sub: "State-of-the-art labs" },
    { icon: <WorkIcon sx={{ fontSize: 32, color: "#1e5c3a" }} />, title: "Career Opportunities", sub: "Placement support" },
];

function HomePage() {
    const { currentUser } = useAuth();
    // Track which "page" of the programme carousel we're on
    const [carouselIndex, setCarouselIndex] = useState(0);
    const cardsPerView = 3;

    const handlePrev = () => {
        setCarouselIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCarouselIndex((prev) =>
            Math.min(prev + 1, programmes.length - cardsPerView)
        );
    };

    const visibleProgrammes = programmes.slice(
        carouselIndex,
        carouselIndex + cardsPerView
    );

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Navbar />

            <Box sx={{ px: { xs: 2, md: 4 }, py: 4, width: "100%",  maxWidth: 1280, mx: "auto" }}>
                <Grid container spacing={3} justifyContent="center">
                    {/* ── Left: Welcome Card ── */}
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                bgcolor: "white",
                                p: 3,
                                height: "100%",
                                border: "1px solid #e8e8e8",
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#1a1a1a", lineHeight: 1.3 }}>
                                        Welcome to Swami Vivekananda University
                                    </Typography>
                                    <Typography sx={{ color: "#666", mt: 1.5, fontSize: "0.95rem" }}>
                                        Empowering students through innovation, excellence, and quality education
                                    </Typography>
                                </Box>
                                {/* University building illustration (SVG) */}
                                <Box sx={{ flexShrink: 0, ml: 2, display: { xs: "none", sm: "block" } }}>
                                    <svg width="120" height="90" viewBox="0 0 120 90">
                                        <rect x="20" y="40" width="80" height="45" fill="#c8e6d4" rx="2" />
                                        <rect x="45" y="55" width="30" height="30" fill="#1e5c3a" rx="2" />
                                        <polygon points="10,40 60,5 110,40" fill="#1e5c3a" />
                                        <rect x="10" y="38" width="100" height="4" fill="#174d31" />
                                        <rect x="25" y="48" width="15" height="12" fill="white" rx="1" />
                                        <rect x="80" y="48" width="15" height="12" fill="white" rx="1" />
                                        <rect x="53" y="25" width="14" height="14" fill="white" rx="1" />
                                        <rect x="5" y="82" width="110" height="3" fill="#174d31" rx="1" />
                                        <circle cx="90" cy="70" r="8" fill="#e8f5ed" />
                                        <rect x="86" y="62" width="2" height="16" fill="#2d7a52" />
                                        <rect x="90" y="65" width="8" height="2" fill="#2d7a52" />
                                    </svg>
                                </Box>
                            </Box>

                            <Typography sx={{ color: "#555", mt: 2.5, fontSize: "0.9rem", lineHeight: 1.7 }}>
                                A modern private university established in 2019, focused on academic excellence, innovation, and multidisciplinary learning.
                            </Typography>

                            {/* Highlights Grid */}
                            <Grid container spacing={1.5} sx={{ mt: 2 }}>
                                {highlights.map((h) => (
                                    <Grid item xs={6} key={h.title}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                p: 1.5,
                                                borderRadius: 2,
                                                bgcolor: "#f0f7f3",
                                                border: "1px solid #d4ead9",
                                            }}
                                        >
                                            {h.icon}
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: "#1a1a1a" }}>
                                                    {h.title}
                                                </Typography>
                                                <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                                                    {h.sub}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Grid>

                    {/* ── Right: Programmes Carousel ── */}
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                bgcolor: "#f0f7f3",
                                p: 3,
                                height: "100%",
                                border: "1px solid #d4ead9",
                                position: "relative",
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 1.5, overflow: "hidden" }}>
                                {visibleProgrammes.map((prog) => (
                                    <Card
                                        key={prog.title}
                                        elevation={0}
                                        sx={{
                                            flex: "1 1 0",
                                            p: 2,
                                            borderRadius: 2.5,
                                            bgcolor: "white",
                                            border: "1px solid #e0ede5",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 2,
                                                bgcolor: "#f0f7f3",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {prog.icon}
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a1a", lineHeight: 1.3 }}>
                                            {prog.title}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.78rem", color: "#666", flexGrow: 1 }}>
                                            {prog.description}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.78rem", color: "#555", fontWeight: 500 }}>
                                            Duration: {prog.duration}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                borderColor: "#1e5c3a",
                                                color: "#1e5c3a",
                                                borderRadius: 8,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                mt: 0.5,
                                                "&:hover": { bgcolor: "#1e5c3a", color: "white" },
                                            }}
                                        >
                                            Explore
                                        </Button>
                                    </Card>
                                ))}
                                {/* Fill empty space if at trailing end of carousel to prevent stretching */}
                                {Array.from({ length: cardsPerView - visibleProgrammes.length }).map((_, i) => (
                                    <Box key={`empty-${i}`} sx={{ flex: "1 1 0" }} />
                                ))}
                            </Box>

                            {/* Carousel Controls */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                <IconButton
                                    onClick={handlePrev}
                                    disabled={carouselIndex === 0}
                                    sx={{
                                        bgcolor: carouselIndex === 0 ? "#e0e0e0" : "#1e5c3a",   
                                        color: "white",
                                        width: 32,
                                        height: 32,
                                        "&:hover": { bgcolor: "#174d31" },
                                        "&:disabled": { bgcolor: "#e0e0e0", color: "#aaa" },
                                    }}
                                >
                                    <ChevronLeftIcon fontSize="small" />
                                </IconButton>

                                {/* Dot indicators */}
                                <Box sx={{ display: "flex", gap: 0.8 }}>
                                    {Array.from({ length: programmes.length - cardsPerView + 1 }).map((_, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                width: i === carouselIndex ? 20 : 8,
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: i === carouselIndex ? "#1e5c3a" : "#b0ceba",
                                                transition: "all 0.3s",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => setCarouselIndex(i)}
                                        />
                                    ))}
                                </Box>

                                <IconButton
                                    onClick={handleNext}
                                    disabled={carouselIndex >= programmes.length - cardsPerView}
                                    sx={{
                                        bgcolor: carouselIndex >= programmes.length - cardsPerView ? "#e0e0e0" : "#1e5c3a",
                                        color: "white",
                                        width: 32,
                                        height: 32,
                                        "&:hover": { bgcolor: "#174d31" },
                                        "&:disabled": { bgcolor: "#e0e0e0", color: "#aaa" },
                                    }}
                                >
                                    <ChevronRightIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default HomePage;