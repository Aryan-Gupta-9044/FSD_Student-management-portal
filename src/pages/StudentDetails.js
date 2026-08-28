import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { StudentContext } from "../context/StudentContext";

function StudentDetails() {
  const { id } = useParams();

  const { students } = useContext(StudentContext);

  const student = students.find(
    (student) => student.id === Number(id)
  );

  if (!student) {
    return (
      <div className="page">
        <h1>Student Not Found</h1>

        <Link to="/students">Back to Students</Link>
      </div>
    );
  }

  return (
    <div className="page details-page">
      <Link className="text-link" to="/students">← Back to directory</Link>
      <div className="profile-header"><span className="profile-avatar">{student.name.split(" ").map((part) => part[0]).join("")}</span><div><p className="eyebrow">Student profile</p><h1>{student.name}</h1><p className="lede">{student.course} · {student.year}</p></div><span className={`status ${student.status === "Active" ? "status-active" : "status-leave"}`}><span className="dot"></span>{student.status}</span></div>

      <div className="details-card">
        <p className="eyebrow">Contact information</p>
        <div className="detail-item"><small>Email address</small><strong>{student.email}</strong></div>
        <div className="detail-item"><small>Course</small><strong>{student.course}</strong></div>
        <div className="detail-item"><small>Year of study</small><strong>{student.year}</strong></div>
        <div className="detail-item"><small>Joined directory</small><strong>{student.joined}</strong></div>
      </div>

      <div className="panel detail-card performance-card"><p className="eyebrow">Academic snapshot</p><h2>{student.attendance}%</h2><p>Attendance this semester</p><div className="progress"><span style={{ width: `${student.attendance}%` }}></span></div><small className="muted">Updated this week</small></div>
    </div>
  );
}

export default StudentDetails;