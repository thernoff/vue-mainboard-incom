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

    :class="[{'fullscreen': options.fullscreen}, options.classesCss.join(' ')]"
>
    <v-card class="mainboard-window__card">

    <v-card-title
        class="mainboard-window__title"
        :class = "{'indigo lighten-1': options.active, 'indigo lighten-4': !options.active}"
        @mousedown="setActiveWindow"
        primary-title
    >
        <span >{{ options.title }}</span>
        <v-spacer></v-spacer>
        <v-btn icon small class="mainboard-window__btn" @click="toggleClassWindow('mainboard-window--fullheight')" title="Развернуть по высоте">
            <v-icon color="white">fas fa-arrows-alt-v</v-icon>
        </v-btn>
        <v-btn icon small class="mainboard-window__btn" @click="toggleClassWindow('mainboard-window--fullwidth')" title="Развернуть по ширине">
            <v-icon color="white">fas fa-arrows-alt-h</v-icon>
        </v-btn>
        <v-btn icon small class="mainboard-window__btn" @click="reloadWindow" title="Перезагрузить окно">
            <v-icon color="white">refresh</v-icon>
        </v-btn>
        <v-btn icon small class="mainboard-window__btn" @click="minimizeWindow" @mousedown.stop="''" title="Свернуть">
            <v-icon color="white">minimize</v-icon>
        </v-btn>
        <v-btn icon small class="mainboard-window__btn" @click="toggleFullscreenWindow" title="Развернуть на весь экран">
            <v-icon v-if="!options.fullscreen" color="white">fullscreen</v-icon>
            <v-icon v-if="options.fullscreen" color="white">fullscreen_exit</v-icon>
        </v-btn>
        <v-btn icon small class="mainboard-window__btn" @click="closeWindow" title="Закрыть окно">
            <v-icon color="white">close</v-icon>
        </v-btn>
    </v-card-title>

    <v-card-text class="mainboard-window__body">
        <div class="mainboard-window__cover-window"
            v-if="!options.active"
            @mousedown="setActiveWindow"
        ></div>
        <base-mainboard-frame ref="baseMainboardFrame" :frameSrc="options.apiLink"></base-mainboard-frame>
    </v-card-text>

    <v-divider></v-divider>
</v-card>
</div>
</template>

<script>
import baseMainboardFrame from '../Base/BaseFrame'
export default {
    props: ['options', 'index'],
    components: {
        baseMainboardFrame,
    },
    methods: {
        minimizeWindow () {
            this.$store.commit('toggleMinimizeWindow', this.index)
            if (this.options.active) {
                this.$store.commit('unsetActiveWindow')
            }
        },
        toggleClassWindow (classCss) {
            this.$store.commit('toggleClassWindow', {index: this.index, classCss: classCss})
        },
        reloadWindow () {
            this.$refs.baseMainboardFrame.$refs.baseFrame.src = this.options.apiLink
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
            snap: ".mainboard-window",
            start: function(event, ui) {
                var $window = $(this);
                //$window.find('.mainboard-frame__cover').css({display: 'block'});
                $window.find('.mainboard-frame__cover').show();
            },
            stop: function (event, ui) {
                console.log('ui', ui)
                var $window = $(this);
                var offset = $window.offset();
                var top = offset.top;
                var left = offset.left;
                var bottom = top + $window.outerHeight();
                var right = left + $window.outerWidth();
                console.log(left, top, right, bottom);
                $window.find('.mainboard-frame__cover').hide();
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
            grid: 20,
            iframeFix: true,
            minHeight: 150,
            minWidth: 300,
            start: function(event, ui) {
                var $window = $(this);
                //$window.find('.mainboard-frame__cover').css({display: 'block'});
                $window.find('.mainboard-frame__cover').show();
            },
            stop: function (event, ui) {
                console.log('ui', ui);
                var $window = $(this);
                $window.find('.mainboard-frame__cover').hide();

                var coefWidth = ui.size.width / ui.originalSize.width;
                var coefHeight = ui.size.height / ui.originalSize.height;
                console.log(coefWidth, coefHeight);
                var options = {
                    index: $(this).data('index'),
                    coefWidth: coefWidth,
                    coefHeight: coefHeight,
                    left: ui.position.left,
                    top: ui.position.top,
                }

                self.$store.commit('updateWindowSize', options);
            }
        })
    }
}
</script>

<style scoped>
    .mainboard-window {
        position: absolute;
        width: 500px;
        border: 2px solid rgba(92, 107, 192, 0.8);
        border-radius: 5px;
        webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
        box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
    }

    .mainboard-window--fullheight {
        top: 0px !important;
        height: 100% !important;
    }

    .mainboard-window--fullwidth {
        width: 100% !important;
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
        font-size: 16px;
        color:#fff;
        cursor: move;
        padding: 5px;
        height: 30px;
    }

    .mainboard-window__btn {
        margin: 0;
    }

    .mainboard-window__body {
        height: calc(100% - 40px);
        position: relative;
        padding: 0;
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

