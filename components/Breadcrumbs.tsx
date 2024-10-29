import Link from 'next/link';
import { Breadcrumbs, Typography } from '@mui/material';

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ mb: 2 }}>
      {items.map((item, index) => (
        index === items.length - 1 ? (
          <Typography color="text.primary" key={item.label}>
            {item.label}
          </Typography>
        ) : (
          <Link href={item.href} key={item.label} passHref style={{ textDecoration: 'none', color: '#1976d2' }}>
            {item.label}
          </Link>
        )
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
