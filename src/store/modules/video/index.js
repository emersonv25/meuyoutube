import axios from 'axios'
const api = require('@/api.json');
const uri = api.url;
export default {
    actions: 
    {
        upload({ commit }, payload) 
        {
            return new Promise((resolve, reject) => {
              axios({url: uri+'video/upload', 
              params: {descricao: payload.descricao, titulo: payload.titulo}, 
              data: payload.file,
              headers: {'Content-Type': 'multipart/form-data'}, 
              method: 'POST' })
                .then(resp => {
                    commit('success_msg', 'Sucesso !')
                    resolve(resp)
                })
                .catch(err => {
                  commit('error_msg', 'Falha ao salvar video')
                  reject(err)
                })
            })
        },
        getVideos({commit})
        {
            return new Promise((resolve, reject) => {
                axios({url: uri+'video/listaAleatoria', 
                method: 'GET' })
                  .then(resp => {
                      commit('set_videos', resp.data)
                      resolve(resp.data)
                  })
                  .catch(err => {
                    commit('error_msg', 'Falha ao carregar videos do servidor')
                    reject(err)
                  })
              })
        },
        play({commit}, id)
        {
            return new Promise((resolve, reject) => {
                axios({url: uri+'/video/player/?id=' + id, 
                method: 'GET' })
                  .then(resp => {
                      commit('set_video_play', resp.data)
                      resolve(resp.data)
                  })
                  .catch(err => {
                    commit('error_msg', 'Vídeo não encontrado')
                    reject(err)
                  })
              })
        },
        getVideoUser({commit}, id)
        {
            return new Promise((resolve, reject) => {
                axios({url: uri+'/canal/?id=' + id, 
                method: 'GET' })
                  .then(resp => {
                        commit('set_videos', resp.data)
                        resolve(resp.data)
                  })
                  .catch(err => {
                    commit('error_msg', 'Falha ao carregar videos do servidor')
                    reject(err)
                  })
              })
        }
    },
    state: {
        videos: [],
        video_play: []
    },
    mutations: {
        set_videos(state, videos){
            state.videos = videos
        },
        set_video_play(state, video){
            state.video_play = video
        },
    },
    getters: {
        videos: state => state.videos,
        video_play: state => state.video_play,
    },
}