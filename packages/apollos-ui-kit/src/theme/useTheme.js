import { useContext } from 'react';
import { Context } from './ThemeContext';

const useTheme = () => useContext(Context);

export default useTheme;
