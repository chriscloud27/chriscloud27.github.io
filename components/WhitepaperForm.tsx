"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WEBHOOK_URL = "https://flow.mach2.cloud/webhook/whitepaper";
const WHITEPAPER_URL =
  "https://prod.ucwe.capgemini.com/de-de/wp-content/uploads/sites/8/2023/11/function-apps-versus-kubernetes.pdf";

const schema = z.object({
  name_first: z.string().min(1, "Your first name is required"),
  name_family: z.string().min(1, "Your last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof schema>;

export default function WhitepaperForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setSubmitError(null);

    const params = new URLSearchParams({
      name_first: data.name_first,
      name_family: data.name_family,
      Email: data.email,
      Consent: "true",
    });

    if (data.company) {
      params.set("Company", data.company);
    }

    try {
      await fetch(`${WEBHOOK_URL}?${params.toString()}`, {
        method: "GET",
        mode: "no-cors",
      });

      reset();
    } catch {
      setSubmitError(
        "The request could not be sent. Please try again in a moment.",
      );
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="border border-electric-cyan/25 rounded-lg p-10 bg-electric-cyan/[0.03]">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-electric-cyan mb-3">
          Request received
        </p>
        <p className="font-body text-[14px] text-grey-mid leading-[1.7] mb-8">
          Thank you. Your download is ready.
        </p>
        <a
          href={WHITEPAPER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-p inline-flex items-center gap-2"
        >
          Download Whitepaper →
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div className="form-row">
        <div className="form-group">
          <Label htmlFor="name_first" className="form-label">
            What is your first name? <span className="required">*</span>
          </Label>
          <Input
            id="name_first"
            type="text"
            {...register("name_first")}
            aria-invalid={!!errors.name_first}
          />
          {errors.name_first && (
            <span className="form-error show">{errors.name_first.message}</span>
          )}
        </div>

        <div className="form-group">
          <Label htmlFor="name_family" className="form-label">
            What is your last name? <span className="required">*</span>
          </Label>
          <Input
            id="name_family"
            type="text"
            {...register("name_family")}
            aria-invalid={!!errors.name_family}
          />
          {errors.name_family && (
            <span className="form-error show">
              {errors.name_family.message}
            </span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <Label htmlFor="email" className="form-label">
          What is your email address? <span className="required">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="form-error show">{errors.email.message}</span>
        )}
      </div>

      {/* Company */}
      <div className="form-group">
        <Label htmlFor="company" className="form-label">
          Which company are you working for?
        </Label>
        <Input id="company" type="text" {...register("company")} />
      </div>

      {/* Consent */}
      <div className="form-group">
        <Label className="form-label">
          Do you consent with our terms and conditions?{" "}
          <span className="required">*</span>
        </Label>
        <label className="flex items-center gap-3 cursor-pointer mt-2">
          <input
            type="checkbox"
            {...register("consent")}
            className="w-4 h-4 accent-[#00E5FF] cursor-pointer"
          />
          <span className="font-body text-[14px] text-grey-mid">I consent</span>
        </label>
        {errors.consent && (
          <span className="form-error show">{errors.consent.message}</span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="form-submit w-full justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Submit"}
      </Button>

      {submitError && (
        <div className="form-message error mt-4">{submitError}</div>
      )}
    </form>
  );
}
