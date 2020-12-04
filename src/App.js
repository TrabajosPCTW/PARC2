import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  "en-US";

const URLes =
  "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
const URLen =
  "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";

function App() {
  const [en, setEn] = useState([]);

  const [es, setEs] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (
        localStorage.getItem("en") === null &&
        localStorage.getItem("es") === null
      ) {
        console.log("ERROR");
      } else {
        setEn(JSON.parse(localStorage.getItem("en")));
        setEs(JSON.parse(localStorage.getItem("es")));
      }
    } else {
      fetch(URLes)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("es", JSON.stringify(res));
          setEs(res);
        });
      fetch(URLen)
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("en", JSON.stringify(res));
          setEn(res);
        });
    }
  }, []);

  let messages = {};
  let headers = [];

  let lang = String(locale).substring(0, 2);

  if (lang === "es") {
    messages[String(locale)] = es;
    headers[0] = "Nombre";
    headers[1] = "Canal";
    headers[2] = "Descripción";
  } else {
    messages[String(locale)] = en;
    headers[0] = "Name";
    headers[1] = "Channel";
    headers[2] = "Description";
  }

  let msg = messages[String(locale)];

  return (
    <div className="App">
      <Navbar className="navbar">
        <Navbar.Brand href="#home">Series</Navbar.Brand>
      </Navbar>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>{headers[0]}</th>
              <th>{headers[1]}</th>
              <th>{headers[2]}</th>
            </tr>
          </thead>
          <tbody>
            {msg.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.channel}</td>
                  <td>{row.description}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <barChart></barChart>
      </div>
    </div>
  );
}

export default App;
