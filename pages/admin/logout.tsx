import Loader from '@components/ui/loader/loader';
import logout from '@utils/logout';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function SignOut() {
  const { t } = useTranslation();
  const router = useRouter();

  
  useEffect(() => {
    logout(router);
  }, []);
  
  return <Loader text={t('common:signing-out-text')} />;
}

export default SignOut;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
