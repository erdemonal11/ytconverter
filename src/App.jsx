import { useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputUrl = inputUrlRef.current.value;
    console.log(inputUrl);
    const ytID = youtube_parser(inputUrl);
    console.log(ytID);

    if (!ytID) {
      window.alert("Invalid YouTube link!");
      return;
    }

    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: ytID },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";
  };

  return (
    <>
      <section className="diver">
        <h1 className="header">YouTube to MP3 Converter</h1>
        <br /><br />
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              className="input input-alt"
              ref={inputUrlRef}
              type="text"
              placeholder="Paste a YouTube Video URL Link"
            />
            <span className="input-border input-border-alt"></span>
          </div>
          <br /> <br />
          <button type="submit" className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              ></path>
            </svg>
            Search
          </button>
          <br />
          <br />
          <br />
          <br />
          {urlResult ? (
            <a target="_blank" rel="noreferrer" href={urlResult}>
              Download MP3
            </a>
          ) : (
            ""
          )}
        </form>
      </section>
      <br /> <br />
      <br />
      <br />
      <div className="erdemlabel">
        <a
          href="https://github.com/erdemonal11"
          target="_blank"
          className="erdemlabel"
        >
         <b>erdemapps.</b> 
        </a>
      </div>
    </>
  );
}

export default App;
