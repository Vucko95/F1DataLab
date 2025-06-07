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
      <div className="pt-4 max-w-[90%] mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-2 text-primary">Formula 1 DataLab</h1>
<div className="text-center mb-4 max-w-3xl mx-auto">
  <p className="text-xl text-muted-foreground mb-2">
  The primary goal of this site is to provide a user-friendly platform for quick, interactive exploration and visualization of historical Formula 1 data across various categories.
  </p>
  <p className="text-xl text-muted-foreground mb-2">
    Website is work in progress, and will be updated with more features and data visualizations.
  </p>
  <p className="text-lg text-primary-foreground/70">Start your exploration with the key statistics below, or dive deeper into specific categories.</p>
</div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <RaceFlagIcon className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Races</CardTitle>
              <Badge variant="default" className="text-xl px-4 py-1.5 bg-red-500 text-white">1120+</Badge>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Drivers</CardTitle>
              <Badge variant="default" className="text-xl px-4 py-1.5 bg-green-500 text-white">800+</Badge>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <Wrench className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Constructors</CardTitle>
              <Badge variant="default" className="text-xl px-4 py-1.5 bg-orange-500 text-white">150+</Badge>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <CalendarDays className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Years of Data</CardTitle>
              <Badge variant="default" className="text-xl px-4 py-1.5 bg-purple-500 text-white">1950-Present</Badge>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Circuits</CardTitle>
              <Badge variant="default" className="text-xl px-4 py-1.5 bg-blue-600 text-white">70+</Badge>
            </Card>

            <Card className="flex flex-col items-center justify-center p-4 text-center">
              <Hourglass className="h-8 w-8 text-gray-500 mb-2" />
              <CardTitle className="text-xl font-semibold mb-1">Total Seasons</CardTitle>
              <Badge variant="default" className="text-xl px-4 py-1.5 bg-gray-500 text-white">75+</Badge>
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
                <p className="text-lg"><span className="font-bold">Lewis Hamilton</span> (103)</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-500" />
                  <p className="text-lg font-semibold">Most Championships:</p>
                </div>
                <p className="text-lg"><span className="font-bold"> L. Hamilton</span> (7)</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-cyan-500" />
                  <p className="text-lg font-semibold">Most Pole Positions (Driver):</p>
                </div>
                <p className="text-lg"><span className="font-bold">Lewis Hamilton</span> (104)</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-rose-500" />
                  <p className="text-lg font-semibold">Most Constructor Wins:</p>
                </div>
                <p className="text-lg"><span className="font-bold">Ferrari</span> (243+)</p>
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
                  <p className="text-lg font-semibold">Most DNFs (Driver):</p>
                </div>
                <p className="text-lg"><span className="font-bold">Andrea de Cesaris</span> (148)</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-slate-500" />
                  <p className="text-lg font-semibold">Most Race Starts w/o Win:</p>
                </div>
                <p className="text-lg"><span className="font-bold">Andrea de Cesaris</span> (208)</p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <UsersRound className="h-5 w-5 text-teal-500" />
                  <p className="text-lg font-semibold">Unique Pole Sitters:</p>
                </div>
                <p className="text-lg"><span className="font-bold">106+</span></p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <p className="text-lg font-semibold">Closest Championship Decider:</p>
                </div>
                <p className="text-lg"><span className="font-bold">0.5 points</span> (1984)</p>
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
    </div>
  );
}