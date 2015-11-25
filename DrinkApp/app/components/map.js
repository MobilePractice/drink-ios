'use strict';

var React = require('react-native');
var {
  MapView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

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

var MapViewExample = React.createClass({
  getInitialState() {
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

    };
  },

  render() {
      
      let markers = [];
      this.props.storeLocations.forEach(function(marker){
          markers.push(
              {
                latitude: marker.latitude,
                longitude: marker.longitude,
                title: marker.name,
                subtitle: marker.address_line_1
            }
        );
      });

    return (
      <View style={styles.container}>
        <MapView
          maxDelta={0.05}
          minDelta={0}
          style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion || undefined}
          annotations={markers || undefined}
        />
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
      marginTop: 70,
      flex: 1,
  },
  map: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

// exports.displayName = (undefined: ?string);
// exports.title = '<MapView>';
// exports.description = 'Base component to display maps';
// exports.examples = [
//   {
//     title: 'Map',
//     render(): ReactElement { return <MapViewExample />; }
//   },
//   {
//     title: 'Map shows user location',
//     render() {
//       return  <MapView style={styles.map} showsUserLocation={true} />;
//     }
//   }
// ];
module.exports = MapViewExample;
