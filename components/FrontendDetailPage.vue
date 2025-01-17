<script setup lang="ts">
import { getProductName } from "@shopware-pwa/helpers-next";
import { useRouter } from "vue-router";

const props = defineProps<{
  navigationId: string;
}>();

const { search } = useProductSearch();
const { buildDynamicBreadcrumbs, pushBreadcrumb } = useBreadcrumbs();
const { apiClient } = useShopwareContext();
const router = useRouter();

const { data, error } = await useAsyncData(
  `cmsProduct${props.navigationId}`,
  async () => {
    const responses = await Promise.allSettled([
      search(props.navigationId, {
        withCmsAssociations: true,
        associations: {
          seoUrls: {},
          properties:{},
          categories: {
            associations: {
              media: {},
              seoUrls: {}, 
            },
          },
        },
      }),
      apiClient.invoke("readBreadcrumb get /breadcrumb/{id}", {
        pathParams: {
          id: props.navigationId,
        },
      }),
    ]);

    for (const response of responses) {
      if (response.status === "rejected") {
        console.error("[FrontendDetailPage.vue]", response.reason.message);
      }
    }

    return {
      productResponse:
        responses[0].status === "fulfilled" ? responses[0].value : null,
      breadcrumbs:
        responses[1].status === "fulfilled" ? responses[1].value : null,
    };
  }
);

const productResponse = ref(data.value?.productResponse);

if (data.value?.breadcrumbs) {
  buildDynamicBreadcrumbs(data.value.breadcrumbs.data);
}

if (!productResponse.value) {
  console.error("[FrontendDetailPage.vue]", error.value?.message);
  throw error.value;
}

useProductJsonLD(productResponse.value.product);

pushBreadcrumb({
  name: getProductName({ product: productResponse.value.product }) ?? "",
  path: `/${productResponse.value.product.seoUrls?.[0]?.seoPathInfo}`,
});

const { product } = useProduct(
  productResponse.value.product,
  productResponse.value.configurator
);

useCmsHead(product, { mainShopTitle: "Shopware Frontends Demo Store" });

const categories = ref(productResponse.value.product?.categories || []);
const properties = ref(productResponse.value.product?.properties || []);
const navigateToCategory = (category: any) => {
  const breadcrumbUrl = category.seoUrls?.[0]?.seoPathInfo;
  if (breadcrumbUrl) {
    router.push(`/${breadcrumbUrl}`);
  } else {
    console.error("Category breadcrumb URL not found.");
  }
};
</script>
<template>
  <LayoutBreadcrumbs />
  <div v-if="product?.cmsPage" class="container mx-auto bg-white flex flex-col">
    <CmsPage :content="product.cmsPage" />
    <div
      v-for="property in properties"
      :key="property.id"
    >
      <div class="p-4 border rounded">
        <h3 class="text-lg font-bold">{{ property.name }}</h3>
        <div v-html="property.value"></div>
      </div>
    </div>
  </div>
  <div
    v-if="!product?.cmsPage"
    class="container mx-auto bg-white flex flex-col"
  >
    <!-- Since Shopware Version 6.6.0.0 there should be always a cmsPage for products -->
    <span>😱 cmsPage is missing.</span>
  </div>

  <div v-if="categories.length" class="container mx-auto mt-4">
    <h2 class="text-lg font-bold">Categories</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="p-4 border rounded cursor-pointer"
        @click="navigateToCategory(category)"
      >
        <img
          :src="category?.media?.url || 'https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
          :alt="category?.media?.alt || category.name"
          class="w-full h-32 object-cover rounded"
        />
        <h3 class="mt-2 font-semibold">{{ category.name }}</h3>
        <p class="text-sm text-gray-600" v-html="category.description"></p>
      </div>
    </div>
  </div>
</template>
