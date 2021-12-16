<template>
    <q-card >
        <q-card-section>
          <q-grid  :data="data" :columns="columns" :columns_filter="true">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="email">
                  {{ props.row.email }}
                </q-td>
                <q-td key="nombre">
                    {{ props.row.nombre }}
                </q-td>
                <q-td key="rol">
                  <q-badge color="purple">
                    {{ props.row.rol }}
                  </q-badge>
                </q-td>
                <q-td key="actions">
                <q-btn-dropdown
                  split
                  class="glossy"
                  color="primary"
                  label="Editar"
                  @click="onActualizarBtnClicked(props.row)"
                >
                  <q-list>
                    <q-item clickable v-close-popup @click="onEliminarBtnClicked">
                      <q-item-section>
                        <q-item-label>Eliminar</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>

              </q-tr>
            </template>
          </q-grid>
          <q-dialog  v-model="nuevoUsuarioOpen">
            <q-card style="width: 500px; max-width: 80vw;">
              <q-card-section>
                <div class="text-h6">Nuevo Usuario</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="onGuardarBtnClicked">
                  <div>
                    <q-input
                      filled
                      v-model="nuevoUsuario.nombre"
                      label="Nombre del usuario *"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <q-input
                      filled
                      v-model="nuevoUsuario.email"
                      label="Email *"
                      type="email"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <q-input label="Password" v-model="nuevoUsuario.password" filled :type="isPwd ? 'password' : 'text'"
                      lazy-rules :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                    <q-input label="Confirmar password" v-model="nuevoUsuario.samePassword" filled :type="isPwd2 ? 'password' : 'text'"
                      lazy-rules :rules="[val => (val ===nuevoUsuario.password) || 'Las 2 contraseñas deben coincidir']"

                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd2 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd2 = !isPwd2"
                        />
                      </template>
                    </q-input>
                    <rol-select v-on:select="updateRolNuevo" :selected="nuevoUsuario.rol"/>
                  </div>
                  <div>
                    <q-btn type="submit" color="primary" label="Guardar" />
                  </div>
                </q-form>

              </q-card-section>
            </q-card>
          </q-dialog>
          <q-dialog v-model="editarUsuarioDialog">
            <q-card style="width: 500px; max-width: 80vw;">
              <q-card-section>
                <div class="text-h6">Actualizar Usuario</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit="actualizarUsuario">
                  <div>
                    <q-input
                      filled
                      v-model="usuarioEditable.nombre"
                      label="Nombre del usuario *"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <q-input
                      filled
                      v-model="usuarioEditable.email"
                      label="Email *"
                      type="email"
                      lazy-rules
                      :rules="[val => (val && val.length > 0) || 'campo requerido']"
                    />
                    <q-input label="Password" v-model="usuarioEditable.password" filled :type="isPwd ? 'password' : 'text'" >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                    <q-input label="Confirmar password" v-model="usuarioEditable.samePassword" filled :type="isPwd2 ? 'password' : 'text'"
                      lazy-rules :rules="[val => (val ===usuarioEditable.password) || 'Las 2 contraseñas deben coincidir']"

                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd2 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd2 = !isPwd2"
                        />
                      </template>
                    </q-input>
                    <rol-select v-on:select="updateRolEditable" :selected="usuarioEditable.rol"/>
                  </div>
                  <div>
                    <q-btn type="submit" color="primary" label="Guardar" />
                  </div>
                </q-form>

              </q-card-section>
            </q-card>
          </q-dialog>

        </q-card-section>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        vertical-actions-align="right"
        icon="add"
        direction="up"
        color="primary"
      >
        <q-fab-action @click="nuevoUsuarioOpen=true" label="Nuevo usuario" color="primary" icon="filter_alt" />
      </q-fab>
    </q-page-sticky>

    </q-card>
</template>

<script>
import { defineComponent,reactive, ref,onMounted } from "vue";
import api from 'src/api/usuarios'
import RolSelect from "src/components/Selects/RolSelect.vue";
import { useQuasar } from 'quasar'
const columns = [
  {
    name: "email",
    required: true,
    label: "Correo",
    align: "left",
    field: "email",
    sortable: true
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true
  },
  { name: "rol", label: "Rol", field: "rol", sortable: true ,filter_type: 'select'},
  { name: "accion", label: "Acciones", field: "id", sortable: true ,filter_type: null},

];

export default defineComponent({
  components: { RolSelect },
  name: "Usuarios",
  setup() {
    const $q = useQuasar()

    onMounted(() => { fetchData() })
    const data = ref([]);
    const editarUsuarioDialog= ref(false)

    const nuevoUsuario = reactive({
      nombre: null,
      email: null,
      password: null,
      samePassword:null,
      rol: 'usuario',
    })
     const usuarioEditable = reactive({
      nombre: null,
      email: null,
      password: null,
      samePassword:null,
      rol: 'usuario',
    })
    const nuevoUsuarioOpen=ref(false)
    const fetchData = ()=>{
      api.get()
          .then(response => {
            data.value = response.data.data;
          })
    }
    const actualizarUsuario = ()=>{
      console.log('editado');
      console.log(usuarioEditable);
      api.update(usuarioEditable)
          .then(response => {
            console.log(response);
            fetchData()
            editarUsuarioDialog.value = false
          })
    }
    const updateRolEditable=(rol)=>{
      usuarioEditable.rol = rol
    }
    const updateRolNuevo=(rol)=>{
      nuevoUsuario.rol = rol
    }
    let indexUsuario = ref(null)

    const onActualizarBtnClicked=(usuario)=>{
      indexUsuario.value = data.value.indexOf(usuario)
      Object.assign(usuarioEditable,usuario)
      console.log(usuarioEditable);
      editarUsuarioDialog.value = true
    }
    const onEliminarBtnClicked=(usuario)=>{
      indexUsuario = data.value.indexOf(usuario)
      $q.dialog({
        title: 'Alerta',
        message: '¿Desea eliminar al usuario'+ usuario.nombre+'?',
        cancel: true,
        persistent: false
      }).onOk(() => {
        api.delete(usuario).then(()=>{
          fetchData()
        })
      })
    }
    const onGuardarBtnClicked=()=>{
      api.add(nuevoUsuario).then(()=>{
        nuevoUsuarioOpen.value=false
        fetchData()
      })
    }
    return {
      updateRolNuevo,
      updateRolEditable,
      actualizarUsuario,
      onActualizarBtnClicked,
      editarUsuarioDialog,
      usuarioEditable,
      isPwd: ref(true),
      isPwd2: ref(true),
      isPwdSame: ref(true),
      onGuardarBtnClicked,
      nuevoUsuario,
      fetchData,
      onEliminarBtnClicked,
      nuevoUsuarioOpen,
      columns,
      data
    };
  }
});
</script>


<style>

</style>
