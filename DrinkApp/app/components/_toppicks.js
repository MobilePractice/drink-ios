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
  ListView,
  NavigatorIOS,
  SegmentedControlIOS,
  ActivityIndicatorIOS
} = React;

var apiEndPoint = "https://mobilepractice.herokuapp.com/api/drink/";

var TopPicks = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  getInitialState: function() {
    return {
      selectedIndex: 0,
      dataSource: [],
        Beer: null,
        Wine: null,
        Spirit: null,
        loading: false
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
      rightButtonTitle: 'Buy',
      onRightButtonPress: () => alert("Ordered")
    });
  },
  componentDidMount: function() {
    var findFirst = this.props.term || "Beer";
    this.setState({loading: true})
    this.fetchProductData(findFirst).then((product) => {
      
       let update = {};

        if (findFirst == "Spirit") {
          update = {Spirit: product, selectedIndex: 2}
        } else if (findFirst == "Beer") {
          update = {Beer: product, selectedIndex: 0}
        } else {
          update = {Wine: product, selectedIndex: 1}
        }
        this.setState(update);

      this.setState({
        dataSource: product.map((row) => this._renderRow(row)),
        loading: false
      });
    }).done();
    
  },
  fetchProductData: function(key)  {
     return fetch(apiEndPoint+"products?q="+key)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.result.length) {
          return responseData.result;
        } else {
          return [];
        }
      })
      .catch(this.failToGetData);
  },
  failToGetData: function(e) {
    console.log("failToGetData",e);
  },
  render: function(){
    var loader = this.state.loading ?
        <ActivityIndicatorIOS style={{flex:1}}/> : null;
    return (
      <ScrollView automaticallyAdjustContentInsets={false} style={styles.search} key={"search"}>
            <SegmentedControlIOS onChange={this._segmentChange} style={styles.segment} tintColor="#000" values={['Beer', 'Wine', 'Spirit']} selectedIndex={this.state.selectedIndex} />
        <View style={styles.progress}>{loader}</View>
        <View>
          <TableView style={styles.listview} >
            <Section>
              {this.state.dataSource}
            </Section>
          </TableView>
        </View>
      </ScrollView>
      )
  },
  _segmentChange: function(event) {
    let value = event.nativeEvent.value;
    if (this.state[value]) {
        this.setState({
          selectedIndex: event.nativeEvent.selectedSegmentIndex,
          dataSource: this.state[value].map((row) => this._renderRow(row))
        });
    } else {
      this.setState({loading: true})
      this.fetchProductData(value).then((product) => {
        let update = {};

        if (value == "Spirit") {
          update = {Spirit: product, loading: false, dataSource: product.map((row) => this._renderRow(row)) }
        } else if (value == "Wine") {
          update = {Wine: product, loading: false, dataSource: product.map((row) => this._renderRow(row))}
        } else {
          update = {Beer: product, loading: false, dataSource: product.map((row) => this._renderRow(row))}
        }
        this.setState(update);
      }).done();
    }
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
      backgroundColor: "white"
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
    },
    progress: {
      height: 20
    }
});

module.exports = TopPicks;
