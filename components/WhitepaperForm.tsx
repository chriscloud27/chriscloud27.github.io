'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const WEBHOOK_URL = 'https://flow.mach2.cloud/form/056425f2-f887-4a41-a848-5108e13049ea'
const WHITEPAPER_URL =
  'https://prod.ucwe.capgemini.com/de-de/wp-content/uploads/sites/8/2023/11/function-apps-versus-kubernetes.pdf'

const schema = z.object({
  name: z.string().min(1, 'Your name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
})

type FormValues = z.infer<typeof schema>

export default function WhitepaperForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormValues) {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('Email', data.email)
    if (data.company) formData.append('Company', data.company)
    formData.append('Consent', 'true')

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`)
    }

    reset()
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
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Name */}
      <div className="form-group">
        <Label htmlFor="name" className="form-label">
          What is your name? <span className="required">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span className="form-error show">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <Label htmlFor="email" className="form-label">
          What is your email address? <span className="required">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
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
        <Input
          id="company"
          type="text"
          {...register('company')}
        />
      </div>

      {/* Consent */}
      <div className="form-group">
        <Label className="form-label">
          Do you consent with our terms and conditions? <span className="required">*</span>
        </Label>
        <label className="flex items-center gap-3 cursor-pointer mt-2">
          <input
            type="checkbox"
            {...register('consent')}
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
        {isSubmitting ? 'Sending…' : 'Submit'}
      </Button>
    </form>
  )
}
