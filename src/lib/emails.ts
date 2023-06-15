import type {
	EmailParams,
	EmailsWithRestParameters
} from './types';

const lang = 'en';

//...
export const emailsWithRestParamaters: EmailsWithRestParameters = {
	'shipping-confirmation': buildEmailUrl(
		'shipping-confirmation.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	'payment-confirmation': buildEmailUrl(
		'payment-confirmation.php',
		{
			lang,
			name: 'Jane',
			order_id: '67890',
			total_amount: '100.00',
			payment_method: 'Credit+Card'
		}
	),
	'password-reset': buildEmailUrl('password-reset.php', { lang, token: '123456' }),
	'account-creation': buildEmailUrl(
		'account-creation.php',
		{
			lang,
			name: 'Jane',
			email: 'jane@example.com',
			password: 'abc123'
		}
	),
	'abandoned-cart': buildEmailUrl(
		'abandoned-cart.php',
		{
			lang,
			cart_id: 'abc123',
			items: '2',
			coupon_code: 'SUMMER10'
		}
	),
	'back-in-stock': buildEmailUrl(
		'back-in-stock.php',
		{
			lang,
			product_name: 'Nike%20Running%20Shoes',
			product_link: 'https://mark8t.ca/products/123',
			quantity_available: '10'
		}
	),
	'new-product-launch': buildEmailUrl(
		'new-product-launch.php',
		{
			lang,
			product_name: 'Nike%20Running%20Shoes%20V3',
			product_link: 'https://mark8t.ca/products/456',
			product_details: 'New%20technology%20insole%20for%20extra%20cushioning'
		}
	),
	'sale-or-promotion': buildEmailUrl(
		'sale-or-promotion.php',
		{
			lang,
			promo_code: 'SUMMERSALE',
			start_date: '2022-06-01',
			end_date: '2022-06-30',
			discount: '20%'
		}
	),
	'feedback-request': buildEmailUrl('feedback-request.php', { lang, survey_link: 'https://mark8t.ca/survey' }),
	'customer-appreciation': buildEmailUrl(
		'customer-appreciation.php',
		{
			lang,
			discount_code: 'BIRTHDAY10',
			expiration_date: '2023-12-31'
		}
	),
	'Upselling and Cross-selling': {
		description: 'Sent to customers with products related to their purchase history.'
	},
	'upselling-and-cross-selling': buildEmailUrl(
		'upselling-and-cross-selling.php',
		{
			lang,
			product_name: 'Nike%20Running%20Shoes',
			product_link: 'https://mark8t.ca/products/123',
			quantity_available: '10'
		}
	),
	'reorder-reminders': buildEmailUrl(
		'reorder-reminders.php',
		{
			lang,
			product_name: 'Toothpaste',
			discount_code: 'REORDER20'
		}
	),
	'positive-review-request': buildEmailUrl(
		'positive-review-request.php',
		{
			lang,
			product_name: 'Nike%20Running%20Shoes',
			product_link: 'https://mark8t.ca/products/123',
			review_link: 'https://mark8t.ca/review/123'
		}
	),
	'negative-review-request': buildEmailUrl(
		'negative-review-request.php',
		{
			lang,
			product_name: 'Nike%20Running%20Shoes',
			product_link: 'https://mark8t.ca/products/123',
			review_link: 'https://mark8t.ca/review/123'
		}
	),
	'customer-loyalty-program': buildEmailUrl(
		'customer-loyalty-program.php',
		{
			lang,
			discount_code: 'LOYALTY10',
			expiration_date: '2023-12-31'
		}
	),
	'gift-card-purchase': buildEmailUrl(
		'gift-card-purchase.php',
		{
			lang,
			gift_card_code: 'abc123',
			amount: '100.00',
			expiration_date: '2023-12-31'
		}
	),
	'gift-card-redemption': buildEmailUrl(
		'gift-card-redemption.php',
		{
			lang,
			gift_card_code: 'abc123',
			amount: '100.00',
			expiration_date: '2023-12-31'
		}
	),
	'return-or-exchange': buildEmailUrl(
		'return-or-exchange.php',
		{
			lang,
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	'cancelled-order': buildEmailUrl(
		'cancelled-order.php',
		{
			lang,
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	refund: buildEmailUrl(
		'refund.php',
		{
			lang,
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	/* OTHERS */
	'customer-support': buildEmailUrl(
		'customer-support.php',
		{
			lang,
			ticket_id: 'abc123',
			ticket_subject: 'Order%20Issue',
			ticket_status: 'Open'
		}
	),
	'order-confirmation': buildEmailUrl(
		'order-confirmation.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			total_amount: '100.00',
			payment_method: 'Credit+Card'
		}
	),
	'order-tracking': buildEmailUrl(
		'order-tracking.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	'order-update': buildEmailUrl(
		'order-update.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			order_status: 'Shipped'
		}
	),
	'order-cancelled': buildEmailUrl(
		'order-cancelled.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			order_status: 'Cancelled'
		}
	),
	'order-refund': buildEmailUrl(
		'order-refund.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			refund_amount: '100.00',
			refund_method: 'Credit+Card'
		}
	),
	'order-shipped': buildEmailUrl(
		'order-shipped.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	'order-delivered': buildEmailUrl(
		'order-delivered.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			tracking_number: 'XYZ123',
			estimated_delivery: '2022-12-31'
		}
	),
	'order-returned': buildEmailUrl(
		'order-returned.php',
		{
			lang,
			name: 'John',
			order_id: '12345',
			tracking: ''
		}
	)
};

//...
export function buildEmailUrl(endpoint: EmailsWithRestParameters, params: EmailParams) {
	const paramString = Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

	const mark8tUrl = import.meta.env.VITE_API_DOMAIN as string;

	if (!mark8tUrl) {
		throw new Error('VITE_MARK8T_URL environment variable is not set.');
	}

	return `${mark8tUrl}/api/dev/mail/${endpoint}?lang=${encodeURIComponent(lang)}&${paramString}`;
}