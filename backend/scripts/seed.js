import userModal from '../models/users.js';
import Department from '../models/departments.js';
import Semester from '../models/semesters.js';
import Student from '../models/allStudents.js';
import LibraryBook from '../models/libraryBooks.js';

const done = (label) => console.log(`[Seed] ADDED — ${label}`);

const users = [
  { username: "rahul.sharma", password: "student123", name: "Rahul Sharma", role: "student", rollNumber: "BK101", department: "Computer Science", semester: "4th Sem", avatarColor: "#1e5c3a" },
  { username: "dr.asharma", password: "faculty123", name: "Dr. A. Sharma", role: "faculty", department: "Computer Science", avatarColor: "#2d7a52" },
  { username: "admin", password: "admin123", name: "Admin User", role: "admin", avatarColor: "#1a4a2e" },
];

const departments = ["CSE", "ECE", "ME", "BA", "BCA"].map(name => ({name}));
const semesters = [1, 2, 3, 4, 5, 6, 7, 8].map(number => ({number}));

const students = [
    { id: 1, name: "Rahul Sharma", department: "CSE", semester: 1 },
    { id: 2, name: "Aman Verma", department: "CSE", semester: 1 },
    { id: 3, name: "Priya Singh", department: "CSE", semester: 2 },
    { id: 4, name: "Karan Roy", department: "CSE", semester: 3 },
    { id: 5, name: "Sneha Das", department: "ECE", semester: 1 },
    { id: 6, name: "Rohit Kumar", department: "ECE", semester: 2 },
    { id: 7, name: "Anjali Singh", department: "ECE", semester: 3 },
    { id: 8, name: "Vikram Joshi", department: "ME", semester: 1 },
    { id: 9, name: "Mohan Verma", department: "ME", semester: 2 },
    { id: 10, name: "Pooja Mehta", department: "ME", semester: 4 },
    { id: 11, name: "Suresh Patel", department: "BA", semester: 1 },
    { id: 12, name: "Kavita Nair", department: "BA", semester: 2 },
    { id: 13, name: "Rohan Gupta", department: "BA", semester: 3 },
    { id: 14, name: "Amit Yadav", department: "CSE", semester: 4 },
    { id: 15, name: "Rekha Das", department: "ECE", semester: 5 },
    { id: 16, name: "Anil Sharma", department: "ME", semester: 6 },
];

const libraryBooks = [
   { subject: 'Mathematics', name: 'Advanced Engineering Mathematics', total: 50 },
   { subject: 'Economics', name: 'Principles of Economics', total: 35 },
   { subject: 'Computer Science', name: 'Data Structures & Algorithms', total: 50 },
   { subject: 'Economics', name: 'Laeft of Economics', total: 20 },
   { subject: 'Economics', name: 'Principles of Economics (Vol 2)', total: 25 },
   { subject: 'Computer Science', name: 'Operating Systems', total: 30 }
];

export async function runSeed() {
    console.log('[Seed] Starting...');

    // Clear existing to avoid duplicate key errors
    await userModal.deleteMany({});
    await Department.deleteMany({});
    await Semester.deleteMany({});
    await Student.deleteMany({});
    await LibraryBook.deleteMany({});

    await userModal.create(users);
    done('users');
    
    await Department.create(departments);
    done('departments');
    
    await Semester.create(semesters);
    done('semesters');
    
    await Student.create(students);
    done('students');
    
    await LibraryBook.create(libraryBooks);
    done('libraryBooks');

    console.log('[Seed] Complete.');
}

if (process.argv[1]?.endsWith('seed.js')) {
    import('mongoose').then(({ default: mongoose }) => {
        import('dotenv').then(({ default: dotenv }) => {
            dotenv.config();
            mongoose.connect(process.env.MONGO_URL || process.env.MONGO_URI)
                .then(async () => {
                    await runSeed();
                    await mongoose.disconnect();
                    process.exit(0);
                })
                .catch((err) => {
                    console.error('[Seed] Error:', err.message);
                    process.exit(1);
                });
        });
    });
}
