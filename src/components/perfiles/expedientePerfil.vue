<template>
  
        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="info" label="Informacion" />
                <q-tab name="docs" label="Documentacion" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="info">
                  <div v-if="!toEdit">
                    <div class="text-h6">Expediente {{ expediente.id }}</div>
                    <div class="text-h6"> {{ expediente.fechaSolicitud }}</div>

                    <div class="row q-col-gutter-x-md">
                      <div class="col">
                        <q-input
                          filled
                          v-model="expediente.nombreProd"
                          label="Nombre del productor *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                          readonly
                        />
                      </div>
                      <div class="col">
                        <q-input
                          readonly
                          filled
                          v-model="expediente.ine"
                          label="Ine *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-x-md">
                      <div class="col">
                        <q-input
                          readonly
                          filled
                          v-model="expediente.curp"
                          label="Curp *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                        readonly
                          filled
                          v-model="expediente.documento"
                          label="Documento *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                    <q-input
                      readonly
                      filled
                      v-model="expediente.domicilio"
                      label="Domicilio *"
                      autogrow
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />

                    <q-input
                      readonly
                      filled
                      v-model="expediente.beneficiario"
                      label="Beneficiario *"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <q-input
                      readonly
                      filled
                      v-model="expediente.cClabe"
                      label="Cuenta con CLABE *"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <div class="row q-col-gutter-x-md">
                      <div class="col">
                        <q-input
                          readonly
                          filled
                          v-model="expediente.ciclo"
                          label="Ciclo *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                      <div class="row q-col-gutter-x-md">
                        <div class="col-6">
                          <q-input
                            readonly
                            filled
                            v-model="expediente.municipio"
                            label="Municipio *"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'campo requerido']"
                          />
                        </div>
                        <div class="col-6">
                          <q-input
                            readonly
                            filled
                            v-model="expediente.cader"
                            label="Cader *"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'campo requerido']"
                          />
                        </div>
                      </div>
                      <div class="row q-gutter-md">
                        <div class="col">
                          <q-input
                            readonly
                            filled
                            v-model="expediente.total"
                            type="number"
                            :label="'No. de '+ expediente.tipo +'*'"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'campo requerido']"
                          />
                        </div>
                      </div>
                    <div class="row q-col-gutter-x-md">
                      <div class="col-6">
                        <q-input
                          readonly
                          filled
                          v-model="expediente.tel"
                          label="Telefono *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-h6"> Editar expediente {{ expediente.id }}</div>
                    <div class="text-h6"> {{ expediente.fechaSolicitud }}</div>

                    <div class="row q-col-gutter-x-md">
                      <div class="col">
                        <q-input
                          filled
                          v-model="editedExpediente.nombreProd"
                          label="Nombre del productor *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="editedExpediente.ine"
                          label="Ine *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-x-md">
                      <div class="col">
                        <q-input
                          filled
                          v-model="editedExpediente.curp"
                          label="Curp *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="editedExpediente.documento"
                          label="Documento *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                    <q-input
                      filled
                      v-model="editedExpediente.domicilio"
                      label="Domicilio *"
                      autogrow
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />

                    <q-input
                      filled
                      v-model="editedExpediente.beneficiario"
                      label="Beneficiario *"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <q-input
                      filled
                      v-model="editedExpediente.cClabe"
                      label="Cuenta con CLABE *"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <div class="row q-col-gutter-x-md">
                      <div class="col">
                        <q-input
                          filled
                          v-model="editedExpediente.ciclo"
                          label="Ciclo *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                      <div class="row q-col-gutter-x-md">
                        <div class="col-6">
                          <q-input
                            filled
                            v-model="editedExpediente.municipio"
                            label="Municipio *"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'campo requerido']"
                          />
                        </div>
                        <div class="col-6">
                          <q-input
                            filled
                            v-model="editedExpediente.cader"
                            label="Cader *"
                            lazy-rules
                            :rules="[val => (val && val.length > 0) || 'campo requerido']"
                          />
                        </div>
                      </div>
                      <div class="q-pa-md">
                        <div class="q-gutter-sm">
                          <q-radio v-model="editedExpediente.tipo" :val="'Hectareas'" label="Hectareas" />
                          <q-radio v-model="editedExpediente.tipo" :val="'Plantas'" label="Plantas" />
                        </div>
                      </div>
                      <div class="row q-gutter-md">
                        <div class="col">
                          <q-input
                            filled
                            v-model="editedExpediente.total"
                            type="number"
                            :label="'No. de '+ editedExpediente.tipo+'*'"
                            lazy-rules
                            :rules="[val => (val && val > 0) || 'campo requerido']"
                          />
                        </div>
                        </div>
                      <div class="row q-col-gutter-x-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="editedExpediente.tel"
                          label="Telefono *"
                          lazy-rules
                          :rules="[val => (val && val.length > 0) || 'campo requerido']"
                        />
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="docs">
                  <div class="text-h6">Documentacion</div>
                  <div class="q-pb-sm">                  
                    <div class="row justify-star">
                      <div class="col">
                        <q-file
                          class="q-pb-lg"
                          accept=".pdf, pdf/*"
                          filled
                          v-model="curpFile"
                          label="Curp"
                        />
                      </div>
                      <div class="col-4">
                        <q-btn-group push>
                          <q-btn :disable="!curpFile" push label="Subir" @click="subir(curpFile, 'CURP')" />
                          <q-btn push label="Descargar" @click="descargarDoc('CURP')" />
                        </q-btn-group>
                      </div>
                    </div>
                    <div class="row justify-star">
                      <div class="col">
                        <q-file
                        class="q-pb-lg"
                          accept=".pdf, pdf/*"
                          filled
                          v-model="ineFile"
                          label="INE"
                        />
                      </div>
                      <div class="col-4">
                        <q-btn-group push>
                          <q-btn :disable="!ineFile" push label="Subir" @click="subir(ineFile, 'INE')" />
                          <q-btn push label="Descargar" />
                        </q-btn-group>
                      </div>
                    </div>
                    <div class="row justify-star">
                      <div class="col">
                        <q-file
                        class="q-pb-lg"
                          accept=".pdf, pdf/*"
                          filled
                          v-model="domFile"
                          label="Comprobante de domicilio"
                        />
                      </div>
                      <div class="col-4">
                        <q-btn-group push>
                          <q-btn
                            :disable="!domFile"
                            push
                            label="Subir"
                            @click="subir(domFile, 'domicilio')"
                          />
                          <q-btn push label="Descargar" />
                        </q-btn-group>
                      </div>
                    </div>
                    <div class="row justify-star">
                      <div class="col">
                        <q-file
                        class="q-pb-lg"
                          accept=".pdf, pdf/*"
                          filled
                          v-model="terrenoFile"
                          label="Documento del terreno"
                        />
                      </div>
                      <div class="col-4">
                        <q-btn-group push>
                          <q-btn
                            :disable="!terrenoFile"
                            push
                            label="Subir"
                            @click="subir(terrenoFile, 'terreno')"
                          />
                          <q-btn push label="Descargar" />
                        </q-btn-group>
                      </div>
                    </div>
                    <div class="row justify-star">
                      <div class="col">
                        <q-file
                        class="q-pb-lg"
                          accept=".pdf, pdf/*"
                          filled
                          v-model="cClabeFile"
                          label="Estado de cuenta con CLABE"
                        />
                      </div>
                      <div class="col-4">
                        <q-btn-group push>
                          <q-btn
                            :disable="!cClabeFile"
                            push
                            label="Subir"
                            @click="subir(cClabeFile, 'cClabe')"
                          />
                          <q-btn push label="Descargar" />
                        </q-btn-group>
                      </div>
                    </div>
                    <div class="row justify-star">
                      <div class="col">
                        <q-file
                        class="q-pb-lg"
                          accept=".pdf, pdf/*"
                          filled
                          v-model="benefFile"
                          label="Beneficiario"
                        />
                      </div>
                      <div class="col-4">
                        <q-btn-group push>
                          <q-btn
                            :disable="!benefFile"
                            push
                            label="Subir"
                            @click="subir(benefFile, 'beneficiario')"
                          />
                          <q-btn push label="Descargar" />
                        </q-btn-group>
                      </div>
                  </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
          <q-page-sticky  position="bottom-right" :offset="[18, 18]">
            <q-fab
              vertical-actions-align="right"
              icon="add"
              direction="up"
              color="primary"
            >
              <q-fab-action label="Eliminar" color="primary" icon="delete" />
              <q-fab-action v-if="toEdit===false" v-show="tab==='info'" @click="onEditarBtnClicked" label="Editar" color="primary" icon="edit" />
              <q-fab-action v-else label="Guardar" color="primary" @click="onGuardarBtnClicked" icon="done" />
              <q-fab-action label="Descargar Comprimido" color="primary" icon="download" @click="onDescargarComprimidoBtnClicked" />
              
            </q-fab>
          </q-page-sticky>
        </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import expedientesApi from 'src/api/expedientes'
import axios from 'axios'
import api from 'src/api/api'

export default {
  
  setup() {
    onMounted(() => {
      fetchData()
    })
    const route = useRoute()

    let ineFile = ref(null)
    let curpFile = ref(null)
    let domFile = ref(null)
    let terrenoFile = ref(null)
    let cClabeFile = ref(null)
    let benefFile = ref(null)
    let expediente = reactive({
      id:0,
      nombreProd: '',
      fechaSolicitud: '',
      tel: '',
      tipo:'Hectarias',
      total:0,
      cader: '',
      municipio:'',
      beneficiario:'',
      domicilio:'',
      documento: '',
      cClabe: '',
      ciclo: '',
      curp: '',
      ine: '',
    })
    const editedExpediente = reactive({
      id:0,
      nombreProd: '',
      fechaSolicitud: '',
      tel: '',
      tipo:'',
      total:0,
      cader: '',
      municipio:'',
      beneficiario:'',
      domicilio:'',
      documento: '',
      cClabe: '',
      ciclo: '',
      curp: '',
      ine: '',
    })
    const toEdit = ref(false)
    const fetchData = ()=>{
      expedientesApi.show(route.params.id)
          .then(response => {
            console.log(response.data)
            Object.assign(expediente,response.data.data)
          })
    }
    return {
      editedExpediente,
      toEdit,
      route,
      ineFile,
      curpFile,
      domFile,
      terrenoFile,
      cClabeFile,
      benefFile,
      expediente,
      fetchData,

      tab: ref('info'),
      
     onEditarBtnClicked(){
       toEdit.value = !toEdit.value
       Object.assign(editedExpediente,expediente)
     },
      onGuardarBtnClicked(){
        expedientesApi.update(editedExpediente).then((reponse)=>{
        Object.assign(expediente,reponse.data.data)
        toEdit.value = !toEdit.value
       })
     },
     onDescargarComprimidoBtnClicked(){
       expedientesApi.descargarComprimido(route.params.id)
      },
      subir(archivo, tipo) {
        let form = new FormData()
        let header = {
          headers: {
            Authorization:
              'Beaerer: 1|jsloLlbxVZk4pvcACUHtuQzE7h6WteqhJAXKMtsT',
              'Content-Type': 'multipart/form-data'
          }
        }
        if (archivo) {
          form.append('file', archivo)
          form.append('tipo', tipo)
          axios
            .post(
              'http://127.0.0.1:8000/api/expedientes/' +
                route.params.id +
                '/documentos',
              form,
              header
            )
            .then(response => {
              archivo.value = null
            })
        }
      },
      descargarDoc(tipo) {
        let doc = null
        let header = {
          responseType: 'arraybuffer',
          headers: {
            Authorization:
              'Beaerer: 1|jsloLlbxVZk4pvcACUHtuQzE7h6WteqhJAXKMtsT',
            Accept: 'application/octet-stream'
          }
        }
        for (const docs of expediente.documentos) {
         if(docs.tipo ===tipo){
           doc = docs
         }
        }

        axios
          .get(
            'http://127.0.0.1:8000/api/documentos/' + doc.id + '/descargar',
            header
          )
          .then(response => {
            const blob = new Blob([response.data], {
              type: response.data.type
            })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'expediente_0' + route.params.id + '.zip'
            link.click()
          })
      },
    }
  }
}
</script>

<style></style>
