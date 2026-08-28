import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { Link } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

function Students() {
  const { students, deleteStudent } = useContext(StudentContext);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All courses");
  const [sort, setSort] = useState("name");

  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => `${student.name} ${student.email} ${student.course}`.toLowerCase().includes(search.toLowerCase()))
      .filter((student) => course === "All courses" || student.course === course)
      .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : b.attendance - a.attendance);
  }, [students, search, course, sort]);

  const courses = [...new Set(students.map((student) => student.course))];

  return (
    <div className="page students-page">
      <div className="page-heading"><div><p className="eyebrow">Directory</p><h1>All students</h1><p className="lede">Browse, filter and manage your student records.</p></div><Link className="button primary-button" to="/add-student"><span>+</span> Add student</Link></div>
      <div className="toolbar"><label className="search-wrap"><span>⌕</span><input ref={searchInput} type="text" placeholder="Search by name, email or course" value={search} onChange={(e) => setSearch(e.target.value)} /></label><select value={course} onChange={(e) => setCourse(e.target.value)}><option>All courses</option>{courses.map((item) => <option key={item}>{item}</option>)}</select><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Sort: Name</option><option value="attendance">Sort: Attendance</option></select></div>
      <div className="list-meta"><p>Showing <strong>{filteredStudents.length}</strong> of {students.length} students</p><span className="status-legend"><span className="dot green-dot"></span> Active <span className="dot grey-dot"></span> On leave</span></div>
      <div className="student-list">
        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          filteredStudents.map((student) => (
            <div className="student-card" key={student.id}><span className="avatar">{student.name.split(" ").map((part) => part[0]).join("")}</span><div className="student-summary"><h3>{student.name}</h3><p>{student.email}</p></div><div className="course-cell"><strong>{student.course}</strong><small>{student.year}</small></div><div className="attendance-cell"><strong>{student.attendance}%</strong><small>Attendance</small></div><span className={`status ${student.status === "Active" ? "status-active" : "status-leave"}`}><span className="dot"></span>{student.status}</span><Link className="row-link" to={`/students/${student.id}`}>View <span>→</span></Link><button className="delete-button" type="button" onClick={() => { if (window.confirm(`Remove ${student.name} from the roster?`)) deleteStudent(student.id); }} aria-label={`Remove ${student.name}`}>×</button></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Students;