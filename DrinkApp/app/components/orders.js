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
  ActionSheetIOS,
  NavigatorIOS,
} = React;

var BUTTONS = [
  'Logout',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

var _Orders = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  showActionSheet: function() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  },
  render: function(){
    

    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.search} key={"search"}>
        <View style={styles.order}>
          <View style={styles.orderStore}>
            <Text style={styles.orderStoreText}>KING & SPADINA</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemDesc}>
              <Text style={styles.itemName}>Rockway Vineyards 23-77 Chardonnay</Text>
              <Text style={styles.itemQty}>750 mL bottle | Qty: 2</Text>
            </View>
            <Text style={styles.itemPrice}>$28.95</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.itemDesc}>
              <Text style={styles.itemName}>Appleton Estate V/X Signature Blend</Text>
              <Text style={styles.itemQty}>3000 mL bottle | Qty: 1</Text>
            </View>
            <Text style={styles.itemPrice}>$109.95</Text>
          </View>

          <View style={styles.addToCartContainer}>
            <Text style={styles.addToCartBtn}>ADD TO BASKET</Text>
          </View>
        </View>


        <View style={styles.order}>
          <View style={styles.orderStore}>
            <Text style={styles.orderStoreText}>YORK & LAKESHORE</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemDesc}>
              <Text style={styles.itemName}>Muskoka Mad Tom IPA</Text>
              <Text style={styles.itemQty}>473 mL can | Qty: 2</Text>
            </View>
            <Text style={styles.itemPrice}>$6.20</Text>
          </View>

          <View style={styles.addToCartContainer}>
            <Text style={styles.addToCartBtn}>ADD TO BASKET</Text>
          </View>
        </View>
      </ScrollView>
      )
  }
});

var Orders = React.createClass({
  render: function() {
    return ( 
      <NavigatorIOS
        style={styles.container}
        translucent={true}
        titleStyle={styles.navTitle}
        barTintColor={"#FFF"}
        itemWrapperStyle={{backgroundColor:"#f9f9f9"}}
        initialRoute={{
          title: 'RECENT ORDERS',
          component: _Orders,
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
      fontSize: 16,
    },
    search: {
      flex: 1,
      paddingTop: 80
    },
    order: {
      margin: 15,
      borderColor: "#c7c8ca",
      borderWidth: 1,
      backgroundColor: "#fff"
    },
    orderStore: {
      borderBottomColor: "#c7c8ca",
      borderBottomWidth: 1,
    },
    orderStoreText: {
      fontFamily: 'Helvetica-Light',
      padding: 5,
      fontSize: 12,
      flex: 1,
      textAlign: "center"
    },
    item: {
      marginLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomColor: "#c7c8ca",
      borderBottomWidth: 1,
      flexDirection: "row",
    },
    itemName: {
      fontFamily: "Georgia",
      fontSize: 12,
      fontWeight: "bold"
    },
    itemQty: {
      fontSize: 12,
      color: "gray"
    },
    itemPrice: {
      width: 70,
      textAlign: "right",
      paddingRight: 10,
      justifyContent: "center"
    },
    itemDesc: {
      flex: 1
    },
    addToCartBtn: {
      flex: 1,
      padding: 10,
      textAlign: "center",
      fontFamily: "Georgia"
    },
    addToCartContainer: {
      borderTopWidth: 1,
      borderTopColor: "#c7c8ca",
      marginTop: -1
    }
});

module.exports = Orders;
