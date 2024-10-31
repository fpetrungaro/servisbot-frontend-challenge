//Wraps the App with Redux
import { AppProps } from 'next/app';
import { wrapper } from '@/store'; // Import wrapper from the store

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

// Export the app wrapped in the Redux wrapper
export default wrapper.withRedux(MyApp);
