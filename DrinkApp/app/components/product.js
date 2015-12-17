'use strict';

var React = require('react-native');

var SearchBar = require('react-native-search-bar');

var TableView = require('react-native-tableview');

var Section = TableView.Section;
var Item = TableView.Item;
var Cell = TableView.Cell;  

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicatorIOS
} = React;

var apiEndPoint = "https://mobilepractice.herokuapp.com/api/drink/";



var Product = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  componentDidMount: function() {
  },
  getInitialState: function() {
    return {
      loading: false
    };
  },
  render: function(){
    var loader = this.state.loading ?
      <View style={styles.progress}>
        <ActivityIndicatorIOS style={{flex:1}}/>
      </View> : null;

    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.product} >
        
        <View style={styles.imageContainer}>
          
          <Text style={styles.tagline}>{this.props.product.varietal}, {this.props.product.style}</Text>
          <Text style={styles.priceText}>${(this.props.product.price_in_cents/100).toFixed( 2 )}</Text>
          {loader}
          <Image onLoadEnd={()=>console.log("image did load")} 
                  resizeMode={"contain"} 
                  style={styles.image} 
                  source={{uri:this.props.product.image_url}} 
                  onLoadStart={(e) => this.setState({loading: true})}
                  onLoad={() => this.setState({loading: false})}
                
                  />
                    
          <Text style={styles.tagline}>{this.props.product.serving_suggestion}</Text>
        </View>
      </ScrollView>
      )}
});

var styles = StyleSheet.create({
    imageContainer: {
      flexDirection: "column"
    },
    tagline: {
      flex: 1,
      textAlign: "center",
      fontFamily: "Helvetica-Light",
      fontSize: 18,
      marginRight: 20,
      marginLeft: 20,
      marginTop: 20
    },
    image: {
      marginRight: 10,
      marginLeft: 10,
      height: 400,
      width: 400,
      flex: 1,
      alignSelf: "center"
    },
    product: {
        marginTop: 70,
        flex: 1
    },
    priceText: {
      flex: 1,
      textAlign: "center",
      fontFamily: "Georgia-Italic",
      fontSize: 24,
      marginRight: 10,
      marginLeft: 10,
    },
    price: {
      position: "absolute",
      top: 10,
      right: 20,
      height: 80,
      width: 80,
      backgroundColor: "rgba(5, 165, 209, 0.05)",
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center"
    },
    progress: {
      marginTop: 160
    }
});

module.exports = Product;