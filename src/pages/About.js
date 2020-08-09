import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="about">
        <h1>Data Peserta Sanbercode Bootcamp Reactjs</h1>
        <div className="info">
          <li>
            <b>Nama:</b> Steven Riady
          </li>
          <li>
            <b>Email:</b> riadysteve@gmail.com
          </li>
          <li>
            <b>Sistem Operasi yang digunakan:</b> Windows
          </li>
          <li>
            <b>Akun Github:</b> riadysteve
          </li>
          <li>
            <b>Akun Telegram:</b> @steveriady
          </li>
        </div>

        <Link to="/">Kembali ke Index</Link>
      </div>
    </>
  );
}

export default About;
