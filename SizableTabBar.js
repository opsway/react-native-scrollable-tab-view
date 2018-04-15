const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
} = ReactNative;
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const Button = require('./Button');

const SizableTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler, tabSizes) {
    const {activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return  <View style={{width: tabSizes[page], }} key={name}>
                    <Button
                        style={{width: tabSizes[page], flex: 1, }}
                        accessible={true}
                        accessibilityLabel={name}
                        accessibilityTraits='button'
                        onPress={() => onPressHandler(page)}>
                        <View style={[styles.tab, this.props.tabStyle, {width: tabSizes[page], }, ]}>
                            <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                                {name}
                            </Text>
                        </View>
                    </Button>
                </View>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const underlineSize = this.props.tabSizes.reduce((pv, cv) => pv + cv, 0);
    let tabSizes = [];
    for (let i = 0; i < numberOfTabs; i++) {
      tabSizes[i] = containerWidth * (this.props.tabSizes[i] / underlineSize);
    }

    let left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0, containerWidth * 2 / underlineSize, ],
    });
    return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((name, page) => {
                  const isTabActive = this.props.activeTab === page;
                  const renderTab = this.props.renderTab || this.renderTab;
                  return renderTab(name, page, isTabActive, this.props.goToPage, tabSizes);
                })}
                <Animated.View style={[
                  tabUnderlineStyle,
                    {left, },
                  this.props.underlineStyle,
                    {width: tabSizes[this.props.activeTab], }, ]}/>
            </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = SizableTabBar;

