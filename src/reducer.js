import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import popup from './reducers/popup';
import PreInspection from './reducers/PreInspection';
import MyAccount from './reducers/MyAccount';
import loginCustomer from './reducers/loginCustomer';
import AddFamilyMember from './reducers/AddFamilyMember';
import AddVehicleDetail from './reducers/AddVehicleDetail';
import language from './reducers/language';
import drawer from './reducers/drawer';
import profile from './reducers/profile';
import settings from './reducers/settings';

// Health
import inputFormHealth from './reducers/inputFormHealth';
import GroupHealthTabs from './reducers/GroupHealthTabs';
import proposalFormHealth from './reducers/proposalFormHealth'
import premium from './reducers/Premium'
import currentPlan from './reducers/CurrentPlan'
import selfSpouseFGAValidation from './reducers/SelfSpouseFGValidation'
import MaritalStatusCodes from './reducers/MaritalStatusCodes'



import proposal_form_motor from './reducers/proposal_form_motor'
import { routerReducer } from 'react-router-redux';
import {reducer as burgerMenu} from 'redux-burger-menu';


export default combineReducers({
  auth,
  common,
  home,
  popup,
  PreInspection,
  language,
  profile,
  settings,
  drawer,
  burgerMenu,
  proposal_form_motor,
  MyAccount,
  GroupHealthTabs,
  loginCustomer,
  AddFamilyMember,
  AddVehicleDetail,
  inputFormHealth,
  proposalFormHealth,
  premium,
  currentPlan,
  selfSpouseFGAValidation,
  MaritalStatusCodes,
  router: routerReducer
});
