'use client'

import React, { useState } from 'react'

interface Job {
  name: string
  description: string
}

const WorkflowNode = ({ job }: { job: Job }) => (
  <div className="w-44 p-3 rounded-lg border bg-white dark:bg-slate-800/60 border-neutral-200 dark:border-slate-600">
    <h3 className="font-semibold text-neutral-800 dark:text-white text-xs leading-tight mb-0.5">
      {job.name}
    </h3>
    <p className="text-[10px] text-neutral-500 dark:text-slate-400 leading-relaxed">
      {job.description}
    </p>
  </div>
)

const Connector = ({
  direction = 'down',
}: {
  direction?: 'down' | 'split' | 'merge'
}) => {
  const lineColor = 'bg-neutral-300 dark:bg-slate-600'
  const arrowColor = 'text-neutral-400 dark:text-slate-500'

  if (direction === 'down') {
    return (
      <div className="flex flex-col items-center py-1.5">
        <div className={`w-0.5 h-5 ${lineColor} rounded-full`} />
        <div className={`${arrowColor} text-sm`}>▼</div>
      </div>
    )
  }

  if (direction === 'split') {
    return (
      <div className="relative flex items-center justify-center w-full h-10">
        <div className={`absolute top-0 w-0.5 h-2 ${lineColor}`} />
        <div className={`absolute top-2 h-0.5 w-full ${lineColor}`} />
        <div className={`absolute top-2 left-1/4 w-0.5 h-5 ${lineColor}`} />
        <div
          className={`absolute top-6 left-1/4 -translate-x-1/2 ${arrowColor} text-sm`}
        >
          ▼
        </div>
        <div className={`absolute top-2 right-1/4 w-0.5 h-5 ${lineColor}`} />
        <div
          className={`absolute top-6 right-1/4 translate-x-1/2 ${arrowColor} text-sm`}
        >
          ▼
        </div>
      </div>
    )
  }

  if (direction === 'merge') {
    return (
      <div className="relative flex items-center justify-center w-full h-10">
        <div className={`absolute bottom-2 left-1/4 w-0.5 h-5 ${lineColor}`} />
        <div className={`absolute bottom-2 right-1/4 w-0.5 h-5 ${lineColor}`} />
        <div className={`absolute bottom-2 h-0.5 w-1/2 ${lineColor}`} />
        <div className={`absolute bottom-0 w-0.5 h-2 ${lineColor}`} />
        <div className={`absolute -bottom-1.5 ${arrowColor} text-sm`}>▼</div>
      </div>
    )
  }

  return null
}

const BranchBadge = ({ type }: { type: 'pr' | 'merge' }) => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-neutral-300 dark:border-slate-600 bg-white dark:bg-slate-800/60 text-neutral-600 dark:text-slate-400">
      {type === 'pr' ? (
        <>
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
          </svg>
          PR
        </>
      ) : (
        <>
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878Zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
          </svg>
          Merge
        </>
      )}
    </span>
  )
}

const StageLabel = ({ number, title }: { number: number; title: string }) => (
  <div className="flex items-center gap-1.5 mb-2">
    <div className="flex items-center justify-center w-5 h-5 rounded bg-neutral-200 dark:bg-slate-700/50 border border-neutral-300 dark:border-slate-600 text-neutral-600 dark:text-slate-400 text-[10px] font-bold font-mono">
      {number}
    </div>
    <span className="text-neutral-500 dark:text-slate-400 text-[10px] font-medium tracking-wide uppercase">
      {title}
    </span>
  </div>
)

// Old workflow diagram content
const OldWorkflowContent = () => {
  const jobs: Record<string, Job> = {
    'test-backend': {
      name: 'Backend Tests',
      description: 'Go unit & integration tests',
    },
    'test-frontend': {
      name: 'Frontend Tests',
      description: 'Vitest unit & component tests',
    },
    'e2e-tests': {
      name: 'E2E Tests',
      description: 'Playwright in Docker',
    },
    'deploy-staging': {
      name: 'Deploy Staging',
      description: 'Single shared environment',
    },
    'qa-test': {
      name: 'QA Test',
      description: 'Manual testing (after merge!)',
    },
  }

  return (
    <div className="flex flex-col items-center">
      {/* Trigger */}
      <div className="mb-3">
        <div className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-600">
          <div className="text-neutral-800 dark:text-white font-medium text-xs">
            Pull Request Opened
          </div>
          <div className="text-neutral-400 dark:text-slate-500 text-[10px]">
            opened, synchronize, reopened
          </div>
        </div>
      </div>

      <Connector direction="split" />

      {/* Stage 1: Tests */}
      <div className="w-full max-w-lg">
        <StageLabel number={1} title="Test" />
        <div className="flex justify-center gap-3 flex-wrap">
          <WorkflowNode job={jobs['test-backend']} />
          <WorkflowNode job={jobs['test-frontend']} />
          <WorkflowNode job={jobs['e2e-tests']} />
        </div>
      </div>

      <Connector direction="merge" />

      {/* Merge */}
      <div className="flex flex-col items-center">
        <BranchBadge type="merge" />
        <span className="mt-1 text-neutral-500 dark:text-slate-400 text-[10px] font-medium">
          Merge to staging
        </span>
      </div>

      <Connector direction="down" />

      {/* Stage 2: Deploy */}
      <div className="w-full max-w-md">
        <StageLabel number={2} title="Deploy" />
        <div className="flex justify-center">
          <WorkflowNode job={jobs['deploy-staging']} />
        </div>
      </div>

      <Connector direction="down" />

      {/* Stage 3: QA (after merge!) */}
      <div className="w-full max-w-md">
        <StageLabel number={3} title="Validate" />
        <div className="flex justify-center">
          <WorkflowNode job={jobs['qa-test']} />
        </div>
      </div>

      {/* Done */}
      <div className="mt-5 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-slate-700 border border-neutral-300 dark:border-slate-600 flex items-center justify-center text-neutral-500 dark:text-slate-400 text-sm">
          ✓
        </div>
        <span className="mt-1 text-neutral-500 dark:text-slate-400 text-[10px] font-medium">
          Done
        </span>
      </div>
    </div>
  )
}

// New workflow diagram content
const NewWorkflowContent = () => {
  const jobs: Record<string, Job> = {
    'test-backend': {
      name: 'Backend Tests',
      description: 'Go unit & integration tests',
    },
    'test-frontend': {
      name: 'Frontend Tests',
      description: 'Vitest unit & component tests',
    },
    'deploy-preview': {
      name: 'Deploy Preview',
      description: 'Neon DB + Fly.io + Vercel',
    },
    'e2e-tests': {
      name: 'E2E Tests',
      description: 'Playwright against preview',
    },
    'qa-test': {
      name: 'QA Test',
      description: 'Manual testing on preview',
    },
  }

  return (
    <div className="flex flex-col items-center">
      {/* Trigger */}
      <div className="mb-3">
        <div className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-600">
          <div className="text-neutral-800 dark:text-white font-medium text-xs">
            Pull Request Opened
          </div>
          <div className="text-neutral-400 dark:text-slate-500 text-[10px]">
            opened, synchronize, reopened
          </div>
        </div>
      </div>

      <Connector direction="split" />

      {/* Stage 1: Fail Fast */}
      <div className="w-full max-w-md">
        <StageLabel number={1} title="Fail Fast" />
        <div className="flex justify-center gap-3">
          <WorkflowNode job={jobs['test-backend']} />
          <WorkflowNode job={jobs['test-frontend']} />
        </div>
      </div>

      <Connector direction="merge" />

      {/* Stage 2: Deploy Preview */}
      <div className="w-full max-w-md">
        <StageLabel number={2} title="Deploy" />
        <div className="flex justify-center">
          <WorkflowNode job={jobs['deploy-preview']} />
        </div>
      </div>

      <Connector direction="split" />

      {/* Stage 3: Validate */}
      <div className="w-full max-w-md">
        <StageLabel number={3} title="Validate" />
        <div className="flex justify-center gap-3">
          <WorkflowNode job={jobs['e2e-tests']} />
          <WorkflowNode job={jobs['qa-test']} />
        </div>
      </div>

      <Connector direction="merge" />

      {/* Ready to Merge */}
      <div className="mt-2 flex flex-col items-center">
        <BranchBadge type="merge" />
        <span className="mt-1 text-neutral-500 dark:text-slate-400 text-[10px] font-medium">
          Ready to Merge
        </span>
      </div>
    </div>
  )
}

// Combined workflow component with toggle
export default function CICDWorkflow() {
  const [workflowType, setWorkflowType] = useState<'old' | 'new'>('new')

  return (
    <div className="my-8">
      {/* Workflow Toggle - outside the border */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setWorkflowType('old')}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
            workflowType === 'old'
              ? 'bg-neutral-800 dark:bg-white border-neutral-800 dark:border-white text-white dark:text-neutral-900'
              : 'bg-white dark:bg-slate-800/40 border-neutral-300 dark:border-slate-600 text-neutral-600 dark:text-slate-400 hover:border-neutral-400 dark:hover:border-slate-500 hover:text-neutral-800 dark:hover:text-slate-300'
          }`}
        >
          Old Workflow
        </button>
        <button
          onClick={() => setWorkflowType('new')}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
            workflowType === 'new'
              ? 'bg-neutral-800 dark:bg-white border-neutral-800 dark:border-white text-white dark:text-neutral-900'
              : 'bg-white dark:bg-slate-800/40 border-neutral-300 dark:border-slate-600 text-neutral-600 dark:text-slate-400 hover:border-neutral-400 dark:hover:border-slate-500 hover:text-neutral-800 dark:hover:text-slate-300'
          }`}
        >
          New Workflow
        </button>
      </div>

      {/* Workflow Content - inside the border */}
      <div className="-mx-4 sm:mx-0 p-4 sm:p-6 rounded-none sm:rounded-xl bg-neutral-50 dark:bg-slate-900/50 border-y sm:border border-neutral-200 dark:border-slate-800">
        {workflowType === 'old' ? (
          <OldWorkflowContent />
        ) : (
          <NewWorkflowContent />
        )}
      </div>
    </div>
  )
}

// Keep the named export for backwards compatibility
export { CICDWorkflow as OldCICDWorkflow }
