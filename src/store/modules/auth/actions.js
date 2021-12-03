import axios from 'axios'
const api = require('@/api.json');
const uri = api.url;

export default{
    login({commit}, payload){
        commit("loading", true)
        return new Promise((resolve, reject) => {
          axios({url: uri+'usuario/logar', data: {nome: payload.username, senha: payload.senha} , method: 'POST' })
          .then(resp => {
            const token = resp.headers.authorization
            const usuario = resp.data.usuario
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(usuario))
            axios.defaults.headers.common['authorization'] = token
            commit('auth_success', {token, usuario})
            commit("loading", false)
            resolve(resp)
                      
          })
          .catch(err => {
            commit('error_msg', err.response.data.error.message)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            reject(err)
          })
        })
    },
    logout({commit}){
      delete axios.defaults.headers.common['authorization']
      commit('logout')
    },
    register({commit}, payload){
      commit("loading", true)
      return new Promise((resolve, reject) =>{
        axios({url: uri + 'usuario/cadastrar', data: {nome: payload.username, senha: payload.senha,}, method: "POST"})
        .then(resp => {
          commit("success_msg", "Cadastro realizado com successo !")
          resolve(resp)
        }).catch(err => {
          commit('error_msg', err.response.data.error.message)
          reject(err)
        })
      })
    },
}