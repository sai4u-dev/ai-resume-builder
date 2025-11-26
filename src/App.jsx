import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Preview from './pages/Preview'
import Home from './pages/Home'
import Form from './pages/Form'
import NavBar from './components/NavBar'
import PreviewWraper from './components/PreviewWraper'
import { useId } from 'react'
import { nanoid } from '@reduxjs/toolkit'





function App() {

  // const [url, setUrl] = useState("");
  // const [status, setStatus] = useState("");

  const giId = useId();
  const giI = useId();
  const rId = nanoid();
  console.log(giId, giI, "react user id")
  console.log(rId, "Nano Id")

  // function isValidGitHubFormat(url) {
  //   const profileRegex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/;
  //   const repoRegex = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9._-]+\/?$/;

  //   return profileRegex.test(url) || repoRegex.test(url);
  // }


  // const handleCheck = async () => {
  //   setStatus("Checking...");

  //   // Step 1: Format validation
  //   if (!isValidGitHubFormat(url)) {
  //     setStatus("❌ Invalid GitHub URL format");
  //     return;
  //   }


  //   async function verifyGitHubURL(url) {
  //     const path = url.replace("https://github.com/", "").replace("http://github.com/", "");

  //     const parts = path.split("/").filter(Boolean);

  //     if (parts.length === 1) {
  //       // Profile verification
  //       const username = parts[0];
  //       const response = await fetch(`https://api.github.com/users/${username}`);
  //       return response.status === 200;
  //     }

  //     if (parts.length >= 2) {
  //       // Repo verification
  //       const [username, repo] = parts;
  //       const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
  //       return response.status === 200;
  //     }

  //     return false;
  //   }
  //   // Step 2: GitHub API validation
  //   const exists = await verifyGitHubURL(url);

  //   if (exists) {
  //     setStatus("✅ Valid GitHub link");
  //   } else {
  //     setStatus("❌ GitHub user or repo does not exist");
  //   }
  // };


  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userDetails" element={<Form />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/previewwra" element={<PreviewWraper />} />
        </Routes>

      </BrowserRouter>
      {/* <div>
        <input
          type="text"
          placeholder="Enter your GitHub URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleCheck}>Verify</button>

        <p>{status}</p>
      </div> */}

    </>
  )
}

export default App