const API_BASE_DEV = "https://localhost:7090";
const API_BASE_PROD = "https://aspnetserver20220524191606.azurewebsites.net";

const ENDPOINTS = {
    GET_ALL_POSTS: 'get-all-posts',
    GET_POST_BY_ID: 'get-post-by-id',
    CREATE_POST: 'create-post',
    UPDATE_POST:'update-post',
    DELETE_POST_BY_ID: 'delete-post-by-id'
};

const development = {
    API_URL_GET_ALL_POSTS: `${API_BASE_DEV}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_BASE_DEV}/${ENDPOINTS.GET_POST_BY_ID}`,
    API_URL_CREATE_POST: `${API_BASE_DEV}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_BASE_DEV}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POST_BY_ID: `${API_BASE_DEV}/${ENDPOINTS.DELETE_POST_BY_ID}`,
}

const production = {
    API_URL_GET_ALL_POSTS: `${API_BASE_PROD}/${ENDPOINTS.GET_ALL_POSTS}`,
    API_URL_GET_POST_BY_ID: `${API_BASE_PROD}/${ENDPOINTS.GET_POST_BY_ID}`,
    API_URL_CREATE_POST: `${API_BASE_PROD}/${ENDPOINTS.CREATE_POST}`,
    API_URL_UPDATE_POST: `${API_BASE_PROD}/${ENDPOINTS.UPDATE_POST}`,
    API_URL_DELETE_POST_BY_ID: `${API_BASE_PROD}/${ENDPOINTS.DELETE_POST_BY_ID}`,
}

const Constatns = process.env.NODE_ENV === 'development' ? development : production;

export default Constatns;