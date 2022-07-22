<template>
<div>
 
<todo-input @add="onAddNewTask"></todo-input>
  <hr>
  <todo-list :list="tasklist" class="mt-8"></todo-list>
  <hr>
  <todo-button v-model:active="activeBtnIndex"></todo-button>
</div>
  
</template>

<script>
import TodoList from './components/todo-list/TodoList.vue'
import TodoInput from './components/todo-input/TodoInput.vue'
import TodoButton from './components/todo-button/TodoButton.vue'
export default {
  name:'MyApp',
  data(){
    return {
      todolist:[
        {id:1,task:'周一14:00红岩上课',done:false},
        {id:2,task:'周一20:00吃火锅',done:false},
        {id:3,task:'周三9:00自习',done:true},
      ],
      nextId:4 ,//下一个可用的Id
      activeBtnIndex:0,
    }
  },
  components:{
    TodoList,
    TodoInput,
    TodoButton,
  },
  methods:{
    onAddNewTask(taskname){
      this.todolist.push({
        id:this.nextId,
        task:taskname,
        done:false
      })

      this.nextId++
    }
  },
  computed:{
    tasklist(){
      switch(this.activeBtnIndex){
        case 0:
          return this.todolist
        case 1:
          return this.todolist.filter(x=>x.done===true)
           case 2:
          return this.todolist.filter(x=>x.done!==true)
      }
    }
  }

}
</script>

<style lang="less" scoped>

</style>