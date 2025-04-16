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

    <button @click="playNote()">{{ play_button_text }}</button>

    <label :for="volume_text">
      {{ volume_text }}
      <input :id="volume_text" type="range" v-model="volume" min="0" max="100" />
      {{ volume }}%
    </label>
  </div>
</template>

<script setup lang="ts">
import { notePlayer } from 'noteplayer'
import { computed, ref, watch } from 'vue'

const note_frequency = ref(440)
const note_frequency_text = 'Frequency'

const np = new notePlayer()

const is_playing = ref(false)
const play_button_text = computed(() => (!is_playing.value ? 'Start note' : '🔊 Playing note...'))

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
  np.setFrequency(note_frequency.value) // set frequency
})

const volume = ref(50)
const volume_text = 'Volume'
watch(volume, () => {
  np.setGain(volume.value / 100)
})
</script>
