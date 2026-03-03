/** MaCh2 brand logo SVG — reused in nav and timeline */
export default function Mach2Logo({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="fg-logo">
          <feGaussianBlur stdDeviation="0.6" />
          <feMerge><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="32" height="32" rx="6" fill="#0B1F3A" />
      <path d="M 9,24 L 6,28 L 11,24 Z" fill="white" opacity="0.4" />
      <path d="M 23,24 L 26,28 L 21,24 Z" fill="white" opacity="0.4" />
      <rect x="5" y="19" width="6" height="4.5" rx="0.8" fill="white" opacity="0.3" />
      <rect x="13" y="19" width="6" height="4.5" rx="0.8" fill="white" opacity="0.45" />
      <rect x="21" y="19" width="6" height="4.5" rx="0.8" fill="white" opacity="0.3" />
      <rect x="9" y="13" width="6" height="5" rx="0.8" fill="#00E5FF" opacity="0.9" filter="url(#fg-logo)" />
      <rect x="17" y="13" width="6" height="5" rx="0.8" fill="#00E5FF" opacity="0.9" filter="url(#fg-logo)" />
      <rect x="13" y="8" width="6" height="4.5" rx="0.8" fill="white" opacity="0.95" />
      <path d="M 13,8 L 16,2 L 19,8 Z" fill="white" />
      <circle cx="16" cy="5.5" r="1.2" fill="#00E5FF" />
      <path d="M 10,23.5 Q 12,27 13.5,25 Q 15,29 16,27 Q 17,29 18.5,25 Q 20,27 22,23.5"
        fill="none" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}
