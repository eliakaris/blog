import 'raf/polyfill';
import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'core-js/es6/map';
import 'core-js/es6/set';

configure({ adapter: new ReactSixteenAdapter() });
