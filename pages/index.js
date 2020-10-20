import axios from "axios"
import {Row, Col, Container, Card, Image } from "react-bootstrap"
import Header from "./header"
export default function Home({launches}) {
  return (
    <Container>
      <Row><Col><Header/></Col></Row>
      <Row>
        <Col sm={12} md={2}>
          Filters
        </Col>
        <Col sm={12} md={10}>
        <Row>
        {launches.map(item => {
        return <Col sm={12} md={6} lg={3} style={{paddingBottom: "1vh"}}>
        <Card key = {item.mission_id+item.mission_name} bg="light">

            <h5 style={{fontWeight:"bolder", fontSize:"3vh", textAlign: "center", paddingTop:"1vh"}}>{item.mission_name}</h5>

          <Image src={item.links.mission_patch_small} thumbnail/>
          <Card.Body>

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