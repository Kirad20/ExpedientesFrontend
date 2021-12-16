<template>
  <div class="q-gutter-md">
    <div class="q-gutter-md">
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step
          :name="1"
          title="Información"
          icon="settings"
          :done="step > 1"
        >
          <q-form @submit="step1">
            <div class="row q-col-gutter-x-md">
              <div class="col">
                <q-input
                  filled
                  v-model="nombreProd"
                  label="Nombre del productor *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="ine"
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
                  v-model="curp"
                  label="Curp *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
              <div class="col">
                <q-input
                  filled
                  v-model="documento"
                  label="Documento *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
            </div>
            <q-input
              filled
              v-model="domicilio"
              label="Domicilio *"
              autogrow

              lazy-rules
              :rules="[val => (val && val.length > 0) || 'campo requerido']"
            />
            
            <q-input
              filled
              v-model="beneficiario"
              label="Beneficiario *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'campo requerido']"
            />
            <q-input
              filled
              v-model="cClabe"
              label="Cuenta con CLABE *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'campo requerido']"
            />
             <div class="row q-col-gutter-x-md">
              <div class="col">
                <q-input
                  filled
                  v-model="ciclo"
                  label="Ciclo *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
              <div class="col">
                <q-input label="Fecha de solicitud" filled v-model="fechaSolicitud">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="fechaSolicitud" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
                <q-input
                  filled
                  v-model="municipio"
                  label="Municipio *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
              <div class="col-6">
                <q-input
                  filled
                  v-model="cader"
                  label="Cader *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-sm">
                <q-radio v-model="tipo" :val="'Hectareas'" label="Hectareas" />
                <q-radio v-model="tipo" :val="'Plantas'" label="Plantas" />
              </div>
            </div>

            <div class="row q-gutter-md">
              <div class="col">
                <q-input
                  filled
                  v-model="total"
                  type="number"
                  :label="'No. de '+ tipo +'*'"
                  lazy-rules
                  :rules="[val => (val> 0) || 'campo requerido']"
                />
              </div>
              </div>
            <div class="row q-col-gutter-x-md">
              <div class="col-6">
                <q-input
                  filled
                  v-model="tel"
                  label="Telefono *"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'campo requerido']"
                />
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn type="submit" color="primary" label="Continuar" />
            </q-stepper-navigation>
          </q-form>
        </q-step>

        <q-step
          :name="2"
          title="Documentación"
          icon="create_new_folder"
          :done="step > 2"
        >
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-file
              accept=".pdf, pdf/*"
              lazy-rules
              :rules="[val => val || 'Selecciona un archivo']"
              filled
              v-model="curpFile"
              label="Curp"
            />
            <q-file
              accept=".pdf, pdf/*"
              lazy-rules
              :rules="[val => val || 'Selecciona un archivo']"
              filled
              v-model="ineFile"
              label="INE"
            />

            <q-file
              accept=".pdf, pdf/*"
              lazy-rules
              :rules="[val => val || 'Selecciona un archivo']"
              filled
              v-model="domFile"
              label="Comprobante de domicilio"
            />

            <q-file
              accept=".pdf, pdf/*"
              lazy-rules
              :rules="[val => val || 'Selecciona un archivo']"
              filled
              v-model="terrenoFile"
              label="Documento del terreno"
            />

            <q-file
              accept=".pdf, pdf/*"
              lazy-rules
              :rules="[val => val || 'Selecciona un archivo']"
              filled
              v-model="cClabeFile"
              label="Estado de cuenta con CLABE"
            />

            <q-file
              accept=".pdf, pdf/*"
              lazy-rules
              :rules="[val => val || 'Selecciona un archivo']"
              filled
              v-model="benefFile"
              label="Beneficiario"
            />

            <q-stepper-navigation>
              <q-btn
                flat
                color="primary"
                @click="step = 1"
                label="Regresar"
                class="q-ml-sm"
              />
              <q-btn type="submit" color="primary" label="Guardar" />
            </q-stepper-navigation>
          </q-form>
        </q-step>
      </q-stepper>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent  } from 'vue'
import { useQuasar } from 'quasar'
 import { useRouter } from 'vue-router'
import expedientes from 'src/api/expedientes'

export default defineComponent({
  
  setup() {
    const q = useQuasar()
    const router = useRouter()
    const nombreProd = ref('null')
    const ine = ref('null')
    const curp = ref('null')
    const domicilio = ref('null')
    const documento = ref('null')
    const beneficiario = ref('null')
    const cClabe = ref('null')
    const fechaSolicitud = ref('null')
    const cader = ref('null')
    const municipio = ref('null')
    const total = ref(3)
    const tipo = ref('Hectareas')
    const tel = ref('null')
    const ciclo = ref('null')
    const step = ref(1)
    const curpFile = ref(null)
    const ineFile = ref(null)
    const domFile = ref(null)
    const terrenoFile = ref(null)
    const cClabeFile = ref(null)
    const benefFile = ref(null)

    return {
      q,
      router,
      total,
      tipo,
      nombreProd,
      ine,
      curp,
      domicilio,
      documento,
      beneficiario,
      cClabe,
      fechaSolicitud,
      cader,
      municipio,
      tel,
      ciclo,
      step,
      curpFile,
      ineFile,
      domFile,
      terrenoFile,
      cClabeFile,
      benefFile,

      step1() {
        step.value = 2
      },
      onSubmit() {
        let form = new FormData()
        form.append('nombreProd', nombreProd.value)
        form.append('ine', ine.value)
        form.append('curp', curp.value)
        form.append('domicilio', domicilio.value)
        form.append('documento', documento.value)
        form.append('beneficiario', beneficiario.value)
        form.append('cClabe', cClabe.value)
        form.append('fechaSolicitud', fechaSolicitud.value)
        form.append('cader', cader.value)
        form.append('municipio', municipio.value)
        form.append('total', total.value)
        form.append('tipo', tipo.value)
        form.append('tel', tel.value)
        form.append('ciclo', ciclo.value)
        form.append('curpFile', curpFile.value)
        form.append('ineFile', ineFile.value)
        form.append('domFile', domFile.value)
        form.append('terrenoFile', terrenoFile.value)
        form.append('cClabeFile', cClabeFile.value)
        form.append('benefFile', benefFile.value)
        expedientes.add(form).then((response)=>{
          q.notify({
            type: 'positive',
            message: 'Expediente creado coreectamente.'
          })
          router.push("/expediente/"+response.data.data.id);
        })
      },

      onReset() {
        nombreProd.value = null
        ine.value = null
        curp.value = null
      }
    }
  }
})
</script>
