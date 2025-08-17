<template>
  <div class="flex flex-row">
    <div
      v-for="(key, index) in playableKeys"
      :value="key"
      class="bordered w-[70px] hover:bg-[var(--text-color)] hover:text-white"
      :class="{
        'bg-[var(--text-color)] text-white': pressedKeys.includes(key),
      }"
    >
      <div class="bg-[var(--text-color)] text-white">{{ key }}</div>
      <div>{{ np.getNoteNameFromSteps(playableSteps[index] + stepOffset) }}</div>
      <div
        v-if="[0, 1, 2, 5, 10].includes(index)"
        class="rounded-full bg-blue-500 h-4 w-4 m-auto"
      ></div>
    </div>
  </div>
  <div class="bordered bg-[var(--text-color)] text-white">
    {{
      pressedFrequency
        ? np.getNoteNameFromSteps(np.getStepsFromFrequency(pressedFrequency))
        : 'None'
    }}
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import notePlayer from '../../../dist/index.js' // uncomment and use "npm run link" to use the local version

const np = new notePlayer()
const np_initialized = ref(false)
const np_played = ref(false)

const { current } = useMagicKeys()
const pressedKeys = computed(() => Array.from(current))
const pressedFrequencies = computed(() =>
  pressedKeys.value.map((key) =>
    np.getFrenquencyFromSteps(playableSteps[keyNames.indexOf(key)] + stepOffset),
  ),
)

const stepOffset = +5 - 12 // Sol

const pressedFrequency = ref<number | null>(null)

const scales = {
  isbayan: [-3, -2, 0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
}
const playableSteps = scales.isbayan

const keyNames = [
  'x',
  'v',
  'q',
  's',
  'd',
  'a',
  'z',
  'e',
  'r',
  't',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '°',
  '+',
]
const playableKeys = keyNames.slice(0, playableSteps.length - 1)
const temperament = 12
watch(pressedKeys, (keys) => {
  if (!np_initialized.value) {
    np.init()
    np.setTemperament(temperament)
    np_initialized.value = true
  }
  console.log('Pressed keys:', keys, pressedFrequencies.value)

  // np.playChord(pressedFrequencies.value)

  if (pressedKeys.value.length > 0 && !keyNames.includes(pressedKeys.value[0])) {
    if (np_played.value) {
      console.log('Stop note player')
      pressedFrequency.value = null
      np.stop()
      np_played.value = false
    }
    return
  }

  pressedFrequencies.value.forEach((frequency) => {
    console.log('Playing frequency:', frequency)
    pressedFrequency.value = frequency
    np.play(frequency)
    np_played.value = true
  })
})

// const usedKeys = [w, x, c, v, b, n]
// usedKeys.forEach((keyRef, index) => {
//   watch(keyRef, (pressed) => {
//     if (pressed) {
//       console.log(`Key "${keyNames[index]}" has been pressed`)
//     }
//   })
// })
</script>
