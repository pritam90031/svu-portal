
import React, { useState, useEffect } from "react";
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
    Grid,
    Select,
    MenuItem,
    FormControl,
    Button,
    Collapse,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputLabel,
    Divider,
    Chip,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Navbar from "../components/Navbar";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
// ─── Static Data ─────────────────────────────────────────────────────────────
// All data is now fetched from backend API.

// ─── Shared Select Styles ─────────────────────────────────────────────────────

const selectSx = {
    borderRadius: 2,
    height: 40,
    minWidth: 180,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1e5c3a" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e5c3a" },
    bgcolor: "white",
};

const dialogSelectSx = {
    borderRadius: 2,
    width: "100%",
    minHeight: 52,
    fontSize: "0.95rem",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1e5c3a" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e5c3a" },
    "& .MuiSelect-select": { py: 1.6, px: 2 },
    bgcolor: "white",
};

// ─── BookRow ──────────────────────────────────────────────────────────────────

function BookRow({ book }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "&:hover": { bgcolor: "#f9fafb" } }}>
                <TableCell sx={{ fontSize: "0.88rem" }}>{book.name}</TableCell>
                <TableCell sx={{ fontSize: "0.88rem", color: "#555" }}>{book.total}</TableCell>
                <TableCell sx={{ fontSize: "0.88rem", color: "#e65100" }}>{book.issued}</TableCell>
                <TableCell sx={{ fontSize: "0.88rem", color: "#2e7d32" }}>{book.available}</TableCell>
                <TableCell>
                    <Button
                        size="small"
                        variant="outlined"
                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        onClick={() => setOpen(!open)}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            borderColor: "#1e5c3a",
                            color: "#1e5c3a",
                            fontSize: "0.8rem",
                            "&:hover": { bgcolor: "#1e5c3a", color: "white" },
                        }}
                    >
                        View Students
                    </Button>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={5} sx={{ py: 0, border: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Paper
                            elevation={0}
                            sx={{
                                m: 1,
                                p: 1.5,
                                bgcolor: "#f9fafb",
                                border: "1px solid #e8e8e8",
                                borderRadius: 2,
                            }}
                        >
                            {book.students.map((s) => (
                                <Typography key={s} sx={{ fontSize: "0.85rem", py: 0.4, color: "#333" }}>
                                    {s}
                                </Typography>
                            ))}
                        </Paper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

function formatCustomDate(gdate) {
    const date = new Date(gdate)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // DD/MM/YYYY format
}

// ─── IssuanceRecordRow ────────────────────────────────────────────────────────

function IssuanceRecordRow({ record, index }) {
    return (
        <TableRow sx={{ "&:hover": { bgcolor: "#f9fafb" } }}>
            <TableCell sx={{ fontSize: "0.85rem", color: "#888" }}>{index + 1}</TableCell>
            <TableCell>
                <Chip
                    label={record.department}
                    size="small"
                    sx={{
                        bgcolor: "#e8f5e9",
                        color: "#1e5c3a",
                        fontWeight: 600,
                        fontSize: "0.78rem",
                    }}
                />
            </TableCell>
            <TableCell sx={{ fontSize: "0.85rem", color: "#555" }}>Sem {record.semester}</TableCell>
            <TableCell sx={{ fontSize: "0.85rem" }}>{record.student}</TableCell>
            <TableCell sx={{ fontSize: "0.85rem", color: "#555" }}>{record.subject}</TableCell>
            <TableCell sx={{ fontSize: "0.85rem", color: "#1a1a1a", fontWeight: 500 }}>{record.book}</TableCell>
            <TableCell sx={{ fontSize: "0.85rem", color: "#1a1a1a", fontWeight: 500 }}>{formatCustomDate(record.createdAt)}</TableCell>
        </TableRow>
    );
}

// ─── IssueBookDialog ──────────────────────────────────────────────────────────

const EMPTY_FORM = {
    department: "",
    semester: "",
    student: "",
    subject: "",
    book: "",
};

function IssueBookDialog({ open, onClose, onSubmit, formData }) {
    const { departments = [], semesters = [], allStudents = [], subjectBookMap = {}, allSubjects = [] } = formData;
    const [form, setForm] = useState(EMPTY_FORM);

    const filteredStudents = allStudents.filter(
        (s) =>
            (!form.department || String(s.department) === String(form.department)) &&
            (!form.semester || String(s.semester) === String(form.semester))
    );

    const filteredBooks = form.subject ? subjectBookMap[form.subject] || [] : [];

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setForm((prev) => {
            const updated = { ...prev, [field]: value };
            // Reset dependent fields
            if (field === "department" || field === "semester") updated.student = "";
            if (field === "subject") updated.book = "";
            return updated;
        });
    };

    const handleSubmit = () => {
        if (!form.department || !form.semester || !form.student || !form.subject || !form.book)
            return;
        console.log("form", form)
        onSubmit(form);
        setForm(EMPTY_FORM);
    };

    const handleClose = () => {
        setForm(EMPTY_FORM);
        onClose();
    };

    const isValid =
        form.department && form.semester && form.student && form.subject && form.book;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: 680,
                    m: 2,
                },
            }}
        >
            {/* Dialog Header */}
            <DialogTitle
                sx={{
                    bgcolor: "#1e5c3a",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 2,
                }}
            >
                <LibraryBooksIcon sx={{ fontSize: 22 }} />
                Issue Book to Student
            </DialogTitle>

            <DialogContent sx={{ pt: 4, pb: 2, px: 4, mt:3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                    {/* Row 1: Department + Semester */}
                    <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                        {/* Department */}
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel sx={{ fontSize: "0.95rem", "&.Mui-focused": { color: "#1e5c3a" } }}>
                                Department
                            </InputLabel>
                            <Select
                                value={form.department}
                                onChange={handleChange("department")}
                                label="Department"
                                sx={dialogSelectSx}
                            >
                                {departments.map((d) => (
                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Semester */}
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel sx={{ fontSize: "0.95rem", "&.Mui-focused": { color: "#1e5c3a" } }}>
                                Semester
                            </InputLabel>
                            <Select
                                value={form.semester}
                                onChange={handleChange("semester")}
                                label="Semester"
                                sx={dialogSelectSx}
                            >
                                {semesters.map((s) => (
                                    <MenuItem key={s} value={s}>Semester {s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Row 2: Student (full width) */}
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontSize: "0.95rem", "&.Mui-focused": { color: "#1e5c3a" } }}>
                            Student
                        </InputLabel>
                        <Select
                            value={form.student}
                            onChange={handleChange("student")}
                            label="Student"
                            sx={dialogSelectSx}
                        >
                            {filteredStudents.length === 0 ? (
                                <MenuItem disabled value=""><em>No students found</em></MenuItem>
                            ) : (
                                filteredStudents.map((s) => (
                                    <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
                                ))
                            )}
                        </Select>
                        {form.department && form.semester && filteredStudents.length === 0 && (
                            <Typography sx={{ fontSize: "0.75rem", color: "#e65100", mt: 0.5, ml: 0.5 }}>
                                No students found for selected department &amp; semester.
                            </Typography>
                        )}
                    </FormControl>

                    <Divider sx={{ borderColor: "#f0f0f0" }} />

                    {/* Row 3: Subject + Book */}
                    <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                        {/* Subject */}
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel sx={{ fontSize: "0.95rem", "&.Mui-focused": { color: "#1e5c3a" } }}>
                                Subject
                            </InputLabel>
                            <Select
                                value={form.subject}
                                onChange={handleChange("subject")}
                                label="Subject"
                                sx={dialogSelectSx}
                            >
                                {allSubjects.map((subj) => (
                                    <MenuItem key={subj} value={subj}>{subj}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Book */}
                        <FormControl sx={{ flex: 1 }}>
                            <InputLabel sx={{ fontSize: "0.95rem", "&.Mui-focused": { color: "#1e5c3a" } }}>
                                Book
                            </InputLabel>
                            <Select
                                value={form.book}
                                onChange={handleChange("book")}
                                label="Book"
                                sx={dialogSelectSx}
                            >
                                {filteredBooks.length === 0 ? (
                                    <MenuItem disabled value=""><em>Select a subject first</em></MenuItem>
                                ) : (
                                    filteredBooks.map((b) => (
                                        <MenuItem key={b} value={b}>{b}</MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 4, py: 3, gap: 1.5 }}>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        borderColor: "#ccc",
                        color: "#555",
                        "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        bgcolor: "#1e5c3a",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#155030" },
                        "&.Mui-disabled": { bgcolor: "#ccc" },
                    }}
                >
                    Issue Book
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ─── LibraryPage ──────────────────────────────────────────────────────────────

function LibraryPage() {
    const [department, setDepartment] = useState("");
    const [programme, setProgramme] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [issuanceRecords, setIssuanceRecords] = useState([]);
    
    // New Dynamic States
    const [formData, setFormData] = useState({ departments: [], semesters: [], allStudents: [], subjectBookMap: {}, allSubjects: [] });
    const [stats, setStats] = useState({ totalBooks: 0, issuedBooks: 0, availableBooks: 0, booksList: [] });

    // Destructure stats gracefully
    const { totalBooks, issuedBooks, availableBooks, booksList } = stats;

    const handleSubmit = async (form) => {
        const response  = await fetch(`${apiUrl}/books/create`, 
            {
                method: "POST", 
                headers:  { "Content-Type": "application/json"}, 
                body: JSON.stringify(form)
            })
        const result = await response.json()
        if (!response.ok) return;
        setIssuanceRecords((prev) => [...prev, result.doc]);
        setDialogOpen(false);
        // Refresh stats after a new book is issued
        getStats(); 
    };

    const getBooks = async () => {
        const response = await fetch(`${apiUrl}/books/list`, {
            method: "GET", 
            headers:  { "Content-Type": "application/json"}, 
        })
        const result = await response.json()
        if (!response.ok) return;
        setIssuanceRecords(result.docs)
    }

    const getFormData = async () => {
        try {
            const response = await fetch(`${apiUrl}/library/form-data`, {
                method: "GET", 
                headers:  { "Content-Type": "application/json"}, 
            });
            const result = await response.json();
            if (!response.ok) return;
            
            // Fix: ensure result properties default to empty to prevent undefined mappings
            setFormData({
                departments: result.departments || [],
                semesters: result.semesters || [],
                allStudents: result.allStudents || [],
                subjectBookMap: result.subjectBookMap || {},
                allSubjects: Object.keys(result.subjectBookMap || {})
            });
        } catch(e) {
            console.error("Error fetching form data:", e);
        }
    }

    const getStats = async () => {
        const response = await fetch(`${apiUrl}/library/stats`, {
            method: "GET", 
            headers:  { "Content-Type": "application/json"}, 
        });
        const result = await response.json();
        if (!response.ok) return;
        setStats(result);
    }

    useEffect(() => {
        getBooks();
        getFormData();
        getStats();
    }, [])

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <Navbar />

            <Box sx={{ px: { xs: 2, md: 4 }, py: 4, maxWidth: 1280, mx: "auto" }}>
                {/* Page Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
                        Library Management
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setDialogOpen(true)}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            bgcolor: "#1e5c3a",
                            fontWeight: 600,
                            px: 2.5,
                            boxShadow: "0 2px 8px rgba(30,92,58,0.25)",
                            "&:hover": {
                                bgcolor: "#155030",
                                boxShadow: "0 4px 14px rgba(30,92,58,0.35)",
                            },
                        }}
                    >
                        Issue Book
                    </Button>
                </Box>

                {/* Filter Row */}
                {/* <Card
                    elevation={0}
                    sx={{ p: 2.5, borderRadius: 2.5, border: "1px solid #e8e8e8", mb: 3 }}
                >
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <FormControl size="small">
                            <Select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                displayEmpty
                                renderValue={(v) => v || "Select Department"}
                                sx={selectSx}
                            >
                                <MenuItem value="">All Departments</MenuItem>
                                <MenuItem value="cs">Computer Science</MenuItem>
                                <MenuItem value="ec">Electronics</MenuItem>
                                <MenuItem value="me">Mechanical</MenuItem>
                                <MenuItem value="ba">Business Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small">
                            <Select
                                value={programme}
                                onChange={(e) => setProgramme(e.target.value)}
                                displayEmpty
                                renderValue={(v) => v || "Select Programme"}
                                sx={selectSx}
                            >
                                <MenuItem value="">All Programmes</MenuItem>
                                <MenuItem value="btech">B.Tech</MenuItem>
                                <MenuItem value="mba">MBA</MenuItem>
                                <MenuItem value="bca">BCA</MenuItem>
                                <MenuItem value="bba">BBA</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Card> */}

                {/* Stats Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {[
                        {
                            icon: <LibraryBooksIcon sx={{ fontSize: 36, color: "#795548" }} />,
                            label: "Total Books",
                            value: totalBooks.toLocaleString(),
                            sub: "Total Books",
                            bg: "#fdf6f0",
                        },
                        {
                            icon: <SwapHorizIcon sx={{ fontSize: 36, color: "#e65100" }} />,
                            label: "Books Issued",
                            value: issuedBooks.toLocaleString(),
                            sub: "Books Currently Issued",
                            bg: "#fff8f5",
                        },
                        {
                            icon: <CheckCircleOutlineIcon sx={{ fontSize: 36, color: "#1e5c3a" }} />,
                            label: "Books Available",
                            value: availableBooks.toLocaleString(),
                            sub: "Books Available",
                            bg: "#f0f7f3",
                        },
                    ].map((stat) => (
                        <Grid item xs={12} sm={4} key={stat.label}>
                            <Card
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    borderRadius: 2.5,
                                    bgcolor: stat.bg,
                                    border: "1px solid #e8e8e8",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ bgcolor: "white", borderRadius: 2, p: 1.5 }}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color: "#1a1a1a" }}>
                                        {stat.label}:{" "}
                                        <span style={{ color: "#1e5c3a" }}>{stat.value}</span>
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.8rem", color: "#888" }}>
                                        {stat.sub}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Books Table */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2.5,
                        border: "1px solid #e8e8e8",
                        overflow: "hidden",
                        mb: booksList.length > 0 ? 4 : 0,
                    }}
                >
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "Book Name",
                                        "Total Copies",
                                        "Issued Copies",
                                        "Available Copies",
                                        "Students Holding",
                                    ].map((h) => (
                                        <TableCell
                                            key={h}
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "0.88rem",
                                                color: "#555",
                                                bgcolor: "#fafafa",
                                                borderBottom: "2px solid #e8e8e8",
                                            }}
                                        >
                                            {h}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {booksList.map((book) => (
                                    <BookRow key={book.id} book={book} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>

                {/* Issuance Records Table */}
                {issuanceRecords.length > 0 && (
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 2.5,
                            border: "1px solid #e8e8e8",
                            overflow: "hidden",
                        }}
                    >
                        {/* Section Header */}
                        <Box
                            sx={{
                                px: 2.5,
                                py: 2,
                                bgcolor: "#fafafa",
                                borderBottom: "2px solid #e8e8e8",
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <AssignmentIcon sx={{ fontSize: 20, color: "#1e5c3a" }} />
                            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a1a" }}>
                                Book Issuance Records
                            </Typography>
                            <Chip
                                label={issuanceRecords.length}
                                size="small"
                                sx={{
                                    bgcolor: "#1e5c3a",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                    height: 20,
                                    ml: 0.5,
                                }}
                            />
                        </Box>

                        <TableContainer>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHead>
                                    <TableRow>
                                        {["#", "Department", "Semester", "Student", "Subject", "Book", "Issue Date"].map((h) => (
                                            <TableCell
                                                key={h}
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: "0.88rem",
                                                    color: "#555",
                                                    bgcolor: "#fafafa",
                                                    borderBottom: "1px solid #e8e8e8",
                                                }}
                                            >
                                                {h}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {issuanceRecords.map((record, index) => (
                                        <IssuanceRecordRow
                                            key={index}
                                            record={record}
                                            index={index}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                )}
            </Box>

            {/* Issue Book Dialog */}
            <IssueBookDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
            />
        </Box>
    );
}

export default LibraryPage;
