<script setup>
</script>
<template>
    <div class="chat-window">
        <div class="chat-message">
            <img src="../assets/image/welcome.png" alt="" class="doctor-img"/>
            <span class="g-title">我是你的家庭医生助手，很高兴见到您！</span>
            <span class="g-span">无论你想了解各种疾病的症状、治疗方法，还是关心日常养生，我都能为您提供科学的解答和贴心的建议。</span>
        </div>
    </div>
</template>
<style lang="css" scoped>
.chat-window {
    width: 100%;
    margin-left: 230px;
    display: flex;
}
.chat-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    padding-bottom: 90px;
}
.doctor-img {
    width: 320px;
    border-radius: 40px;
}
.g-title {
    font-size: 25px;
    padding-top: 15px;
}
.g-span {
    padding-top: 15px;

}
</style>