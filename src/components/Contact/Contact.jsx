import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Contact = () => {
  return (
    <React.Fragment>
      <div>
        <div className="flex justify-center align-middle my-[3vw]">
          <h1 className=" text-[2vw] capitalize font-semibold ">
            Help & Support
          </h1>
        </div>
        <div className=" mx-[50px] flex justify-center align-middle flex-col">
          <div className="helpHeading flex my-10 flex-col">
            <h1 className=" text-[20px] mb-4">Partner Onboarding</h1>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  What are the mandatory documents needed to list my restaurant
                  on Swiggy?
                </AccordionTrigger>
                <AccordionContent>
                  <p>- Copies of the below documents are mandatory</p>
                  <p>- FSSAI Licence OR FSSAI Acknowledgement</p>
                  <p>- Pan Card</p>
                  <p>- GSTIN Certificate</p>
                  <p>- Cancelled Cheque OR bank Passbook</p>
                  <p>- Menu</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  After I submit all documents, how long will it take for my
                  restaurant to go live on Swiggy?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    After all mandatory documents have been received and
                    verified it takes upto 7-10 working days for the onboarding{" "}
                    <br />
                    to be completed and make your restaurant live on the
                    platform.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  What is this one time Onboarding fees? Do I have to pay for it
                  while registering?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    This is a one-time fee charged towards the system & admin
                    costs incurred during the onboarding process. <br /> It is
                    deducted from the weekly payouts after you start receiving
                    orders from Swiggy.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Who should I contact if I need help & support in getting
                  onboarded?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    You can connect with Partner Support on
                    080-67466777/68179777 or write to partnersuport@swiggy.in
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  How much commission will I be charged by Swiggy?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    The commission charges vary for different cities. You will
                    be able to see the commission applicable for you once the
                    preliminary onboarding details have been filled.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  I don’t have an FSSAI licence for my restaurant. Can it still
                  be onboarded?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    FSSAI licence is a mandatory requirement according to the
                    government’s policies. However, if you are yet to receive
                    the licence at the time of onboarding, you can proceed with
                    the acknowledgement number which you will have received from
                    FSSAI for your registration.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="helpHeading flex justify-center align-middle my-5 flex-col">
            <h1 className="text-[20px] mb-4">Legal</h1>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Terms of Use
                </AccordionTrigger>
                <AccordionContent>
                  These terms of use (the "Terms of Use") govern your use of our
                  website www.swiggy.in (the "Website") and our "Swiggy"
                  application for mobile and handheld devices (the "App"). The
                  Website and the App are jointly referred to as the
                  "Services"). Please read these Terms of Use carefully before
                  you download, install or use the Services. If you do not agree
                  to these Terms of Use, you may not install, download or use
                  the Services. By installing, downloading or using the
                  Services, you signify your acceptance to the Terms of Use and
                  Privacy Policy (being hereby incorporated by reference herein)
                  which takes effect on the date on which you download, install
                  or use the Services, and create a legally binding arrangement
                  to abide by the same.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Privacy Policy
                </AccordionTrigger>
                <AccordionContent>
                  We ( Bundl Technologies Private Limited, alias "Swiggy" ) are
                  fully committed to respecting your privacy and shall ensure
                  that your personal information is safe with us. This privacy
                  policy sets out the information practices of www.swiggy.com
                  ("Website") including the type of information is collected,
                  how the information is collected, how the information is used
                  and with whom it is shared. Reference to "you" in this Privacy
                  Policy refers to the users of this Website whether or not you
                  access the services available on the Website or consummate a
                  transaction on the Website. By using or accessing this
                  Website, you agree to the terms and conditions of this Privacy
                  Policy. You also expressly consent to our use and disclosure
                  of your Personal Information (as defined below) in any manner
                  as described in this Privacy Policy and further signify your
                  agreement to this Privacy Policy and the Terms of Use (being
                  incorporated by reference herein). If you do not agree with
                  the terms and conditions of this Privacy Policy, please do not
                  proceed further or use or access this Website.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Cancellations and Refunds
                </AccordionTrigger>
                <AccordionContent>
                  a) As a general rule you shall not be entitled to cancel your
                  order once placed. You may choose to cancel your order only
                  within one-minute of the order being placed by you. However,
                  subject to your previous cancellation history, Swiggy reserves
                  the right to deny any refund to you pursuant to a cancellation
                  initiated by you even if the same is within one-minute. b)If
                  you cancel your order after one minute of placing it, Swiggy
                  shall have a right to charge you 100% of the order amount as
                  the cancellation fee , with a right to either not to refund
                  the order value in case your order is prepaid or recover from
                  your subsequent order in case your order is postpaid, to
                  compensate our restaurant/merchants and delivery partners.
                  c)Swiggy reserves the right to charge you cancellation fee for
                  the orders constrained to be cancelled by Swiggy for reasons
                  not attributable to Swiggy, including but not limited to: i)in
                  the event if the address provided by you is either wrong or
                  falls outside the delivery zone; ii) failure to contact you by
                  phone or email at the time of delivering the order booking;
                  iii) failure to deliver your order due to lack of information,
                  direction or authorization from you at the time of delivery;
                  or iv) unavailability of all the items ordered by you at the
                  time of booking the order. However, in the unlikely event of
                  an item on your order being unavailable, Swiggy will contact
                  you on the phone number provided to us at the time of placing
                  the order and inform you of such unavailability. In such an
                  event you will be entitled to cancel the entire order and
                  shall be entitled to a refund to an amount upto 100% of the
                  order value. d)In case of cancellations for the reasons
                  attributable to Swiggy or the restaurant partner or delivery
                  partners, Swiggy shall not charge you any cancellation fee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Terms of Use for Swiggy ON-TIME / Assured
                </AccordionTrigger>
                <AccordionContent>
                  These terms of use (the "Terms of Use") that govern your use
                  of our service Swiggy ON-TIME / Assured ("ON-TIME" /
                  "Assured") on our website www.swiggy.in (the "Website") and
                  our Swiggy application for mobile and handheld devices (the
                  "App"). The services on ON-TIME / Assured available on our
                  Website and the App are jointly referred to as the "On-Time
                  Delivery". Please read these Terms of Use carefully before you
                  use the Services. If you do not agree to these Terms of Use,
                  you may not use the Services. By using the Services, you
                  signify your acceptance to the Terms of Use and Privacy Policy
                  (incorporated by reference herein) and creates a legally
                  binding arrangement to abide by the same.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="helpHeading flex justify-center align-middle my-5 flex-col">
            <h1 className="text-[20px] mb-4">FAQs</h1>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  What is Swiggy Customer Care Number?
                </AccordionTrigger>
                <AccordionContent>
                  We value our customer’s time and hence moved away from a
                  single customer care number to a comprehensive chat-based
                  support system for quick and easy resolution. You no longer
                  have to go through the maze of an IVRS call support. Just
                  search for your issue in the help section on this page and
                  initiate a chat with us. A customer care executive will be
                  assigned to you shortly. You can also email us your issue on
                  support@swiggy.in Note: We value your privacy and your
                  information is safe with us. Please do not reveal any personal
                  information, bank account number, OTP etc. to another person.
                  A Swiggy representative will never ask you for these details.
                  Please do not reveal these details to fraudsters and imposters
                  claiming to be calling on our behalf. Be vigilant and do not
                  entertain phishing calls or emails.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Can I edit my order?
                </AccordionTrigger>
                <AccordionContent>
                  Your order can be edited before it reaches the restaurant. You
                  could contact customer support team via chat or call to do so.
                  Once order is placed and restaurant starts preparing your
                  food, you may not edit its contents
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  I want to cancel my order
                </AccordionTrigger>
                <AccordionContent>
                  We will do our best to accommodate your request if the order
                  is not placed to the restaurant (Customer service number:
                  080-67466729). Please note that we will have a right to charge
                  a cancellation fee up to full order value to compensate our
                  restaurant and delivery partners if your order has been
                  confirmed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Will Swiggy be accountable for quality/quantity?
                </AccordionTrigger>
                <AccordionContent>
                  Quantity and quality of the food is the restaurants'
                  responsibility. However in case of issues with the quality or
                  quantity, kindly submit your feedback and we will pass it on
                  to the restaurant.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className=" hover:no-underline hover:text-red-500">
                  Do you charge for delivery?
                </AccordionTrigger>
                <AccordionContent>
                  Delivery fee varies from city to city and is applicable if
                  order value is below a certain amount. Additionally, certain
                  restaurants might have fixed delivery fees. Delivery fee (if
                  any) is specified on the 'Review Order' page.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
