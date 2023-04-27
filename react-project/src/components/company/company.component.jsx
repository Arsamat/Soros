import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, Firestore } from "firebase/firestore";
import { db } from '../../utils/firebase/firebase.utils';
import RatingChart from "./company-rating-chart.component";
import { Link } from "react-router-dom";

import { Container, Row, Col, Table } from 'react-bootstrap';

import "./company.styles.scss"

import SafeChart from "./company-safe-chart.component";
import SupportChart from "./company-support-chart.component";

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
    //console.log(experiencedFrequency);
    //console.log(witnessedHarass);
    //console.log(witnessedFrequency);
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


    return (
        <Container className="company-container">

            <Row className="company-main-row">
                <Col className="company-secondary-info">
                    <h1 className="company-name">{name}</h1>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td><b>Address:</b></td>
                                <td>{address}</td>
                            </tr>
                            <tr>
                                <td><b>Website:</b></td>
                                <td>https://www.example.com</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to="/Soros/multi-form" state={{ name: name, address: address }} className="btn btn-primary">Leave Review</Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col className="company-main-info">
                    
                    <h1 className="rating">{getRating()}</h1>
                    <h2 className="rating-5">/5</h2>
                    <p className="disclaimer">Score generated by {getVotes()} reports</p>
                    <p className="disclaimer"> On a scale from 1 (unsafe) to 5 (safe) </p>
                    <RatingChart rating={rating} />
                </Col>
            </Row>

           

            <Row>
                <Col sm={6}>
                    
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <h4>Safety according to users</h4>
                    <SafeChart safety={safety} />
                </Col>
            </Row>
            <div className="pie-chart-div">
                <SupportChart support={support} />
            </div>

        </Container>
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