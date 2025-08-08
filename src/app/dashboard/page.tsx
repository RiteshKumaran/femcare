import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InitialAssessment } from "@/components/wellness/initial-assessment";
import { WellnessInsights } from "@/components/wellness/wellness-insights";
import {
  BookOpen,
  Calendar,
  HeartPulse,
  MessageSquare,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | SheEvolves",
  description: "Your personal health dashboard",
};

export default function DashboardPage() {
  return (
    <InitialAssessment>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto p-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-primary tracking-tight">
              Welcome to SheEvolves
            </h2>
            <p className="text-lg text-gray-600">
              Your comprehensive women's health platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/tracker">
              <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-purple-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-purple-50 to-transparent rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-purple-900">
                    Period Tracker
                  </CardTitle>
                  <Calendar className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-gray-600">
                    Track and predict your menstrual cycle
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/chatbot">
              <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-rose-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-rose-50 to-transparent rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-rose-900">
                    AI Chatbot
                  </CardTitle>
                  <MessageSquare className="h-6 w-6 text-rose-600 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-gray-600">
                    24/7 emotional support and guidance
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/community">
              <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-fuchsia-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-fuchsia-50 to-transparent rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-fuchsia-900">
                    Community
                  </CardTitle>
                  <Users className="h-6 w-6 text-fuchsia-600 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-gray-600">
                    Connect with others in the community
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/resources">
              <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-pink-50 to-transparent rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-pink-900">
                    Resources
                  </CardTitle>
                  <BookOpen className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-gray-600">
                    Educational content and health resources
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard/prediction">
              <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-emerald-100">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-emerald-50 to-transparent rounded-t-xl">
                  <CardTitle className="text-lg font-semibold text-emerald-900">
                    AI Health Analysis
                  </CardTitle>
                  <HeartPulse className="h-6 w-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-gray-600">
                    AI-powered health analysis and disease prediction
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <WellnessInsights />
          </div>
        </div>
      </div>
    </InitialAssessment>
  );
}
