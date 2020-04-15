import axios from "axios"
import jwtDecode from "jwt-decode"
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://device-police-backend.herokuapp.com"
    : "http://localhost:3000"

function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    localStorage.jwt = token
  } else {
    delete axios.defaults.headers.common["Authorization"]
    localStorage.removeItem("jwt")
  }
}

async function register(info) {
  const { data } = await axios.post(`${API_URL}/auth/signup`, info)
  return data
}

async function resendVerificationCode(phone) {
  const { data } = await axios.post(`${API_URL}/auth/resendverificationcode`, {
    phone,
  })
  return data
}

async function confirmPhone(code) {
  const { data } = await axios.post(`${API_URL}/auth/confirm`, { code })
  return data
}

async function signin(info) {
  const { data } = await axios.post(`${API_URL}/auth/signin`, info)
  setTokenHeader(data.jwt)
  return data
}

async function setTimer(info) {
  if (!localStorage.jwt) {
    if (typeof document !== "undefined") {
      document.location.href = "/"
    }
  }
  const { userId } = jwtDecode(localStorage.jwt)
  setTokenHeader(localStorage.jwt)
  const { data } = await axios.post(`${API_URL}/timer/${userId}`, info)
  return data
}

async function resetTimer() {
  if (!localStorage.jwt) {
    if (typeof document !== "undefined") {
      document.location.href = "/"
    }
  }
  const { userId } = jwtDecode(localStorage.jwt)
  setTokenHeader(localStorage.jwt)
  const { data } = await axios.post(`${API_URL}/timer/${userId}/reset`)
  return data
}

async function deleteUser(password) {
  if (!localStorage.jwt) {
    if (typeof document !== "undefined") {
      document.location.href = "/"
    }
  }
  const { userId } = jwtDecode(localStorage.jwt)
  setTokenHeader(localStorage.jwt)
  const { data } = await axios.delete(`${API_URL}/user/${userId}/delete`, {
    params: { password },
  })
  return data
}

export default {
  setTokenHeader,
  register,
  resendVerificationCode,
  confirmPhone,
  signin,
  setTimer,
  resetTimer,
  deleteUser,
}
