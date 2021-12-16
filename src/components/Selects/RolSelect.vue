<template>
  <q-select outlined
    v-model="rolSelected"
    :options="roles"
    use-chips
    @update:model-value ="emit"
    label="Rol"
    :rules="[val => !!val || 'Selecciona un rol']"
/>
</template>

<script>
import {ref} from 'vue'
export default {
  props:{
    selected: String
  },
  setup(props,{emit}){
    let rolSelected = ref(props.selected)
    return {
      roles:['usuario','administrador'],
      rolSelected,
      emit(value){
        console.log(value);
        emit('select',value)
      },
    }
  }

}
</script>

<style>

</style>
