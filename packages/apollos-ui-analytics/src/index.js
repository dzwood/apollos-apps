import AnalyticsProvider, {
  AnalyticsConsumer,
  identify,
  track,
} from './Provider';
import TrackEventWhenLoaded from './TrackEventWhenLoaded';
import withTrackOnPress from './withTrackOnPress';
import CoreAnalytics from './CoreAnalytics';

export {
  AnalyticsConsumer,
  AnalyticsProvider,
  CoreAnalytics,
  identify,
  track,
  TrackEventWhenLoaded,
  withTrackOnPress,
};
