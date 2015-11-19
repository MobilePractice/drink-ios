'use strict';

var React = require('react-native');

var SearchBar = require('react-native-search-bar');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AlertIOS,
  TouchableHighlight,
  TextInput
} = React;

var apiEndPoint = "https://mobilepractice.herokuapp.com/api/drink/";

var Search = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  render: function(){
    return (
      <View style={styles.search}>
        <View style={styles.searchContainer}>
            <SearchBar style={styles.searchBox} autoFocus={true}
                placeholder='Enter keyword for your drink...'
              />
        </View>
      </View>
      )}
});

var styles = StyleSheet.create({
    search: {
      flex: 1,
    },
    searchContainer: {
        marginTop: 70,
        flexDirection: "row",
        height: 50
    },
    searchBox: {
        flex: 1
    }
});

module.exports = Search;