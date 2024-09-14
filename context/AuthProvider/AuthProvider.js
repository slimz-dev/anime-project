import { createContext } from 'react';

export const AuthContext = createContext();
export default AuthProvider = ({ value, children }) => {
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
