/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AlertIOS
} = React;

exports.framework = 'React';
exports.title = 'Geolocation';
exports.description = 'Examples of using the Geolocation API.';

exports.examples = [
  {
    title: 'navigator.geolocation',
    render: function(): ReactElement {
      return <GeolocationExample />;
    },
  }
];


var apiEndPoint = "https://mobilepractice.herokuapp.com/api/drink/";

var DrinkAppReact = React.createClass({
  componentDidMount: function() {
   // this.fetchStoreData();
    this.detectLocation();
  },
  watchID: (null: ?number),
  getInitialState: function() {
      return {
        storeName: "loading...",
        address1: "loading...",
        initialPosition: 'unknown',
        lastPosition: 'unknown',
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
      .then((response) => response.json())
      .then((responseData) => {
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
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          storeName: responseData.result[0].name.toUpperCase(),
          address1: responseData.result[0].address_line_1.toUpperCase()
        });
      })
      .done();
  },
  render: function() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false} style={{backgroundColor:"#f9f9f9"}}>
          <View style={styles.toolbar}>
              <View style={styles.menuContainer}>
                <Image style={styles.imageButton} source={{uri: 'menu'}} resizeMode="contain"/>
              </View>
              <View style={styles.toolbarTitle}>
               
                <Image
                  style={styles.logo}
                  source={{uri: 'logo'}} resizeMode="contain"/>
                
              </View>
              <View style={styles.cartSearch}>
                <Image style={styles.imageButton} source={{uri: 'magnifier'}} resizeMode="contain"/>
              </View>
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
              <Image
                  style={styles.marker}
                  source={{uri: 'marker'}} resizeMode="contain"/>
              <View style={styles.preferredStoreTextContainer}>
                <Text style={styles.storeName}>{this.state.storeName}</Text>
                <Text style={styles.storeAddressAndTime}>{this.state.address1}, 9:30AM - 10:00PM</Text>
              </View>
            </View>
            <View style={styles.locationButtons}>
              <View style={styles.locationButton1}><Text style={styles.locationButtonText}>CHANGE MY STORE</Text></View>
              <View style={styles.locationButton2}><Text style={styles.locationButtonText}>MY ORDERS</Text></View>
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
            <Image
              style={styles.boozeTypeImage}
              source={{uri: 'wine'}} />
          </View>
          <View style={styles.topBooze}>
            <View style={styles.boozeType}>
              <Text style={styles.boozeTypeText}>Beer</Text>
              <View style={styles.boozeTypeLine} />
            </View>
            <Image
              style={styles.boozeTypeImage}
              source={{uri: 'beer'}} />
          </View>
          <View style={styles.topBooze}>
            <View style={styles.boozeType}>
              <Text style={styles.boozeTypeText}>Spirit</Text>
              <View style={styles.boozeTypeLine} />
            </View>
            <Image
              style={styles.boozeTypeImage}
              source={{uri: 'spirit'}} />
          </View>
      </ScrollView>
    );
  }
});


var styles = StyleSheet.create({
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

AppRegistry.registerComponent('DrinkAppReact', () => DrinkAppReact);
