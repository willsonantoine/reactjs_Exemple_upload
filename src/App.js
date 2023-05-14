import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [image,setImage] = useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fichier', file);
 
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://siteweb.test/api/admin/fichier/create',
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODQwNjk4NjEsImV4cCI6MTY4NDExMzA2MSwic3ViIjoiaHR0cHM6XC9cL3d3dy5tbGluemktY29ycG9yYXRpb24uY29tIiwiaWQiOiIzZmYzMzdkYS01Njk0LTRlNmMtYWUyYS04N2FiZTNhN2E5OTIiLCJyb2xlIjoiQWRtaW4ifQ.g17iZ2Gj_6ileN7zfafFstOD3VC-e5tPUQxK_1T73Q0', 
      },
      data : formData
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload</button>
        {image!=null && <img src={image} alt="uploaded" /> }
      </form>
    </div>
  );
}

export default App;
