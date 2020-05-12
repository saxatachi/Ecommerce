import React, { Component } from 'react';
import "../css/bar.min.css"
class Bar extends Component {
    render() {
        return (
            <div className="bar">
                <div className="bar__diamond">                  
                    <span class="fa-stack fa-3x">
                        <i class="fa fa-circle fa-stack-2x icon-background"></i>
                        <i class="fa fa-diamond fa-stack-1x"></i>
                    </span>
                    <div className="bar__diamond__label">
                        <div className="bar__diamond__label__firsttitle">Gwarancja jakości </div>
                        <div className="bar__diamond__label__secondtitle">Shop </div>
                    </div>    
                </div>    
                <div className="bar__marker">                   
                    <span class="fa-stack fa-3x">
                        <i class="fa fa-circle fa-stack-2x icon-background"></i>
                        <i class="fa fa-map-marker fa-stack-1x"></i>
                    </span>
                    <div className="bar__marker__label">
                        <div className="bar__marker__label__firsttitle">W 20 miastach w Polsce</div>
                        <div className="bar__marker__label__secondtitle">Odbierz osobiście</div>
                    </div>    
                </div>
                <div className="bar__car">
                    <span class="fa-stack fa-3x">
                        <i class="fa fa-circle fa-stack-2x icon-background"></i>
                        <i class="fa fa-car fa-stack-1x"></i>
                    </span>
                    <div className="bar__car__label">
                        <div className="bar__car__label__firsttitle">Darmowa dostawa</div>
                        <div className="bar__car__label__secondtitle">Już od 99zł*</div>
                    </div>    
                </div>
                <div className="bar__fast">
                    <span class="fa-stack fa-3x">
                        <i class="fa fa-circle fa-stack-2x icon-background"></i>
                        <i class="fa fa-fast-forward fa-stack-1x"></i>
                    </span>
                    <div className="bar__fast__label">
                        <div className="bar__fast__label__firsttitle">Ekspresowa realizacja</div>
                        <div className="bar__fast__label__secondtitle">Zamówienia</div>
                    </div>    
                </div>

            </div>
        );
    }
}

export default Bar;