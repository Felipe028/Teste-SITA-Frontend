<template>
    <div>
        <vs-table class="shadow p-3 mb-5 bg-body rounded w-100 minw">
            <template #thead>
                <vs-tr>
                    <vs-th>Title</vs-th>
                    <vs-th>Genres</vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr
                    :key="i"
                    v-for="(tr, i) in $vs.getPage(list, page, max)"
                    :data="tr"
                >
                    <vs-td class="w-50">{{ tr.title }}</vs-td>
                    <vs-td class="w-50">{{ tr.genres }}</vs-td>
                </vs-tr>
            </template>
            <template #footer>
            <vs-pagination v-model="page" :length="$vs.getLength(list, max)" />
            </template>
        </vs-table>
    </div>
</template>

<script>
export default {
    name: 'table-search-movie',
    props: {
        list:{
            type: Object,
            required: true,
            default: null
        }
    },
    components:{},
    mixins:[],
    directives:{},
    data(){
        return {
            page: 1,
            max: 10,
        }
    },
    computed:{},
    filters:{},
    beforeCreate(){},
    created(){},
    beforeMount(){},
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
    methods:{},
    watch:{}
}
</script>

<style scoped>
.minw{
    min-width:800px;
}
</style>
