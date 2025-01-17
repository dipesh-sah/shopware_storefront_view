<script setup lang="ts">
const { count } = useCart();
const { count: wishlistCount } = useWishlist();
const localePath = useLocalePath();
const { formatLink } = useInternationalization(localePath);

const miniCartModal = useMiniCartModal();
</script>

<template>
  <header class="relative" aria-label="top-navigation">
    <div class="mx-auto px-4 sm:px-6">
      <div
        class="flex items-center justify-evenly py-4 space-x-4"
      >
        <div class="flex justify-start items-center min-w-10 lg:min-w-12">
          <div class="order-2 lg:order-1 ml-4 lg:ml-0">
            <NuxtLink :to="formatLink(`/`)">
              <span class="sr-only">Shopware</span>
              <img
                src="/logo.svg"
                alt="logo of the shop"
              />
            </NuxtLink>
          </div>
          <div class="order-1 lg:order-2 flex justify-start items-center">
            <LayoutSideMenu />
          </div>
        </div>


        <div class="hidden md:flex md:min-w-1/4 bg-white rounded-lg">
          <LayoutStoreSearch />
        </div>

        <div class="flex items-center justify-end">
          <AccountMenu />
          <div class="flex ml-4 flow-root lg:ml-6">
            <NuxtLink
              class="group -m-2 p-2 flex items-center relative text-center"
              aria-label="wishlist"
              data-testid="wishlist-button"
              :to="formatLink(`/wishlist`)"
            >
              <div
                class="w-7 h-7 i-carbon-favorite text-secondary-600 hover:text-primary hover:animate-count-infinite hover:animate-heart-beat"
              />
              <ClientOnly>
                <span
                  v-if="wishlistCount"
                  class="text-3 font-sm text-white absolute bg-red-600 rounded-full min-w-5 min-h-5 top-0 right-0 leading-5"
                >
                  {{ wishlistCount }}
                </span>
              </ClientOnly>
            </NuxtLink>
          </div>
          <!-- Cart -->
          <div class="flex ml-4 flow-root lg:ml-6">
            <button
              class="group bg-transparent -m-2 p-2 flex items-center relative"
              aria-label="Mini cart"
              data-testid="cart-button"
              @click="miniCartModal.open"
            >
              <!-- Heroicon name: outline/shopping-bag -->
              <div
                class="w-7 h-7 i-carbon-shopping-bag text-secondary-600 hover:text-primary"
              />
              <span
                v-if="count > 0"
                class="text-3 font-sm text-white absolute bg-primary-600 rounded-full min-w-5 min-h-5 top-0 right-0 leading-5"
              >
                {{ count || "" }}
              </span>
              <span class="sr-only"
                >{{ $t("cart.itemsInCart") }}, {{ $t("cart.viewCart") }}</span
              >
            </button>
          </div>
          <CheckoutSideCart :controller="miniCartModal" />
        </div>
      </div>
        <LayoutTopNavigation />

    </div>
  </header>
</template>
