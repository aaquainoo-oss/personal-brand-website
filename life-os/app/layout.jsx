import './globals.css';
import { LifeOSStateProvider } from '../context/LifeOSStateContext';
import { AccountProvider } from '../context/AccountContext';

export const metadata = {
  title: 'Life OS — Growth Intelligence Platform',
  description: 'A single, evolving Life Operating System profile synthesized from 15 assessments and the 12 Dimensions of Life.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AccountProvider>
          <LifeOSStateProvider>{children}</LifeOSStateProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
