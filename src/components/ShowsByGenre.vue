<script setup lang="ts">
import type { Show } from '../model/show';
import {Swiper, SwiperSlide} from 'swiper/vue';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string
    noResultsText: string
    shows: Show[]

    isLoading?: boolean
  }>(),
  {
    isLoading: false
  }
)

const swiperOptions = ref({
  slidesPerView: 2,
  spaceBetween: 10,
  shortSwipes: false,
  watchOverflow: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  onInit: function (swiper: { slideTo: (arg0: number, arg1: number) => void; }) {
    swiper.slideTo(7, 0)
  },
  breakpoints: {
    // when window width is >= 480px
    512: {
      slidesPerView:2,
      spaceBetween: 10
    },
    // when window width is >= 640px
    800: {
      slidesPerView: 3.5,
      spaceBetween: 10
    },
    912: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 3.5,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 4.5,
      spaceBetween: 0.2
    },
    // when window width is >= 1112px
    1112: {
      slidesPerView: 7,
      spaceBetween: 10
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 2
    },
    1380: {
      slidesPerView: 7.5,
      spaceBetween: 2
    },
    // when window width is >= 1920px
    1920: {
      slidesPerView: 7,
      spaceBetween: 10
    }
  }
})

SwiperCore.use([Navigation]);

</script>



<template>
  <h2 class="text-h4">{{ title }}</h2>
  <div>
    <swiper v-bind="swiperOptions"
    navigation >
    <swiper-slide v-for="show in props.shows" >
      <RouterLink :to="`/showDetailsPage/${show.id}`">
        <img :src="show.image?.medium" :alt="show.name">
      </RouterLink>
    </swiper-slide>
  </swiper>
  </div>
  
</template>
