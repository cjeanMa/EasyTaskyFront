
import AuthState from './context/auth/AuthState';
import SuperRouter from './routers/SuperRouter';

function App() {
  return (
    <AuthState>
      <SuperRouter></SuperRouter>
    </AuthState>
  );
}

export default App;
