import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  pixelBasedPreset,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export type ConfirmationEmailCartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type ConfirmationEmailProps = {
  orderNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  orderDate?: string;
  items?: any[];
  totalPrice?: number;
  baseUrl?: string;
};

const defaultBaseUrl =
  typeof process !== "undefined" && process.env?.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://dumplingbois.com";

export const ConfirmationEmail = ({
  orderNumber = `#${Date.now().toString().slice(-8)}`,
  firstName = "there",
  lastName = "",
  email = "customer@example.com",
  phone = "",
  address = "123 Dumpling Lane",
  city = "Kuala Lumpur",
  zip = "50000",
  orderDate = new Date().toLocaleDateString("en-MY", {
    dateStyle: "long",
  }),
  items = [
    {
      id: 1,
      name: "Shrimp",
      price: 25.5,
      image: "/fillings/shrimp.png",
      quantity: 2,
    },
    {
      id: 2,
      name: "Mushroom",
      price: 23.5,
      image: "/fillings/mushroom.png",
      quantity: 1,
    },
  ],
  totalPrice = 74.5,
  baseUrl = defaultBaseUrl,
}: ConfirmationEmailProps) => {
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const displayTotal = totalPrice.toFixed(2);

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
            Your Dumpling Bois order is confirmed. Order {orderNumber} – thank
            you, {firstName}!
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
                ✨ Not Your Grandma&apos;s Dumplings
              </Text>
              <Heading className="m-0 mt-2 text-[28px] leading-tight font-bold text-[#111827]">
                Order Confirmed! 🎉
              </Heading>
              <Text className="m-0 mt-3 text-[15px] text-[#4b5563]">
                Thank you for your order, {firstName}! We&apos;ve received your
                details and payment receipt.
              </Text>
              <Text className="m-0 mt-2 text-[14px] font-semibold text-[#6b7280]">
                Order {orderNumber}
              </Text>
            </Section>

            {/* Order summary */}
            <Section className="py-6 px-10">
              <Text className="m-0 mb-4 text-base font-bold text-[#111827]">
                Order Summary
              </Text>
              {items.map((item) => (
                <Row key={item.id} className="mb-4">
                  <Column className="align-top" width="80">
                    <Img
                      src={
                        item.image.startsWith("http")
                          ? item.image
                          : `${baseUrl}${item.image}`
                      }
                      alt={item.name}
                      width="72"
                      height="72"
                      className="rounded-lg bg-white border border-[#ffedd5]"
                    />
                  </Column>
                  <Column className="pl-4 align-top">
                    <Text className="m-0 text-[15px] font-semibold text-[#111827]">
                      {item.name}
                    </Text>
                    <Text className="m-0 text-[14px] text-[#6b7280]">
                      Qty: {item.quantity} × RM {item.price.toFixed(2)}
                    </Text>
                    <Text className="m-0 mt-1 text-[14px] font-semibold text-[#ea580c]">
                      RM {(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Column>
                </Row>
              ))}
              <Hr className="border-[#ffedd5] my-4" />
              <Row>
                <Column>
                  <Text className="m-0 text-[15px] font-bold text-[#111827]">
                    Total
                  </Text>
                </Column>
                <Column align="right">
                  <Text className="m-0 text-[20px] font-bold text-[#ea580c]">
                    RM {displayTotal}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-[#ffedd5] m-0" />

            {/* Delivery info */}
            <Section className="py-6 px-10">
              <Text className="m-0 mb-2 text-base font-bold text-[#111827]">
                Delivery information
              </Text>
              <Row>
                <Column width="50%">
                  <Text className="m-0 text-[14px] font-semibold text-[#374151]">
                    {fullName}
                  </Text>
                  {phone ? (
                    <Text className="m-0 text-[14px] text-[#6b7280]">
                      {phone}
                    </Text>
                  ) : null}
                  <Text className="m-0 text-[14px] text-[#6b7280]">{email}</Text>
                </Column>
                <Column>
                  <Text className="m-0 text-[14px] text-[#6b7280]">
                    {address}
                  </Text>
                  <Text className="m-0 text-[14px] text-[#6b7280]">
                    {city}, {zip}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-[#ffedd5] m-0" />

            {/* Order details */}
            <Section className="py-6 px-10">
              <Row>
                <Column className="w-[50%]">
                  <Text className="m-0 text-[13px] font-bold text-[#6b7280] uppercase tracking-wide">
                    Order number
                  </Text>
                  <Text className="m-0 mt-1 text-[14px] font-semibold text-[#111827]">
                    {orderNumber}
                  </Text>
                </Column>
                <Column>
                  <Text className="m-0 text-[13px] font-bold text-[#6b7280] uppercase tracking-wide">
                    Order date
                  </Text>
                  <Text className="m-0 mt-1 text-[14px] font-semibold text-[#111827]">
                    {orderDate}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* What's next */}
            <Section className="py-6 px-10 bg-[#ea580c]">
              <Text className="m-0 text-base font-bold text-white">
                What&apos;s next?
              </Text>
              <Text className="m-0 mt-2 text-[14px] text-white/95 leading-relaxed">
                We&apos;ve received your order and receipt. Our team will verify
                your payment and get in touch if needed. Your dumplings will be
                prepared fresh—we&apos;ll see you soon!
              </Text>
            </Section>

            <Hr className="border-[#ffedd5] m-0" />

            {/* Footer */}
            <Section className="py-6 px-10 bg-[#f7f7f7]">
              <Text className="m-0 text-[15px] font-bold text-[#111827]">
                Need help?
              </Text>
              <Text className="m-0 mt-2 text-[14px] text-[#6b7280]">
                Reply to this email or contact us if you have any questions
                about your order.
              </Text>
            </Section>

            <Hr className="border-[#e5e5e5] m-0" />

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
                You received this email because you placed an order at Dumpling
                Bois.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmail;
