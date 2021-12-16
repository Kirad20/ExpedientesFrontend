<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          class="login-form"
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >
          <q-card-section>
            <q-avatar
              size="74px"
              class="absolute"
              style="top: 0;right: 25px;transform: translateY(-50%);"
            >
            </q-avatar>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Login
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="email" label="Usuario" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn
                  label="Login"
                  type="button"
                  color="primary"
                  @click="login"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript"></script>
<script>
  import {ref} from 'vue'
  import { useRouter } from 'vue-router'
  import auth from 'src/api/auth'
import { Notify } from 'quasar'
  export default {
    setup() {
      const email =ref('cesard20@hotmail.com')
      const password =ref('admin')
      const router = useRouter()
      return {
        router,
        email,
        password,
        async login() {
          try {
            await auth.login(email, password).then((response)=>{
              console.log(response.data);
              auth.setToken(response.data.token);
              auth.setUserLogged(response.data.user);
              router.push("/buscar-expediente");
            });

          } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status ===422) {
              Notify.create('El correo o la contraseña no coinciden con nuestros registros')
            }
          }
        },
      }
    },
}
</script>

<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
}
.login-form {
  position: absolute;
}
</style>
