<template>
  <div class="flex flex-col gap-4 w-[40vw]">
    <div class="flex flex-col bordered">
      <label :for="toggle_temperament_text">
        {{ toggle_temperament_text }}
        <div>
          <button
            @click="toggle_temperament = true"
            :class="{ 'text-[var(--bg-color)] !bg-[var(--text-color)]': toggle_temperament }"
          >
            ON
          </button>
          <button
            @click="toggle_temperament = false"
            :class="{ 'text-[var(--bg-color)] !bg-[var(--text-color)]': !toggle_temperament }"
          >
            OFF
          </button>
        </div>
      </label>

      <hr />
      <div class="flex flex-col gap-4" :disabled="!toggle_temperament || null">
        <label :for="concert_pitch_text">
          {{ concert_pitch_text }}
          <i class="icon-[ph--bell-simple]"></i>
          <br />
          <input
            :id="concert_pitch_text"
            v-model="concert_pitch"
            type="number"
            :placeholder="concert_pitch_text"
            :disabled="!toggle_temperament"
          />
        </label>

        <label :for="temperament_text" class="align-middle">
          {{ temperament_text }}
          <i class="icon-[ph--divide] mr-2"></i>
          <select v-model="temperament" :id="temperament_text" :disabled="!toggle_temperament">
            <option :key="index" v-for="(type, index) in temperaments" :value="type">
              {{ type }}
            </option>
          </select>
        </label>

        <label :for="note_name_text">
          {{ note_name_text }}
          <i class="icon-[ph--music-note-simple]"></i>
          <br />
          <input
            :id="note_name_text"
            v-model="note_name"
            type="text"
            :placeholder="note_name_text"
            :disabled="!toggle_temperament"
          />
        </label>

        <label :for="steps_text">
          {{ steps_text }}
          <i class="icon-[ph--ladder-simple]"></i>
          <br />
          <input
            :id="steps_text"
            v-model="steps"
            type="number"
            :placeholder="steps_text"
            :disabled="!toggle_temperament"
            :min="MIN_STEPS"
            :max="MAX_STEPS"
          />
          <br />
          <input
            type="range"
            v-model.number="steps"
            :id="steps_text"
            :min="MIN_STEPS"
            :max="MAX_STEPS"
            :disabled="!toggle_temperament"
          />
        </label>
      </div>
    </div>

    <div class="flex flex-col bordered">
      <label :for="note_frequency_text">
        {{ note_frequency_text }}
        <i class="icon-[ph--bell-simple-ringing]"></i>
        <br />
        <input
          :id="note_frequency_text"
          v-model="note_frequency"
          type="number"
          :placeholder="note_frequency_text"
          :min="MIN_FREQEUNCY"
          :max="MAX_FREQEUNCY"
        />
        <br />
        <input
          type="range"
          v-model="note_frequency"
          :id="note_frequency_text"
          :min="MIN_FREQEUNCY"
          :max="MAX_FREQEUNCY"
        />
      </label>
      <span class="relative inline-flex mx-auto">
        <button @click="playNote()">
          <i v-if="is_playing" class="icon-[ph--megaphone] mr-2"></i>
          <span>{{ play_button_text }}</span>

          <span v-if="is_playing" class="absolute top-0 right-0 -mt-1 -mr-1 flex size-3">
            <span
              class="absolute h-full w-full animate-ping rounded-full bg-[var(--main-color)] opacity-75"
            ></span>
            <span class="relative size-3 rounded-full bg-[var(--main-color)]"></span>
          </span>
        </button>
      </span>

      <label :for="volume_text">
        {{ volume_text }}
        <i class="icon-[ph--speaker-high]"></i>
        <input :id="volume_text" type="range" v-model="volume" min="0" max="100" />
        {{ volume }}%
      </label>
      <label :for="oscillator_type_text" class="align-middle">
        {{ oscillator_type_text }}
        <span class="align-middle mr-2" :class="oscillator_icon"></span>
        <select v-model="oscillator_type" :id="oscillator_type_text">
          <option :key="index" v-for="(type, index) in oscillator_types" :value="type">
            {{ type }}
          </option>
        </select>
      </label>
    </div>
  </div>

  <Piano />
</template>

<script setup lang="ts">
// import notePlayer from 'noteplayer' // uncomment and use "npm run link" to use the local version
import notePlayer from 'noteplayer.js'
import { computed, ref, watch } from 'vue'
import Piano from './Piano.vue'

const note_frequency = ref(440)
const note_frequency_text = 'Frequency'

const np = new notePlayer()

const is_playing = ref(false)
const play_button_text = computed(() => (!is_playing.value ? 'Play note' : 'Playing note...'))
const np_initialized = ref(false)
function playNote() {
  if (!np_initialized.value) {
    np.init()
    np_initialized.value = true
  }
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
  if (toggle_temperament.value) steps.value = np.getStepsFromFrequency(note_frequency.value)
})

const volume = ref(50)
const volume_text = 'Volume'
watch(volume, () => {
  np.setGain(volume.value / 100)
})

const oscillator_type_text = 'Oscillator type'
const oscillator_types = ref<OscillatorType[]>(['sine', 'square', 'triangle', 'sawtooth'])
const oscillator_type = ref<OscillatorType>(oscillator_types.value[0])
const oscillator_icon = computed(
  () => `icon-[ph--wave-${oscillator_type.value}${is_playing.value ? '-duotone' : ''}]`,
)
watch(oscillator_type, () => {
  np.setOscillatorType(oscillator_type.value)
})

const toggle_temperament = ref(true)
const toggle_temperament_text = 'Toggle Tone Equal Temperament'

const concert_pitch_text = 'A4 Frequency (Concert pitch)'
const concert_pitch = ref(440)
watch(concert_pitch, () => {
  np.setConcertPitch(concert_pitch.value)
  updateLowestMetrics()
})

const lowest_metrics = ref(np.getLowestMetrics())
function updateLowestMetrics() {
  lowest_metrics.value = np.getLowestMetrics()
}
const MIN_FREQEUNCY = computed(() => lowest_metrics.value.frequency)
const MIN_STEPS = computed(() => lowest_metrics.value.step)
const MAX_FREQEUNCY = 20000
const MAX_STEPS = np.getStepsFromFrequency(MAX_FREQEUNCY)

type Temperament = 12
const temperament_text = ref('Temperament')
const temperaments = ref<Temperament[]>([12])
const temperament = ref<Temperament>(temperaments.value[0])
watch(temperament, () => {
  np.setTemperament(temperament.value)
  updateLowestMetrics()
})

const note_name_text = 'Note name'
const note_name = ref('A4')
watch(note_name, () => {
  note_frequency.value = np.getFrequencyFromNoteName(note_name.value)
})

const steps_text = 'Steps'
const steps = ref<number>(0)
watch(steps, () => {
  note_frequency.value = np.getFrenquencyFromSteps(steps.value)
  note_name.value = np.getNoteNameFromSteps(steps.value)
})
</script>
