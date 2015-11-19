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

var Search = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: [],
    };
  },
  _renderRow: function(row) {
    console.log(row.image_thumb_url)
    return (
      <Cell style={styles.row}  arrow={true}>
        <Image style={styles.image} source={{uri: row.image_thumb_url}} resizeMode={"contain"} />
        <Text style={styles.productName}>{row.producer_name}</Text>
      </Cell>
      )
  },
  componentDidMount: function() {
    
  },
  fetchProductData: function(key)  {
     fetch(apiEndPoint+"products?q="+key)
      .then(response => response.json())
      .then(responseData => {
        //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: responseData.result.map((row)=>this._renderRow(row))
        });
      })
      .done();
  },
  render: function(){
    return (
      <View style={styles.search}>
        <View style={styles.searchContainer}>
            <SearchBar style={styles.searchBox} autoFocus={true}
                placeholder='Enter keyword for your drink...'
                ref="keyword"
                onSearchButtonPress={(key)=>{this.refs.keyword.blur();this.fetchProductData(key)}}
              />
        </View>
        <TableView style={styles.listview} >
            <Section canMove={true}>
              {this.state.dataSource}
            </Section>
        </TableView>

      </View>
      )}
});

var styles = StyleSheet.create({
    listview: {
      flex:1,
      marginRight: 5,
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
        marginTop: 70,
        flexDirection: "row",
        height: 50
    },
    searchBox: {
        flex: 1
    }
});

module.exports = Search;