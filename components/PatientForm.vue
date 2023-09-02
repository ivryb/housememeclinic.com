<script setup>
import { useChat } from 'ai/vue';

import { random, tail, isEmpty } from 'lodash-es';

const housePrompt = ({ age, sex, complaints, history }) => {
  return `I want you to act like Doctor House performing differential diagnosis.
I want you to respond and answer like Gregory House using the tone, manner and vocabulary he would use.
You must know all of the knowledge of Doctor House.

Context:
Differential Diagnosis.
Patient: ${age} y. o. ${sex}.
Complaints: ${complaints}.
Medical history: ${history}.`;
};

const { messages, input, handleSubmit, error, isLoading, setMessages } =
  useChat({
    headers: { 'Content-Type': 'application/json' },
  });

const visibleMessages = computed(() => tail(messages.value));

const age = ref('');
const sex = ref('');
const complaints = ref('');
const history = ref('');

const videoNumber = ref(1);
const isVideoVisible = ref(false);

const questionsLeft = ref(5);
const patientInfo = ref('');

const isDiagnosting = computed(() => {
  return messages.value.length > 0;
});

async function customSubmit(event) {
  input.value = housePrompt({
    age: age.value,
    sex: sex.value,
    complaints: complaints.value,
    history: history.value,
  });

  videoNumber.value = random(1, 4);
  isVideoVisible.value = true;

  patientInfo.value = `${age.value}, ${sex.value}, ${complaints.value}, ${history.value}`;

  useTrackEvent('PatientSubmit', {
    props: {
      patientInfo: patientInfo.value,
    },
  });

  await handleSubmit(event);
}

const visibleErrorMessage = computed(() => {
  const message = error.value?.message;

  if (!message) return '';

  if (message.includes('402')) {
    return `Oops, looks like you're out of your 10 free daily messages(\nTry talk to House tomorrow, or contact us via Twitter (X): @ivryb`;
  }

  return message;
});

async function sendOneMoreQuestion() {
  if (isEmpty(input.value) || questionsLeft.value === 0) return;

  useTrackEvent('OneMoreQuestion', {
    props: {
      patientInfo: patientInfo.value,
      message: input.value,
    },
  });

  questionsLeft.value--;

  await handleSubmit(event);
}

function startNewPatient() {
  patientInfo.value = '';
  questionsLeft.value = 5;

  age.value = '';
  sex.value = '';
  complaints.value = '';
  history.value = '';

  input.value = '';

  setMessages([]);

  useTrackEvent('NewPatient (reset)');
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <form v-if="!isDiagnosting" @submit="customSubmit">
      <div class="form-control mt-6 w-full">
        <label class="label">
          <span class="label-text">Age</span>
        </label>
        <input
          v-model="age"
          type="number"
          class="input input-bordered input-accent input-lg w-full"
        />
      </div>
      <div class="form-control mt-6 w-full">
        <label class="label">
          <span class="label-text">Sex</span>
        </label>
        <select
          v-model="sex"
          type="text"
          class="select select-bordered select-accent select-lg w-full"
        >
          <option value="" disabled>Select an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div class="form-control mt-6 w-full">
        <label class="label">
          <span class="label-text">Complaints</span>
        </label>
        <input
          v-model="complaints"
          placeholder="What's bothering you?"
          type="text"
          class="input input-bordered input-accent input-lg w-full"
        />
      </div>
      <div class="form-control mt-6 w-full">
        <label class="label">
          <span class="label-text">Medical history</span>
        </label>
        <textarea
          v-model="history"
          placeholder="Any information about your previous or chronic diseases..."
          class="textarea textarea-bordered textarea-lg textarea-accent w-full"
        ></textarea>
      </div>
      <div class="mt-10 text-center">
        <button type="submit" class="btn btn-lg btn-primary">
          Differential!
        </button>
      </div>
    </form>

    <div v-if="isDiagnosting">
      <video :src="`/videos/${videoNumber}.mp4`" autoplay></video>

      <!-- chat window -->
      <div class="my-10">
        <div
          v-for="m in visibleMessages"
          key="m.id"
          class="chat"
          :class="m.role === 'user' ? 'chat-end' : 'chat-start'"
        >
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                class="m-0"
                :src="
                  m.role === 'user' ? '/avatars/user.png' : '/avatars/house.png'
                "
              />
            </div>
          </div>
          <div class="chat-bubble whitespace-pre-wrap">
            {{ m.content }}
          </div>
        </div>
      </div>
      <div v-if="visibleMessages.length > 0">
        <textarea
          class="textarea textarea-bordered textarea-md w-full"
          v-model.trim="input"
          placeholder="Write your message..."
        />
        <div class="text-right">
          <span class="mr-4">{{ questionsLeft }} questions left</span>
          <button class="btn btn-secondary btn-md" @click="sendOneMoreQuestion">
            Send
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-error mt-10">
      <span>{{ visibleErrorMessage }}</span>
    </div>

    <div class="text-center mt-16" v-if="isDiagnosting">
      <button class="btn btn-lg btn-neutral" @click="startNewPatient">
        New patient
      </button>
    </div>
  </div>
</template>
