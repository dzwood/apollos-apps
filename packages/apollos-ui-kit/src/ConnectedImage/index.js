import React, { PureComponent } from 'react';
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

    /* We store `this.props.source` as state so that IF our source doesn't have `width` and `height`
     * values we can fetch them via `onLoad` and rerender with them.
     */
    this.state = { source: this.validSource };
  }

  get validSource() {
    let sources = this.props.source || {};

    if (!this.props.isLoading) {
      if (!Array.isArray(sources)) sources = [sources];

      sources = sources.map((source) => {
        let sourceAsObject = source;
        if (typeof source === 'string') sourceAsObject = { uri: source };

        return sourceAsObject;
      });

      // TODO: move this to the server!
      sources = sources.map((source) => ({
        uri: (source.uri || '').replace(/^http:\/\/|^\/\//i, 'https://'),
        ...source,
      }));
    }

    return sources;
  }

  get aspectRatio() {
    const style = {};

    // determine the aspect ratio of an image based on its width and height
    if (
      this.props.maintainAspectRatio &&
      this.state.source[0] &&
      this.state.source[0].width &&
      this.state.source[0].height
    ) {
      style.aspectRatio =
        this.state.source[0].width / this.state.source[0].height;

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

    return style;
  }

  handleOnLoad = (event) => {
    /* `onLoad` is triggered after or `ImageComponent` (default: `FastImage`) returns our requested
     * image. We only need to execute this code if the our original source object didn't have
     * `width` and `height` values which we need to calculate an `aspectRatio` with.
     */

    event.persist(); // TODO: Look into removing this.

    if (!this.state.source[0].width || !this.state.source[0].height) {
      const loadedImageProperties = event.nativeEvent;
      // the linter is insisting we use the setState update syntax here 🙄
      this.setState((state) => {
        const imageSources = [...state.source];

        if (!state.source[0].width) {
          imageSources[0].width = loadedImageProperties.width;
        }

        if (!state.source[0].height) {
          imageSources[0].height = loadedImageProperties.height;
        }
        return { source: imageSources };
      });
    }

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

    return (
      <SkeletonImage onReady={!isLoading} forceRatio={forceRatio} style={style}>
        <ImageComponent
          source={this.state.source}
          onLoad={this.handleOnLoad}
          style={[this.aspectRatio, style]}
          {...otherProps}
        />
      </SkeletonImage>
    );
  }
}

const ConnectedImageWithBackgroundColor = styled(
  ({ theme }) => ({
    backgroundColor: theme.colors.background.inactive,
  }),
  'ui-kit.ConnectedImage.withBackgroundColor'
)(ConnectedImage);

ConnectedImageWithBackgroundColor.propTypes = ConnectedImage.propTypes;

export default ConnectedImageWithBackgroundColor;
