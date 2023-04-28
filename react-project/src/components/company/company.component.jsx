import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, Firestore } from "firebase/firestore";
import { db } from '../../utils/firebase/firebase.utils';
import { Link } from "react-router-dom";

import { Container, Row, Col, Table } from 'react-bootstrap';

import "./company.styles.scss"
import jumbotron_logo from "../../Teatro_de_los_Insurgentes.jpg"

import RatingChart from "./graphs/company-rating-chart.component";
import SafeChart from "./graphs/company-safe-chart.component";
import SupportChart from "./graphs/company-support-chart.component";
import HarassmentChart from "./graphs/company-harassment-chart.component";

const Company = () => {
    const { name } = useParams();
    //change the url for the next redirect to form

    const [address, setAddress] = useState("")
    const [rating, setRating] = useState({});
    const [safety, setSafety] = useState({});
    const [experiencedFrequency, setExperiencedFrequency] = useState({});
    const [experiencedHarass, setExperiencedHarass] = useState({});
    const [witnessedHarass, setWitnessedHarass] = useState({});
    const [witnessedFrequency, setWitnessedFrequency] = useState({});
    const [support, setSupport] = useState({});

    useEffect(() => {
        const queryGet = async () => {
            const q = query(
                collection(db, "companies_fake"),
                where("companyName", "==", `${name}`)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                setAddress(data.address || "");
                setRating(data.rating || {});
                setSafety(data.safety || {});
                setExperiencedHarass(data.experiencedHarass || {});
                setExperiencedFrequency(data.experiencedFrequency || {});
                setWitnessedHarass(data.witnessedHarass || {});
                setWitnessedFrequency(data.witnessedFrequency || {});
                setSupport(data.support || {});

            });
        };
        queryGet();
    }, [name]);


    //console.log("DATA ---------------------");
    //console.log(address); // USED
    //console.log(rating);  // USED
    //console.log(safety); // USED
    //console.log(experiencedHarass);
    console.log(experiencedFrequency);
    //console.log(witnessedHarass);
    console.log(witnessedFrequency);
    //console.log(support);

    const getRating = () => {
        let totalRating = 0;
        let totalVotes = 0;
        for (const [key, value] of Object.entries(rating)) {
            totalRating += parseInt(key) * parseInt(value);
            totalVotes += parseInt(value);
        }
        return totalVotes === 0 ? 0 : (totalRating / totalVotes).toFixed(1);
    }

    const getVotes = () => {
        let votes = 0;
        for (const [key, value] of Object.entries(rating)) {
            votes += parseInt(value);
        }
        return votes
    }

    const getHarassmentPercent = () => {
        let votes = experiencedHarass["yes"];
        let total = experiencedHarass["yes"] + experiencedHarass["no"]
        let percentage = (votes / total).toFixed(1) * 100 
        return percentage;
    }

    const getWitnessedPercent = () => {
        let votes = witnessedHarass["yes"];
        let total = witnessedHarass["yes"] + witnessedHarass["no"]
        let percentage = (votes / total).toFixed(1) * 100 
        return percentage;
    }

    return (
        <div>
            <div className="company-jumbotron"
            style={
                { backgroundImage: `url(${jumbotron_logo})`, 
                backgroundPosition:'center'
                }
                }>
            </div>
            <Container className="company-container">
                <Row className="company-main-row">
                    <Col className="company-secondary-info">
                        <h1 className="company-name">{name}</h1>
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <td className="gray-font">Address:</td>
                                    <td>{address}</td>
                                </tr>
                                <tr>
                                    <td className="gray-font">Website:</td>
                                    <td>https://www.example.com</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Link to="/Soros/multi-form" state={{ name: name, address: address }} className="form-link">Submit Review</Link>
                    </Col>
                    <Col className="company-main-info">
                        <h1 className="rating">{getRating()}</h1>
                        <h2 className="rating-5">/5</h2>
                        <p className="disclaimer">Score generated by {getVotes()} reports</p>
                        <p className="disclaimer"> On a scale from 1 (unsafe) to 5 (safe) </p>
                        <RatingChart rating={rating} />
                    </Col>
                </Row>
                <p className="data-disclaimer"> <i class="fa-solid fa-triangle-exclamation"></i> Please be advised that the following data is unverified and 
                    only comes from safety report forms submitted on this site by users. 
                </p>
                <hr></hr>
                <Row>
                    <Col sm={6}>
                        <h5 className="section-title">Harassment Frequency</h5>
                        <HarassmentChart experiencedFrequency={experiencedFrequency} witnessedFrequency={witnessedFrequency}/>
                    </Col>
                    <Col>
                        <p>{getHarassmentPercent()}% of users have experienced some sort of harassment</p>
                        <p>{getWitnessedPercent()}% of users have witnessed some sort of harassment</p>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col sm={6}>
                    <h5 className="section-title">Company's Response</h5>
                        <SupportChart support={support} />
                    </Col>
                    <Col>
                        <p>
                        This chart shows how the company handled the user's complaints regarding sexual harassment.
                        </p>
                        <p>
                            If your complaint was not resolved and you want to follow up, check the resources you have avaliable here
                        </p>
                        <Link to="/Soros/resources" className="form-link">Check resources</Link>
                    </Col>
                </Row>
            </Container>  
        </div>

    )
}

export default Company


// {companyData.map(company => {
//     return (
//         <Container className="company-container">
//             <Row className="company-main-row">
//                 <Col className="company-main-info">
//                     <h1 className="company-name"> {name}</h1>
//                     <h1 className="rating">{company.rating}/5</h1>
//                     <p>Overall Quality Based on 1 rating</p>
//                     <Link className="cardlist-link" to={new_href}>
//                         <Button className='cardlist-button' size="lg">Rate</Button>
//                     </Link>
//                 </Col>
//                 <Col className="company-secondary-info">
//                     <Table borderless>
//                         <tbody>
//                             <tr>
//                                 <td><b>Address:</b></td>
//                                 <td>{company.address}</td>
//                             </tr>
//                             <tr>
//                                 <td><b>Website:</b></td>
//                                 <td>https://www.example.com</td>
//                             </tr>
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col className="harassment-cases">
//                     <p><b>100%</b> of users experienced hasrrassment</p>
//                     <p><b>0%</b> of reported cases were resolved</p>
//                 </Col>
//                 <Col>
//                     <h4>Overall Safety</h4>
//                     <Example />
//                 </Col>
//             </Row>
//         </Container>
//     )
// })}