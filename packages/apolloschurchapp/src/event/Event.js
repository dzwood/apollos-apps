import React from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  styled,
  withTheme,
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  H6,
  H4,
  Paragraph,
  Icon,
  Button,
  StretchyView,
} from '@apollosproject/ui-kit';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const StyledIcon = withTheme(({ theme: { colors, sizing } }) => ({
  fill: colors.text.tertiary,
  size: sizing.baseUnit * 1.5,
  style: {
    marginRight: 8,
  },
}))(Icon);

const StyledH6 = styled(({ theme: { colors, sizing } }) => ({
  color: colors.text.tertiary,
  fontSize: sizing.baseUnit * 0.875,
  marginTop: sizing.baseUnit / 4,
}))(H6);

const EventInfoContainer = styled({ marginBottom: 24, flexDirection: 'row' })(
  View
);

const TextContainer = styled({ flexDirection: 'column' })(View);

const EventInfoItem = ({ icon, title, subtitle }) => (
  <EventInfoContainer>
    <StyledIcon name={icon} />
    <TextContainer>
      <H4 bold>{title}</H4>
      <StyledH6>{subtitle}</StyledH6>
    </TextContainer>
  </EventInfoContainer>
);

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
  }),
  loading: PropTypes.bool,
};

export default Event;
