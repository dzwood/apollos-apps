import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@apollosproject/ui-kit';
import { Formik } from 'formik';

const Notifications = memo(({ notificationsEnabled, toggleNotifications }) => (
  <Formik initialValues={{ enabled: notificationsEnabled }}>
    {({ handleChange, values }) => (
      <Switch
        value={values.enabled}
        label={'Notifications'}
        // TODO: needs a custom handleChange method to run a mutation
        onValueChange={handleChange('enabled')}
      />
    )}
  </Formik>
));

Notifications.propTypes = {
  notificationsEnabled: PropTypes.bool,
  toggleNotifications: PropTypes.func,
};

Notifications.defaultProps = { notificationsEnabled: false };

Notifications.displayName = 'Notifications';

export default Notifications;
