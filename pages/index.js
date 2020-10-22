import axios from "axios"
import { useState } from 'react';
import {Row, Col, Container, Card, Button } from "react-bootstrap"
import Header from "./header"
import Head from "next/head"
export default function Home({launches}) {
  const baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100"
  const [items, setitems] = useState(launches)

  const fetchByYear = async (e) => {
    e.preventDefault()
    const baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100&launch_year="+e.target.id
    const data = await axios.get(baseUrl)
    setitems(data.data)
  }

  const fetchByLaunch= async (status) => {
    console.log(status)
    const baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success="+status
    const data = await axios.get(baseUrl)
    setitems(data.data)
  }

  const fetchByLand = async (status) => {
    const baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100&land_success="+status
    const data = await axios.get(baseUrl)
    setitems(data.data)
  }
  return (
    <Container>
      <Head>
        <title>SpaceX Launch Programs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row key="header"><Col><Header/></Col></Row>
      <Row key="content">
        <Col sm={12} md={2} key="filters">
          <h4>Filters</h4>
          <h6>Launch year</h6>
          <Row key="yearfilters">
            {[2006,2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020].map((year) => <Col key={year} style={{paddingBottom:"1vh"}}><Button variant="primary" size="sm" onClick={fetchByYear} id={year}>{year}</Button></Col>)}
          </Row>
          <hr/>
          <h6>Succesful Launch</h6>
          <Row key="ls">

            <Col key="lst"><Button variant="success" size="sm"  onClick={()=>fetchByLaunch(true)}>True</Button></Col>
            <Col key="lsf"><Button variant="danger"  size="sm"  onClick={()=>fetchByLaunch(false)}>False</Button></Col>
          </Row>
          <hr/>
          <h6>Succesful Landing</h6>

          <Row key="ll">
            <Col key="llst"><Button variant="success" size="sm" onClick={()=>fetchByLand(true)}>True</Button></Col>
            <Col key="llsf"><Button variant="danger"  size="sm"  onClick={()=>fetchByLaunch(false)}>False</Button></Col>
          </Row>

        </Col>
        <Col sm={12} md={10} key="results">
        <Row>
        {items.map(item => {
        return <Col sm={12} md={6} lg={3} style={{paddingBottom: "1vh"}} key = {"col"+item.mission_id+item.mission_name}>
        <Card key = {item.mission_id+item.mission_name} bg="light">


          <Card.Img src={item.links.mission_patch_small} variant="top" alt={item.mission_name}/>
          <h5 style={{fontWeight:"bolder", fontSize:"1rem", textAlign: "center", paddingTop:"1vh"}}>{item.mission_name}</h5>

          <Card.Body>
        <p style={{fontWeight:"bold", fontSize:"0.8rem"}}>Launch Year: {item.launch_year}</p>
        <p style={{fontWeight:"bold", fontSize:"0.8rem"}}>Launching: {item.launch_success? "Successful": "Unsuccessful"}</p>
        <p style={{fontWeight:"bold", fontSize:"0.8rem"}}>Landing: {item.rocket.first_stage.cores[0].land_success? "Successful": "Unsuccessful"}</p>


          </Card.Body>
          </Card>
          </Col>

        })}        </Row>
        </Col>
      </Row>
    </Container>
  )
}

Home.getInitialProps = async () => {
  const baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100"
  const data = await axios.get(baseUrl)
  return {launches:data.data}
}