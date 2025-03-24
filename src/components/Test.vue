<template>
<div>
    <p>Test component ::</p>
    <p>{{foo}}</p>
</div>
</template>

<script>
export default {
    name: 'Test',
    props: ['foo'],
    data(){
        return {
            another: null
        }
    },
    methods:{
        test(){

        }
    },
    created() {
    // props are exposed on `this`
    console.log('testing prop :: ' +this.test)
  }

}
</script>
