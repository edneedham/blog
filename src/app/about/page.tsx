import type { Metadata } from 'next'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'About | Edward Needham',
  description: 'About Edward Needham',
}

export default function AboutPage() {
  return (
    <div>
      <Header />
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium mb-6">About</h1>
        <div className="space-y-4 text-foreground-muted leading-7">
          <p>
            I'm a software engineer and I'm currently building software 
            for the logistics industry in Argentina. 
          </p>
          <p>
            I was born into a farming family, and working in agriculture had been
            a mainstay. That changed at university where I had my first real software engineering exposure: I utilised R for data analysis in both
            coursework and my final thesis.
          </p>
          <p>
            After university, I went back to agriculture, but I still had software engineering on my
            mind. A while later I wrote a small Rust CLI called{' '}
            <a
              href="https://github.com/edneedham/x2y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:opacity-60 transition-opacity"
            >
              x2y
            </a>{' '}
            that serialises and deserialises JSON, TOML and YAML.
          </p>
          <p>
            I then moved
            to Argentina where I started working for{' '}
            <a
              href="https://roasal.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:opacity-60 transition-opacity"
            >
              Roasal
            </a>{' '}
            and began writing software for real customers in the logistics
            industry. We created{' '}
            <a
              href="https://enpunto.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:opacity-60 transition-opacity"
            >
              En Punto
            </a>{' '}
            that transforms paper-based delivery notes into digital records.
            This removes errors, reduces paper costs and improves auditability, 
            efficiency and speed. I took advantage of the improved quality of LLMs to
            translate the UIs into idiomatic Castellano. While building
            En Punto, I created a local-first credential manager
            written in Rust called{' '}
            <a
              href="https://github.com/edneedham/cred"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:opacity-60 transition-opacity"
            >
              cred
            </a>{' '}
            so that I could manage and propagate newly minted secrets to the
            services we used for deployments. When I wasn&apos;t improving logistics in Argentina,
            I built{' '}
            <a
              href="https://github.com/edneedham/netpulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:opacity-60 transition-opacity"
            >
              netpulse
            </a>{', '}
            a CLI that measures ISP latency, packet loss and bandwidth with a
            cron job and then creates clear charts using Python&apos;s Matplotlib.
          </p>
          <p>
            I continue to work for Roasal, but I have since moved back to the UK.
          </p>
          <p>
            Outside of software, I have started studying electronics and hardware engineering.
          </p>
        </div>
      </article>
    </div>
  )
}
