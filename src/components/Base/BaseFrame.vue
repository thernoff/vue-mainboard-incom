<template>
    <div class="mainboard-frame">
        <div class="mainboard-frame__cover"></div>
        <iframe class="mainboard-frame__frame" :src="frameSrc" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cover: false,
        }
    },
    props: ['frameSrc']
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

