export const HOST = import.meta.env.VITE_SERVER_URL;
export const Authroutes = "api/auth/";
export const signup_route = Authroutes+'signup';
export const login_route =Authroutes+'login';
export const  GET_USER_INFO = Authroutes+'userinfo';
export const UPDATE_PROFILE_ROUTE = Authroutes+'updateProfile';
export const ADD_PROFILE_IMAGE_ROUTE = Authroutes+'addprofileimage';
export const REMOVE_PROFILE_IMAGES_ROUTE = Authroutes+'remove-profile-image';
export const LOGOUT_ROUTE = Authroutes+'logout';






export const CONTACTS_ROUTE = "api/contacts/";
export const SEARCH_CONTACTS_ROUTH = CONTACTS_ROUTE+'search';
export const MESSAGE_ROUTES = "api/messages/";
export const GET_ALL_MESSAGE_ROUTE= MESSAGE_ROUTES+'get-messages';
export const GET_DM_CONTACTS_ROUTES = CONTACTS_ROUTE+'get-contacts-for-dm';
    
    
    