import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import styled from '../styled';

import SkeletonImage from './SkeletonImage';

// This mirrors the File resource we get from Heighliner:
export const ImageSourceType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  PropTypes.string,
]);

const withBackgroundColor = styled(
  ({ theme }) => ({
    backgroundColor: theme.colors.background.inactive,
  }),
  'ui-kit.ConnectedImage.withBackgroundColor'
);

const aspectRatioPropValidator = (props, propName, componentName) => {
  if (props[propName] === undefined) return;

  let errorMessage = '';

  if (typeof props[propName] !== 'number') {
    errorMessage = `Invalid prop \`${propName}\` of value \`${typeof props[
      propName
    ]}\` supplied to \`${componentName}\` expected type of number`;
  }

  if (!props.maintainAspectRatio) {
    errorMessage += ` Prop maintainAspectRatio is required for use with ${propName}`;
  }

  if (typeof props[propName] !== 'number' || !props.maintainAspectRatio) {
    return new Error(errorMessage); // eslint-disable-line consistent-return
  }
};

class ConnectedImage extends PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(ImageSourceType),
      ImageSourceType,
    ]),
    ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    maintainAspectRatio: PropTypes.bool,
    isLoading: PropTypes.bool,
    onLoad: PropTypes.func,
    style: PropTypes.any, // eslint-disable-line
    minAspectRatio: aspectRatioPropValidator,
    maxAspectRatio: aspectRatioPropValidator,
  };

  static defaultProps = {
    ImageComponent: FastImage,
    maintainAspectRatio: false,
  };

  constructor(props) {
    super(props);

    this.state = { source: { ...this.props.source } };

    this.imageOpacity = new Animated.Value(this.isLoading ? 0 : 1);
  }

  get aspectRatio() {
    const style = {};

    if (this.props.isLoading && !style.aspectRatio) {
      // We only need to do this if the image is loading and not cached.
      // TODO: Do we still need this with fastImage?
      style.aspectRatio = 1;
    } else if (this.props.maintainAspectRatio) {
      console.log('Boom', this.state.source);

      // determine the aspect ratio of an image based on its width and height
      if (
        this.state.source &&
        this.state.source.width &&
        this.state.source.height
      ) {
        style.aspectRatio = this.state.source.width / this.state.source.height;

        // account for possible min/max aspectRatio bounds
        if (this.props.minAspectRatio || this.props.maxAspectRatio) {
          const maxAspectRatio = this.props.maxAspectRatio || style.aspectRatio;
          const minAspectRatio = this.props.minAspectRatio || 0;

          style.aspectRatio = Math.max(
            Math.min(maxAspectRatio, style.aspectRatio), // == smaller of maxAspectRatio and current aspectRatio
            minAspectRatio
          ); // == larger of calculated "max" aspect ratio and the minimum aspect ratio
        }
      }
    }

    return style;
  }

  handleOnLoad = (event) => {
    if (!this.state.source.width || !this.state.source.height) {
      const loadedImageProperties = event.nativeEvent;

      // the linter is insisting we use the setState update syntax here 🙄
      this.setState((state) => {
        const imageSource = { ...state.source };

        if (!state.source.width) {
          imageSource.width = loadedImageProperties.width;
        }

        if (!state.source.height) {
          imageSource.height = loadedImageProperties.height;
        }

        return { source: imageSource };
      });
    }
    // Animated.timing(this.imageOpacity, {
    //   toValue: 1,
    //   duration: 250,
    // }).start();
    if (this.props.onLoad) this.props.onLoad(event);
  };

  render() {
    const {
      ImageComponent,
      style,
      forceRatio,
      isLoading,
      maintainAspectRatio,
      ...otherProps
    } = this.props;
    // return (
    // <SkeletonImage
    // onReady={!this.isLoading}
    // forceRatio={forceRatio}
    // style={style}
    // >
    // <ImageComponent
    // {...otherProps}
    // source={source}
    // onLoad={this.handleOnLoad}
    // style={[this.aspectRatio, { opacity: this.imageOpacity }, style]}
    // />
    // </SkeletonImage>
    // );

    console.count('Render');

    return (
      <SkeletonImage
        onReady={!this.isLoading}
        forceRatio={forceRatio}
        style={style}
      >
        <ImageComponent
          source={this.props.source}
          onLoad={this.handleOnLoad}
          style={[this.aspectRatio, style]}
          // {...otherProps}
        />
      </SkeletonImage>
    );
  }
}

const enhanced = withBackgroundColor(ConnectedImage);

enhanced.propTypes = ConnectedImage.propTypes;

export { enhanced as default };
