'use strict';

const { Api } = require("../runtime/helpers/axiosHelper.js");
const { expect } = require('chai');

async function getJwt() {
    let cookie;
    try {
        cookie = await driver.getCookies(['jwt']);
    } catch (e) {
        console.error('error: ', e)
        return
    }
    const jwt = cookie[0].value;
    return jwt
}

async function getStudentsFromSameSchoolAndVerify() {
    // fake user data can be found in schul-cloud-server repo
    // 'backup/setup/users.json'
    const studentsFromSameSchool = ["Marla", "Waldemar"]

    const jwt = await getJwt()
    const allStudents = await Api.getStudentsAsAdmin(jwt)

    expect(allStudents.data.length).to.not.be.equal(0)
    allStudents.data.forEach(student => {
        expect(studentsFromSameSchool).to.include(student.firstName)
    })

    const randomStudent = allStudents.data[Math.floor(Math.random() * allStudents.data.length)]
    const singleStudent = await Api.getStudentAsAdmin(jwt, randomStudent._id)
    expect(singleStudent.status).to.equal(200)
    expect(singleStudent.data.firstName).to.equal(randomStudent.firstName)
}

async function requestForeignStudent(){
    const jwt = await getJwt()
    const foreignStudentId = "59ae89b71f513506904e1cc9"

    const user = await Api.getStudentAsAdmin(jwt, foreignStudentId)
    expect(user.data).to.deep.equal({})
}

async function requestForeignStudentAndVerify() {
    // fake user data can be found in schul-cloud-server repo
    // 'backup/setup/users.json'

    const adminSchoolId = "5f2987e020834114b8efd6f8"
    const jwt = await getJwt()
    const foreignStudentId = "59ae89b71f513506904e1cc9"

    // (GET) should fail to get student from foreign school 
    const user2 = await Api.getStudentAsAdmin(jwt, foreignStudentId)
    expect(user2.data).to.deep.equal({})

    const newFakeUser = {
        schoolId: '5f2987e020834114b8efd6f8',
        roles: ['student'],
        firstName: 'Jarle',
        lastName: 'Moe',
        email: 'jarle@moe.com',
        birthday: '',
    }

    // (POST) should succeed to create a new user to same school as admin
    let newUser;
    try {
        newUser = await Api.createStudent(jwt, newFakeUser)
    }
    catch (err) {
        console.error('Error: ', err)
    }

    expect(newUser.data.schoolId).to.be.equal(adminSchoolId)

    // (PUT) should fail to replace a students information from foreign school
    try {
        await Api.replaceStudent(jwt, foreignStudentId, {})
    }
    catch (err) {
        expect(err.name).to.be.equal("MethodNotAllowed")
        expect(err.code).to.be.equal(405)
        expect(err.message).to.be.equal("Provider \'rest\' can not call \'update\'. (disallow)")
    }

    // (PATCH) should fail to replace specified student information from foreign school
    try {
        await Api.editStudent(jwt, foreignStudentId, {})
    }
    catch (err) {
        expect(err.name).to.be.equal("NotFound")
        expect(err.code).to.be.equal(404)
        expect(err.message).to.be.equal(`no record found for id '${foreignStudentId}'`)
    }

    // (DELETE) should fail to delete a student from foreign school
    try {
        await Api.deleteStudent(jwt, foreignStudentId, {})
    }
    catch (err) {
        expect(err.name).to.be.equal("NotFound")
        expect(err.code).to.be.equal(404)
        expect(err.message).to.be.equal(`no record found for id '${foreignStudentId}'`)
    }
}

module.exports = {
    getStudentsFromSameSchoolAndVerify,
    requestForeignStudent,
    requestForeignStudentAndVerify,
}


