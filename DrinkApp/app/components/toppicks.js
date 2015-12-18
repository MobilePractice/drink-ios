'use strict';

var React = require('react-native');

var SearchBar = require('react-native-search-bar');

var TableView = require('react-native-tableview');

var Product = require('./product');

var _TopPicks = require("./_toppicks");

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
  ListView,
  NavigatorIOS,
  SegmentedControlIOS
} = React;

var TopPicks = React.createClass({
  render: function() {
    return ( 
      <NavigatorIOS
        style={styles.container}
        translucent={true}
        titleStyle={styles.navTitle}
        initialRoute={{
          title: 'Top Picks',
          component: _TopPicks,
          navigationBarHidden: false
        }} />
      )
  }
});

var styles = StyleSheet.create({
    container: {
      flex: 1
    },
    navTitle: {
      color: '#000',
      fontFamily: 'Georgia',
      fontSize: 18,
    },
    listview: {
      flex:1,
    },
    row: {
      borderBottomWidth: 1,
      borderBottomColor: "#c7c8ca",
      flexDirection:'row',
      paddingBottom: 5,
      paddingTop: 5,
      height: 80
    },
    image: {
      width: 70,
      height: 70,
      marginRight: 10,
      marginLeft: 10
    },
    productName: {
      flex: 1
    },
    search: {
      flex: 1,
    },
    searchContainer: {
        marginTop: 30,
        flexDirection: "row",
        height: 50
    },
    searchBox: {
        flex: 1
    },
    segment: {
      flex: 1,
      marginTop: 80,
      marginRight: 40,
      marginLeft: 40,
      marginBottom: 20
    }
});

module.exports = TopPicks;
