import { useRef } from "react"
import emailjs from '@emailjs/browser';
const Share = () =>{
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_9nrro1v', 'template_xf2uxmu', form.current, 'user_NQDGRj5n79bHwZACxMYAl')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div className='form-container'>
            <form ref={form} onSubmit={sendEmail} >
                <div class="form-group">
                    <label>Subject</label>
                    <input type="text" name="subject" autoComplete="off"/>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" autoComplete="off"/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="toemail" autoComplete="off"/>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea name="message" autoComplete="off"/>
                </div>
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default Share;