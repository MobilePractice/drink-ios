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
  SwitchIOS
} = React;

var BUTTONS = [
  'Logout',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

var _Profile = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  _renderRow: function(row) {
    return (
      <Cell key={row.id} style={styles.row}  arrow={true}>
        <Image style={styles.image} source={{uri: row.image_thumb_url}} resizeMode={"contain"} />
        <Text style={styles.productName}>{row.name}</Text>
      </Cell>
      )
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
  getInitialState: function() {
    return {
      trueSwitchIsOn: true
    }
  },
  render: function(){
    let options = ["CHANGE LOGIN & PASSWORD", "EDIT PROFILE", "EDIT BILLING", "RECEIPTS", "NOTIFICATION SETTINGS"]
    let profileOptions = options.map((option,id) => {
      return  (<Cell onPress={()=>alert(option)}  key={id}>  
                  <View style={styles.row}>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
              </Cell>)
    });

    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.search} key={"search"}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{uri: 'https://avatars0.githubusercontent.com/u/4745074?v=3&s=460'}} />
        </View>
        <Text style={styles.profileName}>Jason Matthews</Text>
        <View style={styles.listview}>
          <TableView >
            <Section  arrow={true}>
              {profileOptions}
            </Section>
          </TableView>
        </View>
        <Text style={styles.listTitle}>Alerts</Text>
        <View style={styles.listview}>
          <TableView>
            <Section>
              <Cell key="beacon">  
                  <View style={styles.row}>
                    <Text style={styles.optionText}>IN-STORE NOTIFICATION</Text>
                    <View style={{width: 80, justifyContent: "center", flexDirection: "row"}}><SwitchIOS style={{marginTop:2}} onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
          value={this.state.trueSwitchIsOn} /></View>
                  </View>
              </Cell>
            </Section>
          </TableView>
        </View>
        <Text style={styles.signOut} onPress={this.showActionSheet}>SIGN OUT</Text>
      </ScrollView>
      )
  }
});

var Profile = React.createClass({
  render: function() {
    return ( 
      <NavigatorIOS
        style={styles.container}
        translucent={true}
        titleStyle={styles.navTitle}
        barTintColor={"#FFF"}
        itemWrapperStyle={{backgroundColor:"#f9f9f9"}}
        initialRoute={{
          title: 'PROFILE',
          component: _Profile,
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
      marginTop: 10,
      backgroundColor: "white",
      borderTopColor: "#c7c8ca",
      borderTopWidth: 1,
      borderBottomColor: "#c7c8ca",
      borderBottomWidth: 1
    },
    row: {
      flexDirection:'row',
    },
    optionText: {
      fontFamily: 'Georgia',
      marginLeft: 10,
      padding: 10,
      flex: 1
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
    profileImage: {
      width:100,
      height: 100,
      borderRadius: 50
    },
    profileImageContainer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      marginTop: 80
    },
    profileName: {
      fontFamily: 'Georgia-Italic',
      fontSize: 20,
      textAlign: "center",
      flex: 1,
      marginTop: 10
    },
    listTitle: {
      fontFamily: "Helvetica",
      marginLeft: 10,
      paddingTop: 10,
      fontSize: 16,
      color: "#999"
    },
    signOut: {
      margin: 20,
      marginTop: 40,
      borderColor: "#c7c8ca",
      borderWidth: 1,
      backgroundColor: "white",
      padding: 10,
      textAlign: "center",
      fontFamily: 'Georgia',
      fontSize: 14,
    }
});

module.exports = Profile;
