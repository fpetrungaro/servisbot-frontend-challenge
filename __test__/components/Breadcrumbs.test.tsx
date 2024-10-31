import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../../components/Breadcrumbs';

describe('Breadcrumb Component', () => {
  const items  = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  it('renders breadcrumb items correctly', () => {

    render(<Breadcrumb items={items} />);

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const contactText = screen.getByText('Contact');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactText).toBeInTheDocument();
  });

  it('renders Breadcrumbs correctly', () => {
    const {asFragment} = render(<Breadcrumb items={items} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
