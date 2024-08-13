import axios from 'axios'

const url = "http://localhost:3001/persons"

const getPersons = () => {
    return axios
      .get(url)
      .then(response => response.data)
}

const postPerson = (person) => {
    return axios
        .post(url, person)
        .then(response => response.data)
}

const deletePerson = (personId) => {
    return axios 
        .delete(`${url}/${personId}`)
        .then(response => response.data)
}

const updatePerson = (personId, newNumber) => {
    return axios 
        .patch(`${url}/${personId}`, {number: newNumber})
        .then(response => response.data)
}

export default { getPersons, postPerson, deletePerson, updatePerson }