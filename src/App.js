import {Badge,Table,Button,Form,Row,Col,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{useState,useEffect}from 'react';


function App() {

  const[dataServers,setDataServers]=useState([])
  const[name,setName]=useState('')
  const [loading,setLoading]=useState(false)
  const urlget = "http://127.0.0.1:5000/";

  const fetchData = async () => {
    setLoading(true);

    try {

      const response = await fetch(urlget);
      const jsonData = await response.json();
      setDataServers(jsonData.servers)
      console.log(dataServers);
      setLoading(true);

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {


    fetchData();
}, []);



const submit = e => {
  const data2={
    name:name
  }
  console.log(data2);
  fetch("http://127.0.0.1:5000/server", {
    method: 'POST',
    body: JSON.stringify(data2),
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token':'gAAAAABhpksg84NObVa5ddQ-AWx-v6nWlUhHbjRm1SYarU7DLPPqu2Kr8SNjhbwd7_4NpX7_j_4enHMIA_CnfOU6M5gZpfeWODc9gWQJvKcfZH8tIuHUjrsGMNCK-u5qVHNnGkNgI_TYyWTqq7qf5n7N9n7RdgxSeowKbNA1GN7KUR8ZbjiSp7EtzYrSaAzgM_wi07dPNRux'
    },
    
  })
    .then(res => res.json())
    .then(response => console.log(response))
  
   
}


  return (
    <div>
    <br/>
   <div className="text-center">
   <h1 >
    Ormuco<Badge bg="secondary">Server</Badge>
  </h1>
  <br/>
  <Container>

  <Form onSubmit={submit}>

  <Row className="mb-2">
  <div className="form-group">
      <label htmlFor="formGroupExampleInput">Server Name</label>
      <input
        type="text"
        className="form-control"
        name="name"
        placeholder="Server name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>

   
  </Row>
  <Button type='submit' variant="success">Crear server</Button>{' '}

</Form>
</Container>


   </div>
   
  <br/>
  

      <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Server Name</th>
      <th>Flavor</th>
      <th>KeyName</th>
      <th>Image</th>
      <th>Status</th>

    </tr>
  </thead>
  <tbody>
   {dataServers.map(server=>(
 <tr key={server.id}>
 <td>{server.id}</td>
 <td>{server.name}</td>
 <td>{server.flavor.id}</td>
 <td>{server.key_name}</td>
 <td>{server.image.id}</td>
 <td>{server.status}</td>

</tr>

    ))} 
   
  
  
  </tbody>
</Table> 

</div>  );
}

export default App;
