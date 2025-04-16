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
import { computed, ref, watch } from 'vue'
import { getAudioContext } from '../../../src/index'

const note_frequency = ref(440)
const note_frequency_text = 'Frequency'

const is_playing = ref(false)
const play_button_text = computed(() => (!is_playing.value ? 'Start note' : '🔊 Playing note...'))

// create web audio api context
// const audioCtx = new AudioContext()

const audioCtx = getAudioContext()

// create Oscillator node
const oscillator = audioCtx.createOscillator()
oscillator.type = 'sine'

const gainNode = audioCtx.createGain()
oscillator.connect(gainNode)
oscillator.start()

function playNote() {
  if (!is_playing.value) {
    is_playing.value = true
    gainNode.connect(audioCtx.destination)
  } else {
    gainNode.disconnect(audioCtx.destination)
    is_playing.value = false
  }
}

watch(note_frequency, () => {
  oscillator.frequency.setValueAtTime(note_frequency.value, audioCtx.currentTime)
})

const volume = ref(50)
const volume_text = 'Volume'
watch(volume, () => {
  gainNode.gain.value = volume.value / 100
})
</script>
