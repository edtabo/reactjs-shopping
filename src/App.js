
import Menu from './components/Menu';
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="container mx-auto px-4">
      <Menu/>      
      <Outlet />
    </div>
  );
}

export default App;
