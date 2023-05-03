import Head from 'next/head';

import SidebarLayout from 'src/layouts/SidebarLayout';

import PageHeader from 'src/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from 'src/content/Dashboards/Crypto/AccountBalance';
import Wallets from 'src/content/Dashboards/Crypto/Wallets';
import AccountSecurity from 'src/content/Dashboards/Crypto/AccountSecurity';
import WatchList from 'src/content/Dashboards/Crypto/WatchList';

import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function DashboardCrypto() {

  /*const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (!session) {
        router.push('/login');
      }
    };

    checkSession();
  }, []);*/

  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user: session.user },
  }
}


export default DashboardCrypto;
