import axios from 'axios';
import { Platform } from 'react-native';

const server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const API = {

};

export default API;