import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';


export function SignUp() {
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [status,setStatus]  = useState("");
     
    const navigate = useNavigate()

    const postUsers = ()=>{
      const newUser ={
        email:mail,
        password:password
      }
      fetch(`${API}/users/signup`,{
        method:"POST",
        body:JSON.stringify(newUser),
        headers: {"Content-type":"application/json"}
      }).then((res)=> res.json())
        .then((response)=>{
          if(response.message){
            setStatus(response.message)
          }else if(response.error){
            setStatus(response.error)
          }
        })
        .then(()=> {
          if(status==="Created Successfully"){
          navigate("/codeSend");
          return;}
        }) 

    }

    const statusStyles = {
      textAlign:'center',
      fontWeight:'bold',
      color: status === 'Created Successfully' ? 'green' : 'red',
      margin:'1% 30% 0% 27%'
    };
  return (
    <div >
        <h1 style={{textAlign:'center', margin:'5% 0 3% 0', paddingBottom:'0%'}}>Sign Up</h1>    
    <Form className='sign-up'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setMail(e.target.value)}/>
        <Form.Text className="text-muted">
        Example for Email Pattern:  cool@gmail.com
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
        <Form.Text className="text-muted">
        Example for Password Pattern:  Password@123
        </Form.Text>
      </Form.Group>
      <Button variant="primary" className='btn' onClick={postUsers}>
        Submit
      </Button>
      <p style={statusStyles}>{status}</p>
    </Form>
    </div>
  )
}
