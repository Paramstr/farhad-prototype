'use client';

import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion'; // Commented out - unused
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface WorkflowProps {
  params: Promise<{
    jobId: string;
  }>;
}

export default function NotaryWorkflow({ params }: WorkflowProps) {
  const [currentStep, setCurrentStep] = useState(2);
  const [jobId, setJobId] = useState<string>('');
  
  // Resolve async params
  useEffect(() => {
    params.then(resolvedParams => {
      setJobId(resolvedParams.jobId);
    });
  }, [params]);

  const steps = [
    { id: 1, name: 'Prepare Documents', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' },
    { id: 2, name: 'MOJ System Upload', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' },
    { id: 3, name: 'Verification', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending' },
    { id: 4, name: 'Final Approval', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'pending' }
  ];

  const jobData = {
    'NJ-2024-001': {
      client: 'Al Madar Property Management',
      type: 'Legal Notices',
      count: 350
    },
    'NJ-2025-001': {
      client: 'Al Madar Property Management', 
      type: 'Legal Notices',
      count: 350
    }
  };

  const job = jobData[jobId as keyof typeof jobData] || jobData['NJ-2024-001'];

  // Show loading state while params are being resolved
  if (!jobId) {
    return (
      <div className="min-h-screen bg-praxeti-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-midnight-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-praxeti-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Link href="/notary/review" className="text-brand-600 hover:text-brand-800">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-midnight-900">External Workflow</h1>
            </div>
            <p className="text-sm sm:text-base text-midnight-600">Processing {job.client} - {job.type}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-midnight-900 mb-4 sm:mb-6">Process Steps</h2>
              <div className="space-y-4">
                {(() => {
                  const visibleSteps = [];
                  const prevStep = currentStep > 1 ? steps[currentStep - 2] : null;
                  const currentStepObj = steps[currentStep - 1];
                  const nextStep = currentStep < steps.length ? steps[currentStep] : null;
                  
                  if (prevStep) visibleSteps.push(prevStep);
                  if (currentStepObj) visibleSteps.push(currentStepObj);
                  if (nextStep) visibleSteps.push(nextStep);
                  
                  return visibleSteps.map((step) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.status === 'completed' ? 'bg-mantis-600 text-white' :
                        step.status === 'current' ? 'bg-mantis-800 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {step.status === 'completed' ? '✓' : step.id}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          step.status === 'current' ? 'text-mantis-800' : 'text-midnight-900'
                        }`}>
                          {step.name}
                        </div>
                        <div className="text-sm text-midnight-600 capitalize">{step.status}</div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-midnight-900 mb-4">MOJ System Upload</h3>
              <p className="text-sm sm:text-base text-midnight-600 mb-6">
                Download the processed documents and upload them to the Ministry of Justice system for official notarization.
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div>
                      <h4 className="font-medium text-midnight-900">Approved Documents Package</h4>
                      <p className="text-sm text-midnight-600">{job.count} documents ready for external processing</p>
                    </div>
                    <button className="btn btn-primary w-full sm:w-auto">
                      Download Package
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-midnight-900 mb-2">Upload Instructions</h4>
                  <ol className="text-sm text-midnight-600 space-y-1 list-decimal list-inside">
                    <li>Download the document package above</li>
                    <li>Log into the MOJ notarization portal</li>
                    <li>Upload the documents for official processing</li>
                    <li>Return here to track progress</li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-4">
                  <Link href="/notary/review">
                    <button className="btn btn-ghost w-full sm:w-auto">
                      Back to Review
                    </button>
                  </Link>
                  <button 
                    onClick={() => setCurrentStep(3)}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Mark as Uploaded
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}