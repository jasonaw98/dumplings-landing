import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  pixelBasedPreset,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export type PaymentFailedEmailProps = {
  fullName?: string;
  orderNumber?: string;
  amount?: string;
  billUrl: string;
  baseUrl?: string;
};

const defaultBaseUrl =
  typeof process !== "undefined" && process.env?.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://dumplingbois.com";

export const PaymentFailedEmail = ({
  fullName = "there",
  orderNumber,
  amount,
  billUrl,
  baseUrl = defaultBaseUrl,
}: PaymentFailedEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            fontFamily: {
              outfit: [
                "Outfit",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                "sans-serif",
              ],
            },
            extend: {
              colors: {
                orange: {
                  50: "#fff7ed",
                  100: "#ffedd5",
                  500: "#f97316",
                  600: "#ea580c",
                },
              },
            },
          },
        }}
      >
        <Body className="bg-[#f5f5f5] font-outfit">
          <Preview>
            Your payment wasn’t completed. Complete your Dumpling Bois order
            here.
          </Preview>
          <Container className="my-[20px] mx-auto w-[600px] max-w-full rounded-2xl overflow-hidden border border-[#ffedd5] bg-[#fff7ed]">
            {/* Header */}
            <Section className="py-8 px-10 text-center border-b border-[#ffedd5] bg-white">
              <Img
                src={`${baseUrl}/logo.png`}
                width="48"
                height="48"
                alt="Dumpling Bois"
                className="mx-auto mb-4"
              />
              <Text className="m-0 text-xs font-semibold text-[#ea580c] uppercase tracking-wider">
                ✨ Freshly Made Dumplings
              </Text>
              <Heading className="m-0 mt-2 text-[28px] leading-tight font-bold text-[#111827]">
                Payment not completed
              </Heading>
              <Text className="m-0 mt-3 text-[15px] text-[#4b5563]">
                Hi {fullName}, your payment for this order hasn’t gone through
                yet. No worries—you can complete it anytime using the link
                below.
              </Text>
              {orderNumber ? (
                <Text className="m-0 mt-2 text-[14px] font-semibold text-[#6b7280]">
                  Order {orderNumber}
                  {amount ? ` · RM ${amount}` : ""}
                </Text>
              ) : null}
            </Section>

            {/* CTA: Complete payment */}
            <Section className="py-8 px-10 text-center">
              <Link
                href={billUrl}
                className="inline-block py-4 px-8 rounded-xl text-[16px] font-bold text-white bg-[#ea580c] no-underline"
              >
                Complete payment
              </Link>
              <Text className="m-0 mt-4 text-[14px] text-[#6b7280]">
                Or copy and paste this link into your browser:
              </Text>
              <Link
                href={billUrl}
                className="m-0 mt-2 text-[13px] text-[#ea580c] break-all"
              >
                {billUrl}
              </Link>
            </Section>

            <Hr className="border-[#ffedd5] m-0" />

            {/* Note */}
            <Section className="py-6 px-10 bg-[#fef3c7] border-b border-[#fde68a]">
              <Text className="m-0 text-[14px] text-[#92400e] leading-relaxed text-center">
                This link is for your order only. If you didn’t place an order
                with us, you can ignore this email.
              </Text>
            </Section>

            <Hr className="border-[#e5e5e5] m-0" />

            {/* Footer */}
            <Section className="py-6 px-10 text-center">
              <Text className="m-0 text-[20px] font-bold text-[#ea580c]">
                🥟 Dumpling Bois
              </Text>
              <Link
                href={baseUrl}
                className="text-[14px] text-[#6b7280] mt-2 inline-block"
              >
                Visit our site
              </Link>
            </Section>

            <Section className="py-4 px-10 text-center">
              <Text className="m-0 text-[12px] text-[#9ca3af]">
                You received this email because you started a checkout at
                Dumpling Bois.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PaymentFailedEmail;
