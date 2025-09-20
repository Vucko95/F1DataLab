"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { MapPin, Hourglass, CalendarDays, Users, Wrench, Trophy, Car, Crown, Flag, BarChart, Flag as RaceFlagIcon, XCircle, Gavel, UsersRound, Sparkles, Github, MessageSquare, Instagram } from "lucide-react"; 
import { Badge } from "@/components/ui/badge";

// TODO ! Update the links and icons to your actual GitHub, email, and Instagram profiles
// TODO ! Add API's for the statistics and record breakers

export default function Home() {

  return (
    <div className="p-4 pl-8"> 
      <ModeToggle /> 
<h1 className="text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-orange-800 to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl">
  Formula 1 DataLab test-gitpush
</h1>
    <div className="text-center mb-4 max-w-6xl mx-auto">
    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-2 opacity-80">
      Website is work in progress, and will be updated with more features in future. The goal is to provide a user-friendly platform for quick, interactive exploration and visualization of historical Formula 1 data across different racing aspects.
    </p>
    </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <RaceFlagIcon className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Races</CardTitle>
              <Badge variant="default" className="text-xl px-4  bg-red-500 text-white">1120+</Badge>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Drivers</CardTitle>
              <Badge variant="default" className="text-xl px-4  bg-green-500 text-white">800+</Badge>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <Wrench className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Constructors</CardTitle>
              <Badge variant="default" className="text-xl px-4  bg-orange-500 text-white">150+</Badge>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <CalendarDays className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Years of Data</CardTitle>
              <Badge variant="default" className="text-xl px-4  bg-purple-500 text-white">2017-2025</Badge>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Circuits</CardTitle>
              <Badge variant="default" className="text-xl px-4  bg-blue-600 text-white">70+</Badge>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <Hourglass className="h-8 w-8 text-gray-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Seasons</CardTitle>
              <Badge variant="default" className="text-xl px-4  bg-gray-500 text-white">75+</Badge>
            </Card>
          </div>

          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="h-7 w-7 text-yellow-500" /> Record Breakers
              </CardTitle>
              <CardDescription>Legendary achievements in Formula 1 history.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-indigo-500" />
                  <p className="text-lg font-semibold">Most Wins (Driver):</p>
                </div>
                
                <Badge variant="outline" className="text-base px-3 py-1 bg-indigo-500 text-black">L. Hamilton (103)</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-500" />
                  <p className="text-lg font-semibold">Most Champs:</p>
                </div>
                
                <Badge variant="outline" className="text-base px-3 py-1 bg-amber-500 text-black">Hamilton/M.Scum. (7)</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-cyan-500" />
                  <p className="text-lg font-semibold">Most Pole (Driver):</p>
                </div>
                
                <Badge variant="outline" className="text-base px-3 py-1 bg-cyan-500 text-black">L. Hamilton (104)</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-rose-500" />
                  <p className="text-lg font-semibold">Most Constructor Wins:</p>
                </div>
                
                <Badge variant="outline" className="text-base px-3 py-1 bg-rose-500 text-black">Ferrari (243+)</Badge>
              </div>
            </CardContent>
          </Card>

<Card className="flex flex-col">
  <CardHeader className="pb-4">
    <CardTitle className="flex items-center gap-2 text-2xl">
      <Sparkles className="h-7 w-7 text-fuchsia-500" /> Unique F1 Stats
    </CardTitle>
    <CardDescription>Lesser-known facts and intriguing records.</CardDescription>
  </CardHeader>
  <CardContent className="flex-grow space-y-4">
    <div className="flex items-center justify-between p-3 rounded-md border">
      <div className="flex items-center gap-2">
        <XCircle className="h-5 w-5 text-red-600" />
        <p className="text-lg font-semibold">Most DNFs:</p>
      </div>
      <Badge variant="outline" className="text-base px-3 py-1 bg-red-600 text-black">Andrea de Cesaris (148)</Badge>
    </div>
    <div className="flex items-center justify-between p-3 rounded-md border">
      <div className="flex items-center gap-2">
        <Gavel className="h-5 w-5 text-slate-500" />
        <p className="text-lg font-semibold">Race Starts:</p>
      </div>
      <Badge variant="outline" className="text-base px-3 py-1 bg-slate-500 text-black">Andrea de Cesaris (208)</Badge>
    </div>
    <div className="flex items-center justify-between p-3 rounded-md border">
      <div className="flex items-center gap-2">
        <UsersRound className="h-5 w-5 text-teal-500" />
        <p className="text-lg font-semibold">Unique Pole Sitters:</p>
      </div>    
      <Badge variant="outline" className="text-base px-3 py-1 bg-teal-500 text-black">106+</Badge>
    </div>
    <div className="flex items-center justify-between p-3 rounded-md border">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <p className="text-lg font-semibold">Closest C. Decider:</p>
      </div>    
      <Badge variant="outline" className="text-base px-3 py-1 bg-yellow-500 text-black">0.5 points (1984)</Badge>
    </div>
  </CardContent>
</Card>
        </section>

<section className="text-center mt-10 mb-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">

    <Card className="flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-current no-underline">
        <Github className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <CardTitle className="text-xl font-semibold mt-2">GitHub</CardTitle>
      </a>
    </Card>

    <Card className="flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <a href="mailto:your-email@example.com?subject=Feedback for Formula 1 DataLab" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-current no-underline">
        <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
        <CardTitle className="text-xl font-semibold mt-2">Feedback</CardTitle>
      </a>
    </Card>


    <Card className="flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <a href="https://www.instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-current no-underline">
        <Instagram className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        <CardTitle className="text-xl font-semibold mt-2">Instagram</CardTitle>
      </a>
    </Card>
  </div>
</section>

      </div> 
  );
}