<template>
    <div class="d-flex justify-content-center w-100 h100">
        <div v-if="listEmpty" class="d-flex align-items-center h100 ">
            <div class=" d-flex flex-column">
                <div v-show="isLoading" class="alert alert-warning" role="alert">
                    A moment, we are feeding the database!
                </div>
                <vs-card @click="dataBase()">
                    <template #title >
                    <h3 class="d-flex justify-content-center">No Data</h3>
                    <div class="d-flex justify-content-center" style="margin: 20px 0px 20px 0px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-pie-chart" viewBox="0 0 16 16">
                            <path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0V7.5h6.482A7.001 7.001 0 0 0 8.5 1.018zM14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                        </svg>
                    </div>
                    </template>
                    
                    <template #text>
                    <p class="d-flex justify-content-center">
                        Click here to feed the database
                    </p>
                    </template>
                </vs-card>
            </div>
            
        </div>
        <div v-else class="d-flex flex-column align-items-center w-75 h100">
            <div class="d-flex justify-content-end w-100 filters">
                <vs-input v-if="filter == 2" type="search" v-model="name" placeholder="Name"/>
                <div v-else-if="filter == 3" class="d-flex flex-row">
                    <vs-input type="number" v-model="year" placeholder="Year"/>
                    <vs-input type="search" v-model="gender" placeholder="Gender" class="selectFilter"/>  
                </div>
                <vs-input v-else-if="filter == 4" type="number" v-model="classification" placeholder="Classification"/>

                <vs-button :loading="loading" @click="functionSearch()" v-if="filter == 2 || filter == 3 || filter == 4">
                    Search
                </vs-button>

                <vs-button v-show="!showFilter" @click="showFilter =! showFilter" icon relief animation-type="rotate">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                    </svg>
                    <template #animate >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                        </svg>
                    </template>
                </vs-button>

                <vs-select v-show="showFilter" label-placeholder="Filters" v-model="filter" class="selectFilter">
                    <vs-option label="All" value="1">All</vs-option>
                    <vs-option label="film's name" value="2">Film's name</vs-option>
                    <vs-option label="Year and Gender" value="3">Year and Gender</vs-option>
                    <vs-option label="Classification" value="4">Classification</vs-option>
                    <vs-option label="Popularity" value="5">Popularity</vs-option>
                </vs-select>

            </div>

            <table-search-movie :list="list" v-if="filter == 1 || filter == 2 || filter == 3"/>
        </div>

        <div class="vld-parent">
          <loading
            :active.sync="isLoading"
            :can-cancel="false"
            loader='bars'
            color='#4d40f7'
            :is-full-page="true"
            width= '150'
            height= '70'>
          </loading>
        </div>

    </div>
</template>

<script>
import TableSearchMovie from '../components/tables/TableSearchMovie.vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'Home',
    props: {},
    components:{
        Loading,
        TableSearchMovie
    },
    mixins:[],
    directives:{},
    data(){
        return {
            filter: 1,
            showFilter: false,
            name: "", 
            year: "",
            gender: "",
            classification: "",
            page: 1,
            max: 10,
            loading: false,
            isLoading: false,
            list: [],
            listEmpty: false,
        }
    },
    computed:{},
    filters:{},
    beforeCreate(){},
    created(){},
    beforeMount(){},
    mounted(){
        this.filterTitle()
    },
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
    methods:{
        functionSearch(){
            if(this.filter == 2){
                this.filterTitle()
            }else if(this.filter == 3){
                this.filterYearGender()
            }
        },


        dataBase(){
            let ths = this
            this.isLoading = true
            this.axios.get('/database')
            .then((response) => {
                console.log(response)
                setTimeout(() => {
                    ths.filterTitle()
                    ths.loading = false
                    ths.isLoading = false
                },100000)
            }).catch((err) => {
                console.log(err)
                ths.loading = false
                ths.isLoading = false
            })
        },


        filterTitle(){
            let ths = this
            if(this.filter == 1)
                this.isLoading = true
            else
                this.loading = true

            let form = {
                "title": this.name
            }
            this.axios.post('/movies/titulo', form)
            .then((response) => {
                // console.log(response.data)
                if(response.data.length == 0)
                    ths.listEmpty = true
                else
                    ths.listEmpty = false

                ths.list = response.data
                ths.loading = false
                ths.isLoading = false
            }).catch((err) => {
                console.log(err)
                ths.loading = false
                ths.isLoading = false
            })
        },


        filterYearGender(){
            let ths = this
            if(this.filter == 1)
                this.isLoading = true
            else
                this.loading = true

            let form = {
                "year": this.year,
                "genre": this.gender
            }
            this.axios.post('/movies/yeargender', form)
            .then((response) => {
                // console.log(response.data)
                ths.list = response.data
                ths.loading = false
                ths.isLoading = false
            }).catch((err) => {
                console.log(err)
                ths.loading = false
                ths.isLoading = false
            })
        }
    },
    watch:{
        filter(){
            this.showFilter = false
            if(this.filter == 1){
                this.name = ""
                this.filterTitle()
            }
        }
    }
}
</script>

<style scoped>
.h100{
    height: 100vh;
}

.filters{
    padding: 20px 0px 5px 10px;
}

.selectFilter{
    margin-left: 5px;;
}
</style>
