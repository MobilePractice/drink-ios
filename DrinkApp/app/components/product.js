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
  AlertIOS,
  TouchableHighlight,
  TextInput,
  ListView
} = React;

var apiEndPoint = "https://mobilepractice.herokuapp.com/api/drink/";

var Product = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  getInitialState: function() {
    return {
      dataSource: [],
    };
  },
  componentDidMount: function() {
  },
  render: function(){
    return (
      <View style={styles.product} >
        <Image resizeMode={"contain"} style={styles.image} source={{uri:this.props.product.image_url}} />
      </View>
      )}
});

var styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      marginRight: 10,
      marginLeft: 10
    },
    product: {
        marginTop: 70,
        flexDirection: "row",
        height: 50
    }
});

module.exports = Product;