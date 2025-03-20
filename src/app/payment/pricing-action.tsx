"use client";

import { useState } from "react";
import { Check, Star, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { initializeRazorpayPayment } from "./action";
import RazorpayCheckout from "./razerpay-checkout";
import type { PlanType } from "./types";
import Link from "next/link";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    basic: false,
    pro: false,
    enterprise: false,
  });

  const handleSelectPlan = async (plan: PlanType) => {
    if (plan === "enterprise") {
      // For enterprise, we'll just scroll to contact form
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setIsLoading({ ...isLoading, [plan]: true });
    setSelectedPlan(plan);

    try {
      // Get payment details from server
      const data = await initializeRazorpayPayment(plan);
      setPaymentData(data);
    } catch (error) {
      console.error("Payment initialization failed:", error);
    } finally {
      setIsLoading({ ...isLoading, [plan]: false });
    }
  };

  const handlePaymentSuccess = () => {
    // Reset state and show success message
    setSelectedPlan(null);
    setPaymentData(null);
    // You could show a success toast or redirect to a success page
  };

  const handlePaymentCancel = () => {
    setSelectedPlan(null);
    setPaymentData(null);
  };

  return (
    <>
      <section className="w-full max-w-6xl mx-auto mb-16 px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that fits your needs. All plans include a 14-day
            money-back guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Basic</h3>
              <p className="text-muted-foreground">Perfect for beginners</p>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-foreground">
                $9.99
                <span className="text-base font-normal text-muted-foreground">
                  /month
                </span>
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <FeatureItem text="100 AI-enhanced images" />
              <FeatureItem text="Basic editing tools" />
              <FeatureItem text="Email support" />
              <FeatureItem text="1 GB storage" />
            </ul>
            <Button
              className="w-full text-base py-6"
              onClick={() => handleSelectPlan("basic")}
              disabled={isLoading.basic}
            >
              {isLoading.basic ? "Processing..." : "Choose Basic"}
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-card p-8 rounded-xl shadow-lg border-2 border-primary relative flex flex-col h-full transform hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Star className="h-4 w-4" /> Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Pro</h3>
              <p className="text-muted-foreground">For serious creators</p>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-foreground">
                $19.99
                <span className="text-base font-normal text-muted-foreground">
                  /month
                </span>
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <FeatureItem text="Unlimited AI-enhanced images" />
              <FeatureItem text="Advanced editing tools" />
              <FeatureItem text="Priority email support" />
              <FeatureItem text="Style transfer feature" />
              <FeatureItem text="10 GB storage" />
              <FeatureItem text="Batch processing" />
            </ul>
            <Button
              className="w-full text-base py-6 bg-primary hover:bg-primary/90"
              onClick={() => handleSelectPlan("pro")}
              disabled={isLoading.pro}
            >
              {isLoading.pro ? "Processing..." : "Choose Pro"}
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Enterprise
              </h3>
              <p className="text-muted-foreground">For organizations</p>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-foreground">
                Custom
                <span className="text-base font-normal text-muted-foreground">
                  /pricing
                </span>
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <FeatureItem text="Custom AI solutions" />
              <FeatureItem text="API access" />
              <FeatureItem text="Dedicated support team" />
              <FeatureItem text="Advanced analytics" />
              <FeatureItem text="Unlimited storage" />
              <FeatureItem text="White-labeling options" />
              <FeatureItem text="Custom integrations" />
            </ul>
            <Link href="/contact">
              <Button variant="outline" className="w-full text-base py-6">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 overflow-x-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Feature Comparison
          </h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-4 text-left">Feature</th>
                <th className="py-4 px-4 text-center">Basic</th>
                <th className="py-4 px-4 text-center bg-primary/5 border-x border-primary/10">
                  Pro
                </th>
                <th className="py-4 px-4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                feature="AI-enhanced images"
                basic="100/month"
                pro="Unlimited"
                enterprise="Unlimited"
              />
              <ComparisonRow
                feature="Storage"
                basic="1 GB"
                pro="10 GB"
                enterprise="Unlimited"
              />
              <ComparisonRow
                feature="Editing tools"
                basic="Basic"
                pro="Advanced"
                enterprise="Custom"
              />
              <ComparisonRow
                feature="Support"
                basic="Email"
                pro="Priority email"
                enterprise="Dedicated team"
                tooltip="Response times vary by plan: Basic (48h), Pro (24h), Enterprise (4h)"
              />
              <ComparisonRow
                feature="API access"
                basic="❌"
                pro="Limited"
                enterprise="Full access"
              />
              <ComparisonRow
                feature="Style transfer"
                basic="❌"
                pro="✅"
                enterprise="✅"
              />
              <ComparisonRow
                feature="Batch processing"
                basic="❌"
                pro="✅"
                enterprise="✅"
              />
              <ComparisonRow
                feature="White-labeling"
                basic="❌"
                pro="❌"
                enterprise="✅"
              />
            </tbody>
          </table>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaqItem
              question="Can I upgrade or downgrade my plan?"
              answer="Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle."
            />
            <FaqItem
              question="Is there a free trial available?"
              answer="We offer a 7-day free trial for all new users. You can try all Pro features during this period without any commitment."
            />
            <FaqItem
              question="How does the money-back guarantee work?"
              answer="If you're not satisfied with our service, you can request a full refund within 14 days of your initial purchase. No questions asked."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, debit cards, UPI, and net banking through our secure payment processor, Razorpay."
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="This platform has completely transformed how I create visual content. The Pro plan is worth every penny!"
              author="Sarah Johnson"
              role="Graphic Designer"
            />
            <TestimonialCard
              quote="The AI image enhancement is mind-blowing. I've saved countless hours on editing and retouching."
              author="Michael Chen"
              role="Photographer"
            />
            <TestimonialCard
              quote="As an enterprise customer, the custom solutions and dedicated support have been invaluable for our marketing team."
              author="Jessica Williams"
              role="Marketing Director"
            />
          </div>
        </div>
      </section>

      {/* Contact Form Placeholder */}
      <div id="contact-form" className="h-20"></div>

      {/* Razorpay Checkout */}
      {selectedPlan && paymentData && (
        <RazorpayCheckout
          paymentData={paymentData}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </>
  );
}

// Helper Components
const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
    <span className="text-foreground">{text}</span>
  </li>
);

const ComparisonRow = ({
  feature,
  basic,
  pro,
  enterprise,
  tooltip,
}: {
  feature: string;
  basic: string;
  pro: string;
  enterprise: string;
  tooltip?: string;
}) => (
  <tr className="border-b border-border hover:bg-muted/30">
    <td className="py-4 px-4 flex items-center">
      {feature}
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </td>
    <td className="py-4 px-4 text-center">{basic}</td>
    <td className="py-4 px-4 text-center bg-primary/5 border-x border-primary/10 font-medium">
      {pro}
    </td>
    <td className="py-4 px-4 text-center">{enterprise}</td>
  </tr>
);

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <div className="bg-card p-6 rounded-lg border border-border">
    <h4 className="text-lg font-semibold mb-2">{question}</h4>
    <p className="text-muted-foreground">{answer}</p>
  </div>
);

const TestimonialCard = ({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) => (
  <div className="bg-card p-6 rounded-lg border border-border">
    <p className="italic mb-4">"{quote}"</p>
    <div>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </div>
);
