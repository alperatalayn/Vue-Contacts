
import axios from "axios";

const api_url = "http://127.0.0.1:7000/api/"

export const axiosInstance = axios.create({
	baseURL: api_url,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? `Bearer ${localStorage.getItem('access_token')}`
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

axiosInstance.interceptors.response.use(
  (response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'Cannot access the server'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === api_url + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');
			if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))
				const now = Math.ceil(Date.now() / 1000);
				if (tokenParts.exp > now) {
					return axiosInstance
						.post('token/refresh/', { refresh: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
              axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
              originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}
		return Promise.reject(error);
	}
);


export const getContacts = async () => {
    try {
      const response = axiosInstance
      .get("contact-list/")
      .then((res)=>{
      if (res.statusText !== "OK") {
        throw new Error(res.data.message);
      }
      return res.data;
      })
      return response
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};
export const createContact = async (contact) => {
    try {
      const response = axiosInstance
      .post("create/",contact)
      .then((res)=>{
        if(res.statusText !== "OK")
        {

          throw new Error(res.data)
        }
        else
          return res.data;
      })
      return response
    } catch (err) {
      console.log(err)
    }
};
export const register = async (user) => {
  try {
    const response = axiosInstance
    .post("register/",user)
    .then((res)=>{
      if (res.statusText !== "OK") {
        throw new Error(res.data.message);
      }
      return res.data;
    })
    return response
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const login = async (user) => {
  try {
    const response = axiosInstance
    .post("token/",user)
    .then((res)=>{
      if (res.statusText !== "OK") {
        throw new Error(res.data.message);
      }

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      return res.data;
    })
    return response
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const deleteContactById = async (id) => {
    try {
      const response = axiosInstance
      .delete(`delete/${id}`)
      .then((res)=>{
        if (res.statusText !== "OK") {
          throw new Error(res.data.message);
        }
        return res.data;
      })
      return response;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
}
export const updateContactById = async (contact) => {
    try {
      const response = axiosInstance.post(`update/${contact.id}`,contact)
      .then((res)=>{
        if (res.statusText !== "OK") {
          throw new Error(res.data.message);
        }
        return res.data;
      })
      console.log(response)
      return response
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
}
export const getUserId=()=>{
  const token = localStorage.getItem("access_token")
  const tokenParts = JSON.parse(atob(token.split('.')[1]))
  return tokenParts.user_id;
}
export const getReport = async () => {
    axiosInstance
    .get("pdf-report/",{
      responseType: 'arraybuffer',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
      }
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
})
.catch((error) => console.log(error));
}