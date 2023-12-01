import React, { useState, useEffect } from "react";
import axios from "axios";

const ListCourses = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  async function getCourseList() {
    let response;
    try {
      if (search.length) {
        response = await axios.get(
          `http://local.overhang.io:8000/api/list_and_filter/list/?search=${search}`
        );
      } else {
        response = await axios.get(
          "http://local.overhang.io:8000/api/list_and_filter/list/"
        );
      }
      setList(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }
  function formInputHandler() {
    getCourseList();
  }
  function inputChangeHandler(event) {
    setSearch(event.target.value);
  }
  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <div>
      <div>
        <input type="text" onChange={inputChangeHandler} />
        <button type="submit" onClick={formInputHandler}>
          Search
        </button>
      </div>
      <table style={{ margin: "10px 50px" }}>
        <tr>
          <th>Course Id</th>
          <th>Name</th>
          <th>Course Number</th>
          <th>Organization</th>
          <th>Enrollment End Date</th>
          <th>Start Date</th>
        </tr>
        <tbody>
          {list.map((ls) => (
            <tr key={ls.course_id}>
              <td>{ls.id}</td>
              <td>{ls.name}</td>
              <td>{ls.number}</td>
              <td>{ls.org}</td>
              <td>{ls.enrollment_end}</td>
              <td>{ls.start_display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCourses;
