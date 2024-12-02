import './TravellerDetails.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TravellerDetails = ({ seatNumber, register, errors }) => {
    return (
        <div style={{ display: "flex", borderRadius: "10px", border: "0.5px solid", height: "auto", width: "40vw", margin: "10px auto" }}>
            <div className="seat-number-div" style={{ padding: "30px 30px" }}>Seat <span style={{ fontWeight: "500" }}>{seatNumber}</span></div>
            <Form noValidate style={{ width: "100%", padding: "20px" }}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId={`name-${seatNumber}`}>
                        <Form.Label style={{ fontWeight: "500" }}>Name*</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type here"
                            style={{ backgroundColor: "white", border: "1px solid", width: "100%" }}
                            {...register(`travellers.${seatNumber}.name`, {
                                required: "Please enter a valid name"
                            })}
                        />
                        {errors?.travellers?.[seatNumber]?.name && (
                            <p className='errorMsgs'>{errors.travellers[seatNumber].name.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId={`age-${seatNumber}`} style={{ marginLeft: "20px" }}>
                        <Form.Label style={{ fontWeight: "500" }}>Age*</Form.Label>
                        <Form.Control
                            type="text"
                            pattern="[0-9]*"
                            placeholder="e.g. 24"
                            style={{ backgroundColor: "white", border: "1px solid", fontSize: "16px" }}
                            {...register(`travellers.${seatNumber}.age`, {
                                required: "Please enter a valid age",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Age must be a valid number",
                                },
                            })}
                        />
                        {errors?.travellers?.[seatNumber]?.age && (
                            <p className='errorMsgs'>{errors.travellers[seatNumber].age.message}</p>
                        )}
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
};

export default TravellerDetails;
