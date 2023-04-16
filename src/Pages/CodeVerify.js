import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';


export function CodeVerify() {
    const[code,setCode] = useState("");
    const[status,setStatus] = useState("");

    const navigate = useNavigate();

    const verifyCode = ()=>{
        const exisCode ={
            code:code
        }
        fetch(`${API}/users/verify`,{
            method:'POST',
            body: JSON.stringify(exisCode),
            headers:{"Content-Type" : "application/json"}
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
            if(status === "Code Verified Successfully"){
              navigate("/endCard")
            }
          })
    }

    const statusStyles = {
        textAlign:'center',
        fontWeight:'bold',
        color: status === "Code Verified Successfully" ? 'green' : 'red',
        margin:'1% 30% 0% 27%'
      };
  return (
    <div>
        <h1 style={{textAlign:'center', margin:'5% 0 3% 0', paddingBottom:'0%'}}>Code Verification</h1> 
          <Form className='sign-up'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Code</Form.Label>
        <Form.Control type="text" placeholder="Enter code" onChange={(e)=> setCode(e.target.value)}/>
      </Form.Group>
      <Button variant="success" className='btn' onClick={verifyCode}>
        Verify Code
      </Button>
      <p style={statusStyles}>{status}</p>
    </Form>
    </div>
  )
}
