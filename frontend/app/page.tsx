"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { MapPin, Hourglass, CalendarDays, Users, Wrench, Trophy, Car, Crown, Flag, BarChart, Flag as RaceFlagIcon } from "lucide-react";
import { XCircle, Gavel, UsersRound, Sparkles, Github, MessageSquare, Coffee, History, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";

// TODO ! Update the links to your actual GitHub, email, and Instagram profiles
// TODO ! Plan your API integration to replace these hardcoded values

export default function Home() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <ModeToggle />
      <h1 className="text-5xl font-extrabold text-center mb-2 text-primary">
        Formula 1 DataLab
      </h1>
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <p className="text-xl text-muted-foreground mb-2">
          The primary goal of this site is to provide a user-friendly platform
          for quick, interactive exploration and visualization of historical
          Formula 1 data.
        </p>
        <p className="text-xl text-muted-foreground mb-2">
          This website is a work in progress and will be updated with more features
          and data visualizations.
        </p>
        <p className="text-lg text-primary-foreground/70">
          Start your exploration with the key statistics below, or dive deeper
          into specific categories.
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

<div className="grid grid-cols-2 gap-4">
    <Card className="col-span-2 flex flex-col items-center justify-center p-4 text-center">
        <RaceFlagIcon className="h-8 w-8 text-blue-500 mb-2" />
        <CardTitle className="text-xl font-semibold mb-1">Total Races</CardTitle>
        <Badge variant="default" className="text-xl px-4 bg-blue-500 text-white">1,125</Badge>
    </Card>

    <Card className="flex flex-col items-center justify-center p-4 text-center">
        <MapPin className="h-8 w-8 text-red-600 mb-2" />
        <CardTitle className="text-xl font-semibold mb-1">Total Circuits</CardTitle>
        <Badge variant="default" className="text-xl px-4 bg-red-600 text-white">78</Badge>
    </Card>
    <Card className="flex flex-col items-center justify-center p-4 text-center">
        <Crown className="h-8 w-8 text-amber-500 mb-2" />
        <CardTitle className="text-xl font-semibold mb-1">World Champions</CardTitle>
        <Badge variant="default" className="text-xl px-4 bg-amber-500 text-white">34</Badge>
    </Card>
    <Card className="flex flex-col items-center justify-center p-4 text-center">
        <Trophy className="h-8 w-8 text-green-500 mb-2" />
        <CardTitle className="text-xl font-semibold mb-1">Race Winners</CardTitle>
        <Badge variant="default" className="text-xl px-4 bg-green-500 text-white">113</Badge>
    </Card>
    <Card className="flex flex-col items-center justify-center p-4 text-center">
        <Globe className="h-8 w-8 text-sky-500 mb-2" />
        <CardTitle className="text-xl font-semibold mb-1">Host Nations</CardTitle>
        <Badge variant="default" className="text-xl px-4 bg-sky-500 text-white">34</Badge>
    </Card>
</div>

        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-7 w-7 text-yellow-500" /> Record Breakers
            </CardTitle>
            <CardDescription>
              Legendary achievements in Formula 1 history.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-indigo-500" />
                <p className="text-lg font-semibold">Most Wins (Driver):</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-indigo-500 text-black"
              >
                L. Hamilton (103)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                <p className="text-lg font-semibold">Most Championships:</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-amber-500 text-black"
              >
                Hamilton/Schumacher (7)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-cyan-500" />
                <p className="text-lg font-semibold">Most Poles (Driver):</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-cyan-500 text-black"
              >
                L. Hamilton (104)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-rose-500" />
                <p className="text-lg font-semibold">Most Constructor Wins:</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-rose-500 text-black"
              >
                Ferrari (245)
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-7 w-7 text-fuchsia-500" /> Unique F1 Stats
            </CardTitle>
            <CardDescription>
              Lesser-known facts and intriguing records.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <p className="text-lg font-semibold">Most DNFs:</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-red-600 text-black"
              >
                A. de Cesaris (148)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-slate-500" />
                <p className="text-lg font-semibold">Most Race Starts:</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-slate-500 text-black"
              >
                F. Alonso (394)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <UsersRound className="h-5 w-5 text-teal-500" />
                <p className="text-lg font-semibold">Unique Pole Sitters:</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-teal-500 text-black"
              >
                107
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <p className="text-lg font-semibold">Most Close Year:</p>
              </div>
              <Badge
                variant="outline"
                className="text-base px-3 py-1 bg-yellow-500 text-black"
              >
                Verstappen/Hamilton (0.5)
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center mt-10 mb-4">
          <div className="flex flex-wrap justify-center  gap-6 max-w-2xl mx-auto">
          <Card className="flex flex-col items-center justify-center py-4 px-7  transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <a
              href="https://github.com/Vucko95"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-current no-underline"
            >
              <Github className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-xl font-semibold ">
                GitHub
              </CardTitle>
            </a>
          </Card>
          {/* 
          <Card className="flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <a
              href="mailto:your-email@example.com?subject=Feedback for Formula 1 DataLab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-current no-underline"
            >
              <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
              <CardTitle className="text-xl font-semibold mt-2">
                Feedback
              </CardTitle>
            </a>
          </Card> */}

          <Card className="flex flex-col items-center justify-center py-4 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <a
              href="https://buymeacoffee.com/f1datalab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-current no-underline"
            >
              <Coffee className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-xl font-semibold">
                Coffee
              </CardTitle>
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}