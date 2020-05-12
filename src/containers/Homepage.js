import React, { Component } from 'react'
import "../css/home.min.css"
import {connect} from "react-redux"
import HomepageItem from './HomepageItem'
class Homepage extends Component {
    componentDidMount(){
        console.log("Wszytskie Itemy")
        console.log(this.props.allitems)
        let items = this.props.allitems
        console.log("Wszystkie itemy item pojedynczy")
        console.log(items.items[0].children[0].price)
    }
    render() {
        
        let items= this.props.allitems.items
        console.log("itemy próba")
        console.log(items)
        const listItems = items.map((item,key) => <HomepageItem items={item} /> );
        return (
            
            <div className="home">
            
            <div className="home__container">
                <img className="home__container__img" src="http://127.0.0.1:8000/static/person.jpg/"></img>
              <div className="home__container__title">
                  <div className="home__container__title__title">ZIG KINETICA: NOWE KOLORY</div>
                  <p>Podkręć swój styl elektryzującymi zestawieniami kolorystycznymi. Poczuj przypływ mocy.</p>
                  <button>Kupuj męskie</button>
                  <button>Kupuj damskie</button>
              </div>
            </div>
            <div className="home__twocontainers">
            
              <div className="home__twocontainers__firstcontainer">
              <img className="home__twocontainers__firstcontainer__img" src="http://127.0.0.1:8000/static/fashion.jpg/"></img>
                <div className="home__twocontainers__firstcontainer__title">  
                    <h3>Posiadamy również rozmiary plus size.</h3>
                    <h3>Zapraszamy zapoznaj się z naszą ofertą</h3>
                    <button>Przejdz do naszych produktów</button>
                    
                </div>
              </div>
              <div className="home__twocontainers__secondcontainer">
                <img className="home__twocontainers__secondcontainer__img" src="http://127.0.0.1:8000/static/skateboarder.jpg/"></img>
                <div className="home__twocontainers__secondcontainer__title">  
                    <h1> Posiadamy nową sportową kolekcje ubrań zarówno dla Pań jak i Panów</h1>
                </div>
              </div>
            </div>
            <div className="home__fourcontainers">
                <div className="home__fourcontainers__first">
                    <img className="home__fourcontainers__first__img" src="http://127.0.0.1:8000/static/sport.jpg/"></img>
                </div>
                <div className="home__fourcontainers__second">
                    <img className="home__fourcontainers__second__img" src="http://127.0.0.1:8000/static/training.jpg/"></img>
                </div>
                <div className="home__fourcontainers__third">
                    <img className="home__fourcontainers__third__img" src="http://127.0.0.1:8000/static/balancing.jpg/"></img>
                </div>
                <div className="home__fourcontainers__fourth">
                    <img className="home__fourcontainers__fourth__img" src="http://127.0.0.1:8000/static/children.jpg/"></img>
                </div>
            </div>
            <div className="home__suggestions">
                {/* <div className="home__suggestions__first">
                    <img className="home__suggestions__first__img" src="http://127.0.0.1:8000/static/shoes2.jpg/"></img>
                    <h1>{}</h1>
                    <h1>Opis</h1>
                </div> */}
                
                {/* <HomepageItem items={this.props.allitems.items[0]}/>
                <HomepageItem items={this.props.allitems.items[0]}/>
                <HomepageItem items={this.props.allitems.items[0]}/>
                <HomepageItem items={this.props.allitems.items[0]}/> */}
                {listItems}
                {/* <div className="home__suggestions__second">
                <img className="home__suggestions__second__img" src="http://127.0.0.1:8000/static/legs.jpg/"></img>
                    <h1>odzież 2</h1>
                    <h1>Opis</h1>
                </div> */}
                {/* <div className="home__suggestions__third">
                    <img className="home__suggestions__third__img" src="http://127.0.0.1:8000/static/boots.jpg/"></img>
                    <h1>odzież 3</h1>
                    <h1>Opis</h1>
                </div> */}
                {/* <div className="home__suggestions__fourth">
                <img className="home__suggestions__fourth__img" src="http://127.0.0.1:8000/static/girl.jpg/"></img>
                    <h1>odzież 4</h1>
                    <a><span>Cena</span></a>
                </div> */}
            </div>
            <div className="home__register">
                    <div className="home__register__title">
                        <span>Zarejestruj się a dostaniesz rabat -15% na wszystkie produkty</span>
                    </div>
                    <div className="home__register__button">
                        <button>Zarejestruj się</button>
                    </div>
            </div>
            
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    //   array: state.items.mainarray.items
    allitems : state.items.allitems,
    isLoaded : state.items.isAllLoadedItems
    };
  };
export default connect(mapStateToProps)(Homepage);