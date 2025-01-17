<script setup lang="ts">
import type { Schemas } from "#shopware";

type CmsElementCategoryListing = Schemas["CmsSlot"] & {
    type: "category-listing" | typeof String;
    slot: typeof String;
    config: CmsElementCategoryListingConfig; // Replace 'any' with the correct type if known
};
type CmsElementCategoryListingConfig = {
  dailyUrl: {
    value: string;
    source: "static";
  };
};
const props = defineProps<{
  content: CmsElementCategoryListing;
}>();
console.log(props)
</script>