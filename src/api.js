
import axios from "axios"

const api_url = "http://127.0.0.1:7000/api/"
export const getContacts = async () => {
    try {
      const response = await axios({
        url: `${api_url}contact-list/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.statusText !== "OK") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};
export const createContact = async (contact) => {
    try {
      const response = await axios({
        url: `${api_url}create/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: contact
      });
      if (response.statusText !== "OK") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};
export const deleteContactById = async (id) => {
    try {
      const response = await axios({
        url: `${api_url}delete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.statusText !== "OK") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
}

export const updateContactById = async (contact) => {
    try {
      const response = await axios({
        url: `${api_url}update/${contact.id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: contact
      });
      if (response.statusText !== "OK") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
}