import Department from '../models/departments.js';
import Semester from '../models/semesters.js';
import Student from '../models/allStudents.js';
import LibraryBook from '../models/libraryBooks.js';
import IssuedBook from '../models/books.js';

export default {
    getFormData: async (req, res) => {
        try {
            const depts = await Department.find();
            const sems = await Semester.find();
            const students = await Student.find();
            const libraryBooks = await LibraryBook.find();

            const departments = depts.map(d => d.name);
            const semesters = sems.map(s => s.number).sort((a,b)=>a-b);
            
            const subjectBookMap = {};
            libraryBooks.forEach(b => {
                if (!subjectBookMap[b.subject]) {
                    subjectBookMap[b.subject] = [];
                }
                if (!subjectBookMap[b.subject].includes(b.name)) {
                    subjectBookMap[b.subject].push(b.name);
                }
            });

            res.status(200).json({ departments, semesters, allStudents: students, subjectBookMap });
        } catch (error) {
            console.error("Error in getFormData", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    getStats: async (req, res) => {
        try {
            const catalog = await LibraryBook.find();
            const issuedRecords = await IssuedBook.find();

            let totalIssuedCount = issuedRecords.length;

            const mappedBooks = catalog.map((catBook) => {
                const recordsForThisBook = issuedRecords.filter(r => r.book === catBook.name);
                const issuedCount = recordsForThisBook.length;
                
                return {
                    id: String(catBook._id),
                    name: catBook.name,
                    total: catBook.total,
                    issued: issuedCount,
                    available: catBook.total - issuedCount,
                    students: recordsForThisBook.map(r => r.student)
                };
            });

            const totalAvailableCopies = mappedBooks.reduce((a, b) => a + b.available, 0);

            res.status(200).json({
                totalBooks: catalog.length,
                issuedBooks: totalIssuedCount,
                availableBooks: totalAvailableCopies,
                booksList: mappedBooks
            });
        } catch (error) {
            console.error("Error in getStats", error);
            res.status(500).json({ error: error.message });
        }
    }
};
