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
  } from '@react-email/components';
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://react-email-demo-jefuq217q-resend.vercel.app';
  
  export const ConfirmationEmail = () => (
    <Html>
      <Head />
      <Tailwind config={{
          presets: [pixelBasedPreset],
          theme: {
            fontFamily: {
                    nike: ['-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        'Oxygen-Sans',
                        'Ubuntu',
                        'Cantarell',
                        '"Helvetica Neue"',
                        'sans-serif',],
            },
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}>
        <Body className="bg-white font-nike">
          <Preview>
            Get your order summary, estimated delivery date and more
          </Preview>
          <Container className="my-[10px] mx-auto w-[600px] max-w-full border border-[#E5E5E5] bg-orange-50">
            <Section className="py-[22px] px-10 bg-[#F7F7F7]">
              <Row>
                <Column>
                                <Text className="m-0 text-[14px] leading-loose font-bold">
                    Tracking Number
                  </Text>
                  <Text className="mt-3 mb-0 font-medium text-[14px] leading-[1.4] text-[#6F6F6F]">
                    1ZV218970300071628
                  </Text>
                </Column>
                <Column align="right">
                  <Link className="border border-solid border-[#929292] text-[16px] no-underline py-[10px] px-0 w-[220px] block text-center font-medium text-black">
                    Track Package
                  </Link>
                </Column>
              </Row>
            </Section>
            <Hr className="border-[#E5E5E5] m-0" />
            <Section className="py-10 px-[74px] text-center">
              <Img
                src={`${baseUrl}/static/nike-logo.png`}
                width="66"
                height="22"
                alt="Nike"
                className="mx-auto"
              />
              <Heading className="text-[32px] leading-[1.3] font-bold text-center -tracking-[1px]">
                It's On Its Way.
              </Heading>
                        <Text className="m-0 text-[14px] leading-loose text-[#747474] font-medium">
                Your order is on its way. Use the link above to track its
                progress.
              </Text>
                        <Text className="m-0 text-[14px] leading-loose text-[#747474] font-medium mt-6">
                Your freshly made dumplings are ready to be delivered to you soon.
              </Text>
            </Section>
            <Hr className="border-[#E5E5E5] m-0" />
            <Section className="py-[22px] px-10">
                        <Text className="m-0 text-[15px] leading-loose font-bold">
                Shipping to: Alan Turing
              </Text>
                        <Text className="m-0 text-[14px] leading-loose text-[#747474] font-medium">
                2125 Chestnut St, San Francisco, CA 94123
              </Text>
            </Section>
            <Hr className="border-[#E5E5E5] m-0" />
            <Section className="py-10 px-10">
              <Row>
                <Column>
                  <Img
                    src={`${baseUrl}/static/nike-product.png`}
                    alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                    className="float-left"
                    width="260px"
                  />
                </Column>
                <Column className="align-top pl-3">
                  <Text className="m-0 text-[14px] leading-loose font-medium">
                    Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey
                  </Text>
                  <Text className="m-0 text-[14px] leading-loose text-[#747474] font-medium">
                    Size L (12–14)
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="border-[#E5E5E5] m-0" />
            <Section className="py-[22px] px-10">
              <Row className="inline-flex mb-10">
                <Column className="w-[170px]">
                  <Text className="m-0 text-[14px] leading-loose font-bold">
                    Order Number
                  </Text>
                  <Text className="mt-3 mb-0 font-medium text-[14px] leading-[1.4] text-[#6F6F6F]">
                    C0106373851
                  </Text>
                </Column>
                <Column>
                  <Text className="m-0 text-[14px] leading-loose font-bold">
                    Order Date
                  </Text>
                  <Text className="mt-3 mb-0 font-medium text-[14px] leading-[1.4] text-[#6F6F6F]">
                    Sep 22, 2022
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column align="center">
                  <Link className="border border-[#929292] no-underline py-[10px] px-0 w-[220px] text-[16px] block text-center font-medium text-black">
                    Order Status
                  </Link>
                </Column>
              </Row>
            </Section>
            <Hr className="border-[#E5E5E5] m-0" />
  
            <Hr className="border-[#E5E5E5] m-0" />
            <Section className="px-5 pt-5 bg-[#F7F7F7]">
              <Row>
                <Text className="px-5 font-bold">Get Help</Text>
              </Row>
              <Row className="py-[22px] px-5">
                <Column className="w-1/3" colSpan={1}>
                  <Link
                    href="https://www.nike.com/"
                    className="text-[13.5px] mt-0 font-medium text-black"
                  >
                    Shipping Status
                  </Link>
                </Column>
                <Column className="w-1/3" colSpan={1}>
                  <Link
                    href="https://www.nike.com/"
                    className="text-[13.5px] mt-0 font-medium text-black"
                  >
                    Shipping & Delivery
                  </Link>
                </Column>
                <Column className="w-1/3" colSpan={1}>
                  <Link
                    href="https://www.nike.com/"
                    className="text-[13.5px] mt-0 font-medium text-black"
                  >
                    Returns & Exchanges
                  </Link>
                </Column>
              </Row>
              <Hr className="border-[#E5E5E5] m-0" />
              <Row className="px-5 pt-8 pb-[22px]">
                <Column>
                  <Row>
                    <Column className="w-4">
                      <Img
                        src={`${baseUrl}/static/nike-phone.png`}
                        alt="Nike Phone"
                        width="16px"
                        height="26px"
                        className="pr-[14px]"
                      />
                    </Column>
                    <Column>
                      <Text className="text-[13.5px] mt-0 font-medium text-black mb-0">
                        1-800-806-6453
                      </Text>
                    </Column>
                  </Row>
                </Column>
                <Column>
                  <Text className="text-[13.5px] mt-0 font-medium text-black mb-0">
                    4 am - 11 pm PT
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="border-[#E5E5E5] m-0" />
            <Section className="py-[22px]">
              <Row>
                <Text className="text-[32px] leading-[1.3] font-bold text-center -tracking-[1px]">
                  Dumplingbois.com
                </Text>
              </Row>
            </Section>
            <Hr className="border-[#E5E5E5] m-0 mt-3" />
            <Section className="py-[22px]">
              <Row className="w-[166px] mx-auto">
                  <Text className="m-0 text-[#AFAFAF] text-[13px] text-center">
                    Privacy Policy
                  </Text>
              </Row>
              <Row>
                <Text className="m-0 text-[#AFAFAF] text-[13px] text-center py-[30px]">
                  Please contact us if you have any questions. Or reply to this email.
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
  
  export default ConfirmationEmail;
  