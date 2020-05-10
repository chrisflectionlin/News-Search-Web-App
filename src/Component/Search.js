import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Newscard from "./Newscard";
import {Col, Container, Row} from "react-bootstrap";
import Loadingspinner from "./Loadingspinner";
import Navigation from "./Navigation";


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guardian_articles: "",
            nytimes_articles: ""
        }
    }



    renderArticle() {
        let nytimes = this.renderArticle_nytimes(this.state.nytimes_articles);
        let guardian = this.renderArticle_guardian(this.state.guardian_articles);
        let articles = nytimes.concat(guardian);
        return articles;
    }

    renderArticle_guardian(articles) {
        let newscards = [];
        let count = 0;
        for (const article of articles) {
            if (count === 5) break;
            let news_title = article.webTitle;
            let id = news_title.replace(/[^a-z0-9+]+/gi, '-').toLowerCase();
            let url = article.webUrl;
            let date = article.webPublicationDate.slice(0, 10);
            let category = article.sectionId.toUpperCase();
            let description = article.blocks.body[0].bodyTextSummary;
            let image_link = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
            if (typeof article.blocks.main !== "undefined") {
                const img_list = article.blocks.main.elements[0].assets;
                if (img_list.length !== 0) {
                    image_link = img_list[img_list.length - 1].file;
                }
            }
            if (
                news_title !== "" &&
                news_title !== null &&
                category !== "" &&
                category !== null &&
                date !== "" &&
                date !== null &&
                url !== "" &&
                url !== null &&
                url !== "" &&
                url !== null
            ) {
                let card =
                    <Col key={id+Math.random().toString(36)}>
                        <Newscard
                            id={id}
                            news_title={news_title}
                            image_link={image_link}
                            url={url}
                            date={date}
                            category={category}
                            isGuardian={true}
                            description={description}
                            removedItem={false}
                            fromSearch={true}
                        />
                    </Col>;
                newscards.push(card);
                count++;
            }
        }
        return newscards;
    }

    renderArticle_nytimes(articles) {
        let newscards = [];
        let count = 0;
        for (const article of articles) {
            if (count === 5) break;
            let news_title = article.headline.main;
            let category = article.news_desk.toUpperCase();
            let id = news_title.replace(/[^a-z0-9+]+/gi, '-').toLowerCase();
            let date = article.pub_date.slice(0, 10);
            let url = article.web_url;
            let description = article.abstract;
            let image_link = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
            let multimedia = article.multimedia;
            if (multimedia !== null) {
                for (const img of multimedia) {
                    if (img.width >= 2000) {
                        image_link = "https://www.nytimes.com/" + img.url;
                    }
                }
            }
            if (
                news_title !== "" &&
                news_title !== null &&
                category !== "" &&
                category !== null &&
                date !== "" &&
                date !== null &&
                url !== "" &&
                url !== null &&
                url !== "" &&
                url !== null
            ) {
                let card =
                    <Col key={id+Math.random().toString(36).substring(2, 15)}>
                        <Newscard
                            id={id}
                            news_title={news_title}
                            image_link={image_link}
                            url={url}
                            date={date}
                            category={category}
                            isGuardian={false}
                            description={description}
                            removedItem={false}
                            fromSearch={true}
                        />
                    </Col>;
                newscards.push(card);
                count++;
            }
        }
        return newscards;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.match.params.query !== prevProps.match.params.query) {
            this.componentDidMount();
        }
    }

    componentDidMount() {
        let currentComponent = this;
        let queryString = this.props.match.params.query;
        let nytimes_link = "https://expressapp-newsweb.wl.r.appspot.com/nytimes/search/" + queryString;
        let guardian_link = "https://expressapp-newsweb.wl.r.appspot.com/guardian/search/" + queryString;
        axios.get(nytimes_link)
            .then(function (response) {
                const jsonDoc = response.data.response;
                currentComponent.setState({
                    nytimes_articles: jsonDoc.docs
                });
                axios.get(guardian_link)
                    .then(function (response) {
                        const jsonDoc = response.data.response;
                        currentComponent.setState({
                            guardian_articles: jsonDoc.results
                        });
                    });
            });
        this.setState({
            articles: this.renderArticle()
        });
    }

    render() {
        if (!this.state.nytimes_articles.length &&
            !this.state.guardian_articles.length)
            return(
                <>
                    <Navigation
                        query={this.props.match.params.query}
                    />
                    <Loadingspinner/>
                </>
            );
        let cards = this.renderArticle();
        return (
            <>
                <Navigation
                    query={this.props.match.params.query}
                />
                <Container fluid={true} className="mt-3 mb-3">
                    <Row xs={1}>
                        <Col>
                            <h4 style={{color: "#504647"}}>Results</h4>
                        </Col>
                    </Row>
                    <Row xs={1} md={4}>
                        <>
                            {cards}
                        </>
                    </Row>
                </Container>
            </>
        );
    }
}


export default Search;