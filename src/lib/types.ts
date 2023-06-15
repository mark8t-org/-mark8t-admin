export type EmailParams = {
	lang: string;
};

export type EmailWithRestParams = {
	[key: string]: string | { description: string };
};

export type EmailsWithRestParameters = EmailWithRestParams & {
	'shipping-confirmation': string;
	'payment-confirmation': string;
	'password-reset': string;
	'account-creation': string;
	'abandoned-cart': string;
	'back-in-stock': string;
	'new-product-launch': string;
	'sale-or-promotion': string;
	'feedback-request': string;
	'customer-appreciation': string;
	'upselling-and-cross-selling': string;
	'reorder-reminders': string;
	'positive-review-request': string;
	'negative-review-request': string;
	'customer-loyalty-program': string;
	'gift-card-purchase': string;
	'gift-card-redemption': string;
	'return-or-exchange': string;
	'cancelled-order': string;
	refund: string;
	'customer-support': string;
	'order-confirmation': string;
	'order-tracking': string;
	'order-update': string;
	'order-cancelled': string;
	'order-refund': string;
	'order-shipped': string;
	'order-delivered': string;
	'order-returned': string;
};