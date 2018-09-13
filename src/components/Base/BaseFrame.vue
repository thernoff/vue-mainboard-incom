<template>
    <div class="mainboard-frame">
        <div class="mainboard-frame__cover"></div>
        <iframe ref="baseFrame" :src="frameSrc" @load="load" class="mainboard-frame__frame" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cover: false,
        }
    },
    props: ['frameSrc'],
    methods: {
        load () {
            console.log('Load frame')
        }
    },
    created () {
        console.log('created', this)
        console.log('created', this.$refs)
        console.log('created', this.$refs['baseFrame'])
    },
    mounted () {
        console.log('mounted', this)
        console.log('mounted', this.$refs)
        console.log('mounted', this.$refs['baseFrame'])
        //this.$refs.baseFrame.src = this.frameSrc
    },
    beforeUpdate () {
        console.log('beforeUpdate', this.$refs.baseFrame)
        this.$refs.baseFrame.src = ''
    },
    updated () {
        console.log('updated', this)
        console.log('updated', this.$refs)
        console.log('updated', this.$refs['baseFrame'])
        this.$refs.baseFrame.src = this.frameSrc
    }
}
</script>

<style scoped>
    .mainboard-frame {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .mainboard-frame__frame {
        width: 100%;
        height: 100%;
    }

    .mainboard-frame__cover {
        display: none;
        z-index: 500;
        position: fixed;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        overflow: hidden;
    }
</style>

