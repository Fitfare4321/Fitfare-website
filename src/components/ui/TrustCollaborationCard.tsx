import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Heart, Handshake, Award, Shield, Target } from 'lucide-react';

export default function TrustCollaborationCard() {
  return (
    <div className="relative group">
      <Card className="border border-gray-100 shadow-2xl bg-white overflow-hidden relative">
        {/* Sophisticated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-indigo-50/60"></div>
        
        {/* Elegant geometric pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/30 to-transparent rounded-tr-full"></div>
        
        <CardHeader className="text-center pb-4 relative z-10">
          <div className="relative mb-4">
            <div className="bg-gradient-to-br from-slate-700 via-blue-800 to-indigo-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto shadow-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-blue-600 w-5 h-5 rounded-full flex items-center justify-center">
              <Award className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
            Trust & Excellence
          </CardTitle>
          <CardDescription className="text-gray-600 text-base font-medium mt-1">
            Professional Partnership for Exceptional Results
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 relative z-10 px-6">
          <div className="space-y-3">
            <div className="group/item flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 transform transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-lg mr-4 shadow-md group-hover/item:shadow-lg transition-shadow duration-300">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block text-sm">Strategic Collaboration</span>
                <span className="text-gray-600 text-xs font-medium">Data-driven partnership approach</span>
              </div>
              <Target className="h-4 w-4 text-blue-600 opacity-60 group-hover/item:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="group/item flex items-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 transform transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-200">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-2.5 rounded-lg mr-4 shadow-md group-hover/item:shadow-lg transition-shadow duration-300">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block text-sm">Client-Centric Focus</span>
                <span className="text-gray-600 text-xs font-medium">Personalized success methodologies</span>
              </div>
              <Target className="h-4 w-4 text-emerald-600 opacity-60 group-hover/item:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="group/item flex items-center p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-100 transform transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-gray-100 hover:border-slate-200">
              <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-2.5 rounded-lg mr-4 shadow-md group-hover/item:shadow-lg transition-shadow duration-300">
                <Handshake className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block text-sm">Proven Integrity</span>
                <span className="text-gray-600 text-xs font-medium">Transparent, results-oriented commitment</span>
              </div>
              <Target className="h-4 w-4 text-slate-600 opacity-60 group-hover/item:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          {/* Professional bottom section */}
          <div className="text-center pt-4 border-t border-gray-100">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-blue-900 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <Award className="h-3 w-3" />
              <span className="font-semibold text-xs tracking-wide">EXCELLENCE IN PARTNERSHIP</span>
              <Award className="h-3 w-3" />
            </div>
          </div>
        </CardContent>
        
        {/* Subtle accent elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-indigo-400 rounded-full opacity-40"></div>
      </Card>
    </div>
  );
}