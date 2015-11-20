'use strict';

var React = require('react-native');
var Search = require('./search');
var Maps = require('./map');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AlertIOS,
  TouchableHighlight,
  TouchableOpacity
} = React;

var apiEndPoint = "https://mobilepractice.herokuapp.com/api/drink/";

var Main = React.createClass({
  _handleBackButtonPress: function() {
    this.alert("back")
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  _loadSearch: function(term) {
    this.props.navigator.push({
      component: Search,
      title: "Search",
      navigationBarHidden: false,
      tintColor: "black",
      passProps: {term:term}
    });
  },
  _loadMap: function() {
    this.props.navigator.push({
      component: Maps,
      title: "Maps",
      navigationBarHidden: false,
      tintColor: "black",
      passProps: {currentLocation: this.state.lastPosition}
    });
  },
  componentDidMount: function() {
    this.detectLocation();
  },
  watchID: (null: ?number),
  getInitialState: function() {
      return {
        storeName: "loading...",
        address1: "loading...",
        initialPosition: 'unknown',
        lastPosition: 'unknown'
      };
  },
  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  detectLocation: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.getNearStore(initialPosition.coords),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });
  },
  getNearStore: function(coords) {
    fetch(apiEndPoint+"stores?lat="+ coords.latitude.toString() + "&lon=" + coords.longitude.toString())
      .then(response => response.json())
      .then(responseData => {
        if (!responseData.length) {
          this.setState({
            storeName: responseData.result[0].name.toUpperCase(),
            address1: responseData.result[0].address_line_1.toUpperCase()
          });
        } else {
          this.setState({
            storeName: "No store found",
            address1: ""
          });
        }
      })
      .done();
  },
  fetchStoreData: function()  {
     fetch(apiEndPoint+"stores")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          storeName: responseData.result[0].name.toUpperCase(),
          address1: responseData.result[0].address_line_1.toUpperCase()
        });
      })
      .done();
  },
  showType: function(msg) {
      this._loadSearch(msg);
  },
  render: function(){
    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.scroll}>
            <View style={styles.toolbar}>
                <View style={styles.menuContainer}>
                  <Image style={styles.imageButton} source={{uri: 'menu'}} resizeMode="contain"/>
                </View>
                <View style={styles.toolbarTitle}>
                  <Image style={styles.logo} source={{uri: 'logo'}} resizeMode="contain"/>
                </View>
                <TouchableOpacity  onPress={()=>this._loadSearch()} style={styles.cartSearch}>
                  <Image style={styles.imageButton} source={{uri: 'magnifier'}} resizeMode="contain"/>
                </TouchableOpacity>
                <View style={styles.cartSearch}>
                  <Image style={styles.imageButton} source={{uri: 'cart'}} resizeMode="contain"/>
                </View>
            </View>

            <View style={styles.bannerContainer}>
              <Image style={styles.bannerImage} source={{uri: 'banner1'}} resizeMode="cover"/>
            </View>

            <View style={styles.locationBox}>
              <View style={styles.greetingBox}>
                <Text style={styles.greeting}>Good afternoon, Jason</Text>
              </View>
              <View style={styles.preferredStore}>
                <Image style={styles.marker} source={{uri: 'marker'}} resizeMode="contain"/>
                <View style={styles.preferredStoreTextContainer}>
                  <Text style={styles.storeName}>{this.state.storeName}</Text>
                  <Text style={styles.storeAddressAndTime}>{this.state.address1}, 9:30AM - 10:00PM</Text>
                </View>
              </View>
              <View style={styles.locationButtons}>
                <TouchableOpacity style={styles.locationButton1} onPress={()=>this._loadMap()}><Text style={styles.locationButtonText}>CHANGE MY STORE</Text></TouchableOpacity>
                <TouchableOpacity style={styles.locationButton2} onPress={() => this.showType('My Orders')}><Text style={styles.locationButtonText}>MY ORDERS</Text></TouchableOpacity>
              </View>
            </View>

            <View style={styles.currentLocation}>
              <Text style={styles.currentLocationText}>SHOP {this.state.storeName}</Text>
            </View>

            <View style={styles.topBooze}>
              <View style={styles.boozeType}>
                <Text style={styles.boozeTypeText}>Wine</Text>
                <View style={styles.boozeTypeLine} />
              </View>
              <TouchableOpacity onPress={() => this.showType('Wine')}>
                <Image style={styles.boozeTypeImage} source={{uri: 'wine'}} />
              </TouchableOpacity>
            </View>

            <View style={styles.topBooze}>
              <View style={styles.boozeType}>
                <Text style={styles.boozeTypeText}>Beer</Text>
                <View style={styles.boozeTypeLine} />
              </View>
              <TouchableOpacity onPress={() => this.showType('Beer')}>
                <Image style={styles.boozeTypeImage} source={{uri: 'beer'}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.topBooze}>
              <View style={styles.boozeType}>
                <Text style={styles.boozeTypeText}>Spirit</Text>
                <View style={styles.boozeTypeLine} />
              </View>
              <TouchableOpacity onPress={() => this.showType('Spirit')}>
                <Image style={styles.boozeTypeImage} source={{uri: 'spirit'}} />
              </TouchableOpacity>
            </View>
        </ScrollView>
      )}
});

var styles = StyleSheet.create({
    scroll: {
      flex: 1
    },
    toolbar:{
        paddingTop:30,
        paddingBottom:20,
        flexDirection:'row',
        backgroundColor: "#fff"
    },
    toolbarButton:{
        width: 50,
        textAlign:'center'
    },
    toolbarTitle:{
        textAlign:'center',
        fontWeight:'bold',
        marginLeft:50,
        flex:1
    },
    imageButton: {
      height:20
    },
    menuContainer: {
      width:50,
      height: 23
    },
    cartSearch: {
      width:50,
      height: 23
    },
    logo: {
      height:23
    },
    bannerImage: {
      height:120,
      flex:1
    },
    bannerContainer: {
      borderTopColor: "#c7c8ca",
      borderTopWidth: 1
    },
    locationBox: {
      marginLeft: 15,
      marginRight: 15,
      height: 150,
      borderColor: "#c7c8ca",
      borderWidth: 1,
      marginTop:-25,
      backgroundColor: "#fff"
    },
    greetingBox: {
      marginLeft: 10,
      marginRight: 10,
      height: 50,
      borderBottomColor: "#c7c8ca",
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    greeting: {
      fontFamily: "Georgia-Italic",
      fontSize: 20
    },
    preferredStore: {
      marginLeft: 10,
      marginTop:15,
      marginRight: 10,
      flexDirection:'row'
    },
    marker: {
      height: 30,
      width:30,
      marginRight:10
    },
    preferredStoreTextContainer: {
      flex:1
    },
    storeName: {
      fontSize: 11,
      fontFamily: "Helvetica-Light",
      marginBottom: 5
    },
    storeAddressAndTime: {
      fontSize: 11,
      color: "#6d6e71",
      fontFamily: "Helvetica-Light"
    },
    locationButtons: {
      flexDirection: "row",
      marginTop:15
    },
    locationButton1: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: "center",
      borderTopWidth: 1,
      borderTopColor:"#c7c8ca",
      borderRightWidth: 1,
      borderRightColor:"#c7c8ca",
      height: 37
    },
    locationButton2: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: "center",
      borderTopWidth: 1,
      borderTopColor:"#c7c8ca",
      height: 37
    },
    locationButtonText: {
      fontFamily: "Georgia",
      fontSize: 12
    },
    currentLocation: {
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor:"#c7c8ca",
      borderBottomWidth: 1,
      borderBottomColor:"#c7c8ca",
      marginTop: 15,
      marginBottom: 15,
      textAlign: "center",
      height: 30,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    currentLocationText: {
      fontSize:10
    },
    topBooze: {
      marginBottom: 15,
      marginRight: 15,
      marginLeft: 15
    },
    boozeType: {
      flexDirection: "row",
      marginBottom: 10
    },
    boozeTypeText: {
      fontFamily: "Georgia-Italic",
      fontSize: 12,
      marginRight: 5
    },
    boozeTypeLine: {
      borderBottomColor: "#c7c8ca",
      borderBottomWidth: 1,
      flex: 1
    },
    boozeTypeImage: {
      height: 150
    }
});

module.exports = Main;
