import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)

export default { getAll, create, deletePerson, update }