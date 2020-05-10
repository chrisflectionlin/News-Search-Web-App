import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Newsbox from "./Newsbox"
import Loadingspinner from "./Loadingspinner";
import Navigation from "./Navigation";

class Technology extends React.Component {
    constructor(props) {
        super(props);
        if (window.localStorage.getItem("isGuardian") === "true") {
            this.state = {
                isGuardian: true,
                nytimes_articles: "",
                guardian_articles: ""
            }
        } else {
            this.state = {
                isGuardian: false,
                nytimes_articles: "",
                guardian_articles: ""
            }
        }
    }

    toggleSwitch() {
        if (this.state.isGuardian) {
            window.localStorage.setItem("isGuardian", "false");
            this.setState({isGuardian: false});
        }else{
            window.localStorage.setItem("isGuardian", "true");
            this.setState({isGuardian: true});
        }
    }

    rendernewsCard_nytimes(articles) {
        let newsboxes = [];
        for (const article of articles) {
            const title = article.title;
            let section = article.section.toUpperCase();
            const date = article.published_date.slice(0, 10);
            const img_list = article.multimedia;
            const url = article.url;
            const desc = article.abstract;
            let newsimage = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
            if(img_list !== null){
                for (const img of img_list) {
                    if (img.width >= 2000) {
                        newsimage = img.url;
                    }
                }
            }
            const newsbox =
                <Newsbox
                    key={title}
                    image_link={newsimage}
                    news_title={title}
                    description={desc}
                    news_date={date}
                    category={section}
                    news_url={url}
                    isGuardian={false}
                />;
            newsboxes.push(newsbox);
        }
        return newsboxes;
    }

    rendernewsCard_guardian(articles) {
        let newsboxes = [];
        for (const article of articles) {
            const title = article.webTitle;
            let section = article.sectionId.toUpperCase();
            const date = article.webPublicationDate.slice(0, 10);
            const url = article.webUrl;
            const desc = article.blocks.body[0].bodyTextSummary;
            let newsimage = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
            if(typeof article.blocks.main!== "undefined"){
                const img_list = article.blocks.main.elements[0].assets;
                if (img_list.length !== 0) {
                    newsimage = img_list[img_list.length - 1].file;
                }
            }
            const newsbox =
                <Newsbox
                    key={title}
                    image_link={newsimage}
                    news_title={title}
                    description={desc}
                    news_date={date}
                    category={section}
                    news_url={url}
                    isGuardian={true}
                />;
            newsboxes.push(newsbox);
        }
        return newsboxes;
    }

    componentDidMount() {
        let currentComponent = this;
        let guardian_link = 'https://expressapp-newsweb.wl.r.appspot.com/guardian/technology';
        let nytimes_link = 'https://expressapp-newsweb.wl.r.appspot.com/nytimes/technology';
        axios.get(guardian_link)
            .then(function (response) {
                const jsonDoc = response.data;
                currentComponent.setState({
                    guardian_articles: jsonDoc.articles
                });
                axios.get(nytimes_link)
                    .then(function (response) {
                        const jsonDoc = response.data;
                        currentComponent.setState({
                            nytimes_articles: jsonDoc.articles
                        });
                    });
            });
    }

    render() {
        if (!this.state.nytimes_articles.length && !this.state.guardian_articles.length)
            return(
                <>
                    <Navigation
                        toggled={this.toggleSwitch.bind(this)}
                    />
                    <Loadingspinner />
                </>
            );
        if (this.state.isGuardian) {
            let cards = this.rendernewsCard_guardian(this.state.guardian_articles);
            return (
                <>
                    <Navigation
                        toggled={this.toggleSwitch.bind(this)}
                    />
                    {cards}
                </>
            );
        } else {
            let cards = this.rendernewsCard_nytimes(this.state.nytimes_articles);
            return (
                <>
                    <Navigation
                        toggled={this.toggleSwitch.bind(this)}
                    />
                    {cards}
                </>
            );
        }
    }
}

export default Technology;