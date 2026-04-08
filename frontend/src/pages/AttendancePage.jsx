import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Avatar,
    Select,
    MenuItem,
    FormControl,
    Grid,
    Chip,
    Pagination,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Navbar from "../components/Navbar";

// Generate sample students
const generateStudents = () =>
    Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: ["Aarav Sharma", "Ishita Jain", "Ravi Kumar", "Priya Singh", "Namd Raamnar",
            "Kama Delta", "Dmita Sharma", "Ravana Sidah", "Ankit Roy", "Sneha Das",
            "Mohan Verma", "Pooja Mehta", "Suresh Patel", "Kavita Nair", "Rohan Gupta",
            "Anjali Singh", "Vikram Joshi", "Neha Sharma", "Amit Yadav", "Rekha Das"][i],
        rollNumber: `Roll-${101 + i}`,
        attendance: Math.floor(Math.random() * 40) + 60, // 60-100%
        status: null, // null = not marked, "present" or "absent"
    }));

const ROWS_PER_PAGE = 10;

function AttendancePage() {
    const [students, setStudents] = useState(generateStudents);
    const [course, setCourse] = useState("B.Tech");
    const [semester, setSemester] = useState("2nd Sem");
    const [section, setSection] = useState("A");
    const [session, setSession] = useState("2024-25");
    const [page, setPage] = useState(1);

    // Mark a student present or absent
    const markAttendance = (id, status) => {
        setStudents((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status } : s))
        );
    };

    const totalStudents = students.length;
    const presentCount = students.filter((s) => s.status === "present").length;
    const absentCount = students.filter((s) => s.status === "absent").length;
    const above60 = students.filter((s) => s.attendance >= 60).length;
    const below60 = students.filter((s) => s.attendance < 60).length;

    const paginatedStudents = students.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    const selectSx = {
        borderRadius: 2,
        height: 40,
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1e5c3a" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e5c3a" },
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Navbar />

            <Box sx={{ px: { xs: 2, md: 4 }, py: 4, maxWidth: 1280, mx: "auto" }}>
                {/* Filters */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }} justifyContent='space-evenly'>
                    <FormControl size="small">
                        <Select value={course} onChange={(e) => setCourse(e.target.value)} sx={selectSx}>
                            <MenuItem value="B.Tech">Course (B.Tech)</MenuItem>
                            <MenuItem value="MBA">Course (MBA)</MenuItem>
                            <MenuItem value="BCA">Course (BCA)</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <Select value={semester} onChange={(e) => setSemester(e.target.value)} sx={selectSx}>
                            {["1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "5th Sem", "6th Sem", "7th Sem", "8th Sem"].map((s) => (
                                <MenuItem key={s} value={s}>Semester ({s})</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <Select value={section} onChange={(e) => setSection(e.target.value)} sx={selectSx}>
                            {["A", "B", "C"].map((s) => (
                                <MenuItem key={s} value={s}>Section ({s})</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <Select value={session} onChange={(e) => setSession(e.target.value)} sx={selectSx}>
                            <MenuItem value="2024-25">Session (2024-25)</MenuItem>
                            <MenuItem value="2023-24">Session (2023-24)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Stats Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="space-evenly">
                    {[
                        { icon: <PeopleAltOutlinedIcon />, label: "Total Students", value: totalStudents, color: "#555" },
                        { icon: <SchoolOutlinedIcon />, label: "Students in Previous Class", value: 115, color: "#555" },
                        { icon: <CheckCircleOutlineIcon sx={{ color: "#1e5c3a" }} />, label: "Attendance ≥ 60%", value: above60, color: "#1e5c3a" },
                        { icon: <CancelOutlinedIcon sx={{ color: "#d32f2f" }} />, label: "Attendance < 60%", value: below60, color: "#d32f2f" },
                    ].map((stat) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.label}>
                            <Card elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid #e8e8e8" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                    <Box sx={{ color: "#666" }}>{stat.icon}</Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "0.78rem", color: "#888" }}>{stat.label}</Typography>
                                        <Typography sx={{ fontSize: "1.5rem", fontWeight: 800, color: stat.color }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Student Table */}
                <Card elevation={0} sx={{ borderRadius: 2.5, border: "1px solid #e8e8e8", overflow: "hidden" }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#1e5c3a" }}>
                                    {["Name", "Roll Number", "Attendance %", "Actions"].map((h) => (
                                        <TableCell key={h} sx={{ color: "white", fontWeight: 700, fontSize: "0.88rem" }}>
                                            {h}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedStudents.map((student, i) => (
                                    <TableRow
                                        key={student.id}
                                        sx={{ bgcolor: i % 2 === 0 ? "white" : "#fafafa" }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: "#c8e6d4", color: "#1e5c3a", fontSize: "0.8rem" }}>
                                                    {student.name.charAt(0)}
                                                </Avatar>
                                                <Typography sx={{ fontSize: "0.88rem" }}>{student.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "0.88rem", color: "#555" }}>{student.rollNumber}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={`${student.attendance}%`}
                                                size="small"
                                                sx={{
                                                    bgcolor: student.attendance >= 60 ? "#e8f5e9" : "#fdecea",
                                                    color: student.attendance >= 60 ? "#2e7d32" : "#c62828",
                                                    fontWeight: 600,
                                                    fontSize: "0.8rem",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant={student.status === "present" ? "contained" : "outlined"}
                                                    onClick={() => markAttendance(student.id, "present")}
                                                    startIcon={<CheckCircleOutlineIcon />}
                                                    sx={{
                                                        borderRadius: 1.5,
                                                        textTransform: "none",
                                                        fontSize: "0.78rem",
                                                        bgcolor: student.status === "present" ? "#1e5c3a" : "transparent",
                                                        borderColor: "#1e5c3a",
                                                        color: student.status === "present" ? "white" : "#1e5c3a",
                                                        "&:hover": { bgcolor: "#1e5c3a", color: "white" },
                                                    }}
                                                >
                                                    Present
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant={student.status === "absent" ? "contained" : "outlined"}
                                                    onClick={() => markAttendance(student.id, "absent")}
                                                    startIcon={<CancelOutlinedIcon />}
                                                    sx={{
                                                        borderRadius: 1.5,
                                                        textTransform: "none",
                                                        fontSize: "0.78rem",
                                                        bgcolor: student.status === "absent" ? "#d32f2f" : "transparent",
                                                        borderColor: "#d32f2f",
                                                        color: student.status === "absent" ? "white" : "#d32f2f",
                                                        "&:hover": { bgcolor: "#d32f2f", color: "white" },
                                                    }}
                                                >
                                                    Absent
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                        <Typography sx={{ fontSize: "0.82rem", color: "#888", mr: 2, alignSelf: "center" }}>
                            {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, totalStudents)} of {totalStudents}
                        </Typography>
                        <Pagination
                            count={Math.ceil(totalStudents / ROWS_PER_PAGE)}
                            page={page}
                            onChange={(_, v) => setPage(v)}
                            size="small"
                            sx={{ "& .MuiPaginationItem-root.Mui-selected": { bgcolor: "#1e5c3a", color: "white" } }}
                        />
                    </Box>
                </Card>

                {/* Today's Summary */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Card
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: 2.5,
                                bgcolor: "#1e5c3a",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", borderRadius: 2, p: 1 }}>
                                <CheckCircleOutlineIcon sx={{ color: "white", fontSize: 28 }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>Present Today</Typography>
                                <Typography sx={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>{presentCount}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: 2.5,
                                bgcolor: "#d32f2f",
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", borderRadius: 2, p: 1 }}>
                                <CancelOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>Absent Today</Typography>
                                <Typography sx={{ color: "white", fontSize: "2rem", fontWeight: 800 }}>{absentCount}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default AttendancePage;