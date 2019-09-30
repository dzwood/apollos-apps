import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  Paragraph,
  StretchyView,
} from '@apollosproject/ui-kit';

import { FlexedScrollView, EventInfoItem } from './components';
const Event = ({ event, loading }) => {
  const coverImageSources = get(event, 'image.sources', []);
  return (
    <BackgroundView>
      <StretchyView>
        {({ Stretchy, ...scrollViewProps }) => (
          <FlexedScrollView {...scrollViewProps}>
            {coverImageSources.length || loading ? (
              <Stretchy>
                <GradientOverlayImage
                  isLoading={!coverImageSources.length && loading}
                  source={coverImageSources}
                />
              </Stretchy>
            ) : null}
            <PaddedView vertical={false}>
              <H2 padded isLoading={!event.name && loading}>
                {event.name}
              </H2>
              <Paragraph>
                <EventInfoItem
                  icon={'time'}
                  title={moment(event.start).format('ddd, MMMM Do, YYYY')}
                  subtitle={`${moment(event.start).format('LT')} — ${moment(
                    event.end
                  ).format('LT')}`}
                />
                <EventInfoItem icon={'pin'} title={event.location} />
                {/* <Button */}
                {/*   title="Add To Calendar" */}
                {/*   onPress={() => */}
                {/*     Linking.openURL( */}
                {/*       'webcal://BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//ddaysoftware.com//NONSGML DDay.iCal 1.0//EN\r\nBEGIN:VEVENT\r\nDTEND:20150610T000001\r\nDTSTAMP:20150708T170113Z\r\nDTSTART:20150610T000000\r\nRRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE\r\nSEQUENCE:0\r\nUID:411ee1a1-8fe4-4b5a-88ea-9244563dffd6\r\nEND:VEVENT\r\nEND:VCALENDAR' */}
                {/*     ) */}
                {/*   } */}
                {/* /> */}
              </Paragraph>
            </PaddedView>
          </FlexedScrollView>
        )}
      </StretchyView>
    </BackgroundView>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    __typename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default Event;
