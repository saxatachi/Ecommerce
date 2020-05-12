import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import "../css/home.min.css"
const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <div className="home">
      <div className="home__container">
        <div className="home__container__title">
            <div className="home__container__title__title">ZIG KINETICA: NOWE KOLORY</div>
            <p>Podkręć swój styl elektryzującymi zestawieniami kolorystycznymi. Poczuj przypływ mocy.</p>
            <button>Kupuj męskie</button>
            <button>Kupuj damskie</button>
        </div>
      </div>
      <div className="home__twocontainers">
        
        <div className="home__twocontainers__firstcontainer">
          <h1>Plus size</h1>
        </div>
        <div className="home__twocontainers__secondcontainer">
          <h1> New Sport collection</h1>
        </div>
      </div>
      <div className="home__fourcontainers">
        <h1>First</h1>
        <h1>Second</h1>
        <h1>Third</h1>
        <h1>Fourth</h1>
      </div>
      <div className="home__suggestions">
        <h1>odzież 1</h1>
        <h1>odzież 2</h1>
        <h1>odzież 3</h1>
        <h1>odzież 4</h1>
      </div>
  </div>
  // <ResponsiveContainer>
  //   <Segment style={{ padding: "8em 0em" }} vertical>
  //     <Grid container stackable verticalAlign="middle">
  //       <Grid.Row>
  //         <Grid.Column width={8}>
  //           <Header as="h3" style={{ fontSize: "2em" }}>
  //             We Help Companies and Companions
  //           </Header>
  //           <p style={{ fontSize: "1.33em" }}>
  //             We can give your company superpowers to do things that they never
  //             thought possible. Let us delight your customers and empower your
  //             needs... through pure data analytics.
  //           </p>
  //           <Header as="h3" style={{ fontSize: "2em" }}>
  //             We Make Bananas That Can Dance
  //           </Header>
  //           <p style={{ fontSize: "1.33em" }}>
  //             Yes that's right, you thought it was the stuff of dreams, but even
  //             bananas can be bioengineered.
  //           </p>
  //         </Grid.Column>
  //         <Grid.Column floated="right" width={6}>
  //           <Image
  //             bordered
  //             rounded
  //             size="large"
  //             src="/images/wireframe/white-image.png"
  //           />
  //         </Grid.Column>
  //       </Grid.Row>
  //       <Grid.Row>
  //         <Grid.Column textAlign="center">
  //           <Button size="huge">Check Them Out</Button>
  //         </Grid.Column>
  //       </Grid.Row>
  //     </Grid>
  //   </Segment>
  //   <Segment style={{ padding: "0em" }} vertical>
  //     <Grid celled="internally" columns="equal" stackable>
  //       <Grid.Row textAlign="center">
  //         <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
  //           <Header as="h3" style={{ fontSize: "2em" }}>
  //             "What a Company"
  //           </Header>
  //           <p style={{ fontSize: "1.33em" }}>
  //             That is what they all say about us
  //           </p>
  //         </Grid.Column>
  //         <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
  //           <Header as="h3" style={{ fontSize: "2em" }}>
  //             "I shouldn't have gone with their competitor."
  //           </Header>
  //           <p style={{ fontSize: "1.33em" }}>
  //             <Image avatar src="/images/avatar/large/nan.jpg" />
  //             <b>Nan</b> Chief Fun Officer Acme Toys
  //           </p>
  //         </Grid.Column>
  //       </Grid.Row>
  //     </Grid>
  //   </Segment>
  //   <Segment style={{ padding: "8em 0em" }} vertical>
  //     <Container text>
  //       <Header as="h3" style={{ fontSize: "2em" }}>
  //         Breaking The Grid, Grabs Your Attention
  //       </Header>
  //       <p style={{ fontSize: "1.33em" }}>
  //         Instead of focusing on content creation and hard work, we have learned
  //         how to master the art of doing nothing by providing massive amounts of
  //         whitespace and generic content that can seem massive, monolithic and
  //         worth your attention.
  //       </p>
  //       <Button as="a" size="large">
  //         Read More
  //       </Button>
  //       <Divider
  //         as="h4"
  //         className="header"
  //         horizontal
  //         style={{ margin: "3em 0em", textTransform: "uppercase" }}
  //       >
  //         <a href="#">Case Studies</a>
  //       </Divider>
  //       <Header as="h3" style={{ fontSize: "2em" }}>
  //         Did We Tell You About Our Bananas?
  //       </Header>
  //       <p style={{ fontSize: "1.33em" }}>
  //         Yes I know you probably disregarded the earlier boasts as non-sequitur
  //         filler content, but it's really true. It took years of gene splicing
  //         and combinatory DNA research, but our bananas can really dance.
  //       </p>
  //       <Button as="a" size="large">
  //         I'm Still Quite Interested
  //       </Button>
  //     </Container>
  //   </Segment>
  // </ResponsiveContainer>
);
export default HomepageLayout;
