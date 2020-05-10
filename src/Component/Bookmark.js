import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from "react-bootstrap";
import Newscard from "./Newscard";
import {ToastContainer} from "react-toastify";
import Navigation from "./Navigation";

class Bookmark extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleted: false
        }
    }

    removedItem(){
        if(this.state.deleted){
            this.setState({
               deleted: true
            });
        }else{
            this.setState({
                deleted: false
            });
        }
    }

    renderNewscard() {
        let newscards = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i);
            if (key !== "isGuardian") {
                let data = JSON.parse(window.localStorage.getItem(key));
                let news_title = data.news_title;
                let id = data.id;
                let url = data.url;
                let image_link = data.image_link;
                let date = data.date;
                let category = data.category;
                let isGuardian = data.isGuardian;
                let description = data.description;
                let card =
                    <Col key={news_title}>
                        <Newscard
                            id={id}
                            news_title={news_title}
                            image_link={image_link}
                            url={url}
                            date={date}
                            category={category}
                            isGuardian={isGuardian}
                            description={description}
                            removedItem={this.removedItem.bind(this)}
                        />
                    </Col>;
                newscards.push(card);
            }
        }
        return newscards;
    }

    render() {
        if(window.localStorage.length>=2){
            return (
                <>
                    <Navigation />
                    <Container fluid={true} className="mt-3 mb-3">
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
                        <Row xs={1}>
                            <Col>
                                <h4 style={{color: "#504647"}}>Favorites</h4>
                            </Col>
                        </Row>
                        <Row xs={1} md={4}>
                            <>
                                {this.renderNewscard()}
                            </>
                        </Row>
                    </Container>
                </>
            );
        }else{
            return (
                <>
                    <Navigation />
                    <Container fluid={true} className="text-center mt-3">
                        <b>You have no saved articles</b>
                    </Container>
                </>
            );
        }

    }
}

export default Bookmark;