import Sidebar from '../../components/Sidebar';
import { sx } from '../../lib/style';

export default function AppLayout({ children }) {
  return (
    <div style={sx('display:flex; min-height:100vh; font-family: Helvetica, Arial, sans-serif; color: oklch(22% 0.015 90);')}>
      <Sidebar />
      <div style={sx('flex:1; padding:40px 56px; max-width:1180px;')}>{children}</div>
    </div>
  );
}
