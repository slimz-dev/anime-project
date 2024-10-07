import MyApp from './MyApp';
import AuthProvider from './context/AuthProvider/AuthProvider';
import ToastManager from 'toastify-react-native';
export default function App() {
	return (
		<AuthProvider>
			<MyApp />
			<ToastManager
				animationIn="fadeInDown"
				animationOut="bounceOutRight"
				// showProgressBar={false}
				animationInTiming={300}
				animationOutTiming={500}
				duration={2000}
				showCloseIcon={false}
				style={{
					backgroundColor: 'black',
				}}
				textStyle={{
					color: 'orange',
					fontSize: 12,
				}}
			/>
		</AuthProvider>
	);
}
