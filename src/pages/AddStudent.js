import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { StudentContext } from "../context/StudentContext";

function AddStudent() {
  const { addStudent } = useContext(StudentContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !course.trim() || !year) {
      setError("Complete every field before adding a student.");
      return;
    }

    addStudent({
      name,
      email,
      course,
      year
    });

    navigate("/students");
  };

  return (
    <div className="page form-page">
      <div className="page-heading"><div><p className="eyebrow">Student directory</p><h1>Add a student</h1><p className="lede">Create a new record. You can update the roster any time.</p></div><Link className="text-link" to="/students">← Back to directory</Link></div>

      <form onSubmit={handleSubmit} className="student-form">
        {error && <p className="form-error" role="alert">{error}</p>}

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <label>Course</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Enter course"
        />

        <label>Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <button type="submit">
          Add Student
        </button>

      </form>
    </div>
  );
}

export default AddStudent;