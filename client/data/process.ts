import { Search, Microscope, Compass, PenTool, Hammer, ShieldCheck, Rocket, RefreshCw } from 'lucide-react'
import type { ProcessStep } from './types'

export const processSteps: ProcessStep[] = [
  { no: '01', icon: Search, title: 'Discover', description: 'Understand your business, users, processes, constraints and goals.', deliverables: ['Discovery call', 'Stakeholder conversations', 'Current-process map'] },
  { no: '02', icon: Microscope, title: 'Analyze', description: 'Identify the real problem and the automation or software opportunity behind it.', deliverables: ['Problem definition', 'Opportunity assessment', 'Build vs. buy advice'] },
  { no: '03', icon: Compass, title: 'Strategize', description: 'Define architecture, scope, integrations and the delivery approach.', deliverables: ['Scope & phases', 'Architecture plan', 'Timeline & estimate'] },
  { no: '04', icon: PenTool, title: 'Design', description: 'Design the user experience, system flows and technical structure.', deliverables: ['User flows', 'UI designs / prototype', 'Data model'] },
  { no: '05', icon: Hammer, title: 'Build', description: 'Develop in reviewable iterations with quality and maintainability in mind.', deliverables: ['Sprint demos', 'Staging environment', 'Clean, documented code'] },
  { no: '06', icon: ShieldCheck, title: 'Test', description: 'Verify functionality, performance, security, usability and critical workflows.', deliverables: ['QA & UAT', 'Performance checks', 'Security review'] },
  { no: '07', icon: Rocket, title: 'Launch', description: 'Production deployment, data migration and handover to your team.', deliverables: ['Go-live', 'Training', 'Documentation'] },
  { no: '08', icon: RefreshCw, title: 'Improve', description: 'Evolve the solution as your business and requirements change.', deliverables: ['Monitoring', 'Support plan', 'Continuous improvements'] },
]
