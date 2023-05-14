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
        'Authorization': 'Bearer token', 
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
