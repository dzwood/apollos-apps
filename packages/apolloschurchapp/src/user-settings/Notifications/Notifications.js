import React, { memo } from 'react';
import { Switch } from '@apollosproject/ui-kit';
import { Formik } from 'formik';

const Notifications = memo(() => (
  <Formik initialValues={{ enabled: false }}>
    {({ handleChange, values }) => (
      <Switch
        value={values.enabled}
        label={'Notifications'}
        onValueChange={handleChange('enabled')}
      />
    )}
  </Formik>
));

Notifications.displayName = 'Notifications';

export default Notifications;
