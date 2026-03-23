'use client';
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

const RunAgentButton = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

  const  handleRunAgent = async  () => {
startTransition(async () => {
try {
    const response = await fetch("/api/agents/run", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error("Failed to run agent:", result.error)
    }
    console.log(result)
   
  


    router.refresh();
} catch (error) {
    console.error("Failed to run agent:", error)
    toast.error("Failed to run agent")
    return;
}
})
    }
  return (
    <Button className='w-full' variant={'outline'} onClick={handleRunAgent} disabled={isPending}>
{isPending ? (
    <>
    <Loader2Icon className='w-4 h-4 animate-spin'/>
    Running Agent...
    </>
):(
    "Run Agent Now"
)}
    </Button>
  )
}

export default RunAgentButton