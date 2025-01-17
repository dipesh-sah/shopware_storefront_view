<script setup lang="ts">
import type { Schemas } from "#showpare";

type CmsElementDailymotion = Schemas["CmsSlot"] & {
  type: "category-listing" | typeof String;
  config: CmsElementDailymotionConfig;
  translated: {
    config: CmsElementDailymotionConfig;
  };
};

type CmsElementDailymotionConfig = {
  categories: {
    source: string,
    value: [],
  },
};
const props = defineProps<{
  content: CmsElementDailymotion;
}>();

console.log(props.content.config);
</script>

<template>
  <div>
    <h2>Element!</h2>
    <div class="sw-cms-el-dailymotion">
      <div class="sw-cms-el-dailymotion-iframe-wrapper">
        <iframe
          frameborder="0"
          type="text/html"
          width="100%"
          height="500px"
          :src="`https://www.dailymotion.com/embed/video/${props.content.config.dailyUrl.value}`"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>