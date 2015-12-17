'use strict';

var React = require('react-native');
var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;
var Cell = TableView.Cell;

var {
  MapView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  ScrollView,
} = React;

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var days = [];

var MapRegionInput = React.createClass({

  propTypes: {
    region: React.PropTypes.shape({
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired,
      latitudeDelta: React.PropTypes.number.isRequired,
      longitudeDelta: React.PropTypes.number.isRequired,
    }),
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      region: {
        //   latitude: this.props.currentLocation.coords.latitude,
        //   longitude: this.props.currentLocation.coords.longitude,
          latitude: 0,
          longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }
    };
  },

  componentWillReceiveProps: function(nextProps) {
      // console.log("looking for position passed in: ", this.props.currentLocation);
    // this.setState({
    //   region: nextProps.region || this.getInitialState().region
    // });
  },

  render: function() {
    var region = this.state.region || this.getInitialState().region;
    return (
      <View>
        <View style={styles.row}>
          <Text>
            {'Latitude'}
          </Text>
          <TextInput
            value={'' + region.latitude}
            style={styles.textInput}
            onChange={this._onChangeLatitude}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Longitude'}
          </Text>
          <TextInput
            value={'' + region.longitude}
            style={styles.textInput}
            onChange={this._onChangeLongitude}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Latitude delta'}
          </Text>
          <TextInput
            value={'' + region.latitudeDelta}
            style={styles.textInput}
            onChange={this._onChangeLatitudeDelta}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Longitude delta'}
          </Text>
          <TextInput
            value={'' + region.longitudeDelta}
            style={styles.textInput}
            onChange={this._onChangeLongitudeDelta}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.changeButton}>
          <Text onPress={this._change}>
            {'Change'}
          </Text>
        </View>
      </View>
    );
  },

  _onChangeLatitude: function(e) {
    regionText.latitude = e.nativeEvent.text;
  },

  _onChangeLongitude: function(e) {
    regionText.longitude = e.nativeEvent.text;
  },

  _onChangeLatitudeDelta: function(e) {
    regionText.latitudeDelta = e.nativeEvent.text;
  },

  _onChangeLongitudeDelta: function(e) {
    regionText.longitudeDelta = e.nativeEvent.text;
  },

  _change: function() {
    this.setState({
      latitude: parseFloat(regionText.latitude),
      longitude: parseFloat(regionText.longitude),
      latitudeDelta: parseFloat(regionText.latitudeDelta),
      longitudeDelta: parseFloat(regionText.longitudeDelta),
    });
    this.props.onChange(this.state.region);
  },

});

let weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
let currentDate = new Date();
let day = currentDate.getDay();
let dayName = weekDays[day];


var MapViewExample = React.createClass({
  getInitialState() {
      let _favouriteStore = this.props.favouriteStore;

    return {
      mapRegion: {
        latitude: this.props.currentLocation.coords.latitude,
        longitude: this.props.currentLocation.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
      dataSource: []
    };
  },


  render() {
      let markers = this.props.storeLocations.map((marker)=>{
          return {
            latitude: marker.latitude,
            longitude: marker.longitude,
            title: marker.name,
            subtitle: marker.address_line_1,
            hasLeftCallout: true,
            animateDrop: true
        }
      });

      let storeLocations = this.props.storeLocations.map((store, index)=>{
          let markerNumber = index+1;
          let distance = store.distance_in_meters/100;
          let openingHours = store[dayName+"_open"]/60;
          let closingHours = store[dayName+"_close"]/60-12;
          let starMarker = <Image style={styles.marker} source={{uri: 'marker'}} resizeMode="contain"/>;
          let standardMarker = <Image style={styles.marker} source={{uri: 'blankLocationIcon'}} resizeMode="contain"><Text style={styles.markerNotation}>{markerNumber}</Text></Image>;
          let usedMarker = undefined;
          if(store.name.toLowerCase() === this.props.favouriteStore.toLowerCase()){
              usedMarker = starMarker;
          } else {
              usedMarker = standardMarker;
          }

          return (
                <Cell style={styles.storeRow} key={store.id}>
                    <View>
                        {usedMarker}
                    </View>
                    <View style={styles.locationContent}>
                        <Text style={styles.storeName}>{store.name}</Text>
                        <Text>{distance}km away, {openingHours}:00 am - {closingHours}:00 pm</Text>
                    </View>
                </Cell>
            )
      });

    return (
      <View style={styles.container}>
        <MapView
          maxDelta={0.05}
          minDelta={0}
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={false}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion || undefined}
          annotations={markers || undefined}

        />
        <ScrollView automaticallyAdjustContentInsets={false} style={styles.product} >
            <View style={styles.storeList}>
                <TableView style={styles.listview} >
                  <Section>
                    {storeLocations}
                  </Section>
                </TableView>
            </View>
        </ScrollView>
      </View>
    );
  },

  _getAnnotations(region) {
    return [{
      longitude: this.props.currentLocation.coords.longitude,
      latitude: this.props.currentLocation.coords.latitude,
      title: 'go west young man!',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  },

});

var styles = StyleSheet.create({
  container: {
      marginTop: 65,
      flex: 1
  },
  map: {
    height: 180,
  },
  row: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  storeRow: {
      flexDirection: 'row',
      padding: 15
  },
  storeList: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'none'
  },
  listview: {
      flex: 1
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3
  },
  product: {
      flex: 1,
      marginBottom: 50
  },
  marker: {
    height: 30,
    width:30,
    marginRight: 10,
    marginLeft: 10
  },
  markerNotation: {
      backgroundColor: "none",
      paddingTop: 3,
      fontSize: 12,
      textAlign: "center"
  },
  storeName: {
      fontWeight: "bold"
  },
  locationContent: {
    flex: 1
  }
});

module.exports = MapViewExample;
