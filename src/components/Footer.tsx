import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';
import logo from '../../assets/logo-transparent.png';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0F] border-t border-[#2A2A38] pt-16 pb-12 text-[#9CA3AF] font-secondary mt-20 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-violet-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid: Left brand block & Right link categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Left Column: Brand */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Brand Logo Header */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="VR Vitals Trading Academy"
                className="h-32 w-auto select-none"
              />
            </div>

            {/* Description */}
            <p className="text-xs text-[#9CA3AF] font-light leading-relaxed max-w-sm">
              VR Vitals lets you master structural price action, live order flows, and institutional supply/demand mechanics with fully-simulated educational sandbox environments.
            </p>

          </div>

          {/* Right Columns: Four categories of directories aligned neatly like Flock Ramp */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Category 1 */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#F5F5F7] uppercase tracking-wider font-sans">
                Syllabus
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9CA3AF] font-secondary">
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Overview</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Price Action</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Order Flow</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Risk Sizer</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Mentorship</span>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#F5F5F7] uppercase tracking-wider font-sans">
                Sandbox
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9CA3AF] font-secondary">
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Simulator</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Live Scanners</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Calibration</span>
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#F5F5F7] uppercase tracking-wider font-sans">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9CA3AF] font-secondary">
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">About Us</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Market Blog</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Pricing Plans</span>
                </li>
                <li>
                  <span className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Careers</span>
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#F5F5F7] uppercase tracking-wider font-sans">
                Corporate
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9CA3AF] font-secondary">
                <li>
                  <span onClick={() => setCurrentTab('legal')} className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Terms of Service</span>
                </li>
                <li>
                  <span onClick={() => setCurrentTab('legal')} className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Privacy Charter</span>
                </li>
                <li>
                  <span onClick={() => setCurrentTab('legal')} className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Disclaimer</span>
                </li>
                <li>
                  <span onClick={() => setCurrentTab('contact')} className="hover:text-[#8B5CF6] hover:underline cursor-pointer transition-colors block">Support Help</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Social Icons row (precisely positioned like reference image) */}
        <div className="flex items-center gap-4.5 pt-4 border-t border-[#2A2A38]/40">
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest mr-2 font-secondary">Connect</span>
          <a href="#" className="p-1 text-[#6B7280] hover:text-[#8B5CF6] transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#" className="p-1 text-[#6B7280] hover:text-[#8B5CF6] transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="#" className="p-1 text-[#6B7280] hover:text-[#8B5CF6] transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" className="p-1 text-[#6B7280] hover:text-[#8B5CF6] transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#" className="p-1 text-[#6B7280] hover:text-[#8B5CF6] transition-colors">
            <Globe className="h-4 w-4 animate-spin-slow" />
          </a>
        </div>

        {/* Bottom Bar: Copyright on the left & Address exactly in the right bottom corner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-6 text-[11px] text-[#6B7280] font-light border-t border-[#2A2A38]/60">
          
          {/* Left Side: Copyright */}
          <div className="space-y-1 font-secondary">
            <p className="font-mono text-[10px]">
              &copy; Copyright 2026 | VRVitals Private Limited. All Rights Reserved.
            </p>
            <p className="text-[10px] text-[#6B7280]/85">
              Designed with premium sandbox protocols. Educational sandbox mode active.
            </p>
          </div>

          {/* Right Bottom Corner: Address */}
          <div className="flex items-start md:text-right font-secondary">
            <div className="space-y-0.5 text-[10px] text-[#6B7280] leading-normal">
              <span className="font-bold text-[#9CA3AF] block tracking-wide uppercase font-mono text-[9px]">Registered Office</span>
              <p>No.17/1-2, Kusumahara Towers, 10th Cross, Jayanagar 3rd Block,</p>
              <p>Canara Bank Colony, Bangalore, Karnataka - 560011, India</p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
