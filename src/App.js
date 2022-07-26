import "./style.css";
import React, { useState, useEffect } from "react";

function ConvertMinutes(seconds) {
  let year = Math.floor(seconds / 31536000);
  let month = Math.floor((seconds % 31536000) / 2592000);
  let day = Math.floor((seconds % 31536000) / 86400);
  let hour = Math.floor(((seconds % 31536000) % 86400) / 3600);
  let minute = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  seconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);

  let total = "";

  if (year > 0) total += year + " years ";
  if (month > 0) total += month + " months ";
  if (day > 0) total += day + " days ";
  if (hour > 0) total += hour + " hours ";
  if (minute > 0) total += minute + " minutes ";
  if (seconds > 0) total += seconds + " seconds ";
  return total;
}
let showAll = false;
function only24() {
  const tr = document.querySelectorAll("tr");
  const button = document.getElementById("toggle");
  for (let i = 1; i < tr.length; i++) {
    if (!showAll && tr[i].children[5].innerHTML === "No")
      tr[i].style.display = "none";
    else tr[i].style.display = "table-row";
  }

  if (!showAll) button.innerHTML = "Show all";
  else button.innerHTML = "In 24 Hours";

  showAll = !showAll;
}

function getDate(d) {
  let date = new Date(d);
  return date.toLocaleDateString();
}

export function Kontest() {
  const [contests, setContests] = useState([]);
  const fetchData = async () => {
    const url = "https://www.kontests.net/api/v1/all";

    const response = await fetch(url);
    const responseJSON = await response.json();
    // console.log(responseJSON);
    if (responseJSON) setContests(responseJSON);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Contest Links</h1>
      <button onClick={only24} id="toggle">
        In 24 Hours
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Site</th>
            <th>In 24 Hrs</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, idx) => (
            <tr key={idx}>
              <td>
                <a href={contest.url}>{contest.name}</a>
              </td>
              <td>{getDate(contest.start_time)}</td>
              <td>{getDate(contest.end_time)}</td>
              <td>{ConvertMinutes(contest.duration)}</td>
              <td>{contest.site}</td>
              <td>{contest.in_24_hours}</td>
              <td>{contest.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return <Kontest />;
}

export default App;
