import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
        articles: [],
        loading: false,
        page:1
    }
}

async componentDidMount(){ 
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ccd7466c36d144e1bd00f34dc54b50d8&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
     
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
}
nexthandler=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ccd7466c36d144e1bd00f34dc54b50d8&page=${this.state.page+1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
  
    this.setState({
        page: this.state.page+1,
        articles: parsedData.articles, totalResults: parsedData.totalResults
    })

    
}
prevhandler=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ccd7466c36d144e1bd00f34dc54b50d8&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
     
    
    this.setState({
        page: this.state.page-1,
        articles: parsedData.articles, totalResults: parsedData.totalResults
    })

    
}

    render() { 
      return (<>
          <div className="container my-3">
              <h1>NewsHunt - Top Headlines</h1> 
              <div className="row"> 
              {this.state.articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div> 
              })} 
              </div> 
              </div> 
              <div className="container d-flex justify-content-evenly">
                <button disabled={this.state.page<=1}className=" btn btn-secondary my-2" onClick={this.prevhandler}>&laquo;Prev</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)}className=" btn btn-secondary my-2" onClick={this.nexthandler}>Next&raquo;</button>

              </div>
              
              </>
    )
  }
}


export default News