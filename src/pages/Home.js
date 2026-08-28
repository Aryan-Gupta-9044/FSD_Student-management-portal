import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import { StudentContext } from "../context/StudentContext";

function Home() {
  const { students } = useContext(StudentContext);

  const activeStudents = students.filter((student) => student.status === "Active").length;
  const averageAttendance = students.length
    ? Math.round(students.reduce((total, student) => total + student.attendance, 0) / students.length)
    : 0;
  const courseCount = useMemo(() => new Set(students.map((student) => student.course)).size, [students]);
  const recentStudents = [...students].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="page dashboard">
      <section className="welcome-row"><div><p className="eyebrow">Friday, August 22, 2025</p><h1>Good morning, Admin.</h1><p className="lede">Here is what is happening across your student community today.</p></div><Link className="button primary-button" to="/add-student"><span>+</span> Add student</Link></section>
      <section className="stats" aria-label="Student statistics">
        <div className="stat-card accent-coral"><span className="stat-icon">◎</span><p>Total students</p><h2>{students.length}</h2><span className="stat-note">+12% this semester</span></div>
        <div className="stat-card accent-blue"><span className="stat-icon">◒</span><p>Active students</p><h2>{activeStudents}</h2><span className="stat-note">{students.length ? Math.round((activeStudents / students.length) * 100) : 0}% of total enrollment</span></div>
        <div className="stat-card accent-yellow"><span className="stat-icon">▣</span><p>Average attendance</p><h2>{averageAttendance}%</h2><span className="stat-note">+4.6% from last month</span></div>
        <div className="stat-card accent-green"><span className="stat-icon">⌁</span><p>Programs</p><h2>{courseCount}</h2><span className="stat-note">Across all departments</span></div>
      </section>
      <section className="dashboard-grid">
        <div className="panel recent-panel"><div className="panel-heading"><div><p className="eyebrow">Keep an eye on your roster</p><h2>Recently added</h2></div><Link to="/students">View all <span>→</span></Link></div><div className="recent-list">{recentStudents.map((student) => <Link className="recent-row" to={`/students/${student.id}`} key={student.id}><span className="avatar">{student.name.split(" ").map((part) => part[0]).join("")}</span><span className="student-summary"><strong>{student.name}</strong><small>{student.course}</small></span><span className="student-year">{student.year}</span><span className="chevron">›</span></Link>)}</div></div>
        <div className="panel attendance-panel"><div className="panel-heading"><div><p className="eyebrow">This semester</p><h2>Attendance snapshot</h2></div><span className="panel-menu">•••</span></div><div className="attendance-ring" style={{ "--attendance": `${averageAttendance * 3.6}deg` }}><div><strong>{averageAttendance}%</strong><small>average</small></div></div><p className="center-note"><span className="dot green-dot"></span> Looking healthy <span className="muted">across your roster</span></p></div>
      </section>
    </div>
  );
}

export default Home;