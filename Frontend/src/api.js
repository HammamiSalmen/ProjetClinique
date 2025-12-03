const API_URL = "http://localhost/Clinique/Backend";

export default API_URL;



// // src/services/api.js
// const BASE = "http://localhost/Clinique/Backend/controllers";

// function checkResponse(res){
//   return res.json();
// }

// // AUTH
// export function loginApi(username, password){
//   return fetch(`${BASE}/AuthController.php?action=login`, {
//     method: "POST",
//     credentials: 'include', // important: envoie et reçoit cookies
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password })
//   }).then(checkResponse);
// }

// export function logoutApi(){
//   return fetch(`${BASE}/AuthController.php?action=logout`, {
//     method: "GET",
//     credentials: 'include'
//   }).then(checkResponse);
// }

// export function checkSession(){
//   return fetch(`${BASE}/AuthController.php?action=check`, {
//     method: "GET",
//     credentials: 'include'
//   }).then(checkResponse);
// }

// // USERS
// export function fetchUsers(){
//   return fetch(`${BASE}/UserController.php`, {
//     method: "GET",
//     credentials: 'include'
//   }).then(checkResponse);
// }
// export function addUser(payload){
//   return fetch(`${BASE}/UserController.php`, {
//     method: "POST",
//     credentials: 'include',
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify(payload)
//   }).then(checkResponse);
// }
// export function deleteUser(id){
//   return fetch(`${BASE}/UserController.php?id=${id}`, {
//     method: "DELETE",
//     credentials: 'include'
//   }).then(checkResponse);
// }

// // SERVICES
// export function fetchServices(){
//   return fetch(`${BASE}/ServiceController.php`, {
//     method: "GET",
//     credentials: 'include'
//   }).then(checkResponse);
// }
// export function addService(payload){
//   return fetch(`${BASE}/ServiceController.php`, {
//     method: "POST",
//     credentials: 'include',
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify(payload)
//   }).then(checkResponse);
// }
// export function updateService(id, payload){
//   return fetch(`${BASE}/ServiceController.php?id=${id}`, {
//     method: "PUT",
//     credentials: 'include',
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify(payload)
//   }).then(checkResponse);
// }
// export function deleteService(id){
//   return fetch(`${BASE}/ServiceController.php?id=${id}`, {
//     method: "DELETE",
//     credentials: 'include'
//   }).then(checkResponse);
// }
