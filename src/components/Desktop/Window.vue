<template>
<div class="mainboard-window"
    :data-index="index"
    :style="{
        top: options.top + 'px',
        left: options.left + 'px',
        width: options.width + '%',
        height: options.height + '%',
        zIndex: options.zIndex,
    }"

    :class="{'fullscreen': options.fullscreen}"
>
    <v-card class="mainboard-window__card">

    <v-card-title
        class="headline mainboard-window__title"
        :class = "{'primary': options.active, 'grey lighten-1': !options.active}"
        @click="setActiveWindow"
        primary-title
    >
        <span >{{ options.title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon color="white">refresh</v-icon>
        </v-btn>
        <v-btn icon @click.stop="minimizeWindow">
            <v-icon color="white">minimize</v-icon>
        </v-btn>
        <v-btn icon @click="toggleFullscreenWindow">
            <v-icon color="white">fullscreen</v-icon>
        </v-btn>
        <v-btn icon @click="closeWindow">
            <v-icon color="white">close</v-icon>
        </v-btn>
    </v-card-title>

    <v-card-text class="mainboard-window__body">
        <div class="mainboard-window__cover-window"
            v-if="!options.active"
            @mousedown="setActiveWindow"
        ></div>
        <base-mainboard-frame :frameSrc="options.currentUrl"></base-mainboard-frame>
    </v-card-text>

    <v-divider></v-divider>
</v-card>
</div>
</template>

<script>
import Frame from '../Base/BaseFrame'
export default {
    props: ['options', 'index'],
    components: {
        baseMainboardFrame: Frame
    },
    methods: {
        minimizeWindow () {
            this.$store.commit('toggleMinimizeWindow', this.index)
            console.log('this.options.active', this.options.active)
            if (this.options.active) {
                this.$store.commit('unsetActiveWindow')
            }
        },
        closeWindow () {
            //this.$store.commit('closeWindow', this.index)
            this.$store.dispatch('actionCloseWindow', this.index)
        },
        toggleFullscreenWindow () {
            this.$store.commit('toggleFullscreenWindow', this.index)
        },
        setActiveWindow () {
            console.log('setActiveWindow')
            this.$store.commit('setActiveWindow', this.index)
        }
    },
    mounted () {
        var self = this;
        $('.mainboard-window')
        .draggable({
            handle: '.mainboard-window__title',
            containment: '.mainboard-workspace',
            start: function(event, ui) {
                var $window = $(this);
                //$window.find('.mainboard-frame__cover').css({display: 'block'});
                $window.find('.mainboard-frame__cover').show();
            },
            stop: function (event, ui) {
                var $window = $(this);
                $window.find('.mainboard-frame__cover').hide();
                console.log('$(this).data(index)', $(this).data('index'),);
                var options = {
                    index: $(this).data('index'),
                    //top: ui.offset.top,
                    //left: ui.offset.left
                    diffX: ui.position.left - ui.originalPosition.left,
                    diffY: ui.position.top - ui.originalPosition.top,
                }

                self.$store.commit('updateWindowCoords', options);
            }
        })
        .resizable({
            handles: 'e, s, n, w',
            containment: '.mainboard-workspace',
            start: function(event, ui) {
                var $window = $(this);
                //$window.find('.mainboard-frame__cover').css({display: 'block'});
                $window.find('.mainboard-frame__cover').show();
            },
            stop: function (event, ui) {
                var $window = $(this);
                $window.find('.mainboard-frame__cover').hide();
            }
        })
    }
}
</script>

<style scoped>
    .mainboard-window {
        position: absolute;
        width: 500px;
    }

    .mainboard-window--top-half {
        top: 0px !important;
        left: 0px !important;
        width: 100% !important;
        height: 50% !important;
    }

    .mainboard-window--bottom-half {
        bottom: 0px !important;
        left: 0px !important;
        width: 100% !important;
        height: 50% !important;
    }

    .mainboard-window__card {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .mainboard-window__cover-window {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .mainboard-window__title {
        cursor: move;
        padding: 5px;
        height: 40px;
    }

    .mainboard-window__body {
        height: calc(100% - 40px);
    }

    .fullscreen {
        position: absolute !important;
        z-index: 1000;
        width: 100% !important;
        height: 100% !important;
        top: 0!important;
        left: 0!important;
        bottom: 0!important;
        right: 0!important;
    }
</style>

