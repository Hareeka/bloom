
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ShareScreen,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function SessionRoomPage({ params }: { params: { id: string } }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);


  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col bg-background">
      <header className="p-4 border-b">
        <h1 className="text-xl font-semibold font-headline">Session: Career Path Discussion</h1>
        <p className="text-sm text-muted-foreground">with Dr. Alisha Grant</p>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <main className="md:col-span-2 relative">
             <Card className="w-full h-full overflow-hidden bg-black">
                <div className="absolute top-4 left-4 z-10">
                    <Badge>Dr. Alisha Grant</Badge>
                </div>
                <Image 
                    src="https://images.unsplash.com/photo-1592621385612-4d7129426394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2MTQ5MDEzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Mentor's video feed"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90"
                />
             </Card>

             <Card className="absolute bottom-4 right-4 w-1/3 max-w-xs aspect-video overflow-hidden border-2 border-primary">
                 <div className="absolute top-2 left-2 z-10">
                    <Badge variant="secondary">You</Badge>
                 </div>
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                 {isCameraOff && <div className="absolute inset-0 bg-black flex items-center justify-center"><VideoOff className="h-8 w-8 text-white"/></div>}
             </Card>
        </main>
        
        <aside className="bg-card p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4">Chat</h2>
              <div className="text-sm text-muted-foreground text-center h-full flex items-center justify-center">
                  Chat is disabled for this demo.
              </div>
            </div>
             <Button variant="outline" disabled><MessageSquare className="mr-2"/> Send a message</Button>
        </aside>
      </div>

       {hasCameraPermission === false && (
            <div className="absolute inset-x-0 bottom-24 p-4">
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access in your browser settings to use the video feature. Your video is only visible to you.
                    </AlertDescription>
                </Alert>
            </div>
        )}

      <footer className="flex justify-center items-center p-4 border-t gap-4">
        <Button variant={isMuted ? "destructive" : "outline"} size="lg" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button variant={isCameraOff ? "destructive" : "outline"} size="lg" onClick={() => setIsCameraOff(!isCameraOff)}>
          {isCameraOff ? <VideoOff /> : <Video />}
        </Button>
        <Button variant="outline" size="lg" disabled>
            <ShareScreen />
        </Button>
        <Button variant="destructive" size="lg" asChild>
            <Link href="/sessions">
              <PhoneOff />
            </Link>
        </Button>
      </footer>
    </div>
  );
}


// A placeholder for the Next.js Image component to avoid build errors.
const Image = (props: any) => <img {...props} />;
