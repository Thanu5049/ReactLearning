import './ConfirmationDetails.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';

const ConfirmationDetails = () => {
    const pdfRef = useRef();
    const [storedValue, setStoredValue] = useState([]);
    const location = useLocation();

    // Destructure location.state with default values
    const {
        updatedData = [], // List of passenger data
        droppoint = "Unknown",
        pickuppoint = "Unknown",
        selectedSeatLabels = [],
        price = 0,
        from = "",
        to = "",
        on = new Date(),
        busName = "Unknown",
    } = location.state || {};

    // Format the travel date
    const formattedDate = {
        date: on.getDate(),
        month: on.getMonth() + 1,
        year: on.getFullYear(),
    };

    useEffect(() => {
        console.log(updatedData);


        if (!busName || !from || !to || !formattedDate) return;
        const key = `${from}:${to}:${JSON.stringify(formattedDate)}`;
        const newTravelData = {
            travelName: busName,
            seatsBooked: selectedSeatLabels,
            // gender: genderArray,
        };

        const existingValue = localStorage.getItem(key);
        if (existingValue) {
            const existingData = JSON.parse(existingValue);

            // Check if the travelName already exists
            const travelIndex = existingData.findIndex(item => item.travelName === busName);
            if (travelIndex !== -1) {
                // Append seats to the existing travelName
                const updatedSeats = [
                    ...existingData[travelIndex].seatsBooked,
                    ...newTravelData.seatsBooked
                ];
                existingData[travelIndex].seatsBooked = [...new Set(updatedSeats)]; // Ensures unique seat labels
            } else {
                // Add new travelName under the key
                existingData.push(newTravelData);
            }
            // Update localStorage
            console.log("dfgvdf")
            localStorage.setItem(key, JSON.stringify(existingData));
        } else {
            // Create a new key-value pair in localStorage
            console.log("fgfg")
            localStorage.setItem(key, JSON.stringify([newTravelData]));
        }

        // Update the state to reflect the changes
        setStoredValue(localStorage.getItem(key));
    }, [busName, selectedSeatLabels, formattedDate, from, to]);
    function generateAlphaNumericString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const [billNo, setBillNo] = useState("");

    useEffect(() => {
        let existingBillNo = sessionStorage.getItem("billNo");

        if (existingBillNo) {
            setBillNo(existingBillNo);
        } else {
            const randomString = generateAlphaNumericString(6);
            sessionStorage.setItem("billNo", randomString);
            setBillNo(randomString); // Update the state
        }


    }, [updatedData]);
    console.log(updatedData);
    
    const generatePDF = () => {
        const input = pdfRef.current;
    
        html2canvas(input, {
            useCORS: true, // Enable cross-origin resource sharing
            logging: true, // Enable logging for troubleshooting
            allowTaint: false, // Prevent tainted canvas issues
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('ticket.pdf');
        }).catch((error) => {
            console.error("Error generating PDF:", error);
        });
    };
    
    

    const [qrCodeUrl, setQrCodeUrl] = useState('{}');

    useEffect(() => {
        // Generate QR Code URL with the price and bill number
        const qrData = `Price: INR ${price}`;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
        setQrCodeUrl(qrApiUrl);
    }, [price]);

    return (
        <div style={{overflow:"hidden"}} >
            <div id="capture" ref={pdfRef} style={{marginTop:"20px"}}>
                <div className="upper-bill-div" style={{ backgroundColor: "red", color: "white" }}>
                    <div className="bus-details" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div className="image-cont">
                            <img src='bus-png-trail-one.jpg' width='70px' height='50px' style={{ backgroundColor: "none" }} />
                        </div>
                        <div className="bus-name" style={{ fontWeight: "600" }}>{busName}</div>
                    </div>
                </div>
                <div className="middle-bill-div" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '20px', paddingLeft: "15px" }}>
                    <div style={{ width: '80%' }}>
                        <div className="middle-upper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px dashed black', margin: '15px 0 15px 0' }}>
                            <div className="bill-no">Bill No.: {billNo}</div>
                            <div className="date-div">Date: {on.toLocaleDateString()}</div>
                        </div>
                        <div className="middle-center" style={{ marginTop: '15px' }}>
                            <div style={{ display: "table", width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
                                <div style={{ display: "table-row", borderBottom: "1px solid black", fontWeight: "bold" }}>
                                    <div style={{ display: "table-cell", padding: "8px", textAlign: "left" }}>Seat No.</div>
                                    <div style={{ display: "table-cell", padding: "8px", textAlign: "left" }}>Passenger Name</div>
                                    <div style={{ display: "table-cell", padding: "8px", textAlign: "left" }}>Age</div>
                                    <div style={{ display: "table-cell", padding: "8px", textAlign: "left" }}>Gender</div>
                                </div>

                                {/* Table Rows */}
                                {updatedData?.travellers.map((traveller, index) => (
                                    <div key={index} style={{ display: "table-row", borderBottom: "1px solid #ddd" }}>
                                        <div style={{ display: "table-cell", padding: "8px" }}>{`Seat ${index + 1}`}</div>
                                        <div style={{ display: "table-cell", padding: "8px" }}>{traveller.name}</div>
                                        <div style={{ display: "table-cell", padding: "8px" }}>{traveller.age}</div>
                                        <div style={{ display: "table-cell", padding: "8px" }}>{traveller.gender}</div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="middle-bottom" style={{ borderTop: '1px dashed black', marginTop: '15px', display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                            <div className="travel-points-div">{`${pickuppoint}, ${from}`}<span className="custom-dash">&ndash;</span>{`${droppoint}, ${to}`}</div>
                            <div className="arrive-div">Arrive At 05:45 PM</div>
                            <div className="depart-div">Departure at 06:15 PM</div>
                        </div>
                    </div>
                    <div className='qr-div'>
                        <img src={qrCodeUrl} width='130px' style={{ paddingRight: "20px" }} />
                    </div>
                </div>
                <div className="footer-bill-div" style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', paddingTop: '5px', fontWeight: '600', backgroundColor: "red", color: "white", height: "30px", padding: "5px 5px 0 15px" }}>
                    <div>Note: 40% charge for cancellation within 24 hours of program</div>
                    <div><FontAwesomeIcon icon="fa-solid fa-phone" /> +977 - 9876543210, +977 - 0123456789</div>
                </div>
            </div>
            <Button variant="danger" onClick={generatePDF} style={{ marginLeft: "45%", marginTop: "100px" }}>
                Download Ticket <FontAwesomeIcon icon="fa-light fa-download" style={{ color: "#ffffff" }} />
            </Button>
        </div>
    );
};

export default ConfirmationDetails;
