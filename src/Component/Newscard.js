import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sharepopup from "./Sharepopup";
import {Container, Row, Col} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import {FaTrash} from "react-icons/all";
import {toast, Zoom} from 'react-toastify';
import {Redirect} from "react-router-dom";


class Newscard extends React.Component {

    constructor(props) {
        super(props);
        this.renderCard = this.renderCard.bind(this);
        this.onclickTrash = this.onclickTrash.bind(this);
        this.state = {
            redirect: false
        };
    }

    renderBadge() {
        let cat = this.props.category;
        let comp = <Badge variant="secondary" className="newscat">{cat}</Badge>;
        if (cat === "WORLD") {
            comp = <Badge style={{backgroundColor: "#7018DA"}} variant="secondary">{cat}</Badge>
        } else if (cat === "POLITICS") {
            comp = <Badge style={{backgroundColor: "#019E78"}} variant="secondary">{cat}</Badge>
        } else if (cat === "BUSINESS") {
            comp = <Badge style={{backgroundColor: "#26A8D9"}} variant="secondary">{cat}</Badge>
        } else if (cat === "TECHNOLOGY") {
            comp = <Badge className="badgeinsideText" style={{backgroundColor: "#75D001"}}>{cat}</Badge>
        } else if (cat === "SPORTS" || cat === "SPORT") {
            comp = <Badge className="badgeinsideText" style={{backgroundColor: "#f6c244"}}>{cat}</Badge>
        }
        return comp;
    }

    renderSource() {
        if (this.props.isGuardian) {
            return <Badge style={{backgroundColor: "#1d2944"}} variant="secondary">GUARDIAN</Badge>;
        } else {
            return <Badge style={{backgroundColor: "#dddddd"}} className="badgeinsideText">NYTIMES</Badge>;
        }
    }

    renderLastRow(){
        if(this.props.fromSearch){
            return (
                <Row xs={2} className="mt-2">
                    <Col xs={6} className="font-italic cardText">
                        {this.props.date}
                    </Col>
                    <Col xs={6} className="text-right cardText">
                        {this.renderBadge()}
                    </Col>
                </Row>
            );
        }else{
            return (
                <Row xs={3} className="mt-2">
                    <Col xs={6} className="font-italic cardText">
                        {this.props.date}
                    </Col>
                    <Col xs={3} className="text-right cardText">
                        {this.renderBadge()}
                    </Col>
                    <Col xs={3} className="text-center cardText">
                        {this.renderSource()}
                    </Col>
                </Row>
            );
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/article?id=" + this.props.id,
                    state: {
                        id: this.props.id,
                        url: this.props.url,
                        news_title: this.props.news_title,
                        news_date: this.props.date,
                        image_link: this.props.image_link,
                        description: this.props.description,
                        category: this.props.category,
                        isGuardian: this.props.isGuardian
                    }
                }}/>
            )
        }
    };

    renderTrash() {
        if (!this.props.removedItem) {
            return null
        } else {
            return (
                <FaTrash
                    size={15}
                    onClick={this.onclickTrash}
                    className="trash float-right"
                />
            );
        }
    }

    onclickTrash(e) {
        this.props.removedItem();
        toast("Removing " + this.props.news_title,{
            transition: Zoom
        });
        window.localStorage.removeItem(this.props.id);
        e.preventDefault();
        e.stopPropagation();
    }

    renderCard() {
        let share_title =
            <>
                <h4><b>NYTIMES</b></h4>
                <h5>{this.props.news_title}</h5>
            </>;
        if (this.props.isGuardian) {
            share_title =
                <>
                    <h4><b>GUARDIAN</b></h4>
                    <h5>{this.props.news_title}</h5>
                </>;
        }

        return (
            <Container
                fluid
                className="border border-light shadow-lg bg-white mb-3 newsbox"
                onClick={this.setRedirect}
            >
                <Row xs={1} className="mt-3 mb-2">
                    <Col xs={12}>
                        <div className="font-italic font-weight-bolder h5">
                            {this.props.news_title}
                            <span  style={{display: "inline-flex"}} className="ml-2">
                                <Sharepopup
                                    title={share_title}
                                    url={this.props.url}
                                />
                            </span>
                            <span  style={{display: "inline-flex"}} className="ml-2">
                                {this.renderTrash()}
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row xs={1}>
                    <Col xs={12}>
                        <Image
                            src={this.props.image_link}
                            className="rounded mb-2"
                            alt="placeholder"
                            thumbnail
                        />
                    </Col>
                </Row>
                {this.renderLastRow()}
                <br/>
            </Container>
        );
    }

    render() {
        return (
            <>
                {this.renderRedirect()}
                {this.renderCard()}
            </>
        );
    }
}

export default Newscard;