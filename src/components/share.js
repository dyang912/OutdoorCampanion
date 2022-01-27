import '../App.css';
import emailjs from '@emailjs/browser';
import {Form, Button} from "react-bootstrap"
import {useEffect, useState} from "react";

const Share = ({UName}) =>{
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const senderName = UName
    useEffect(()=>{
        console.log(senderName)
        },[senderName]
    )
    const sendEmail = (e) => {
        const emailTemplate = {
            subject: subject,
            senderName: senderName,
            toemail: email,
            message: message
        }
        e.preventDefault();
        emailjs.send('service_9nrro1v', 'template_xf2uxmu', emailTemplate, 'user_NQDGRj5n79bHwZACxMYAl')
            .then((result) => {
                console.log(result.text);
                console.log(UName)
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div className='form-container'>
            <Form onSubmit={sendEmail} style={{width: 30+'vw'}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject" name="subject" size="lg" onChange={
                        e=>setSubject(e.target.value)}/>
                    <Form.Label>Message</Form.Label>
                    <Form.Control className="text-md-right" as="textarea" placeholder="Enter message" name="message" size="lg"
                                  style={{height: 15+'vh'}} onChange={e=>setMessage(e.target.value)}/>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Who do you want to send to?" name="toemail" size="lg" onChange={
                        e=>{setEmail(e.target.value)}
                    }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Share;