import AnalyticsProvider, {
  AnalyticsConsumer,
  identify,
  track,
} from './Provider';
import TrackEventWhenLoaded from './TrackEventWhenLoaded';
import withTrackOnPress from './withTrackOnPress';
import CoreNavigationAnalytics from './CoreAnalytics';

export {
  AnalyticsConsumer,
  AnalyticsProvider,
  CoreAnalytics,
  identify,
  track,
  TrackEventWhenLoaded,
  withTrackOnPress,
};
