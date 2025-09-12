CREATE TABLE "merchant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"merchant_id" uuid NOT NULL,
	"store_name" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"personal_email" varchar(255) NOT NULL,
	"work_email" varchar(255) NOT NULL,
	"phone_number" varchar(50),
	"personal_address" jsonb NOT NULL,
	"work_address" jsonb NOT NULL,
	"business_type" varchar(100),
	"website" varchar(255),
	"business_description" text,
	"business_registration_number" varchar(255) NOT NULL,
	"business_registration_certificate" varchar(255),
	"store_logo_url" varchar(255),
	"password" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"commission_tier" varchar DEFAULT 'standard',
	"commission_rate" numeric(10, 2) DEFAULT '5.00',
	"account_balance" numeric(15, 2) DEFAULT '0.00',
	"total_sales" numeric(15, 2) DEFAULT '0.00',
	"total_payouts" numeric(15, 2) DEFAULT '0.00',
	"account_id" text,
	"payout_schedule" varchar DEFAULT 'weekly',
	"last_payout_date" timestamp,
	"banner" varchar(255),
	"policies" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "merchant_application_id_unique" UNIQUE("application_id"),
	CONSTRAINT "merchant_merchant_id_unique" UNIQUE("merchant_id"),
	CONSTRAINT "merchant_personal_email_unique" UNIQUE("personal_email"),
	CONSTRAINT "merchant_work_email_unique" UNIQUE("work_email"),
	CONSTRAINT "merchant_business_registration_number_unique" UNIQUE("business_registration_number")
);
--> statement-breakpoint
CREATE TABLE "admin_logs" (
	"id" varchar PRIMARY KEY NOT NULL,
	"admin_id" varchar NOT NULL,
	"action" text NOT NULL,
	"target_type" text NOT NULL,
	"target_id" varchar NOT NULL,
	"details" jsonb,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'admin' NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "admins_username_unique" UNIQUE("username"),
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "merchant_status_idx" ON "merchant" USING btree ("status");