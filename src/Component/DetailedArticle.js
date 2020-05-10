import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Commentbox from "./Commentbox";
import {MdBookmarkBorder, MdBookmark} from "react-icons/md";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import TextTruncate from "react-text-truncate";
import Navigation from "./Navigation";
import Loadingspinner from "./Loadingspinner";

class DetailedArticle extends React.Component {

    constructor(props) {
        super(props);
        if (window.localStorage.getItem(this.props.location.state.id)) {
            this.state = {
                saved: true,
                clicked: false,
                firstload: true,
                hidden: true
            }
        } else {
            this.state = {
                saved: false,
                clicked: false,
                firstload: true,
                hidden: true
            }
        }
        this.onclickBookmark = this.onclickBookmark.bind(this);
        this.arrowClicked = this.arrowClicked.bind(this);
        this.endRef = React.createRef();
        this.topRef = React.createRef();
    }

    renderBookmark() {
        if (this.state.saved) {
            return (
                <div style={{color: 'red'}}>
                    <MdBookmark
                        size={35}
                        onClick={this.onclickBookmark}
                        data-tip="Bookmark"
                        className="bookmark"
                    />
                </div>
            );
        } else {
            return (
                <div style={{color: 'red'}}>
                    <MdBookmarkBorder
                        size={35}
                        onClick={this.onclickBookmark}
                        data-tip="Bookmark"
                        className="bookmark"
                    />
                </div>
            );
        }
    }

    onclickBookmark() {
        if (this.state.saved) {
            toast("Removing " + this.props.location.state.news_title,{
                transition: Zoom
            });
            window.localStorage.removeItem(this.props.location.state.id);
            this.setState({
                saved: false
            });
        } else {
            const data = {
                id: this.props.location.state.id,
                news_title: this.props.location.state.news_title,
                url: this.props.location.state.url,
                image_link: this.props.location.state.image_link,
                date: this.props.location.state.news_date,
                category: this.props.location.state.category,
                isGuardian: this.props.location.state.isGuardian,
                description: this.props.location.state.description
            };
            toast("Saving " + this.props.location.state.news_title,{
                transition: Zoom
            });
            window.localStorage.setItem(
                this.props.location.state.id,
                JSON.stringify(data)
            );
            this.setState({
                saved: true
            });
        }
    }

    arrowClicked() {
        if (this.state.clicked) {
            this.setState({
                clicked: false,
                firstload: false
            });
        } else {
            this.setState({
                clicked: true,
                firstload: false
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.saved === this.state.saved){
            if (!this.state.firstload) {
                if (prevState.clicked === false) {
                    this.scrollToBottom();
                } else {
                    this.scrollToTop();
                }
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, 1000);
    }

    renderPage_guardian_clicked() {
        return (
            <Container
                fluid={true}
                className="border border-light shadow-lg bg-white rounded mt-3 mb-3"
            >
                <div className="ml-2 mr-2">
                    <Row className="mt-2">
                        <Col xs={12}>
                            <i><h1>{this.props.location.state.news_title}</h1></i>
                        </Col>
                    </Row>
                    <Row xs={3} className="mt-2">
                        <Col xs={6}>
                            <i>{this.props.location.state.news_date}</i>
                        </Col>
                        <Col xs={4} className="text-right">
                            <FacebookShareButton
                                url={this.props.location.state.url}
                                hashtag={"#CSCI_571_NewsApp"}
                                data-tip="Facebook"
                            >
                                <FacebookIcon round={true} size={30}/>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={this.props.location.state.url}
                                hashtags={["CSCI_571_NewsApp"]}
                                data-tip="Twitter"
                            >
                                <TwitterIcon round={true} size={30}/>
                            </TwitterShareButton>

                            <EmailShareButton
                                subject={"#CSCI_571_NewsApp"}
                                url={this.props.location.state.url}
                                data-tip="Email"
                            >
                                <EmailIcon round={true} size={30}/>
                            </EmailShareButton>
                        </Col>
                        <Col xs={2} className="text-center">
                            {this.renderBookmark()}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12}>
                            <Image
                                src={this.props.location.state.image_link}
                                className="rounded"
                                alt="placeholder"
                                fluid
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <p>{this.props.location.state.description}</p>
                        </Col>
                    </Row>
                    <Row xs={1}>
                        <Col className="text-right">
                            <IoIosArrowUp onClick={this.arrowClicked} size={32}/>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }

    renderPage_guardian_notclicked() {
        return (
            <Container
                fluid={true}
                className="border border-light shadow-lg bg-white rounded mt-3 mb-3"
            >
                <div className="ml-2 mr-2">
                    <Row className="mt-2">
                        <Col xs={12}>
                            <i><h1>{this.props.location.state.news_title}</h1></i>
                        </Col>
                    </Row>
                    <Row className="mt-2" xs={3}>
                        <Col xs={6}>
                            <i>{this.props.location.state.news_date}</i>
                        </Col>
                        <Col xs={4} className="text-right">
                            <FacebookShareButton
                                url={this.props.location.state.url}
                                hashtag={"#CSCI_571_NewsApp"}
                                data-tip="Facebook"
                            >
                                <FacebookIcon round={true} size={30}/>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={this.props.location.state.url}
                                hashtags={["CSCI_571_NewsApp"]}
                                data-tip="Twitter"
                            >
                                <TwitterIcon round={true} size={30}/>
                            </TwitterShareButton>

                            <EmailShareButton
                                subject={"#CSCI_571_NewsApp"}
                                url={this.props.location.state.url}
                                data-tip="Email"
                            >
                                <EmailIcon round={true} size={30}/>
                            </EmailShareButton>
                        </Col>
                        <Col xs={2} className="text-center">
                            {this.renderBookmark()}
                        </Col>
                    </Row>
                    <Row xs={1} className="mt-2">
                        <Col xs={12}>
                            <Image
                                src={this.props.location.state.image_link}
                                className="rounded"
                                alt="placeholder"
                                fluid
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12}>
                            <TextTruncate
                                line={6}
                                element="p"
                                truncateText="..."
                                text={this.props.location.state.description}
                            />
                        </Col>
                    </Row>
                    <Row xs={1}>
                        <Col className="text-right">
                            <IoIosArrowDown onClick={this.arrowClicked} size={32}/>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }

    renderPage_nytimes() {
        return (
            <Container
                fluid={true}
                className="border border-light shadow-lg bg-white rounded mt-3 mb-3"
            >
                <div className="ml-2 mr-2">
                    <Row className="mt-2">
                        <Col xs={12}>
                            <i><h1>{this.props.location.state.news_title}</h1></i>
                        </Col>
                    </Row>
                    <Row xs={3} className="mt-2">
                        <Col xs={4}>
                            <i>{this.props.location.state.news_date}</i>
                        </Col>
                        <Col xs={6} className="text-right">
                            <FacebookShareButton
                                url={this.props.location.state.url}
                                hashtag={"#CSCI_571_NewsApp"}
                                data-tip="Facebook"
                            >
                                <FacebookIcon round={true} size={30}/>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={this.props.location.state.url}
                                hashtags={["CSCI_571_NewsApp"]}
                                data-tip="Twitter"
                            >
                                <TwitterIcon round={true} size={30}/>
                            </TwitterShareButton>

                            <EmailShareButton
                                subject={"#CSCI_571_NewsApp"}
                                url={this.props.location.state.url}
                                data-tip="Email"
                            >
                                <EmailIcon round={true} size={30}/>
                            </EmailShareButton>
                        </Col>
                        <Col xs={2} className="text-center">
                            {this.renderBookmark()}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12}>
                            <Image
                                src={this.props.location.state.image_link}
                                className="rounded"
                                alt="placeholder"
                                fluid
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12}>
                            <p>{this.props.location.state.description}</p>
                        </Col>
                    </Row>
                </div>
            </Container>

        );
    }

    renderPage() {
        if (this.props.location.state.isGuardian) {
            if (this.state.clicked) {
                return (
                    <>
                        <ReactTooltip
                            place="top"
                        />
                        {this.renderPage_guardian_clicked()}
                    </>
                );
            } else {
                return (
                    <>
                        <ReactTooltip
                            place="top"
                        />
                        {this.renderPage_guardian_notclicked()}
                    </>
                );
            }
        } else {
            return (
                <>
                    <ReactTooltip
                        place="top"
                    />
                    {this.renderPage_nytimes()}
                </>
            );
        }
    }

    scrollToBottom() {
        this.endRef.current.scrollIntoView({behavior: 'smooth'});
    }

    scrollToTop() {
        this.topRef.current.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        if (this.state.hidden) {
            return (
                <>
                    <Navigation/>
                    <Loadingspinner/>
                </>
            );
        } else {
            return (
                <>
                    <div ref={this.topRef}></div>
                    <Navigation/>
                    <Container fluid={true}>
                        <ToastContainer
                            toastClassName="toastBox"
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange={false}
                            draggable
                            pauseOnHover
                        />
                        {this.renderPage()}
                        <Commentbox id={this.props.location.state.id}/>
                        <div ref={this.endRef}></div>
                    </Container>
                </>
            );
        }
    }
}

export default DetailedArticle;