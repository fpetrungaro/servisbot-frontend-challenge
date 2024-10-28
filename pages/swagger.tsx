// pages/swagger.tsx
import dynamic from 'next/dynamic';
import { FC } from 'react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const SwaggerPage: FC = () => {
  return <SwaggerUI url="/api/api-docs" />;
};

export default SwaggerPage;
