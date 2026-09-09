<script setup lang="ts">

</script>

<template>
  <RouterView></RouterView>
</template>
<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f6f7fb;
}

body::-webkit-scrollbar {
  width: 0;
}

p,
div,
span {
  font-size: 16px;
  margin: 0;
  padding: 0;
  display: block;
}


.el-popper.is-customized {
  padding: 6px 12px;
  background-color: #876aff;
  color: white;
}
.el-popper.is-customized .el-popper__arrow::before {
  background: #876aff;
  right: 0;
}

.hidden-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  box-sizing: border-box;
}

@media (max-width: 1460px) {
  .chat-message {
    max-width: 900px !important;
  }
  .chat-input-flex {
    max-width: calc(900px - 32px) !important;
  }
}
@media (max-width: 1330px) {
  .chat-message {
    max-width: 800px !important;
  }
  .chat-input-flex {
    max-width: calc(800px - 32px) !important;
  }
}
@media (max-width: 1160px) {
  .chat-message {
    max-width: 700px !important;
  }
  .chat-input-flex {
    max-width: calc(700px - 32px) !important;
  }
}
@media (max-width: 1060px) {
  .chat-message {
    width: 700px !important;
  }
  .chat-input-flex {
    width: calc(700px - 32px) !important;
  }
}
</style>
