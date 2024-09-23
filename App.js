import MyApp from './MyApp';
import AuthProvider from './context/AuthProvider/AuthProvider';
export default function App() {
	return (
		<AuthProvider>
			<MyApp />
		</AuthProvider>
	);
}
