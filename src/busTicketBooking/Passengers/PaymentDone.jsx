import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const PaymentDone=()=>{
    const message = encodeURIComponent("Payment done!! Thank you!! 😊");
    const qrCodeURL=`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=$%0A ${message}`;
    
    return(
        <div style={{margin:"6% 500px"}}>
            <h1>Scan to Pay</h1>
            <img src={qrCodeURL} alt="QR Code for Payment" />
            <Button variant="primary" style={{margin:"10px 70px"}}>Generate Ticket</Button>
            </div>
    )
}
export default PaymentDone;