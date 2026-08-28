import React, { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

const initialStudents = [
  { id: 1, name: "Aryan Gupta", email: "aryan@example.com", course: "Computer Science", year: "3rd Year", status: "Active", attendance: 94, joined: "2023-08-14" },
  { id: 2, name: "Rahul Sharma", email: "rahul@example.com", course: "Information Technology", year: "2nd Year", status: "Active", attendance: 87, joined: "2024-01-22" },
  { id: 3, name: "Priya Singh", email: "priya@example.com", course: "Electronics", year: "3rd Year", status: "On leave", attendance: 76, joined: "2023-08-14" },
  { id: 4, name: "Kabir Mehta", email: "kabir@example.com", course: "Business Analytics", year: "1st Year", status: "Active", attendance: 91, joined: "2025-08-18" },
  { id: 5, name: "Ananya Rao", email: "ananya@example.com", course: "Computer Science", year: "4th Year", status: "Active", attendance: 89, joined: "2022-08-15" }
];

const storageKey = "campusdesk.students";

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = window.localStorage.getItem(storageKey);
      return savedStudents ? JSON.parse(savedStudents) : initialStudents;
    } catch (error) {
      return initialStudents;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(students));
  }, [students]);

  /*
    {
      id: 1,
      name: "Aryan Gupta",
      email: "aryan@example.com",
      course: "Computer Science",
      year: "3rd Year"
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      course: "Information Technology",
      year: "2nd Year"
    },
    {
      id: 3,
      name: "Priya Singh",
      email: "priya@example.com",
      course: "Electronics",
      year: "3rd Year"
    }
  ]); */

  const addStudent = (student) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      {
        ...student,
        id: Date.now(),
        status: "Active",
        attendance: 100,
        joined: new Date().toISOString().slice(0, 10)
      }
    ]);
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
}