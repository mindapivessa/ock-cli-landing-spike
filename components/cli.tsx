'use client'

import React, { useState, useEffect } from 'react'
import { Terminal, Loader } from 'lucide-react'

export default function Cli() {
  const [step, setStep] = useState(-1)
  const [command, setCommand] = useState('')
  const [projectName, setProjectName] = useState('')
  const [clientKey, setClientKey] = useState('')
  const [smartWallet, setSmartWallet] = useState(true)
  const [paymaster, setPaymaster] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    { prompt: 'Project name:', initial: 'my-onchainkit-app' },
    { prompt: 'Enter your Coinbase Developer Platform API Key: (optional)', initial: '' },
    { prompt: 'Use Coinbase Smart Wallet? (recommended)', initial: 'yes' },
    { prompt: 'Sponsor transactions?', initial: 'yes' }, // New step added here
  ]

  useEffect(() => {
    if (step === steps.length && !isCompleted) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsCompleted(true)
      }, 2000)
    }
  }, [step, isCompleted])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (step === -1) {
        if (command.trim().toLowerCase() === 'npm create-onchain') {
          setStep(0)
        } else {
          setCommand('')
        }
      } else if (step < steps.length - 1) {
        setStep(step + 1)
      } else if (step === steps.length - 1) {
        const inputValue = e.currentTarget.value.toLowerCase()
        setPaymaster(inputValue !== 'no' && inputValue !== 'n') // Handle "no" and "n"
        setStep(step + 1)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(79,79,79,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,79,79,0.5)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg overflow-hidden mx-4 sm:mx-0">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="font-mono flex items-center text-sm text-gray-300">
            <Terminal className="w-4 h-4 mr-2" />
            OnchainKit
          </div>
          <div></div>
        </div>
        <div className="bg-black text-green-400 p-4 font-mono text-sm h-96 overflow-y-auto">
          <div className="mb-4">
            <span className="text-blue-400">$ </span>
            {step === -1 ? (
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-green-400 w-full"
                placeholder="Type 'npm create-onchain' and press Enter"
                autoFocus
              />
            ) : (
              <span>{command}</span>
            )}
          </div>
          {step >= 0 && (
            <pre className="text-green-500">
{`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                              //
//         ::::::::  ::::    :::  ::::::::  :::    :::     :::     ::::::::::: ::::    ::: :::    ::: ::::::::::: :::::::::::   //
//       :+:    :+: :+:+:   :+: :+:    :+: :+:    :+:   :+: :+:       :+:     :+:+:   :+: :+:   :+:      :+:         :+:        //
//      +:+    +:+ :+:+:+  +:+ +:+        +:+    +:+  +:+   +:+      +:+     :+:+:+  +:+ +:+  +:+       +:+         +:+         //
//     +#+    +:+ +#+ +:+ +#+ +#+        +#++:++#++ +#++:++#++:     +#+     +#+ +:+ +#+ +#++:++        +#+         +#+          //
//    +#+    +#+ +#+  +#+#+# +#+        +#+    +#+ +#+     +#+     +#+     +#+  +#+#+# +#+  +#+       +#+         +#+           //
//   #+#    #+# #+#   #+#+# #+#    #+# #+#    #+# #+#     #+#     #+#     #+#   #+#+# #+#   #+#      #+#         #+#            //
//   ########  ###    ####  ########  ###    ### ###     ### ########### ###    #### ###    ### ###########     ###             //
//                                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
`}
            </pre>
          )}
          {steps.map((s, index) => (
            <div key={index} className={step > index ? '' : (step === index ? '' : 'hidden')}>
              <span className="text-blue-400">{s.prompt} </span>
              {step === index ? (
                <input
                  type={s.prompt.includes('API Key') ? 'password' : 'text'}
                  className="bg-transparent border-none outline-none text-green-400"
                  placeholder={s.initial}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    if (index === 0) setProjectName(e.target.value)
                    if (index === 1) setClientKey(e.target.value)
                    if (index === 2) setSmartWallet(e.target.value.toLowerCase() !== 'no' && e.target.value.toLowerCase() !== 'n')
                    if (index === 3) setPaymaster(e.target.value.toLowerCase() !== 'no' && e.target.value.toLowerCase() !== 'n') // Handle "no" and "n"
                  }}
                  autoFocus
                />
              ) : (
                <span>
                  {index === 0 ? projectName || s.initial : ''}
                  {index === 1 ? (clientKey ? '*'.repeat(clientKey.length) : '') : ''}
                  {index === 2 ? (smartWallet ? 'yes' : 'no') : ''}
                  {index === 3 ? (paymaster ? 'yes' : 'no') : ''} 
                </span>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center mt-4">
              <Loader className="animate-spin mr-2" />
              <span>Creating {projectName || 'my-onchainkit-app'}...</span>
            </div>
          )}
          {isCompleted && (
            <div className="mt-4">
              <p className="text-magenta">Created new OnchainKit project in {projectName || 'my-onchainkit-app'}</p>
              <p className="mt-2">Integrations:</p>
              {smartWallet && <p className="text-green-400">✓ <span className="text-blue-400">Smart Wallet</span></p>}
              {paymaster && <p className="text-green-400">✓ <span className="text-blue-400">Paymaster</span></p>}
              <p className="text-green-400">✓ <span className="text-blue-400">Base</span></p>
              {clientKey && <p className="text-green-400">✓ <span className="text-blue-400">Coinbase Developer Platform</span></p>}
              <p className="mt-2">Frameworks:</p>
              <p className="text-cyan-400">- React</p>
              <p className="text-cyan-400">- Next.js</p>
              <p className="text-cyan-400">- Tailwind.css</p>
              <p className="text-cyan-400">- ESLint</p>
              <p className="mt-2">To get started with {projectName || 'my-onchainkit-app'}, run the following commands:</p>
              <p>- cd {projectName || 'my-onchainkit-app'}</p>
              <p>- npm install</p>
              <p>- npm run dev</p>
            </div>
          )}
        </div>
      </div>
      <footer className="mt-8 font-mono text-gray-400" style={{ zIndex: 10, pointerEvents: 'auto' }}>
        <a className="hover:underline m-4" href="https://onchainkit.xyz" target="_blank" rel="noopener noreferrer">
          onchainkit.xyz
        </a>
      </footer>
    </div>
  )
}
