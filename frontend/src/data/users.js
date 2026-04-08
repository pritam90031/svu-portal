// Hardcoded user credentials (frontend only)
// Each user has: id, username, password, name, role, avatar initials

const users = [
  {
    id: 1,
    username: "rahul.sharma",
    password: "student123",
    name: "Rahul Sharma",
    role: "student",
    rollNumber: "BK101",
    department: "Computer Science",
    semester: "4th Sem",
    avatarColor: "#1e5c3a",
  },
  {
    id: 2,
    username: "dr.asharma",
    password: "faculty123",
    name: "Dr. A. Sharma",
    role: "faculty",
    department: "Computer Science",
    avatarColor: "#2d7a52",
  },
  {
    id: 3,
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    avatarColor: "#1a4a2e",
  },
];

export default users;