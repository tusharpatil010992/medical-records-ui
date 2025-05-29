import { CONFIG } from 'src/config-global';

import { AppointmentView } from 'src/sections/appointment/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <AppointmentView />
    </>
  );
}
