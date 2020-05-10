import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Sharepopup from "./Sharepopup";
import Badge from "react-bootstrap/Badge";
import TextTruncate from 'react-text-truncate';
import {Redirect} from "react-router-dom";

class Newsbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };

    renderRedirect = () => {
        const title = this.props.news_title.replace(/[^a-z0-9+]+/gi, '-').toLowerCase();
        if(this.state.redirect){
            return (
                <Redirect to={{
                    pathname: "/article?id=" + title,
                    state: {
                        id: title,
                        url: this.props.news_url,
                        news_title: this.props.news_title,
                        news_date: this.props.news_date,
                        image_link: this.props.image_link,
                        description: this.props.description,
                        category: this.props.category,
                        isGuardian: this.props.isGuardian
                    }
                }} />
            )
        }
    };

    renderBadge() {
        let cat = this.props.category;
        let comp = <h5><Badge variant="secondary" className="newscat">{cat}</Badge></h5>;
        if (cat === "WORLD") {
            comp = <h5><Badge style={{backgroundColor: "#7018DA"}} variant="secondary">{cat}</Badge></h5>
        } else if (cat === "POLITICS") {
            comp = <h5><Badge style={{backgroundColor: "#019E78"}} variant="secondary">{cat}</Badge></h5>
        } else if (cat === "BUSINESS") {
            comp = <h5><Badge style={{backgroundColor: "#26A8D9"}} variant="secondary">{cat}</Badge></h5>
        } else if (cat === "TECHNOLOGY") {
            comp = <h5 className="badgeinsideText"><Badge style={{backgroundColor: "#75D001"}}>{cat}</Badge></h5>
        } else if (cat === "SPORTS" || cat === "SPORT") {
            comp = <h5 className="badgeinsideText"><Badge style={{backgroundColor: "#f6c244"}}>{cat}</Badge></h5>
        }
        return comp;
    }

    render() {
        return (
            <Container fluid={true} className="newsbox">
                {this.renderRedirect()}
                <Container fluid={true}
                           className="border border-light shadow-lg bg-white rounded mt-3 mb-5"
                           onClick={this.setRedirect}
                >
                    <Row>
                        <Col md={3} sm={12}>
                            <Image
                                src={this.props.image_link}
                                className="rounded mt-2 mb-2"
                                alt="placeholder"
                                thumbnail
                            />
                        </Col>
                        <Col>
                            <Row className="mt-3">
                                <Col>
                                    <h4 className="font-weight-bolder font-italic">
                                        {this.props.news_title}
                                        <Sharepopup
                                            title={this.props.news_title}
                                            url={this.props.news_url}
                                        />
                                    </h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextTruncate
                                        line={3}
                                        element="p"
                                        truncateText="..."
                                        text={this.props.description}
                                    />
                                </Col>
                            </Row>
                            <Row xs={2}>
                                <Col xs={6} className="font-italic">
                                    {this.props.news_date}
                                </Col>
                                <Col xs={6} className="text-right">
                                    {this.renderBadge()}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>

        );
    }
}

export default Newsbox;