<template>
  <div class="q-gutter-md">
    <div class="q-gutter-md">
      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-x-md">
          <q-input
            filled
            v-model="nombre"
            label="Nombre del usuario *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'campo requerido']"
          />
            <q-input
              filled
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'campo requerido']"
            />
          <rol-select />
        </div>
        <div>
          <q-btn type="submit" color="primary" label="Guardar" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent  } from 'vue'
import { useQuasar } from 'quasar'
 import { useRouter } from 'vue-router'
import expedientes from 'src/api/expedientes'
import RolSelect from '../Selects/RolSelect.vue'

export default defineComponent({
  components: { RolSelect },

  setup() {
    const q = useQuasar()
    const router = useRouter()
    const nombre = ref('null')
    const email = ref('null')
    const rol = ref([])


    return {
      q,
      router,
      nombre,
      email,
      rol,
      onSubmit() {
        let form = new FormData()
        form.append('nombre', nombre.value)
        form.append('email', email.value)
        form.append('rol', rol.value)
        api.add(form).then((response)=>{
          q.notify({
            type: 'positive',
            message: 'Usuario'
          })
          router.push("/usario/"+response.data.data.id);
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
