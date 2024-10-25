<template>
	<AppLayout>
		<UsePreloader>
			<HeaderSpacer />
			<div class="container">
				<Breadcrumbs />
			</div>
			<div
				class="container _drop-tw cart-main"
				v-if="cart.totalCartQuantity.value > 0"
			>
				<CheckoutControlsBar />
				<div class="checkout-content-layout mb-4">
					<div class="">
						<CheckoutFormSection
							:title="$t('checkout_shipping_title')"
							:description="$t('checkout_shipping_description')"
							id="shipping"
							class="mb-3-5"
						>
							<div class="grid gap-0-25 mb-1">
								<CheckoutField
									name="shipping_provider"
									:field="
										checkoutStore.formSchema
											.shipping_provider
									"
									class="grid-col-6 grid-tw-col-12"
								/>
								<CheckoutField
									name="shipping_method"
									:field="
										checkoutStore.formSchema.shipping_method
									"
									class="grid-col-6 grid-tw-col-12"
								/>
							</div>
							<div class="grid gap-0-25 mb-0-75">
								<CheckoutField
									name="shipping_town"
									:field="
										checkoutStore.formSchema.shipping_town
									"
									class="grid-col-12"
								/>
								<CheckoutField
									name="shipping_area"
									:field="
										checkoutStore.formSchema.shipping_area
									"
									class="grid-col-12"
								/>
								<CheckoutField
									name="shipping_area"
									:field="
										checkoutStore.formSchema
											.shipping_address
									"
									class="grid-col-12"
								/>
								<CheckoutField
									name="shipping_department"
									:field="
										checkoutStore.formSchema
											.shipping_department
									"
									class="grid-col-12"
								/>
								<CheckoutField
									name="shipping_postal_machine"
									:field="
										checkoutStore.formSchema
											.shipping_postal_machine
									"
									class="grid-col-12"
								/>
							</div>
						</CheckoutFormSection>
						<CheckoutFormSection
							:title="$t('checkout_payment_title')"
							id="payment"
							class="mb-3-5"
						>
							<CheckoutField
								name="payment_method"
								:field="checkoutStore.formSchema.payment_method"
								class="grid-col-12"
							/>
						</CheckoutFormSection>

						<CheckoutFormSection
							:title="$t('checkout_about_customer_title')"
							:description="
								$t('checkout_about_customer_description')
							"
							id="recipient"
						>
							<CheckoutField
								name="customer_name"
								:field="checkoutStore.formSchema.customer_name"
								class="mb-0-25"
							/>
							<CheckoutField
								name="customer_surname"
								:field="
									checkoutStore.formSchema.customer_surname
								"
								class="mb-0-25"
							/>
							<CheckoutField
								name="customer_phone"
								:field="checkoutStore.formSchema.customer_phone"
								class="mb-0-25"
							/>
							<CheckoutField
								name="customer_email"
								:field="checkoutStore.formSchema.customer_email"
								class="mb-0-25"
							/>
							<CheckoutField
								name="customer_message"
								:field="
									checkoutStore.formSchema.customer_message
								"
							/>
						</CheckoutFormSection>
						<BaseButton
							class="mt-2 checkout-section"
							:disabled="!checkoutStore.formIsValid.value"
							@click="() => checkoutStore.submitForm()"
							:theme="
								checkoutStore.formIsValid.value
									? 'accent'
									: 'secondary'
							"
							size="large"
							id="confirmation"
						>
							{{ $t('send') }}
						</BaseButton>
					</div>
					<div class="checkout-content-layout__aside">
						<CheckoutCart class="checkout__cart" />
					</div>
				</div>
			</div>
			<EmptyCart v-else />
		</UsePreloader>
	</AppLayout>
</template>

<script setup lang="ts">
import BaseButton from '~/components/BaseButton.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import CheckoutCart from '~/components/CheckoutCart.vue';
import CheckoutControlsBar from '~/components/CheckoutControlsBar.vue';
import CheckoutFormSection from '~/components/CheckoutFormSection.vue';
import EmptyCart from '~/components/EmptyCart.vue';
import HeaderSpacer from '~/components/HeaderSpacer.vue';
import UsePreloader from '~/components/UsePreloader.vue';
import AppLayout from '~/layouts/AppLayout.vue';
import useCartStore from '~/store/useCartStore';
import CheckoutField from '~/components/CheckoutField.vue';
import { useCheckoutFormStore } from '~/store/useCheckoutFormStore';

const checkoutStore = useCheckoutFormStore();

const cart = useCartStore();

const { t } = useI18n();
useHead({
	title: t('cart'),
	meta: [
		{
			name: 'robots',
			content: 'noindex, nofollow'
		}
	]
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.cart-main {
	background: #fff;
}
.checkout-content-layout {
	padding: var(--size-2-5);
	display: grid;
	grid-template-columns: 1fr 512px;
	gap: 2rem;
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}

.checkout__cart {
	position: sticky;
	top: calc(var(--header-height) + 3.9375rem);
	min-height: min(100vh - var(--header-height) - 3.9375rem, 37.5rem);
	overflow: hidden;
}
.checkout-content-layout__aside {
	@media (max-width: $mobile-width) {
		order: -1;
	}
}
</style>
