<template>
  <div>
    <q-card>
        <q-card-section class="text-h4">
          Expedientes>{{filtro.anio}}>{{filtro.mes.mes}}
        </q-card-section>
        <q-card-section>
          <q-grid
            :data="data"
            :columns="columns"
            :columns_filter="true"
          >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nombreProd">
                {{ props.row.nombreProd }}
              </q-td>
              <q-td key="nombreProd">
                {{ props.row.tel }}
              </q-td>
              <q-td key="curp">
                {{ props.row.curp }}
              </q-td>
              <q-td key="documento">
                {{ props.row.documento }}
              </q-td>
               <q-td key="municipio">
                {{ props.row.municipio }}
              </q-td>
              <q-td key="actions">
                <q-btn-dropdown
                  split
                  class="glossy"
                  color="primary"
                  label="Ver"
                  :to="'/expediente/'+props.row.id"
                >
                  <q-list>
                    <q-item clickable v-close-popup @click="onPDFDownloadClicked">
                      <q-item-section>
                        <q-item-label>Descargar</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              </q-td>

            </q-tr>
          </template>
        </q-grid>

        </q-card-section>
      </q-card>
    <q-dialog v-model="openFiltro">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Filtro</div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-select class="q-pb-lg" filled v-model="filtro.anio" :options="anios" option-value="year" emit-value map-options option-label="year" label="Año" />
          <q-select
            filled
            v-model="filtro.mes"
            :options="meses"
            label="Mes"
            option-label="mes"
            class="q-pb-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="fecthData" flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        vertical-actions-align="right"
        icon="add"
        direction="up"
        color="primary"
      >
        <q-fab-action @click="openFiltro=true" label="Filtrar" color="primary" icon="filter_alt" />
        <q-fab-action @click="fecthData" label="Actualizar" color="primary" icon="refresh" />
        <q-fab-action @click="onDonwloadYearBtnClicked" label="Descargar año" color="primary" icon="arrow_circle_down" />
        <q-fab-action @click="onDonwloadMesBtnClicked" label="Descargar mes" color="primary" icon="arrow_circle_down"
          :disable="data.length<1"
        />
      </q-fab>
    </q-page-sticky>

  </div>

</template>
<script>
import expedientes from 'src/api/expedientes'
import {defineComponent,onMounted,reactive,ref} from 'vue'
import { date } from 'quasar'

const columns = [
  {
    name: 'nombreProd',
    required: true,
    label: 'Nombre del productor',
    align: 'left',
    field: 'nombreProd',
    sortable: true
  },
  {name: 'telefono', align: 'center', label: 'Telefono', field: 'tel', sortable: true},
  {name: 'curp', align: 'center', label: 'Curp', field: 'curp', sortable: true},
  {name: 'documento', align: 'center', label: 'Documento', field: 'documento', sortable: true, filter_type: 'select'},
  {name: 'municipio', align: 'center', label: 'Municipio', field: 'municipio', sortable: true, filter_type: 'select'},
  {name: 'actions', align: 'center', label: 'Acciones', field: 'id', sortable: true, filter_type: null},
]



export default defineComponent({
  setup() {
    onMounted(() => {
      fecthData()
      getAnios()
      const timeStamp = Date.now()
      let mesNumero = date.formatDate(timeStamp, 'M')
      let mesNombre = date.formatDate(timeStamp, 'MMMM')
      filtro.anio = date.formatDate(timeStamp, 'YYYY')
      filtro.mes.id = mesNumero
      filtro.mes.mes = mesNombre
    })
    const selected = reactive([])
    let openFiltro =ref(false)
    let anios = reactive([2021,2007])
    let filtro = reactive({
      mes:{id:4,mes:'Abril'},
      anio: 2021
    })
    const meses = reactive([
      {mes:'Enero',id:1},
      {mes:'Febrero',id:2},
      {mes:'Marzo',id:3},
      {mes:'Abril',id:4},
      {mes:'Mayo',id:5},
      {mes:'Junio',id:6},
      {mes:'Julio',id:7},
      {mes:'Agosto',id:8},
      {mes:'Septiembre',id:9},
      {mes:'Octubre',id:10},
      {mes:'Nobiembre',id:11},
      {mes:'Diciembre',id:12},
    ])
    let data = reactive([])
    function fecthData () {
      data.length = 0
      expedientes.get(filtro).then((response)=>{
        Object.assign(data,response.data.data)
      })
    }
    function onPDFDownloadClicked (id) {

    }
    function onDonwloadYearBtnClicked(){
      expedientes.downloadByYear(filtro.anio)
    }
    function onDonwloadMesBtnClicked(){
      expedientes.downloadByMes(filtro.anio,filtro.mes.mes)
    }
    function getAnios () {
      anios.length = 0
      expedientes.getAnios().then((response)=>{
        Object.assign(anios,response.data)
      })
    }
    return {
      onDonwloadMesBtnClicked,
      onDonwloadYearBtnClicked,
      getAnios,
      selected,
      fecthData,
      openFiltro,
      onPDFDownloadClicked,
      anios,
      filtro,
      meses,
      columns,
      data
    }
  }
})
</script>
