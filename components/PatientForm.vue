<script setup>
import { useChat } from 'ai/vue';

import { random, tail } from 'lodash-es';

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

const { messages, input, handleSubmit } = useChat({
  headers: { 'Content-Type': 'application/json' },
});

const visibleMessages = computed(() => tail(messages.value));

const age = ref('');
const sex = ref('');
const complaints = ref('');
const history = ref('');

const videoNumber = ref(1);
const isVideoVisible = ref(false);
const isFormVisible = ref(true);

async function customSubmit(event) {
  input.value = housePrompt({
    age: age.value,
    sex: sex.value,
    complaints: complaints.value,
    history: history.value,
  });

  videoNumber.value = random(1, 4);
  isVideoVisible.value = true;
  isFormVisible.value = false;

  await handleSubmit(event);
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <form v-show="isFormVisible" @submit="customSubmit">
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

    <video
      v-if="isVideoVisible"
      :src="`/videos/${videoNumber}.mp4`"
      autoplay
    ></video>

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
        v-model="input"
        placeholder="Write your message..."
      />
      <div class="text-right">
        <button class="btn btn-secondary btn-md" @click="handleSubmit">
          Send
        </button>
      </div>
    </div>
  </div>
</template>
