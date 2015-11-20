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
  ScrollView
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
  render: function(){
    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.product} >
        
        <View style={styles.imageContainer}>

          <Image resizeMode={"contain"} style={styles.image} source={{uri:this.props.product.image_url}} />
        
          <View style={styles.price}>
          <Text style={styles.priceText}>${(this.props.product.price_in_cents/100).toFixed( 2 )}</Text>
        </View>
        </View>
      </ScrollView>
      )}
});

var styles = StyleSheet.create({
    imageContainer: {
      flexDirection: "row"
    },
    image: {
      marginRight: 10,
      marginLeft: 10,
      height: 300,
      width: 300,
      flex: 1
    },
    product: {
        marginTop: 70,
        flex: 1
    },
    priceText: {
      backgroundColor: "transparent",
      fontFamily: "Georgia-Italic",
      fontWeight: 'bold'
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
    }
});

module.exports = Product;