'use strict';

var React = require('react-native');

var SearchBar = require('react-native-search-bar');

var TableView = require('react-native-tableview');

var Product = require('./product');

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
    return {
      dataSource: [],
    };
  },
  _renderRow: function(row) {
    return (
      <Cell onPress={()=>this._loadProduct(row)} key={row.id} style={styles.row}  arrow={true}>
        <Image style={styles.image} source={{uri: row.image_thumb_url}} resizeMode={"contain"} />
        <Text style={styles.productName}>{row.name}</Text>
      </Cell>
      )
  },
  _loadProduct: function(product) {
    this.props.navigator.push({
      component: Product,
      title: product.name,
      navigationBarHidden: false,
      tintColor: "black",
      passProps: {product: product},
      rightButtonTitle: 'Order',
      onRightButtonPress: () => alert("Ordered")
    });
  },
  componentDidMount: function() {
    if (this.props.term) {
      this.fetchProductData(this.props.term);
    }
  },
  fetchProductData: function(key)  {
     fetch(apiEndPoint+"products?q="+key)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.result.length) { 
          this.setState({
            dataSource: responseData.result.map((row)=>this._renderRow(row))
          });
        } else {
          this.setState({
            dataSource: []
          });
        }
      })
      .done();
  },
  render: function(){
    return (
      <View style={styles.search} key={"search"}>
        <View style={styles.searchContainer}>
            <SearchBar style={styles.searchBox}
                placeholder='Enter keyword for your drink...'
                ref="keyword"
                onSearchButtonPress={(key)=>this.fetchProductData(key)}
                showsCancelButton={true}
                onCancelButtonPress={this._handleBackButtonPress}
                text={this.props.term}
            />
        </View>
        <View>
          <TableView style={styles.listview} >
            <Section>
              {this.state.dataSource}
            </Section>
          </TableView>
        </View>
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