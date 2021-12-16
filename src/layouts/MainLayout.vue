<template>
  <q-layout view="hHh Lpr lff" container style=" height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-prymari">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Expedientes</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="logout
"
            @click="logoutNotify"
          />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
      <q-list>
        <q-item
          active-class="tab-active"
          to="/nuevo-expediente"
          class="q-ma-sm navigation-item"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>

          <q-item-section> Nuevo expediente </q-item-section>
        </q-item>
        <q-item
          active-class="tab-active"
          to="/buscar-expediente"
          class="q-ma-sm navigation-item"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>

          <q-item-section> Expedientes </q-item-section>
        </q-item>
        <q-item
          v-if="isAdmin"
          active-class="tab-active"
          to="/Usuarios"
          class="q-ma-sm navigation-item"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section> Usuarios </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref,computed} from 'vue'
import auth from 'src/api/auth'
import {useQuasar} from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup () {

    const $q = useQuasar()
    const router = useRouter()
    const isAdmin = computed(() => {
      return auth.isAdmin()
    })
    return {
      isAdmin,
      drawer: ref(false),
      miniState: ref(true),
      logoutNotify() {
        auth.deleteUserLogged();
        router.push('/login')
        $q.notify({
          message: "Logged out"

        });
      }
    }
  }
})
</script>
