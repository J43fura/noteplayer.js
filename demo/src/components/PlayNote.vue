<template>
  <div class="flex flex-col items-center gap-4 pt-8 text-center">
    <label :for="note_frequency_text">
      {{ note_frequency_text }}
      <br />
      <input
        :id="note_frequency_text"
        v-model="note_frequency"
        type="number"
        :placeholder="note_frequency_text"
      />
      <br />
      <input type="range" v-model="note_frequency" :id="note_frequency_text" min="20" max="2000" />
    </label>
    <span class="relative inline-flex">
      <button @click="playNote()">
        <span> {{ play_button_text }}</span>
        <span v-if="is_playing" class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3">
          <span
            class="absolute h-full w-full animate-ping rounded-full bg-[var(--caret-color)] opacity-75"
          ></span>
          <span class="relative size-3 rounded-full bg-[var(--main-color)]"></span>
        </span>
      </button>
    </span>

    <label :for="volume_text">
      {{ volume_text }}
      <input :id="volume_text" type="range" v-model="volume" min="0" max="100" />
      {{ volume }}%
    </label>
    <label :for="oscillator_type_text" class="align-middle">
      {{ oscillator_type_text }}

      <span
        class="hidden icon-[ph--wave-sine] icon-[ph--wave-sine-duotone] hidden icon-[ph--wave-sawtooth] icon-[ph--wave-sawtooth] icon-[ph--wave-sawtooth-duotone] icon-[ph--wave-square] icon-[ph--wave-square-duotone] icon-[ph--wave-triangle] icon-[ph--wave-triangle-duotone]"
      ></span>

      <span class="align-middle mr-1" :class="oscillator_icon"></span>
      <select v-model="oscillator_type" :id="oscillator_type_text">
        <option :key="index" v-for="(type, index) in oscillator_types" :value="type">
          {{ type }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import notePlayer from 'noteplayer'
import { computed, ref, watch } from 'vue'

const note_frequency = ref(440)
const note_frequency_text = 'Frequency'

const np = new notePlayer()

const is_playing = ref(false)
const play_button_text = computed(() => (!is_playing.value ? 'Play note' : '🔊 Playing note...'))

function playNote() {
  if (!is_playing.value) {
    is_playing.value = true
    np.play()
  } else {
    is_playing.value = false
    np.stop()
  }
}

watch(note_frequency, () => {
  np.setFrequency(note_frequency.value)
})

const volume = ref(50)
const volume_text = 'Volume'
watch(volume, () => {
  np.setGain(volume.value / 100)
})

const oscillator_types = ref<OscillatorType[]>(['sawtooth', 'sine', 'square', 'triangle'])
const oscillator_type = ref<OscillatorType>('sine')
const oscillator_type_text = 'Oscillator type'
const oscillator_icon = computed(
  () => `icon-[ph--wave-${oscillator_type.value}${is_playing.value ? '-duotone' : ''}]`,
)
watch(oscillator_type, () => {
  np.setOscillatorType(oscillator_type.value)
})
</script>
