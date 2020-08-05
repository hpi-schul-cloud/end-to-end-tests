'use strict';
const { SERVER } = require("../../shared-objects/servers");
const axios = require("axios");

const errHandler = err => {
    // console.error(err)
    if (err.response && err.response.data) {
        // console.error('API response', err.response.data)
        throw err.response.data
    }
    throw err
}


class Api {
    service(jwt) {
        return axios.create({
            baseURL: SERVER.URL,
            timeout: 15000,
            headers: { Authorization: jwt },
            withCredentials: true,
        })
    }
    getStudentsAsAdmin(jwt) {
        return this.service(jwt)
            .get("/users/admin/students")
            .then(res => res.data)
            .catch(errHandler)
    }
    getStudent(jwt, id) {
        return this.service(jwt)
            .get(`/users/${id}`)
            .then(res => res)
            .catch(errHandler)
    }
    createStudent(jwt, body) {
        return this.service(jwt)
            .post(`/users/`, body)
            .then(res => res)
            .catch(errHandler)
    }
    replaceStudent(jwt, id, body) {
        return this.service(jwt)
            .put(`/users/${id}`, body)
            .then(res => res)
            .catch(errHandler)
    }
    editStudent(jwt, id, body) {
        return this.service(jwt)
            .patch(`/users/${id}`, body)
            .then(res => res)
            .catch(errHandler)
    }
    deleteStudent(jwt, id, body) {
        return this.service(jwt)
            .delete(`/users/${id}`, body)
            .then(res => res)
            .catch(errHandler)
    }
}


module.exports = { Api: new Api }