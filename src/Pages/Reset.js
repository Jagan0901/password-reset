import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

export function Reset() {
    const[mail,setMail] = useState("");
    const[status,setStatus] = useState("");

    const navigate = useNavigate();

    const codeSend = ()=>{
        const exisUser={
            email : mail
        };

        fetch(`${API}/users/email`,{
            method:'POST',
            body : JSON.stringify(exisUser),
            headers: {"Content-Type" : "application/json"}
        }).then((res)=> res.json())
          .then((response)=>{
            if(response.message){
              setStatus(response.message)
              console.log(response.message)
            }else if(response.error){
              setStatus(response.error)
              console.log(response.error)
            }
          })

          .then(()=>{
            if(status === "We've send the Code to your email. Please check and Enter correctly"){
              navigate("/codeVerify")
            }
          })
    }

    const statusStyles = {
        textAlign:'center',
        fontWeight:'bold',
        color: status === "We've send the Code to your email. Please check and Enter correctly" ? 'green' : 'red',
        margin:'1% 30% 0% 27%'
      };

  return (
    <div>
        <h1 style={{textAlign:'center', margin:'5% 0 3% 0', paddingBottom:'0%'}}>Reset Password</h1> 
          <Form className='sign-up'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setMail(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" className='btn' onClick={codeSend}>
        Send Code
      </Button>
      <p style={statusStyles}>{status}</p>
    </Form>
    </div>
  )
}
