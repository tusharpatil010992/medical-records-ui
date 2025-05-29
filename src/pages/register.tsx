import { CONFIG } from 'src/config-global';

import { RegisterView } from 'src/sections/auth/register-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Register - ${CONFIG.appName}`}</title>

      <RegisterView />
    </>
  );
}
