<template>
  <div class="relative pt-[96px] px-[16px] sm:px-[48px] bg-brand-light-gray">
    <AppModalComments
      v-if="isOpenModalComment"
      :is-open="isOpenModalComment"
      :comment="comment"
      @close="isOpenModalComment = false"
    />

    <div
      class="absolute left-1/2 transform -translate-x-1/2 top-0 mx-0 w-screen h-full bg-brand-light-gray"
    />

    <h1 class="text-4xl md:text-[56px] mb-8 uppercase w-fit font-bold relative">
      {{ $t('profile.title') }}
    </h1>

    <n-tabs
      v-model:value="activeTab"
      class="relative overflow-hidden"
      type="line"
      animated
    >
      <n-tab-pane name="profile" :tab="$t('common.profileMenu.profile')">
        <div
          class="hidden md:block mt-[48px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <div class="flex items-center gap-[16px]">
            <div
              class="bg-brand-light-gray rounded-[1000px] w-[96px] h-[96px]"
            />
            <div>
              <h2 class="text-[24px] font-medium">
                {{
                  user?.user?.first_name || user?.user?.last_name
                    ? `${user.user.first_name || ''} ${
                        user.user.last_name || ''
                      }`
                    : $t('common.you')
                }}
              </h2>
              <p class="text-gray-400">
                {{ user?.user?.email || '' }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="mt-[48px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <div class="md:hidden">
            <div class="flex items-center gap-[16px]">
              <div
                class="bg-brand-light-gray rounded-[1000px] w-[96px] h-[96px]"
              />
              <div>
                <h2 class="text-[24px] font-medium">
                  {{
                    user?.user?.first_name || user?.user?.last_name
                      ? `${user.user.first_name || ''} ${
                          user.user.last_name || ''
                        }`
                      : $t('common.you')
                  }}
                </h2>
                <p class="text-gray-400">
                  {{ user?.user?.email || '' }}
                </p>
              </div>
            </div>
          </div>

          <form
            ref="userForm"
            class="flex flex-col gap-[12px]"
            @submit.prevent="user.updateUser(user.user)"
          >
            <div class="flex flex-col sm:flex-row gap-[12px]">
              <div class="flex flex-col gap-[8px]">
                <p class="font-medium text-base xl:text-lg">
                  {{ $t('user.first_name') }}
                </p>
                <AppInput
                  v-model="user.user.first_name"
                  required
                  pattern=".{2,}"
                  :title="$t('user.nameRule')"
                  is-gray
                  @blur="checkValidity"
                />
              </div>

              <div class="flex flex-col gap-[8px]">
                <p class="font-medium text-base xl:text-lg">
                  {{ $t('user.last_name') }}
                </p>
                <AppInput
                  v-model="user.user.last_name"
                  required
                  pattern=".{2,}"
                  :title="$t('user.lastNameRule')"
                  is-gray
                  @blur="checkValidity"
                />
              </div>
            </div>

            <div class="flex flex-col gap-[8px]">
              <p class="font-medium text-base xl:text-lg">
                {{ $t('common.info.mail') }}
              </p>
              <AppInput
                v-model="user.user.email"
                placeholder="example@example.com"
                type="email"
                required
                is-gray
                @blur="checkValidity"
              />
            </div>

            <div class="flex flex-col gap-[8px]">
              <p class="font-medium text-base xl:text-lg">
                {{ $t('common.info.phone') }}
              </p>
              <AppInput
                v-model="user.user.phone_number"
                placeholder="+491112221212"
                pattern=".{9,16}"
                type="tel"
                required
                is-gray
                @blur="checkValidity"
              />
            </div>

            <AppButton
              class="mt-[24px] w-full"
              type="submit"
              :disabled="!userForm?.checkValidity() ?? false"
            >
              {{ $t('common.actions.save') }}
            </AppButton>
          </form>
        </div>

        <div
          class="my-[24px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] bg-white rounded-[12px] p-[36px]"
        >
          <h2 class="text-[24px] font-medium">
            {{ $t('common.actions.resetPassword') }}
          </h2>

          <form
            ref="passwordForm"
            class="flex flex-col gap-[12px]"
            @submit.prevent="changePassword"
          >
            <AppInput
              v-model="passwordChange.new_password1"
              :placeholder="$t('user.newPassword')"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :title="$t('user.passwordValidation')"
              @blur="checkValidity"
            />
            <AppInput
              v-model="passwordChange.new_password2"
              :placeholder="$t('user.repeatPassword')"
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :title="$t('user.passwordValidation')"
              @blur="checkValidity"
            />
            <p v-if="passwordError" class="text-brand-red mt-2 mb-2">
              {{ passwordError }}
            </p>
            <p v-if="passwordChanged" class="text-brand-gray mt-2 mb-2">
              {{ passwordChanged }}
            </p>
            <AppButton
              type="submit"
              class="mt-[24px] w-full"
              :disabled="!passwordForm?.checkValidity() ?? false"
            >
              {{ $t('common.actions.change') }}
            </AppButton>
          </form>
        </div>
      </n-tab-pane>
      <n-tab-pane name="visitors" :tab="$t('common.profileMenu.children')">
        <div class="mt-[48px]" />
        <template v-for="visitor in user.visitorsOrders" :key="visitor.id">
          <div class="rounded-[12px] bg-white p-[36px] mb-[24px]">
            <div class="flex flex-col justify-between gap-6">
              <div class="flex items-center gap-[16px]">
                <div
                  class="bg-brand-dark-gray rounded-[1000px] w-[96px] h-[96px]"
                />
                <h2 class="text-[24px] font-medium">
                  {{
                    visitor?.first_name || visitor?.last_name
                      ? `${visitor.first_name} ${visitor.last_name}`
                      : ''
                  }}
                </h2>
              </div>

              <AppDivider class="my-[36px]" />

              <ProductsTable
                class="w-full"
                :orders="visitor.orders"
                with-button
                @cancel="navigateTo('/profile?tab=visitors')"
              />
            </div>
          </div>
        </template>
      </n-tab-pane>
      <n-tab-pane name="workshops" :tab="$t('common.profileMenu.workshops')">
        <div
          class="flex flex-col gap-[12px] bg-white p-[36px] rounded-[12px] mt-[48px] mb-[24px]"
        >
          <div class="overflow-x-scroll">
            <div class="min-w-[900px] w-full">
              <div class="grid grid-cols-4 gap-[12px] font-medium p-[16px]">
                <p>{{ $t('common.tableOptions.title') }}</p>
                <p>{{ $t('common.tableOptions.schedule') }}</p>
                <p>{{ $t('common.tableOptions.date') }}</p>
                <p>{{ $t('common.tableOptions.comment') }}</p>
              </div>

              <template
                v-if="
                  user.workshopOrders?.length &&
                  user.workshopOrders?.length !== 0
                "
              >
                <div
                  v-for="workshop in user.workshopOrders"
                  :key="workshop.id"
                  class="grid grid-cols-4 gap-[12px] bg-brand-light-gray p-[16px]"
                >
                  <p>{{ workshop.product_page?.name }}</p>
                  <p>
                    {{
                      workshop.product_page.schedule_slots
                        .map(slot => {
                          return `${slot.weekday.slice(
                            0,
                            2,
                          )} ${slot.start.slice(0, 5)}-${slot.end.slice(0, 5)}`
                        })
                        .join('; ')
                    }}
                  </p>
                  <p>{{ new Date(workshop.purchased_at).toDateString() }}</p>
                  <button
                    class="w-fit text-brand-black active:text-brand-red cursor-pointer underline underline-offset-8"
                    @click="openCommentModal(workshop)"
                  >
                    {{ $t('common.actions.look') }} →
                  </button>
                </div>
              </template>

              <template v-else>
                <div
                  class="px-[16px] bg-brand-light-gray py-[20px] rounded-[12px]"
                >
                  {{ $t('common.tableOptions.noActiveWorkshops') }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="sales" :tab="$t('common.profileMenu.history')">
        <div class="bg-white p-[36px] rounded-[12px] mt-[48px] mb-[24px]">
          <ProductsTable
            :orders="user.orders"
            with-button
            @cancel="handleCancelStatus"
          />
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup lang="ts">
import { NTabPane, NTabs, useNotification } from 'naive-ui'
import { onMounted, ref, type VNodeRef } from 'vue'
import { useRoute } from 'vue-router'

import AppModalComments from '@/components/modals/AppModalComments.vue'

import AppButton from '../components/AppButton.vue'
import AppDivider from '../components/AppDivider.vue'
import AppInput from '../components/AppInput.vue'
import ProductsTable from '../components/profile/ProductsTable.vue'
import { useUserStore } from '../store/user'

// Init hooks
const route = useRoute()

// Store
const user = useUserStore()
await user.getVisitors()
await user.getOrdersByVisitors()
await user.getOrders()
await user.getWorkshopOrders()

// if (process.client && !user.isLoggedIn && route.fullPath.includes('/profile')) {
//   // eslint-disable-next-line no-console
//   console.info('💥 The user is not logged in to the account!')
//   navigateTo('/')
// }

user.visitorsOrders = user.visitors.map(visitor => ({
  ...visitor,
  orders: user.ordersByVisitors[visitor.id],
}))

// State
const passwordChange = ref({
  new_password1: '',
  new_password2: '',
})

const activeTab = ref('profile')

const userForm = ref<VNodeRef | undefined>(undefined)
const passwordForm = ref<VNodeRef | undefined>(undefined)

const passwordError = ref('')
const passwordChanged = ref('')

const comment = ref('Nothing...')
const isOpenModalComment = ref(false)

const { t } = useI18n()

// Actions
const openCommentModal = workshop => {
  comment.value = workshop.comment
  isOpenModalComment.value = true
}

const handleCancelStatus = (id: any) => {
  user.orders = user.orders.map(order => {
    if (order.id === id) {
      order.state = 'cancelled'
    }
    return order
  })
}

const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const changePassword = async () => {
  await user
    .changePassword(
      passwordChange.value.new_password1,
      passwordChange.value.new_password2,
    )
    .catch(err => {
      if (Object.keys(err).length !== 0) {
        passwordError.value = 'Кажется, что-то пошло не так'
        setTimeout(() => {
          passwordError.value = ''
        }, 3000)
      }
    })

  if (passwordError.value === '') {
    passwordChanged.value = 'Успешно изменено!'
    setTimeout(() => {
      passwordChanged.value = ''
      passwordError.value = ''
      passwordChange.value.new_password1 = ''
      passwordChange.value.new_password2 = ''
    }, 3000)
  }
}

const notification = useNotification()

// Live hooks
onMounted(() => {
  if (route.query.tab) {
    if (['sales-success', 'sales-fail'].includes(route.query.tab as string)) {
      activeTab.value = 'sales'
      if (localStorage.getItem('notifyWasShown')) {
        notification[route.query.tab === 'sales-success' ? 'success' : 'error'](
          {
            title: t(
              route.query.tab === 'sales-success'
                ? 'common.successPayment'
                : 'common.failedPayment',
            ),
            duration: 2500,
            keepAliveOnHover: true,
          },
        )
        localStorage.setItem('notifyWasShown', 'yes')
      }
    } else {
      activeTab.value = route.query.tab as string
    }
  }
})
</script>
<style>
.n-tabs .n-tabs-tab .n-tabs-tab__label {
  font-size: 16px;
}

.n-tabs.n-tabs--line-type .n-tabs-tab.n-tabs-tab--active,
.n-tabs.n-tabs--bar-type .n-tabs-tab.n-tabs-tab--active {
  color: #db3b4d !important;
}

.n-tabs .n-tabs-bar {
  background-color: #db3b4d !important;
}

.n-tabs.n-tabs--line-type .n-tabs-tab:hover,
.n-tabs.n-tabs--bar-type .n-tabs-tab:hover {
  color: #db3b4d !important;
}
</style>
